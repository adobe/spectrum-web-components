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

const converter = converterFor('spectrum-CloseButton');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/closebutton',
            outPackage: 'close-button',
            fileName: 'close-button',
            components: [
                converter.classToHost(),
                converter.pseudoToAttribute('active', 'active'),
                converter.pseudoToAttribute('disabled', 'disabled'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute('is-keyboardFocused', 'focused'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-CloseButton--staticWhite', 'white'],
                        ['spectrum-CloseButton--staticBlack', 'black'],
                    ],
                    'static'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Closebutton--sizeS', 's'],
                        ['spectrum-Closebutton--sizeM', 'm'],
                        ['spectrum-Closebutton--sizeL', 'l'],
                        ['spectrum-Closebutton--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToClass('spectrum-CloseButton-UIIcon', 'icon'),
                {
                    hoist: true,
                    find: {
                        type: 'pseudo-class',
                        kind: 'focus-visible',
                    },
                    replace: {
                        type: 'pseudo-class',
                        kind: 'focus-visible',
                    },
                },
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'not',
                        selectors: [
                            [
                                {
                                    type: 'pseudo-class',
                                    kind: 'disabled',
                                },
                            ],
                        ],
                    },
                    replace: {
                        kind: 'not',
                        type: 'pseudo-class',
                        selectors: [
                            [
                                {
                                    name: 'disabled',
                                    type: 'attribute',
                                },
                            ],
                        ],
                    },
                    hoist: true,
                },
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
