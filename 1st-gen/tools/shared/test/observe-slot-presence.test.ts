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

import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';
import { LitElement, TemplateResult } from '@spectrum-web-components/base';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

class ObserverTest extends ObserveSlotPresence(
    LitElement,
    '[slot="test-slot"]'
) {
    protected override render(): TemplateResult {
        return html`
            Test Element
        `;
    }
}

customElements.define('observe-presence-test', ObserverTest);

describe('ObserveSlotPresence', () => {
    it('does no management when slot unavailable', async () => {
        const el = await fixture<ObserverTest>(html`
            <observe-presence-test></observe-presence-test>
        `);
        await elementUpdated(el);

        expect(el.slotContentIsPresent).to.be.false;

        el.innerHTML = '<div slot="test-slot"></div>';
        await elementUpdated(el);

        expect(el.slotContentIsPresent).to.be.true;
    });

    describe('nested mixin constructor timing', () => {
        it('should support calling managePresenceObservedSlot in constructor immediately after super()', async () => {
            // This test reproduces the scenario where managePresenceObservedSlot
            // is called immediately in a nested mixin's constructor.

            class NestedMixinTestElement extends ObserveSlotPresence(
                LitElement,
                '[slot="icon"]'
            ) {
                constructor() {
                    super();
                    this.managePresenceObservedSlot();
                }

                protected override render(): TemplateResult {
                    return html`
                        <div>
                            <slot name="icon"></slot>
                        </div>
                    `;
                }
            }

            customElements.define('nested-mixin-test', NestedMixinTestElement);

            // Should not throw during construction
            const el = await fixture<NestedMixinTestElement>(html`
                <nested-mixin-test>
                    <span slot="icon">🎯</span>
                </nested-mixin-test>
            `);
            await elementUpdated(el);

            // Verify the method works correctly
            expect(el.slotContentIsPresent).to.be.true;
        });

        it('should support double-nested mixin with immediate managePresenceObservedSlot call', async () => {
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

            class DoubleNestedElement extends ObserveSlotPresence(
                AdditionalMixin(LitElement),
                '[slot="content"]'
            ) {
                constructor() {
                    super();
                    // Call immediately in deeply nested mixin scenario
                    this.managePresenceObservedSlot();
                }

                protected override render(): TemplateResult {
                    return html`
                        <div>
                            <slot name="content"></slot>
                        </div>
                    `;
                }
            }

            customElements.define('double-nested-test', DoubleNestedElement);

            // Should not throw during construction
            const el = await fixture<DoubleNestedElement>(html`
                <double-nested-test>
                    <div slot="content">Test content</div>
                </double-nested-test>
            `);
            await elementUpdated(el);

            // Verify both the mixin functionality and our additional mixin work
            expect(el.slotContentIsPresent).to.be.true;
            expect(el.additionalProperty).to.equal('test');
        });

        it('should handle managePresenceObservedSlot call before element is connected', async () => {
            // Test that calling managePresenceObservedSlot works even when
            // the element isn't yet connected to the DOM

            class PreConnectTestElement extends ObserveSlotPresence(
                LitElement,
                '[slot="item"]'
            ) {
                public hasCalledInConstructor = false;

                constructor() {
                    super();
                    // Call before element is connected to DOM
                    this.managePresenceObservedSlot();
                    this.hasCalledInConstructor = true;
                }

                protected override render(): TemplateResult {
                    return html`
                        <div>
                            <slot name="item"></slot>
                        </div>
                    `;
                }
            }

            customElements.define('pre-connect-test', PreConnectTestElement);

            const el = document.createElement(
                'pre-connect-test'
            ) as PreConnectTestElement;
            el.innerHTML = '<span slot="item">Item</span>';

            // Element constructed but not yet connected
            expect(el.hasCalledInConstructor).to.be.true;

            // Now connect it
            document.body.appendChild(el);
            await elementUpdated(el);

            expect(el.slotContentIsPresent).to.be.true;
        });
    });
});
