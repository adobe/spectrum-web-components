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

import { TemplateResult } from 'lit-html';
import { html, select } from '@open-wc/demoing-storybook';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import '../sp-accordion.js';
import '../sp-accordion-item.js';

export default {
    title: 'Accordion',
    component: 'sp-accordion',
};

export const Default = (): TemplateResult => {
    const dir = select(
        'Text direction',
        {
            None: 'none',
            'Left to right': 'ltr',
            'Right to left': 'rtl',
        },
        'ltr',
        'Element'
    );
    return html`
        <sp-accordion
            dir=${ifDefined(dir === 'none' ? undefined : dir)}
            style="color: var(--spectrum-global-color-gray-800)"
        >
            <sp-accordion-item
                label="Heading 1"
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                <div>Item 1</div>
            </sp-accordion-item>
            <sp-accordion-item
                label="Heading 2"
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                Item 2
            </sp-accordion-item>
            <sp-accordion-item
                label="Heading 3"
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                Item 3
            </sp-accordion-item>
        </sp-accordion>
    `;
};

export const AllowMultiple = (): TemplateResult => {
    const dir = select(
        'Text direction',
        {
            None: 'none',
            'Left to right': 'ltr',
            'Right to left': 'rtl',
        },
        'ltr',
        'Element'
    );
    return html`
        <sp-accordion
            allow-multiple
            style="color: var(--spectrum-global-color-gray-800)"
            dir=${ifDefined(dir === 'none' ? undefined : dir)}
        >
            <sp-accordion-item
                label="Heading 1"
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                Item 1
            </sp-accordion-item>
            <sp-accordion-item
                label="Heading 2"
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                Item 2
            </sp-accordion-item>
            <sp-accordion-item
                label="Heading 3"
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                Item 3
            </sp-accordion-item>
        </sp-accordion>
    `;
};

export const Disabled = (): TemplateResult => {
    const dir = select(
        'Text direction',
        {
            None: 'none',
            'Left to right': 'ltr',
            'Right to left': 'rtl',
        },
        'ltr',
        'Element'
    );
    return html`
        <sp-accordion
            dir=${ifDefined(dir === 'none' ? undefined : dir)}
            style="color: var(--spectrum-global-color-gray-800)"
        >
            <sp-accordion-item
                disabled
                label="Heading 1"
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                <div>Item 1</div>
            </sp-accordion-item>
            <sp-accordion-item
                label="Heading 2"
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                Item 2
            </sp-accordion-item>
            <sp-accordion-item
                label="Heading 3"
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                Item 3
            </sp-accordion-item>
        </sp-accordion>
    `;
};
