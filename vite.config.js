import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      external: ['react', 'react-dom', 'react-chartjs-2']
    }
  },
})
