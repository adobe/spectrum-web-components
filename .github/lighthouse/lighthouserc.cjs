export default {
    extends: 'lighthouse:default',
    settings: {
        onlyCategories: [
            // Excluded categories do not currently pass
            // "accessibility",
            // "best-practices",
            'performance',
            // "pwa",
            // "seo"
        ],
        onlyAudits: ['first-meaningful-paint', 'speed-index', 'interactive'],
    },
};
