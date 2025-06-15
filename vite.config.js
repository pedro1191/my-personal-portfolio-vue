import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      filename: 'service-worker.js',
      registerType: 'prompt',
      devOptions: {
        enabled: true,
      },
      workbox: {
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/files\/.*\.(pdf?)$/],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8081,
  },
  test: {
    environment: 'jsdom',
  },
});
