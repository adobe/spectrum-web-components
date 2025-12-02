import { resolve, dirname } from 'path';
import { mergeConfig } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
        '@chromatic-com/storybook',
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
