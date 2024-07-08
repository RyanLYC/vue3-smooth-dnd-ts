import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: './src/index.ts',
      name: 'zg-ui',
      fileName: (format) => `index.${format}.${format === 'umd' ? 'c' : ''}js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        // assetFileNames: (chunkInfo) => {
        //   if (chunkInfo.name === 'style.css') {
        //     return 'index.css'
        //   }
        //   return chunkInfo.name as string
        // },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    open: false,
    port: 5188,
  },
})
