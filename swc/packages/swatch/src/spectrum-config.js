// @ts-check
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

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Swatch');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
export default {
    conversions: [
        {
            inPackage: '@spectrum-css/swatchgroup',
            outPackage: 'swatch',
            fileName: 'swatch-group',
            hoistCustomPropertiesFrom: 'spectrum-SwatchGroup',
            components: [
                converter.classToHost('spectrum-SwatchGroup'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-SwatchGroup--compact', 'compact'],
                        ['spectrum-SwatchGroup--spacious', 'spacious'],
                    ],
                    'density'
                ),
            ],
        },
        {
            inPackage: '@spectrum-css/swatch',
            outPackage: 'swatch',
            fileName: 'swatch',
            hoistCustomPropertiesFrom: 'spectrum-Swatch',
            excludeByComponents: [builder.class('🤫')],
            components: [
                converter.classToHost('spectrum-Swatch'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Swatch--lightBorder', 'light'],
                        ['spectrum-Swatch--noBorder', 'none'],
                    ],
                    'border'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Swatch--roundingNone', 'none'],
                        ['spectrum-Swatch--roundingFull', 'full'],
                    ],
                    'rounding'
                ),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToAttribute('is-mixedValue', 'mixed-value'),
                converter.classToAttribute('is-nothing', 'nothing'),
                converter.classToAttribute('is-disabled', 'disabled'),
                ...converter.enumerateAttributes(
                    [['spectrum-Swatch--rectangle', 'rectangle']],
                    'shape'
                ),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-Swatch--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Swatch--sizeXS', 'xs'],
                        ['spectrum-Swatch--sizeS', 's'],
                        ['spectrum-Swatch--sizeL', 'l'],
                    ],
                    'size'
                ),
                converter.classToClass('spectrum-Swatch-fill'),
                converter.classToClass('spectrum-Swatch-disabledIcon'),
                converter.classToClass('spectrum-Swatch-mixedValueIcon'),
                converter.classToSlotted('spectrum-Swatch-image', 'image'),
                {
                    find: [
                        builder.class('spectrum-Swatch'),
                        builder.pseudoClass('focus-visible'),
                        builder.pseudoElement('after'),
                    ],
                    replace: [
                        {
                            replace: builder.pseudoClass('host'),
                        },
                        {
                            replace: builder.pseudoClass('focus-visible'),
                            hoist: true,
                        },
                        {
                            replace: builder.pseudoElement('after'),
                        },
                    ],
                },
                {
                    find: {
                        kind: 'not',
                        type: 'pseudo-class',
                        selectors: [
                            [builder.class('spectrum-Swatch--rectangle')],
                        ],
                    },
                    replace: {
                        kind: 'not',
                        type: 'pseudo-class',
                        selectors: [[builder.attribute('shape', 'rectangle')]],
                    },
                    hoist: true,
                },
            ],
        },
    ],
};
