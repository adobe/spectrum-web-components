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

const converter = converterFor('spectrum-Menu');
/**
 * @type { import('../../../tasks/spectrum-css-converter.js').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            // Menu Section Heading
            inPackage: '@spectrum-css/menu',
            outPackage: 'menu',
            fileName: 'menu-sectionHeading',
            excludeByComponents: [
                builder.class('spectrum-Menu-divider'),
                builder.class('spectrum-Menu'),
                builder.class('spectrum-menu-itemSelection'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu--size/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-item/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-chevron/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-checkmark/,
                },
            ],
            components: [
                converter.classToClass(
                    'spectrum-Menu-sectionHeading',
                    'header'
                ),
            ],
        },
        {
            // Menu Item
            inPackage: '@spectrum-css/menu',
            outPackage: 'menu',
            fileName: 'menu-item',
            excludeByComponents: [
                builder.class('spectrum-Menu'),
                builder.class('spectrum-Menu-sectionHeading'),
                builder.class('spectrum-Menu-divider'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu--size/,
                },
            ],
            components: [
                converter.classToHost('spectrum-Menu-item'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-active', 'active'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToId('spectrum-Menu-itemLabel', 'label'),
                converter.classToClass('spectrum-Menu-chevron', 'chevron'),
                converter.classToClass(
                    'spectrum-Menu-chevron--withAdjacentIcon',
                    'chevron--withAdjacentIcon'
                ),
                converter.classToClass('spectrum-Menu-checkmark', 'checkmark'),
                converter.classToClass(
                    'spectrum-Menu-checkmark--withAdjacentIcon',
                    'checkmark--withAdjacentIcon'
                ),
                converter.classToAttribute(
                    'spectrum-Menu-item--drillIn',
                    'has-submenu'
                ),
                converter.classToSlotted('spectrum-Icon', 'icon'),
                converter.classToSlotted('spectrum-Menu-itemIcon', 'icon'),
                converter.classToSlotted(
                    'spectrum-Menu-itemIcon--workflowIcon',
                    'icon'
                ),
                converter.classToSlotted('spectrum-Menu-itemValue', 'value'),
                converter.classToClass(
                    'spectrum-menu-itemSelection',
                    'menu-itemSelection'
                ),
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'focus-visible',
                    },
                    replace: builder.attribute('focused'),
                },
                {
                    find: [builder.class('spectrum-Menu-itemLabel--wrapping')],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [
                                    {
                                        type: 'attribute',
                                        name: 'no-wrap',
                                    },
                                ],
                            },
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('label'),
                        },
                    ],
                },
                {
                    collapseSelector: true,
                    find: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.class('is-disabled')]],
                    },
                    replace: {
                        kind: 'not',
                        type: 'pseudo-class',
                        selectors: [[builder.attribute('disabled')]],
                    },
                    hoist: true,
                },
                {
                    find: [
                        builder.class('spectrum-Menu-itemIcon'),
                        {
                            type: 'pseudo-class',
                            kind: 'not',
                            selectors: [
                                [builder.class('spectrum-Menu-chevron')],
                                [builder.class('spectrum-Menu-checkmark')],
                            ],
                        },
                    ],
                    replace: [
                        {
                            replace: builder.class('icon'),
                        },
                        {
                            replace: {
                                kind: 'not',
                                type: 'pseudo-class',
                                selectors: [
                                    [builder.class('chevron')],
                                    [builder.class('checkmark')],
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        {
            // Menu Divider
            inPackage: '@spectrum-css/menu',
            outPackage: 'menu',
            fileName: 'menu-divider',
            excludeByComponents: [
                builder.class('spectrum-menu-itemSelection'),
                builder.class('spectrum-Menu-sectionHeading'),
                builder.class('spectrum-Menu'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu--size/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-checkmark/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-chevron/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-item/,
                },
            ],
            excludeByWholeSelector: [
                [builder.class('spectrum-Menu')],
                [
                    builder.class('spectrum-Menu'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu'),
                ],
            ],
            includeByWholeSelector: [
                [
                    builder.class('spectrum-Menu'),
                    builder.combinator('descendant'),
                    builder.class('spectrum-Menu-divider'),
                ],
            ],
            components: [
                converter.classToHost('spectrum-Menu-divider'),
                {
                    collapseSelector: true,
                    find: [
                        builder.class('spectrum-Menu'),
                        builder.combinator('descendant'),
                        builder.class('spectrum-Menu-divider'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                            },
                        },
                    ],
                },
            ],
        },
        {
            // Menu Checkmark
            inPackage: '@spectrum-css/menu',
            outPackage: 'menu',
            fileName: 'checkmark',
            excludeByComponents: [
                builder.class('spectrum-Menu-sectionHeading'),
                builder.class('spectrum-Menu-divider'),
                builder.class('spectrum-Menu'),
                builder.class('spectrum-menu-itemSelection'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu--size/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-chevron/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-item/,
                },
            ],
            components: [
                converter.classToClass('spectrum-Menu-checkmark', 'checkmark'),
                converter.classToClass(
                    'spectrum-Menu-checkmark--withAdjacentIcon',
                    'checkmark--withAdjacentIcon'
                ),
            ],
        },
        {
            // Menu Chevron
            inPackage: '@spectrum-css/menu',
            outPackage: 'menu',
            fileName: 'chevron',
            excludeByComponents: [
                builder.class('spectrum-Menu-sectionHeading'),
                builder.class('spectrum-Menu-divider'),
                builder.class('spectrum-Menu'),
                builder.class('spectrum-menu-itemSelection'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu--size/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-checkmark/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-item/,
                },
            ],
            components: [
                converter.classToClass('spectrum-Menu-chevron', 'chevron'),
                converter.classToClass(
                    'spectrum-Menu-chevron--withAdjacentIcon',
                    'chevron--withAdjacentIcon'
                ),
            ],
        },
        {
            // Menu
            inPackage: '@spectrum-css/menu',
            outPackage: 'menu',
            fileName: 'menu',
            excludeByComponents: [
                builder.class('spectrum-Menu-divider'),
                builder.class('spectrum-menu-itemSelection'),
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-item/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-checkmark/,
                },
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-Menu-chevron/,
                },
            ],
            includeByWholeSelector: [
                /* [dir=ltr] .spectrum-Menu.is-selectable .spectrum-Menu-item */
                [
                    builder.class('spectrum-Menu'),
                    builder.class('is-selectable'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu-item'),
                ],
                /* [dir=ltr] .spectrum-Menu.is-selectable .spectrum-Menu-item.is-selected */
                [
                    builder.class('spectrum-Menu'),
                    builder.class('is-selectable'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu-item'),
                    builder.class('is-selected'),
                ],
                // [builder.class('spectrum-Menu-item')],
            ],
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-selectable', 'selects'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Menu--sizeS', 's'],
                        ['spectrum-Menu--sizeM', 'm'],
                        ['spectrum-Menu--sizeL', 'l'],
                        ['spectrum-Menu--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                {
                    find: [builder.class('spectrum-Menu-item')],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.element('sp-menu-item')],
                            },
                        },
                    ],
                },
                {
                    collapseSelector: true,
                    find: [
                        builder.class('spectrum-Menu-item'),
                        builder.class('is-selected'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [
                                    builder.element('sp-menu-item'),
                                    builder.attribute('selected'),
                                ],
                            },
                        },
                    ],
                },
                {
                    find: [
                        builder.element('li'),
                        {
                            type: 'pseudo-class',
                            kind: 'not',
                            selectors: [
                                [builder.class('spectrum-Menu-item')],
                                [builder.class('spectrum-Menu-divider')],
                            ],
                        },
                    ],
                    replace: [
                        {
                            replace: builder.element('li'),
                        },
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'not',
                                selectors: [
                                    [
                                        {
                                            type: 'pseudo-element',
                                            kind: 'slotted',
                                            selector: [
                                                builder.element('sp-menu-item'),
                                            ],
                                        },
                                    ],
                                    [builder.class('menu-divider')],
                                ],
                            },
                        },
                    ],
                },
                {
                    find: [
                        builder.element('li'),
                        {
                            type: 'pseudo-class',
                            kind: 'not',
                            selectors: [
                                [builder.class('spectrum-Menu-item')],
                                [builder.class('spectrum-Menu-divider')],
                            ],
                        },
                        builder.combinator('child'),
                        builder.class('spectrum-Menu-sectionHeading'),
                    ],
                    replace: [
                        {
                            replace: builder.element('li'),
                        },
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'not',
                                selectors: [
                                    [
                                        {
                                            type: 'pseudo-element',
                                            kind: 'slotted',
                                            selector: [
                                                builder.element('sp-menu-item'),
                                            ],
                                        },
                                    ],
                                    [builder.class('menu-divider')],
                                ],
                            },
                        },
                        {
                            replace: builder.combinator('child'),
                        },
                        {
                            replace: builder.class('header'),
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
