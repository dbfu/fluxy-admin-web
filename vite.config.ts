import react from '@vitejs/plugin-react-swc';
import externalGlobals from 'rollup-plugin-external-globals';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@dbfu/react-directive',
    }),
  ],
  build: {
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'antd',
      ],
      plugins: [
        visualizer({
          open: true, // 直接在浏览器中打开分析报告
          gzipSize: true, // 显示gzip后的大小
          brotliSize: true, // 显示brotli压缩后的大小
        }),
        externalGlobals({
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          'lodash-es': '_',
        }),
      ]
    }
  },
  resolve: {
    alias: {
      '@': '/src/',
    },
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
})
