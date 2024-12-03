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
// @ts-check

import { converterFor } from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-InfieldButton');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/infieldbutton',
            outPackage: 'infield-button',
            fileName: 'infield-button',
            components: [
                converter.classToHost(),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-InfieldButton--sizeS', 's'],
                        ['spectrum-InfieldButton--sizeL', 'l'],
                        ['spectrum-InfieldButton--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-InfieldButton--right', 'end'],
                        ['spectrum-InfieldButton--left', 'start'],
                    ],
                    'inline'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-InfieldButton--top', 'start'],
                        ['spectrum-InfieldButton--bottom', 'end'],
                    ],
                    'block'
                ),
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'active',
                    },
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
                converter.classToAttribute('spectrum-InfieldButton--quiet'),
                converter.pseudoToAttribute('disabled', 'disabled'),
                converter.classToClass('spectrum-InfieldButton-fill', 'fill'),
                converter.classToSlotted('spectrum-InfieldButton-icon'),
            ],
        },
    ],
};

export default config;
