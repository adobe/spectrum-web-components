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

import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';

import '@spectrum-web-components/coachmark/sp-coachmark.js';
import {
    CoachIndicator,
    Coachmark,
    CoachmarkItem,
    CoachmarkTrigger,
} from '@spectrum-web-components/coachmark';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import '@spectrum-web-components/coachmark/sp-coachmark-trigger.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import { sendKeys } from '@web/test-runner-commands';
import { Overlay } from '@spectrum-web-components/overlay';
import { sendMouse } from '../../../test/plugins/browser.js';

const defaultItem: CoachmarkItem = {
    heading: 'I am the heading for Coachmark',
    content: 'I am the content for this Coachmark',
    mediaType: 'image',
};
describe('Coachmark', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Coachmark>(
                html`
                    <sp-coachmark
                        id="coachmark"
                        .content=${{
                            title: defaultItem.heading,
                            description: defaultItem.content,
                        }}
                    ></sp-coachmark>
                `
            )
    );
    it('loads default coachmark accessibly', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark
                    id="coachmark"
                    .content=${{
                        title: defaultItem.heading,
                        description: defaultItem.content,
                    }}
                ></sp-coachmark>
            `
        );
        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });
    it('displays the slotted content as `.title`', async () => {
        const testHeading = 'This is a test heading';
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark id="coachmark">
                    <h1 slot="title">${testHeading}</h1>
                    <div slot="content">Hello I am a content in slot</div>
                </sp-coachmark>
            `
        );

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const headingSlot = root.querySelector(
            '[name="title"]'
        ) as HTMLSlotElement;

        expect(headingSlot, 'did not find slot element').to.not.be.null;
        const nodes = headingSlot.assignedNodes();
        const h1Element = nodes.find(
            (node) => (node as HTMLElement).tagName === 'H1'
        );
        expect(h1Element, 'did not find H1 element').to.not.be.null;
        expect((h1Element as HTMLHeadingElement).textContent).to.contain(
            testHeading,
            'the slotted content renders in the element'
        );
    });
    it('if in tour coachmark loads with steps with previous and next buttons', async () => {
        const stepText = '2 of 8';
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark
                    currentStep="2"
                    totalSteps="8"
                    primary-cta="Next"
                    secondary-cta="Previous"
                >
                    <div slot="title">Try playing with a pixel brush</div>
                    <div slot="content">
                        Try playing with a pixel brush Pixel brushes use pixels
                        to create brush strokes, just like in other design and
                        drawing tools. Start drawing, and zoom in to see the
                        pixels in each stroke.
                    </div>
                </sp-coachmark>
            `
        );
        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        const stepCount = el.shadowRoot.querySelector(
            'span[aria-live="polite"]'
        );

        expect((stepCount as HTMLElement).textContent).to.contain(
            stepText,
            'the slotted content renders in the element'
        );

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
    it('loads action-menu', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark>
                    <sp-action-menu slot="actions" placement="bottom-end" quiet>
                        <sp-menu-item>Skip tour</sp-menu-item>
                        <sp-menu-item>Restart tour</sp-menu-item>
                    </sp-action-menu>
                </sp-coachmark>
            `
        );

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        await expect(el).to.be.accessible();
    });
    it('loads step when total step count is greater than 1', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark totalSteps="5" currentStep="2">
                    <div slot="title">Try playing with a pixel brush</div>
                    <sp-action-menu slot="actions" placement="bottom-end" quiet>
                        <sp-menu-item>Skip tour</sp-menu-item>
                        <sp-menu-item>Restart tour</sp-menu-item>
                    </sp-action-menu>
                </sp-coachmark>
            `
        );

        await elementUpdated(el);
        const content = el.shadowRoot.querySelector(
            '.step span[aria-live="polite"]'
        );

        expect(content?.textContent?.trim()).to.equal('2 of 5');

        await expect(el).to.be.accessible();
    });
    it('doesnt load pagination when total step count is equal to 0 or 1', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark totalSteps="0">
                    <div slot="title">Try playing with a pixel brush</div>
                    <sp-action-menu slot="actions" placement="bottom-end" quiet>
                        <sp-menu-item>Skip tour</sp-menu-item>
                        <sp-menu-item>Restart tour</sp-menu-item>
                    </sp-action-menu>
                </sp-coachmark>
            `
        );

        await elementUpdated(el);
        const stepElement = el.shadowRoot.querySelector('.step');
        expect(stepElement).to.be.null;

        await expect(el).to.be.accessible();
    });
    it('loads primary button with text "Ok" for a single coachmark', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark totalSteps="1" primary-cta="Ok">
                    <div slot="title">Try playing with a pixel brush</div>
                    <sp-action-menu slot="actions" placement="bottom-end" quiet>
                        <sp-menu-item>Skip tour</sp-menu-item>
                        <sp-menu-item>Restart tour</sp-menu-item>
                    </sp-action-menu>
                </sp-coachmark>
            `
        );

        await elementUpdated(el);
        const okayButton = el.shadowRoot.querySelector(
            'sp-button[variant="primary"'
        );
        expect(okayButton).to.not.be.null;
        expect(okayButton?.textContent?.trim()).to.equal('Ok');
    });
    it('loads primary button with text "Next" and secodanry button with Previous if totalSteps is greater to 1', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark
                    totalSteps="4"
                    currentStep="2"
                    secondary-cta="Previous"
                    primary-cta="Next"
                >
                    <div slot="title">Try playing with a pixel brush</div>
                    <sp-action-menu slot="actions" placement="bottom-end" quiet>
                        <sp-menu-item>Skip tour</sp-menu-item>
                        <sp-menu-item>Restart tour</sp-menu-item>
                    </sp-action-menu>
                </sp-coachmark>
            `
        );

        await elementUpdated(el);
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
    it('renders a video element and allows play pause a video', async () => {
        const el = await fixture<Coachmark>(html`
            <sp-coachmark
                currentstep="2"
                totalsteps="8"
                open
                media-type="video"
                video-type="mp4"
                src="https://download.samplelib.com/mp4/sample-5s.mp4"
            >
                <div slot="title">Tooltip with 16:9 image</div>
                <div slot="content">
                    This is a Rich Tooltip with nothing but text in it. Kind of
                    lonely in here.
                </div>
            </sp-coachmark>
        `);
        await elementUpdated(el);
        const video = el.shadowRoot.querySelector(
            'source[src="https://download.samplelib.com/mp4/sample-5s.mp4"]'
        );
        expect(video).to.not.be.undefined;
    });
    it('renders shortcut and modifier key with joiner', async () => {
        const modifierKeys = ['⇧ Shift', '⌘'];
        const el = await fixture<Coachmark>(html`
            <sp-coachmark
                currentstep="2"
                totalsteps="8"
                open
                shortcut-key="Z"
                .modifierKeys=${modifierKeys}
            >
                <div slot="title">Tooltip with 16:9 image</div>
                <div slot="content">
                    This is a Rich Tooltip with nothing but text in it. Kind of
                    lonely in here.
                </div>
            </sp-coachmark>
        `);
        await elementUpdated(el);
        const modifier = el.shadowRoot.querySelector('span[type="modifier"');
        expect(modifier).to.not.be.undefined;
        expect(modifier?.textContent?.trim()).to.include('⇧ Shift');
        const joiner = el.shadowRoot.querySelector('span[class="plus"]');
        expect(joiner).to.not.be.undefined;
        expect(joiner?.textContent?.trim()).to.include('+');

        const shortcutKey = el.shadowRoot.querySelector(
            'span[type="shortcut"]'
        );
        expect(shortcutKey).to.not.be.undefined;
        expect(shortcutKey?.textContent?.trim()).to.include('Z');
    });
    it('renders content with image asset', async () => {
        const el = await fixture<Coachmark>(html`
            <sp-coachmark
                currentstep="2"
                totalsteps="8"
                open
                media-type="image"
                src="https://picsum.photos/id/237/200/300"
            >
                <div slot="title">Tooltip with 16:9 image</div>
                <div slot="content">
                    This is a Rich Tooltip with nothing but text in it. Kind of
                    lonely in here.
                </div>
            </sp-coachmark>
        `);
        await elementUpdated(el);
        const imageElement = el.shadowRoot.querySelector(
            'img[src="https://picsum.photos/id/237/200/300"'
        );
        expect(imageElement).not.to.be.undefined;
    });
    it('opens coachmark on programmatic click', async () => {
        const interaction = 'click';
        const el = await fixture<CoachmarkTrigger>(html`
            <sp-coachmark-trigger
                placement="bottom-end"
                .triggerInteraction=${interaction}
            >
                <sp-coachmark primary-cta="Ok">
                    <div slot="title">A single coachmark</div>
                    <div slot="content">
                        This is a Coachmark with nothing but text in it. Kind of
                        lonely in here.
                    </div>
                </sp-coachmark>
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
    it('opens coachmark on sendMouse on the trigger element', async () => {
        const interaction = 'hover';
        const el = await fixture<CoachmarkTrigger>(html`
            <sp-coachmark-trigger
                placement="bottom-end"
                .triggerInteraction=${interaction}
            >
                <sp-coachmark primary-cta="Ok">
                    <div slot="title">A single coachmark</div>
                    <div slot="content">
                        This is a Coachmark with nothing but text in it. Kind of
                        lonely in here.
                    </div>
                </sp-coachmark>
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
                .triggerInteraction=${interaction}
            >
                <sp-coachmark primary-cta="Ok">
                    <div slot="title">A single coachmark</div>
                    <div slot="content">
                        This is a Coachmark with nothing but text in it. Kind of
                        lonely in here.
                    </div>
                </sp-coachmark>
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
