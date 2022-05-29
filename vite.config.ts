import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS()],
  server: {
    // host: '127.1.1.1',
    port: 3001,
    proxy: {
      '^/api/.*': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    // Use our versions of Node modules.
    alias: {
      fs: 'browserfs/dist/shims/fs.js',
      buffer: 'browserfs/dist/shims/buffer.js',
      path: 'browserfs/dist/shims/path.js',
      processGlobal: 'browserfs/dist/shims/process.js',
      bufferGlobal: 'browserfs/dist/shims/bufferGlobal.js',
      bfsGlobal: require.resolve('browserfs'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@src': path.resolve(__dirname, './src'),
    },
  },
});
