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

const converter = converterFor('spectrum-Checkbox');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/checkbox',
            outPackage: 'checkbox',
            fileName: 'checkbox',
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-indeterminate', 'indeterminate'),
                // converter.classToAttribute('is-invalid', 'invalid'),
                converter.classToAttribute('is-readOnly', 'readonly'),
                converter.classToAttribute('spectrum-Checkbox--emphasized'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Checkbox--sizeS', 's'],
                        ['spectrum-Checkbox--sizeM', 'm'],
                        ['spectrum-Checkbox--sizeL', 'l'],
                        ['spectrum-Checkbox--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToId('spectrum-Checkbox-input'),
                converter.classToId('spectrum-Checkbox-box'),
                converter.classToId('spectrum-Checkbox-checkmark'),
                converter.classToId('spectrum-Checkbox-partialCheckmark'),
                converter.classToId('spectrum-Checkbox-label'),
                {
                    find: [
                        {
                            type: 'class',
                            name: 'focus-ring',
                        },
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-class',
                                kind: 'focus-visible',
                            },
                            hoist: false,
                        },
                    ],
                },
                {
                    find: [
                        {
                            type: 'class',
                            name: 'is-invalid',
                        },
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'attribute',
                                name: 'invalid',
                            },
                            emphasize: true,
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
