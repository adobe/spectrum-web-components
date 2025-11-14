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
    aTimeout,
    elementUpdated,
    expect,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import { fixture, isOnTopLayer } from '../../../test/testing-helpers.js';

import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import {
    OVERLAY_TYPES,
    OverlayTrigger,
} from '@spectrum-web-components/overlay';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/theme/sp-theme.js';
import { sendKeys } from '@web/test-runner-commands';
import { sendMouse } from '../../../test/plugins/browser.js';

export const runOverlayTriggerTests = (type: string): void => {
    describe(`Overlay Trigger - ${type}`, () => {
        describe('open/close', () => {
            beforeEach(async function () {
                this.testDiv = await fixture<HTMLDivElement>(html`
                    <div>
                        <style>
                            body {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        </style>
                        <input type="text" />
                        <overlay-trigger
                            id="trigger"
                            placement="top"
                            triggered-by="click hover"
                        >
                            <sp-button
                                id="outer-button"
                                variant="primary"
                                slot="trigger"
                            >
                                Show Popover
                            </sp-button>
                            <sp-popover
                                id="outer-popover"
                                slot="click-content"
                                placement="bottom"
                                tip
                            >
                                <sp-dialog
                                    no-divider
                                    class="options-popover-content"
                                >
                                    <overlay-trigger
                                        id="inner-trigger"
                                        placement="bottom"
                                        triggered-by="click"
                                    >
                                        <sp-button
                                            id="inner-button"
                                            slot="trigger"
                                        >
                                            Press Me
                                        </sp-button>
                                        <sp-popover
                                            id="inner-popover"
                                            slot="click-content"
                                            placement="bottom"
                                            tip
                                        >
                                            <sp-dialog
                                                no-divider
                                                class="options-popover-content"
                                            >
                                                Another Popover
                                                <sp-button>
                                                    Does nothing
                                                </sp-button>
                                            </sp-dialog>
                                        </sp-popover>
                                    </overlay-trigger>
                                </sp-dialog>
                            </sp-popover>
                            <div
                                id="hover-content"
                                slot="hover-content"
                                class="tooltip"
                                delay="100"
                            >
                                Tooltip
                            </div>
                        </overlay-trigger>
                    </div>
                `);

                this.innerTrigger = this.testDiv.querySelector(
                    '#inner-trigger'
                )! as OverlayTrigger;
                this.outerTrigger = this.testDiv.querySelector(
                    '#trigger'
                )! as OverlayTrigger;
                this.innerButton = this.testDiv.querySelector(
                    '#inner-button'
                ) as Button;
                this.outerButton = this.testDiv.querySelector(
                    '#outer-button'
                ) as Button;
                this.innerClickContent = this.testDiv.querySelector(
                    '#inner-popover'
                ) as Popover;
                this.outerClickContent = this.testDiv.querySelector(
                    '#outer-popover'
                ) as Popover;
                this.hoverContent = this.testDiv.querySelector(
                    '#hover-content'
                ) as HTMLDivElement;

                await Promise.all([
                    this.innerTrigger.updateComplete,
                    this.outerTrigger.updateComplete,
                    this.innerButton.updateComplete,
                    this.outerButton.updateComplete,
                    this.innerClickContent.updateComplete,
                    this.outerClickContent.updateComplete,
                ]);
                this.testDiv.querySelector('input').focus();
            });

            it('opens a popover', async function () {
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover not available at point'
                ).to.be.false;

                expect(this.outerButton).to.exist;
                const open = oneEvent(this.outerTrigger, 'sp-opened');
                this.outerButton.click();
                await open;
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover available at point'
                ).to.be.true;
            });

            it('[disabled] closes a popover', async function () {
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover not available at point'
                ).to.be.false;
                expect(this.outerTrigger.disabled).to.be.false;

                expect(this.outerButton).to.exist;

                const opened = oneEvent(this.outerButton, 'sp-opened');
                this.outerButton.click();
                await opened;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover available at point'
                ).to.be.true;

                const closed = oneEvent(this.outerButton, 'sp-closed');
                this.outerTrigger.disabled = true;
                await closed;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover not available at point'
                ).to.be.false;
            });

            it('resizes a popover', async function () {
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover not available at point'
                ).to.be.false;

                expect(this.outerButton).to.exist;
                const open = oneEvent(this.outerTrigger, 'sp-opened');
                this.outerButton.click();
                await open;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover available at point'
                ).to.be.true;

                window.dispatchEvent(new Event('resize'));
                window.dispatchEvent(new Event('resize'));

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover available at point'
                ).to.be.true;
            });

            OVERLAY_TYPES.map((type) => {
                it(`opens a popover - [type="${type}"]`, async function () {
                    const outerTrigger = this.outerTrigger as OverlayTrigger;

                    outerTrigger.type = type;
                    await elementUpdated(outerTrigger);
                    expect(
                        await isOnTopLayer(this.outerClickContent),
                        'popover not available at point'
                    ).to.be.false;

                    expect(this.outerButton).to.exist;
                    const opened = oneEvent(outerTrigger, 'sp-opened');
                    this.outerButton.click();
                    await opened;
                    expect(
                        await isOnTopLayer(this.outerClickContent),
                        'popover available at point'
                    ).to.be.true;
                });
            });

            it('does not open a hover popover when a click popover is open', async function () {
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover not available at point'
                ).to.be.false;
                expect(
                    await isOnTopLayer(this.hoverContent),
                    'hover not available at point'
                ).to.be.false;

                expect(this.outerButton).to.exist;
                const open = oneEvent(this.outerTrigger, 'sp-opened');
                this.outerButton.click();
                await open;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.hoverContent),
                    'hover not available at point'
                ).to.be.false;

                this.outerButton.dispatchEvent(
                    new Event('mouseenter', {
                        bubbles: true,
                        composed: true,
                    })
                );

                await nextFrame();

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'popover available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.hoverContent),
                    'hover not available at point'
                ).to.be.false;
            });

            it('does not open a popover when [disabled]', async function () {
                const triggerZone = this.outerTrigger.shadowRoot.querySelector(
                    '#trigger'
                ) as HTMLDivElement;

                expect(this.outerTrigger.disabled).to.be.false;
                let open = oneEvent(this.outerTrigger, 'sp-opened');
                this.outerButton.click();
                await open;
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'hover available at point'
                ).to.be.true;
                let closed = oneEvent(this.outerTrigger, 'sp-closed');
                await sendMouse({
                    type: 'click',
                    position: [1, 1],
                });
                await closed;
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'hover not available at point'
                ).to.be.false;

                this.outerTrigger.disabled = true;
                await elementUpdated(this.outerTrigger);

                expect(this.outerTrigger.disabled).to.be.true;
                expect(this.outerTrigger.hasAttribute('disabled')).to.be.true;
                // // The overlay shouldn't open here.
                this.outerButton.click();
                await aTimeout(150);
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'hover not available at point'
                ).to.be.false;
                // The overlay shouldn't open here, either.
                triggerZone.dispatchEvent(new Event('mouseenter'));
                await aTimeout(150);
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'hover not available at point'
                ).to.be.false;

                this.outerTrigger.disabled = false;
                await elementUpdated(this.outerTrigger);

                expect(this.outerTrigger.disabled).to.be.false;
                expect(this.outerTrigger.hasAttribute('disabled')).to.be.false;
                open = oneEvent(this.outerTrigger, 'sp-opened');
                this.outerButton.click();
                await open;
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'hover available at point'
                ).to.be.true;
                closed = oneEvent(this.outerTrigger, 'sp-closed');
                this.outerButton.click();
                await closed;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'hover not available at point'
                ).to.be.false;
            });

            it('opens a nested popover', async function () {
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'hover not available at point'
                ).to.be.false;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'hover not available at point'
                ).to.be.false;

                expect(this.outerButton).to.exist;
                let open = oneEvent(this.outerTrigger, 'sp-opened');
                this.outerButton.click();
                await open;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point'
                ).to.be.true;
                expect(await isOnTopLayer(this.innerClickContent)).to.be.false;

                open = oneEvent(this.innerTrigger, 'sp-opened');
                this.innerButton.click();
                await open;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content available at point'
                ).to.be.true;
            });

            it('focus previous "modal" when closing nested "modal"', async function () {
                this.outerTrigger.type = 'modal';
                this.innerTrigger.type = 'modal';

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content not available at point'
                ).to.be.false;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content not available at point'
                ).to.be.false;

                const outerOpen = oneEvent(this.outerButton, 'sp-opened');
                this.outerButton.click();
                await outerOpen;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content available at point'
                ).to.be.false;

                const innerOpen = oneEvent(this.innerButton, 'sp-opened');
                this.innerButton.click();
                await innerOpen;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content available at point'
                ).to.be.true;

                // Why does this make the test pass in Chromium? 🤷🏻‍♂️
                await sendKeys({ press: 'Space' });

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content available at point'
                ).to.be.true;

                const innerClose = oneEvent(this.innerButton, 'sp-closed');
                await sendKeys({ press: 'Escape' });
                await innerClose;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content not available at point'
                ).to.be.false;

                expect(
                    document.activeElement === this.innerButton,
                    `outer popover recieved focus: ${document.activeElement?.localName}`
                ).to.be.true;
            });

            it('escape closes an open popover', async function () {
                this.outerTrigger.type = 'modal';
                this.innerTrigger.type = 'modal';
                const outerOpen = oneEvent(this.outerButton, 'sp-opened');
                this.outerButton.click();
                await outerOpen;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point'
                ).to.be.true;

                const innerOpen = oneEvent(this.innerButton, 'sp-opened');
                this.innerButton.click();
                await innerOpen;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point, 1'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content available at point'
                ).to.be.true;

                const innerClose = oneEvent(this.innerButton, 'sp-closed');
                await sendKeys({ press: 'Escape' });
                await innerClose;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point, 2'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content not available at point, 1'
                ).to.be.false;

                const outerClose = oneEvent(this.outerButton, 'sp-closed');
                await sendKeys({ press: 'Escape' });
                await outerClose;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content not available at point'
                ).to.be.false;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content not available at point, 2'
                ).to.be.false;
            });

            it('click closes an open popover', async function () {
                this.outerTrigger.type = 'auto';
                this.innerTrigger.type = 'auto';
                const outerOpen = oneEvent(this.outerButton, 'sp-opened');
                this.outerButton.click();
                await outerOpen;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content is available at point'
                ).to.be.true;

                const innerOpen = oneEvent(this.innerButton, 'sp-opened');
                this.innerButton.click();
                await innerOpen;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content is available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content is available at point'
                ).to.be.true;

                // Test that clicking in the overlay content does not close the overlay
                // 200ms is slightly more than the overlay animation fade out time (130ms)
                this.innerClickContent.click();
                await aTimeout(200);

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content is available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content is available at point'
                ).to.be.true;

                const innerClose = oneEvent(this.innerButton, 'sp-closed');
                const outerClose = oneEvent(this.outerButton, 'sp-closed');
                await sendMouse({
                    type: 'click',
                    position: [1, 1],
                });
                await innerClose;
                await outerClose;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content is not available at point'
                ).to.be.not;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content is not available at point'
                ).to.be.not;
            });

            it('opens a hover popover', async function () {
                expect(await isOnTopLayer(this.hoverContent)).to.be.false;

                const rect = this.outerTrigger.getBoundingClientRect();
                const open = oneEvent(this.outerTrigger, 'sp-opened');
                await sendMouse({
                    type: 'move',
                    position: [
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    ],
                });
                await open;
                expect(
                    await isOnTopLayer(this.hoverContent),
                    'hover content is available at point'
                ).to.be.true;

                const close = oneEvent(this.outerTrigger, 'sp-closed');
                await sendMouse({
                    type: 'move',
                    position: [
                        rect.left + rect.width * 2,
                        rect.top + rect.height / 2,
                    ],
                });
                await close;
                expect(
                    await isOnTopLayer(this.hoverContent),
                    'hover content is not available at point'
                ).to.be.false;
            });

            it('closes a hover popover', async function () {
                expect(await isOnTopLayer(this.hoverContent)).to.be.false;

                const rect = this.outerTrigger.getBoundingClientRect();
                const open = oneEvent(this.outerTrigger, 'sp-opened');
                await sendMouse({
                    type: 'move',
                    position: [
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    ],
                });
                await open;
                const close = oneEvent(this.outerTrigger, 'sp-closed');
                expect(
                    await isOnTopLayer(this.hoverContent),
                    'hover content is available at point'
                ).to.be.true;
                await sendMouse({
                    type: 'move',
                    position: [
                        rect.left + rect.width * 2,
                        rect.top + rect.height / 2,
                    ],
                });
                await close;
                expect(
                    await isOnTopLayer(this.hoverContent),
                    'hover content is not available at point'
                ).to.be.false;
            });

            it('Escape key closes a hover popover', async function () {
                expect(await isOnTopLayer(this.hoverContent)).to.be.false;

                const rect = this.outerTrigger.getBoundingClientRect();
                const open = oneEvent(this.outerTrigger, 'sp-opened');
                await sendMouse({
                    type: 'move',
                    position: [
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    ],
                });
                await open;
                const close = oneEvent(this.outerTrigger, 'sp-closed');
                expect(
                    await isOnTopLayer(this.hoverContent),
                    'hover content is available at point'
                ).to.be.true;
                await sendKeys({ press: 'Escape' });
                await close;
                expect(
                    await isOnTopLayer(this.hoverContent),
                    'hover content is not available at point'
                ).to.be.false;
            });

            it('dispatches events on open/close', async function () {
                const opened = oneEvent(this.outerButton, 'sp-opened');
                this.outerButton.click();
                const openedEvent = await opened;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'hover content is available at point'
                ).to.be.true;
                expect(this.outerTrigger.open).to.equal('click');

                expect(openedEvent.detail.interaction).to.equal('auto');

                const closed = oneEvent(this.outerButton, 'sp-closed');
                await sendMouse({
                    type: 'click',
                    position: [1, 1],
                });
                const closedEvent = await closed;
                expect(closedEvent.detail.interaction).to.equal('auto');
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'hover content is not available at point'
                ).to.be.false;
            });

            it('blocks body scroll when modal overlay is opened and restores when closed', async function () {
                const originalBodyOverflow = document.body.style.overflow;

                const modalTrigger = this.outerTrigger;
                modalTrigger.type = 'modal';
                await elementUpdated(modalTrigger);

                // Open modal overlay
                const opened = oneEvent(modalTrigger, 'sp-opened');
                this.outerButton.click();
                await opened;

                // Check that body scroll is blocked
                expect(document.body.style.overflow).to.equal('hidden');

                // Close modal overlay
                const closed = oneEvent(modalTrigger, 'sp-closed');
                sendMouse({
                    steps: [
                        {
                            type: 'click',
                            position: [1, 1],
                        },
                    ],
                });
                await closed;

                // Check that body scroll is restored
                expect(document.body.style.overflow).to.equal(
                    originalBodyOverflow
                );
            });

            it('actually prevents page scrolling when modal overlay is open and restores scrolling when closed', async function () {
                // Create a long enough page to enable scrolling
                const longContent = document.createElement('div');
                longContent.style.height = '200vh'; // Make page twice viewport height
                longContent.style.width = '100%';
                longContent.style.backgroundColor = 'transparent';
                document.body.appendChild(longContent);

                const modalTrigger = this.outerTrigger;
                modalTrigger.type = 'modal';
                await elementUpdated(modalTrigger);

                // Open modal overlay
                const opened = oneEvent(modalTrigger, 'sp-opened');
                this.outerButton.click();
                await opened;

                // Attempt to scroll while modal is open
                const scrollYBeforeScroll = window.scrollY;
                window.scrollTo(0, 100);
                await nextFrame();

                // Verify that scrolling was prevented
                expect(window.scrollY).to.equal(scrollYBeforeScroll);

                // Close modal overlay
                const closed = oneEvent(modalTrigger, 'sp-closed');
                await sendMouse({
                    steps: [
                        {
                            type: 'click',
                            position: [1, 1],
                        },
                    ],
                });
                await closed;

                // Verify scrolling works again after modal is closed
                window.scrollTo(0, 100);
                await nextFrame();
                expect(window.scrollY).to.equal(100);

                // Clean up
                document.body.removeChild(longContent);
            });
        });
        describe('System interactions', () => {
            afterEach(async () => {
                const triggers =
                    document.querySelectorAll<OverlayTrigger>(
                        'overlay-trigger'
                    );
                const closes: Promise<CustomEvent<unknown>>[] = [];
                triggers.forEach((trigger) => {
                    if (trigger.open) {
                        const close = oneEvent(trigger, 'sp-closed');
                        trigger.open = undefined;
                        closes.push(close);
                    }
                });
                await Promise.all(closes);
            });
        });
    });
};
