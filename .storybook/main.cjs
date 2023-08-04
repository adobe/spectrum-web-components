const rollupJson = require('@rollup/plugin-json');

module.exports = {
    stories: [
        '../packages/*/stories/*.stories.js',
        '../tools/*/stories/*.stories.js',
    ],
    nodeResolve: {
        exportConditions: ['browser', 'development'],
    },

    rollupConfig(config) {
        // add a new plugin to the build
        config.plugins.push(rollupJson());

        return config;
    },
};
