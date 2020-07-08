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
import { waitForPredicate, isVisible } from '../../../test/testing-helpers';
import {
    fixture,
    aTimeout,
    html,
    expect,
    nextFrame,
    elementUpdated,
    waitUntil,
} from '@open-wc/testing';

import '../overlay-trigger.js';
import { OverlayTrigger, ActiveOverlay } from '../';
import '@spectrum-web-components/button/sp-button.js';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/popover/sp-popover.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/theme/sp-theme.js';

function pressEscape(): void {
    const up = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        key: 'Escape',
    });
    document.dispatchEvent(up);
}

describe('Overlay Trigger', () => {
    let testDiv!: HTMLDivElement;

    beforeEach(async () => {
        testDiv = await fixture<HTMLDivElement>(
            html`
                <div>
                    <style>
                        body {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        overlay-trigger {
                            flex: none;
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
                            dialog
                            slot="click-content"
                            direction="bottom"
                            tip
                            open
                        >
                            <div class="options-popover-content">
                                <overlay-trigger
                                    id="inner-trigger"
                                    placement="bottom"
                                >
                                    <sp-button id="inner-button" slot="trigger">
                                        Press Me
                                    </sp-button>
                                    <sp-popover
                                        id="inner-popover"
                                        dialog
                                        slot="click-content"
                                        direction="bottom"
                                        tip
                                        open
                                    >
                                        <div class="options-popover-content">
                                            Another Popover
                                        </div>
                                    </sp-popover>
                                </overlay-trigger>
                            </div>
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
        await elementUpdated(testDiv);
    });

    afterEach(async () => {
        let activeOverlay = document.querySelector('active-overlay');
        while (activeOverlay !== null) {
            activeOverlay.remove();
            activeOverlay = document.querySelector('active-overlay');
        }
    });

    it('loads', async () => {
        const popover = testDiv.querySelector('sp-popover');
        if (!(popover instanceof Popover))
            throw new Error('popover is not an instance of Popover');

        expect(popover).to.exist;
        expect(popover.shadowRoot).to.exist;
        expect(popover.parentElement).to.be.an.instanceOf(OverlayTrigger);
    });

    it('opens a popover', async () => {
        const button = testDiv.querySelector('#outer-button') as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;

        expect(isVisible(outerPopover)).to.be.false;

        expect(button).to.exist;
        button.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(outerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        expect(isVisible(outerPopover)).to.be.true;
    });

    it('does not open a hover popover when a click popover is open', async () => {
        const button = testDiv.querySelector('#outer-button') as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;
        const hoverContent = testDiv.querySelector(
            '#hover-content'
        ) as HTMLDivElement;

        expect(isVisible(outerPopover)).to.be.false;
        expect(isVisible(hoverContent)).to.be.false;

        expect(button).to.exist;
        button.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(outerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(hoverContent)).to.be.false;

        button.dispatchEvent(
            new Event('mouseenter', {
                bubbles: true,
                composed: true,
            })
        );

        await nextFrame();

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(hoverContent)).to.be.false;
    });

    it('does not open a popover when [disabled]', async () => {
        const trigger = testDiv.querySelector('#trigger') as OverlayTrigger;
        const root = trigger.shadowRoot ? trigger.shadowRoot : trigger;
        const triggerZone = root.querySelector('#trigger') as HTMLDivElement;
        const styles = getComputedStyle(triggerZone);

        expect(trigger.disabled).to.be.false;
        expect(styles.pointerEvents).to.equal('auto');

        trigger.disabled = true;
        await elementUpdated(trigger);

        expect(trigger.disabled).to.be.true;
        expect(styles.pointerEvents).to.equal('none');
    });

    it('opens a nested popover', async () => {
        const button = testDiv.querySelector('#outer-button') as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;
        const innerPopover = testDiv.querySelector('#inner-popover') as Popover;

        expect(isVisible(outerPopover)).to.be.false;
        expect(isVisible(innerPopover)).to.be.false;

        expect(button).to.exist;
        button.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(outerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.false;

        const innerButton = document.querySelector(
            '#inner-button'
        ) as HTMLElement;

        innerButton.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(innerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;
    });

    it('escape closes an open popover', async () => {
        const innerButton = testDiv.querySelector(
            '#inner-button'
        ) as HTMLElement;
        const outerButton = testDiv.querySelector(
            '#outer-button'
        ) as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;
        const innerPopover = testDiv.querySelector('#inner-popover') as Popover;

        outerButton.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(outerPopover.parentElement instanceof OverlayTrigger)
        );

        innerButton.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(innerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;

        pressEscape();

        // Wait for the DOM node to be put back in its original place
        await waitForPredicate(
            () => innerPopover.parentElement instanceof OverlayTrigger
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.false;

        pressEscape();

        // Wait for the DOM node to be put back in its original place
        await waitForPredicate(
            () => outerPopover.parentElement instanceof OverlayTrigger
        );

        expect(isVisible(outerPopover)).to.be.false;
        expect(isVisible(innerPopover)).to.be.false;
    });

    it('click closes an open popover', async () => {
        const innerButton = testDiv.querySelector(
            '#inner-button'
        ) as HTMLElement;
        const outerButton = testDiv.querySelector(
            '#outer-button'
        ) as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;
        const innerPopover = testDiv.querySelector('#inner-popover') as Popover;

        outerButton.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(outerPopover.parentElement instanceof OverlayTrigger)
        );

        innerButton.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(innerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;

        // Test that clicking in the overlay content does not close the overlay
        // 200ms is slightly more than the overlay animation fade out time (130ms)
        innerPopover.click();
        await aTimeout(200);

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;

        document.body.click();

        // Wait for the DOM node to be put back in its original place
        await waitForPredicate(
            () => innerPopover.parentElement instanceof OverlayTrigger
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.false;

        document.body.click();

        // Wait for the DOM node to be put back in its original place
        await waitForPredicate(
            () => outerPopover.parentElement instanceof OverlayTrigger
        );

        expect(isVisible(outerPopover)).to.be.false;
        expect(isVisible(innerPopover)).to.be.false;
    });

    it('opens a hover popover', async () => {
        const outerButton = testDiv.querySelector(
            '#outer-button'
        ) as HTMLElement;
        const hoverContent = testDiv.querySelector(
            '#hover-content'
        ) as HTMLElement;
        const outerTrigger = testDiv.querySelector('#trigger') as HTMLElement;

        let triggerShadowDiv: HTMLElement | null = null;
        if (outerTrigger.shadowRoot) {
            triggerShadowDiv = outerTrigger.shadowRoot.querySelector('div');
        }

        expect(triggerShadowDiv).to.exist;
        if (!triggerShadowDiv) return;

        expect(outerButton).to.exist;
        expect(hoverContent).to.exist;

        expect(isVisible(hoverContent)).to.be.false;

        const mouseEnter = new MouseEvent('mouseenter');
        triggerShadowDiv.dispatchEvent(mouseEnter);

        // Wait for the DOM node to be stolen from its original place
        await waitUntil(
            () => !(hoverContent.parentElement instanceof OverlayTrigger),
            'hoverContent stolen'
        );

        expect(isVisible(hoverContent)).to.be.true;

        const mouseLeave = new MouseEvent('mouseleave');
        triggerShadowDiv.dispatchEvent(mouseLeave);

        // Wait for the DOM node to be put back in its original place
        await waitUntil(
            () => hoverContent.parentElement instanceof OverlayTrigger,
            'hoverContent returned'
        );

        expect(isVisible(hoverContent)).to.be.false;
    });

    it('closes a hover popover', async () => {
        const outerButton = testDiv.querySelector(
            '#outer-button'
        ) as HTMLElement;
        const hoverContent = testDiv.querySelector(
            '#hover-content'
        ) as HTMLElement;
        const outerTrigger = testDiv.querySelector('#trigger') as HTMLElement;

        let triggerShadowDiv: HTMLElement | null = null;
        if (outerTrigger.shadowRoot) {
            triggerShadowDiv = outerTrigger.shadowRoot.querySelector('div');
        }

        expect(triggerShadowDiv).to.exist;
        if (!triggerShadowDiv) return;

        expect(outerButton).to.exist;
        expect(hoverContent).to.exist;

        expect(isVisible(hoverContent), 'hoverContent should not be visible').to
            .be.false;

        const mouseEnter = new MouseEvent('mouseenter');
        const mouseLeave = new MouseEvent('mouseleave');
        triggerShadowDiv.dispatchEvent(mouseEnter);
        triggerShadowDiv.dispatchEvent(mouseLeave);

        await waitUntil(
            () => isVisible(hoverContent) === false,
            'hoverContent should still not be visible'
        );
    });
    it('acquires a `color` and `size` from `sp-theme`', async () => {
        const el = await fixture<HTMLDivElement>(html`
            <sp-theme color="dark">
                <sp-theme color="light">
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
                            dialog
                            slot="click-content"
                            direction="bottom"
                            tip
                            open
                        >
                            Popover content!
                        </sp-popover>
                    </overlay-trigger>
                </sp-theme>
            </sp-theme>
        `);

        await elementUpdated(el);

        expect(document.querySelector('active-overlay')).to.be.null;

        const button = el.querySelector('sp-button') as Button;
        button.click();

        await elementUpdated(el);

        const overlay = document.querySelector(
            'active-overlay'
        ) as ActiveOverlay;

        expect(overlay).to.exist;
        expect(overlay.color).to.not.equal('dark');
        expect(overlay.color).to.equal('light');
    });
});
