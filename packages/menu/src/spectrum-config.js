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
    spectrum: 'menu',
    components: [
        {
            name: 'menu-sectionHeading',
            host: {
                selector: '.spectrum-Menu-sectionHeading',
                shadowSelector: '.header',
            },
            exclude: [/\.spectrum-Menu(?!-sectionHeading)/],
        },
        {
            name: 'menu',
            host: {
                selector: '.spectrum-Menu',
            },
            attributes: [
                {
                    selector: '.is-selectable',
                    type: 'boolean',
                    name: 'selects',
                },
            ],
            slots: [
                {
                    selector: '.spectrum-Menu-item',
                    contents: 'sp-menu-item',
                },
            ],
            exclude: [
                /^\.spectrum-Menu-item/,
                /\.spectrum-Menu-item\s/,
                /\]\s\.spectrum-Menu-item/,
                /\.spectrum-Menu-divider/,
                /\.spectrum-Menu-sectionHeading/,
                /\.spectrum-Menu-checkmark/,
                /\.spectrum-Menu-chevron/,
            ],
            complexSelectors: [
                {
                    replacement: '::slotted(sp-menu)',
                    selector: '.spectrum-Menu .spectrum-Menu',
                },
                {
                    replacement:
                        ':host([dir="ltr"][selects]) ::slotted(sp-menu-item[selected])',
                    selector:
                        '.spectrum-Menu[dir=ltr].is-selectable .spectrum-Menu-item.is-selected',
                },
                {
                    replacement:
                        ':host([dir="rtl"][selects]) ::slotted(sp-menu-item[selected])',
                    selector:
                        '.spectrum-Menu[dir=rtl].is-selectable .spectrum-Menu-item.is-selected',
                },
            ],
        },
        {
            name: 'menu-item',
            host: {
                selector: '.spectrum-Menu-item',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'boolean',
                    selector: '.is-focused',
                    name: 'focused',
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
            ],
            classes: [
                {
                    selector: '.spectrum-Menu-itemIcon',
                    name: 'icon',
                },
                {
                    selector: '.spectrum-Menu-chevron',
                    name: 'chevron',
                },
                {
                    selector: '.spectrum-Menu-checkmark',
                    name: 'checkmark',
                },
            ],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
            ],
            exclude: [/\.spectrum-Menu(?!-[item|itemLabel|checkmark|chevron])/],
            complexSelectors: [
                {
                    replacement: ':host([no-wrap]) #label',
                    selector: '.spectrum-Menu-itemLabel--wrapping',
                },
            ],
        },
        {
            name: 'itemLabel',
            host: {
                selector: '.spectrum-Menu-itemLabel',
                shadowSelector: '#label',
            },
            exclude: [/\.spectrum-Menu(?!-itemLabel)/, /^\[dir=/],
        },
        {
            name: 'chevron',
            host: {
                selector: '.spectrum-Menu-chevron',
                shadowSelector: '.chevron',
            },
            exclude: [/\.spectrum-Menu(?!-chevron)/, /^\[dir=/],
        },
        {
            name: 'checkmark',
            host: {
                selector: '.spectrum-Menu-checkmark',
                shadowSelector: '.checkmark',
            },
            exclude: [/\.spectrum-Menu(?!-checkmark)/, /^\[dir=/],
        },
        {
            name: 'menu-divider',
            host: {
                selector: '.spectrum-Menu-divider',
            },
            exclude: [/\.spectrum-Menu(?!-divider)/],
        },
    ],
};

export default config;
