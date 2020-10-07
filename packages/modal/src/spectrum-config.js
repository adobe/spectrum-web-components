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
    spectrum: 'modal',
    components: [
        {
            name: 'modal-wrapper',
            host: {
                selector: '.spectrum-Modal-wrapper',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-open',
                    name: 'open',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Modal--responsive',
                    name: 'responsive',
                },
            ],
        },
        {
            name: 'modal',
            host: {
                selector: '.spectrum-Modal',
                shadowSelector: '.modal',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-open',
                    name: 'open',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Modal--responsive',
                    name: 'responsive',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-Modal',
                    name: 'dialog',
                },
                {
                    name: 'fullscreen',
                    selector: '.spectrum-Modal--fullscreen',
                },
                {
                    name: 'fullscreenTakeover',
                    selector: '.spectrum-Modal--fullscreenTakeover',
                },
            ],
            exclude: [/\.spectrum-Modal-wrapper/],
        },
    ],
};

export default config;
