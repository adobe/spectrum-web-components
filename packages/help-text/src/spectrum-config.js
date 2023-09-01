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

const converter = converterFor('spectrum-HelpText');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/helptext',
            outPackage: 'help-text',
            fileName: 'help-text',
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-disabled', 'disabled'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-HelpText--neutral'],
                        ['spectrum-HelpText--negative'],
                    ],
                    'variant'
                ),
                // Default to `size='m'` without needing the attribute
                converter.classToHost('spectrum-HelpText--sizeM'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-HelpText--sizeS', 's'],
                        ['spectrum-HelpText--sizeL', 'l'],
                        ['spectrum-HelpText--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                converter.classToClass('spectrum-HelpText-text'),
                converter.classToClass(
                    'spectrum-HelpText-validationIcon',
                    'icon'
                ),
                {
                    find: {
                        type: 'pseudo-class',
                        kind: 'lang',
                    },
                    hoist: true,
                },
            ],
        },
    ],
};

export default config;
