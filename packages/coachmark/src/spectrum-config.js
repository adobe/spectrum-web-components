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
    spectrum: 'coachmark',
    components: [
        {
            name: 'coachmark',
            host: {
                selector: '.spectrum-CoachMarkIndicator',
            },
            classes: [
                {
                    selector: '.spectrum-CoachMarkIndicator-ring',
                    name: 'ring',
                },
            ],
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-CoachMarkIndicator--quiet',
                    name: 'quiet',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-CoachMarkIndicator--dark',
                        '.spectrum-CoachMarkIndicator--light',
                    ],
                },
            ],
        },
    ],
};

export default config;
