import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
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
      // Define process.env so it is available in the browser
      'process.env': env
    },
    build: {
      target: 'esnext'
    }
  };
});