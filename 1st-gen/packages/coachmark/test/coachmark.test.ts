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
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
} from '@open-wc/testing';

import { Coachmark, CoachmarkItem } from '@spectrum-web-components/coachmark';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import '@spectrum-web-components/coachmark/sp-coachmark.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import { spy } from 'sinon';
import { Button } from '@spectrum-web-components/button';
import {
    Default,
    InTour,
    single,
    withImage,
    withKeys,
    withShortCut,
} from '../stories/coachmark.stories.js';

const defaultItem: CoachmarkItem = {
    heading: 'I am the heading for Coachmark',
    content: 'I am the content for this Coachmark',
};
describe('Coachmark', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Coachmark>(html`
                <sp-coachmark
                    id="coachmark"
                    .content=${{
                        title: defaultItem.heading,
                        description: defaultItem.content,
                    }}
                ></sp-coachmark>
            `)
    );
    it('loads default coachmark accessibly', async () => {
        const el = await fixture<Coachmark>(Default());
        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });
    it('displays the slotted content as `.title`', async () => {
        const testHeading = 'Coachmark with Text Only';
        const el = await fixture<Coachmark>(Default());

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const headingSlot = root.querySelector(
            '[name="title"]'
        ) as HTMLSlotElement;

        expect(headingSlot, 'did not find slot element').to.not.be.null;
        const nodes = headingSlot.assignedNodes();
        const divElement = nodes.find(
            (node) => (node as HTMLElement).id === 'heading'
        );
        expect(divElement, 'did not find div element').to.not.be.null;
        expect((divElement as HTMLDivElement).textContent).to.contain(
            testHeading,
            'the slotted content renders in the element'
        );
    });
    it('if in tour coachmark loads with pagination with previous, next buttons and action menu', async () => {
        const el = await fixture<Coachmark>(
            InTour(
                {
                    open: true,
                    heading: 'Coachmark In Tour',
                    content: 'This is a Coachmark with nothing but text in it.',
                },
                {}
            )
        );
        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        const stepCount = el.shadowRoot.querySelector(
            'span[aria-live="polite"]'
        );

        const stepCountSlot = el.querySelector(
            '[slot="step-count"]'
        ) as HTMLSlotElement;
        expect(stepCountSlot?.textContent?.trim()).to.equal('2 of 8');

        expect(stepCount?.textContent);
        const nextButton = el.shadowRoot.querySelector(
            'sp-button[variant="primary"'
        );
        expect(nextButton).to.not.be.undefined;
        expect(nextButton?.textContent?.trim()).to.equal('Next');

        const prevButton = el.shadowRoot.querySelector(
            'sp-button[variant="secondary"'
        );
        expect(prevButton).to.not.be.undefined;
        expect(prevButton?.textContent?.trim()).to.equal('Previous');
    });
    it('loads pagination when total step count is greater than 1', async () => {
        const el = await fixture<Coachmark>(
            InTour(
                {
                    open: true,
                    heading: 'Coachmark In Tour',
                    content: 'This is a Coachmark with nothing but text in it.',
                    currentStep: 2,
                    totalSteps: 8,
                },
                {}
            )
        );
        await elementUpdated(el);
        const stepCountSlot = el.querySelector(
            '[slot="step-count"]'
        ) as HTMLSlotElement;
        expect(stepCountSlot?.textContent?.trim()).to.equal('2 of 8');

        await expect(el).to.be.accessible();
    });
    it('loads primary button with text "Ok" for a single coachmark', async () => {
        const el = await fixture<Coachmark>(single());

        await elementUpdated(el);
        const okayButton = el.shadowRoot.querySelector(
            'sp-button[variant="primary"'
        );
        expect(okayButton).to.not.be.null;
        expect(okayButton?.textContent?.trim()).to.equal('Ok');
    });
    it('renders modifier keys with joiner', async () => {
        const modifierKeys = ['⇧ Shift', '⌘'];
        const el = await fixture<Coachmark>(
            withKeys({
                modifierKeys,
                heading: 'Coachmark with Keys',
                content: 'This is a Coachmark with nothing but text in it.',
            })
        );
        await elementUpdated(el);
        const modifier = el.shadowRoot.querySelector('span[type="modifier"]');
        expect(modifier).to.not.be.undefined;
        expect(modifier?.textContent?.trim()).to.include('⇧ Shift');
        const joiner = el.shadowRoot.querySelector('span[class="plus"]');
        expect(joiner).to.not.be.undefined;
        expect(joiner?.textContent?.trim()).to.include('+');
    });
    it('renders with shortcut', async () => {
        const el = await fixture<Coachmark>(
            withShortCut({
                currentStep: 1,
                totalSteps: 8,
            })
        );
        await elementUpdated(el);

        const shortcutKey = el.shadowRoot.querySelector(
            'span[type="shortcut"]'
        );
        expect(shortcutKey).to.not.be.undefined;
        expect(shortcutKey?.textContent?.trim()).to.include('Z');
    });
    it('renders content with image asset', async () => {
        const el = await fixture<Coachmark>(
            withImage({
                currentStep: 1,
                totalSteps: 8,
            })
        );
        await elementUpdated(el);
        const imageElement = el.shadowRoot.querySelector(
            'img[src="https://picsum.photos/id/237/200/300"'
        );
        expect(imageElement).not.to.be.undefined;
    });
    it('in tour dispatches `primary` and `secondary`', async () => {
        const primarySpy = spy();
        const secondarySpy = spy();
        const handlePrimary = (): void => primarySpy();
        const handleSecondary = (): void => secondarySpy();
        const el = await fixture<Coachmark>(
            InTour(
                {
                    open: true,
                    heading: 'Coachmark in Tour',
                    content: 'This is a Coachmark with nothing but text in it.',
                },
                {}
            )
        );
        el.addEventListener('primary', handlePrimary);
        el.addEventListener('secondary', handleSecondary);

        await elementUpdated(el);
        expect(primarySpy.called).to.be.false;
        expect(secondarySpy.called).to.be.false;

        const primaryButton = el.shadowRoot.querySelector(
            '[variant="primary"]'
        ) as Button;
        const secondaryButton = el.shadowRoot.querySelector(
            '[variant="secondary"]'
        ) as Button;
        primaryButton.click();

        await elementUpdated(el);
        expect(primarySpy.called, 'dispatched `primary`').to.be.true;
        expect(secondarySpy.called).to.be.false;

        secondaryButton.click();

        await elementUpdated(el);
        expect(primarySpy.callCount).to.equal(1);
        expect(secondarySpy.called, 'dispatched `secondary`').to.be.true;
    });
});
