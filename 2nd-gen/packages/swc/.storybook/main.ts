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
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import remarkGfm from 'remark-gfm';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Ensure the coverage directory exists so Storybook always serves /coverage.
// The directory will be empty until `vitest --coverage` populates it.
mkdirSync(resolve(__dirname, '../coverage'), { recursive: true });

// Modes:
// - dev: full local Storybook, including docs and test stories
// - build: production Storybook build, excluding internal and test stories
// - ci-a11y: minimal component-only Storybook used by CI accessibility checks
// - vrt: Chromatic-only build containing *just* .vrt.ts stories, so the
//   Chromatic catalog never lists the non-VRT stories it skips snapshotting.
type StorybookMode = 'dev' | 'build' | 'ci-a11y' | 'vrt';

const storybookMode: StorybookMode =
  process.env.SWC_STORYBOOK_MODE === 'ci-a11y'
    ? 'ci-a11y'
    : process.env.SWC_STORYBOOK_MODE === 'vrt'
      ? 'vrt'
      : // Explicit override so a static `storybook build` (e.g. PR preview
        // deploys) can still produce the full dev-mode story set. The `build`
        // command otherwise forces NODE_ENV=production itself before this
        // file runs, regardless of what's set in the shell beforehand.
        process.env.SWC_STORYBOOK_MODE === 'dev'
        ? 'dev'
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

// Custom indexer to allow .vrt.ts files to be treated as story files.
const vrtStoryIndexer: Indexer = {
  test: /\.vrt\.ts$/,
  createIndex: async (fileName, options) => {
    const csfFile = await readCsf(fileName, options);
    return csfFile.parse().indexInputs;
  },
};

const COMPONENT_STORIES = {
  directory: '../components',
  titlePrefix: 'Components',
};

const PATTERN_STORIES = {
  directory: '../patterns',
  titlePrefix: 'Patterns',
};

const CORE_STORIES = {
  directory: '../../core',
  titlePrefix: 'Core',
};

const GUIDES = [
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
  { directory: 'resources', files: '**/*.mdx', titlePrefix: 'Resources' },
];

const CORE_AND_CONTRIBUTOR_DOCS = [
  { ...CORE_STORIES, files: '**/*.mdx' },
  { ...CORE_STORIES, files: '**/stories/*.stories.ts' },
  {
    directory: 'contributor-docs',
    files: '**/*.mdx',
    titlePrefix: 'Contributor docs',
  },
];

const TEST_FIXTURES = [
  { ...COMPONENT_STORIES, files: '**/*.test.ts' },
  { ...PATTERN_STORIES, files: '**/*.test.ts' },
  { ...CORE_STORIES, files: '**/*.test.ts' },
];

const VRT_STORIES = [
  { ...COMPONENT_STORIES, files: '**/*.vrt.ts' },
  { ...PATTERN_STORIES, files: '**/*.vrt.ts' },
];

// What each mode builds, spelled out per-mode rather than composed from
// flags, so "what does build actually include?" is answered by reading one
// array instead of tracing conditionals scattered through the file.
const STORIES_BY_MODE: Record<StorybookMode, StorybookConfig['stories']> = {
  // Full local Storybook: every story and doc, plus dev-only test fixtures.
  dev: [
    { ...COMPONENT_STORIES, files: '**/*.stories.ts' },
    { ...PATTERN_STORIES, files: '**/*.stories.ts' },
    { ...PATTERN_STORIES, files: '**/*.mdx' },
    { ...COMPONENT_STORIES, files: '**/*.mdx' },
    ...CORE_AND_CONTRIBUTOR_DOCS,
    ...GUIDES,
    ...TEST_FIXTURES,
    ...VRT_STORIES,
  ],
  // Production build: same as dev, minus internal-only stories/docs, core
  // controllers, contributor docs (both can pull in 1st-gen-linked
  // dependencies production doesn't need), and .test.ts fixtures.
  build: [
    { ...COMPONENT_STORIES, files: '**/!(*.internal).stories.ts' },
    { ...PATTERN_STORIES, files: '**/*.stories.ts' },
    { ...PATTERN_STORIES, files: '**/*.mdx' },
    { ...COMPONENT_STORIES, files: '**/!(*.internal).mdx' },
    ...GUIDES,
  ],
  // CI accessibility checks: component/pattern stories only. addon-docs
  // stays enabled (see `addons` below) so pattern .mdx still parses, but
  // component docs, core, contributor docs, and guides are all skipped —
  // they're not needed for axe checks.
  'ci-a11y': [
    { ...COMPONENT_STORIES, files: '**/*.stories.ts' },
    { ...PATTERN_STORIES, files: '**/*.stories.ts' },
    { ...PATTERN_STORIES, files: '**/*.mdx' },
  ],
  // Chromatic-only: just the hand-picked VRT stories, so the catalog never
  // lists the non-VRT stories it's configured to skip snapshotting anyway.
  vrt: VRT_STORIES,
};

const stories = STORIES_BY_MODE[storybookMode];

/**
 * ci-a11y mode needs docs (for MDX parsing); addon-a11y is excluded because
 * the test-runner handles axe analysis directly. Everything else (designs,
 * vitest, chromatic, screen-reader) is unnecessary overhead.
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
  '@github-ui/storybook-addon-performance-panel/universal',
];

if (storybookMode !== 'ci-a11y') {
  addons.push(
    '@storybook/addon-a11y',
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
  staticDirs: ['../public', { from: '../coverage', to: '/coverage' }],
  addons,
  experimental_indexers: [testStoryIndexer, vrtStoryIndexer],
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
