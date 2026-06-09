import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    legacy(),
    vue(),
    basicSsl(),
    vueDevTools(),

  ],
  resolve: {
    alias: {
      'three': path.resolve(__dirname, 'node_modules/three'),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
