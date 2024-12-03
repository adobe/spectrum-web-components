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

const converter = converterFor('spectrum-Tag');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/taggroup',
            outPackage: 'tags',
            fileName: 'tags',
            components: [
                converter.classToHost('spectrum-TagGroup'),
                {
                    find: builder.class('spectrum-TagGroup-item'),
                    replace: {
                        type: 'pseudo-element',
                        kind: 'slotted',
                        selector: [
                            {
                                type: 'universal',
                            },
                        ],
                    },
                },
            ],
        },
        {
            inPackage: '@spectrum-css/tag',
            outPackage: 'tags',
            fileName: 'tag',
            components: [
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
                {
                    find: builder.pseudoClass('focus-visible'),
                    hoist: true,
                },
                converter.classToHost(),
                converter.classToAttribute('is-emphasized', 'emphasized'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-invalid', 'invalid'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToAttribute(
                    'spectrum-Tag--removable',
                    'deletable'
                ),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-Tag--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Tag--sizeS', 's'],
                        ['spectrum-Tag--sizeL', 'l'],
                    ],
                    'size'
                ),
                converter.classToClass(
                    'spectrum-Tag-clearButton',
                    'clear-button'
                ),
                converter.classToClass('spectrum-ClearButton', 'clear-button'),
                converter.classToClass('spectrum-Tag-itemLabel', 'label'),
                converter.classToSlotted('spectrum-Avatar', 'avatar'),
                converter.classToSlotted('spectrum-Tag-itemIcon', 'icon'),
            ],
        },
    ],
};

export default config;
