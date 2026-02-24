/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import lit from 'eslint-plugin-lit';
import litA11y from 'eslint-plugin-lit-a11y';
import wc from 'eslint-plugin-wc';
import jsdoc from 'eslint-plugin-jsdoc';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import jsonc from 'eslint-plugin-jsonc';
import * as mdx from 'eslint-plugin-mdx';
import notice from 'eslint-plugin-notice';
import storybook from 'eslint-plugin-storybook';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsoncParser from 'jsonc-eslint-parser';
import globals from 'globals';

const __dirname = dirname(fileURLToPath(import.meta.url));
import { swcPlugin } from '@spectrum-web-components/eslint-plugin';

// ────────────────────────────────────────────────────────────────────────────────
// Package.json key ordering for jsonc/sort-keys
// ────────────────────────────────────────────────────────────────────────────────

const packageJsonKeyOrder = [
  '$schema',
  'name',
  'version',
  'private',
  'description',
  'license',
  'author',
  'maintainers',
  'contributors',
  'homepage',
  'repository',
  'bugs',
  'type',
  'exports',
  'main',
  'module',
  'browser',
  'man',
  'preferGlobal',
  'bin',
  'files',
  'directories',
  'scripts',
  'config',
  'sideEffects',
  'types',
  'typings',
  'workspaces',
  'resolutions',
  'dependencies',
  'bundleDependencies',
  'bundledDependencies',
  'peerDependencies',
  'peerDependenciesMeta',
  'optionalDependencies',
  'devDependencies',
  'keywords',
  'engines',
  'engineStrict',
  'os',
  'cpu',
  'publishConfig',
];

// ────────────────────────────────────────────────────────────────────────────────
// Shared allow-list for lit-a11y/click-events-have-key-events
// These components handle keyboard events internally, so click handlers on them
// don't need separate keyboard event handlers.
// ────────────────────────────────────────────────────────────────────────────────

const clickEventsAllowList = [
  'sp-button',
  'sp-action-button',
  'sp-checkbox',
  'sp-radio',
  'sp-switch',
  'sp-menu-item',
  'sp-clear-button',
  'sp-underlay',
];

/**
 * Test-library globals not included in the globals package.
 * Sinon is a test spy/stub library; Mocha is referenced as a namespace in some tests.
 */
const testLibGlobals = {
  sinon: 'readonly',
  Mocha: 'readonly',
};

// ────────────────────────────────────────────────────────────────────────────────
// ESLint Flat Config
// ────────────────────────────────────────────────────────────────────────────────

export default defineConfig([
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
      '**/coverage/**',
      '**/.wireit/**',
      '**/out/**',
      '**/out-tsc/**',
      '**/_site/**',
      '**/.tmp/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/*.d.ts',
      '1st-gen/packages/icons/src/icons-*.svg.ts',
      // Build outputs
      '1st-gen/packages/**/!(src)/**/*.js',
      '1st-gen/tools/**/!(src)/**/*.js',
      '1st-gen/projects/**/!(src)/**/*.js',
      '1st-gen/test/*.js',
      '1st-gen/test/plugins/*.js',
      '1st-gen/test/visual/*.js',
      '2nd-gen/packages/**/dist/**',
      // Icons
      '1st-gen/packages/icons/**',
      '1st-gen/packages/iconset/**',
      '1st-gen/packages/icons-ui/**',
      '1st-gen/packages/icons-workflow/**',
      // Generated files
      '**/*.css.ts',
      '**/custom-elements.json',
      '**/tokens.css',
      '**/tokens.json',
      // Config and tooling files (Node env; skip lint to avoid needing node globals for many files)
      '**/*.config.js',
      '**/*.config.cjs',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/plopfile.js',
      '**/.eleventy.js',
      '**/web-dev-server.config.*',
      '**/web-test-runner*.js',
      '**/content/_data/*.js',
      '**/*.hbs',
    ],
  },

  // Base recommended configs
  js.configs.recommended,

  // Prettier config (disables rules that conflict with Prettier)
  eslintConfigPrettier,

  // ────────────────────────────────────────────────────────────────────────────
  // TypeScript and JavaScript files (shared rules only; TS rules in next block)
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: ['**/*.ts', '**/*.js', '**/*.mjs', '**/*.cjs'],
    plugins: {
      '@typescript-eslint': tseslint,
      lit: lit,
      'lit-a11y': litA11y,
      wc: wc,
      jsdoc: jsdoc,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      notice: notice,
      swc: swcPlugin,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    rules: {
      // Copyright header (global for all .ts/.js files)
      'notice/notice': [
        'error',
        {
          mustMatch: `Copyright ${new Date().getFullYear()} Adobe. All rights reserved.`,
          templateFile: resolve(__dirname, 'linters/HEADER.js'),
          onNonMatchingHeader: 'replace',
        },
      ],

      // Console and debugger
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',

      // Curly braces required
      curly: ['error', 'all'],

      // Unused vars (JS only; TS uses @typescript-eslint/no-unused-vars in next block)
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Custom SWC rules
      'swc/prevent-argument-names': [
        'error',
        { disallowed: ['e', 'ev', 'evt', 'err'] },
      ],
      'swc/document-active-element': 'error',

      // Import rules
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: false,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],

      // Accessibility
      'lit-a11y/click-events-have-key-events': [
        'error',
        { allowList: clickEventsAllowList },
      ],

      // Lit plugin rules (recommended)
      'lit/attribute-value-entities': 'error',
      'lit/binding-positions': 'error',
      'lit/no-duplicate-template-bindings': 'error',
      'lit/no-invalid-escape-sequences': 'error',
      'lit/no-invalid-html': 'error',
      'lit/no-legacy-imports': 'error',
      'lit/no-legacy-template-syntax': 'error',
      'lit/no-private-properties': 'error',
      'lit/no-property-change-update': 'error',
      'lit/no-template-arrow': 'warn',
      'lit/no-template-bind': 'warn',
      'lit/no-useless-template-literals': 'error',
      'lit/no-value-attribute': 'error',
      'lit/prefer-nothing': 'warn',
      'lit/quoted-expressions': ['error', 'never'],

      // Web Components plugin rules (recommended)
      'wc/attach-shadow-constructor': 'error',
      'wc/guard-super-call': 'error',
      'wc/no-closed-shadow-root': 'error',
      'wc/no-constructor-attributes': 'error',
      'wc/no-constructor-params': 'error',
      'wc/no-invalid-element-name': 'error',
      'wc/no-self-class': 'error',
      'wc/no-typos': 'error',
      'wc/require-listener-teardown': 'error',

      // JSDoc plugin rules (minimal set for consistency)
      // Focus on formatting and accuracy, not requiring docs everywhere.
      'jsdoc/check-alignment': 'error', // Consistent asterisk alignment
      'jsdoc/check-param-names': 'error', // Param names match function signature
      'jsdoc/check-tag-names': [
        'error',
        {
          // Custom tags used by Custom Elements Manifest (CEM)
          definedTags: [
            'element', // Custom element tag name
            'slot', // Slot documentation
            'csspart', // CSS part documentation
            'cssproperty', // CSS custom property documentation
            'fires', // Event documentation
            'attr', // Attribute shorthand
            'attribute', // Attribute documentation
            'internal', // Internal member marker
          ],
        },
      ],
      'jsdoc/check-types': 'warn', // Valid type syntax in JSDoc (prefer lowercase primitives)
      'jsdoc/no-undefined-types': 'off', // Disabled: TS handles type checking, JSDoc types are often custom
      'jsdoc/require-param-description': 'warn', // Params should have descriptions
      'jsdoc/require-returns-description': 'warn', // Returns should have descriptions
      'jsdoc/valid-types': 'warn', // Type expressions are valid (warn for @internal usage)
      'jsdoc/lines-before-block': 'error',
      'jsdoc/tag-lines': ['error', 'any', { startLines: 1, endLines: 0 }],

      // Import sorting (declaration and member order)
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Lit and external packages
            [
              '^lit',
              '^@lit',
              '^(?!@adobe/spectrum-wc|@spectrum-web-components)@?\\w',
            ],
            // Internal packages
            ['^@adobe/spectrum-wc', '^@spectrum-web-components'],
            // Side effect imports
            ['^\\u0000'],
            // Relative imports
            ['^\\.'],
            // Style imports
            ['^.+\\.(css|scss|sass|less|styl)$'],
          ],
        },
      ],

      // Import extensions
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          ts: 'never',
        },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Files that may start with shebang (#!/usr/bin/env node): use swc/notice-
  // after-shebang (not notice/notice) so the header is required directly under
  // the shebang and fix inserts or replaces it there.
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: [
      '.github/scripts/**/*.js',
      'scripts/**/*.js',
      'scripts/*.js',
      '1st-gen/scripts/**/*.js',
      '1st-gen/projects/**/scripts/**/*.js',
      'CONTRIBUTOR-DOCS/**/*.js',
      '2nd-gen/packages/tools/**/*.js',
    ],
    plugins: { swc: swcPlugin },
    rules: {
      'notice/notice': 'off',
      'swc/notice-after-shebang': [
        'error',
        {
          templateFile: 'linters/HEADER.js',
          onNonMatchingHeader: 'replace',
        },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Header file: disable notice rule
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: ['linters/HEADER.js'],
    rules: {
      'notice/notice': 'off',
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // TypeScript only: enable type-aware rules (not applied to .js/.mjs/.cjs)
  // no-undef off: TypeScript compiler handles undefined checks and DOM/built-in types.
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off',
      'no-redeclare': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/triple-slash-reference': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Node/scripts: globals for .js/.ts that runs in Node (config files are ignored above)
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: [
      'scripts/**/*',
      '**/scripts/**/*.js',
      '**/scripts/**/*.ts',
      'linters/**/*.js',
      '.github/**/*.js',
      '1st-gen/test/visual/**/*.js',
      '1st-gen/test/plugins/**/*.js',
      '1st-gen/test/testing-helpers.js',
      '1st-gen/test/benchmark/cli.ts',
      '1st-gen/web-test-runner*.js',
      '1st-gen/storybook/**/*.js',
      'CONTRIBUTOR-DOCS/**/*.js',
      '2nd-gen/packages/tools/**/*.ts',
      '2nd-gen/packages/tools/**/*.js',
      '1st-gen/packages/icons-workflow/bin/**/*.js',
      '1st-gen/packages/icons-ui/bin/**/*.js',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Test and story files: relaxed rules and Mocha globals for .js
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: [
      '**/*.test.ts',
      '**/*.test.js',
      '**/*.test-vrt.ts',
      '**/*.test-vrt.js',
      '**/*.stories.ts',
      '**/*.spec.ts',
      '**/test/**/*.ts',
      '**/test/**/*.js',
      '**/benchmark/**/*.ts',
      '**/stories/**/*.ts',
      '**/e2e/**/*.ts',
      '**/.storybook/**',
      '**/storybook/**',
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.mocha, ...testLibGlobals },
    },
    rules: {
      'swc/document-active-element': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      'lit-a11y/no-autofocus': 'off',
      'lit-a11y/tabindex-no-positive': 'off',
      // Chai assertions use expressions like expect(x).to.be.true
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Story files: allow console.log
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: ['**/*.stories.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Storybook plugin: recommended rules for story files (CSF format, naming, etc.)
  // ────────────────────────────────────────────────────────────────────────────
  ...storybook.configs['flat/recommended'],
  // 2nd-gen test files are CSF story files using play functions (e.g., asset.test.ts)
  {
    files: ['2nd-gen/**/test/*.test.ts'],
    plugins: { storybook: storybook },
    rules: {
      'storybook/await-interactions': 'error',
      'storybook/context-in-play-function': 'error',
      'storybook/default-exports': 'error',
      'storybook/hierarchy-separator': 'warn',
      'storybook/no-redundant-story-name': 'warn',
      'storybook/prefer-pascal-case': 'warn',
      'storybook/story-exports': 'error',
      'storybook/use-storybook-expect': 'error',
      'storybook/use-storybook-testing-library': 'error',
    },
  },
  {
    files: ['**/*.stories.ts', '**/*.stories.js', '2nd-gen/**/test/*.test.ts'],
    rules: {
      // Project imports from @storybook/web-components intentionally
      'storybook/no-renderer-packages': 'off',
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // React wrappers: generated files — relax rules that don't apply
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: ['**/react/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      // Generated wrappers import react/next as peer deps of the consumer project
      'import/no-extraneous-dependencies': 'off',
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Scripts: allow console.log and devDependencies imports
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: ['**/scripts/**/*.js', '**/scripts/**/*.ts', 'scripts/**/*'],
    rules: {
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 1st-gen project and tool files: allow devDependencies imports
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: [
      '1st-gen/projects/**/*.js',
      '1st-gen/projects/**/*.ts',
      '1st-gen/tools/**/*.js',
      '1st-gen/tools/**/*.ts',
      '1st-gen/rollup.checksize.js',
    ],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'jsdoc/valid-types': 'off',
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // JSON files
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: ['**/*.json'],
    ignores: ['**/package.json'],
    plugins: {
      jsonc: jsonc,
    },
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      ...jsonc.configs['recommended-with-jsonc'].rules,
      'jsonc/sort-keys': 'warn',
      'notice/notice': 'off',
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // package.json files: custom key ordering
  // ────────────────────────────────────────────────────────────────────────────
  {
    files: ['**/package.json'],
    plugins: {
      jsonc: jsonc,
    },
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      ...jsonc.configs['recommended-with-jsonc'].rules,
      'jsonc/sort-keys': [
        'warn',
        {
          hasProperties: ['type'],
          order: packageJsonKeyOrder,
          pathPattern: '^$',
        },
        {
          order: { type: 'asc' },
          pathPattern: '^(?!exports\\[).*',
        },
      ],
      'notice/notice': 'off',
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Markdown and MDX files
  // ────────────────────────────────────────────────────────────────────────────
  // Note: Code block linting is disabled because documentation often contains
  // partial code snippets that won't parse as complete files (e.g., method
  // implementations without class wrappers). MDX file structure is still linted.
  {
    ...mdx.flat,
    // Disable code block linting - docs contain partial code snippets
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
    rules: {
      // MDX imports are used in the template, not JS - disable unused vars
      'no-unused-vars': 'off',
      // Markdown content may have special whitespace characters
      'no-irregular-whitespace': 'off',
    },
  },
]);
