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

const converter = converterFor('spectrum-FieldLabel');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/fieldlabel',
            outPackage: 'field-label',
            fileName: 'field-label',
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-disabled', 'disabled'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-FieldLabel--left', 'start'],
                        ['spectrum-FieldLabel--right', 'end'],
                    ],
                    'side-aligned'
                ),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-FieldLabel--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-FieldLabel--sizeS', 's'],
                        ['spectrum-FieldLabel--sizeL', 'l'],
                        ['spectrum-FieldLabel--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToClass(
                    'spectrum-FieldLabel-requiredIcon',
                    'required-icon'
                ),
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'lang',
                    },
                    hoist: true,
                },
            ],
            excludeByComponents: [
                builder.class('spectrum-Form'),
                builder.class('spectrum-Form-item'),
                builder.class('spectrum-Form-itemLabel'),
                builder.class('spectrum-Form--labelsAbove'),
                builder.class('spectrum-Form-itemField'),
            ],
        },
    ],
};

export default config;
