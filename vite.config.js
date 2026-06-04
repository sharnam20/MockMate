import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@google/generative-ai': path.resolve('src/mockGenerativeAI.js'),
    },
  },
  optimizeDeps: {
    exclude: ['@google/generative-ai'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})

