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
    spectrum: 'stepper',
    components: [
        {
            name: 'number-field',
            host: {
                selector: '.spectrum-Stepper',
                shadowSelector: '#textfield',
            },
            attributes: [
                {
                    type: 'boolean',
                    name: 'quiet',
                    selector: '.spectrum-Stepper--quiet',
                },
                {
                    type: 'boolean',
                    name: 'disabled',
                    selector: '.is-disabled',
                },
                {
                    type: 'boolean',
                    name: 'invalid',
                    selector: '.is-invalid',
                },
                {
                    type: 'boolean',
                    name: 'focused',
                    selector: '.is-focused',
                },
                {
                    type: 'boolean',
                    name: 'keyboard-focused',
                    selector: '.is-keyboardFocused',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-Stepper-buttons',
                    name: 'buttons',
                },
                {
                    selector: '.spectrum-Stepper-stepDown',
                    name: 'stepDown',
                },
                {
                    selector: '.spectrum-Stepper-stepUp',
                    name: 'stepUp',
                },
                {
                    selector: '.spectrum-Stepper-textfield',
                    name: 'textfield',
                },
                {
                    selector: '.spectrum-Icon',
                    name: 'stepper-icon',
                },
                {
                    selector: '.spectrum-Stepper-input',
                    name: 'input',
                },
            ],
        },
    ],
};

export default config;
