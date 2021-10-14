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
import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '@future-ui/popover/sp-popover.js';
import '@future-ui/action-button/sp-action-button.js';
import '@future-ui/icons-workflow/icons/sp-icon-magnify.js';
import '@future-ui/popover/sp-popover.js';
import { OverlayTrigger } from '../src/OverlayTrigger';
import { TriggerInteractions } from '../src/overlay-types';
import '@future-ui/overlay/overlay-trigger.js';
import { ActionButton } from '@future-ui/action-button';
import { executeServerCommand } from '@web/test-runner-commands';

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
        await executeServerCommand('send-mouse', {
            steps: [
                {
                    type: 'move',
                    position: [
                        bounds.left + bounds.width / 2,
                        bounds.top + bounds.height / 2,
                    ],
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
