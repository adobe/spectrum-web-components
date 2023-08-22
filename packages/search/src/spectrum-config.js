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

const converter = converterFor('spectrum-Search');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/search',
            outPackage: 'search',
            fileName: 'search',
            hoistCustomPropertiesFrom: 'spectrum-Search',
            components: [
                converter.classToId('spectrum-Search', 'textfield'),
                converter.classToClass('spectrum-Search-input', 'input'),
                converter.classToClass('spectrum-Icon', 'icon'),
                converter.classToClass('spectrum-Search-icon', 'icon-search'),
                converter.classToAttribute('spectrum-Search--quiet', 'quiet'),
                converter.classToId('spectrum-Search-clearButton', 'button'),
                converter.classToId('spectrum-Search-textfield', 'textfield'),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-Search--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Search--sizeS', 's'],
                        ['spectrum-Search--sizeL', 'l'],
                        ['spectrum-Search--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.class('spectrum-Search--quiet')]],
                    },
                    replace: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [[builder.attribute('quiet')]],
                    },
                    hoist: true,
                },
                {
                    find: [builder.class('focus-ring')],
                    replace: [
                        {
                            replace: builder.pseudoClass('focus-visible'),
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
