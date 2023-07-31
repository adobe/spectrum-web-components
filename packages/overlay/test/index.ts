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

import { fixture, isOnTopLayer } from '../../../test/testing-helpers.js';
import {
    aTimeout,
    elementUpdated,
    expect,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';

import {
    OverlayTrigger,
    TriggerInteractions,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/button/sp-button.js';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/popover/sp-popover.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/theme/sp-theme.js';
import { sendMouse } from '../../../test/plugins/browser.js';
import { sendKeys } from '@web/test-runner-commands';

function pressKey(code: string): void {
    const up = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        key: code,
        code,
    });
    document.dispatchEvent(up);
}

const pressSpace = (): void => pressKey('Space');

export const runOverlayTriggerTests = (type: string): void => {
    describe(`Overlay Trigger - ${type}`, () => {
        describe('open/close', () => {
            beforeEach(async function () {
                this.testDiv = await fixture<HTMLDivElement>(
                    html`
                        <div>
                            <style>
                                body {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }
                            </style>
                            <overlay-trigger id="trigger" placement="top">
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
                                    direction="bottom"
                                    tip
                                >
                                    <sp-dialog
                                        no-divider
                                        class="options-popover-content"
                                    >
                                        <overlay-trigger
                                            id="inner-trigger"
                                            placement="bottom"
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
                                                direction="bottom"
                                                tip
                                            >
                                                <sp-dialog
                                                    no-divider
                                                    class="options-popover-content"
                                                >
                                                    Another Popover
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
                    `
                );

                this.innerTrigger = this.testDiv.querySelector(
                    '#inner-trigger'
                ) as OverlayTrigger;
                this.outerTrigger = this.testDiv.querySelector(
                    '#trigger'
                ) as OverlayTrigger;
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

            ['modal', 'replace', 'inline'].map((type: string) => {
                it(`opens a popover - [type="${type}"]`, async function () {
                    this.outerTrigger.type = type as Extract<
                        TriggerInteractions,
                        'inline' | 'modal' | 'replace'
                    >;
                    await elementUpdated(this.outerTrigger);
                    expect(
                        await isOnTopLayer(this.outerClickContent),
                        'popover not available at point'
                    ).to.be.false;

                    expect(this.outerButton).to.exist;
                    const opened = oneEvent(this.outerTrigger, 'sp-opened');
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
                sendMouse({
                    steps: [
                        {
                            type: 'click',
                            position: [1, 1],
                        },
                    ],
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

                const innerClose = oneEvent(this.innerButton, 'sp-closed');
                await sendKeys({
                    press: 'Escape',
                });
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
                    'outer popover recieved focus'
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
                    'outer click content available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content available at point'
                ).to.be.true;

                pressSpace();

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content available at point'
                ).to.be.true;

                const innerClose = oneEvent(this.innerButton, 'sp-closed');
                await sendKeys({
                    press: 'Escape',
                });
                await innerClose;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content available at point'
                ).to.be.true;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content not available at point'
                ).to.be.false;

                const outerClose = oneEvent(this.outerButton, 'sp-closed');
                await sendKeys({
                    press: 'Escape',
                });
                await outerClose;

                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'outer click content not available at point'
                ).to.be.false;
                expect(
                    await isOnTopLayer(this.innerClickContent),
                    'inner click content not available at point'
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
                sendMouse({
                    steps: [
                        {
                            type: 'click',
                            position: [1, 1],
                        },
                    ],
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
                sendMouse({
                    steps: [
                        {
                            type: 'move',
                            position: [
                                rect.left + rect.width / 2,
                                rect.top + rect.height / 2,
                            ],
                        },
                    ],
                });
                await open;
                expect(
                    await isOnTopLayer(this.hoverContent),
                    'hover content is available at point'
                ).to.be.true;

                const close = oneEvent(this.outerTrigger, 'sp-closed');
                sendMouse({
                    steps: [
                        {
                            type: 'move',
                            position: [
                                rect.left + rect.width * 2,
                                rect.top + rect.height / 2,
                            ],
                        },
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
                const close = oneEvent(this.outerTrigger, 'sp-closed');
                await sendMouse({
                    steps: [
                        {
                            type: 'move',
                            position: [
                                rect.left + rect.width / 2,
                                rect.top + rect.height / 2,
                            ],
                        },
                    ],
                });
                await nextFrame();
                await nextFrame();
                await nextFrame();
                await nextFrame();
                await sendMouse({
                    steps: [
                        {
                            type: 'move',
                            position: [
                                rect.left + rect.width * 2,
                                rect.top + rect.height / 2,
                            ],
                        },
                    ],
                });
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
                sendMouse({
                    steps: [
                        {
                            type: 'click',
                            position: [1, 1],
                        },
                    ],
                });
                const closedEvent = await closed;
                expect(closedEvent.detail.interaction).to.equal('auto');
                expect(
                    await isOnTopLayer(this.outerClickContent),
                    'hover content is not available at point'
                ).to.be.false;
            });
        });
        describe('System interactions', () => {
            afterEach(async () => {
                const triggers = document.querySelectorAll('overlay-trigger');
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
            it.skip('manages multiple layers of `type="modal"', async () => {
                const el = await fixture(html`
                    <overlay-trigger type="modal">
                        <sp-button slot="trigger" variant="accent">
                            Toggle Dialog
                        </sp-button>
                        <sp-popover slot="click-content">
                            <sp-dialog no-divider>
                                <overlay-trigger>
                                    <sp-button slot="trigger" variant="primary">
                                        Toggle Dialog
                                    </sp-button>
                                    <sp-popover slot="click-content">
                                        <sp-dialog no-divider>
                                            <overlay-trigger type="modal">
                                                <sp-button
                                                    slot="trigger"
                                                    variant="secondary"
                                                >
                                                    Toggle Dialog
                                                </sp-button>
                                                <sp-popover
                                                    slot="click-content"
                                                >
                                                    <sp-dialog no-divider>
                                                        <p>
                                                            When you get this
                                                            deep, this
                                                            ActiveOverlay should
                                                            be the only one in
                                                            [slot="open"].
                                                        </p>
                                                        <p>
                                                            All of the rest of
                                                            the ActiveOverlay
                                                            elements should have
                                                            had their [slot]
                                                            attribute removed.
                                                        </p>
                                                        <p>
                                                            Closing this
                                                            ActiveOverlay should
                                                            replace them...
                                                        </p>
                                                    </sp-dialog>
                                                </sp-popover>
                                            </overlay-trigger>
                                        </sp-dialog>
                                    </sp-popover>
                                </overlay-trigger>
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                `);
                const overlayTriggers = [
                    ...el.querySelectorAll('overlay-trigger'),
                ];
                let activeOverlays = [
                    ...document.querySelectorAll('active-overlay'),
                ];
                const triggers = [
                    ...el.querySelectorAll('sp-button[slot="trigger"]'),
                ] as Button[];

                expect(activeOverlays.length, 'no previous overlays').to.equal(
                    0
                );

                let open = oneEvent(triggers[0], 'sp-opened');
                triggers[0]?.click();
                await open;
                await elementUpdated(overlayTriggers[0]);
                activeOverlays = [
                    ...document.querySelectorAll('active-overlay'),
                ];
                expect(
                    activeOverlays.length,
                    'The first `active-overlay` element has been added.'
                ).to.equal(1);
                expect(
                    activeOverlays[0].slot,
                    'first overlay, first time'
                ).to.equal('open');

                open = oneEvent(triggers[1], 'sp-opened');
                triggers[1]?.click();
                await open;
                await elementUpdated(overlayTriggers[1]);
                activeOverlays = [
                    ...document.querySelectorAll('active-overlay'),
                ];
                expect(
                    activeOverlays.length,
                    'The second `active-overlay` element has been added.'
                ).to.equal(2);

                expect(
                    activeOverlays[0].slot,
                    'first overlay, second time'
                ).to.equal('open');
                expect(
                    activeOverlays[1].slot,
                    'second overlay, second time'
                ).to.equal('open');

                open = oneEvent(triggers[2], 'sp-opened');
                triggers[2]?.click();
                await open;
                await elementUpdated(overlayTriggers[2]);
                activeOverlays = [
                    ...document.querySelectorAll('active-overlay'),
                ];
                expect(
                    activeOverlays.length,
                    'The third `active-overlay` element has been added.'
                ).to.equal(3);

                expect(
                    activeOverlays[0].hasAttribute('slot'),
                    'first overlay, third time'
                ).to.be.false;
                expect(
                    activeOverlays[1].hasAttribute('slot'),
                    'second overlay, third time'
                ).to.be.false;
                expect(
                    activeOverlays[2].slot,
                    'third overlay, third time'
                ).to.equal('open');

                await nextFrame();
                const closed = oneEvent(triggers[2], 'sp-closed');
                sendMouse({
                    steps: [
                        {
                            type: 'click',
                            position: [1, 1],
                        },
                    ],
                });
                await closed;
                await elementUpdated(overlayTriggers[2]);
                activeOverlays = [
                    ...document.querySelectorAll('active-overlay'),
                ];
                expect(
                    activeOverlays.length,
                    'The third `active-overlay` element has been removed.'
                ).to.equal(2);

                await waitUntil(() => {
                    return activeOverlays[0].slot === 'open';
                }, 'first overlay, last time');
                expect(
                    activeOverlays[1].slot,
                    'second overlay, last time'
                ).to.equal('open');
            });
        });
    });
};
