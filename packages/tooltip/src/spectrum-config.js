// @ts-check
/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Tooltip');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
export default {
    conversions: [
        {
            inPackage: '@spectrum-css/tooltip',
            outPackage: 'tooltip',
            fileName: 'tooltip',
            excludeByComponents: [builder.class('u-tooltip-showOnHover')],
            components: [
                converter.classToId('spectrum-Tooltip', 'tooltip'),
                converter.classToAttribute('is-open', 'open'),
                {
                    find: [builder.class('spectrum-Tooltip--top')],
                    replace: [
                        {
                            replace: builder.attribute(
                                'placement',
                                'top',
                                'substring'
                            ),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('tooltip'),
                        },
                    ],
                    expandSelector: true,
                },
                {
                    find: [builder.class('spectrum-Tooltip--bottom')],
                    replace: [
                        {
                            replace: builder.attribute(
                                'placement',
                                'bottom',
                                'substring'
                            ),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('tooltip'),
                        },
                    ],
                    expandSelector: true,
                },
                {
                    find: [builder.class('spectrum-Tooltip--left')],
                    replace: [
                        {
                            replace: builder.attribute(
                                'placement',
                                'left',
                                'substring'
                            ),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('tooltip'),
                        },
                    ],
                    expandSelector: true,
                },
                {
                    find: [builder.class('spectrum-Tooltip--right')],
                    replace: [
                        {
                            replace: builder.attribute(
                                'placement',
                                'right',
                                'substring'
                            ),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('tooltip'),
                        },
                    ],
                    expandSelector: true,
                },
                {
                    find: [builder.class('spectrum-Tooltip--info')],
                    replace: [
                        {
                            replace: builder.attribute('variant', 'info'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('tooltip'),
                        },
                    ],
                    expandSelector: true,
                },
                {
                    find: [builder.class('spectrum-Tooltip--positive')],
                    replace: [
                        {
                            replace: builder.attribute('variant', 'positive'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('tooltip'),
                        },
                    ],
                    expandSelector: true,
                },
                {
                    find: [builder.class('spectrum-Tooltip--negative')],
                    replace: [
                        {
                            replace: builder.attribute('variant', 'negative'),
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                        {
                            replace: builder.id('tooltip'),
                        },
                    ],
                    expandSelector: true,
                },
                converter.classToId('spectrum-Tooltip-label'),
                converter.classToId('spectrum-Tooltip-tip'),
                converter.classToSlotted('spectrum-Tooltip-typeIcon', 'icon'),
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'lang',
                    },
                    hoist: true,
                },
            ],
        },
    ],
};
