import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './packages',
    testMatch: '**/*.playwright.test.ts',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 4 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:6006',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                // Enable accessibility testing
                contextOptions: {
                    // Force reduced motion for consistent testing
                    reducedMotion: 'reduce',
                },
            },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    webServer: {
        command: 'yarn storybook',
        port: 6006,
        reuseExistingServer: !process.env.CI,
    },
});
