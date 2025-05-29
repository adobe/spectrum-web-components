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

/** @type {import('stylelint').Config} */
export default {
    allowEmptyInput: true,
    cache: true,
    defaultSeverity: 'warning',
    extends: ['stylelint-config-standard'],
    plugins: [
        'stylelint-header',
        'stylelint-order',
        'stylelint-use-logical',
        '@spectrum-tools/stylelint-no-missing-var',
        '@spectrum-tools/stylelint-no-unused-custom-properties',
        '@spectrum-tools/stylelint-no-unknown-custom-properties',
    ],
    rules: {
        'header/header': [
            path.join(__dirname, 'config', 'license.js'),
            {
                nonMatchingTolerance: 0.8,
            },
            {
                fix: true,
            },
        ],

        /** --------------------------------------------------------------
         * Disabled rules
         * -------------------------------------------------------------- */
        'custom-property-empty-line-before': null,
        'declaration-block-no-redundant-longhand-properties': null,
        'declaration-empty-line-before': null,
        'import-notation': null,
        'no-descending-specificity': null,
        'number-max-precision': null,
        'selector-class-pattern': null,
        'no-duplicate-selectors': null,

        /** --------------------------------------------------------------
         * Customized rule settings
         * -------------------------------------------------------------- */
        /** @note use floats for opacity because it minifies better than percent */
        'alpha-value-notation': [
            'percentage',
            { exceptProperties: ['opacity'] },
        ],
        'at-rule-empty-line-before': [
            'always',
            {
                except: ['blockless-after-blockless', 'first-nested'],
                ignore: ['after-comment', 'first-nested'],
                ignoreAtRules: ['extend'],
            },
        ],
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['extend', 'each', 'include', 'mixin'],
            },
        ],
        'block-no-empty': [
            true,
            {
                ignore: ['comments'],
            },
        ],
        'color-function-notation': ['modern', { ignore: ['with-var-inside'] }],
        'comment-empty-line-before': [
            'always',
            {
                except: ['first-nested'],
                ignore: ['after-comment', 'stylelint-commands'],
                // don't require a newline before a passthrough flag
                ignoreComments: [
                    /^\s*@passthroughs?/,
                    /^\s*@deprecated?/,
                    /^\s*@todo?/,
                ],
            },
        ],
        'custom-property-pattern': [/^(spectrum|mod|swc|highcontrast|_)/, {}],
        'declaration-block-no-duplicate-custom-properties': true,
        'declaration-property-value-no-unknown': [
            true,
            {
                ignoreProperties: {
                    '/.+/': ['CanvasText', 'preserve-parent-color'],
                    '/word-break/': ['word-break'],
                },
            },
        ],
        'declaration-block-no-shorthand-property-overrides': true,
        'function-no-unknown': [
            true,
            {
                severity: 'warning',
            },
        ],
        'max-nesting-depth': [3, { severity: 'warning' }],
        'property-no-unknown': [
            true,
            {
                checkPrefixed: true,
            },
        ],
        'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
        'rule-empty-line-before': [
            'always',
            {
                except: ['first-nested'],
                ignore: ['after-comment'],
            },
        ],
        'selector-attribute-quotes': 'always',
        'selector-not-notation': 'complex',
        'value-keyword-case': [
            'lower',
            {
                camelCaseSvgKeywords: true,
                ignoreKeywords: ['Transparent', 'Text'],
            },
        ],
        'value-no-vendor-prefix': [
            true,
            {
                disableFix: true,
                severity: 'warning',
            },
        ],
        'property-no-vendor-prefix': [
            true,
            {
                ignoreProperties: ['-webkit-appearance'],
            },
        ],

        /** --------------------------------------------------------------
         * Plugins
         * -------------------------------------------------------------- */
        'csstools/use-logical': true,
        'order/order': ['custom-properties', 'declarations'],

        /** --------------------------------------------------------------
         * Local/custom plugins
         * -------------------------------------------------------------- */
        'spectrum-tools/no-missing-var': true,
        'spectrum-tools/no-unused-custom-properties': null,
        'spectrum-tools/no-unknown-custom-properties': null,
    },
    overrides: [
        {
            files: ['packages/*/src/*.css'],
            rules: {
                'spectrum-tools/no-unknown-custom-properties': [
                    true,
                    {
                        skipDependencies: false,
                        disableFix: true,
                        severity: 'warning',
                    },
                ],
                /** @note this enables reporting of unused variables in a file */
                'spectrum-tools/no-unused-custom-properties': [
                    true,
                    {
                        disableFix: true,
                        severity: 'warning',
                    },
                ],
            },
        },
    ],
};
