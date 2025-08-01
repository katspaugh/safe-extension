import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: 'extension',
  build: {
    // Explicitly resolve output directory to the extension/dist folder
    outDir: '../extension/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'extension/popup.html'),
        background: resolve(__dirname, 'extension/src/background.ts')
      },
      output: {
        entryFileNames: (chunk) => {
          return chunk.name === 'background' ? 'background.js' : 'assets/[name].js';
        }
      }
    }
  },
  plugins: [react()]
});
