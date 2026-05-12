# 1. Используем тот же Node.js
FROM node:20-alpine

# 2. Рабочая директория
WORKDIR /app

# 3. Копируем зависимости
COPY ./frontend/package*.json ./

# 4. Устанавливаем их
RUN npm install

# 5. Копируем всё остальное
COPY ./frontend .

# 6. Открываем порт Vite (по умолчанию 5173)
EXPOSE 5173

# 7. Запускаем Vite с флагом --host
# Это критично, чтобы сервис был доступен снаружи контейнера
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
