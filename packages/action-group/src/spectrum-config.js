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
    spectrum: 'actiongroup',
    components: [
        {
            name: 'action-group',
            host: {
                selector: '.spectrum-ActionGroup',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-ActionGroup--vertical',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-ActionGroup--compact',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-ActionGroup--quiet',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-ActionGroup--justified',
                },
            ],
            slots: [
                {
                    selector: '.spectrum-ActionGroup-item',
                    name: '',
                },
            ],
            complexSelectors: [
                {
                    replacement: '::slotted(:not(:last-child))',
                    selector: '.spectrum-ActionGroup-item:not(:last-child)',
                },
                {
                    replacement: '::slotted(:not(:first-child))',
                    selector:
                        '.spectrum-ActionGroup-item+.spectrum-ActionGroup-item',
                },
                {
                    replacement: '::slotted([selected])',
                    selector: '.spectrum-ActionGroup-item.is-selected',
                },
                {
                    replacement: '::slotted(:hover)',
                    selector: '.spectrum-ActionGroup-item:hover',
                },
                {
                    replacement: '::slotted(:focus-visible)',
                    selector: '.spectrum-ActionGroup-item.focus-ring',
                },
            ],
            exclude: [/\.spectrum-ActionButton-label/],
        },
    ],
};

export default config;
