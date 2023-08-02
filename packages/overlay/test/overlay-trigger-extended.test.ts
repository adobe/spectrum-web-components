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
import { expect, html, nextFrame, oneEvent, waitUntil } from '@open-wc/testing';

import '@spectrum-web-components/overlay/overlay-trigger.js';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/button/sp-button.js';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/popover/sp-popover.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import { sendMouse } from '../../../test/plugins/browser.js';
import { fixture } from '../../../test/testing-helpers.js';
import { sendKeys } from '@web/test-runner-commands';

const initTest = async (
    styles = html``
): Promise<{
    overlayTrigger: OverlayTrigger;
    button: Button;
    popover: Popover;
}> => {
    const test = await fixture<HTMLDivElement>(
        html`
            <div class="container">
                <style>
                    .container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                </style>
                ${styles}
                <overlay-trigger type="modal" id="trigger" placement="top">
                    <sp-button
                        id="outer-button"
                        variant="primary"
                        slot="trigger"
                    >
                        Show Popover
                    </sp-button>
                    <sp-popover
                        id="outer-popover"
                        slot="click-content"
                        direction="bottom"
                        tip
                        tabindex="0"
                        placement="top"
                    >
                        <sp-dialog no-divider>
                            This is the overlay content.
                        </sp-dialog>
                    </sp-popover>
                </overlay-trigger>
            </div>
        `
    );
    return {
        overlayTrigger: test.querySelector('overlay-trigger') as OverlayTrigger,
        button: test.querySelector('sp-button') as Button,
        popover: test.querySelector('sp-popover') as Popover,
    };
};

describe('Overlay Trigger - extended', () => {
    let overlayTrigger!: OverlayTrigger;
    let button!: Button;
    let popover!: Popover;

    afterEach(async () => {
        if (overlayTrigger.open) {
            const closed = oneEvent(overlayTrigger, 'sp-closed');
            overlayTrigger.open = undefined;
            await closed;
        }
    });

    it('manages `placement` on open', async () => {
        ({ overlayTrigger, button, popover } = await initTest());

        expect(popover.placement).to.equal('top');

        const open = oneEvent(overlayTrigger, 'sp-opened');
        button.click();
        await open;

        expect(popover.placement).to.equal('bottom');

        const close = oneEvent(overlayTrigger, 'sp-closed');
        overlayTrigger.open = undefined;
        await close;

        expect(popover.placement).to.equal('top');
    });

    it('manages `placement` on scroll', async () => {
        ({ overlayTrigger, button, popover } = await initTest(html`
            <style>
                sp-button {
                    margin: 100vh 0;
                    transform: translateY(-100%);
                }
            </style>
        `));

        expect(popover.placement).to.equal('top');

        const open = oneEvent(overlayTrigger, 'sp-opened');
        button.click();
        await open;

        expect(popover.placement).to.equal('top');

        const { scrollHeight } = document.documentElement;
        document.documentElement.scrollTop = scrollHeight / 2;

        // one frame for scroll to trigger
        await nextFrame();
        // one frame for the UI to update
        await nextFrame();
        // _then_ we test...
        expect(popover.placement).to.equal('bottom');
    });

    xit('occludes content behind the overlay', async () => {
        // currently fails for no reason in Firefox locally, and most browsers in CI.
        ({ overlayTrigger, button, popover } = await initTest());
        const textfield = document.createElement('sp-textfield');
        overlayTrigger.insertAdjacentElement('afterend', textfield);

        const textfieldRect = textfield.getBoundingClientRect();
        expect(document.activeElement === textfield).to.be.false;
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [textfieldRect.left + 5, textfieldRect.top + 5],
                },
            ],
        });
        expect(
            document.activeElement === textfield,
            'clicking focuses the Textfield'
        ).to.be.true;

        expect(popover.placement).to.equal('top');

        const open = oneEvent(overlayTrigger, 'sp-opened');
        await sendKeys({
            press: 'Shift+Tab',
        });
        expect(document.activeElement === button, 'button focused').to.be.true;
        await sendKeys({
            press: 'Enter',
        });
        await open;

        expect(overlayTrigger.type).to.equal('modal');
        expect(overlayTrigger.open).to.equal('click');
        expect(popover.placement).to.equal('bottom');

        const close = oneEvent(overlayTrigger, 'sp-closed');
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [textfieldRect.left + 5, textfieldRect.top + 5],
                },
            ],
        });
        await close;

        expect(overlayTrigger.open).to.be.undefined;
        expect(
            document.activeElement === textfield,
            'closing does not focus the Textfield'
        ).to.be.false;

        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        textfieldRect.left + textfieldRect.width / 2,
                        textfieldRect.top + textfieldRect.height / 2,
                    ],
                },
            ],
        });
        expect(
            document.activeElement === textfield,
            'the Textfield is focused again'
        ).to.be.true;
    });

    xit('occludes wheel interactions behind the overlay', async () => {
        // currently fails for no reason in Firefox locally, and most browsers in CI.
        ({ overlayTrigger, button, popover } = await initTest());
        const scrollingArea = document.createElement('div');
        Object.assign(scrollingArea.style, {
            width: '100px',
            height: '100px',
            overflow: 'auto',
        });
        const content = Array(100).fill(
            'This is content within my box that will scroll.'
        );
        scrollingArea.textContent = content.join(' ');
        document.body.append(scrollingArea);
        await nextFrame();

        const boundingRect = scrollingArea.getBoundingClientRect();
        expect(scrollingArea.scrollTop).to.equal(0);
        const distance = 1;
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        boundingRect.left + boundingRect.width / 2,
                        boundingRect.top + boundingRect.height / 2,
                    ],
                },
            ],
        });
        await sendMouse({
            steps: [
                {
                    type: 'wheel',
                    position: [0, distance],
                },
            ],
        });
        // wait for scroll to complete
        await waitUntil(
            () => scrollingArea.scrollTop === distance,
            `scroll went to ${distance}`
        );
        expect(scrollingArea.scrollTop).to.equal(distance);

        expect(popover.placement).to.equal('top');

        const open = oneEvent(overlayTrigger, 'sp-opened');
        button.click();
        await open;

        expect(overlayTrigger.open).to.equal('click');
        expect(popover.placement).to.equal('bottom');
        expect(scrollingArea.scrollTop).to.equal(distance);
        await sendMouse({
            steps: [
                {
                    type: 'wheel',
                    position: [0, -distance],
                },
            ],
        });
        // Awaiting here points out that this always fails in Firefox
        // and also was failing in WebKit without our knowing.
        await nextFrame();
        await nextFrame();
        await nextFrame();

        expect(
            scrollingArea.scrollTop,
            `scrollTop should be ${distance}.`
        ).to.equal(distance);
        scrollingArea.remove();
    });
});
