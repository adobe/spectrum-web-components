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
const config = [
    {
        spectrum: 'swatchgroup',
        components: [
            {
                name: 'swatch-group',
                host: {
                    selector: '.spectrum-SwatchGroup',
                },
                attributes: [
                    {
                        type: 'enum',
                        name: 'density',
                        forceOntoHost: true,
                        values: [
                            {
                                name: 'compact',
                                selector: '.spectrum-SwatchGroup--compact',
                            },
                            {
                                name: 'spacious',
                                selector: '.spectrum-SwatchGroup--spacious',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        spectrum: 'swatch',
        components: [
            {
                name: 'swatch',
                host: {
                    selector: '.spectrum-Swatch',
                },
                attributes: [
                    {
                        type: 'enum',
                        name: 'border',
                        forceOntoHost: true,
                        values: [
                            {
                                name: 'light',
                                selector: '.spectrum-Swatch--lightBorder',
                            },
                            {
                                name: 'none',
                                selector: '.spectrum-Swatch--noBorder',
                            },
                        ],
                    },
                    {
                        type: 'enum',
                        name: 'rounding',
                        forceOntoHost: true,
                        values: [
                            {
                                name: 'none',
                                selector: '.spectrum-Swatch--roundingNone',
                            },
                            {
                                name: 'full',
                                selector: '.spectrum-Swatch--roundingFull',
                            },
                        ],
                    },
                    {
                        type: 'boolean',
                        name: 'selected',
                        selector: '.is-selected',
                    },
                    {
                        type: 'boolean',
                        name: 'mixed-value',
                        selector: '.is-mixedValue',
                    },
                    {
                        type: 'boolean',
                        name: 'nothing',
                        selector: '.is-nothing',
                    },
                    {
                        type: 'boolean',
                        name: 'disabled',
                        selector: '.is-disabled',
                    },
                    {
                        type: 'enum',
                        name: 'shape',
                        forceOntoHost: true,
                        values: [
                            {
                                name: 'rectangle',
                                selector: '.spectrum-Swatch--rectangle',
                            },
                        ],
                    },
                    {
                        type: 'enum',
                        name: 'size',
                        forceOntoHost: true,
                        values: [
                            {
                                name: 'xs',
                                selector: '.spectrum-Swatch--sizeXS',
                            },
                            {
                                name: 's',
                                selector: '.spectrum-Swatch--sizeS',
                            },
                            {
                                name: 'm',
                                selector: '.spectrum-Swatch--sizeM',
                            },
                            {
                                name: 'l',
                                selector: '.spectrum-Swatch--sizeL',
                            },
                        ],
                    },
                ],
                classes: [
                    {
                        name: 'fill',
                        selector: '.spectrum-Swatch-fill',
                    },
                    {
                        name: 'disabledIcon',
                        selector: '.spectrum-Swatch-disabledIcon',
                    },
                    {
                        name: 'mixedValueIcon',
                        selector: '.spectrum-Swatch-mixedValueIcon',
                    },
                ],
                slots: [
                    {
                        selector: '.spectrum-Swatch-image',
                        name: 'image',
                    },
                ],
            },
        ],
    },
];

export default config;
