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
import postcssToken from '@adobe/postcss-token';
import autoprefixer from 'autoprefixer';
import { glob } from 'glob';
import { resolve } from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import litCss from 'vite-plugin-lit-css';

// Match swc's stylesheet pipeline so `token()` in the shared icon-base.css resolves.
// vite-plugin-lit-css wraps Vite's css-post transform, so these run on the lit-css
// import too.
const postcssPlugins = [
  postcssToken({ prefix: 'swc' }),
  autoprefixer(),
  postcssPresetEnv({
    stage: 2,
    features: {
      'nesting-rules': false,
      'custom-properties': false,
      'light-dark-function': false,
      'logical-properties-and-values': false,
      'is-pseudo-class': false,
      'cascade-layers': false,
      'dir-pseudo-class': false,
    },
  }),
];

const srcRoot = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [
    litCss(),
    dts({
      include: ['src/**/*.ts'],
      exclude: [
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.stories.ts',
        '**/*.vrt.ts',
      ],
      entryRoot: 'src',
      outDir: 'dist',
      beforeWriteFile: (filePath, content) => {
        return {
          filePath,
          content: content
            // Type imports of core can become relative (`../../core/...`); point them
            // back at the package so the published .d.ts resolves. Mirrors swc.
            .replace(/(\.\.\/)+core\//g, '@adobe/spectrum-wc-core/'),
        };
      },
    }),
  ],
  css: {
    transformer: 'postcss',
    postcss: {
      plugins: postcssPlugins,
    },
  },
  build: {
    lib: {
      // Every generated function, element, and the two barrels is an entry so each icon
      // is a standalone module (per-icon tree-shaking).
      entry: glob.sync(resolve(srcRoot, '*.ts')),
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => {
        return (
          id === 'lit' ||
          id.startsWith('lit/') ||
          id.startsWith('@lit/') ||
          id.startsWith('@adobe/spectrum-wc-core/')
        );
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
      },
    },
    target: 'es2018',
    cssMinify: 'esbuild',
    sourcemap: true,
    emptyOutDir: true,
    outDir: 'dist',
  },
  resolve: {
    // Match swc: resolve core and the token tooling to source so a source-based
    // Storybook (run from swc) can consume this package without a prior build.
    alias: [
      {
        find: '@adobe/spectrum-wc-core',
        replacement: resolve(__dirname, '../core'),
      },
      {
        find: '@adobe/postcss-token',
        replacement: resolve(__dirname, '../tools/postcss-token'),
      },
      {
        find: '@adobe/swc-tokens',
        replacement: resolve(__dirname, '../tools/swc-tokens'),
      },
    ],
  },
  esbuild: {
    target: 'es2018',
  },
});
