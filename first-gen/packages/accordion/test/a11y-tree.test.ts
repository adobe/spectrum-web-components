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

import { html } from '@spectrum-web-components/base';
import { elementUpdated, expect, fixture } from '@open-wc/testing';

import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';
import '@spectrum-web-components/accordion/sp-accordion-item.js';

import { Default } from '../stories/accordion.stories.js';

describe('Accordion - a11y tree', () => {
    it('renders with items accessibly', async () => {
        const el = await fixture<Accordion>(Default());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});

describe('Accordion Item - a11y tree', () => {
    it('can exist with no parent accessibly', async () => {
        const el = await fixture<AccordionItem>(html`
            <sp-accordion-item label="item">
                <div>Item 1</div>
            </sp-accordion-item>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
