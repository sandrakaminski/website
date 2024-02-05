/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const port = {
  host: true,
  port: 5173
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
  },
  server: port,
  preview: port,
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})

