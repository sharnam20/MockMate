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
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
