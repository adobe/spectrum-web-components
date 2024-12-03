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

const converter = converterFor('spectrum-ColorWheel');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/colorwheel',
            outPackage: 'color-wheel',
            fileName: 'color-wheel',
            excludeByComponents: [
                builder.class('🤫'),
                builder.class('spectrum-ColorWheel-ColorArea-handle'),
            ],
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-focused', 'focused'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToAttribute('is-dragged', 'dragged'),
                converter.classToClass('spectrum-ColorWheel-handle'),
                converter.classToClass('spectrum-ColorWheel-slider'),
                converter.classToClass('spectrum-ColorWheel-wheel'),
                converter.classToClass('spectrum-ColorWheel-innerCircle'),
                converter.classToClass('spectrum-ColorWheel-outerCircle'),
                converter.classToClass('spectrum-ColorWheel-segment'),
                converter.classToClass('spectrum-ColorWheel-border'),
                converter.classToClass(
                    'spectrum-ColorWheel-colorarea-container'
                ),
                converter.classToClass('spectrum-ColorWheel-inner'),
                converter.classToSlotted(
                    'spectrum-ColorWheel-gradient',
                    'gradient'
                ),
            ],
        },
    ],
};

export default config;
