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

const converter = converterFor('spectrum-QuickActions');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/quickaction',
            outPackage: 'quick-actions',
            fileName: 'quick-actions',
            components: [
                converter.classToHost(),
                converter.classToAttribute(
                    'spectrum-QuickActions--textOnly',
                    'text-only'
                ),
                converter.classToAttribute('is-open', 'opened'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-QuickActions--left'],
                        ['spectrum-QuickActions--right'],
                    ],
                    'enter-from'
                ),
                converter.classToId('spectrum-QuickActions-overlay'),
                converter.classToSlotted('spectrum-ActionButton', 'button'),
                {
                    find: [
                        builder.class('spectrum-ActionButton'),
                        builder.combinator('+'),
                        builder.class('spectrum-ActionButton'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('name', 'action'),
                            hoist: false,
                        },
                        {
                            replace: builder.combinator('+'),
                        },
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.attribute('slot', 'action')],
                            },
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
