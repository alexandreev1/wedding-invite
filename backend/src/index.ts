import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const app = express();
app.use(cors());
app.use(express.json());

// Настройка подключения
const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Получить все приглашения (с вложенными гостями)
app.get('/api/invitations', async (_req, res) => {
    const invitations = await prisma.invitation.findMany({
        include: { guests: true },
    });
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

app.listen(3000, () => console.log('Server running on port 3000'));
