import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: ['./components/*/index.ts'],
    format: 'esm',
    target: 'es2022',
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    preserveModules: true,
    outDir: 'dist',
    tsconfig: './tsconfig.json',
});
