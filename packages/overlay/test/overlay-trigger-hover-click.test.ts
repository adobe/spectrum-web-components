/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { OverlayTrigger } from '@spectrum-web-components/overlay/src/OverlayTrigger';
import { TriggerInteractions } from '@spectrum-web-components/overlay/src/overlay-types';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { ActionButton } from '@spectrum-web-components/action-button';
import { sendMouse } from '../../../test/plugins/browser.js';

describe('Overlay Trigger - Hover and Click', () => {
    it('toggles open and closed on click', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger>
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

            expect(interaction).equals('click');

            const closedEvent = oneEvent(el, 'sp-closed');
            trigger.click();
            interaction = (await closedEvent).detail.interaction;

            expect(interaction).equals('click');
        }
    });
    it('toggles on click after hover', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger>
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
        const bounds = el.getBoundingClientRect();
        let interaction: TriggerInteractions;

        // hover over the button to trigger the tooltip
        const hoveredEvent = oneEvent(el, 'sp-opened');
        sendMouse({
            steps: [
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
            ],
        });
        interaction = (await hoveredEvent).detail.interaction;

        expect(interaction).equals('hover');

        // repeatedly click to toggle the popover
        for (let i = 0; i < 3; i++) {
            const openedEvent = oneEvent(el, 'sp-opened');
            trigger.click();
            interaction = (await openedEvent).detail.interaction;

            expect(interaction).equals('click');

            const closedEvent = oneEvent(el, 'sp-closed');
            trigger.click();
            interaction = (await closedEvent).detail.interaction;

            expect(interaction).equals('click');
        }
    });
});
