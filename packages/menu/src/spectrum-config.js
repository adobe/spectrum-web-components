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
                builder.class('spectrum-Menu-chevron'),
                builder.class('spectrum-Menu-checkmark'),
                builder.class('spectrum-Menu-item'),
                builder.class('spectrum-Menu-itemLabel'),
                builder.class('spectrum-Menu-itemLabel--wrapping'),
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
            ],
            excludeByWholeSelector: [
                [builder.class('spectrum-Menu-checkmark')],
                [builder.class('spectrum-Menu-chevron')],
            ],
            components: [
                converter.classToHost('spectrum-Menu-item'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-active', 'active'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToId('spectrum-Menu-itemLabel', 'label'),
                converter.classToClass('spectrum-Menu-itemIcon', 'icon'),
                converter.classToClass('spectrum-Menu-chevron', 'chevron'),
                converter.classToClass('spectrum-Menu-checkmark', 'checkmark'),
                converter.classToSlotted('spectrum-Icon', 'icon'),
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
                    // .spectrum-Menu-itemIcon+.spectrum-Menu-itemLabel
                    // slot[name='icon'] + #label
                    find: [
                        builder.class('spectrum-Menu-itemIcon'),
                        builder.combinator('+'),
                        builder.class('spectrum-Menu-itemLabel'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('name', 'icon'),
                            hoist: false,
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Icon'),
                        builder.combinator('+'),
                        builder.class('spectrum-Menu-itemLabel'),
                    ],
                    replace: [
                        {
                            replace: builder.class('icon'),
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
            ],
        },
        {
            // Menu Divider
            inPackage: '@spectrum-css/menu',
            outPackage: 'menu',
            fileName: 'menu-divider',
            excludeByComponents: [
                builder.class('spectrum-Menu-chevron'),
                builder.class('spectrum-Menu-checkmark'),
                builder.class('spectrum-Menu-item'),
                builder.class('spectrum-Menu-itemLabel'),
                builder.class('spectrum-Menu-itemLabel--wrapping'),
                builder.class('spectrum-Menu-sectionHeading'),
            ],
            excludeByWholeSelector: [
                [builder.class('spectrum-Menu')],
                [
                    builder.class('spectrum-Menu'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu'),
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
                builder.class('spectrum-Menu-chevron'),
                builder.class('spectrum-Menu-item'),
                builder.class('spectrum-Menu-itemLabel'),
                builder.class('spectrum-Menu-itemLabel--wrapping'),
            ],
            components: [
                converter.classToClass('spectrum-Menu-checkmark', 'checkmark'),
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
                builder.class('spectrum-Menu-checkmark'),
                builder.class('spectrum-Menu-item'),
                builder.class('spectrum-Menu-itemLabel'),
                builder.class('spectrum-Menu-itemLabel--wrapping'),
            ],
            components: [
                converter.classToClass('spectrum-Menu-chevron', 'chevron'),
            ],
        },
        {
            // Menu
            inPackage: '@spectrum-css/menu',
            outPackage: 'menu',
            fileName: 'menu',
            excludeByComponents: [
                builder.class('spectrum-Menu-divider'),
                builder.class('spectrum-Menu-sectionHeading'),
                builder.class('spectrum-Menu-chevron'),
                builder.class('spectrum-Menu-checkmark'),
                builder.class('spectrum-Menu-itemLabel'),
                builder.class('spectrum-Menu-itemLabel--wrapping'),
                builder.class('spectrum-Menu-item'),
            ],
            includeByWholeSelector: [
                /* [dir=ltr] .spectrum-Menu.is-selectable .spectrum-Menu-item */
                [
                    builder.attribute('dir', 'ltr'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu'),
                    builder.class('is-selectable'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu-item'),
                ],
                /* [dir=rtl] .spectrum-Menu.is-selectable .spectrum-Menu-item */
                [
                    builder.attribute('dir', 'rtl'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu'),
                    builder.class('is-selectable'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu-item'),
                ],
                /* [dir=ltr] .spectrum-Menu.is-selectable .spectrum-Menu-item.is-selected */
                [
                    builder.attribute('dir', 'ltr'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu'),
                    builder.class('is-selectable'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu-item'),
                    builder.class('is-selected'),
                ],
                /* [dir=rtl] .spectrum-Menu.is-selectable .spectrum-Menu-item.is-selected */
                [
                    builder.attribute('dir', 'rtl'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu'),
                    builder.class('is-selectable'),
                    builder.combinator(' '),
                    builder.class('spectrum-Menu-item'),
                    builder.class('is-selected'),
                ],
            ],
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-selectable', 'selects'),
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
            ],
        },
    ],
};

export default config;
