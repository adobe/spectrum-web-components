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

const converter = converterFor('spectrum-Combobox');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/combobox',
            outPackage: 'combobox',
            fileName: 'combobox',
            components: [
                converter.classToHost(),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-Combobox--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Combobox--sizeS', 's'],
                        ['spectrum-Combobox--sizeL', 'l'],
                        ['spectrum-Combobox--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToAttribute('spectrum-Combobox--quiet'),
                converter.classToClass('spectrum-Combobox-button'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute('is-invalid', 'invalid'),
                converter.classToAttribute(
                    'is-keyboardFocused',
                    'keyboard-focused'
                ),
                converter.classToAttribute('is-disabled', 'disabled'),
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
                    find: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.class('is-keyboardFocused')]],
                    },
                    replace: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.attribute('keyboard-focused')]],
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
                converter.classToId('spectrum-Combobox-input'),
                {
                    find: [builder.class('spectrum-Combobox-textfield')],
                    replace: [],
                    collapseSelector: true,
                },
            ],
            excludeByComponents: [
                {
                    type: 'class',
                    name: 'regex',
                    regex: /Datepicker/,
                },
                builder.class('🤫'),
                // builder.class('spectrum-PickerButton-fill'),
            ],
        },
    ],
};

export default config;
