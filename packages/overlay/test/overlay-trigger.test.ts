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
import { waitForPredicate, isVisible } from '../../../test/testing-helpers.js';
import { spy } from 'sinon';
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
import { OverlayTrigger, ActiveOverlay, TriggerInteractions, OverlayOpenCloseDetail } from '../';
import '@spectrum-web-components/button/sp-button.js';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/popover/sp-popover.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/theme/sp-theme.js';
import { Theme } from '@spectrum-web-components/theme';

function pressKey(code: string): void {
    const up = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        key: code,
        code,
    });
    document.dispatchEvent(up);
}

const pressEscape = (): void => pressKey('Escape');
const pressSpace = (): void => pressKey('Space');

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
                            tabindex="0"
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
                                        tabindex="0"
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
        while (activeOverlay) {
            activeOverlay.remove();
            activeOverlay = document.querySelector('active-overlay');
        }
        const outerTrigger = testDiv.querySelector(
            '#trigger'
        ) as OverlayTrigger;
        if (outerTrigger) {
            outerTrigger.removeAttribute('type');
        }
        const innerTrigger = testDiv.querySelector(
            '#inner-trigger'
        ) as OverlayTrigger;
        if (innerTrigger) {
            innerTrigger.removeAttribute('type');
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

    it('[disabled] closes a popover', async () => {
        const el = testDiv.querySelector('#trigger') as OverlayTrigger;
        const button = testDiv.querySelector('#outer-button') as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;

        expect(isVisible(outerPopover)).to.be.false;
        expect(el.disabled).to.be.false;

        expect(button).to.exist;
        button.click();

        await waitUntil(
            () => !(outerPopover.parentElement instanceof OverlayTrigger),
            'Wait for the DOM node to be stolen and reparented into the overlay'
        );

        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        expect(isVisible(outerPopover)).to.be.true;

        el.disabled = true;

        await waitUntil(
            () => outerPopover.parentElement instanceof OverlayTrigger,
            'Wait for the DOM node to be returned to the overlay trigger'
        );

        expect(isVisible(outerPopover)).to.be.false;
        expect(el.disabled).to.be.true;
    });

    it('resizes a popover', async () => {
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

        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('resize'));

        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        expect(isVisible(outerPopover)).to.be.true;
    });

    ['inline', 'modal', 'replace'].map((type: string) => {
        it(`opens a popover - [type="${type}"]`, async () => {
            const button = testDiv.querySelector(
                '#outer-button'
            ) as HTMLElement;
            const outerPopover = testDiv.querySelector(
                '#outer-popover'
            ) as Popover;
            const outerTrigger = testDiv.querySelector(
                '#trigger'
            ) as OverlayTrigger;
            outerTrigger.type = type as Extract<
                TriggerInteractions,
                'inline' | 'modal' | 'replace'
            >;
            await elementUpdated(outerTrigger);

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
    });

    it('does not open a hover popover when a click popover is open', async () => {
        const button = testDiv.querySelector('#outer-button') as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;
        const hoverContent = testDiv.querySelector(
            '#hover-content'
        ) as HTMLDivElement;

        expect(isVisible(outerPopover), 'outer popover not visible').to.be
            .false;
        expect(isVisible(hoverContent), 'hover popover not visible').to.be
            .false;

        expect(button).to.exist;
        button.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitUntil(
            () => !(outerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        expect(isVisible(outerPopover), 'outer popover visible').to.be.true;
        expect(isVisible(hoverContent), 'hover popover still not visible').to.be
            .false;

        button.dispatchEvent(
            new Event('mouseenter', {
                bubbles: true,
                composed: true,
            })
        );

        await nextFrame();
        await waitUntil(
            () => hoverContent.parentElement instanceof OverlayTrigger,
            'hover should not open'
        );

        expect(isVisible(outerPopover), 'outer popover visible again').to.be
            .true;
        expect(isVisible(hoverContent), 'hover popover not visible again').to.be
            .false;
    });

    it('does not open a popover when [disabled]', async () => {
        const trigger = testDiv.querySelector('#trigger') as OverlayTrigger;
        const root = trigger.shadowRoot ? trigger.shadowRoot : trigger;
        const triggerZone = root.querySelector('#trigger') as HTMLDivElement;
        const button = testDiv.querySelector('#outer-button') as Button;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;

        expect(trigger.disabled).to.be.false;
        button.click();
        await waitUntil(
            () => !(outerPopover.parentElement instanceof OverlayTrigger),
            'outer hoverConent stolen and reparented into the overlay'
        );
        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        document.body.click();
        await waitUntil(
            () => outerPopover.parentElement instanceof OverlayTrigger,
            'outter hoverConent returned to OverlayTrigger'
        );
        expect(outerPopover.parentElement).to.be.an.instanceOf(OverlayTrigger);

        trigger.disabled = true;
        await elementUpdated(trigger);

        expect(trigger.disabled).to.be.true;
        expect(trigger.hasAttribute('disabled')).to.be.true;
        button.click();
        await waitUntil(
            () => outerPopover.parentElement instanceof OverlayTrigger,
            'outter hoverConent never left'
        );
        expect(outerPopover.parentElement).to.be.an.instanceOf(OverlayTrigger);
        triggerZone.dispatchEvent(new Event('mouseenter'));
        await waitUntil(
            () => outerPopover.parentElement instanceof OverlayTrigger,
            'outter hoverConent never left'
        );
        expect(outerPopover.parentElement).to.be.an.instanceOf(OverlayTrigger);

        trigger.disabled = false;
        await elementUpdated(trigger);

        expect(trigger.disabled).to.be.false;
        expect(trigger.hasAttribute('disabled')).to.be.false;
        button.click();
        await waitUntil(
            () => !(outerPopover.parentElement instanceof OverlayTrigger),
            'outer hoverConent stolen and reparented into the overlay'
        );
        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        button.click();
        await waitUntil(
            () => outerPopover.parentElement instanceof OverlayTrigger,
            'outter hoverConent returned to OverlayTrigger'
        );
        expect(outerPopover.parentElement).to.be.an.instanceOf(OverlayTrigger);
    });

    it('opens a nested popover', async () => {
        const button = testDiv.querySelector('#outer-button') as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;
        const innerPopover = testDiv.querySelector('#inner-popover') as Popover;

        expect(isVisible(outerPopover)).to.be.false;
        expect(isVisible(innerPopover)).to.be.false;

        expect(button).to.exist;
        button.click();

        await waitUntil(
            () => !(outerPopover.parentElement instanceof OverlayTrigger),
            'outer hoverConent stolen and reparented into the overlay'
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

        await waitUntil(
            () => !(innerPopover.parentElement instanceof OverlayTrigger),
            'inner hoverConent stolen and reparented into the overlay'
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;
    });

    it('focus previous "modal" when closing nested "modal"', async () => {
        const button = testDiv.querySelector('#outer-button') as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;
        const innerPopover = testDiv.querySelector('#inner-popover') as Popover;
        const outerTrigger = testDiv.querySelector(
            '#trigger'
        ) as OverlayTrigger;
        const innerTrigger = testDiv.querySelector(
            '#inner-trigger'
        ) as OverlayTrigger;

        outerTrigger.type = 'modal';
        innerTrigger.type = 'modal';

        expect(isVisible(outerPopover), 'outer popover starts closed').to.be
            .false;
        expect(isVisible(innerPopover), 'inner popover starts closed').to.be
            .false;

        expect(button).to.exist;
        button.click();

        await waitUntil(
            () => !(outerPopover.parentElement instanceof OverlayTrigger),
            'outer hoverConent stolen and reparented into the overlay'
        );

        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        expect(isVisible(outerPopover), 'outer popover opens').to.be.true;
        expect(isVisible(innerPopover), 'inner popover stays closed').to.be
            .false;

        const innerButton = document.querySelector(
            '#inner-button'
        ) as HTMLElement;

        innerButton.click();

        await waitUntil(
            () => !(innerPopover.parentElement instanceof OverlayTrigger),
            'inner hoverConent stolen and reparented into the overlay'
        );

        expect(isVisible(outerPopover), 'outer popover stays open').to.be.true;
        expect(isVisible(innerPopover), 'inner popover opens').to.be.true;

        pressEscape();

        await waitUntil(
            () => innerPopover.parentElement instanceof OverlayTrigger,
            'inner hoverConent returned to OverlayTrigger'
        );

        expect(
            document.activeElement === outerPopover,
            'outer popover recieved focus'
        ).to.be.true;
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

        await waitUntil(
            () => !(outerPopover.parentElement instanceof OverlayTrigger),
            'outer content stolen and reparented'
        );

        innerButton.click();

        await waitUntil(
            () => !(innerPopover.parentElement instanceof OverlayTrigger),
            'inner content stolen and reparented'
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;

        pressSpace();

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;

        pressEscape();

        await waitUntil(
            () => innerPopover.parentElement instanceof OverlayTrigger,
            'inner content returned'
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.false;

        pressEscape();

        await waitUntil(
            () => outerPopover.parentElement instanceof OverlayTrigger,
            'outer content returned'
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

        await waitUntil(
            () => !(outerPopover.parentElement instanceof OverlayTrigger),
            'outer content stolen and reparented'
        );

        innerButton.click();

        await waitUntil(
            () => !(innerPopover.parentElement instanceof OverlayTrigger),
            'inner content stolen and reparented'
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
        await waitUntil(
            () => innerPopover.parentElement instanceof OverlayTrigger,
            'outer content returned'
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.false;

        document.body.click();

        // Wait for the DOM node to be put back in its original place
        await waitUntil(
            () => outerPopover.parentElement instanceof OverlayTrigger,
            'inner content returned'
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
        await nextFrame();
        triggerShadowDiv.dispatchEvent(mouseLeave);

        await waitUntil(
            () => isVisible(hoverContent) === false,
            'hoverContent should still not be visible'
        );
    });

    it('acquires a `color` and `size` from `sp-theme`', async () => {
        const el = await fixture<Theme>(html`
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

    it('dispatches events on open/close', async () => {
        const openedSpy = spy();
        const closedSpy = spy();

        const el = testDiv.querySelector('#trigger') as OverlayTrigger;
        const outerButton = testDiv.querySelector(
            '#outer-button'
        ) as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;

        el.addEventListener('sp-opened',openedSpy);
        el.addEventListener('sp-closed',closedSpy);

        outerButton.click();

        await waitUntil(
            () => !(outerPopover.parentElement instanceof OverlayTrigger),
            'outer content stolen and reparented'
        );

        await waitUntil(
            () => openedSpy.calledOnce,
            'opened event sent'
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(closed).to.be.false;

        const openedEvent = openedSpy.args[0][0] as CustomEvent<OverlayOpenCloseDetail>;
        expect(openedEvent.detail.interaction).to.equal('click');

        document.body.click();

        // Wait for the DOM node to be put back in its original place
        await waitUntil(
            () => outerPopover.parentElement instanceof OverlayTrigger,
            'inner content returned'
        );

        await waitUntil(
            () => closedSpy.calledOnce,
            'closed event sent'
        );

        const closedEvent = closedSpy.args[0][0] as CustomEvent<OverlayOpenCloseDetail>;
        expect(closedEvent.detail.interaction).to.equal('click');

        expect(isVisible(outerPopover)).to.be.false;
    });
});
