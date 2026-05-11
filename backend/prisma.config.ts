import { defineConfig } from '@prisma/config';

// Если процесс запущен внутри Docker, используем 'db', иначе 'localhost'
const dbHost = process.env.IS_DOCKER === 'true' ? 'db' : 'localhost';

export default defineConfig({
  datasource: {
    // ВНИМАНИЕ: проверьте, что user/password/wedding_db совпадают с docker-compose.yml
    url: `postgresql://user:password@${dbHost}:5432/wedding_db`,
  },
});
