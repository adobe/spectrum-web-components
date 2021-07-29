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
    spectrum: 'card',
    components: [
        {
            name: 'card',
            host: '.spectrum-Card',
            classes: [
                {
                    selector: '.spectrum-Card-body',
                    name: 'body',
                },
                {
                    selector: '.spectrum-Card-header',
                    name: 'header',
                },
                {
                    selector: '.spectrum-Card-title',
                    name: 'title',
                },
                {
                    selector: '.spectrum-Card-subtitle',
                    name: 'subtitle',
                },
                {
                    selector: '.spectrum-Card-content',
                    name: 'content',
                },
                {
                    selector: '.spectrum-Card-quickActions',
                    name: 'quickActions',
                },
                {
                    selector: '.spectrum-Card-actions',
                    name: 'actions',
                },
                {
                    selector: '.spectrum-Card-actionButton',
                    name: 'actionButton',
                },
                {
                    selector: '.spectrum-Checkbox',
                    name: 'checkbox',
                },
            ],
            attributes: [
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-Card--quiet',
                        '.spectrum-Card--gallery',
                    ],
                },
                {
                    type: 'boolean',
                    name: 'focused',
                    selector: '.is-focused',
                },
                {
                    type: 'boolean',
                    name: 'selected',
                    selector: '.is-selected',
                },
                {
                    type: 'boolean',
                    name: 'drop-target',
                    selector: '.is-drop-target',
                },
                {
                    type: 'boolean',
                    name: 'small',
                    selector: '.spectrum-Card--small',
                },
                {
                    type: 'boolean',
                    name: 'horizontal',
                    selector: '.spectrum-Card--horizontal',
                },
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-Card--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Card--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Card--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-Card--sizeXL',
                        },
                    ],
                },
            ],
            ids: [
                {
                    name: 'cover-photo',
                    selector: '.spectrum-Card-coverPhoto',
                },
                {
                    selector: '.spectrum-Card-preview',
                    name: 'preview',
                },
            ],
            slots: [
                {
                    name: 'footer',
                    selector: '.spectrum-Card-footer',
                },
                {
                    name: 'description',
                    selector: '.spectrum-Card-description',
                },
            ],
        },
    ],
};

export default config;
