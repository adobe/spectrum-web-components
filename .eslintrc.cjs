/* eslint-disable @typescript-eslint/no-var-requires */
/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const path = require('path');

module.exports = {
    root: true,
    plugins: [
        '@typescript-eslint',
        'notice',
        '@spectrum-web-components',
        'import',
        'require-extensions',
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        curly: ['error', 'all'],
        'no-debugger': 2,
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
        '@spectrum-web-components/prevent-argument-names': [
            'error',
            ['e', 'ev', 'evt', 'err'],
        ],
        'notice/notice': [
            'error',
            {
                mustMatch: 'Copyright [0-9]{0,4} Adobe. All rights reserved.',
                templateFile: path.join(__dirname, 'config/license.js'),
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
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:lit-a11y/recommended',
        'plugin:require-extensions/recommended',
    ],
    overrides: [
        {
            files: ['scripts/*'],
            rules: {
                'no-console': ['off'],
            },
        },
    ],
};
