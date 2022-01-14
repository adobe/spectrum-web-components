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
    spectrum: 'fieldlabel',
    components: [
        {
            name: 'field-label',
            host: {
                selector: '.spectrum-FieldLabel',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'enum',
                    name: 'side-aligned',
                    values: [
                        {
                            name: 'start',
                            selector: '.spectrum-FieldLabel--left',
                        },
                        {
                            name: 'end',
                            selector: '.spectrum-FieldLabel--right',
                        },
                    ],
                },
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-FieldLabel--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-FieldLabel--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-FieldLabel--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-FieldLabel--sizeXL',
                        },
                    ],
                },
            ],
            classes: [
                {
                    selector: '.spectrum-FieldLabel-requiredIcon',
                    name: 'required-icon',
                },
            ],
        },
    ],
};

export default config;
