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

const converter = converterFor('spectrum-Table');
const converterCell = converterFor('spectrum-Table-cell');
const converterHeadCell = converterFor('spectrum-Table-headCell');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/table',
            outPackage: 'table',
            fileName: 'table',
            components: [
                converter.classToHost(),
                converter.classToAttribute('spectrum-Table--quiet'),
                converter.classToAttribute('spectrum-Table--emphasized'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Table--sizeS', 's'],
                        ['spectrum-Table--sizeL', 'l'],
                        ['spectrum-Table--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                ...converter.enumerateAttributes(
                    [['spectrum-Table--compact'], ['spectrum-Table--spacious']],
                    'density'
                ),
            ],
            excludeByComponents: [
                builder.class('spectrum-Table-sortedIcon'),
                builder.class('spectrum-Table-headCell'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Table-(?!-)/,
                },
            ],
        },
        {
            inPackage: '@spectrum-css/table',
            outPackage: 'table',
            fileName: 'table-body',
            components: [
                converter.classToHost('spectrum-Table-body'),
                converter.classToAttribute('is-drop-target', 'drop-target'),
            ],
            excludeByComponents: [
                builder.class('spectrum-Table'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Table-(?!b)/,
                },
                builder.element('tbody'),
            ],
        },
        {
            inPackage: '@spectrum-css/table',
            outPackage: 'table',
            fileName: 'table-cell',
            components: [
                converterCell.classToHost(),
                ...converterCell.enumerateAttributes(
                    [
                        ['spectrum-Table-cell--alignCenter', 'center'],
                        ['spectrum-Table-cell--alignRight', 'end'],
                    ],
                    'align'
                ),
                converterCell.classToClass('spectrum-Table-cell--divider'),
                converterCell.classToAttribute('is-focused', 'focused'),
            ],
            excludeByComponents: [
                builder.class('spectrum-Table'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Table-(?!cell)/,
                },
            ],
        },
        {
            inPackage: '@spectrum-css/table',
            outPackage: 'table',
            fileName: 'table-checkbox-cell',
            components: [
                converterHeadCell.classToAttribute(
                    'spectrum-Table-headCell',
                    'head-cell'
                ),
                converter.classToAttribute('is-sortable', 'sortable'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.pseudoToAttribute('active', 'active'),
                {
                    find: [builder.class('spectrum-Table-cell')],
                    replace: [
                        //:host(:not([head-cell]))
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [
                                    {
                                        type: 'pseudo-class',
                                        kind: 'not',
                                        selectors: [
                                            [builder.attribute('head-cell')],
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    find: [builder.class('spectrum-Table-checkboxCell')],
                    replace: [
                        //:host(:host) for increased specificity, to be higher than [head-cell] selectors.
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [
                                    {
                                        type: 'pseudo-class',
                                        kind: 'host',
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    find: [builder.class('spectrum-Table-checkbox')],
                    replace: [
                        {
                            replace: {
                                type: 'type',
                                name: 'sp-checkbox',
                            },
                        },
                    ],
                },
            ],
            excludeByComponents: [
                builder.class('spectrum-Table'),
                // Also include all Table-cell and Table-headCell classes.
                // They are converted to selectors with or without the [head-cell] attribute.
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Table-(?!checkbox|headCell|cell)/,
                },
                builder.class('is-sortable'),
                // Unneeded cell modifier classes (align*, collapsible, divider).
                {
                    type: 'class',
                    regex: /spectrum-Table-cell--/,
                    name: 'regex',
                },
                builder.element('div'),
            ],
        },
        {
            inPackage: '@spectrum-css/table',
            outPackage: 'table',
            fileName: 'table-head',
            components: [converter.classToHost('spectrum-Table-head')],
            requireComponentPresence: [
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Table-head$/,
                },
            ],
            excludeByComponents: [builder.attribute('role')],
        },
        {
            inPackage: '@spectrum-css/table',
            outPackage: 'table',
            fileName: 'table-head-cell',
            components: [
                converterHeadCell.classToHost(),
                converterHeadCell.classToAttribute('is-sortable', 'sortable'),
                converterHeadCell.classToAttribute('is-focused', 'focused'),
                converterHeadCell.pseudoToAttribute('active', 'active'),
                ...converterHeadCell.enumerateAttributes(
                    [
                        ['is-sorted-asc', 'asc'],
                        ['is-sorted-desc', 'desc'],
                    ],
                    'sort-direction'
                ),
                converterHeadCell.classToClass(
                    'spectrum-Table-sortedIcon',
                    'sortedIcon'
                ),
            ],
            requireComponentPresence: [
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Table-(headCell|sortedIcon)$/,
                },
            ],
            excludeByComponents: [
                {
                    type: 'class',
                    regex: /spectrum-Table--/,
                    name: 'regex',
                },
            ],
        },
        {
            inPackage: '@spectrum-css/table',
            outPackage: 'table',
            fileName: 'table-row',
            components: [
                converter.classToHost('spectrum-Table-row'),
                {
                    find: builder.pseudoClass('first-child'),
                    replace: builder.pseudoClass('first-child'),
                    hoist: true,
                },
                {
                    find: builder.pseudoClass('last-child'),
                    replace: builder.pseudoClass('last-child'),
                    hoist: true,
                },
                converter.classToAttribute(
                    'spectrum-Table-row--emphasized',
                    'emphasized'
                ),
                converter.classToAttribute('is-drop-target', 'drop-target'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToSlotted('spectrum-Table-cell'),
                {
                    find: [
                        builder.class('spectrum-Table-cell'),
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
                        builder.class('spectrum-Table-cell'),
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
            ],
            requireComponentPresence: [
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Table-row/,
                },
            ],
            excludeByComponents: [
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Table--/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Table$/,
                },
                builder.element('tbody'),
            ],
        },
    ],
};

export default config;
