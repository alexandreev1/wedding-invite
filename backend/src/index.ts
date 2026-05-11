import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Разрешаем фронтенду доступ
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-admin-pin'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Настройка подключения
const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.post('/api/admin/login', (req, res) => {
    const { pin } = req.body;

    if (pin === process.env.ADMIN_PIN) {
        // Устанавливаем куку на 15 минут (15 * 60 * 1000 мс)
        res.cookie('admin_session', pin, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true, // Защита от XSS (JS не может прочитать куку)
            secure: false,  // Включи true при переходе на HTTPS
            sameSite: 'lax',
        });
        return res.json({ success: true });
    }

    res.status(403).json({ error: 'Неверный ПИН' });
});

// Обновляем middleware adminAuth, чтобы он смотрел и в куки
const adminAuth = (req: any, res: any, next: any) => {
    const pinFromHeader = req.headers['x-admin-pin'];
    const pinFromCookie = req.cookies['admin_session'];
    const validPin = process.env.ADMIN_PIN;

    if (pinFromHeader === validPin || pinFromCookie === validPin) {
        next();
    } else {
        res.status(403).json({ error: 'Access denied' });
    }
};

// Получить все приглашения (с вложенными гостями)
app.get('/api/invitations', adminAuth, async (req, res) => {
    const invitations = await prisma.invitation.findMany({ include: { guests: true } });
    res.json(invitations);
});

// Создать новое приглашение
app.post('/api/invitations', async (req, res) => {
    const { token, guests } = req.body;
    try {
        const result = await prisma.invitation.create({
            data: {
                token,
                guests: {
                    create: guests.map((g: Record<string, string | number>) => ({
                        name: g.name,
                        gender: g.gender,
                        avatarUrl: g.avatarUrl,
                        tableId: g.tableId,
                        seatNumber: g.seatNumber,
                    })),
                },
            },
            include: { guests: true },
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при создании" });
    }
});

// Обновить место конкретного гостя
app.patch('/api/guests/:id', async (req, res) => {
    const { id } = req.params;
    const { tableId, seatNumber } = req.body;

    try {
        const updatedGuest = await prisma.guest.update({
            where: { id },
            data: {
                tableId: tableId ?? null,
                seatNumber: seatNumber ?? null
            },
        });
        res.json(updatedGuest);
    } catch (error) {
        res.status(500).json({ error: "Не удалось обновить место" });
    }
});

app.delete('/api/invitations/:id', async (req, res) => {
    await prisma.invitation.delete({ where: { id: req.params.id } });
    res.sendStatus(204);
});

// Получить приглашение по токену (Публично)
app.get('/api/invitation-by-token/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const invitation = await prisma.invitation.findUnique({
            where: { token },
            include: { guests: true }
        });

        if (!invitation) return res.status(404).json({ error: 'Приглашение не найдено' });

        res.json(invitation);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => console.log(`http://0.0.0.0:${PORT}`));
