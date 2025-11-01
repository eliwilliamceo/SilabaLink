import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Carga las variables de entorno del archivo .env en la raíz del proyecto
    // El tercer parámetro '' carga todas las variables, no solo las que tienen prefijo VITE_
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react()],
        // Define las variables para que estén disponibles en el código del cliente
        define: {
            // Esto permite que el código siga usando process.env.API_KEY
            'process.env.API_KEY': JSON.stringify(env.API_KEY),
        },
        build: {
            rollupOptions: {
                // No intentes empaquetar estos módulos.
                // Se cargan a través del importmap en index.html en el navegador.
                external: [
                    '@google/genai',
                    'react',
                    'react-dom',
                    'react/jsx-runtime', // Añadido para resolver el error de build
                    'react-dom/client'   // Añadido preventivamente ya que se usa en index.tsx
                ],
            },
        },
    };
});
