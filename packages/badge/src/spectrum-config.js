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
    spectrum: 'badge',
    components: [
        {
            name: 'badge',
            host: {
                selector: '.spectrum-Badge',
            },
            attributes: [
                {
                    type: 'enum',
                    name: 'size',
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-Badge--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Badge--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Badge--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-Badge--sizeXL',
                        },
                    ],
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        // semantic
                        '.spectrum-Badge--positive',
                        '.spectrum-Badge--informative',
                        '.spectrum-Badge--negative',
                        '.spectrum-Badge--neutral',
                        // non-semantic
                        '.spectrum-Badge--seafoam',
                        '.spectrum-Badge--indigo',
                        '.spectrum-Badge--purple',
                        '.spectrum-Badge--fuchsia',
                        '.spectrum-Badge--magenta',
                        '.spectrum-Badge--yellow',
                    ],
                },
            ],
            /* disable :hover until Spectrum CSS disables hover upstream */
            exclude: [/\:hover/],
        },
    ],
};

export default config;
