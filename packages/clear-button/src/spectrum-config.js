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

import { converterFor } from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-ClearButton');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/clearbutton',
            outPackage: 'clear-button',
            fileName: 'clear-button',
            components: [
                converter.classToHost(),
                converter.pseudoToAttribute('active', 'active'),
                converter.pseudoToAttribute('disabled', 'disabled'),
                converter.classToAttribute('is-disabled', 'disabled'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-ClearButton--cta'],
                        ['spectrum-ClearButton--primary'],
                        ['spectrum-ClearButton--secondary'],
                        ['spectrum-ClearButton--overBackground'],
                        ['spectrum-ClearButton--warning', 'negative'],
                    ],
                    'variant'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-ClearButton--sizeS', 's'],
                        ['spectrum-ClearButton--sizeM', 'm'],
                        ['spectrum-ClearButton--sizeL', 'l'],
                        ['spectrum-ClearButton--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToClass('spectrum-Icon', 'icon'),
                converter.classToClass('spectrum-ClearButton-fill'),
            ],
            excludeByComponents: [
                {
                    type: 'pseudo-element',
                    kind: 'custom',
                    name: '-moz-focus-inner',
                },
            ],
        },
    ],
};

export default config;
