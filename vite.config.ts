import path from 'path';

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000
  },
  preview: {
    host: true,
    port: 3000
  },
  resolve: {
    // eslint-disable-next-line no-undef
    alias: { '@': path.resolve(__dirname, './src') }
  },
})
