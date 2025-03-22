import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@' : '/src',
      '@components' : '/src/components',
      '@constants' : '/src/constants',
      '@context' : '/src/context',
      '@models' : '/src/models',
      '@utils':  '/src/utils',
      '@styles':  '/src/styles',
      '@assets':  '/src/assets',
      '@hooks':  '/src/hooks'
    },
  },
  plugins: [react()],
  css: {
    modules: {
        // generateScopedName: '[local]'
        generateScopedName: '[local]_[hash:base64:5]',
    },
  },
})
