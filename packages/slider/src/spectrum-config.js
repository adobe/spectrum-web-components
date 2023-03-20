/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Slider');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/slider',
            outPackage: 'slider',
            fileName: 'slider',
            hoistCustomPropertiesFrom: 'spectrum-Slider',
            excludeByWholeSelector: [
                [
                    builder.attribute('dir'),
                    builder.combinator(' '),
                    builder.attribute('dir'),
                    builder.combinator(' '),
                    builder.class('spectrum-Slider--range'),
                    builder.combinator(' '),
                    builder.class('spectrum-Slider-track'),
                ],
            ],
            components: [
                converter.classToHost(),
                converter.classToAttribute('is-disabled', 'disabled'),
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Slider--color', 'color'],
                        ['spectrum-Slider--filled', 'filled'],
                        ['spectrum-Slider--ramp', 'ramp'],
                        ['spectrum-Slider--range', 'range'],
                        ['spectrum-Slider--tick', 'tick'],
                    ],
                    'variant'
                ),
                converter.classToId('spectrum-Slider-buffer', 'buffer'),
                converter.classToId('spectrum-Slider-controls', 'controls'),
                converter.classToId('spectrum-Slider-fill', 'fill'),
                converter.classToId('spectrum-Slider-label', 'label'),
                converter.classToId(
                    'spectrum-Slider-labelContainer',
                    'label-container'
                ),
                converter.classToId('spectrum-Slider-ramp', 'ramp'),
                converter.classToId('spectrum-Slider-value', 'value'),
                converter.classToClass('spectrum-Slider-handle', 'handle'),
                converter.classToClass('spectrum-Slider-input', 'input'),
                converter.classToClass('spectrum-Slider-tick', 'tick'),
                converter.classToClass(
                    'spectrum-Slider-tickLabel',
                    'tickLabel'
                ),
                converter.classToClass('spectrum-Slider-ticks', 'ticks'),
                converter.classToClass('spectrum-Slider-track', 'track'),
                converter.classToClass('is-focused', 'handle-highlight'),
                converter.classToClass('is-dragged', 'dragging'),
            ],
        },
    ],
};
export default config;
