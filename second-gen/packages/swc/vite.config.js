import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            include: ['**/*.ts'],
            exclude: ['**/*.test.ts', '**/*.stories.ts'],
            outDir: 'dist',
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: glob
                .sync(resolve(__dirname, 'components/*/index.ts'))
                .reduce((entries, file) => {
                    const name = file
                        .replace(resolve(__dirname) + '/', '')
                        .replace('.ts', '');
                    entries[name] = file;
                    return entries;
                }, {}),
            formats: ['es'],
        },
        rollupOptions: {
            external: ['lit', '@swc/core'],
            output: {
                preserveModules: true,
                preserveModulesRoot: '.',
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
            },
        },
        target: 'es2022',
        sourcemap: true,
        emptyOutDir: true,
        outDir: 'dist',
    },
    esbuild: {
        target: 'es2022',
    },
});
