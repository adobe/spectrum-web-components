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
                    name: 'regex',
                    regex: /spectrum-CoachMarkPopover/,
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
        {
            inPackage: '@spectrum-css/coachmark',
            outPackage: 'coachmark',
            fileName: 'coachmark-popover-content',
            components: [
                converter.classToHost('spectrum-CoachMarkPopover'),
                converter.classToId(
                    'spectrum-CoachMarkPopover-header',
                    'header'
                ),
                converter.classToId('spectrum-CoachMarkPopover-title', 'title'),
                converter.classToId(
                    'spectrum-CoachMarkPopover-content',
                    'content'
                ),
                converter.classToId(
                    'spectrum-CoachMarkPopover-footer',
                    'footer'
                ),
                converter.classToId('spectrum-CoachMarkPopover-step', 'step'),
                converter.classToId('spectrum-CoachMarkPopover-image', 'image'),
            ],
            excludeByComponents: [
                {
                    type: 'class',
                    name: 'regex',
                    regex: /spectrum-CoachMarkIndicator/,
                },
            ],
            excludeByKeyFrames: [
                {
                    type: 'ident',
                    value: 'pulse',
                },
                {
                    type: 'ident',
                    value: 'pulse--quiet',
                },
            ],
        },
    ],
};

export default config;
