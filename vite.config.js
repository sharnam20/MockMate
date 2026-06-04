import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@google/generative-ai': './src/mockGenerativeAI.js',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
