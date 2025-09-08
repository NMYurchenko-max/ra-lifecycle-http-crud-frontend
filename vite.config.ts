import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  // Для GitHub Pages (project pages) база должна совпадать с именем репозитория
  base: mode === 'production' ? '/ra-lifecycle-http-crud-frontend/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Только для dev: перенаправляет /notes на локальный бэкенд
      '/notes': {
        target: 'http://localhost:7070',
        changeOrigin: true,
      },
    },
  },
}))
