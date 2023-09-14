// @ts-check
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

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-SplitButton');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/splitbutton',
            outPackage: 'split-button',
            fileName: 'split-button',
            components: [
                converter.classToHost(),
                converter.classToAttribute('spectrum-SplitButton--left'),
                converter.classToId('spectrum-SplitButton-action', 'button'),
                converter.classToClass('spectrum-SplitButton-trigger'),
                converter.classToClass('spectrum-SplitButton-icon'),
                converter.classToClass('spectrum-Button-label', 'label'),
                {
                    find: builder.class('spectrum-Button--accent'),
                    replace: builder.attribute('variant', 'accent'),
                    hoist: false,
                },
                {
                    find: [builder.pseudoClass('focus-visible')],
                    replace: [
                        {
                            replace: builder.pseudoClass('focus-visible'),
                            hoist: false,
                        },
                    ],
                },
                {
                    find: [builder.pseudoClass('focus')],
                    replace: [
                        {
                            replace: builder.pseudoClass('focus'),
                            hoist: false,
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
