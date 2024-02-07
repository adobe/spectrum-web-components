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

const converter = converterFor('spectrum-TreeView');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/treeview',
            outPackage: 'tree-view',
            fileName: 'tree-view',
            components: [
                converter.classToHost(),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-TreeView--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-TreeView--sizeS', 's'],
                        ['spectrum-TreeView--sizeL', 'l'],
                        ['spectrum-TreeView--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                // .spectrum-TreeView .spectrum-TreeView => ::slotted(sp-tree-view)
                {
                    find: [
                        builder.class('spectrum-TreeView'),
                        builder.combinator(' '),
                        builder.class('spectrum-TreeView'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.element('sp-tree-view')],
                            },
                        },
                    ],
                    collapseSelector: true,
                },
            ],
            excludeByComponents: [
                builder.class('spectrum-TreeView-item'),
                builder.class('spectrum-TreeView-itemLabel'),
                builder.class('spectrum-TreeView-itemLink'),
                builder.class('spectrum-TreeView-itemIndicator'),
                builder.class('spectrum-TreeView-itemIcon'),
                builder.class('spectrum-TreeView-itemThumbnail'),
                builder.class('spectrum-TreeView-heading'),
                ...Array(10)
                    .fill('')
                    .map((item, index) =>
                        builder.class(
                            `spectrum-TreeView-item--indent${index + 1}`
                        )
                    ),
            ],
        },
        {
            inPackage: '@spectrum-css/treeview',
            outPackage: 'tree-view',
            fileName: 'tree-view-heading',
            components: [converter.classToHost('spectrum-TreeView-heading')],
            excludeByComponents: [
                builder.class('spectrum-TreeView'),
                builder.class('spectrum-TreeView--sizeS'),
                builder.class('spectrum-TreeView--sizeM'),
                builder.class('spectrum-TreeView--sizeL'),
                builder.class('spectrum-TreeView--sizeXL'),
                builder.class('spectrum-TreeView-item'),
                builder.class('spectrum-TreeView-itemLabel'),
                builder.class('spectrum-TreeView-itemLink'),
                builder.class('spectrum-TreeView-itemIndicator'),
                builder.class('spectrum-TreeView-itemIcon'),
                builder.class('spectrum-TreeView-itemThumbnail'),
                ...Array(10)
                    .fill('')
                    .map((item, index) =>
                        builder.class(
                            `spectrum-TreeView-item--indent${index + 1}`
                        )
                    ),
            ],
        },
        {
            inPackage: '@spectrum-css/treeview',
            outPackage: 'tree-view',
            fileName: 'tree-view-item-label',
            components: [converter.classToHost('spectrum-TreeView-itemLabel')],
            excludeByComponents: [
                builder.class('spectrum-TreeView'),
                builder.class('spectrum-TreeView--sizeS'),
                builder.class('spectrum-TreeView--sizeM'),
                builder.class('spectrum-TreeView--sizeL'),
                builder.class('spectrum-TreeView--sizeXL'),
                builder.class('spectrum-TreeView-item'),
                builder.class('spectrum-TreeView-itemLink'),
                builder.class('spectrum-TreeView-itemIndicator'),
                builder.class('spectrum-TreeView-itemIcon'),
                builder.class('spectrum-TreeView-itemThumbnail'),
                builder.class('spectrum-TreeView-heading'),
                ...Array(10)
                    .fill('')
                    .map((item, index) =>
                        builder.class(
                            `spectrum-TreeView-item--indent${index + 1}`
                        )
                    ),
            ],
        },
        {
            inPackage: '@spectrum-css/treeview',
            outPackage: 'tree-view',
            fileName: 'tree-view-item-link',
            components: [
                converter.classToClass(
                    'spectrum-TreeView--thumbnail',
                    'has-thumbnail'
                ),
                {
                    find: [
                        builder.combinator(' '),
                        builder.class('spectrum-TreeView-itemLink'),
                        builder.pseudoElement('before'),
                    ],
                    replace: [
                        {
                            replace: builder.pseudoElement('before'),
                        },
                    ],
                    collapseSelector: true,
                },
                {
                    find: [
                        builder.combinator(' '),
                        builder.class('spectrum-TreeView-itemLink'),
                    ],
                    replace: [],
                    collapseSelector: true,
                },
            ],
            excludeByComponents: [
                builder.class('spectrum-TreeView'),
                builder.class('spectrum-TreeView--sizeS'),
                builder.class('spectrum-TreeView--sizeM'),
                builder.class('spectrum-TreeView--sizeL'),
                builder.class('spectrum-TreeView--sizeXL'),
                builder.class('spectrum-TreeView-item'),
                builder.class('spectrum-TreeView-itemLabel'),
                builder.class('spectrum-TreeView-itemLink'),
                builder.class('spectrum-TreeView-itemIndicator'),
                builder.class('spectrum-TreeView-itemIcon'),
                builder.class('spectrum-TreeView-itemThumbnail'),
                builder.class('spectrum-TreeView-heading'),
                ...Array(10)
                    .fill('')
                    .map((item, index) =>
                        builder.class(
                            `spectrum-TreeView-item--indent${index + 1}`
                        )
                    ),
            ],
            includeByWholeSelector: [
                // .spectrum-TreeView--thumbnail .spectrum-TreeView-itemLink
                [
                    builder.class('spectrum-TreeView--thumbnail'),
                    builder.combinator(' '),
                    builder.class('spectrum-TreeView-itemLink'),
                ],
                [
                    builder.class('spectrum-TreeView--thumbnail'),
                    builder.combinator(' '),
                    builder.class('spectrum-TreeView-itemLink'),
                    builder.pseudoElement('before'),
                ],
            ],
        },
        {
            inPackage: '@spectrum-css/treeview',
            outPackage: 'tree-view',
            fileName: 'tree-view-item',
            components: [
                converter.classToHost('spectrum-TreeView-item'),
                converter.classToAttribute('is-open', 'open'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-drop-target', 'drop-target'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToClass('spectrum-TreeView-itemLink', 'link'),
                converter.classToId(
                    'spectrum-TreeView-itemIndicator',
                    'indicator'
                ),
                ...converter.enumerateAttributes(
                    Array(10)
                        .fill('')
                        .map((item, index) => [
                            `spectrum-TreeView-item--indent${index + 1}`,
                            `${index + 1}`,
                        ]),
                    'indent'
                ),
                {
                    find: builder.class('spectrum-TreeView-itemIcon'),
                    replace: builder.slotted('icon'),
                },
                {
                    find: builder.class('spectrum-TreeView-itemThumbnail'),
                    replace: builder.slotted('thumbnail'),
                },
                {
                    find: builder.class('spectrum-TreeView'),
                    replace: builder.slotted('children'),
                },
                {
                    find: [
                        {
                            type: 'class',
                            name: 'focus-ring',
                        },
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'focus-visible',
                            },
                            hoist: false,
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-TreeView-itemLink'),
                        {
                            type: 'pseudo-class',
                            kind: 'not',
                            selectors: [[builder.class('focus-ring')]],
                        },
                    ],
                    replace: [
                        {
                            replace: builder.class('link'),
                        },
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'not',
                                selectors: [
                                    [builder.pseudoClass('focus-visible')],
                                ],
                            },
                        },
                    ],
                },
                {
                    find: [
                        // .spectrum-TreeView--thumbnail .spectrum-TreeView-itemThumbnail
                        builder.class('spectrum-TreeView--thumbnail'),
                        builder.combinator(' '),
                        builder.class('spectrum-TreeView-itemThumbnail'),
                    ],
                    replace: [
                        {
                            replace: builder.slotted('thumbnail'),
                        },
                    ],
                    collapseSelector: true,
                },
            ],
            excludeByComponents: [
                builder.class('spectrum-TreeView'),
                builder.class('spectrum-TreeView--sizeS'),
                builder.class('spectrum-TreeView--sizeM'),
                builder.class('spectrum-TreeView--sizeL'),
                builder.class('spectrum-TreeView--sizeXL'),
                builder.class('spectrum-TreeView-itemLabel'),
                builder.class('spectrum-TreeView-heading'),
                builder.class('spectrum-TreeView--quiet'),
                builder.class('spectrum-TreeView--standalone'),
            ],
            excludeByWholeSelector: [
                [
                    // spectrum-TreeView--thumbnail .spectrum-TreeView-itemLink
                    builder.class('spectrum-TreeView--thumbnail'),
                    builder.combinator(' '),
                    builder.class('spectrum-TreeView-itemLink'),
                ],
                [
                    // spectrum-TreeView--thumbnail .spectrum-TreeView-itemLink
                    builder.class('spectrum-TreeView--thumbnail'),
                    builder.combinator(' '),
                    builder.class('spectrum-TreeView-itemLink'),
                    builder.pseudoElement('before'),
                ],
            ],
            includeByWholeSelector: [
                [
                    // .spectrum-TreeView-item.is-open>.spectrum-TreeView
                    builder.class('spectrum-TreeView-item'),
                    builder.class('is-open'),
                    builder.combinator('>'),
                    builder.class('spectrum-TreeView'),
                ],
            ],
        },
    ],
};

export default config;
