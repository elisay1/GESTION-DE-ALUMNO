import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        headers: {
          'content-type': 'application/json; charset=utf-8'
        },
      }
    }
  }
});