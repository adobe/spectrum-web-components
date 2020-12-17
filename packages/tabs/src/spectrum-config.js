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
    spectrum: 'tabs',
    components: [
        {
            name: 'tabs',
            host: '.spectrum-Tabs',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-Tabs--compact',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Tabs--quiet',
                },
                {
                    type: 'enum',
                    name: 'direction',
                    values: [
                        '.spectrum-Tabs--vertical',
                        '.spectrum-Tabs--horizontal',
                    ],
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Tabs-selectionIndicator',
                    name: 'selectionIndicator',
                },
            ],
            slots: [
                {
                    selector: '.spectrum-Tabs-item',
                },
            ],
            complexSelectors: [
                {
                    replacement: '::slotted(:not(:first-child))',
                    selector:
                        '.spectrum-Tabs-item+:not(.spectrum-Tabs-selectionIndicator)',
                },
            ],
            exclude: [
                /^\.spectrum-Tabs-item/,
                /\.spectrum-Tabs-item \.spectrum/,
            ],
        },
        {
            name: 'tab',
            host: {
                // A lot of the styling in tab-item relies on the ::before psuedo element,
                // which is incompatible with :host
                selector: '.spectrum-Tabs-item',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-selected',
                    name: 'selected',
                },
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Tabs-itemLabel',
                    name: 'itemLabel',
                },
            ],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
            ],
            exclude: [/.spectrum-Tabs(?!-item)/],
            complexSelectors: [
                {
                    replacement:
                        ":host(:not([vertical])) ::slotted([slot='icon'])",
                    selector: '.spectrum-Tabs-item .spectrum-Icon',
                },
            ],
        },
    ],
};

export default config;
