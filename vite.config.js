import { defineConfig } from 'vite';
import { vite as viteConfig } from '@angular-devkit/build-angular';

export default defineConfig({
    server: {
        port: 4200
    },
    build: {
        // Configuraciones de build
    },
    plugins: [
        viteConfig({
            // Configuraciones específicas de Angular
        })
    ]
});