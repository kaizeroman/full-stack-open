import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://full-stack-open-arln.onrender.com',
        changeOrigin: true,
      },
    }
  },
})
