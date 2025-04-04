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

const converter = converterFor('spectrum-ClearButton');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const notDisabled = (type = 'pseudoClass') => ({
    type: 'pseudo-class',
    kind: 'not',
    selectors: builder[type]?.('disabled'),
});

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/clearbutton',
            outPackage: 'clear-button',
            fileName: 'clear-button',
            excludeByComponents: [
                // is-disabled is a duplicate of the :disabled pseudo-class
                builder.class('is-disabled'),
            ],
            components: [
                converter.classToHost(),
                converter.classToAttribute('spectrum-ClearButton--quiet'),
                {
                    find: builder.pseudoClass('active'),
                    replace: {
                        type: 'pseudo-class',
                        kind: 'is',
                        selectors: [
                            [
                                {
                                    type: 'pseudo-class',
                                    kind: 'active',
                                },
                            ],
                            [
                                {
                                    type: 'attribute',
                                    name: 'active',
                                },
                            ],
                        ],
                    },
                    hoist: true,
                },
                converter.pseudoToAttribute('disabled', 'disabled'),
                ...converter.enumerateAttributes(
                    [
                        [
                            'spectrum-ClearButton--overBackground',
                            'overBackground',
                        ],
                    ],
                    'variant'
                ),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-ClearButton--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-ClearButton--sizeS', 's'],
                        ['spectrum-ClearButton--sizeL', 'l'],
                        ['spectrum-ClearButton--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToClass('spectrum-Icon', 'icon'),
                converter.classToClass('spectrum-ClearButton-fill'),
                converter.classToClass('spectrum-ClearButton-icon'),
                ...converter.enumerateAttributes(
                    [['spectrum-ClearButton--staticWhite', 'white']],
                    'static-color'
                ),
                {
                    find: builder.pseudoClass('hover'),
                    replace: builder.pseudoClass('hover'),
                    hoist: true,
                },
                {
                    find: notDisabled(),
                    replace: notDisabled('attribute'),
                    hoist: true,
                },
                {
                    find: [notDisabled(), builder.pseudoClass('focus-visible')],
                    replace: [
                        builder.pseudoClass('focus-visible'),
                        notDisabled('attribute'),
                    ],
                    hoist: true,
                },
                {
                    find: [notDisabled(), builder.pseudoClass('focus-within')],
                    replace: [
                        builder.attribute('focus-within'),
                        notDisabled('attribute'),
                    ],
                    hoist: true,
                },
                {
                    find: notDisabled(),
                    replace: notDisabled('attribute'),
                    hoist: true,
                },
            ],
        },
    ],
};

export default config;
