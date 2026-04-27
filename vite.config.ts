import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist/',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: 'assets/plugin.js',
                assetFileNames: 'assets/plugin.css',
                chunkFileNames: 'assets/chunk.js',
                dir:'dist/'
            }
        }
    },
    server : {
        watch: {
            usePolling: true,
        }
    }
})
