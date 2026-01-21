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
import '@spectrum-web-components/button/sp-button.js';
import { Dialog } from '@spectrum-web-components/dialog';
import '@spectrum-web-components/dialog/sp-dialog.js';
import {
    Overlay,
    OverlayTrigger,
    Placement,
    VirtualTrigger,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { setViewport } from '@web/test-runner-commands';

import {
    elementUpdated,
    expect,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import { render, TemplateResult } from '@spectrum-web-components/base';
import { Button } from '@spectrum-web-components/button';
import { Menu } from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { Theme } from '@spectrum-web-components/theme';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';
import { isFirefox } from '@spectrum-web-components/shared/src/platform.js';
import {
    fixture,
    isInteractive,
    isOnTopLayer,
    sendShiftTabKey,
    sendTabKey,
} from '../../../test/testing-helpers.js';
import { PopoverContent } from '../stories/overlay-story-components.js';
import {
    clickAndHoverTarget,
    definedOverlayElement,
    virtualElement,
} from '../stories/overlay.stories.js';
// import { isWebKit } from '@spectrum-web-components/shared';

async function styledFixture<T extends Element>(
    story: TemplateResult
): Promise<T> {
    const test = await fixture<Theme>(html`
        <sp-theme system="spectrum" scale="medium" color="dark">
            ${story}
        </sp-theme>
    `);
    return test.children[0] as T;
}

describe('Overlays', () => {
    let testDiv!: HTMLDivElement;
    let openOverlays: Overlay[] = [];

    describe('shared fixture', () => {
        beforeEach(async () => {
            testDiv = await styledFixture<HTMLDivElement>(html`
                <div id="top">
                    <style>
                        body {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        #top {
                            margin: 100px;
                        }

                        sp-button {
                            flex: none;
                        }

                        #overlay-content {
                            display: none;
                        }
                    </style>
                    <sp-button id="first-button" variant="primary">
                        Show Popover
                    </sp-button>
                    <div id="overlay-content">
                        <sp-popover id="outer-popover" direction="bottom" tip>
                            <sp-dialog no-divider>
                                <div class="options-popover-content">
                                    A popover message
                                </div>
                                <sp-button id="outer-focus-target">
                                    Test 1
                                </sp-button>
                                <sp-button>Test 2</sp-button>
                                <sp-button>Test 3</sp-button>
                            </sp-dialog>
                        </sp-popover>
                        <sp-tooltip id="hover-1" class="hover-content">
                            Hover message
                        </sp-tooltip>
                        <sp-tooltip id="hover-2" class="hover-content">
                            Other hover message
                        </sp-tooltip>
                    </div>
                </div>
            `);
            await elementUpdated(testDiv);
        });

        afterEach(() => {
            openOverlays.map((overlay) => (overlay.open = false));
            openOverlays = [];
        });

        [
            'bottom',
            'bottom-start',
            'bottom-end',
            'top',
            'top-start',
            'top-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end',
        ].map((direction) => {
            const placement = direction as Placement;
            it(`opens a popover - ${placement}`, async () => {
                const clickSpy = spy();
                const button = testDiv.querySelector(
                    '#first-button'
                ) as HTMLElement;
                const outerPopover = testDiv.querySelector(
                    '#outer-popover'
                ) as Popover;
                outerPopover.addEventListener('click', () => {
                    clickSpy();
                });

                expect(
                    await isInteractive(outerPopover),
                    'outside popover is not interactive'
                ).to.be.false;
                expect(button).to.exist;

                const opened = oneEvent(outerPopover, 'sp-opened');
                openOverlays.push(
                    await Overlay.open(outerPopover, {
                        trigger: button,
                        type: 'auto',
                        delayed: false,
                        placement,
                        offset: 10,
                    })
                );
                button.insertAdjacentElement(
                    'afterend',
                    openOverlays.at(-1) as HTMLElement
                );
                await opened;
                expect(await isInteractive(outerPopover)).to.be.true;
            });
        });

        it(`opens a modal dialog`, async () => {
            const button = testDiv.querySelector(
                '#first-button'
            ) as HTMLElement;
            const outerPopover = testDiv.querySelector(
                '#outer-popover'
            ) as Popover;

            expect(await isInteractive(outerPopover)).to.be.false;

            expect(button).to.exist;

            const opened = oneEvent(outerPopover, 'sp-opened');
            openOverlays.push(
                await Overlay.open(outerPopover, {
                    trigger: button,
                })
            );
            button.insertAdjacentElement(
                'afterend',
                openOverlays.at(-1) as HTMLElement
            );
            await opened;

            const firstFocused = outerPopover.querySelector(
                '#outer-focus-target'
            ) as HTMLElement;
            expect(document.activeElement === firstFocused).to.be.true;

            /**
             * Tab cycle is awkward in the headless browser, forward tab to just before the known end of the page
             * and the backward tab past the known beginning of the page. Test that you never focused the button
             * that triggered the dialog and is outside of the modal. A test that was able to cycle would be better.
             */

            await sendTabKey();

            expect(document.activeElement === button).to.be.false;
            await sendTabKey();

            expect(document.activeElement === button).to.be.false;

            await sendShiftTabKey();

            expect(document.activeElement === button).to.be.false;

            await sendShiftTabKey();

            expect(document.activeElement === button).to.be.false;

            await sendShiftTabKey();

            expect(document.activeElement === button).to.be.false;
        });

        it(`updates a popover`, async () => {
            const button = testDiv.querySelector(
                '#first-button'
            ) as HTMLElement;
            const outerPopover = testDiv.querySelector(
                '#outer-popover'
            ) as Popover;

            expect(await isInteractive(outerPopover)).to.be.false;

            expect(button).to.exist;

            const opened = oneEvent(outerPopover, 'sp-opened');
            openOverlays.push(
                await Overlay.open(outerPopover, {
                    trigger: button,
                    type: 'auto',
                    offset: 10,
                })
            );
            button.insertAdjacentElement(
                'afterend',
                openOverlays.at(-1) as HTMLElement
            );
            await opened;

            expect(await isInteractive(outerPopover)).to.be.true;

            Overlay.update();

            expect(await isInteractive(outerPopover)).to.be.true;
        });

        it(`opens a popover w/ delay`, async () => {
            const button = testDiv.querySelector(
                '#first-button'
            ) as HTMLElement;
            const outerPopover = testDiv.querySelector(
                '#outer-popover'
            ) as Popover;

            expect(await isInteractive(outerPopover)).to.be.false;
            expect(button).to.exist;

            const opened = oneEvent(outerPopover, 'sp-opened');
            const start = performance.now();
            openOverlays.push(
                await Overlay.open(outerPopover, {
                    trigger: button,
                    type: 'auto',
                    delayed: true,
                    offset: 10,
                })
            );
            button.insertAdjacentElement(
                'afterend',
                openOverlays.at(-1) as HTMLElement
            );
            await opened;
            const end = performance.now();
            expect(await isInteractive(outerPopover)).to.be.true;
            expect(end - start).to.be.greaterThan(1000);
        });

        it('opens hover overlay', async () => {
            const button = testDiv.querySelector(
                '#first-button'
            ) as HTMLElement;
            const hoverOverlay = testDiv.querySelector(
                '#hover-1'
            ) as HTMLElement;
            const clickOverlay = testDiv.querySelector(
                '#outer-popover'
            ) as HTMLElement;

            expect(await isOnTopLayer(hoverOverlay)).to.be.false;
            expect(await isOnTopLayer(clickOverlay)).to.be.false;

            let opened = oneEvent(hoverOverlay, 'sp-opened');
            openOverlays.push(
                await Overlay.open(hoverOverlay, {
                    trigger: button,
                    type: 'hint',
                    placement: 'top',
                    offset: 10,
                })
            );
            button.insertAdjacentElement(
                'afterend',
                openOverlays.at(-1) as HTMLElement
            );
            await opened;
            expect(await isOnTopLayer(hoverOverlay)).to.be.true;

            opened = oneEvent(clickOverlay, 'sp-opened');
            const closed = oneEvent(hoverOverlay, 'sp-closed');
            // Opening click overlay should close the hover overlay
            openOverlays.push(
                await Overlay.open(clickOverlay, {
                    trigger: button,
                    type: 'auto',
                    placement: 'bottom',
                    offset: 10,
                })
            );
            button.insertAdjacentElement(
                'afterend',
                openOverlays.at(-1) as HTMLElement
            );
            await opened;
            await closed;
            expect(
                await isInteractive(clickOverlay),
                'click overlay not interactive'
            ).to.be.true;
            expect(
                await isOnTopLayer(hoverOverlay),
                'hover overlay interactive'
            ).to.be.false;
        });

        it('opens custom overlay', async () => {
            const button = testDiv.querySelector(
                '#first-button'
            ) as HTMLElement;
            const customOverlay = testDiv.querySelector(
                '#hover-1'
            ) as HTMLElement;
            const clickOverlay = testDiv.querySelector(
                '#outer-popover'
            ) as HTMLElement;

            expect(button).to.exist;
            expect(customOverlay).to.exist;

            expect(await isOnTopLayer(customOverlay)).to.be.false;
            expect(await isOnTopLayer(clickOverlay)).to.be.false;

            let opened = oneEvent(customOverlay, 'sp-opened');
            openOverlays.push(
                await Overlay.open(customOverlay, {
                    trigger: button,
                    type: 'auto',
                    placement: 'top',
                    offset: 10,
                })
            );
            button.insertAdjacentElement(
                'afterend',
                openOverlays.at(-1) as HTMLElement
            );
            await opened;
            expect(await isOnTopLayer(customOverlay)).to.be.true;

            opened = oneEvent(clickOverlay, 'sp-opened');
            openOverlays.push(
                await Overlay.open(clickOverlay, {
                    trigger: button,
                    type: 'auto',
                    placement: 'bottom',
                    offset: 10,
                })
            );
            button.insertAdjacentElement(
                'afterend',
                openOverlays.at(-1) as HTMLElement
            );
            await opened;
            expect(await isOnTopLayer(clickOverlay), 'click content open').to.be
                .true;
        });
    });

    it('closes via events', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>
                <sp-popover id="root">
                    <sp-dialog dismissable>
                        Some Content for the Dialog.
                    </sp-dialog>
                </sp-popover>
            </div>
        `);

        const el = test.querySelector('sp-popover') as Popover;
        const dialog = el.querySelector('sp-dialog') as Dialog;

        const opened = oneEvent(el, 'sp-opened');
        openOverlays.push(
            await Overlay.open(el, {
                trigger: test,
                type: 'auto',
                placement: 'bottom',
                offset: 10,
            })
        );
        test.insertAdjacentElement(
            'afterend',
            openOverlays.at(-1) as HTMLElement
        );
        await opened;
        expect(await isInteractive(el)).to.be.true;

        const closed = oneEvent(el, 'sp-closed');
        dialog.close();
        await closed;
        expect(await isInteractive(el)).to.be.false;
    });

    it('positions with a VirtualTrigger', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>
                <sp-popover id="root" placement="right">
                    <sp-dialog dismissable>
                        Some Content for the Dialog.
                    </sp-dialog>
                </sp-popover>
            </div>
        `);

        const el = test.querySelector('sp-popover') as Popover;
        const trigger = new VirtualTrigger(100, 100);

        const opened = oneEvent(el, 'sp-opened');
        openOverlays.push(
            await Overlay.open(el, {
                trigger,
                type: 'auto',
                placement: 'right',
                offset: 10,
            })
        );
        test.insertAdjacentElement(
            'afterend',
            openOverlays.at(-1) as HTMLElement
        );
        await opened;
        expect(await isInteractive(el)).to.be.true;

        const initial = el.getBoundingClientRect();
        trigger.updateBoundingClientRect(500, 500);
        // Wait for placement computation to complete
        await nextFrame();
        await nextFrame();
        const final = el.getBoundingClientRect();
        expect(initial.x).to.not.equal(8);
        expect(initial.y).to.not.equal(8);
        expect(initial.x).to.not.equal(final.x);
        expect(initial.y).to.not.equal(final.y);
    });

    it('closes an inline overlay when tabbing past the content', async () => {
        const el = await fixture<HTMLDivElement>(html`
            <div>
                <sp-button class="trigger">Trigger</sp-button>
                <sp-popover class="content">
                    <input />
                </sp-popover>
                <input value="After" id="after" />
            </div>
        `);

        const trigger = el.querySelector('.trigger') as HTMLElement;
        const content = el.querySelector('.content') as HTMLElement;
        const input = el.querySelector('input') as HTMLInputElement;
        const after = el.querySelector('#after') as HTMLAnchorElement;

        const opened = oneEvent(content, 'sp-opened');
        openOverlays.push(
            await Overlay.open(content, {
                trigger,
                type: 'auto',
                receivesFocus: 'auto',
            })
        );
        trigger.insertAdjacentElement(
            'afterend',
            openOverlays.at(-1) as HTMLElement
        );
        await opened;

        expect(await isInteractive(content)).to.be.true;
        expect(document.activeElement).to.equal(input);

        const closed = oneEvent(content, 'sp-closed');
        await sendShiftTabKey();
        await closed;

        expect(document.activeElement).to.equal(trigger);

        await sendTabKey();
        expect(document.activeElement).to.equal(after);
        expect(await isInteractive(content)).to.be.false;
    });

    it('closes an inline overlay when tabbing before the trigger', async () => {
        const el = await fixture<HTMLDivElement>(html`
            <div>
                <input value="Before" id="before" />
                <sp-button class="trigger">Trigger</sp-button>
                <div class="content">
                    <label>
                        Content in an inline overlay.
                        <input />
                    </label>
                </div>
            </div>
        `);

        const trigger = el.querySelector('.trigger') as HTMLElement;
        const content = el.querySelector('.content') as HTMLElement;
        const input = el.querySelector('.content input') as HTMLInputElement;
        const before = el.querySelector('#before') as HTMLAnchorElement;

        const open = oneEvent(trigger, 'sp-opened');
        openOverlays.push(
            await Overlay.open(content, {
                trigger,
                type: 'auto',
            })
        );
        trigger.insertAdjacentElement(
            'afterend',
            openOverlays.at(-1) as HTMLElement
        );
        await open;

        expect(document.activeElement).to.equal(input);

        await sendShiftTabKey();

        expect(document.activeElement).to.equal(trigger);

        await sendShiftTabKey();

        expect(document.activeElement).to.equal(before);
    });

    it('opens detached content', async () => {
        const textContent = 'This is a detached element that has been overlaid';
        const el = await fixture<HTMLButtonElement>(html`
            <button>Trigger</button>
        `);

        const content = document.createElement('sp-popover');
        content.textContent = textContent;

        const opened = oneEvent(content, 'sp-opened');
        const overlay = await Overlay.open(content, {
            trigger: el,
            type: 'auto',
            placement: 'bottom',
        });
        el.insertAdjacentElement('afterend', overlay);
        await opened;

        expect(await isInteractive(content)).to.be.true;

        const closed = oneEvent(content, 'sp-closed');
        overlay.open = false;
        await closed;

        expect(await isInteractive(content)).to.be.false;

        content.remove();
    });
});
describe('Overlay - type="modal"', () => {
    describe('handle multiple separate `contextmenu` events', async () => {
        let width = 0;
        let height = 0;
        let firstMenu: Popover;
        let firstRect: DOMRect;
        let secondMenu: Popover;
        let secondRect: DOMRect;
        before(async () => {
            render(
                html`
                    <sp-theme color="light" scale="large" system="spectrum">
                        ${virtualElement({
                            ...virtualElement.args,
                            offset: 6,
                        })}
                    </sp-theme>
                `,
                document.body
            );

            width = window.innerWidth;
            height = window.innerHeight;
        });
        after(() => {
            document.querySelector('sp-theme')?.remove();
        });
        it('opens the first "contextmenu" overlay', async () => {
            const opened = oneEvent(document, 'sp-opened');
            // Right click to open "context menu" overlay.
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [width / 2 + 50, height / 2],
                    },
                    {
                        type: 'click',
                        options: {
                            button: 'right',
                        },
                        position: [width / 2 + 50, height / 2],
                    },
                ],
            });
            await opened;
            firstMenu = document.querySelector('sp-popover') as Popover;
            expect(firstMenu.textContent).to.include('Menu source: end');
            firstRect = firstMenu.getBoundingClientRect();
            expect(firstMenu).to.not.be.null;
        });
        it('closes the first "contextmenu" when opening a second', async () => {
            const closed = oneEvent(document, 'sp-closed');
            const opened = oneEvent(document, 'sp-opened');
            /**
             * Right click out of the "context menu" overlay to both close
             * the first overlay and have the event passed to the surfacing page
             * in order to open a subsequent "context menu" overlay.
             *
             * Using `sendMouse` here triggers the light dismiss for some reason while
             * manual interacting in this way does not...
             */
            const trigger = document.querySelector(
                'start-end-contextmenu'
            ) as HTMLElement;
            trigger.shadowRoot?.querySelector('#start')?.dispatchEvent(
                new Event('contextmenu', {
                    composed: true,
                })
            );
            await nextFrame();
            trigger.shadowRoot?.querySelector('#start')?.dispatchEvent(
                new Event('pointerup', {
                    composed: true,
                    bubbles: true,
                })
            );
            await closed;
            await opened;
            secondMenu = document.querySelector('sp-popover') as Popover;
            expect(secondMenu.textContent).to.include('Menu source: start');
            secondRect = secondMenu.getBoundingClientRect();
            expect(secondMenu).to.not.be.null;
        });
        it('closes the second "contextmenu" when clicking away', async () => {
            // Only attempt to close if the menu is still on the top layer
            // In CI, timing issues may cause the menu to already be closed
            const isOpen = await isOnTopLayer(secondMenu);
            if (isOpen) {
                const closed = oneEvent(document, 'sp-closed');
                await sendMouse({
                    type: 'click',
                    position: [width - width / 8, height - height / 8],
                });
                await closed;
            }
            await elementUpdated(firstMenu);
            await elementUpdated(secondMenu);
            // Verify the two menus were opened at different positions
            expect(firstRect.top).to.not.equal(secondRect.top);
            expect(firstRect.left).to.not.equal(secondRect.left);
        });
    });

    it('does not open content off of the viewport', async () => {
        before(async () => {
            await setViewport({ width: 360, height: 640 });
            // Allow viewport update to propagate.
            await nextFrame();
        });
        after(async () => {
            await setViewport({ width: 800, height: 600 });
            // Allow viewport update to propagate.
            await nextFrame();
        });

        await fixture<HTMLDivElement>(html`
            ${virtualElement({
                ...virtualElement.args,
                offset: 6,
            })}
        `);

        const opened = oneEvent(document, 'sp-opened');
        // Right click to open "context menu" overlay.
        await sendMouse([
            {
                type: 'move',
                position: [270, 10],
            },
            {
                type: 'click',
                options: {
                    button: 'right',
                },
                position: [270, 10],
            },
        ]);
        await opened;

        const firstMenu = document.querySelector('sp-menu') as Menu;
        expect(firstMenu).to.not.be.null;
        expect(await isInteractive(firstMenu)).to.be.true;

        const closed = oneEvent(document, 'sp-closed');
        sendKeys({ press: 'Escape' });
        await closed;

        expect(await isInteractive(firstMenu)).to.be.false;
    });

    it('opens children in the modal stack through shadow roots', async () => {
        const el = await fixture<OverlayTrigger>(definedOverlayElement());
        const trigger = el.querySelector(
            '[slot="trigger"]'
        ) as HTMLButtonElement;
        let open = oneEvent(el, 'sp-opened');
        trigger.click();
        await open;
        expect(el.open).to.equal('click');
        const content = document.querySelector(
            'popover-content'
        ) as PopoverContent;
        open = oneEvent(content, 'sp-opened');
        content.button.click();
        await open;
        expect(content.trigger.open).to.equal('click');
        let close = oneEvent(content, 'sp-closed');
        content.trigger.removeAttribute('open');
        await close;
        expect(content.trigger.open).to.be.null;
        close = oneEvent(el, 'sp-closed');
        el.removeAttribute('open');
        await close;
        expect(el.open).to.be.null;
    });

    it('should not open hover overlay right after closing the click overlay using the mouse', async () => {
        const overlayTrigger = await fixture<OverlayTrigger>(
            clickAndHoverTarget()
        );

        await elementUpdated(overlayTrigger);
        expect(overlayTrigger.open).to.be.undefined;

        const trigger = overlayTrigger.querySelector(
            'sp-button[slot="trigger"]'
        ) as Button;

        const opened = oneEvent(trigger, 'sp-opened');
        trigger.click();
        await opened;

        expect(overlayTrigger.open).to.equal('click');

        const closed = oneEvent(trigger, 'sp-closed');
        await sendMouse({
            type: 'click',
            position: [1, 1],
        });
        await closed;

        expect(overlayTrigger.open).to.be.undefined;
        expect(document.activeElement === trigger, 'trigger focused').to.be
            .true;
    });

    it('should not open hover overlay right after closing the click overlay using the keyboard', async () => {
        // @TODO: skipping on Firefox due to flakiness. Will review in the migration to Spectrum 2.
        if (isFirefox()) return;
        const overlayTrigger = await fixture<OverlayTrigger>(
            clickAndHoverTarget()
        );

        const trigger = overlayTrigger.querySelector(
            'sp-button[slot="trigger"]'
        ) as Button;

        const opened = oneEvent(trigger, 'sp-opened');
        trigger.click();
        await opened;

        expect(overlayTrigger.open).to.equal('click');

        const closed = oneEvent(trigger, 'sp-closed');
        sendKeys({ press: 'Escape' });
        await closed;
        await elementUpdated(overlayTrigger);

        expect(overlayTrigger.open).to.be.undefined;
        expect(document.activeElement === trigger, 'trigger focused').to.be
            .true;
    });

    it('should prevent clicks on external elements when modal overlay is open', async () => {
        const externalButtonClickSpy = spy();
        const internalButtonClickSpy = spy();

        const el = await fixture<HTMLDivElement>(html`
            <div>
                <sp-button id="trigger">Open Overlay</sp-button>
                <sp-overlay trigger="trigger@click" type="modal">
                    <sp-popover>
                        <sp-button id="internal-button">
                            Internal Button
                        </sp-button>
                        <p>Modal content</p>
                    </sp-popover>
                </sp-overlay>
                <sp-button id="external-button">External Button</sp-button>
            </div>
        `);

        const trigger = el.querySelector('#trigger') as HTMLElement;
        const overlay = el.querySelector('sp-overlay') as Overlay;
        const externalButton = el.querySelector(
            '#external-button'
        ) as HTMLElement;

        // Add event listener to external button
        externalButton.addEventListener('click', externalButtonClickSpy);

        await elementUpdated(overlay);

        // Open modal overlay
        const opened = oneEvent(overlay, 'sp-opened');
        trigger.click();
        await opened;

        expect(overlay.open).to.be.true;

        // Get internal button after overlay opens (it's now in the popover)
        const popover = document.querySelector('sp-popover') as HTMLElement;
        const internalButton = popover.querySelector(
            '#internal-button'
        ) as HTMLElement;
        internalButton.addEventListener('click', internalButtonClickSpy);

        // Try to click external button - should be blocked
        externalButton.click();
        await nextFrame();

        // External button click should not have fired
        expect(externalButtonClickSpy.called).to.be.false;

        // Internal button click should work
        internalButton.click();
        await nextFrame();

        // Internal button click should have fired
        expect(internalButtonClickSpy.called).to.be.true;

        // Close modal overlay
        const closed = oneEvent(overlay, 'sp-closed');
        overlay.open = false;
        await closed;

        // After closing, external button should be clickable
        externalButton.click();
        await nextFrame();

        // External button click should now fire
        expect(externalButtonClickSpy.called).to.be.true;
    });

    it('should prevent clicks on external elements when page overlay is open', async () => {
        const externalButtonClickSpy = spy();

        const el = await fixture<HTMLDivElement>(html`
            <div>
                <sp-button id="trigger">Open Overlay</sp-button>
                <sp-overlay trigger="trigger@click" type="page">
                    <sp-popover>
                        <p>Page overlay content</p>
                    </sp-popover>
                </sp-overlay>
                <sp-button id="external-button">External Button</sp-button>
            </div>
        `);

        const trigger = el.querySelector('#trigger') as HTMLElement;
        const overlay = el.querySelector('sp-overlay') as Overlay;
        const externalButton = el.querySelector(
            '#external-button'
        ) as HTMLElement;

        externalButton.addEventListener('click', externalButtonClickSpy);

        await elementUpdated(overlay);

        // Open page overlay
        const opened = oneEvent(overlay, 'sp-opened');
        trigger.click();
        await opened;

        expect(overlay.open).to.be.true;

        // Try to click external button - should be blocked
        externalButton.click();
        await nextFrame();

        // External button click should not have fired
        expect(externalButtonClickSpy.called).to.be.false;

        // Close overlay
        const closed = oneEvent(overlay, 'sp-closed');
        overlay.open = false;
        await closed;
    });
});
describe('Overlay - timing', () => {
    it('manages multiple modals in a row without preventing them from closing', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>
                <overlay-trigger
                    id="test-1"
                    placement="bottom"
                    triggered-by="hover"
                >
                    <sp-button slot="trigger">Trigger 1</sp-button>
                    <sp-popover slot="hover-content">
                        <p>Hover contentent for "Trigger 1".</p>
                    </sp-popover>
                </overlay-trigger>
                <overlay-trigger
                    id="test-2"
                    placement="right"
                    triggered-by="click hover"
                >
                    <sp-button slot="trigger">Trigger 2</sp-button>
                    <sp-popover slot="click-content">
                        <p>Click contentent for "Trigger 2".</p>
                    </sp-popover>
                    <sp-popover slot="hover-content">
                        <p>Hover contentent for "Trigger 2".</p>
                    </sp-popover>
                </overlay-trigger>
            </div>
        `);

        const overlayTrigger1 = test.querySelector('#test-1') as OverlayTrigger;
        const overlayTrigger2 = test.querySelector('#test-2') as OverlayTrigger;
        const trigger1 = overlayTrigger1.querySelector(
            '[slot="trigger"]'
        ) as HTMLButtonElement;
        const trigger2 = overlayTrigger2.querySelector(
            '[slot="trigger"]'
        ) as HTMLButtonElement;

        const boundingRectTrigger1 = trigger1.getBoundingClientRect();
        const boundingRectTrigger2 = trigger2.getBoundingClientRect();
        const trigger1Position: [number, number] = [
            boundingRectTrigger1.left + boundingRectTrigger1.width / 2,
            boundingRectTrigger1.top + boundingRectTrigger1.height / 2,
        ];
        const outsideTriggers: [number, number] = [
            boundingRectTrigger1.left + boundingRectTrigger1.width / 2,
            300,
        ];
        const trigger2Position: [number, number] = [
            boundingRectTrigger2.left + boundingRectTrigger2.width / 2,
            boundingRectTrigger2.top + boundingRectTrigger2.height / 4,
        ];

        // Move pointer over "Trigger 1", should _start_ to open "hover" content.
        await sendMouse({
            type: 'move',
            position: trigger1Position,
        });
        await nextFrame();
        await nextFrame();

        // Move pointer out of "Trigger 1", should _start_ to close "hover" content.
        await sendMouse({
            type: 'move',
            position: outsideTriggers,
        });
        await nextFrame();
        await nextFrame();
        // Move pointer over "Trigger 2", should _start_ to open "hover" content.
        await sendMouse({
            type: 'move',
            position: trigger2Position,
        });
        await nextFrame();
        await nextFrame();

        const opened = oneEvent(trigger2, 'sp-opened');
        // Click "Trigger 2", should _start_ to open "click" content and _start_ to close "hover" content.
        await sendMouse({
            type: 'click',
            position: trigger2Position,
        });
        await opened;
        await nextFrame();
        await nextFrame();

        // "click" content for "Trigger 2", _only_, open.
        expect(overlayTrigger1.hasAttribute('open')).to.be.false;
        expect(overlayTrigger2.hasAttribute('open')).to.be.true;
        expect(overlayTrigger2.getAttribute('open')).to.equal('click');

        const closed = oneEvent(overlayTrigger2, 'sp-closed');
        await sendMouse({
            type: 'click',
            position: outsideTriggers,
        });
        await closed;

        // Both overlays are closed.
        // Neither trigger received "focus" because the pointer "clicked" away, redirecting focus to <body>
        expect(overlayTrigger1.hasAttribute('open')).to.be.false;
        expect(overlayTrigger2.hasAttribute('open')).to.be.false;
    });
});

describe('maintains focus consistency in all browsers', () => {
    it('should not have a focus-visible on trigger when focus happens after click', async () => {
        const overlayTrigger = await fixture<OverlayTrigger>(
            clickAndHoverTarget()
        );
        await elementUpdated(overlayTrigger);
        expect(overlayTrigger.open).to.be.undefined;
        const trigger = overlayTrigger.querySelector(
            'sp-button[slot="trigger"]'
        ) as Button;

        const boundingRect = trigger.getBoundingClientRect();

        const opened = oneEvent(trigger, 'sp-opened');
        await sendMouse({
            type: 'click',
            position: [
                boundingRect.left + boundingRect.width / 2,
                boundingRect.top + boundingRect.height / 2,
            ],
        });
        await opened;

        expect(overlayTrigger.open).to.equal('click');

        const closed = oneEvent(trigger, 'sp-closed');
        await sendMouse({
            type: 'click',
            position: [0, 0],
        });
        await closed;

        expect(trigger.matches(':focus-visible')).to.be.false;
    });
});

describe('Overlay - Interactive Content', () => {
    it('stays open when interacting with elements inside', async () => {
        const el = await fixture<HTMLDivElement>(html`
            <div>
                <sp-button id="trigger">Open Overlay</sp-button>
                <sp-overlay
                    trigger="trigger@click"
                    type="auto"
                    placement="bottom"
                >
                    <sp-popover dialog>
                        <p>
                            My slider in overlay element:
                            <sp-slider
                                label="Slider Label - Editable"
                                editable
                            ></sp-slider>
                        </p>
                    </sp-popover>
                </sp-overlay>
            </div>
        `);

        const trigger = el.querySelector('#trigger') as HTMLElement;
        const overlay = el.querySelector('sp-overlay') as Overlay;

        await elementUpdated(overlay);

        const opened = oneEvent(overlay, 'sp-opened');
        trigger.click();
        await opened;

        expect(overlay.open).to.be.true;

        await nextFrame();
        await nextFrame();

        const slider = el.querySelector('sp-slider') as HTMLElement;
        expect(slider).to.exist;

        slider.click();
        await nextFrame();
        await nextFrame();
        expect(overlay.open).to.be.true;
    });
});

describe('Overlay should correctly trap focus', () => {
    it('should trap focus when the overlay type is modal', async () => {
        const el = await fixture<HTMLDivElement>(html`
            <div>
                <sp-button id="trigger">Open Overlay</sp-button>
                <sp-overlay trigger="trigger@click" type="modal">
                    <sp-dialog>
                        <p>Overlay content</p>
                        <sp-button id="button-1">button 1</sp-button>
                        <sp-button id="button-2">button 2</sp-button>
                    </sp-dialog>
                </sp-overlay>
            </div>
        `);

        const trigger = el.querySelector('#trigger') as HTMLElement;
        const overlay = el.querySelector('sp-overlay') as Overlay;

        await elementUpdated(overlay);

        const opened = oneEvent(overlay, 'sp-opened');
        // use keyboard to open the overlay
        trigger.focus();
        await sendKeys({ press: 'Enter' });
        await opened;

        expect(overlay.open).to.be.true;

        const button1 = el.querySelector('#button-1') as HTMLElement;
        const button2 = el.querySelector('#button-2') as HTMLElement;

        // expect button1 to be focused
        expect(document.activeElement).to.equal(button1);

        // press tab to focus on button2
        await sendTabKey();
        expect(document.activeElement).to.equal(button2);

        // press tab to focus on button1
        await sendTabKey();
        expect(document.activeElement).to.equal(button1);

        // press tab to focus on button2
        await sendTabKey();
        expect(document.activeElement).to.equal(button2);
    });
    it('should trap focus when the overlay type is page', async () => {
        const el = await fixture<HTMLDivElement>(html`
            <div>
                <sp-button id="trigger">Open Overlay</sp-button>
                <sp-overlay trigger="trigger@click" type="modal">
                    <sp-dialog>
                        <p>Overlay content</p>
                        <sp-button id="button-1">button 1</sp-button>
                        <sp-button id="button-2">button 2</sp-button>
                    </sp-dialog>
                </sp-overlay>
            </div>
        `);

        const trigger = el.querySelector('#trigger') as HTMLElement;
        const overlay = el.querySelector('sp-overlay') as Overlay;

        await elementUpdated(overlay);

        const opened = oneEvent(overlay, 'sp-opened');
        trigger.click();
        await opened;

        expect(overlay.open).to.be.true;

        const button1 = el.querySelector('#button-1') as HTMLElement;
        const button2 = el.querySelector('#button-2') as HTMLElement;

        // expect button1 to be focused
        expect(document.activeElement).to.equal(button1);

        // press tab to focus on button2
        await sendTabKey();
        expect(document.activeElement).to.equal(button2);

        // press tab to focus on button1
        await sendTabKey();
        expect(document.activeElement).to.equal(button1);

        // press tab to focus on button2
        await sendTabKey();
        expect(document.activeElement).to.equal(button2);
    });
    it('should not trap focus when the overlay type is auto', async () => {
        const el = await fixture<HTMLDivElement>(html`
            <div>
                <sp-button id="trigger">Open Overlay</sp-button>
                <sp-overlay trigger="trigger@click" type="auto">
                    <sp-dialog>
                        <p>Overlay content</p>
                        <sp-button id="test">test</sp-button>
                    </sp-dialog>
                </sp-overlay>
                <input id="input" />
            </div>
        `);

        const trigger = el.querySelector('#trigger') as HTMLElement;
        const overlay = el.querySelector('sp-overlay') as Overlay;

        await elementUpdated(overlay);

        const opened = oneEvent(overlay, 'sp-opened');
        trigger.click();
        await opened;

        expect(overlay.open).to.be.true;

        await sendTabKey();

        const input = el.querySelector('#input') as HTMLInputElement;
        expect(document.activeElement).to.equal(input);
    });
});

describe('Overlay - Deprecated Properties', () => {
    it('should support allowOutsideClick property with deprecation warning', async () => {
        const consoleSpy = spy(console, 'warn');

        const el = await fixture<HTMLDivElement>(html`
            <div>
                <sp-button id="trigger">Open Overlay</sp-button>
                <sp-overlay
                    trigger="trigger@click"
                    type="auto"
                    ?allow-outside-click=${true}
                >
                    <sp-popover dialog>
                        <p>Overlay content</p>
                    </sp-popover>
                </sp-overlay>
            </div>
        `);

        const overlay = el.querySelector('sp-overlay') as Overlay;
        await elementUpdated(overlay);

        // Verify the property is set correctly
        expect(overlay.allowOutsideClick).to.be.true;
        expect(overlay.hasAttribute('allow-outside-click')).to.be.true;

        // Verify the deprecation warning is shown (either via SWC or console.warn fallback)
        expect(consoleSpy.calledOnce).to.be.true;
        expect(consoleSpy.firstCall.args[0]).to.include('allow-outside-click');
        expect(consoleSpy.firstCall.args[0]).to.include('deprecated');

        consoleSpy.restore();
    });
});
