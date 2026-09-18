import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Three.js + R3F designer chunk is ~1.1MB (loaded on demand via React.lazy).
    // Suppress the default 500kB warning for expected large vendor chunks.
    chunkSizeWarningLimit: 1200,
  },
})
