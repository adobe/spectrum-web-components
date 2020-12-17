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
    spectrum: 'statuslight',
    components: [
        {
            name: 'status-light',
            host: '.spectrum-StatusLight',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-StatusLight--negative',
                        '.spectrum-StatusLight--notice',
                        '.spectrum-StatusLight--positive',
                        '.spectrum-StatusLight--info',
                        '.spectrum-StatusLight--neutral',
                        '.spectrum-StatusLight--yellow',
                        '.spectrum-StatusLight--fuchsia',
                        '.spectrum-StatusLight--indigo',
                        '.spectrum-StatusLight--seafoam',
                        '.spectrum-StatusLight--chartreuse',
                        '.spectrum-StatusLight--magenta',
                        '.spectrum-StatusLight--purple',
                        '.spectrum-StatusLight--celery',
                    ],
                },
                {
                    type: 'enum',
                    name: 'size',
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-StatusLight--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-StatusLight--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-StatusLight--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-StatusLight--sizeXL',
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
