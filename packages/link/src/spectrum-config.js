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
    spectrum: 'link',
    components: [
        {
            name: 'link',
            host: {
                selector: '.spectrum-Link',
                shadowSelector: 'a',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-Link--quiet',
                },
                {
                    type: 'boolean',
                    name: 'over-background',
                    selector: '.spectrum-Link--overBackground',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-Link--secondary',
                    ],
                },
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-Link--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Link--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Link--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-Link--sizeXL',
                        },
                    ],
                },
            ],
            exclude: [/\.is-disabled/, /\.spectrum-Link--subtle/],
        },
    ],
};

export default config;
