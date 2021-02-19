/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const config = {
    spectrum: 'colorslider',
    components: [
        {
            name: 'color-slider',
            host: {
                selector: '.spectrum-ColorSlider',
            },
            attributes: [
                {
                    name: 'focused',
                    type: 'boolean',
                    selector: '.is-focused',
                },
                {
                    name: 'disabled',
                    type: 'boolean',
                    selector: '.is-disabled',
                },
                {
                    name: 'vertical',
                    type: 'boolean',
                    selector: '.spectrum-ColorSlider--vertical',
                },
            ],
            classes: [
                {
                    name: 'checkerboard',
                    selector: '.spectrum-ColorSlider-checkerboard',
                },
                {
                    name: 'gradient',
                    selector: '.spectrum-ColorSlider-gradient',
                },
                {
                    name: 'slider',
                    selector: '.spectrum-ColorSlider-slider',
                },
                {
                    name: 'handle',
                    selector: '.spectrum-ColorSlider-handle',
                },
            ],
        },
    ],
};

export default config;
