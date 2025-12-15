import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';

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
            directory: 'about-swc',
            files: '*.mdx',
            titlePrefix: 'About SWC',
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
    core: {
        disableTelemetry: true,
    },
    addons: [
        {
            name: '@storybook/addon-docs',
            options: {
                transcludeMarkdown: true,
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
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
