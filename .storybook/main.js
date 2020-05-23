module.exports = {
    // Globs of all the stories in your project
    stories: ['../packages/*/stories/*.stories.js'],
    // Configuration for es-dev-server (start-storybook only)
    esDevServer: {
        nodeResolve: true,
        open: true,
    },
    addons: [
        'storybook-prebuilt/addon-docs/register.js',
        'storybook-prebuilt/addon-actions/register.js',
        'storybook-prebuilt/addon-knobs/register.js',
        'storybook-prebuilt/addon-a11y/register.js',
    ],

    // Rollup build output directory (build-storybook only)
    outputDir: '../projects/documentation/dist/storybook',
    // Configuration for rollup (build-storybook only)
    rollup: (config) => {
        return config;
    },
};
