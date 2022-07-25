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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/link/sp-link.js';

export default {
    title: 'Accordion',
    component: 'sp-accordion',
    args: {
        open: false,
    },
    argTypes: {
        open: {
            name: 'open',
            type: { name: 'boolean', required: false },
            description: 'Whether the second accordion item is open.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

type Properties = {
    allowMultiple?: boolean;
    disabled?: boolean;
    open?: boolean;
};

const Template = (
    { allowMultiple, disabled, open }: Properties = {
        allowMultiple: false,
        disabled: false,
        open: false,
    }
): TemplateResult => {
    return html`
        <sp-accordion
            ?allow-multiple=${allowMultiple}
            style="color: var(--spectrum-global-color-gray-800)"
        >
            <sp-accordion-item label="Heading 1" ?disabled=${disabled}>
                <div>Item 1</div>
            </sp-accordion-item>
            <sp-accordion-item label="Heading 2" ?open=${open}>
                Item 2
            </sp-accordion-item>
            <sp-accordion-item label="Heading 3">
                <p>
                    This is content that has a
                    <sp-link
                        href="http://opensource.adobe.com/spectrum-web-components"
                        target="_blank"
                    >
                        link back to Spectrum Web Components
                    </sp-link>
                    so that it is easy to test that "Space" and "Enter"
                    interactions on focusable content does NOT toggle the
                    Accordion Item.
                </p>
            </sp-accordion-item>
        </sp-accordion>
    `;
};
export const Default = (args?: Properties): TemplateResult => Template(args);

export const Open = (args?: Properties): TemplateResult => Template(args);
Open.args = {
    open: true,
    allowMultiple: false,
    disabled: false,
};

export const AllowMultiple = (args?: Properties): TemplateResult =>
    Template(args);
AllowMultiple.args = {
    allowMultiple: true,
};

export const Disabled = (args?: Properties): TemplateResult => Template(args);
Disabled.args = {
    disabled: true,
};
