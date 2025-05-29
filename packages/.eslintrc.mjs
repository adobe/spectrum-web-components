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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    root: true,
    env: {
        browser: true,
        node: false,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'notice',
        '@spectrum-web-components',
        'import',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:lit-a11y/recommended',
    ],
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: false,
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],
        'no-debugger': 2,
        'no-console': [
            'error',
            {
                allow: ['warn', 'error'],
            },
        ],
        '@spectrum-web-components/prevent-argument-names': [
            'error',
            ['e', 'ev', 'evt', 'err'],
        ],
        '@spectrum-web-components/document-active-element': ['error'],
        'notice/notice': [
            'error',
            {
                mustMatch: 'Copyright [0-9]{0,4} Adobe. All rights reserved.',
                templateFile: path.join(
                    __dirname,
                    '..',
                    'config',
                    'license.js'
                ),
            },
        ],
        '@typescript-eslint/explicit-function-return-type': [
            1,
            {
                allowExpressions: true,
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
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
            },
        ],
    },
    overrides: [
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
    ],
};
