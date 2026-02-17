import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      {
        name: 'spa-lang-fallback',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url?.match(/^\/(sq|en|it|de|fr|tr|el|es)(\/|$)/) && !req.url.includes('.')) {
              req.url = '/index.html';
            }
            next();
          });
        },
      },
      react(),
    ],
    define: {
      // Legacy support for direct API (dev only)
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Production optimizations
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-icons': ['lucide-react'],
          },
        },
      },
      // Minification - use esbuild (default, no extra deps)
      minify: 'esbuild',
    },
  };
});
