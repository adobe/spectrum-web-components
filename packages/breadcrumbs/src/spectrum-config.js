/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
// @ts-check

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Breadcrumbs');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/breadcrumb',
            outPackage: 'breadcrumbs',
            fileName: 'breadcrumbs',
            hoistCustomPropertiesFrom: 'spectrum-Breadcrumbs',
            excludeByComponents: [
                builder.class('spectrum-Breadcrumbs-itemSeparator'),
                builder.class('spectrum-Breadcrumbs-itemLink'),
                builder.class('spectrum-Breadcrumbs-item'),
                builder.class('spectrum-Breadcrumbs--multiline'),
            ],
            includeByWholeSelector: [
                /* .spectrum-Breadcrumbs--compact .spectrum-Breadcrumbs-item */
                [
                    builder.class('spectrum-Breadcrumbs--compact'),
                    builder.combinator(' '),
                    builder.class('spectrum-Breadcrumbs-item'),
                ],
                /* .spectrum-Breadcrumbs--compact .spectrum-Breadcrumbs-item:last-of-type */
                [
                    builder.class('spectrum-Breadcrumbs--compact'),
                    builder.combinator(' '),
                    builder.class('spectrum-Breadcrumbs-item'),
                    builder.pseudoClass('last-of-type'),
                ],
            ],
            components: [
                converter.classToId('spectrum-Breadcrumbs', 'list'),
                converter.classToAttribute('spectrum-Breadcrumbs--compact'),
                {
                    find: [builder.class('spectrum-Breadcrumbs-item')],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [
                                    builder.element('sp-breadcrumb-item'),
                                ],
                            },
                        },
                    ],
                },
                {
                    find: [builder.class('spectrum-Breadcrumbs--compact')],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'host',
                                selectors: [builder.attribute('compact')],
                            },
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('list'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Breadcrumbs-item'),
                        builder.pseudoClass('last-of-type'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.pseudoClass('last-of-type')],
                            },
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
            ],
        },
        {
            inPackage: '@spectrum-css/breadcrumb',
            outPackage: 'breadcrumbs',
            fileName: 'breadcrumbs-item',
            excludeByComponents: [
                builder.class('spectrum-Breadcrumbs'),
                builder.class('spectrum-Breadcrumbs--compact'),
                builder.class('spectrum-Breadcrumbs--multiline'),
            ],
            components: [
                converter.classToHost('spectrum-Breadcrumbs-item'),
                {
                    find: builder.pseudoClass('first-of-type'),
                    replace: builder.pseudoClass('first-of-type'),
                    hoist: true,
                },
                {
                    find: [
                        builder.class('spectrum-Accordion-itemHeader'),
                        builder.pseudoClass('hover'),
                    ],
                    replace: [
                        {
                            replace: builder.id('header'),
                        },
                        {
                            replace: builder.pseudoClass('hover'),
                        },
                    ],
                },
                {
                    find: [builder.pseudoClass('last-of-type')],
                    replace: [
                        // :host(:not(.is-menu):last-of-type)
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'not',
                                selectors: [[builder.class('is-menu')]],
                            },
                            hoist: true,
                        },
                        {
                            replace: builder.pseudoClass('last-of-type'),
                            hoist: true,
                        },
                    ],
                    hoist: true,
                },
                converter.classToId(
                    'spectrum-Breadcrumbs-itemSeparator',
                    'separator'
                ),
                converter.classToId(
                    'spectrum-Breadcrumbs-itemLink',
                    'item-link'
                ),
                {
                    find: [builder.class('spectrum-ActionButton')],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.element('sp-action-menu')],
                            },
                        },
                    ],
                },
                {
                    collapseSelector: true,
                    find: [
                        builder.class('spectrum-ActionButton'),
                        builder.pseudoClass('disabled'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [
                                    builder.element('sp-action-menu'),
                                    builder.attribute('disabled'),
                                ],
                            },
                        },
                    ],
                },
                // :host([href]) -> #item-link[href]
                {
                    hoist: false,
                    find: builder.attribute('href'),
                    replace: builder.attribute('href'),
                },
                // :host([tabindex="0"]) -> #item-link[tabindex="0"]
                {
                    hoist: false,
                    find: builder.attribute('tabindex'),
                    replace: builder.attribute('tabindex'),
                },
            ],
        },
    ],
};

export default config;
