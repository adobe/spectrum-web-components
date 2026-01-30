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

import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import { LitElement, TemplateResult } from '@spectrum-web-components/base';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

class ObserverTest extends ObserveSlotText(LitElement) {
    protected override render(): TemplateResult {
        return html`
            <slot @slotchange=${this.manageTextObservedSlot}></slot>
        `;
    }
}

customElements.define('observe-slot-test', ObserverTest);

describe('ObserveSlotText', () => {
    it('does no management when slot unavailable', async () => {
        const el = await fixture<ObserverTest>(html`
            <observe-slot-test></observe-slot-test>
        `);
        await elementUpdated(el);

        expect(el.slotHasContent).to.be.false;

        el.textContent = `hi, i'm some text`;

        await elementUpdated(el);

        expect(el.slotHasContent).to.be.true;
    });

    describe('nested mixin constructor timing', () => {
        it('should support calling manageTextObservedSlot in constructor immediately after super()', async () => {
            // This test reproduces the scenario where manageTextObservedSlot
            // is called immediately in a nested mixin's constructor.

            class NestedMixinTestElement extends ObserveSlotText(LitElement) {
                constructor() {
                    super();
                    // Immediately call manageTextObservedSlot after super()
                    this.manageTextObservedSlot();
                }

                protected override render(): TemplateResult {
                    return html`
                        <div>
                            <slot
                                @slotchange=${this.manageTextObservedSlot}
                            ></slot>
                        </div>
                    `;
                }
            }

            customElements.define(
                'nested-mixin-text-test',
                NestedMixinTestElement
            );

            // Should not throw during construction
            const el = await fixture<NestedMixinTestElement>(html`
                <nested-mixin-text-test>
                    Some text content
                </nested-mixin-text-test>
            `);
            await elementUpdated(el);

            // Verify the method works correctly
            expect(el.slotHasContent).to.be.true;
        });

        it('should support double-nested mixin with immediate manageTextObservedSlot call', async () => {
            // Create an additional mixin layer to simulate complex inheritance
            type Constructor<T = object> = {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                new (...args: any[]): T;
                prototype: T;
            };
            function AdditionalMixin<T extends Constructor<LitElement>>(
                BaseClass: T
            ): T & Constructor<{ additionalProperty: string }> {
                return class extends BaseClass {
                    public additionalProperty = 'test';
                } as T & Constructor<{ additionalProperty: string }>;
            }

            class DoubleNestedElement extends ObserveSlotText(
                AdditionalMixin(LitElement),
                'label'
            ) {
                constructor() {
                    super();
                    // Call immediately in deeply nested mixin scenario
                    this.manageTextObservedSlot();
                }

                protected override render(): TemplateResult {
                    return html`
                        <div>
                            <slot
                                name="label"
                                @slotchange=${this.manageTextObservedSlot}
                            ></slot>
                        </div>
                    `;
                }
            }

            customElements.define(
                'double-nested-text-test',
                DoubleNestedElement
            );

            // Should not throw during construction
            const el = await fixture<DoubleNestedElement>(html`
                <double-nested-text-test>
                    <span slot="label">Label text</span>
                </double-nested-text-test>
            `);
            await elementUpdated(el);

            // Verify both the mixin functionality and our additional mixin work
            expect(el.slotHasContent).to.be.true;
            expect(el.additionalProperty).to.equal('test');
        });

        it('should handle manageTextObservedSlot call before element is connected', async () => {
            // Test that calling manageTextObservedSlot works even when
            // the element isn't yet connected to the DOM

            class PreConnectTestElement extends ObserveSlotText(LitElement) {
                public hasCalledInConstructor = false;

                constructor() {
                    super();
                    // Call before element is connected to DOM
                    this.manageTextObservedSlot();
                    this.hasCalledInConstructor = true;
                }

                protected override render(): TemplateResult {
                    return html`
                        <div>
                            <slot
                                @slotchange=${this.manageTextObservedSlot}
                            ></slot>
                        </div>
                    `;
                }
            }

            customElements.define(
                'pre-connect-text-test',
                PreConnectTestElement
            );

            const el = document.createElement(
                'pre-connect-text-test'
            ) as PreConnectTestElement;
            el.textContent = 'Text content';

            // Element constructed but not yet connected
            expect(el.hasCalledInConstructor).to.be.true;

            // Now connect it
            document.body.appendChild(el);
            await elementUpdated(el);

            expect(el.slotHasContent).to.be.true;
        });
    });
});
