// @ts-check
/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-PickerButton');

/**
 * @property {string} size
 * @returns {import('../../../tasks/spectrum-css-converter').ComplexSelectorConversion[]}
 */
const convertSize = (size) => [
    {
        collapseSelector: true,
        find: [
            // .spectrum-PickerButton.spectrum-PickerButton--sizeS
            builder.class('spectrum-PickerButton'),
            builder.class('spectrum-PickerButton--size' + size.toUpperCase()),
        ],
        replace: [
            {
                replace: {
                    type: 'pseudo-class',
                    kind: 'host',
                    selectors: [builder.attribute('size', size)],
                },
            },
            {
                replace: builder.combinator(' '),
            },
            {
                replace: builder.class('root'),
            },
        ],
    },
    {
        // .spectrum-PickerButton.spectrum-PickerButton--textuiicon.spectrum-PickerButton--sizeXL
        collapseSelector: true,
        find: [
            builder.class('spectrum-PickerButton'),
            builder.class('spectrum-PickerButton--textuiicon'),
            builder.class('spectrum-PickerButton--size' + size.toUpperCase()),
        ],
        replace: [
            //:host([dir='ltr'][size='xl']) .root.textuiicon
            {
                replace: {
                    type: 'pseudo-class',
                    kind: 'host',
                    selectors: [builder.attribute('size', size)],
                },
            },
            {
                replace: builder.combinator(' '),
            },
            {
                replace: builder.class('textuiicon'),
            },
        ],
    },
    // .spectrum-PickerButton.spectrum-PickerButton--icononly.spectrum-PickerButton--sizeXL
    {
        collapseSelector: true,
        find: [
            builder.class('spectrum-PickerButton'),
            builder.class('spectrum-PickerButton--icononly'),
            builder.class('spectrum-PickerButton--size' + size.toUpperCase()),
        ],
        replace: [
            //:host([dir='ltr'][size='xl']) .root.textuiicon
            {
                replace: {
                    type: 'pseudo-class',
                    kind: 'host',
                    selectors: [builder.attribute('size', size)],
                },
            },
            {
                replace: builder.combinator(' '),
            },
            {
                replace: builder.class('spectrum-PickerButton--icononly'),
            },
        ],
    },
    // .spectrum-PickerButton.spectrum-PickerButton--uiicononly.spectrum-PickerButton--sizeXL
    {
        collapseSelector: true,
        find: [
            builder.class('spectrum-PickerButton'),
            builder.class('spectrum-PickerButton--uiicononly'),
            builder.class('spectrum-PickerButton--size' + size.toUpperCase()),
        ],
        replace: [
            //:host([dir='ltr'][size='xl']) .root.textuiicon
            {
                replace: {
                    type: 'pseudo-class',
                    kind: 'host',
                    selectors: [builder.attribute('size', size)],
                },
            },
            {
                replace: builder.combinator(' '),
            },
            {
                replace: builder.class('uiicononly'),
            },
        ],
    },
];

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/pickerbutton',
            outPackage: 'picker-button',
            fileName: 'picker-button',
            components: [
                converter.classToClass('spectrum-PickerButton', 'root'),
                converter.classToAttribute('is-focused', 'focused'),
                {
                    find: [builder.pseudoClass('focus')],
                    replace: [
                        {
                            replace: builder.pseudoClass('focus'),
                            hoist: false,
                        },
                    ],
                },
                {
                    find: [builder.pseudoClass('hover')],
                    replace: [
                        {
                            replace: builder.pseudoClass('hover'),
                            hoist: false,
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-PickerButton'),
                        {
                            type: 'pseudo-element',
                            kind: 'custom',
                            name: '-moz-focus-inner',
                        },
                    ],
                    replace: [
                        {
                            replace: builder.class('root'),
                        },
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'custom',
                                name: '-moz-focus-inner',
                            },
                        },
                    ],
                },
                converter.pseudoToAttribute('disabled', 'disabled'),
                ...convertSize('s'),
                ...convertSize('m'),
                ...convertSize('l'),
                ...convertSize('xl'),
                converter.notToAttribute('is-open', 'open'),
                converter.classToAttribute('is-open', 'open'),
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.pseudoClass('disabled')]],
                    },
                    replace: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.attribute('disabled')]],
                    },
                    hoist: true,
                },
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'active',
                    },
                    replace: {
                        type: 'pseudo-class',
                        kind: 'is',
                        selectors: [
                            [
                                {
                                    type: 'pseudo-class',
                                    kind: 'active',
                                },
                            ],
                            [
                                {
                                    type: 'attribute',
                                    name: 'active',
                                },
                            ],
                        ],
                    },
                    hoist: true,
                },
                converter.classToAttribute('is-invalid', 'invalid'),
                converter.notToAttribute('is-invalid', 'invalid'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-PickerButton--right'],
                        ['spectrum-PickerButton--left'],
                    ],
                    'position'
                ),
                converter.classToAttribute('spectrum-PickerButton--rounded'),
                converter.notToAttribute(
                    'spectrum-PickerButton--rounded',
                    'rounded'
                ),
                converter.classToAttribute(
                    'spectrum-PickerButton--low',
                    'quiet'
                ),
                converter.classToClass('spectrum-PickerButton--uiicononly'),
                converter.classToClass('spectrum-PickerButton--textuiicon'),
            ],
            excludeByComponents: [
                builder.class('spectrum--medium'),
                builder.class('spectrum--large'),
            ],
        },
    ],
};

export default config;
