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

import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import lit from 'eslint-plugin-lit';
import litA11y from 'eslint-plugin-lit-a11y';
import wc from 'eslint-plugin-wc';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import jsonc from 'eslint-plugin-jsonc';
import * as mdx from 'eslint-plugin-mdx';
import notice from 'eslint-plugin-notice';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsoncParser from 'jsonc-eslint-parser';

// ────────────────────────────────────────────────────────────────────────────────
// Custom rules (inlined from @spectrum-web-components/eslint-plugin)
// ────────────────────────────────────────────────────────────────────────────────

const swcPlugin = {
    rules: {
        'prevent-argument-names': {
            meta: {
                type: 'suggestion',
                docs: {
                    description:
                        'Prevent certain argument names from being used',
                },
                schema: [
                    {
                        type: 'array',
                        items: { type: 'string' },
                    },
                ],
            },
            create(context) {
                const disallowed = context.options[0] || [];
                return {
                    Identifier(node) {
                        if (
                            node.parent &&
                            (node.parent.type === 'FunctionDeclaration' ||
                                node.parent.type === 'FunctionExpression' ||
                                node.parent.type === 'ArrowFunctionExpression')
                        ) {
                            if (
                                node.parent.params &&
                                node.parent.params.includes(node)
                            ) {
                                if (disallowed.includes(node.name)) {
                                    context.report({
                                        node,
                                        message: `"${node.name}" shouldn't be used as an argument name`,
                                    });
                                }
                            }
                        }
                    },
                };
            },
        },
        'document-active-element': {
            meta: {
                type: 'problem',
                docs: {
                    description:
                        'Warn against using document.activeElement which can be incorrect across shadow boundaries',
                },
            },
            create(context) {
                return {
                    MemberExpression(node) {
                        if (
                            node.object.name === 'document' &&
                            node.property.name === 'activeElement'
                        ) {
                            context.report({
                                node,
                                message:
                                    '"document.activeElement" can be incorrect across shadow boundaries',
                            });
                        }
                    },
                };
            },
        },
    },
};

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

// ────────────────────────────────────────────────────────────────────────────────
// ESLint Flat Config
// ────────────────────────────────────────────────────────────────────────────────

export default defineConfig([
    // Global ignores
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/coverage/**',
            '**/*.d.ts',
            '1st-gen/packages/icons/src/icons-*.svg.ts',
            // Build outputs
            '1st-gen/packages/**/!(src)/**/*.js',
            '1st-gen/tools/**/!(src)/**/*.js',
            '2nd-gen/packages/**/dist/**',
            // Generated files
            '**/*.css.ts',
            '**/custom-elements.json',
            // Config files that shouldn't be linted with TS rules
            '*.config.js',
            '*.config.cjs',
            '*.config.mjs',
        ],
    },

    // Base recommended configs
    js.configs.recommended,

    // Prettier config (disables rules that conflict with Prettier)
    eslintConfigPrettier,

    // ────────────────────────────────────────────────────────────────────────────
    // TypeScript and JavaScript files
    // ────────────────────────────────────────────────────────────────────────────
    {
        files: ['**/*.ts', '**/*.js', '**/*.mjs', '**/*.cjs'],
        plugins: {
            '@typescript-eslint': tseslint,
            lit: lit,
            'lit-a11y': litA11y,
            wc: wc,
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
            // Browser globals for web component code.
            // Web components run exclusively in browsers and need access to DOM APIs.
            // Without these declarations, ESLint would flag browser APIs as undefined.
            // All are 'readonly' to prevent accidental reassignment (e.g., window = {}).
            globals: {
                // Core DOM - fundamental browser objects for DOM manipulation
                document: 'readonly',
                window: 'readonly',
                HTMLElement: 'readonly',
                Element: 'readonly',
                Node: 'readonly',

                // Web Components API - required for custom element registration
                customElements: 'readonly',
                ShadowRoot: 'readonly',
                DocumentFragment: 'readonly',

                // Events - used for dispatching and handling user interactions
                CustomEvent: 'readonly',
                Event: 'readonly',
                KeyboardEvent: 'readonly',
                MouseEvent: 'readonly',
                FocusEvent: 'readonly',
                PointerEvent: 'readonly',
                TouchEvent: 'readonly',

                // Timing - animations, debouncing, scheduling
                requestAnimationFrame: 'readonly',
                cancelAnimationFrame: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                queueMicrotask: 'readonly',

                // Browser APIs - environment detection, navigation, storage
                console: 'readonly',
                navigator: 'readonly',
                location: 'readonly',
                history: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',

                // Network - data fetching and request handling
                fetch: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',
                Headers: 'readonly',
                Request: 'readonly',
                Response: 'readonly',
                AbortController: 'readonly',
                AbortSignal: 'readonly',

                // Observers - reactive DOM monitoring for resize, mutation, visibility
                MutationObserver: 'readonly',
                ResizeObserver: 'readonly',
                IntersectionObserver: 'readonly',

                // CSS APIs - style computation and media queries
                getComputedStyle: 'readonly',
                matchMedia: 'readonly',
                CSS: 'readonly',
                CSSStyleSheet: 'readonly',

                // DOM utilities - text selection, parsing, serialization
                Range: 'readonly',
                Selection: 'readonly',
                DOMParser: 'readonly',
                XMLSerializer: 'readonly',

                // File/Blob APIs - file handling for uploads, downloads
                Blob: 'readonly',
                File: 'readonly',
                FileReader: 'readonly',
                FormData: 'readonly',

                // Performance - timing measurements and profiling
                performance: 'readonly',
                PerformanceObserver: 'readonly',
            },
        },
        rules: {
            // Copyright header (global for all .ts/.js files)
            'notice/notice': [
                'error',
                {
                    mustMatch:
                        'Copyright [0-9]{0,4} Adobe. All rights reserved.',
                    templateFile: 'config/HEADER.js',
                },
            ],

            // Console and debugger
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',

            // Curly braces required
            curly: ['error', 'all'],

            // TypeScript recommended rules (manually included since we use defineConfig)
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

            // TypeScript rules (customized)
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/explicit-function-return-type': [
                'warn',
                { allowExpressions: true },
            ],

            // Custom SWC rules
            'swc/prevent-argument-names': ['error', ['e', 'ev', 'evt', 'err']],
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

            // Sort imports (member sorting only, declaration sort handled by simple-import-sort)
            'sort-imports': [
                'error',
                {
                    allowSeparatedGroups: false,
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                },
            ],

            // Import sorting (declaration order)
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // Lit and external packages
                        [
                            '^lit',
                            '^@lit',
                            '^(?!@adobe/swc|@spectrum-web-components)@?\\w',
                        ],
                        // Internal packages
                        ['^@adobe/swc', '^@spectrum-web-components'],
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
    // Test and story files: relaxed rules
    // Browser globals are inherited from the main TypeScript config above.
    // These overrides disable rules that are too strict for test/story contexts.
    // ────────────────────────────────────────────────────────────────────────────
    {
        files: [
            '**/*.test.ts',
            '**/*.stories.ts',
            '**/test/**/*.ts',
            '**/benchmark/**/*.ts',
            '**/stories/**/*.ts',
        ],
        rules: {
            'swc/document-active-element': 'off',
            'import/no-extraneous-dependencies': 'off',
            'lit-a11y/no-autofocus': 'off',
            'lit-a11y/tabindex-no-positive': 'off',
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
    // Icons and elements: disable sort-imports
    // ────────────────────────────────────────────────────────────────────────────
    {
        files: ['**/icons/*.ts', '**/src/elements/*.ts'],
        rules: {
            'sort-imports': 'off',
        },
    },

    // ────────────────────────────────────────────────────────────────────────────
    // React wrappers: allow any
    // ────────────────────────────────────────────────────────────────────────────
    {
        files: ['**/react/**/*.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },

    // ────────────────────────────────────────────────────────────────────────────
    // Scripts: allow console.log
    // ────────────────────────────────────────────────────────────────────────────
    {
        files: ['**/scripts/**/*.js', '**/scripts/**/*.ts', 'scripts/**/*'],
        rules: {
            'no-console': 'off',
        },
    },

    // ────────────────────────────────────────────────────────────────────────────
    // JSON files
    // ────────────────────────────────────────────────────────────────────────────
    {
        files: ['**/*.json'],
        ignores: ['**/package.json', '**/tokens.json'],
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
    // tokens.json: disable sort-keys
    // ────────────────────────────────────────────────────────────────────────────
    {
        files: ['**/tokens.json'],
        plugins: {
            jsonc: jsonc,
        },
        languageOptions: {
            parser: jsoncParser,
        },
        rules: {
            ...jsonc.configs['recommended-with-jsonc'].rules,
            'jsonc/sort-keys': 'off',
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
