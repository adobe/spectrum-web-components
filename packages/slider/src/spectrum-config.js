/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const config = {
    spectrum: 'slider',
    components: [
        {
            name: 'slider',
            host: '.spectrum-Slider',
            attributes: [
                {
                    type: 'boolean',
                    name: 'disabled',
                    selector: '.is-disabled',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-Slider--color',
                        '.spectrum-Slider--range',
                        '.spectrum-Slider--filled',
                        '.spectrum-Slider--ramp',
                        '.spectrum-Slider--tick',
                    ],
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Slider-buffer',
                    name: 'buffer',
                },
                {
                    selector: '.spectrum-Slider-ramp',
                    name: 'ramp',
                },
                {
                    selector: '.spectrum-Slider-controls',
                    name: 'controls',
                },
                {
                    selector: '.spectrum-Slider-label',
                    name: 'label',
                },
                {
                    selector: '.spectrum-Slider-labelContainer',
                    name: 'label-container',
                },
                {
                    selector: '.spectrum-Slider-value',
                    name: 'value',
                },
                {
                    selector: '.spectrum-Slider-fill',
                    name: 'fill',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-Slider-handle',
                    name: 'handle',
                },
                {
                    selector: '.is-focused',
                    name: 'handle-highlight',
                },
                {
                    selector: '.is-dragged',
                    name: 'dragging',
                },
                {
                    selector: '.spectrum-Slider-input',
                    name: 'input',
                },
                {
                    selector: '.spectrum-Slider-track',
                    name: 'track',
                },
                {
                    selector: '.spectrum-Slider-ticks',
                    name: 'ticks',
                },
                {
                    selector: '.spectrum-Slider-tick',
                    name: 'tick',
                },
                {
                    selector: '.spectrum-Slider-tickLabel',
                    name: 'tickLabel',
                },
            ],
            exclude: [/^\.is-disabled/],
        },
    ],
};

export default config;
