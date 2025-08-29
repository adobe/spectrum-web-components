import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        browser: {
            enabled: true,
            provider: 'playwright',
            name: 'chromium',
            headless: true,
        },
        include: ['packages/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['packages/**/src/**/*.ts'],
            exclude: ['**/*.test.ts', '**/*.stories.ts', '**/node_modules/**'],
        },
        globals: true,
        environment: 'happy-dom',
    },
    resolve: {
        alias: {
            '@swc/core': './packages/core',
            '@swc/components': './packages/swc',
        },
    },
});
