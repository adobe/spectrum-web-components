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
                converter.classToHost(),
                converter.classToAttribute('is-open', 'open'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Tooltip--top'],
                        ['spectrum-Tooltip--bottom'],
                        ['spectrum-Tooltip--left'],
                        ['spectrum-Tooltip--right'],
                    ],
                    'placement',
                    'substring'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Tooltip--info'],
                        ['spectrum-Tooltip--positive'],
                        ['spectrum-Tooltip--negative'],
                    ],
                    'variant'
                ),
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
