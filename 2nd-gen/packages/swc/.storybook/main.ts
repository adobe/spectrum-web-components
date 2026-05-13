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

  stories.push(
    // Consumer landing — empty until Phase 7 populates docs/get-started/index.mdx
    {
      directory: 'docs/get-started',
      files: '**/*.mdx',
      titlePrefix: 'Get started',
    },
    // Learn — consumer-audience educational content (about SWC, customization, accessibility).
    // MDX SSOTs hand-authored in .storybook/docs/learn/ for live demos and rich UX.
    {
      directory: 'docs/learn',
      files: '**/*.mdx',
      titlePrefix: 'Learn',
    },
    // Reference — consumer-audience reference content (MDX SSOTs).
    // Component status, design tokens, changelog, support, migration guides.
    {
      directory: 'docs/reference',
      files: '**/*.mdx',
      titlePrefix: 'Reference',
    },
    // Resources — changelog, migrate from gen1, support and compatibility.
    {
      directory: 'docs/resources',
      files: '**/*.mdx',
      titlePrefix: 'Resources',
    }
  );

  // Core package — visible in dev only. Folding Core under Reference is a
  // follow-up that would change /docs/core-* routes for existing consumers.
  if (storybookMode !== 'build') {
    stories.push(
      {
        ...CORE_STORY_ROOT,
        files: '**/*.mdx',
      },
      {
        ...CORE_STORY_ROOT,
        files: '**/stories/*.stories.ts',
      }
    );
  }

  // Contribute subtree is dev-only. Production Storybook ships the consumer-facing surface only;
  // contributor docs are consumed via GitHub or local `yarn dev` instead.
  // Auto-generated from CONTRIBUTOR-DOCS/{for-contributors,for-maintainers,project-planning}/
  // by 2nd-gen/packages/swc/.storybook/scripts/generate-contributor-docs.mjs.
  // See: CONTRIBUTOR-DOCS/project-planning/05_strategies/audience-based-docs-storybook-residency-audit.md
  if (storybookMode !== 'build') {
    stories.push({
      directory: 'docs/contribute',
      files: '**/*.mdx',
      titlePrefix: 'Contribute',
    });
  }
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
