import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Критично для Docker на Windows/macOS
    },
    host: true, // Слушать все интерфейсы
    strictPort: true,
    port: 5173,
  },
})
