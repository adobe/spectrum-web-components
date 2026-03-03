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
import { dirname, resolve } from 'path';
import remarkGfm from 'remark-gfm';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const includeTestStories = process.env.NODE_ENV !== 'production';
// Used by 2nd-gen Playwright a11y runs to avoid loading docs/guides that pull 1st-gen artifacts.
const componentsOnlyMode = process.env.SWC_STORYBOOK_COMPONENTS_ONLY === 'true';
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
];

/**
 * Added this intentionally for the 2nd-gen a11y CI mode.
 * When componentsOnlyMode is enabled, Storybook only loads component stories and skips learn-about-swc / guides MDX content. Those doc trees can pull additional dependencies (including 1st-gen-linked paths), which we don’t need for ARIA snapshot coverage and which were contributing to CI startup/build failures.
 * This keeps the a11y test Storybook surface minimal and more stable, while normal dev/docs behavior stays unchanged when the flag is off.
 */

if (!componentsOnlyMode) {
  stories.push(
    {
      directory: 'learn-about-swc',
      files: '*.mdx',
      titlePrefix: 'Learn about SWC',
    },
    {
      directory: 'guides',
      files: '**/!(*documentation).mdx',
      titlePrefix: 'Guides',
    }
  );
}

if (includeTestStories) {
  stories.push({
    directory: '../components',
    files: '**/*.test.ts',
    titlePrefix: 'Components',
  });
}

/**
 * This split is intentional for the 2nd-gen a11y CI mode.
 * We keep the standard Storybook addons by default, but conditionally disable the local screen-reader-addon when componentsOnlyMode is enabled.
 * Reason: that addon imports several 1st-gen components (sp-switch, sp-textfield, sp-help-text, sp-field-label), which brings in 1st-gen build artifacts and caused the CI startup failures in the 2nd-gen-only pipeline.
 * So this keeps normal developer/docs behavior unchanged, while the a11y snapshot run uses a minimal addon surface and avoids unintended 1st-gen coupling.
 */

const addons = [
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
];

if (!componentsOnlyMode) {
  addons.push(resolve(__dirname, './addons/screen-reader-addon'));
}

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories,
  experimental_indexers: includeTestStories ? [testStoryIndexer] : [],
  docs: {
    defaultName: 'README',
  },
  framework: '@storybook/web-components-vite',
  core: {
    disableTelemetry: true,
  },
  addons,
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
