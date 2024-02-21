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

const converter = converterFor('spectrum-ProgressCircle');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/progresscircle',
            outPackage: 'progress-circle',
            fileName: 'progress-circle',
            excludeByComponents: [
                builder.class('spectrum-ProgressCircle--medium'),
            ],
            components: [
                converter.classToHost(),
                converter.classToAttribute(
                    'spectrum-ProgressCircle--indeterminate'
                ),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-ProgressCircle--small', 's'],
                        ['spectrum-ProgressCircle--large', 'l'],
                    ],
                    'size'
                ),
                ...converter.enumerateAttributes(
                    [['spectrum-ProgressCircle--staticWhite', 'white']],
                    'static'
                ),
                converter.classToClass('spectrum-ProgressCircle-track'),
                converter.classToClass('spectrum-ProgressCircle-fills'),
                converter.classToClass('spectrum-ProgressCircle-fill'),
                converter.classToClass('spectrum-ProgressCircle-fillMask1'),
                converter.classToClass('spectrum-ProgressCircle-fillMask2'),
                converter.classToClass('spectrum-ProgressCircle-fillSubMask1'),
                converter.classToClass('spectrum-ProgressCircle-fillSubMask2'),
                converter.classToClass(
                    'spectrum-ProgressCircle--indeterminate-fill-submask-2',
                    'fill-submask-2'
                ),
            ],
        },
    ],
};

export default config;
