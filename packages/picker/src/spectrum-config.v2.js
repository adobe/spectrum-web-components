/*
Copyright 2023 Adobe. All rights reserved.
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

// Prepopulate a converter with the base class name of the package in question.
const converter = converterFor('spectrum-Picker');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/picker',
            outPackage: 'picker',
            fileName: 'picker',
            hoistCustomPropertiesFrom: 'spectrum-Picker',
            components: [
                converter.classToId('spectrum-Picker', 'button'),
                converter.classToAttribute('spectrum-Picker--quiet'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-invalid', 'invalid'),
                converter.classToAttribute('is-open', 'open'),
                converter.classToAttribute('is-focused', 'focused'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Picker--sizeS', 's'],
                        ['spectrum-Picker--sizeM', 'm'],
                        ['spectrum-Picker--sizeL', 'l'],
                        ['spectrum-Picker--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToClass('spectrum-Picker-menuIcon', 'picker'),
                converter.classToClass('spectrum-Menu-checkmark', 'checkmark'),
                converter.classToClass('is-placeholder', 'placeholder'),
                converter.classToClass(
                    'spectrum-Picker-validationIcon',
                    'validation-icon'
                ),
                converter.classToClass('spectrum-Picker-icon', 'icon'),
                converter.classToId('spectrum-Picker-trigger', 'button'),
                converter.classToId('spectrum-Picker-label', 'label'),
                converter.classToId('spectrum-Picker-popover', 'popover'),
                {
                    find: [
                        builder.class('spectrum-Picker'),
                        builder.pseudoClass('focus'),
                    ],
                    replace: [
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoClass('focus'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Picker'),
                        {
                            type: 'pseudo-element',
                            kind: 'custom',
                            name: '-moz-focus-inner',
                        },
                    ],
                    replace: [
                        {
                            replace: builder.id('button'),
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
                {
                    find: [
                        builder.class('spectrum-Picker'),
                        builder.class('quiet'),
                        builder.id('button'),
                        builder.class('focus-visible'),
                    ],
                    replace: [
                        // {
                        //     replace: {
                        //         type: 'pseudo-class',
                        //         kind: 'host',
                        //         selectors: [builder.attribute('quiet')],
                        //     },
                        // },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.class('focus-visible'),
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
