import { defineConfig } from '@prisma/config';

// Если процесс запущен внутри Docker, используем 'db', иначе 'localhost'
const dbHost = process.env.IS_DOCKER === 'true' ? 'db' : 'localhost';

console.log("DB Connect: ", process.env.DATABASE_URL);

export default defineConfig({
  datasource: {
    // ВНИМАНИЕ: проверьте, что user/password/wedding_db совпадают с docker-compose.yml
    url: process.env.DATABASE_URL || `postgresql://user:password@${dbHost}:5432/wedding_db`,
  },
});
