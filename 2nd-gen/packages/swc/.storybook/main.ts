import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';
import type { Indexer } from '@storybook/types';
import { readCsf } from '@storybook/core/csf-tools';

const __dirname = dirname(fileURLToPath(import.meta.url));
const includeTestStories = process.env.NODE_ENV !== 'production';
const testStoryIndexer: Indexer = {
    test: /\.test\.ts$/,
    createIndex: async (fileName, options) => {
        const csfFile = await readCsf(fileName, options);
        return csfFile.parse().indexInputs;
    },
};

const stories = [
    {
        directory: '../components',
        files: '**/*.stories.ts',
        titlePrefix: 'Components',
    },
    {
        directory: 'learn-about-swc',
        files: '*.mdx',
        titlePrefix: 'Learn about SWC',
    },
    {
        directory: 'guides',
        files: '**/!(*documentation).mdx',
        titlePrefix: 'Guides',
    },
];

if (includeTestStories) {
    stories.push({
        directory: '../components',
        files: '**/*.test.ts',
        titlePrefix: 'Components',
    });
}

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
    stories,
    experimental_indexers: [testStoryIndexer],
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
                    '@adobe/postcss-token': resolve(
                        __dirname,
                        '../../tools/postcss-token'
                    ),
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
