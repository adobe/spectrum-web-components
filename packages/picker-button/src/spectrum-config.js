/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const config = {
    spectrum: 'pickerbutton',
    components: [
        {
            name: 'picker-button',
            host: {
                selector: '.spectrum-PickerButton',
                shadowSelector: '.root',
            },
            attributes: [
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-PickerButton--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-PickerButton--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-PickerButton--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-PickerButton--sizeXL',
                        },
                    ],
                },
                {
                    type: 'enum',
                    name: 'position',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 'right',
                            selector: '.spectrum-PickerButton--right',
                        },
                        {
                            name: 'left',
                            selector: '.spectrum-PickerButton--left',
                        },
                    ],
                },
                {
                    type: 'boolean',
                    name: 'quiet',
                    forceOntoHost: true,
                    selector: '.spectrum-PickerButton--low',
                },
                {
                    type: 'boolean',
                    name: 'active',
                    forceOntoHost: true,
                    selector: ':active',
                },
                {
                    type: 'boolean',
                    name: 'disabled',
                    forceOntoHost: true,
                    selector: ':disabled',
                },
                {
                    type: 'boolean',
                    name: 'open',
                    forceOntoHost: true,
                    selector: '.is-open',
                },
                {
                    type: 'boolean',
                    name: 'invalid',
                    forceOntoHost: true,
                    selector: '.is-invalid',
                },
                {
                    type: 'boolean',
                    name: 'rounded',
                    forceOntoHost: true,
                    selector: '.spectrum-PickerButton--rounded',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-PickerButton--uiicononly',
                    name: 'uiicononly',
                },
                {
                    selector: '.spectrum-PickerButton--textuiicon',
                    name: 'textuiicon',
                },
            ],
            complexSelectors: [
                {
                    selector:
                        '.spectrum-PickerButton.spectrum-PickerButton--textuiicon .spectrum-PickerButton-fill',
                    replacement:
                        ':host([size]) .root.textuiicon .spectrum-PickerButton-fill',
                },
                {
                    selector: '.spectrum-PickerButton--high',
                    replacement: '',
                },
            ],
        },
    ],
};

export default config;
