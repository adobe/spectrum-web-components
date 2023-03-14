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

const converter = converterFor('spectrum-Button');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/button',
            outPackage: 'button',
            fileName: 'button',
            excludeByComponents: [
                builder.element('a'),
                {
                    type: 'pseudo-element',
                    kind: 'custom',
                    name: '-moz-focus-inner',
                },
            ],
            components: [
                converter.classToHost(),
                converter.classToAttribute('spectrum-Button--quiet'),
                converter.classToAttribute('spectrum-Button--emphasized'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.pseudoToAttribute('disabled', 'disabled'),
                converter.pseudoToAttribute('active', 'active'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Button--sizeS', 's'],
                        ['spectrum-Button--sizeM', 'm'],
                        ['spectrum-Button--sizeL', 'l'],
                        ['spectrum-Button--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Button--accent'],
                        ['spectrum-Button--primary'],
                        ['spectrum-Button--secondary'],
                        ['spectrum-Button--negative'],
                    ],
                    'variant'
                ),
                ...converter.enumerateAttributes(
                    [['spectrum-Button--fill'], ['spectrum-Button--outline']],
                    'treatment'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Button--staticWhite', 'white'],
                        ['spectrum-Button--staticBlack', 'black'],
                    ],
                    'static'
                ),
                converter.classToId('spectrum-Button-label'),
                converter.classToSlotted('spectrum-Icon', 'icon'),
                {
                    find: [
                        builder.class('spectrum-Icon'),
                        builder.combinator('+'),
                        builder.class('spectrum-Button-label'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('name', 'icon', 'equal'),
                            hoist: false,
                        },
                        {
                            replace: builder.combinator('+'),
                        },
                        {
                            replace: builder.id('label'),
                        },
                    ],
                },
                {
                    hoist: false,
                    find: builder.pseudoClass('empty'),
                    replace: builder.attribute('hidden'),
                },
            ],
        },
    ],
};

export default config;
