import { defineConfig } from 'vite';import react from '@vitejs/plugin-react';import path from 'path';import { copyFileSync, mkdirSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [react()],
  root: './',
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: './index.html',
        actividad1: './view/src/actividad1/index.js',
        actividad2: './view/src/actividad2/index.js',
        actividad3: './view/src/actividad3/index.js',
        actividad4: './view/src/actividad4/index.js',
        actividad5: './view/src/actividad5/pedidos.js'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name.startsWith('actividad')) {
            return `${chunkInfo.name}/index.js`;
          }
          return '[name]-[hash].js';
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'view/src')
    }
  },
  server: {
    host: true,
    port: 3000
  }
}) 