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

const config = {
    spectrum: 'popover',
    components: [
        {
            name: 'popover',
            host: '.spectrum-Popover',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-open',
                    name: 'open',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Popover--withTip',
                    name: 'tip',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Popover--dialog',
                    name: 'dialog',
                },
                {
                    type: 'enum',
                    name: 'placement',
                    values: [
                        '.spectrum-Popover--top',
                        '.spectrum-Popover--bottom',
                        '.spectrum-Popover--left',
                        '.spectrum-Popover--right',
                    ],
                    wildcard: true,
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Popover-tip',
                    name: 'tip',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-Popover-tip-triangle',
                    name: 'triangle',
                },
            ],
        },
    ],
};

export default config;
