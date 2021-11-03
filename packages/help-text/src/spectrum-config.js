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
    spectrum: 'helptext',
    components: [
        {
            name: 'help-text',
            host: {
                selector: '.spectrum-HelpText',
            },
            attributes: [
                {
                    type: 'boolean',
                    name: 'disabled',
                    selector: '.is-disabled',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-HelpText--neutral',
                        '.spectrum-HelpText--negative',
                    ],
                },
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-HelpText--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-HelpText--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-HelpText--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-HelpText--sizeXL',
                        },
                    ],
                },
            ],
            classes: [
                {
                    selector: '.spectrum-HelpText-text',
                    name: 'text',
                },
                {
                    selector: '.spectrum-HelpText-validationIcon',
                    name: 'icon',
                },
            ],
        },
    ],
};

export default config;
