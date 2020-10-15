const { playwrightLauncher } = require('@web/test-runner-playwright');

module.exports = {
    files: ['packages/*/test/*.test.js'],
    nodeResolve: true,
    concurrency: 4,
    concurrentBrowsers: 1,
    testsFinishTimeout: 45000,
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
        playwrightLauncher({
            concurrency: 1,
            product: 'firefox',
            launchOptions: {
                headless: false,
                args: ['-headless'],
                firefoxUserPrefs: {
                    'toolkit.telemetry.reportingpolicy.firstRun': false,
                    'browser.shell.checkDefaultBrowser': false,
                    'browser.bookmarks.restore_default_bookmarks': false,
                    'dom.disable_open_during_load': false,
                    'dom.max_script_run_time': 0,
                    'dom.min_background_timeout_value': 10,
                    'extensions.autoDisableScopes': 0,
                    'extensions.enabledScopes': 15,
                },
            },
        }),
    ],
};
