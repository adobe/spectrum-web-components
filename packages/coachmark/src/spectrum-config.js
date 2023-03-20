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

const converter = converterFor('spectrum-CoachMarkIndicator');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/coachmark',
            outPackage: 'coachmark',
            fileName: 'coachmark',
            excludeByComponents: [
                {
                    type: 'class',
                    name: 'spectrum-CoachMarkPopover',
                },
                {
                    type: 'class',
                    name: 'spectrum-CoachMarkPopover-image',
                },
                {
                    type: 'class',
                    name: 'spectrum-CoachMarkPopover-content',
                },
                {
                    type: 'class',
                    name: 'spectrum-CoachMarkPopover-footer',
                },
                {
                    type: 'class',
                    name: 'spectrum-CoachMarkPopover-header',
                },
                {
                    type: 'class',
                    name: 'spectrum-CoachMarkPopover-step',
                },
                {
                    type: 'class',
                    name: 'spectrum-CoachMarkPopover-title',
                },
            ],
            components: [
                converter.classToHost(),
                converter.classToClass('spectrum-CoachMarkIndicator-ring'),
                converter.classToAttribute(
                    'spectrum-CoachMarkIndicator--quiet'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-CoachMarkIndicator--dark'],
                        ['spectrum-CoachMarkIndicator--light'],
                    ],
                    'variant'
                ),
            ],
        },
    ],
};

export default config;
