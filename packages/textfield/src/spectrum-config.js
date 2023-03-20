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

const converter = converterFor('spectrum-Textfield');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
export default {
    conversions: [
        {
            inPackage: '@spectrum-css/textfield',
            outPackage: 'textfield',
            fileName: 'textfield',
            hoistCustomPropertiesFrom: 'spectrum-Textfield',
            excludeByComponents: [builder.class('🤫')],
            components: [
                converter.classToId('spectrum-Textfield', 'textfield'),
                converter.classToClass('spectrum-Textfield-input', 'input'),
                {
                    find: [
                        builder.class('spectrum-Textfield-input'),
                        builder.class('focus-ring'),
                    ],
                    replace: [
                        { replace: builder.class('input') },
                        { replace: builder.pseudoClass('focus-visible') },
                    ],
                    hoist: false,
                },
                converter.classToClass(
                    'spectrum-Textfield-validationIcon',
                    'icon'
                ),
                converter.classToClass(
                    'spectrum-Textfield-icon',
                    'icon-workflow'
                ),
                converter.classToAttribute('spectrum-Textfield--multiline'),
                converter.classToAttribute('spectrum-Textfield--quiet'),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute('is-keyboardFocused', 'focused'),
                converter.classToAttribute('is-valid', 'valid'),
                converter.classToAttribute('is-invalid', 'invalid'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-readOnly', 'readonly'),
            ],
        },
    ],
};
