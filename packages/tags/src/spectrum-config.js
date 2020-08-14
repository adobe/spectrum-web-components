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
    spectrum: 'tags',
    components: [
        {
            name: 'tags',
            host: {
                selector: '.spectrum-Tags',
            },
            exclude: [/\.spectrum-Tags-item/],
        },
        {
            name: 'tag',
            host: {
                selector: '.spectrum-Tags-item',
            },
            attributes: [
                {
                    selector: '.is-disabled',
                    type: 'boolean',
                    name: 'disabled',
                },
                {
                    selector: '.is-invalid',
                    type: 'boolean',
                    name: 'invalid',
                },
                {
                    selector: '.spectrum-Tags-item--deletable',
                    type: 'boolean',
                    name: 'deletable',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-ClearButton',
                    name: 'clear-button',
                },
                {
                    selector: '.spectrum-Tags-itemLabel',
                    name: 'label',
                },
            ],
            slots: [
                {
                    selector: '.spectrum-Avatar',
                    name: 'avatar',
                },
                {
                    selector: '.spectrum-Icon',
                    name: 'icon',
                },
            ],
            exclude: [
                /\.spectrum-Tags /,
                /\.spectrum-ClearButton \.spectrum-Icon/,
            ],
        },
    ],
};

export default config;
