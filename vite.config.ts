/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'
//import legacy from '@vitejs/plugin-legacy'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //legacy(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html}',
          'assets/**/*.{js,css,html,png,jpg,svg}',
          '**/*.{gltf, bin, jpg, png, svg, json, webp}',
        ],
        maximumFileSizeToCacheInBytes: 30 * 1024 * 1024, // 30 MB
      }

    }),
    basicSsl()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
