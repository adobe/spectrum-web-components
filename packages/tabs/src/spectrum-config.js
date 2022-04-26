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
            host: {
                selector: '.spectrum-Tabs',
                shadowSelector: '#list',
            },
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
                    name: 'direction^',
                    values: [
                        '.spectrum-Tabs--vertical',
                        '.spectrum-Tabs--horizontal',
                    ],
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Tabs--emphasized',
                },
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-Tabs--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Tabs--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Tabs--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-Tabs--sizeXL',
                        },
                    ],
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Tabs-selectionIndicator',
                    name: 'selection-indicator',
                },
            ],
            slots: [
                {
                    selector: '.spectrum-Tabs-item',
                    contents: ':not([slot])',
                },
                {
                    selector: '.is-selected',
                    contents: '[selected]:not([slot])',
                },
            ],
            complexSelectors: [
                {
                    replacement: '::slotted(:not([slot]):not(:first-child))',
                    selector:
                        /\.spectrum-Tabs-item\s?\+\s?\*:not\(.spectrum-Tabs-selectionIndicator\)/,
                },
                {
                    replacement:
                        ':host([emphasized]) ::slotted([selected]:not([slot]))',
                    selector:
                        '.spectrum-Tabs--emphasized .spectrum-Tabs-item.is-selected',
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
                    name: 'item-label',
                },
            ],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
            ],
            exclude: [/.spectrum-Tabs(?!-item)/],
        },
    ],
};

export default config;
