import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '@/app', replacement: '/src/app' },
      { find: '@/entities', replacement: '/src/entities' },
      { find: '@/pages', replacement: '/src/pages' },
      { find: '@/shared', replacement: '/src/shared' },
      { find: '@/widgets', replacement: '/src/widgets' },
    ],
  },
});
