import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
    stories: [
        {
            directory: '../components',
            files: '**/*.stories.ts',
            titlePrefix: 'Components',
        },
        {
            directory: 'get-started',
            files: '*.mdx',
            titlePrefix: 'Get Started',
        },
        {
            directory: 'guides',
            files: '*.mdx',
            titlePrefix: 'Guides',
        },
        {
            directory: 'guides',
            files: '**/*.mdx',
            titlePrefix: 'Guides',
        },
    ],
    docs: {
        defaultName: 'README',
    },
    framework: '@storybook/web-components-vite',
    tags: {
        a11y: {
            defaultFilterSelection: 'exclude',
        },
        usage: {
            defaultFilterSelection: 'exclude',
        },
        examples: {
            defaultFilterSelection: 'exclude',
        },
    },
    core: {
        disableTelemetry: true,
    },
    addons: [
        {
            name: '@storybook/addon-docs',
            options: {
                transcludeMarkdown: true,
            },
        },
        '@storybook/addon-a11y',
        '@storybook/addon-designs',
        '@storybook/addon-vitest',
    ],
    viteFinal: async (config) => {
        return mergeConfig(config, {
            plugins: [
                {
                    name: 'css-hmr',
                    handleHotUpdate({ file, modules, server }) {
                        if (!file.endsWith('.css') || file.includes('tokens'))
                            return;

                        const affected = new Set(modules);

                        for (const mod of modules) {
                            for (const importer of mod.importers)
                                affected.add(importer);
                        }

                        for (const mod of affected)
                            server.moduleGraph.invalidateModule(mod);

                        return [...affected];
                    },
                },
            ],
            resolve: {
                alias: {
                    '@spectrum-web-components/core': resolve(
                        __dirname,
                        '../../core'
                    ),
                    '@adobe/swc': resolve(__dirname, '../components'),
                },
            },
        });
    },
    typescript: {
        check: true,
        reactDocgen: false,
    },
};

export default config;
