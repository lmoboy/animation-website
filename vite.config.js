import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
            publicDirectory: 'public',
        }),
        react(),
    ],
    server: {
        host: process.env.VITE_HOST || 'localhost',
        hmr: {
            host: process.env.VITE_HMR_HOST || 'localhost'
        }
    },
    build: {
        chunkSizeWarningLimit: 1000,
        manifest: true,
        outDir: 'public/build',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', '@inertiajs/react']
                }
            }
        }
    },
    optimizeDeps: {
        include: ['@inertiajs/react']
    }
});
