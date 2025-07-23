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
    aTimeout,
    elementUpdated,
    expect,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/popover/sp-popover.js';
import { sendMouse } from '../../../test/plugins/browser.js';
import { fixture, sendMouseTo } from '../../../test/testing-helpers.js';
import { overlayClosed, overlayOpened } from './overlay-testing-helpers.js';

const initTest = async (
    styles = html``
): Promise<{
    overlayTrigger: OverlayTrigger;
    button: Button;
    popover: Popover;
}> => {
    const test = await fixture<HTMLDivElement>(html`
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
                <sp-button id="outer-button" variant="primary" slot="trigger">
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
    `);

    await waitUntil(
        () => {
            return (
                !!test.querySelector('overlay-trigger') &&
                !!test.querySelector('sp-button') &&
                !!test.querySelector('sp-popover')
            );
        },
        'overlay-trigger, button, and popover appeared',
        { timeout: 300 }
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

    it('manages `placement` on open', async () => {
        ({ overlayTrigger, button, popover } = await initTest());

        expect(popover.placement).to.equal('top');

        button.click();

        await elementUpdated(overlayTrigger);

        await overlayOpened(overlayTrigger.clickOverlayElement, 300);

        expect(popover.placement).to.equal('bottom');

        overlayTrigger.open = undefined;

        await elementUpdated(overlayTrigger);

        expect(
            overlayTrigger.clickOverlayElement.state,
            'overlay state after closing'
        ).to.equal('closing');

        await overlayClosed(overlayTrigger.clickOverlayElement, 300);

        expect(popover.placement).to.equal('top');
    });

    it('manages `placement` on scroll', async () => {
        ({ overlayTrigger, button, popover } = await initTest(html`
            <style>
                .container {
                    padding: 100vh 0;
                }
            </style>
        `));
        expect(!!overlayTrigger, `overlayTrigger is ready`).to.be.true;
        expect(!!button.isConnected, 'button is ready').to.be.true;
        expect(!!overlayTrigger.isConnected, 'overlayTrigger is ready').to.be
            .true;
        expect(popover.placement, 'initial placement').to.equal('top');

        // scroll until button is at the top of the viewport
        button.scrollIntoView({
            behavior: 'instant' as ScrollBehavior,
            block: 'end',
        });

        overlayTrigger.open = 'click';

        // wait until ready; if button is at the bottom of the viewport, the popover should be above it
        await waitUntil(
            () =>
                popover.placement === 'top' &&
                popover.getBoundingClientRect().height > 0,
            `popover placement is top`,
            { timeout: 100 }
        );

        expect(overlayTrigger.open).to.equal('click');

        expect(popover.placement, `placement after clicking`).to.equal('top');

        // scroll until button is at the bottom of the viewport
        button.scrollIntoView({
            behavior: 'instant' as ScrollBehavior,
            block: 'start',
        });

        // wait; if button is at the top of the viewport, the popover should be below it
        await waitUntil(
            () => popover.placement === 'bottom',
            `popover placement is top`,
            { timeout: 100 }
        );

        expect(popover.placement, `placement after scrolling`).to.equal(
            'bottom'
        );
    });

    it('occludes content behind the overlay', async () => {
        const el = await fixture<HTMLDivElement>(html`
            <div class="container">
                <style>
                    .container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                </style>
                <overlay-trigger
                    type="modal"
                    id="trigger"
                    placement="top"
                    triggered-by="click"
                >
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
                        tip
                        tabindex="0"
                        placement="bottom"
                    >
                        <sp-dialog no-divider>
                            This is the overlay content.
                        </sp-dialog>
                    </sp-popover>
                </overlay-trigger>
                <input
                    type="text"
                    id="textfield"
                    style="position: relative; z-index: 1;"
                />
            </div>
        `);

        const textfield = el.querySelector('#textfield') as HTMLInputElement;
        const overlayTrigger = el.querySelector(
            'overlay-trigger'
        ) as OverlayTrigger;
        const button = el.querySelector('sp-button') as Button;
        const popover = el.querySelector('sp-popover') as Popover;

        await elementUpdated(el);

        const overlay = overlayTrigger.clickOverlayElement;

        expect(overlay.state, `overlay state`).to.equal('closed');
        expect(textfield, 'textfield is visible').to.be.visible;
        expect(textfield.tabIndex, 'textfield is focusable').to.be.equal(0);

        await waitUntil(async () => {
            const textfieldClick = oneEvent(textfield, 'click');
            textfield.click();
            return await textfieldClick;
        }, `Attempting to click textfield`);

        expect(document.activeElement === textfield, `textfield focused`).to.be
            .true;

        await waitUntil(async () => {
            const buttonFocus = oneEvent(button, 'click');
            button.click();
            return await buttonFocus;
        }, `Trying to focus button`);

        await overlayOpened(overlay);
        await elementUpdated(overlayTrigger);

        expect(document.activeElement === popover, `popover focused`).to.be
            .true;
        expect(popover.placement, 'popover placement').to.equal('bottom');
        expect(overlayTrigger.open, 'overlayTrigger.open').to.equal('click');

        await waitUntil(async () => {
            const elementClick = oneEvent(el, 'click');
            await sendMouseTo(textfield, 'click');
            return await elementClick;
        }, `textfield cannot fire event`);

        expect(
            document.activeElement !== textfield,
            `textfield cannot be clicked`
        ).to.be.true;

        await overlayClosed(overlay);

        expect(overlayTrigger.open, 'overlay closed').to.be.undefined;
        expect(
            document.activeElement !== textfield,
            'textfield is not focused after overlay closes'
        ).to.be.true;

        await waitUntil(async () => {
            const textfieldClick = oneEvent(textfield, 'click');
            await sendMouseTo(textfield, 'click');
            return await textfieldClick;
        }, `textfield clicks again`);

        expect(document.activeElement === textfield, `textfield focused`).to.be
            .true;
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

        expect(scrollingArea.scrollTop).to.equal(0);
        const distance = 1;
        await sendMouseTo(scrollingArea, 'move');
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
            `scroll went to ${distance}`,
            { timeout: 200 }
        );

        expect(scrollingArea.scrollTop).to.equal(distance);

        expect(popover.placement).to.equal('top');

        button.click();

        expect(overlayTrigger.open, 'overlay open').to.equal('click');

        expect(
            overlayTrigger.clickOverlayElement.state,
            'overlay state after clicking'
        ).to.equal('opening');

        await overlayOpened(overlayTrigger.clickOverlayElement, 300);

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

        await aTimeout(50);

        expect(
            scrollingArea.scrollTop,
            `scrollTop should be ${distance}.`
        ).to.equal(distance);
        scrollingArea.remove();
    });
});
