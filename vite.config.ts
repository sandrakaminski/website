import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

type Port = {
  host: boolean;
  port: number;
}

const port: Port = {
  host: true,
  port: 5173
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: port,
  preview: port,
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})
