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

const converter = converterFor('spectrum-Switch');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/switch',
            outPackage: 'switch',
            fileName: 'switch',
            components: [
                {
                    find: [
                        builder.class('spectrum-Switch-input'),
                        builder.pseudoClass('focus-visible'),
                    ],
                    replace: [
                        {
                            replace: builder.id('input'),
                        },
                        {
                            replace: builder.pseudoClass('focus-visible'),
                        },
                    ],
                },
                {
                    find: builder.pseudoClass('active'),
                    replace: builder.pseudoClass('active'),
                    hoist: true,
                },
                converter.classToHost(),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-Switch--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Switch--sizeS', 's'],
                        ['spectrum-Switch--sizeL', 'l'],
                        ['spectrum-Switch--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.pseudoToAttribute('disabled', 'disabled'),
                converter.pseudoToAttribute('checked', 'checked'),
                converter.classToAttribute('spectrum-Switch--emphasized'),
                converter.classToAttribute('spectrum-Switch--disabled'),
                converter.classToId('spectrum-Switch-input'),
                converter.classToId('spectrum-Switch-switch'),
                converter.classToId('spectrum-Switch-label'),
            ],
        },
    ],
};

export default config;
