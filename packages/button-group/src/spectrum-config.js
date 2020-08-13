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
                    contents: '',
                    selector: '.spectrum-ButtonGroup-item',
                },
            ],
            complexSelectors: [
                {
                    replacement: '::slotted(*:not(:first-of-type))',
                    selector:
                        '.spectrum-ButtonGroup-item+.spectrum-ButtonGroup-item',
                },
            ],
            exclude: [/\.spectrum-ActionButton-label/],
        },
    ],
};
