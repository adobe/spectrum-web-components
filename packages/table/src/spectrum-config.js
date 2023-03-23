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
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Table--sizeS', 's'],
                        ['spectrum-Table--sizeM', 'm'],
                    ],
                    'size'
                ),
                ...converter.enumerateAttributes(
                    [['spectrum-Table--compact'], ['spectrum-Table--spacious']],
                    'density'
                ),
                converter.classToAttribute('spectrum-Table--quiet'),
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
                converterCell.classToHost('spectrum-Table-checkboxCell'),
                converter.classToClass('spectrum-Table-checkbox'),
            ],
            excludeByComponents: [
                builder.class('spectrum-Table'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Table-(?!checkbox)/,
                },
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
                converter.classToAttribute('is-drop-target', 'drop-target'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToAttribute('is-focused', 'focused'),
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
