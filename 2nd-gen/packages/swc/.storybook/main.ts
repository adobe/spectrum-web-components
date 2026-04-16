/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { readCsf } from '@storybook/core/csf-tools';
import type { Indexer } from '@storybook/types';
import type { StorybookConfig } from '@storybook/web-components-vite';
import { dirname, resolve } from 'path';
import remarkGfm from 'remark-gfm';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
type StorybookMode = 'dev' | 'build' | 'ci-a11y' | 'chromatic';

// Modes:
// - dev: full local Storybook, including docs, test, and VRT stories
// - build: production Storybook build (docs site), excluding internal, test, and VRT stories
// - ci-a11y: minimal component-only Storybook used by CI accessibility checks
// - chromatic: VRT-only Storybook used as the Chromatic-deployed build; no docs, no playground, no test stories
const storybookMode: StorybookMode =
  process.env.SWC_STORYBOOK_MODE === 'ci-a11y'
    ? 'ci-a11y'
    : process.env.SWC_STORYBOOK_MODE === 'chromatic'
      ? 'chromatic'
      : process.env.NODE_ENV === 'production'
        ? 'build'
        : 'dev';

// Custom indexer to allow .test.ts and .vrt.ts files to be treated as story files.
const testStoryIndexer: Indexer = {
  test: /\.(test|vrt)\.ts$/,
  createIndex: async (fileName, options) => {
    const csfFile = await readCsf(fileName, options);
    return csfFile.parse().indexInputs;
  },
};

const stories: StorybookConfig['stories'] = [];

if (storybookMode === 'chromatic') {
  // Chromatic mode indexes only VRT stories so the Chromatic UI reflects only what is snapshotted.
  stories.push(
    {
      directory: '../components',
      files: '**/*.vrt.ts',
      titlePrefix: 'Components',
    },
    {
      directory: '../../core',
      files: '**/stories/**/*.vrt.ts',
      titlePrefix: 'Core',
    }
  );
} else {
  stories.push({
    directory: '../components',
    // Production-style builds exclude internal-only stories; local/dev keeps the full set.
    files:
      storybookMode === 'build'
        ? '**/!(*.internal).stories.ts'
        : '**/*.stories.ts',
    titlePrefix: 'Components',
  });

  /**
   * The CI a11y mode trims docs/guides
   * that can pull in 1st-gen-linked dependencies the test build does not need.
   */
  if (storybookMode !== 'ci-a11y') {
    stories.push(
      {
        directory: '../../core',
        files: '**/*.mdx',
        titlePrefix: 'Core',
      },
      {
        directory: '../../core',
        files: '**/stories/*.stories.ts',
        titlePrefix: 'Core',
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
      {
        directory: 'contributor-docs',
        files: '**/*.mdx',
        titlePrefix: 'Contributor docs',
      }
    );
  }

  // Test and VRT stories are dev-only fixtures; production docs and ci-a11y exclude them.
  if (storybookMode === 'dev') {
    stories.push({
      directory: '../components',
      files: '**/*.{test,vrt}.ts',
      titlePrefix: 'Components',
    });
    stories.push({
      directory: '../../core',
      files: '**/stories/**/*.{test,vrt}.ts',
      titlePrefix: 'Core',
    });
  }
}

/**
 * ci-a11y mode needs docs (for MDX parsing) and a11y; everything else
 * (designs, vitest, chromatic, screen-reader) is unnecessary overhead.
 */
const addons: StorybookConfig['addons'] = [
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
];

if (storybookMode !== 'ci-a11y') {
  addons.push(
    '@storybook/addon-designs',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
    resolve(__dirname, './addons/screen-reader-addon')
  );
}

const config: StorybookConfig = {
  stories,
  docs: {
    defaultName: 'README',
  },
  framework: '@storybook/web-components-vite',
  core: {
    disableTelemetry: true,
  },
  build: {
    test: {
      // Chromatic's addon sets SB_TESTBUILD=true which disables addon-docs,
      // breaking our custom DocumentTemplate.mdx. Keep docs enabled but
      // disable addons that are not needed for visual regression testing.
      // See: https://github.com/storybookjs/storybook/issues/31699
      disabledAddons: [],
    },
  },
  staticDirs: ['../public'],
  addons,
  experimental_indexers:
    storybookMode === 'dev' || storybookMode === 'chromatic'
      ? [testStoryIndexer]
      : [],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [
        {
          name: 'css-hmr',
          handleHotUpdate({ file, modules, server }) {
            if (!file.endsWith('.css') || file.includes('tokens')) {
              return;
            }

            const affected = new Set(modules);

            for (const mod of modules) {
              for (const importer of mod.importers) {
                affected.add(importer);
              }
            }

            for (const mod of affected) {
              server.moduleGraph.invalidateModule(mod);
            }

            return [...affected];
          },
        },
      ],
      resolve: {
        alias: {
          '@spectrum-web-components/core': resolve(__dirname, '../../core'),
          '@adobe/spectrum-wc': resolve(__dirname, '../components'),
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
