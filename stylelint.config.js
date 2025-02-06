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

export default {
    plugins: ['stylelint-header'],
    extends: ['stylelint-config-standard'],
    rules: {
        'header/header': [
            './COPYRIGHT',
            { nonMatchingTolerance: 0.8 },
            { fix: true },
        ],
        'length-zero-no-unit': [true, { ignore: 'custom-properties' }],
        'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
        'selector-pseudo-element-colon-notation': ['single', {}],
        'custom-property-pattern': '^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
        'no-duplicate-selectors': null,
        'selector-class-pattern': null,
        'no-descending-specificity': null,
        'declaration-block-no-redundant-longhand-properties': null,
    },
    overrides: [
        {
            files: [
                'packages/**/src/spectrum-*.css',
                'tools/**/src/spectrum-*.css',
                'tools/styles/**/*.css',
            ],
            extends: [],
            rules: {
                'header/header': [
                    './COPYRIGHT',
                    { nonMatchingTolerance: 0.8 },
                    { fix: true },
                ],
            },
        },
    ],
};
