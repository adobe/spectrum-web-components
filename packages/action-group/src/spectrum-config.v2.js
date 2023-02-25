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

const converter = converterFor('spectrum-ActionGroup');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/actiongroup',
            outPackage: 'action-group',
            fileName: 'action-group',
            excludeByComponents: [
                builder.class('spectrum-ActionButton-label'),
                builder.class('🤫'),
            ],
            components: [
                converter.classToHost(),
                converter.classToAttribute('spectrum-ActionGroup--vertical'),
                converter.classToAttribute('spectrum-ActionGroup--compact'),
                converter.classToAttribute('spectrum-ActionGroup--quiet'),
                converter.classToAttribute('spectrum-ActionGroup--justified'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-ActionGroup--sizeS', 's'],
                        ['spectrum-ActionGroup--sizeM', 'm'],
                        ['spectrum-ActionGroup--sizeL', 'l'],
                        ['spectrum-ActionGroup--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToSlotted('spectrum-ActionGroup-item'),
                converter.notToAttribute('spectrum-ActionGroup--vertical'),
                converter.notToAttribute('spectrum-ActionGroup--compact'),
                converter.notToAttribute('spectrum-ActionGroup--quiet'),
                {
                    find: [
                        builder.class('spectrum-ActionGroup-item'),
                        builder.class('is-selected'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.attribute('selected')],
                            },
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-ActionGroup-item'),
                        builder.pseudoClass('hover'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.pseudoClass('hover')],
                            },
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-ActionGroup-item'),
                        builder.class('focus-ring'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [
                                    builder.pseudoClass('focus-visible'),
                                ],
                            },
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-ActionGroup-item'),
                        builder.pseudoClass('last-child'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.pseudoClass('last-child')],
                            },
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-ActionGroup-item'),
                        builder.pseudoClass('first-child'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.pseudoClass('first-child')],
                            },
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-ActionGroup-item'),
                        builder.combinator('+'),
                        builder.class('spectrum-ActionGroup-item'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [
                                    {
                                        type: 'pseudo-class',
                                        kind: 'not',
                                        selectors: [
                                            [
                                                builder.pseudoClass(
                                                    'first-child'
                                                ),
                                            ],
                                        ],
                                    },
                                ],
                            },
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
