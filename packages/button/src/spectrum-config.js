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
                        '.spectrum-Button--cta',
                        '.spectrum-Button--primary',
                        '.spectrum-Button--secondary',
                        '.spectrum-Button--negative',
                        '.spectrum-Button--overBackground',
                        '.spectrum-Button--secondary',
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
        {
            name: 'clear-button',
            host: {
                selector: '.spectrum-ClearButton',
            },
            attributes: [
                {
                    selector: '.spectrum-ClearButton--small',
                    type: 'boolean',
                    name: 'small',
                },
                {
                    type: 'boolean',
                    selector: ':active',
                    name: 'active',
                },
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-ClearButton--cta',
                        '.spectrum-ClearButton--primary',
                        '.spectrum-ClearButton--secondary',
                        {
                            name: 'negative',
                            selector: '.spectrum-ClearButton--warning',
                        },
                        '.spectrum-ClearButton--overBackground',
                        '.spectrum-ClearButton--secondary',
                    ],
                },
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-ClearButton--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-ClearButton--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-ClearButton--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-ClearButton--sizeXL',
                        },
                    ],
                },
            ],
            classes: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
                {
                    name: 'fill',
                    selector: '.spectrum-ClearButton-fill',
                },
            ],
            exclude: [/\.spectrum-Button/],
            excludeSourceSelector: [
                /^(\.spectrum-Button.*),(\.spectrum-ClearButton.*),(\.spectrum-LogicButton.*)$/,
            ],
        },
    ],
};

export default config;
