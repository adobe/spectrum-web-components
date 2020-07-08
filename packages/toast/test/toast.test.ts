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

import '../sp-toast.js';
import { toastVariants, Toast } from '../';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    nextFrame,
} from '@open-wc/testing';
import { ClearButton } from '@spectrum-web-components/button';
import { waitForPredicate } from '../../../test/testing-helpers';

interface TestableToast {
    _timeout: number;
    countdownStart: number;
}

describe('Toast', () => {
    it('loads', async () => {
        const el = await fixture<Toast>(
            html`
                <sp-toast>Help text.</sp-toast>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    toastVariants.map((variant) => {
        it(`loads - [variant="${variant}"]`, async () => {
            const el = await fixture<Toast>(
                html`
                    <sp-toast variant=${variant}>
                        This toast is of the \`${variant}\` variant.
                    </sp-toast>
                `
            );

            await elementUpdated(el);

            await expect(el).to.be.accessible();
        });
    });
    it('loads - timeout', async () => {
        const el = await fixture<Toast>(
            html`
                <sp-toast timeout="100">Help text.</sp-toast>
            `
        );

        await elementUpdated(el);
        expect(el.open).to.be.true;

        ((el as unknown) as TestableToast)._timeout = 100;

        await waitForPredicate(() => el.open === false);
        expect(el.open).to.be.false;
    });
    it('`timeout` updates `countdownStart`', async () => {
        const el = await fixture<Toast>(
            html`
                <sp-toast timeout="100">Help text.</sp-toast>
            `
        );

        await elementUpdated(el);
        expect(el.open).to.be.true;

        const testableEl = (el as unknown) as TestableToast;
        testableEl._timeout = 100;
        const firstStart = testableEl.countdownStart;

        await nextFrame();
        await nextFrame();
        await nextFrame();

        el.timeout = 400;

        await elementUpdated(el);
        const secondStart = testableEl.countdownStart;

        expect(secondStart).to.not.equal(firstStart);

        await nextFrame();
        await nextFrame();

        el.timeout = 0;

        await elementUpdated(el);
        const thirdStart = testableEl.countdownStart;

        expect(thirdStart).to.equal(0);
    });
    it('stops timeout on `focusin`', async () => {
        const el = await fixture<Toast>(
            html`
                <sp-toast timeout="100">Help text.</sp-toast>
            `
        );

        await elementUpdated(el);
        await nextFrame();

        const testableEl = (el as unknown) as TestableToast;
        expect(el.open).to.be.true;
        expect(testableEl.countdownStart, 'initially not 0').to.not.equal(0);

        testableEl._timeout = 100;
        el.dispatchEvent(new FocusEvent('focusin'));

        await elementUpdated(el);
        expect(testableEl.countdownStart, '0 after focusin').to.equal(0);
        el.dispatchEvent(new FocusEvent('focusout'));

        await elementUpdated(el);
        await nextFrame();
        expect(testableEl.countdownStart, 'not 0 after focusout').to.not.equal(
            0
        );

        await waitForPredicate(() => el.open === false);
        expect(el.open).to.be.false;
    });
    it('closes', async () => {
        const el = await fixture<Toast>(
            html`
                <sp-toast open timeout="100">Help text.</sp-toast>
            `
        );

        await elementUpdated(el);
        expect(el.open).to.be.true;

        const renderRoot = el.shadowRoot ? el.shadowRoot : el;
        const clearButton = renderRoot.querySelector(
            'sp-clear-button'
        ) as ClearButton;
        clearButton.click();

        await elementUpdated(el);
        expect(el.open).to.be.false;
    });
    it('`close` can be prevented', async () => {
        const handleClose = (event: CustomEvent): void =>
            event.preventDefault();
        const el = await fixture<Toast>(
            html`
                <sp-toast open timeout="100" @close=${handleClose}>
                    Help text.
                </sp-toast>
            `
        );

        await elementUpdated(el);
        expect(el.open).to.be.true;

        const renderRoot = el.shadowRoot ? el.shadowRoot : el;
        const clearButton = renderRoot.querySelector(
            'sp-clear-button'
        ) as ClearButton;
        clearButton.click();

        await elementUpdated(el);
        expect(el.open).to.be.true;
    });
    it('validates variants', async () => {
        const el = await fixture<Toast>(
            html`
                <sp-toast variant="invalid">
                    This toast validates variants.
                </sp-toast>
            `
        );

        await elementUpdated(el);
        expect(el.variant).to.equal('');

        el.variant = toastVariants[0];

        await elementUpdated(el);
        expect(el.variant).to.equal(toastVariants[0]);

        el.variant = toastVariants[0];

        await elementUpdated(el);
        expect(el.variant).to.equal(toastVariants[0]);
    });
});
