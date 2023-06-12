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

const converter = converterFor('spectrum-Accordion');
const converterItem = converterFor('spectrum-Accordion-item');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/accordion',
            outPackage: 'accordion',
            fileName: 'accordion',
            excludeByComponents: [
                builder.class('spectrum-Accordion-item'),
                builder.class('spectrum-Accordion-itemIndicator'),
                builder.class('spectrum-Accordion-itemIconContainer'),
                builder.class('spectrum-Accordion-itemHeading'),
                builder.class('spectrum-Accordion-itemHeader'),
                builder.class('spectrum-Accordion-itemContent'),
            ],
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-open', 'open'),
                converter.classToAttribute('is-disabled', 'disabled'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Accordion--compact', 'compact'],
                        ['spectrum-Accordion--spacious', 'spacious'],
                    ],
                    'density'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Accordion--sizeS', 's'],
                        ['spectrum-Accordion--sizeL', 'l'],
                        ['spectrum-Accordion--sizeXL', 'xl'],
                    ],
                    'size'
                ),
            ],
        },
        {
            inPackage: '@spectrum-css/accordion',
            outPackage: 'accordion',
            fileName: 'accordion-item',
            excludeByComponents: [
                builder.class('spectrum-Accordion'),
                builder.class('spectrum-Accordion--compact'),
                builder.class('spectrum-Accordion--spacious'),
                builder.class('spectrum-Accordion--sizeS'),
                builder.class('spectrum-Accordion--sizeL'),
                builder.class('spectrum-Accordion--sizeXL'),
            ],
            components: [
                converterItem.classToHost(),
                converter.classToAttribute('is-open', 'open'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToId(
                    'spectrum-Accordion-itemHeading',
                    'heading'
                ),
                converter.classToId('spectrum-Accordion-itemHeader', 'header'),
                converter.classToId(
                    'spectrum-Accordion-itemContent',
                    'content'
                ),
                converter.classToClass(
                    'spectrum-Accordion-itemIconContainer',
                    'iconContainer'
                ),
                converter.classToClass(
                    'spectrum-Accordion-itemIndicator',
                    'indicator'
                ),
                {
                    find: builder.pseudoClass('first-of-type'),
                    replace: builder.pseudoClass('first-of-type'),
                    hoist: true,
                },
                {
                    find: builder.pseudoClass('first-child'),
                    replace: builder.pseudoClass('first-child'),
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
                    find: [
                        builder.class('spectrum-Accordion-itemHeader'),
                        builder.pseudoClass('focus'),
                    ],
                    replace: [
                        {
                            replace: builder.id('header'),
                        },
                        {
                            replace: builder.pseudoClass('focus'),
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
