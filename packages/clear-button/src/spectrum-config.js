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
    spectrum: 'clearbutton',
    components: [
        {
            name: 'clear-button',
            host: {
                selector: '.spectrum-ClearButton',
            },
            attributes: [
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
                    type: 'boolean',
                    selector: ':disabled',
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
