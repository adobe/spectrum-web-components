import { resolve } from 'path';

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
    stories: [
        {
            directory: 'guides',
            files: '*.@(md|mdx)',
            titlePrefix: 'Guides',
        },
        {
            directory: '../components',
            files: '*/stories/*.stories.ts',
            titlePrefix: 'Components',
        },
    ],
    framework: '@storybook/web-components-vite',
    core: {
        disableTelemetry: true,
    },
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-designs',
        '@storybook/addon-vitest',
    ],
    viteFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            '@spectrum-web-components/core': resolve(__dirname, '../../core'),
        };

        return config;
    },
    typescript: {
        check: true,
        reactDocgen: false,
    },
};

export default config;
