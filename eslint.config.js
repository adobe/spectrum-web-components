/*!
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

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import notice from 'eslint-plugin-notice';
import * as spectrumWebComponents from '@spectrum-web-components/eslint-plugin';
import _import from 'eslint-plugin-import';
import importExtensions from 'eslint-plugin-import-extensions';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import litA11y from 'eslint-plugin-lit-a11y';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(
    // Global ignores
    globalIgnores([
        'node_modules',
        'node_modules/**/*',
        'packages/**/*.d.ts',
        'packages/*/node_modules/**/*',
        'tools/**/*.d.ts',
        'tools/*/node_modules/**/*',
        'tools/base/src/version.js',
        'projects/**/*.d.ts',
        'projects/*/node_modules/**/*',
        'config/*',
    ]),

    // Base configuration for all files
    {
        plugins: {
            notice,
            'spectrum-web-components': spectrumWebComponents,
            import: _import,
            js,
            'import-extensions': importExtensions,
            prettier: eslintPluginPrettier,
            'lit-a11y': litA11y,
        },
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        settings: {
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },
    },

    // Main rules configuration
    {
        rules: {
            curly: ['error', 'all'],
            'no-debugger': 'error',
            'no-console': [
                'error',
                {
                    allow: ['warn', 'error'],
                },
            ],
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    ts: 'never',
                },
            ],
            'import/prefer-default-export': 'off',
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: false,
                    optionalDependencies: false,
                    peerDependencies: false,
                },
            ],
            'spectrum-web-components/prevent-argument-names': [
                'error',
                ['e', 'ev', 'evt', 'err'],
            ],
            'notice/notice': [
                'error',
                {
                    mustMatch:
                        'Copyright [0-9]{0,4} Adobe. All rights reserved.',
                    templateFile: path.resolve(
                        __dirname,
                        './config/license.js'
                    ),
                },
            ],
            'sort-imports': [
                'error',
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    allowSeparatedGroups: false,
                },
            ],
            'lit-a11y/click-events-have-key-events': [
                'error',
                {
                    allowList: [
                        'sp-button',
                        'sp-action-button',
                        'sp-checkbox',
                        'sp-radio',
                        'sp-switch',
                        'sp-menu-item',
                        'sp-clear-button',
                        'sp-underlay',
                    ],
                },
            ],
            // Prettier rules
            'prettier/prettier': 'error',
            'arrow-body-style': 'off',
            'prefer-arrow-callback': 'off',
            ...eslintConfigPrettier.rules,
        },
    },

    // Add typescript to the set of default
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true,
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },

    // Script-specific overrides, these are not typescript assets
    {
        files: ['scripts/*.js', 'tools/icons-*/bin/*.js'],
        rules: {
            'no-console': 'off',
        },
    },

    // React-specific overrides
    {
        files: ['react/**/*.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        files: [
            '*.test.ts',
            '*.stories.ts',
            '**/benchmark/*.ts',
            '**/test/*.ts',
        ],
        rules: {
            '@spectrum-web-components/document-active-element': ['off'],
            'lit-a11y/no-autofocus': ['off'],
            'lit-a11y/tabindex-no-positive': ['off'],
            'import/no-extraneous-dependencies': ['off'],
        },
    },
    {
        files: ['**/icons/*.ts', '**/src/elements/*.ts'],
        rules: {
            'sort-imports': ['off'],
        },
    },
    {
        files: ['*.stories.ts'],
        rules: {
            'no-console': ['off'],
        },
    },
    {
        files: ['Picker.ts'],
        rules: {
            'lit-a11y/click-events-have-key-events': [
                'error',
                {
                    allowList: [
                        'sp-button',
                        'sp-action-button',
                        'sp-checkbox',
                        'sp-radio',
                        'sp-switch',
                        'sp-menu-item',
                        'sp-clear-button',
                        'sp-underlay',
                        'sp-popover',
                    ],
                },
            ],
        },
    },
);
