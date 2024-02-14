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
const converter = converterFor('spectrum-Stepper');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/stepper',
            outPackage: 'number-field',
            fileName: 'number-field',
            hoistCustomPropertiesFrom: 'spectrum-Stepper',
            components: [
                {
                    find: builder.pseudoClass('hover'),
                    replace: builder.pseudoClass('hover'),
                    hoist: true,
                },
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.class('is-focused')]],
                    },
                    replace: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.attribute('focused')]],
                    },
                    hoist: true,
                },
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.class('is-disabled')]],
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
                        kind: 'not',
                        selectors: [[builder.class('is-invalid')]],
                    },
                    replace: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.attribute('invalid')]],
                    },
                    hoist: true,
                },
                {
                    exactSelector: true,
                    find: [builder.class('spectrum-Stepper--quiet')],
                    replace: [
                        {
                            replace: builder.attribute('quiet'),
                            hoist: true,
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('textfield'),
                        },
                    ],
                },
                {
                    expandSelector: true,
                    find: [
                        builder.class('spectrum-Stepper--quiet'),
                        builder.class('is-disabled'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('quiet'),
                            hoist: true,
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('textfield'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    exactSelector: true,
                    find: [
                        builder.class('spectrum-Stepper--quiet'),
                        builder.class('is-focused'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('quiet'),
                            hoist: true,
                        },
                        {
                            replace: builder.attribute('focused'),
                            hoist: true,
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('textfield'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    exactSelector: true,
                    find: [
                        builder.class('spectrum-Stepper--quiet'),
                        builder.class('is-keyboardFocused'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('quiet'),
                            hoist: true,
                        },
                        {
                            replace: builder.attribute('keyboard-focused'),
                            hoist: true,
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('textfield'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    exactSelector: true,
                    find: [
                        builder.class('spectrum-Stepper--quiet'),
                        builder.class('is-focused'),
                        builder.class('is-invalid'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('quiet'),
                            hoist: true,
                        },
                        {
                            replace: builder.attribute('focused'),
                            hoist: true,
                        },
                        {
                            replace: builder.attribute('invalid'),
                            hoist: true,
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('textfield'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    exactSelector: true,
                    find: [
                        builder.class('spectrum-Stepper--quiet'),
                        builder.class('is-keyboardFocused'),
                        builder.class('is-invalid'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('quiet'),
                            hoist: true,
                        },
                        {
                            replace: builder.attribute('keyboard-focused'),
                            hoist: true,
                        },
                        {
                            replace: builder.attribute('invalid'),
                            hoist: true,
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('textfield'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                converter.classToId('spectrum-Stepper', 'textfield'),
                converter.classToAttribute('spectrum-Stepper--quiet'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-invalid', 'invalid'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute(
                    'is-keyboardFocused',
                    'keyboard-focused'
                ),
                converter.classToClass('spectrum-Stepper-buttons', 'buttons'),
                converter.classToClass(
                    'spectrum-Stepper-stepDown',
                    'step-down'
                ),
                converter.classToClass(
                    'spectrum-Stepper-textfield',
                    'textfield'
                ),
                converter.classToClass('spectrum-Icon', 'stepper-icon'),
                converter.classToClass('spectrum-Stepper-input', 'input'),
                converter.classToClass('spectrum-Stepper-button', 'button'),
                converter.classToClass(
                    'spectrum-InfieldButton--top',
                    'step-up'
                ),
                converter.classToClass(
                    'spectrum-InfieldButton--bottom',
                    'step-down'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Stepper--sizeS', 's'],
                        ['spectrum-Stepper--sizeL', 'l'],
                        ['spectrum-Stepper--sizeXL', 'xl'],
                    ],
                    'size'
                ),
            ],
        },
    ],
};

export default config;
