import { defineConfig } from 'vite';

const port = {
  host: true,
  port: 5173,
  hmr: { overlay: false },
}

// https://vitejs.dev/config/
export default defineConfig({
  server: port,
  preview: port,
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})
