/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
// @ts-check

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-DatePicker');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/datepicker',
            outPackage: 'date-time-picker',
            fileName: 'date-time-picker',
            components: [
                converter.classToAttribute('spectrum-DatePicker--quiet'),
                converter.classToClass('spectrum-DatePicker-input', 'input'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute('is-keyboardFocused', 'focused'),
                converter.classToId(
                    'spectrum-DatePicker-textfield',
                    'textfield'
                ),
                {
                    find: [builder.class('spectrum-DatePicker-button')],
                    replace: [
                        {
                            replace: builder.element('sp-picker-button'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-DatePicker--quiet'),
                        builder.pseudoClass('hover'),
                        {
                            type: 'pseudo-class',
                            kind: 'not',
                            selectors: [
                                [builder.class('is-focused')],
                                [builder.class('is-keyboardFocused')],
                                [builder.class('is-disabled')],
                                [builder.class('is-invalid')],
                            ],
                        },
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.pseudoClass('hover')],
                            },
                        },
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'not',
                                selectors: [
                                    [builder.attribute('focused')],
                                    [builder.attribute('disabled')],
                                    [builder.attribute('invalid')],
                                ],
                            },
                        },
                    ],
                    collapseSelector: true,
                },
                {
                    find: [
                        builder.class('spectrum-DatePicker'),
                        {
                            type: 'pseudo-class',
                            kind: 'not',
                            selectors: [
                                [builder.class('spectrum-DatePicker--quiet')],
                                [builder.class('is-disabled')],
                            ],
                        },
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [
                                    {
                                        type: 'pseudo-class',
                                        kind: 'not',
                                        selectors: [
                                            [builder.attribute('quiet')],
                                            [builder.attribute('disabled')],
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                    collapseSelector: true,
                },
                {
                    find: [
                        builder.class('spectrum-DatePicker'),
                        builder.class('is-invalid'),
                        {
                            type: 'pseudo-class',
                            kind: 'not',
                            selectors: [
                                [builder.class('spectrum-DatePicker--quiet')],
                                [builder.class('is-disabled')],
                            ],
                        },
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [
                                    {
                                        type: 'attribute',
                                        name: 'invalid',
                                    },
                                    {
                                        type: 'pseudo-class',
                                        kind: 'not',
                                        selectors: [
                                            [builder.attribute('quiet')],
                                            [builder.attribute('disabled')],
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                    collapseSelector: true,
                },
                converter.classToHost('spectrum-DatePicker'),
                converter.classToAttribute('is-invalid', 'invalid'),
            ],
        },
    ],
};

export default config;
