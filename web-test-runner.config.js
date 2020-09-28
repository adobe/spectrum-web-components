const { playwrightLauncher } = require('@web/test-runner-playwright');

module.exports = {
    files: ['packages/*/test/*.test.js'],
    nodeResolve: true,
    concurrency: 4,
    testsFinishTimeout: 30000,
    coverage: true,
    coverageConfig: {
        report: true,
        reportDir: 'coverage',
        exclude: [
            'packages/*/stories/*',
            'packages/icons-ui/**',
            'packages/icons-workflow/**',
            'test/**',
        ],
        threshold: {
            statements: 98,
            branches: 94,
            functions: 95,
            lines: 98,
        },
    },
    testFramework: {
        config: {
            timeout: 10000,
        },
    },
    testRunnerHtml: (testRunnerImport) => `
        <html>
        <head></head>
        <body>
            <script type="module">
            import '${testRunnerImport}';
            window.process = window.process || {};
            window.process.env = window.process.env || {};
            window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';
            </script>
        </body>
        </html>
    `,
    browsers: [
        playwrightLauncher({ product: 'chromium' }),
        playwrightLauncher({ product: 'webkit' }),
    ],
};
