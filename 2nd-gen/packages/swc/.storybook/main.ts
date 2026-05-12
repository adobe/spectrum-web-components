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

// Modes:
// - dev: full local Storybook, including docs and test stories
// - build: production Storybook build, excluding internal and test stories
// - ci-a11y: minimal component-only Storybook used by CI accessibility checks
type StorybookMode = 'dev' | 'build' | 'ci-a11y';

const storybookMode: StorybookMode =
  process.env.SWC_STORYBOOK_MODE === 'ci-a11y'
    ? 'ci-a11y'
    : process.env.NODE_ENV === 'production'
      ? 'build'
      : 'dev';

// Custom indexer to allow .test.ts files to be treated as story files.
const testStoryIndexer: Indexer = {
  test: /\.test\.ts$/,
  createIndex: async (fileName, options) => {
    const csfFile = await readCsf(fileName, options);
    return csfFile.parse().indexInputs;
  },
};

const COMPONENT_STORY_ROOT = {
  directory: '../components',
  titlePrefix: 'Components',
} as const;

const PATTERN_STORY_ROOT = {
  directory: '../patterns',
  titlePrefix: 'Patterns',
} as const;

const CORE_STORY_ROOT = {
  directory: '../../core',
  titlePrefix: 'Core',
} as const;

const stories: StorybookConfig['stories'] = [
  {
    ...COMPONENT_STORY_ROOT,
    // Production-style builds exclude internal-only stories; local/dev keeps the full set.
    files:
      storybookMode === 'build'
        ? '**/!(*.internal).stories.ts'
        : '**/*.stories.ts',
  },
  {
    ...PATTERN_STORY_ROOT,
    files: '**/*.stories.ts',
  },
  {
    ...PATTERN_STORY_ROOT,
    files: '**/*.mdx',
  },
];

/**
 * The CI a11y mode trims docs/guides
 * that can pull in 1st-gen-linked dependencies the test build does not need.
 */
if (storybookMode !== 'ci-a11y') {
  stories.push({
    directory: '../components',
    // Production-style builds exclude internal-only docs; local/dev keeps the full set.
    files: storybookMode === 'build' ? '**/!(*.internal).mdx' : '**/*.mdx',
    titlePrefix: 'Components',
  });

  // Production Storybook excludes core and contributor docs entirely.
  if (storybookMode !== 'build') {
    stories.push(
      {
        ...CORE_STORY_ROOT,
        files: '**/*.mdx',
      },
      {
        ...CORE_STORY_ROOT,
        files: '**/stories/*.stories.ts',
      },
      {
        directory: 'contributor-docs',
        files: '**/*.mdx',
        titlePrefix: 'Contributor docs',
      }
    );
  }

  stories.push(
    {
      directory: 'learn-about-swc',
      // Keep learn-about docs minimal in production.
      files: '*.mdx',
      titlePrefix: 'Learn about SWC',
    },
    {
      directory: 'guides',
      files: '**/!(*documentation).mdx',
      titlePrefix: 'Guides',
    },
    {
      directory: 'resources',
      files: '**/*.mdx',
      titlePrefix: 'Resources',
    }
  );
}

// Test stories are dev-only fixtures and should not ship in production Storybook.
if (storybookMode === 'dev') {
  stories.push({
    ...COMPONENT_STORY_ROOT,
    files: '**/*.test.ts',
  });
  stories.push({
    ...PATTERN_STORY_ROOT,
    files: '**/*.test.ts',
  });
  stories.push({
    ...CORE_STORY_ROOT,
    files: '**/stories/**/*.test.ts',
  });
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
  '@github-ui/storybook-addon-performance-panel/universal',
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
    defaultName: 'Docs',
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
  experimental_indexers: storybookMode === 'dev' ? [testStoryIndexer] : [],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      css: {
        transformer: 'postcss',
      },
      build: {
        cssMinify: 'esbuild',
      },
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
        alias: [
          {
            find: '@spectrum-web-components/core',
            replacement: resolve(__dirname, '../../core'),
          },
          // Long-form imports (e.g. `@adobe/spectrum-wc/components/badge/swc-badge.js`)
          // resolve directly to the source under `./components`. This must come
          // before the short-form alias below so the more specific prefix wins.
          {
            find: '@adobe/spectrum-wc/components',
            replacement: resolve(__dirname, '../components'),
          },
          {
            find: '@adobe/spectrum-wc',
            replacement: resolve(__dirname, '../components'),
          },
          {
            find: '@adobe/postcss-token',
            replacement: resolve(__dirname, '../../tools/postcss-token'),
          },
        ],
      },
    });
  },
  typescript: {
    check: true,
    reactDocgen: false,
  },
};

export default config;
