/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/link/sp-link.js';

export type Properties = {
    content?: {
        label: string;
        content: TemplateResult;
        disabled?: boolean;
        open?: boolean;
    }[];
    allowMultiple?: boolean;
    disabled?: boolean;
    open?: boolean;
    density?: 'compact' | 'spacious';
    size?: 's' | 'm' | 'l' | 'xl';
    isHovered?: boolean;
};

export const AccordionMarkup = ({
    content = [{
        label: 'Heading 1',
        content: html`<p>Item 1</p>`,
    }, {
        label: 'Heading 2',
        content: html`<p>This is content that has a <sp-link
            href="http://opensource.adobe.com/spectrum-web-components"
            target="_blank"
        >link back to Spectrum Web Components</sp-link> so that it is easy to test that "Space" and "Enter" interactions on focusable content does NOT toggle the Accordion Item.</p>`,
    }, {
        label: 'Heading 3',
        content: html`<p>Item 3</p>`,
    }],
    allowMultiple = false,
    disabled = false,
    open = false,
    size = 'm',
    density,
	// isHovered = false,
	// isActive = false,
	// isFocused = false,
}: Properties = {}): TemplateResult => {
    return html`
        <sp-accordion
            ?allow-multiple=${allowMultiple}
            density=${ifDefined(density)}
            size=${size}
        >
            ${content.map((item, idx) => html`
                <sp-accordion-item label=${item.label} ?disabled=${idx === 2 && disabled} ?open=${idx === 1 && open}>
                    ${item.content}
                </sp-accordion-item>
            `)}
        </sp-accordion>
    `;
};
