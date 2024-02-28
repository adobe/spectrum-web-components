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

const converter = converterFor('spectrum-Tabs');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/tabs',
            outPackage: 'tabs',
            fileName: 'tabs',
            components: [
                {
                    exactSelector: true,
                    find: [builder.class('spectrum-Tabs--quiet')],
                    replace: [
                        {
                            replace: builder.attribute('quiet'),
                            hoist: true,
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('list'),
                        },
                    ],
                },
                {
                    expandSelector: true,
                    find: [builder.class('spectrum-Tabs--horizontal')],
                    replace: [
                        {
                            replace: builder.attribute(
                                'direction',
                                'horizontal',
                                'prefix'
                            ),
                            hoist: true,
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('list'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    expandSelector: true,
                    find: [builder.class('spectrum-Tabs--vertical')],
                    replace: [
                        {
                            replace: builder.attribute(
                                'direction',
                                'vertical',
                                'prefix'
                            ),
                            hoist: true,
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('list'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    expandSelector: true,
                    find: [builder.class('spectrum-Tabs--vertical-right')],
                    replace: [
                        {
                            replace: builder.attribute(
                                'direction',
                                'vertical-right',
                                'prefix'
                            ),
                            hoist: true,
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('list'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                {
                    collapseSelector: true,
                    find: [
                        builder.class('spectrum-Tabs-item'),
                        builder.combinator('+'),
                        { type: 'universal' },
                        {
                            type: 'pseudo-class',
                            kind: 'not',
                            selectors: [
                                [
                                    builder.class(
                                        'spectrum-Tabs-selectionIndicator'
                                    ),
                                ],
                            ],
                        },
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
                                            [builder.attribute('slot')],
                                        ],
                                    },
                                    {
                                        type: 'pseudo-class',
                                        kind: 'not',
                                        selectors: [
                                            [
                                                {
                                                    type: 'pseudo-class',
                                                    kind: 'first-child',
                                                },
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
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
                converter.classToId('spectrum-Tabs', 'list'),
                converter.classToAttribute('spectrum-Tabs--compact'),
                converter.classToAttribute('spectrum-Tabs--quiet'),
                converter.classToAttribute('spectrum-Tabs--emphasized'),
                converter.classToId(
                    'spectrum-Tabs-selectionIndicator',
                    'selection-indicator'
                ),
                {
                    find: builder.class('spectrum-Tabs-item'),
                    replace: {
                        type: 'pseudo-element',
                        kind: 'slotted',
                        selector: [
                            {
                                type: 'pseudo-class',
                                kind: 'not',
                                selectors: [[builder.attribute('slot')]],
                            },
                        ],
                    },
                },
                {
                    find: builder.class('is-selected'),
                    replace: {
                        type: 'pseudo-element',
                        kind: 'slotted',
                        selector: [
                            builder.attribute('selected'),
                            {
                                type: 'pseudo-class',
                                kind: 'not',
                                selectors: [[builder.attribute('slot')]],
                            },
                        ],
                    },
                },
                {
                    find: builder.class('is-disabled'),
                    replace: {
                        type: 'pseudo-element',
                        kind: 'slotted',
                        selector: [
                            builder.attribute('disabled'),
                            {
                                type: 'pseudo-class',
                                kind: 'not',
                                selectors: [[builder.attribute('slot')]],
                            },
                        ],
                    },
                },
            ],
            excludeByComponents: [
                builder.class('spectrum-Tabs-itemLabel'),
                builder.class('spectrum-Icon'),
                builder.pseudoClass('hover'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Tabs--size/,
                },
            ],
            excludeByWholeSelector: [
                [builder.class('spectrum-Tabs-item')],
                [
                    builder.class('spectrum-Tabs-item'),
                    builder.pseudoElement('before'),
                ],
                [
                    builder.class('spectrum-Tabs-item'),
                    builder.class('focus-ring'),
                    builder.pseudoElement('before'),
                ],
                [
                    builder.class('spectrum-Tabs-item'),
                    builder.pseudoClass('focus-visible'),
                ],
                [
                    builder.class('spectrum-Tabs-item'),
                    builder.pseudoClass('focus-visible'),
                    builder.pseudoElement('before'),
                ],
                [
                    // .spectrum-Tabs .is-selected:focus
                    builder.class('spectrum-Tabs'),
                    builder.combinator(' '),
                    builder.class('is-selected'),
                    builder.pseudoClass('focus'),
                ],
                [
                    // .spectrum-Tabs .is-selected:focus-visible
                    builder.class('spectrum-Tabs'),
                    builder.combinator(' '),
                    builder.class('is-selected'),
                    builder.pseudoClass('focus-visible'),
                ],
            ],
        },
        {
            inPackage: '@spectrum-css/tabs',
            outPackage: 'tabs',
            fileName: 'tab',
            components: [
                // .spectrum-Icon+.spectrum-Tabs-itemLabel
                // slot[name='icon'] + #item-label
                {
                    find: [
                        builder.class('spectrum-Icon'),
                        builder.combinator('+'),
                        builder.class('spectrum-Tabs-itemLabel'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('name', 'icon'),
                            hoist: false,
                        },
                    ],
                },
                converter.classToHost('spectrum-Tabs-item'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToId('spectrum-Tabs-itemLabel', 'item-label'),
                converter.classToSlotted('spectrum-Icon', 'icon'),
            ],
            excludeByComponents: [
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Tabs--/,
                },
                builder.class('spectrum-Tabs'),
                builder.class('spectrum-Tabs-selectionIndicator'),
            ],
        },
        {
            inPackage: '@spectrum-css/tabs',
            outPackage: 'tabs',
            fileName: 'tabs-sizes',
            components: [
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-Tabs--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Tabs--sizeS', 's'],
                        ['spectrum-Tabs--sizeL', 'l'],
                        ['spectrum-Tabs--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToId('spectrum-Tabs', 'list'),
            ],
            requireComponentPresence: [
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Tabs--size/,
                },
            ],
        },
    ],
};

export default config;
