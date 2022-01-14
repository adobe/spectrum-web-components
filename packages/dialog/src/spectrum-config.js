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
    spectrum: 'dialog',
    components: [
        {
            name: 'dialog',
            host: {
                selector: '.spectrum-Dialog',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-open',
                    name: 'open',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Dialog--error',
                    name: 'error',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Dialog--dismissable',
                    name: 'dismissable',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Dialog--noDivider',
                    name: 'no-divider',
                },
                {
                    type: 'enum',
                    name: 'size',
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-Dialog--small',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Dialog--medium',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Dialog--large',
                        },
                    ],
                },
                {
                    type: 'enum',
                    name: 'mode',
                    values: [
                        '.spectrum-Dialog--fullscreen',
                        '.spectrum-Dialog--fullscreenTakeover',
                    ],
                },
            ],
            slots: [
                {
                    selector: '.spectrum-Dialog-heading',
                    name: 'heading',
                },
                {
                    selector: '.spectrum-Dialog-hero',
                    name: 'hero',
                },
                {
                    selector: '*',
                    name: '',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-Dialog-grid',
                    name: 'grid',
                },
                {
                    selector: '.spectrum-Dialog-divider',
                    name: 'divider',
                },
                {
                    selector: '.spectrum-Dialog-content',
                    name: 'content',
                },
                {
                    selector: '.spectrum-Dialog-closeButton',
                    name: 'close-button',
                },
                {
                    selector: '.spectrum-Dialog-header',
                    name: 'header',
                },
                {
                    selector: '.spectrum-Dialog-footer',
                    name: 'footer',
                },
                {
                    selector: '.spectrum-Dialog-typeIcon',
                    name: 'type-icon',
                },
                {
                    selector: '.spectrum-Button',
                    name: 'button',
                },
                {
                    selector: '.spectrum-Dialog-buttonGroup',
                    name: 'button-group',
                },
                {
                    selector: '.spectrum-Dialog-buttonGroup--noFooter',
                    name: 'button-group--noFooter',
                },
            ],
            complexSelectors: [
                {
                    replacement: '.no-header::slotted([slot="heading"])',
                    selector:
                        '.spectrum-Dialog-heading.spectrum-Dialog-heading--noHeader',
                },
            ],
            exclude: [/\.spectrum-Dialog-wrapper/],
        },
    ],
};

export default config;
