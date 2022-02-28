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
    spectrum: 'closebutton',
    components: [
        {
            name: 'close-button',
            host: {
                selector: '.spectrum-CloseButton',
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
                    name: 'focused',
                    selector: '.is-keyboardFocused',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        {
                            name: 'white',
                            selector: '.spectrum-CloseButton--staticWhite',
                        },
                        {
                            name: 'black',
                            selector: '.spectrum-CloseButton--staticBlack',
                        },
                    ],
                },
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-CloseButton--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-CloseButton--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-CloseButton--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-CloseButton--sizeXL',
                        },
                    ],
                },
            ],
            classes: [
                {
                    name: 'icon',
                    selector: '.spectrum-CloseButton-UIIcon',
                },
            ],
        },
    ],
};

export default config;
