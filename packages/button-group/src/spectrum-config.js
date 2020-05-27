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

module.exports = {
    spectrum: 'buttongroup',
    components: [
        {
            name: 'button-group',
            host: {
                selector: '.spectrum-ButtonGroup',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-ButtonGroup--vertical',
                    name: 'vertical',
                },
            ],
            slots: [
                {
                    contents: 'sp-action-button',
                    selector: '.spectrum-ActionButton',
                },
                {
                    contents: 'sp-button',
                    selector: '.spectrum-Button',
                },
                {
                    contents: 'sp-tool',
                    selector: '.spectrum-Tool',
                },
                {
                    contents: 'sp-rule[vertical]',
                    selector: '.spectrum-Rule--vertical',
                },
            ],
            complexSelectors: [
                {
                    replacement: '::slotted(sp-button:not(:first-of-type))',
                    selector: '.spectrum-Button+.spectrum-Button',
                },
                {
                    replacement: '::slotted(sp-tool:not(:first-of-type))',
                    selector: '.spectrum-Tool+.spectrum-Tool',
                },
                {
                    replacement:
                        '::slotted(sp-action-button:not(:first-of-type))',
                    selector: '.spectrum-ActionButton+.spectrum-ActionButton',
                },
            ],
            exclude: [/\.spectrum-ActionButton-label/],
        },
    ],
};
