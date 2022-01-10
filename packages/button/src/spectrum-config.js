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
    spectrum: 'button',
    components: [
        {
            name: 'button-base',
            host: {
                selector: '.spectrum-Button',
            },
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
            ],
            exclude: [/\.spectrum-ClearButton/],
            excludeSourceSelector: [
                /^(?!(\.spectrum-Button.*),(\.spectrum-ClearButton.*),(\.spectrum-LogicButton.*))/,
            ],
        },
        {
            name: 'button',
            host: {
                selector: '.spectrum-Button',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-Button--quiet',
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
                    selector: '.is-focused',
                    name: 'focused',
                },
                {
                    type: 'boolean',
                    selector: ':active',
                    name: 'active',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-Button--accent',
                        '.spectrum-Button--primary',
                        '.spectrum-Button--secondary',
                        '.spectrum-Button--negative',
                        {
                            name: 'white',
                            selector: '.spectrum-Button--staticWhite',
                        },
                        {
                            name: 'black',
                            selector: '.spectrum-Button--staticBlack',
                        },
                    ],
                },
                {
                    type: 'enum',
                    name: 'treatment',
                    values: [
                        '.spectrum-Button--fill',
                        '.spectrum-Button--outline',
                    ],
                },
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-Button--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Button--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Button--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-Button--sizeXL',
                        },
                    ],
                },
            ],
            ids: ['.spectrum-Button-label'],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
            ],
            exclude: [/\.spectrum-ClearButton/],
            excludeSourceSelector: [
                /^(\.spectrum-Button.*),(\.spectrum-ClearButton.*),(\.spectrum-LogicButton.*)$/,
            ],
        },
    ],
};

export default config;
