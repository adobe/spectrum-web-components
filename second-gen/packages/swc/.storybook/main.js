import { dirname, join } from 'path';

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
    stories: ['../components/**/*.stories.@(js|ts|md|mdx)'],
    framework: '@storybook/web-components-vite',
    core: {
        disableTelemetry: true,
    },
    viteFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            '@swc/base': join(__dirname, '../../base'),
        };

        return config;
    },
    typescript: {
        check: true,
        reactDocgen: false,
    },
};

export default config;
