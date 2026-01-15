import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 커스텀 도메인 (xroom.kro.kr) 사용 시 base는 '/'
  base: '/',
})
