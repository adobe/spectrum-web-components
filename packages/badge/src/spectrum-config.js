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

import { converterFor } from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Badge');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/badge',
            outPackage: 'badge',
            fileName: 'badge',
            excludeByComponents: [
                {
                    type: 'pseudo-class',
                    kind: 'hover',
                },
            ],
            components: [
                converter.classToHost(),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Badge--sizeS', 's'],
                        ['spectrum-Badge--sizeM', 'm'],
                        ['spectrum-Badge--sizeL', 'l'],
                        ['spectrum-Badge--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                ...converter.enumerateAttributes(
                    [
                        // semantic
                        ['spectrum-Badge--accent'],
                        ['spectrum-Badge--positive'],
                        ['spectrum-Badge--informative'],
                        ['spectrum-Badge--negative'],
                        ['spectrum-Badge--neutral'],
                        // non-semantic
                        ['spectrum-Badge--seafoam'],
                        ['spectrum-Badge--indigo'],
                        ['spectrum-Badge--purple'],
                        ['spectrum-Badge--fuchsia'],
                        ['spectrum-Badge--magenta'],
                        ['spectrum-Badge--yellow'],
                    ],
                    'variant'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Badge--fixed-inline-start', 'inline-start'],
                        ['spectrum-Badge--fixed-inline-end', 'inline-end'],
                        ['spectrum-Badge--fixed-block-start', 'block-start'],
                        ['spectrum-Badge--fixed-block-end', 'block-end'],
                    ],
                    'fixed'
                ),
                ...converter.enumerateAttributes(
                    [['spectrum-Badge--black-text', 'black']],
                    'static'
                ),
                converter.classToClass('spectrum-Badge-label'),
                converter.classToSlotted('spectrum-Badge-icon', 'icon'),
                {
                    find: [
                        {
                            type: 'class',
                            name: 'spectrum-Badge-icon--no-label',
                        },
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'attribute',
                                name: 'icon-only',
                            },
                            hoist: false,
                        },
                        {
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
                    find: [
                        {
                            type: 'class',
                            name: 'spectrum-Badge-icon',
                        },
                        {
                            type: 'combinator',
                            value: 'next-sibling',
                        },
                        {
                            type: 'class',
                            name: 'spectrum-Badge-label',
                        },
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'attribute',
                                name: 'name',
                                operation: {
                                    operator: 'equal',
                                    value: 'icon',
                                },
                            },
                            hoist: false,
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
