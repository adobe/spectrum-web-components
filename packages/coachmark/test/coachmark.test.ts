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
import { Coachmark } from '@spectrum-web-components/coachmark';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('Coachmark', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Coachmark>(
                html`
                    <sp-coachmark heading="Coachmark Heading">
                        <img
                            slot="preview"
                            src="https://picsum.photos/532/192"
                            alt="Slotted Preview"
                        />
                    </sp-coachmark>
                `
            )
    );
    it('loads default coachmark accessibly', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark heading="Coachmark Heading">
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                </sp-coachmark>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('displays the `heading` attribute as `.title`', async () => {
        const testHeading = 'This is a test heading';
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark heading=${testHeading}>
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                </sp-coachmark>
            `
        );

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const headingEl = root.querySelector('.title');

        expect(headingEl, 'did not find title element').to.not.be.null;
        expect((headingEl as HTMLDivElement).textContent).to.contain(
            testHeading,
            'the heading renders in the element'
        );
    });
    it('loads action-menu - [custom icon]', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark heading="Coachmark Heading">
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
                <sp-coachmark
                    heading="Coachmark Heading"
                    totalSteps="5"
                    currentStep="2"
                >
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
                <sp-coachmark heading="Coachmark Heading" totalSteps="0">
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
    it('loads primary button with text "Okay" if totalSteps is equal to 0', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark heading="Coachmark Heading" totalSteps="0">
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
        expect(okayButton?.textContent?.trim()).to.equal('Okay');
    });
    it('loads primary button with text "Next" if totalSteps is greater to 0', async () => {
        const el = await fixture<Coachmark>(
            html`
                <sp-coachmark heading="Coachmark Heading" totalSteps="4">
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
                <sp-coachmark
                    heading="Coachmark Heading"
                    totalSteps="4"
                    currentStep="2"
                >
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
