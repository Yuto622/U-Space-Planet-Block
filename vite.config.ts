import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 8080
    },
    preview: {
      host: '0.0.0.0',
      port: 8080,
      allowedHosts: true
    },
    define: {
      'process.env': env
    },
    build: {
      target: 'esnext'
    }
  };
});