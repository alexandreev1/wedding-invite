# 1. Берем легкий образ Node.js
FROM node:20-alpine

# 2. Указываем рабочую директорию внутри контейнера
WORKDIR /app

# 3. Сначала копируем только файлы зависимостей
# Это нужно для оптимизации: Docker закеширует установку библиотек
COPY ./backend/package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# Копируем папку prisma ПЕРЕД генерацией
COPY ./backend/prisma ./prisma/
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx prisma migrate status

# 5. Копируем все остальные файлы проекта (код, конфиги)
COPY ./backend .

# 6. Открываем порт 3000 для связи
EXPOSE 3000

# 7. Запускаем команду для разработки
CMD ["npm", "run", "dev"]
