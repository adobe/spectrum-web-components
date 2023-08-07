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

const converter = converterFor('spectrum-ActionButton');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/actionbutton',
            outPackage: 'action-button',
            fileName: 'action-button',
            excludeByComponents: [
                {
                    type: 'type',
                    name: 'a',
                },
                {
                    type: 'pseudo-element',
                    kind: 'custom',
                    name: '-moz-focus-inner',
                },
            ],
            components: [
                converter.classToHost(),
                converter.classToAttribute('spectrum-ActionButton--quiet'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.pseudoToAttribute('disabled', 'disabled'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.pseudoToAttribute('active', 'active'),
                converter.classToAttribute('is-active', 'active'),
                converter.classToAttribute('spectrum-ActionButton--emphasized'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-ActionButton--staticWhite', 'white'],
                        ['spectrum-ActionButton--staticBlack', 'black'],
                    ],
                    'static'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-ActionButton--sizeXS', 'xs'],
                        ['spectrum-ActionButton--sizeS', 's'],
                        ['spectrum-ActionButton--sizeM', 'm'],
                        ['spectrum-ActionButton--sizeL', 'l'],
                        ['spectrum-ActionButton--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToClass(
                    'spectrum-ActionButton-hold',
                    'hold-affordance'
                ),
                converter.classToClass(
                    'spectrum-ActionButton-holdIcon',
                    'hold-affordance'
                ),
                converter.classToId('spectrum-ActionButton-label'),
                converter.classToSlotted('spectrum-ActionButton-icon', 'icon'),
                {
                    find: [
                        builder.class('spectrum-ActionButton-icon'),
                        builder.pseudoClass('only-child'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('icon-only'),
                            hoist: false,
                        },
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [
                                    {
                                        type: 'attribute',
                                        name: 'slot',
                                        operation: {
                                            operator: 'equal',
                                            value: 'icon',
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-ActionButton-icon'),
                        builder.combinator('+'),
                        builder.class('spectrum-ActionButton-label'),
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
                        {
                            replace: builder.combinator('+'),
                        },
                        {
                            replace: builder.id('label'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-ActionButton-hold'),
                        {
                            type: 'pseudo-class',
                            kind: 'dir',
                            direction: 'rtl',
                        },
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [
                                    {
                                        type: 'attribute',
                                        name: 'dir',
                                        operation: {
                                            value: 'rtl',
                                            operator: 'equal',
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.class('hold-affordance'),
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
