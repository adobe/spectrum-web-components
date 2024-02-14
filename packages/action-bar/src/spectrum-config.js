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

const converter = converterFor('spectrum-ActionBar');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/actionbar',
            outPackage: 'action-bar',
            fileName: 'action-bar',
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-open', 'open'),
                converter.classToAttribute('spectrum-ActionBar--flexible'),
                converter.classToAttribute('spectrum-ActionBar--emphasized'),
                converter.classToClass('spectrum-CloseButton', 'close-button'),
                converter.classToClass('spectrum-ActionGroup', 'action-group'),
                converter.classToClass('spectrum-FieldLabel', 'field-label'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-ActionBar--sticky'],
                        ['spectrum-ActionBar--fixed'],
                    ],
                    'variant'
                ),
                converter.classToId('spectrum-ActionBar-popover'),
            ],
        },
    ],
};

export default config;
