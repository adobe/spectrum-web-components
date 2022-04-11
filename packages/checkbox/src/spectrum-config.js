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
    spectrum: 'checkbox',
    components: [
        {
            name: 'checkbox',
            host: {
                selector: '.spectrum-Checkbox',
            },
            focus: '#input',
            attributes: [
                {
                    type: 'boolean',
                    name: 'indeterminate',
                    selector: '.is-indeterminate',
                },
                {
                    type: 'boolean',
                    name: 'invalid',
                    selector: '.is-invalid',
                },
                {
                    type: 'boolean',
                    name: 'emphasized',
                    selector: '.spectrum-Checkbox--emphasized',
                },
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-Checkbox--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Checkbox--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Checkbox--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-Checkbox--sizeXL',
                        },
                    ],
                },
                {
                    type: 'boolean',
                    name: 'readonly',
                    selector: '.is-readOnly',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Checkbox-input',
                    name: 'input',
                },
                {
                    selector: '.spectrum-Checkbox-box',
                    name: 'box',
                },
                {
                    selector: '.spectrum-Checkbox-checkmark',
                    name: 'checkmark',
                },
                {
                    selector: '.spectrum-Checkbox-partialCheckmark',
                    name: 'partialCheckmark',
                },
                {
                    selector: '.spectrum-Checkbox-label',
                    name: 'label',
                },
            ],
            complexSelectors: [
                {
                    replacement:
                        ':host([dir]) #input:checked:disabled + #box:before',
                    selector:
                        /\.spectrum-Checkbox \.spectrum-Checkbox-input:checked:disabled\s?\+\s?\.spectrum-Checkbox-box::?before/,
                },
                {
                    replacement: '#input:disabled + #box:before',
                    selector:
                        /\.spectrum-Checkbox \.spectrum-Checkbox-input:disabled\s?\+\s?\.spectrum-Checkbox-box::?before/,
                },
                {
                    replacement: ':host([invalid][dir]) #box:before',
                    selector:
                        /\.spectrum-Checkbox\.is-invalid \.spectrum-Checkbox-box::?before/,
                },
                {
                    replacement:
                        ':host([invalid][dir]) #input:checked + #box:before',
                    selector:
                        /\.spectrum-Checkbox\.is-invalid \.spectrum-Checkbox-input:checked\s?\+\s?\.spectrum-Checkbox-box::?before/,
                    //.spectrum-Checkbox.is-invalid .spectrum-Checkbox-input:checked + .spectrum-Checkbox-box::?before
                },
                {
                    replacement: ':host([invalid][dir]) #box:before',
                    selector:
                        '.spectrum-Checkbox.is-invalid .spectrum-Checkbox-box::?before',
                },
                {
                    replacement:
                        ':host([invalid][dir]) #input:checked + #box:before',
                    selector:
                        /\.spectrum-Checkbox\.is-invalid \.spectrum-Checkbox-input:checked\s?\+\s?\.spectrum-Checkbox-box::?before/,
                },
                {
                    replacement: ':host([invalid][dir]:hover) #box:before',
                    selector:
                        '.spectrum-Checkbox.is-invalid:hover .spectrum-Checkbox-box::?before',
                },
                {
                    replacement:
                        ':host([invalid][dir]:hover) #input:checked + #box:before',
                    selector:
                        /\.spectrum-Checkbox\.is-invalid:hover \.spectrum-Checkbox-input:checked\s?\+\s?\.spectrum-Checkbox-box::?before/,
                },
            ],
        },
    ],
};

export default config;
