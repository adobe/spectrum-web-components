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

const converter = converterFor('spectrum-CoachMark');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/coachindicator',
            outPackage: 'coachmark',
            fileName: 'coach-indicator',
            components: [
                converter.classToHost('spectrum-CoachIndicator'),
                converter.classToClass('spectrum-CoachIndicator-ring', 'ring'),
                converter.classToAttribute(
                    'spectrum-CoachIndicator--quiet',
                    'quiet'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-CoachIndicator--dark', 'black'],
                        ['spectrum-CoachIndicator--light', 'white'],
                    ],
                    'static'
                ),
            ],
        },
        {
            inPackage: '@spectrum-css/coachmark',
            outPackage: 'coachmark',
            fileName: 'coachmark',
            components: [
                converter.classToHost(),
                converter.classToClass('spectrum-CoachMark-ring'),
                converter.classToClass('spectrum-CoachMark-buttongroup'),
                converter.classToClass(
                    'spectrum-CoachMark-buttongroup--mobile',
                    'buttongroup-mobile'
                ),
                converter.classToClass('spectrum-CoachMark-menu'),
                converter.classToClass('spectrum-CoachMark-image-wrapper'),
                converter.classToClass('spectrum-CoachMark-image'),
                converter.classToClass('spectrum-CoachMark-header'),
                converter.classToClass('spectrum-CoachMark-content'),
                converter.classToClass('spectrum-CoachMark-footer'),
                converter.classToClass('spectrum-CoachMark-action-menu'),
                converter.classToClass('spectrum-CoachMark-title'),
                converter.classToClass('spectrum-CoachMark-step'),
            ],
        },
    ],
};

export default config;
