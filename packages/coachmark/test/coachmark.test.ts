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
} from '@open-wc/testing';

import '@spectrum-web-components/coachmark/sp-coachmark.js';
import { Coachmark, CoachmarkItem } from '@spectrum-web-components/coachmark';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

const defaultItem: CoachmarkItem = {
    heading: 'I am the heading',
    content: 'I am the content',
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
    it('if in tour it loads with steps and previous and next buttons', async () => {
        const stepText = '2 of 8';
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark currentStep="2" totalSteps="8">
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
    it('loads step when total step count is greater than 0', async () => {
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
    it('doesnt load pagination when total step count is equal to 0', async () => {
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
    it('loads primary button with text "Ok" if totalSteps is equal to 0', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark totalSteps="1">
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
    it('loads primary button with text "Next" if totalSteps is greater to 0', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark totalSteps="4">
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
    });
    it('loads button with text "Previous" if totalSteps is greater than 1 & current step is less than totalSteps', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark totalSteps="4" currentStep="2">
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
});
