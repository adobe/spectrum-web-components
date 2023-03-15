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
                    // .spectrum-Picker--quiet:focus-visible
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.pseudoClass('focus-visible'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.class('focus-visible'),
                        },
                    ],
                },
                {
                    // .spectrum-Picker--quiet.focus-ring
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.class('focus-ring'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoClass('focus-visible'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.class('is-focused'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.attribute('focused'),
                        },
                    ],
                },
                {
                    // .spectrum-Picker.is-invalid.focus-ring
                    find: [
                        builder.class('spectrum-Picker'),
                        builder.class('is-invalid'),
                        builder.class('focus-ring'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('invalid')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.class('focus-visible'),
                        },
                    ],
                },

                {
                    // .spectrum-Picker--quiet:disabled.focus-ring, :host([quiet]) #button:disabled.focus-visible
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.pseudoClass('disabled'),
                        builder.class('focus-ring'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoClass('disabled'),
                        },
                        {
                            replace: builder.class('focus-visible'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.pseudoClass('disabled'),
                        builder.pseudoClass('focus-visible'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoClass('disabled'),
                        },
                        {
                            replace: builder.pseudoClass('focus-visible'),
                        },
                    ],
                },
                {
                    // .spectrum-Picker--quiet.is-disabled.focus-ring
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.class('is-disabled'),
                        builder.class('focus-ring'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [
                                    builder.attribute('quiet'),
                                    builder.attribute('disabled'),
                                ],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.class('focus-visible'),
                        },
                    ],
                },
                {
                    // .spectrum-Picker--quiet.is-disabled.focus-ring
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.class('is-disabled'),
                        builder.class('focus-ring'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [
                                    builder.attribute('quiet'),
                                    builder.attribute('disabled'),
                                ],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoClass('focus-visible'),
                        },
                    ],
                },
                {
                    // .spectrum-Picker--quiet:disabled:focus-visible
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.class('is-disabled'),
                        builder.pseudoClass('focus-visible'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoClass('disabled'),
                        },
                        {
                            replace: builder.pseudoClass('focus-visible'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.pseudoClass('hover'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoClass('hover'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.pseudoElement('after'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoElement('after'),
                        },
                    ],
                },
                {
                    // :host([quiet]) #button.focus-visible:after
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.pseudoClass('focus-visible'),
                        builder.pseudoElement('after'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.class('focus-visible'),
                        },
                        {
                            replace: builder.pseudoElement('after'),
                        },
                    ],
                },
                {
                    // :host([quiet]) #button:focus-visible:after
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.class('focus-ring'),
                        builder.pseudoElement('after'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoClass('focus-visible'),
                        },
                        {
                            replace: builder.pseudoElement('after'),
                        },
                    ],
                },
                {
                    //:host([quiet][focused]) #button:after
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.class('is-focused'),
                        builder.pseudoElement('after'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.attribute('focused'),
                        },
                        {
                            replace: builder.pseudoElement('after'),
                        },
                    ],
                },
                {
                    //:host([quiet]) #button:active
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.pseudoClass('active'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoClass('active'),
                        },
                    ],
                },
                {
                    //:host([quiet][open]) #button
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.class('is-open'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.attribute('open'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Picker'),
                        builder.class('spectrum-Picker-icon'),
                    ],
                    replace: [
                        {
                            replace: builder.class('icon'),
                        },
                    ],
                },
                {
                    //:host([quiet]) #button:disabled
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.pseudoClass('disabled'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoClass('disabled'),
                        },
                    ],
                },
                {
                    //:host([quiet][disabled]) #button
                    find: [
                        builder.class('spectrum-Picker--quiet'),
                        builder.class('is-disabled'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('quiet')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.attribute('disabled'),
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
