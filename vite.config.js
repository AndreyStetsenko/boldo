import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                // main: resolve(__dirname, 'pages/index.html'),
                // main2: resolve(__dirname, 'pages/index2.html'),
                // about: resolve(__dirname, 'pages/about.html'),
                // about2: resolve(__dirname, 'pages/about2.html'),
                pages: resolve(__dirname, 'index.html'),
                home: resolve(__dirname, 'pages/home.html'),
                homev2: resolve(__dirname, 'pages/homev2.html'),
                about: resolve(__dirname, 'pages/about.html'),
                aboutv2: resolve(__dirname, 'pages/aboutv2.html'),
                blog: resolve(__dirname, 'pages/blog.html'),
            },
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
    },
    server: {
        port: 3000,
        open: true,
        host: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@styles': resolve(__dirname, 'src/styles'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `@import "@styles/variables.scss";`,
            },
        },
    },
});