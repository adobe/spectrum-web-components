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
    fixture,
    html,
    oneEvent,
} from '@open-wc/testing';
import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { OverlayTrigger } from '@spectrum-web-components/overlay/src/OverlayTrigger.js';
import { TriggerInteractions } from '@spectrum-web-components/overlay/src/overlay-types.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { Tooltip } from '@spectrum-web-components/tooltip/src/Tooltip.js';
import { sendKeys } from '@web/test-runner-commands';
import { sendMouse } from '../../../test/plugins/browser.js';
import {
    ignoreResizeObserverLoopError,
    sendShiftTabKey,
    sendTabKey,
} from '../../../test/testing-helpers.js';
import { clickAndHoverTargets, deep } from '../stories/overlay.stories.js';

ignoreResizeObserverLoopError(before, after);

describe('Overlay Trigger - Hover and Click', () => {
    it('toggles open and closed on click', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger triggered-by="click hover">
                <sp-button slot="trigger">Click and hover</sp-button>
                <sp-popover slot="click-content" dialog tip>
                    Popover content
                </sp-popover>
                <sp-tooltip slot="hover-content" delayed>
                    Tooltip content
                </sp-tooltip>
            </overlay-trigger>
        `);
        const trigger = el.querySelector(
            '[slot=trigger]'
        ) as unknown as ActionButton;
        let interaction: TriggerInteractions;

        // repeatedly click to toggle the popover
        for (let i = 0; i < 3; i++) {
            const openedEvent = oneEvent(el, 'sp-opened');
            trigger.click();
            interaction = (await openedEvent).detail.interaction;

            expect(interaction).equals('auto');

            const closedEvent = oneEvent(el, 'sp-closed');
            trigger.click();
            interaction = (await closedEvent).detail.interaction;

            expect(interaction).equals('auto');
        }
    });
    it('toggles on click after hover', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger triggered-by="click hover">
                <sp-button slot="trigger">Click and hover</sp-button>
                <sp-popover slot="click-content" dialog tip>
                    Popover content
                </sp-popover>
                <sp-tooltip slot="hover-content" delayed>
                    Tooltip content
                </sp-tooltip>
            </overlay-trigger>
        `);
        const trigger = el.querySelector(
            '[slot=trigger]'
        ) as unknown as ActionButton;
        const clickContent = el.querySelector(
            '[slot="click-content"]'
        ) as HTMLElement;
        const bounds = el.getBoundingClientRect();
        let interaction: TriggerInteractions;

        // hover over the button to trigger the tooltip
        const hoveredEvent = oneEvent(el, 'sp-opened');
        await sendMouse([
            {
                type: 'move',
                position: [bounds.left - 1, bounds.top - 1],
            },
            {
                type: 'move',
                position: [bounds.left, bounds.top],
            },
            {
                type: 'move',
                position: [bounds.left + 1, bounds.top + 1],
            },
        ]);
        interaction = (await hoveredEvent).detail.interaction;

        expect(interaction).equals('hint');

        // repeatedly click to toggle the popover
        for (let i = 0; i < 3; i++) {
            const openedEvent = oneEvent(clickContent, 'sp-opened');
            trigger.click();
            interaction = (await openedEvent).detail.interaction;

            expect(interaction).equals('auto');

            const closedEvent = oneEvent(clickContent, 'sp-closed');
            trigger.click();
            interaction = (await closedEvent).detail.interaction;

            expect(interaction).equals('auto');
        }
    });
    it('persists a hover overlay when clicking its trigger and closes the next highest overlay on the stack', async () => {
        const root = document.createElement('div');
        root.style.width = '100vw';
        root.style.height = '100vh';
        root.style.display = 'grid';
        root.style.placeContent = 'center';
        const test = await fixture(clickAndHoverTargets(), {
            parentNode: root,
        });

        const overlayTrigger1 = test.querySelector(
            'overlay-trigger[placement="right"]'
        ) as OverlayTrigger;
        const overlayTrigger2 = test.querySelector(
            'overlay-trigger[placement="left"]'
        ) as OverlayTrigger;

        await elementUpdated(overlayTrigger1);
        await elementUpdated(overlayTrigger2);

        const trigger1 = overlayTrigger1.querySelector(
            '.friendly-target'
        ) as HTMLButtonElement;
        const trigger2 = overlayTrigger2.querySelector(
            '.friendly-target'
        ) as HTMLButtonElement;
        const rect1 = trigger1.getBoundingClientRect();
        const rect2 = trigger2.getBoundingClientRect();
        let opened = oneEvent(trigger1, 'sp-opened');
        await sendMouse({
            type: 'click',
            position: [
                rect1.left + rect1.width / 2,
                rect1.top + rect1.height / 2,
            ],
        });
        await opened;

        expect(overlayTrigger1.open).to.equal('click');
        expect(overlayTrigger2.open).to.undefined;

        opened = oneEvent(trigger2, 'sp-opened');
        await sendMouse({
            type: 'move',
            position: [
                rect2.left + rect2.width / 2,
                rect2.top + rect2.height / 2,
            ],
        });
        await opened;

        expect(overlayTrigger1.open).to.equal('click');
        expect(overlayTrigger2.open).to.equal('hover');

        const closed = oneEvent(trigger1, 'sp-closed');
        await sendMouse({
            type: 'click',
            position: [
                rect2.left + rect2.width / 2,
                rect2.top + rect2.height / 2,
            ],
        });
        await closed;

        expect(overlayTrigger1.open).to.be.undefined;
        expect(overlayTrigger2.open).to.equal('hover');
    });
    it('does not close ancestor "click" overlays on `click`', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${deep()}</div>
        `);
        const el = test.querySelector('overlay-trigger') as OverlayTrigger;
        const trigger = test.querySelector('sp-button') as Button;
        const button = el.querySelector('sp-action-button') as ActionButton;
        const button2 = el.querySelector(
            'sp-action-button:nth-of-type(2)'
        ) as ActionButton;
        const tooltip = button.querySelector('sp-tooltip') as Tooltip;

        expect(el.open).to.be.undefined;
        expect(tooltip.open).to.be.false;

        const opened = oneEvent(el, 'sp-opened');
        trigger.focus();
        // For `:focus-visible` heuristic.
        await sendTabKey();
        await sendShiftTabKey();
        await sendKeys({ press: 'Space' });
        await opened;

        expect(el.open).to.equal('click');
        expect(tooltip.open).to.be.true;

        button.click();

        await aTimeout(200);

        expect(el.open).to.equal('click');
        expect(tooltip.open).to.be.true;

        let closed = oneEvent(button, 'sp-closed');
        expect(document.activeElement === button, `button focused`).to.be.true;
        await sendTabKey();
        expect(document.activeElement === button2, `button focused`).to.be.true;
        await closed;

        expect(el.open).to.equal('click');
        expect(tooltip.open).to.be.false;

        closed = oneEvent(el, 'sp-closed');
        await sendMouse({
            type: 'click',
            position: [1, 1],
        });
        await closed;

        expect(el.open, '"click" overlay no longer open').to.be.undefined;
        expect(tooltip.open).to.be.false;
    });
});
