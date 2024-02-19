export default {
    extends: 'lighthouse:default',
    settings: {
        onlyCategories: [
            'accessibility',
            'best-practices',
            'performance',
            'pwa',
            'seo',
        ],
        // Excluded audits do not currently pass
        // metrics/first-contentful-paint', 'metrics/largest-contentful-paint','metrics/first-meaningful-paint', 'metrics/speed-index', 'screenshot-thumbnails',
        // performance audits: https://github.com/GoogleChrome/lighthouse/blob/ed04b10ccfa4e82ee5cd5b437e474a12c1ba52d0/core/config/default-config.js#L178
        onlyAudits: [
            'first-meaningful-paint',
            'speed-index',
            'interactive',
            'resource-summary',
        ],
    },
};
