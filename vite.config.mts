// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify(),
    Components(),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  build: {
      lib: {
          entry: resolve(__dirname, 'src/package.ts'),
          name: 'GuestChatLib',
      },
      rollupOptions: {
          external: ['vue', 'vuetify/lib'],
          // external: ['vue', 'vuetify/lib', 'pinia'],
          output: {
              globals: {
                  vue: 'Vue',
                  pinia: 'pinia',
                  vuetify: "Vuetify",
                  'vuetify/components': 'VuetifyComponents',
                  'vuetify/directives': 'VuetifyDirectives'
              },
          },
      },
      minify: 'esbuild',
      target: 'esnext',
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
