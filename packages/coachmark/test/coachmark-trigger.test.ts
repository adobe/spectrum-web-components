/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@spectrum-web-components/coachmark/sp-coachmark-trigger.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import {
    CoachIndicator,
    CoachmarkItem,
    CoachmarkTrigger,
} from '@spectrum-web-components/coachmark';
import { Overlay } from '@spectrum-web-components/overlay';
import { tree } from '../stories/images.js';
import { sendMouse } from '../../../test/plugins/browser.js';

const defaultItem: CoachmarkItem = {
    heading: 'Heading',
    content: 'Content',
    src: tree,
    mediaType: 'image',
};

describe('CoachmarkTrigger', () => {
    const item = defaultItem;
    it('loads default coachmark-trigger accessibly', async () => {
        const interaction = 'hover';
        const el = await fixture<CoachmarkTrigger>(html`
            <sp-coachmark-trigger
                placement="bottom-end"
                .item=${item}
                .triggerInteraction=${interaction}
            >
                <sp-coach-indicator slot="trigger"></sp-coach-indicator>
            </sp-coachmark-trigger>
        `);
        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('opens coachmark-trigger on programmatic click', async () => {
        const interaction = 'click';
        const el = await fixture<CoachmarkTrigger>(html`
            <sp-coachmark-trigger
                placement="bottom-end"
                .item=${item}
                .triggerInteraction=${interaction}
            >
                <sp-coach-indicator slot="trigger"></sp-coach-indicator>
            </sp-coachmark-trigger>
        `);
        const triggerEl = el.querySelector('[slot=trigger]') as CoachIndicator;
        const overlay = el.shadowRoot.querySelector(
            'sp-overlay'
        ) as unknown as Overlay;

        await elementUpdated(el);

        expect(overlay.open).to.be.false;
        expect(el.open).to.be.false;

        triggerEl.click();

        await nextFrame();

        expect(overlay.open).to.be.true;
        expect(el.open).to.be.true;

        triggerEl.click();

        await nextFrame();

        expect(overlay.open).to.be.false;
        expect(el.open).to.be.false;
    });
    it('opens coachmark-trigger on sendMouse on the trigger element', async () => {
        const interaction = 'hover';
        const el = await fixture<CoachmarkTrigger>(html`
            <sp-coachmark-trigger
                placement="bottom-end"
                .item=${item}
                .triggerInteraction=${interaction}
            >
                <sp-coach-indicator slot="trigger"></sp-coach-indicator>
            </sp-coachmark-trigger>
        `);
        const triggerEl = el.querySelector('[slot=trigger]') as CoachIndicator;
        const overlay = el.shadowRoot.querySelector(
            'sp-overlay'
        ) as unknown as Overlay;

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        expect(overlay.open).to.be.false;
        expect(el.open).to.be.false;

        const beforeToggleEvent = oneEvent(overlay, 'beforetoggle');

        const pos = triggerEl.getBoundingClientRect();

        await sendMouse({
            steps: [
                {
                    position: [pos.x + 2, pos.y + 2],
                    type: 'move',
                },
            ],
        });

        await beforeToggleEvent;

        expect(overlay.open).to.be.true;
        expect(el.open).to.be.true;
    });
    it('allows keyboard interaction on buttons in the coachmark-trigger', async () => {
        const interaction = 'click';
        const el = await fixture<CoachmarkTrigger>(html`
            <sp-coachmark-trigger
                placement="bottom-end"
                .item=${item}
                .triggerInteraction=${interaction}
            >
                <sp-coach-indicator slot="trigger"></sp-coach-indicator>
            </sp-coachmark-trigger>
        `);
        const triggerEl = el.querySelector(
            '[slot="trigger"]'
        ) as CoachIndicator;

        await elementUpdated(el);
        expect(el.open).to.be.false;
        triggerEl.click();
        await sendKeys({
            press: 'Enter',
        });
        await nextFrame();

        expect(el.open).to.be.true;

        await sendKeys({
            press: 'Tab',
        });
    });
});
