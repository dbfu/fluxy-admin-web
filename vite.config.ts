// import {sentryVitePlugin} from '@sentry/vite-plugin';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react({
      jsxImportSource: '@dbfu/react-directive',
    }),
    WindiCSS(),
    // sentryVitePlugin({
    //   org: 'dbfu-e3b959e09',
    //   project: 'javascript-react',
    //   authToken:
    //     'a5e2fa7a36ef155a82d531a6d119c238ce9297fa1d41e463bd20e1c0bbca2d78',
    //   sourcemaps: {
    //     filesToDeleteAfterUpload: ['dist/**/*.js.map'],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  build: {
    manifest: true,
    sourcemap: false,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true,
      },
      '/file': {
        target: 'http://localhost:9002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/file/, ''),
      },
      '/ws': {
        target: 'ws://localhost:7001',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, ''),
      },
    },
  },
});
