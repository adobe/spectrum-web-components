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
    spectrum: 'picker',
    components: [
        {
            name: 'dropdown',
            host: {
                selector: '.spectrum-Picker',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-Picker--quiet',
                },
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'boolean',
                    selector: '.is-invalid',
                    name: 'invalid',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-Icon',
                    name: 'icon',
                },
                {
                    selector: '.spectrum-Picker-icon',
                    name: 'dropdown',
                },
                {
                    selector: '.spectrum-Menu-checkmark',
                    name: 'checkmark',
                },
                {
                    selector: '.is-placeholder',
                    name: 'placeholder',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Picker-trigger',
                    name: 'button',
                },
                {
                    selector: '.spectrum-Picker-label',
                    name: 'label',
                },
                {
                    selector: '.spectrum-Picker-popover',
                    name: 'popover',
                },
            ],
        },
    ],
};

export default config;
