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

const converter = converterFor('spectrum-Toast');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/toast',
            outPackage: 'toast',
            fileName: 'toast',
            components: [
                converter.classToHost(),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Toast--negative'],
                        ['spectrum-Toast--positive'],
                        ['spectrum-Toast--info'],
                        ['spectrum-Toast--error'],
                        ['spectrum-Toast--warning'],
                        ['spectrum-Toast--success'],
                    ],
                    'variant'
                ),
                converter.classToClass('spectrum-Toast-body'),
                converter.classToClass('spectrum-Toast-buttons'),
                converter.classToClass('spectrum-Toast-content'),
                converter.classToClass('spectrum-Toast-typeIcon', 'type'),
                converter.classToClass('spectrum-Toast-closeButton'),
                converter.classToSlotted('spectrum-Button', 'action'),
            ],
        },
    ],
};

export default config;
