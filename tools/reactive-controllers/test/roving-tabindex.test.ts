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

import { html, LitElement } from 'lit';
import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

describe('RovingTabindex', () => {
    it('constructs with defaults', async () => {
        class TestEl extends LitElement {}
        customElements.define('test-roving-tabindex-el', TestEl);
        const el = new TestEl();
        const controller = new RovingTabindexController(
            el as LitElement & { shadowRoot: ShadowRoot }
        );
        expect(controller.direction).to.equal('both');
        expect(controller.focusInIndex).to.equal(0);
        expect(controller.isFocusableElement(el)).to.be.true;
    });

    describe('direction awareness', () => {
        class RtlTestEl extends LitElement {
            rovingTabindexController =
                new RovingTabindexController<HTMLButtonElement>(this, {
                    elements: () => Array.from(this.querySelectorAll('button')),
                    direction: 'horizontal',
                });

            override render() {
                return html`
                    <slot></slot>
                `;
            }
        }
        customElements.define('rtl-test-roving-tabindex-el', RtlTestEl);

        class RtlGridTestEl extends LitElement {
            rovingTabindexController =
                new RovingTabindexController<HTMLButtonElement>(this, {
                    elements: () => Array.from(this.querySelectorAll('button')),
                    direction: 'grid',
                });

            override render() {
                return html`
                    <slot></slot>
                `;
            }
        }
        customElements.define(
            'rtl-grid-test-roving-tabindex-el',
            RtlGridTestEl
        );

        async function makeLinearFixture(
            dir?: 'ltr' | 'rtl'
        ): Promise<RtlTestEl> {
            const el = await fixture<RtlTestEl>(html`
                <rtl-test-roving-tabindex-el dir=${dir ?? 'ltr'}>
                    <button>One</button>
                    <button>Two</button>
                    <button>Three</button>
                </rtl-test-roving-tabindex-el>
            `);
            await elementUpdated(el);
            return el;
        }

        function pressKey(el: HTMLElement, key: string): void {
            el.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key,
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                })
            );
        }

        it('reads RTL from `host.dir`', async () => {
            const el = await makeLinearFixture('ltr');
            expect(el.rovingTabindexController.isRtl()).to.be.false;

            el.dir = 'rtl';
            expect(el.rovingTabindexController.isRtl()).to.be.true;
        });

        it('moves forward on ArrowRight and backward on ArrowLeft in LTR', async () => {
            const el = await makeLinearFixture('ltr');
            const controller = el.rovingTabindexController;

            pressKey(el, 'ArrowRight');
            expect(controller.currentIndex).to.equal(1);

            pressKey(el, 'ArrowLeft');
            expect(controller.currentIndex).to.equal(0);
        });

        it('reverses ArrowRight/ArrowLeft in RTL', async () => {
            const el = await makeLinearFixture('rtl');
            const controller = el.rovingTabindexController;

            // From index 0, a "backward" step wraps to the last element.
            pressKey(el, 'ArrowRight');
            expect(controller.currentIndex).to.equal(2);

            pressKey(el, 'ArrowLeft');
            expect(controller.currentIndex).to.equal(0);
        });

        it('leaves Home/End unaffected by direction', async () => {
            const el = await makeLinearFixture('rtl');
            const controller = el.rovingTabindexController;

            pressKey(el, 'End');
            expect(controller.currentIndex).to.equal(2);

            pressKey(el, 'Home');
            expect(controller.currentIndex).to.equal(0);
        });

        it('only flips the column step in a grid, not the row step', async () => {
            const el = await fixture<RtlGridTestEl>(html`
                <rtl-grid-test-roving-tabindex-el dir="rtl">
                    <button>0,0</button>
                    <button>0,1</button>
                    <button>0,2</button>
                    <button>1,0</button>
                    <button>1,1</button>
                    <button>1,2</button>
                </rtl-grid-test-roving-tabindex-el>
            `);
            await elementUpdated(el);
            const controller = el.rovingTabindexController;
            controller.directionLength = 3;
            controller.currentIndex = 1;

            // RTL: ArrowRight moves toward column 0 (visually left-to-right flip).
            pressKey(el, 'ArrowRight');
            expect(controller.currentIndex).to.equal(0);

            controller.currentIndex = 1;
            // Row stepping is unaffected by RTL.
            pressKey(el, 'ArrowDown');
            expect(controller.currentIndex).to.equal(4);
        });
    });
});
