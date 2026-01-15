import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시 base 경로 설정
  // 저장소 이름에 맞게 수정하세요 (예: '/xroom/')
  base: process.env.NODE_ENV === 'production' ? '/xroom/' : '/',
})
