/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

module.exports = {
    spectrum: 'card',
    components: [
        {
            name: 'card',
            host: '.spectrum-Card',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-selected',
                    name: 'selected',
                },
                {
                    type: 'boolean',
                    selector: '.is-drop-target',
                    name: 'drop-target',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-Card--quiet',
                        '.spectrum-Card--gallery',
                    ],
                },
            ],
            slots: [
                {
                    name: 'footer',
                    selector: '.spectrum-Card-footer',
                },
                {
                    name: 'description',
                    selector: '.spectrum-Card-description',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Card-header',
                    name: 'header',
                },
                {
                    selector: '.spectrum-Card-content',
                    name: 'content',
                },
                {
                    selector: '.spectrum-Card-body',
                    name: 'body',
                },
                {
                    selector: '.spectrum-Card-title',
                    name: 'title',
                },
                {
                    selector: '.spectrum-Card-subtitle',
                    name: 'subtitle',
                },
                {
                    selector: '.spectrum-Card-action-button',
                    name: 'action-button',
                },
                {
                    selector: '.spectrum-Card-quick-actions',
                    name: 'quick-actions',
                },
                {
                    selector: '.spectrum-Card-actions',
                    name: 'actions',
                },
                {
                    name: 'cover-photo',
                    selector: '.spectrum-Card-coverPhoto',
                },
                {
                    name: 'preview',
                    selector: '.spectrum-Card-preview',
                },
            ],
        },
    ],
};
