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

const converter = converterFor('spectrum-Radio');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/radio',
            outPackage: 'radio',
            fileName: 'radio',
            components: [
                {
                    find: [builder.pseudoClass('focus')],
                    replace: [
                        {
                            replace: builder.pseudoClass('focus-visible'),
                            hoist: true,
                        },
                    ],
                },
                {
                    // .spectrum-Radio-input:focus-visible+.spectrum-Radio-button:after
                    find: [
                        builder.class('spectrum-Radio-input'),
                        builder.pseudoClass('focus-visible'),
                        builder.combinator('+'),
                        builder.class('spectrum-Radio-button'),
                        builder.pseudoElement('after'),
                    ],
                    // :host(:focus-visible) #input + #button:after
                    replace: [
                        {
                            replace: builder.id('input'),
                        },
                        {
                            replace: builder.pseudoClass('focus-visible'),
                        },
                        {
                            replace: builder.combinator('+'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                        {
                            replace: builder.pseudoElement('after'),
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Radio-label'),
                        {
                            type: 'pseudo-class',
                            kind: 'lang',
                        },
                    ],
                    replace: [
                        {
                            replace: builder.id('label'),
                        },
                        'take',
                    ],
                },
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'lang',
                    },
                    hoist: true,
                },
                {
                    find: builder.pseudoClass('active'),
                    hoist: true,
                },
                converter.classToHost(),
                converter.pseudoToAttribute('disabled', 'disabled'),
                converter.pseudoToAttribute('checked', 'checked'),
                converter.classToAttribute('is-invalid', 'invalid'),
                converter.classToAttribute('is-readOnly', 'readonly'),
                converter.classToAttribute('spectrum-Radio--emphasized'),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-Radio--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Radio--sizeS', 's'],
                        ['spectrum-Radio--sizeL', 'l'],
                        ['spectrum-Radio--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToId('spectrum-Radio-input'),
                converter.classToId('spectrum-Radio-button'),
                converter.classToId('spectrum-Radio-label'),
            ],
        },
    ],
};

export default config;
