import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  resolve: {
    alias: {
      'design-system-base': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: { port: 5190 },
})
