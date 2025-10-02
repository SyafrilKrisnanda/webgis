import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Kita tidak perlu mendaftarkan tailwindcss() di sini lagi,
  // karena Vite akan otomatis membaca postcss.config.js Anda.
})