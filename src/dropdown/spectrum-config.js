/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

module.exports = {
    spectrum: 'dropdown',
    components: [
        {
            name: 'dropdown',
            host: {
                selector: '.spectrum-Dropdown',
            },
            attributes: [
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
                    selector: '.spectrum-Dropdown-icon',
                    name: 'dropdown',
                },
                {
                    selector: '.spectrum-Menu-checkmark',
                    name: 'checkmark',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Dropdown-trigger',
                    name: 'button',
                },
                {
                    selector: '.spectrum-Dropdown-label',
                    name: 'label',
                },
            ],
        },
    ],
};
