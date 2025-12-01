import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/functions': {
        target: 'https://ruewgiljaznyllyqmrep.supabase.co',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
