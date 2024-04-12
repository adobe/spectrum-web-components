/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
// @ts-check

import { converterFor } from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-AlertBanner');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/alertbanner',
            outPackage: 'alert-banner',
            fileName: 'alert-banner',
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-open', 'open'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-AlertBanner--info'],
                        ['spectrum-AlertBanner--negative'],
                    ],
                    'variant'
                ),
                converter.classToClass('spectrum-AlertBanner-body'),
                converter.classToClass('spectrum-AlertBanner-content'),
                converter.classToClass('spectrum-AlertBanner-text'),
                converter.classToSlotted('spectrum-Button', 'action'),
                converter.classToClass('spectrum-AlertBanner-end'),
                converter.classToClass('spectrum-AlertBanner-icon', 'type'),
            ],
        },
    ],
};

export default config;
