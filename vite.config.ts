import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'API_PROXY_TARGET')
  const apiTarget = env.API_PROXY_TARGET?.trim() || 'http://127.0.0.1:8080'

  return {
    plugins: [react()],
    server: {
      proxy: { '/api': { target: apiTarget, changeOrigin: true } },
    },
  }
})
