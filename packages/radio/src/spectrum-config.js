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
    spectrum: 'radio',
    components: [
        {
            name: 'radio',
            host: {
                selector: '.spectrum-Radio',
            },
            focus: '#input',
            attributes: [
                {
                    type: 'boolean',
                    name: 'label-below',
                    selector: '.spectrum-Radio--labelBelow',
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
                {
                    type: 'boolean',
                    name: 'emphasized',
                    selector: '.spectrum-Radio--emphasized',
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
            complexSelectors: [
                {
                    replacement: ':host(:focus-visible) .spectrum-Radio-input',
                    selector: /^.spectrum-Radio .spectrum-Radio-input.focus-ring/,
                },
                {
                    replacement: ':focus-visible .spectrum-Radio-input',
                    selector: /\s.spectrum-Radio-input.focus-ring/,
                },
                {
                    replacement: ':host(:focus-visible) .spectrum-Radio-input',
                    selector: /^.spectrum-Radio-input.focus-ring/,
                },
            ],
        },
    ],
};

export default config;
