/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const customSelectorTransforms = [
    // Shift the rules from :host to #heading
    (selector) => (selector === ':host' ? '#button' : selector),
    // Modify focus rules to reflect that the button element in
    // the shadow DOM will receive the focus
    (selector) => selector.replace(/\.focus-ring/, ':focus'),
    (selector) =>
        selector.replace(/^:host\((::?[^\):]*focus[^\)]*)\)$/, '#button$1'),
    (selector) =>
        selector.replace(
            /^:host\(([^\)]+)(::?[^\):]*focus[^\)]*)\)$/,
            ':host($1) #button$2'
        ),
    // Make the attribute related rules apply to the button element
    (selector) => selector.replace(/^:host\(([^\)]+)\)$/, ':host($1) #button'),
];

module.exports = {
    spectrum: 'button',
    components: [
        {
            name: 'button',
            host: '.spectrum-Button',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-Button--quiet',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Button--warning',
                },
                {
                    type: 'boolean',
                    selector: ':disabled',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    selectors: [
                        '.spectrum-Button--cta',
                        '.spectrum-Button--primary',
                        '.spectrum-Button--secondary',
                        '.spectrum-Button--warning',
                        '.spectrum-Button--overBackground',
                        '.spectrum-Button--secondary',
                    ],
                },
            ],
            ids: ['.spectrum-Button-label'],
            selectorTransforms: customSelectorTransforms,
        },
        {
            name: 'action-button',
            host: '.spectrum-ActionButton',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-ActionButton--quiet',
                },
                {
                    type: 'boolean',
                    name: 'hold-affordance',
                    selector: '.spectrum-ActionButton-hold',
                },
                {
                    type: 'boolean',
                    selector: ':disabled',
                },
                {
                    type: 'boolean',
                    name: 'selected',
                    selector: '.is-selected',
                },
            ],
            ids: ['.spectrum-ActionButton-label'],
            selectorTransforms: customSelectorTransforms,
        },
    ],
};
