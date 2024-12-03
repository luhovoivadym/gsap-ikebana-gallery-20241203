import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@primary-color: #4CAF50;`,
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});