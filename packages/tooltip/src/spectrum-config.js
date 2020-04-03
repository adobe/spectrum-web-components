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
    spectrum: 'tooltip',
    components: [
        {
            name: 'tooltip',
            host: {
                selector: '.spectrum-Tooltip',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-open',
                    name: 'open',
                },
                {
                    type: 'enum',
                    name: 'placement',
                    values: [
                        '.spectrum-Tooltip--top',
                        '.spectrum-Tooltip--bottom',
                        '.spectrum-Tooltip--left',
                        '.spectrum-Tooltip--right',
                    ],
                    wildcard: true,
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-Tooltip--info',
                        '.spectrum-Tooltip--positive',
                        '.spectrum-Tooltip--negative',
                    ],
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Tooltip-label',
                    name: 'label',
                },
                {
                    selector: '.spectrum-Tooltip-tip',
                    name: 'tip',
                },
            ],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Tooltip-typeIcon',
                },
            ],
        },
    ],
};
