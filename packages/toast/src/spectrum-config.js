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
    spectrum: 'toast',
    components: [
        {
            name: 'toast',
            host: {
                selector: '.spectrum-Toast',
            },
            attributes: [
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-Toast--negative',
                        '.spectrum-Toast--positive',
                        '.spectrum-Toast--info',
                        '.spectrum-Toast--error',
                        '.spectrum-Toast--warning',
                        '.spectrum-Toast--success',
                    ],
                },
            ],
            classes: [
                {
                    selector: '.spectrum-Toast-body',
                    name: 'body',
                },
                {
                    selector: '.spectrum-Toast-buttons',
                    name: 'buttons',
                },
                {
                    selector: '.spectrum-Toast-content',
                    name: 'content',
                },
                {
                    selector: '.spectrum-Toast-typeIcon',
                    name: 'type',
                },
                {
                    selector: '.spectrum-Toast-closeButton',
                    name: 'closeButton',
                },
            ],
            slots: [
                {
                    selector: '.spectrum-Button',
                    name: 'action',
                },
            ],
        },
    ],
};

export default config;
