import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://exo-gui/',
  server: {
    host: 'exo-gui',
    https: false,
    cors: true,
    port: 8280,
  },
  plugins: [react()],
})
