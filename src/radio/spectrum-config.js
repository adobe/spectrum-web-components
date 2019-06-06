/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

module.exports = {
    spectrum: 'radio',
    components: [
        {
            name: 'radio',
            host: {
                selector: '.spectrum-Radio',
                shadowSelector: '#root',
            },
            focus: '#input',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-Radio--quiet',
                },
                {
                    type: 'boolean',
                    selector: ':disabled',
                },
                {
                    type: 'boolean',
                    selector: ':checked',
                },
                {
                    type: 'boolean',
                    name: 'invalid',
                    selector: '.is-invalid',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Radio-input',
                    name: 'input',
                },
                {
                    selector: '.spectrum-Radio-button',
                    name: 'button',
                },
                {
                    selector: '.spectrum-Radio-label',
                    name: 'label',
                },
            ],
        },
    ],
};
