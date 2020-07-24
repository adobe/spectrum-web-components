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
    spectrum: 'splitbutton',
    components: [
        {
            name: 'split-button',
            host: {
                selector: '.spectrum-SplitButton',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-SplitButton--left',
                    name: 'left',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Button--cta',
                    name: 'variant="cta"',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-SplitButton-action',
                    name: 'button',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-SplitButton-trigger',
                    name: 'trigger',
                },
                {
                    selector: '.spectrum-Button-label',
                    name: 'label',
                },
                {
                    selector: '.spectrum-SplitButton-icon',
                    name: 'icon',
                },
            ],
        },
    ],
};
