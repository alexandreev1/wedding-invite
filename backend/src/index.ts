import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { NullTypes } from "@prisma/client/runtime/client";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*", // Разрешаем фронтенду доступ
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "x-admin-pin"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Настройка подключения
const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://user:password@localhost:5432/wedding_db`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  adapter,
});

// Папка для загруженных файлов (в dev — backend/uploads, т.к. cwd = backend)
const uploadsDir = path.resolve(process.cwd(), "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

// Раздаём загруженные файлы как статику
app.use("/uploads", express.static(uploadsDir));

// multer: сохраняем на диск, принимаем только изображения, лимит 10 МБ
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpe?g|png|gif|webp)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Допускаются только изображения (jpg, png, gif, webp)"));
    }
  },
});

app.post("/api/admin/login", (req, res) => {
  const { pin } = req.body;

  if (pin === process.env.ADMIN_PIN) {
    // Устанавливаем куку на 15 минут (15 * 60 * 1000 мс)
    res.cookie("admin_session", pin, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true, // Защита от XSS (JS не может прочитать куку)
      secure: false, // Включи true при переходе на HTTPS
      sameSite: "lax",
    });
    return res.json({ success: true });
  }

  res.status(403).json({ error: "Неверный ПИН" });
});

// Обновляем middleware adminAuth, чтобы он смотрел и в куки
const adminAuth = (req: any, res: any, next: any) => {
  const pinFromHeader = req.headers["x-admin-pin"];
  const pinFromCookie = req.cookies["admin_session"];
  const validPin = process.env.ADMIN_PIN;

  if (pinFromHeader === validPin || pinFromCookie === validPin) {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};

// Загрузка файла (изображения). Возвращает публичный URL, который ложится в avatarUrl гостя.
// Поле формы — "file". Доступ ограничен админкой (adminAuth).
app.post("/api/upload", adminAuth, (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Файл не передан" });
    }
    res.json({ url: `/uploads/${req.file.filename}` });
  });
});

// Получить все приглашения (с вложенными гостями)
app.get("/api/invitations", adminAuth, async (req, res) => {
  const invitations = await prisma.invitation.findMany({
    include: { guests: true },
  });
  res.json(invitations || []);
});

app.get("/api/unseatedGuests", async (req, res) => {
  const unseatedGuests = await prisma.guest.findMany({
    where: {
      seatNumber: {
        equals: null,
      },
    },
  });
  res.json(unseatedGuests || []);
});

app.get("/api/seatedGuests", async (req, res) => {
  const seatedGuests = await prisma.guest.findMany({
    where: {
      seatNumber: {
        not: null,
      },
    },
  });
  res.json(seatedGuests || []);
});

// Создать новое приглашение
app.post("/api/invitations", async (req, res) => {
  const { token, guests } = req.body;
  try {
    const result = await prisma.invitation.create({
      data: {
        token,
        guests: {
          create: guests.map((g: Record<string, string | number>) => ({
            name: g.name,
            lastname: g.lastname,
            comment: g.comment,
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
    res.status(500).json({ error: `Ошибка при создании ${error}` });
  }
});

// Обновить данные гостя
app.patch("/api/guests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedGuest = await prisma.guest.update({
      where: { id },
      data: { ...req.body },
    });
    res.json(updatedGuest);
  } catch (error) {
    res.status(500).json({ error: "Не удалось обновить данные гостя" });
  }
});

app.patch("/api/update-invitation/:token", async (req, res) => {
  const { token } = req.params;
  const { guests } = req.body;
  try {
    const transactionRes = await prisma.$transaction(async (tx) => {
      const invitation = await tx.invitation.findUnique({
        where: { token },
        select: { id: true },
      });

      if (!invitation) {
        return res.status(404).json({ error: "Не найдено" });
      }

      const preparedGuests = guests.map((g: Record<string, unknown>) => ({
        ...g,
        invitationId: invitation.id,
      }));

      await tx.guest.createMany({
        data: preparedGuests,
        skipDuplicates: true,
      });

      for (const guest of preparedGuests) {
        await tx.guest.update({
          where: { id: guest.id },
          data: guest,
        });
      }

      const incomingIds = preparedGuests.map(
        (g: Record<string, unknown>) => g.id,
      );
      await tx.guest.deleteMany({
        where: {
          invitationId: invitation.id,
          id: { notIn: incomingIds },
        },
      });

      return await tx.invitation.findUnique({
        where: { token },
        include: { guests: true },
      });
    });

    return res.json(transactionRes);
    /*
    const updatedInvitation = await prisma.invitation.update({
      where: { token },
      data: { ...req.body },
    });
    res.json(updatedInvitation); */
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete("/api/invitations/:id", async (req, res) => {
  await prisma.invitation.delete({ where: { id: req.params.id } });
  res.sendStatus(204);
});

// Получить приглашение по токену (Публично)
app.get("/api/invitation-by-token/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: { guests: true },
    });

    if (!invitation)
      return res.status(404).json({ error: "Приглашение не найдено" });

    res.json(invitation);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Получить гостя по id (Публично)
app.get("/api/guest-by-id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const guest = await prisma.guest.findUnique({
      where: { id },
    });

    if (!guest) return res.status(404).json({ error: "Гость не найден" });

    res.json(guest);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => console.log(`http://0.0.0.0:${PORT}`));
