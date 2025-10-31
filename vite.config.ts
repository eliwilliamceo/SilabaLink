import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // No intentes empaquetar estos módulos.
      // Se cargan a través del importmap en index.html en el navegador.
      external: [
        '@google/genai',
        'react',
        'react-dom'
      ],
    },
  },
});
