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
    spectrum: 'toggle',
    components: [
        {
            name: 'switch',
            host: '.spectrum-ToggleSwitch',
            focus: '#input',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-ToggleSwitch--quiet',
                },
                {
                    type: 'boolean',
                    selector: ':disabled',
                },
                {
                    type: 'boolean',
                    name: 'checked',
                    selector: ':checked',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-ToggleSwitch-input',
                    name: 'input',
                },
                {
                    selector: '.spectrum-ToggleSwitch-switch',
                    name: 'switch',
                },
                {
                    selector: '.spectrum-ToggleSwitch-label',
                    name: 'label',
                },
            ],
            exclude: [
                /* deprecated */
                /spectrum-ToggleSwitch--ab/,
            ],
        },
    ],
};

export default config;
