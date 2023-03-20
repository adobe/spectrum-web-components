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

const converter = converterFor('spectrum-Picker');
/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/picker',
            outPackage: 'picker',
            fileName: 'picker',
            hoistCustomPropertiesFrom: 'spectrum-Picker',
            excludeByComponents: [builder.class('spectrum-Popover--bottom')],
            components: [
                converter.classToId('spectrum-Picker', 'button'),
                converter.classToAttribute('spectrum-Picker--quiet'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-invalid', 'invalid'),
                converter.classToAttribute('is-open', 'open'),
                converter.classToAttribute('is-focused', 'focused'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Picker--sizeS', 's'],
                        ['spectrum-Picker--sizeM', 'm'],
                        ['spectrum-Picker--sizeL', 'l'],
                        ['spectrum-Picker--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToClass('spectrum-Picker-menuIcon', 'picker'),
                converter.classToClass('spectrum-Menu-checkmark', 'checkmark'),
                converter.classToClass('is-placeholder', 'placeholder'),
                converter.classToClass(
                    'spectrum-Picker-validationIcon',
                    'validation-icon'
                ),
                converter.classToClass('spectrum-Picker-icon', 'icon'),
                converter.classToId('spectrum-Picker-trigger', 'button'),
                converter.classToId('spectrum-Picker-label', 'label'),
                converter.classToId('spectrum-Picker-popover', 'popover'),
                {
                    expandSelector: true,
                    find: [builder.class('spectrum-Picker--quiet')],
                    replace: [
                        {
                            replace: builder.attribute('quiet'),
                        },
                        {
                            replace: builder.combinator('descendant'),
                        },
                        {
                            replace: builder.id('button'),
                        },
                    ],
                },
                {
                    // prevents hoisting .focus-ring to :host as :focus-visible
                    find: [builder.class('focus-ring')],
                    replace: [
                        {
                            replace: builder.pseudoClass('focus-visible'),
                        },
                    ],
                },
                {
                    // .spectrum-Picker .spectrum-Picker-icon
                    collapseSelector: true,
                    find: [
                        builder.class('spectrum-Picker'),
                        builder.combinator('descendant'),
                        builder.class('spectrum-Picker-icon'),
                    ],
                    replace: [
                        {
                            replace: builder.class('icon'),
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
