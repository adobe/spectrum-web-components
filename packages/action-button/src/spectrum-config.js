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
    spectrum: 'actionbutton',
    components: [
        {
            name: 'action-button',
            host: {
                selector: '.spectrum-ActionButton',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-ActionButton--quiet',
                },
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'boolean',
                    selector: ':disabled',
                    name: 'disabled',
                },
                {
                    type: 'boolean',
                    name: 'selected',
                    selector: '.is-selected',
                },
                {
                    type: 'boolean',
                    selector: ':active',
                    name: 'active',
                },
                {
                    type: 'boolean',
                    selector: '.is-active',
                    name: 'active',
                },
                {
                    type: 'boolean',
                    name: 'emphasized',
                    selector: '.spectrum-ActionButton--emphasized',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        {
                            name: 'white',
                            selector: '.spectrum-ActionButton--staticWhite',
                        },
                        {
                            name: 'black',
                            selector: '.spectrum-ActionButton--staticBlack',
                        },
                    ],
                },
                {
                    type: 'enum',
                    name: 'size',
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-ActionButton--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-ActionButton--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-ActionButton--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-ActionButton--sizeXL',
                        },
                    ],
                },
            ],
            classes: [
                {
                    name: 'hold-affordance',
                    selector: '.spectrum-ActionButton-hold',
                },
                {
                    name: 'hold-affordance',
                    selector: '.spectrum-ActionButton-holdIcon',
                },
            ],
            ids: ['.spectrum-ActionButton-label'],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
            ],
            complexSelectors: [
                {
                    replacement:
                        ":host([dir]) slot[icon-only]::slotted([slot='icon']), :host([dir]) slot[icon-only] sp-icon",
                    selector:
                        '.spectrum-ActionButton .spectrum-Icon:only-child',
                },
                {
                    replacement:
                        ":host([dir=ltr]) slot:not([icon-only])::slotted([slot='icon']), :host([dir=ltr]) slot:not([icon-only]) sp-icon",
                    selector: /\:host\(\[dir=ltr\]\) \.spectrum-Icon$/,
                },
                {
                    replacement:
                        ":host([dir=rtl]) slot:not([icon-only])::slotted([slot='icon']), :host([dir=rtl]) slot:not([icon-only]) sp-icon",
                    selector: /\:host\(\[dir=rtl\]\) \.spectrum-Icon$/,
                },
                {
                    replacement:
                        ':host([size][variant="black"][disabled][selected])',
                    selector:
                        '.spectrum-ActionButton.spectrum-ActionButton--staticBlack:disabled.is-selected',
                },
                {
                    replacement:
                        ':host([size][variant="black"][disabled][selected])',
                    selector:
                        '.spectrum-ActionButton.spectrum-ActionButton--staticBlack.is-selected:disabled',
                },
                {
                    replacement:
                        ':host([size][variant="white"][disabled][selected])',
                    selector:
                        '.spectrum-ActionButton.spectrum-ActionButton--staticWhite:disabled.is-selected',
                },
                {
                    replacement:
                        ':host([size][variant="white"][disabled][selected])',
                    selector:
                        '.spectrum-ActionButton.spectrum-ActionButton--staticWhite.is-selected:disabled',
                },

                {
                    replacement:
                        ':host([size][variant="black"][selected]:not([disabled]))',
                    selector:
                        '.spectrum-ActionButton.spectrum-ActionButton--staticBlack.is-selected:not(:disabled, .is-disabled)',
                },
                {
                    replacement:
                        ':host([size][variant="white"][selected]:not([disabled]))',
                    selector:
                        '.spectrum-ActionButton.spectrum-ActionButton--staticWhite.is-selected:not(:disabled, .is-disabled)',
                },
            ],
        },
    ],
};

export default config;
