/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

module.exports = {
    spectrum: 'menu',
    components: [
        {
            name: 'menu-item',
            host: {
                selector: '.spectrum-Menu-item',
                shadowSelector: '#item',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'boolean',
                    selector: '.is-selected',
                    name: 'selected',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Menu-itemLabel',
                    name: 'label',
                },
                {
                    selector: '.spectrum-Menu-checkmark',
                    name: 'selected',
                },
            ],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
            ],
        },
        {
            name: 'menu-divider',
            host: {
                selector: '.spectrum-Menu-divider',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-Menu-divider',
                    name: 'divider',
                },
            ],
        },
    ],
};
