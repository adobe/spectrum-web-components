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
import { AccordionMarkup } from './/index.js';
import { argTypes } from './args.js';

import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/link/sp-link.js';

export default {
    title: 'Accordion',
    component: 'sp-accordion',
    args: {
        open: false,
        size: 'm',
        density: undefined,
    },
    argTypes,
};

type Properties = {
    allowMultiple?: boolean;
    disabled?: boolean;
    open?: boolean;
    density?: 'compact' | 'spacious' | undefined;
    size?: 's' | 'm' | 'l' | 'xl';
    level?: number;
};

export const Default = (args?: Properties): TemplateResult =>
    AccordionMarkup(args);

export const Open = (args?: Properties): TemplateResult =>
    AccordionMarkup(args);
Open.args = {
    open: true,
    allowMultiple: false,
    disabled: false,
};

export const AllowMultiple = (args?: Properties): TemplateResult =>
    AccordionMarkup(args);
AllowMultiple.args = {
    allowMultiple: true,
};

export const Disabled = (args?: Properties): TemplateResult =>
    AccordionMarkup(args);
Disabled.args = {
    disabled: true,
};

export const HeadingLevels = (): TemplateResult => html`
    <style>
        .heading-levels-example {
            max-width: 800px;
        }
        .heading-levels-example h1 {
            font-size: 28px;
            margin: 0 0 24px 0;
        }
        .heading-levels-example h2 {
            font-size: 20px;
            margin: 32px 0 16px 0;
        }
        .heading-levels-example sp-accordion {
            margin-bottom: 16px;
        }
    </style>
    <div class="heading-levels-example">
        <h1>Main Page Title</h1>

        <sp-accordion level="2">
            <sp-accordion-item label="First Section">
                <div>
                    Content for the first main section. All items in this
                    accordion use level 2 headings because they are of equal
                    importance.
                </div>
            </sp-accordion-item>
            <sp-accordion-item label="Second Section">
                <div>Content for the second main section.</div>
            </sp-accordion-item>
            <sp-accordion-item label="Third Section">
                <div>Content for the third main section.</div>
            </sp-accordion-item>
        </sp-accordion>

        <h2>Subsection Title</h2>

        <sp-accordion level="3">
            <sp-accordion-item label="Subsection A">
                <div>
                    Content for subsection A. All items in this accordion use
                    level 3 headings because they are nested under a level 2
                    heading.
                </div>
            </sp-accordion-item>
            <sp-accordion-item label="Subsection B">
                <div>Content for subsection B.</div>
            </sp-accordion-item>
            <sp-accordion-item label="Subsection C">
                <div>Content for subsection C.</div>
            </sp-accordion-item>
        </sp-accordion>
    </div>
`;
