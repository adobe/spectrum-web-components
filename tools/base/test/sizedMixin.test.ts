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

import {
    ElementSize,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '../src/index.js';
import { html } from '@open-wc/testing';
import { elementUpdated, expect, fixture } from '@open-wc/testing';

export class FancySizedComponent extends SizedMixin(SpectrumElement, {
    defaultSize: 'm',
    validSizes: ['xs', 's', 'm', 'l', 'xl'],
}) {
    public override render(): TemplateResult {
        return html`
            I an wearing size ${this.size}
        `;
    }
}

customElements.define('fancy-sized-component', FancySizedComponent);

describe('sizedMixin', () => {
    it('allows any given size in the validSizes array', async () => {
        const validSizesChecks = (
            ['xs', 's', 'm', 'l', 'xl'] as ElementSize[]
        ).map(async (size) => {
            const el = await fixture<FancySizedComponent>(html`
                <fancy-sized-component></fancy-sized-component>
            `);
            await elementUpdated(el);

            el.size = size;
            await elementUpdated(el);
            expect(el.shadowRoot?.textContent).to.include(
                `I an wearing size ${size}`
            );
        });

        await Promise.all(validSizesChecks);
    });

    it('fallbacks to default size if the provided size is invalid', async () => {
        const el = await fixture<FancySizedComponent>(html`
            <fancy-sized-component size="xxl"></fancy-sized-component>
        `);
        await elementUpdated(el);

        // Fallback is 'm', as defined by `defaultSize`.
        expect(el.shadowRoot?.textContent).to.include('I an wearing size m');
    });

    it('fallbacks to default size if no size is provided', async () => {
        const el = await fixture<FancySizedComponent>(html`
            <fancy-sized-component></fancy-sized-component>
        `);
        await elementUpdated(el);

        // Default is 'm', as defined by `defaultSize`.
        expect(el.shadowRoot?.textContent).to.include('I an wearing size m');
    });

    it('applies the given size if it is a valid one', async () => {
        const el = await fixture<FancySizedComponent>(html`
            <fancy-sized-component size="l"></fancy-sized-component>
        `);
        await elementUpdated(el);

        expect(el.shadowRoot?.textContent).to.include('I an wearing size l');
    });
});
