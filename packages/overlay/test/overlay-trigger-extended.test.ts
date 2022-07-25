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
    waitUntil,
} from '@open-wc/testing';

import '@spectrum-web-components/overlay/overlay-trigger.js';
import {
    ActiveOverlay,
    OverlayTrigger,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/button/sp-button.js';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/popover/sp-popover.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/textfield/sp-textfield.js';
import { sendMouse } from '../../../test/plugins/browser.js';

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
                        dialog
                        slot="click-content"
                        direction="bottom"
                        tip
                        open
                        tabindex="0"
                        placement="top"
                    >
                        This is the overlay content.
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

    it('occludes content behind the overlay', async () => {
        ({ overlayTrigger, button, popover } = await initTest());
        const textfield = document.createElement('sp-textfield');
        document.body.append(textfield);

        const boundingRect = textfield.getBoundingClientRect();
        expect(document.activeElement).to.not.equal(textfield);
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        boundingRect.left + boundingRect.width / 2,
                        boundingRect.top + boundingRect.height / 2,
                    ],
                },
            ],
        });
        expect(document.activeElement).to.equal(textfield);

        expect(popover.placement).to.equal('top');

        const open = oneEvent(overlayTrigger, 'sp-opened');
        button.click();
        await open;

        expect(overlayTrigger.open).to.equal('click');
        expect(popover.placement).to.equal('bottom');

        const close = oneEvent(overlayTrigger, 'sp-closed');
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        boundingRect.left + boundingRect.width / 2,
                        boundingRect.top + boundingRect.height / 2,
                    ],
                },
            ],
        });
        await close;
        expect(overlayTrigger.open).to.be.null;
        expect(document.activeElement).to.not.equal(textfield);
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        boundingRect.left + boundingRect.width / 2,
                        boundingRect.top + boundingRect.height / 2,
                    ],
                },
            ],
        });
        expect(document.activeElement).to.equal(textfield);
        textfield.remove();
    });

    xit('occludes wheel interactions behind the overlay', async () => {
        /**
         * This test "passes" when tested manually in browser, but
         * not when leveraged in the automated test process.
         *
         * xit for now...
         **/
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
        const activeOverlay = document.querySelector(
            'active-overlay'
        ) as ActiveOverlay;
        await elementUpdated(activeOverlay);

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
