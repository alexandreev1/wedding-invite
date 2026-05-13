# ==================== STAGE 1: BUILD ====================
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем только package-файлы для кэширования слоя
COPY ./frontend/package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходники и собираем проект
COPY ./frontend .
RUN npm run build

# ==================== STAGE 2: NGINX ====================
FROM nginx:alpine

# Копируем собранные статики из builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг nginx (опционально, но рекомендуется)
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем стандартный порт nginx
EXPOSE 80

# Health check для Kubernetes/GitLab
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Nginx запускается автоматически через ENTRYPOINT образа
CMD ["nginx", "-g", "daemon off;"]