import { resolve } from 'path';

// Components to exclude from Storybook
const excludedComponents = ['alert-banner'];

// Dynamically construct the glob pattern
const getStoriesPattern = (excluded: string[]) => {
    const excludePattern =
        excluded.length === 0 ? '*' : `!(${excluded.join('|')})`;
    return `../components/${excludePattern}/**/*.stories.@(js|ts|md|mdx)`;
};

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
    stories: [getStoriesPattern(excludedComponents)],
    framework: '@storybook/web-components-vite',
    core: {
        disableTelemetry: true,
    },
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-designs',
    ],
    viteFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            '@swc/core': resolve(__dirname, '../../core'),
        };

        return config;
    },
    typescript: {
        check: true,
        reactDocgen: false,
    },
};

export default config;
