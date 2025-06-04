/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import {
    aTimeout,
    elementUpdated,
    expect,
    html,
    nextFrame,
    waitUntil,
} from '@open-wc/testing';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/button/sp-button.js';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/popover/sp-popover.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
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

    let overlayTrigger = test.querySelector(
        'overlay-trigger'
    ) as OverlayTrigger;
    let button = test.querySelector('sp-button') as Button;
    let popover = test.querySelector('sp-popover') as Popover;

    // wait until the overlay-trigger, button, and popover are ready
    await waitUntil(
        () => {
            overlayTrigger = test.querySelector(
                'overlay-trigger'
            ) as OverlayTrigger;
            button = test.querySelector('sp-button') as Button;
            popover = test.querySelector('sp-popover') as Popover;
            return !!overlayTrigger && !!button && !!popover;
        },
        'overlay-trigger is ready',
        { timeout: 100 }
    );

    return {
        overlayTrigger: overlayTrigger,
        button: button,
        popover: popover,
    };
};

const getRects = (elements: HTMLElement[]) => {
    const rects = elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {
            el: element.tagName,
            y: Math.round(rect.top),
            h: Math.round(rect.height),
            p:
                element instanceof OverlayTrigger || element instanceof Popover
                    ? element.placement
                    : 'N/A',
            a: element.getAttribute('placement'),
        };
    });
    return `${JSON.stringify(rects)}, scrollY: ${Math.round(window.scrollY)}, innerHeight: ${Math.round(window.innerHeight)}`;
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
        expect(
            !!overlayTrigger,
            `overlayTrigger is ready ${getRects([button, popover])}`
        ).to.be.true;
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
        const { overlayTrigger, button, popover } = await initTest();
        const textfield = document.createElement('input');
        const overlay = overlayTrigger.clickOverlayElement;
        overlayTrigger.insertAdjacentElement('afterend', textfield);
        expect(!!button.isConnected, 'button is ready').to.be.true;
        expect(!!popover.isConnected, 'popover is ready').to.be.true;
        expect(!!overlayTrigger.isConnected, 'overlayTrigger is ready').to.be
            .true;

        expect(document.activeElement, `textfield is not focused`).to.not.equal(
            textfield
        );

        expect(
            textfield.getBoundingClientRect().top,
            `textfield (${textfield.getBoundingClientRect()}) is below button (${button.getBoundingClientRect()})`
        ).to.be.greaterThan(
            button.getBoundingClientRect().top +
                button.getBoundingClientRect().height
        );

        sendMouseTo(textfield, 'click');

        // sendingMouse was timing out for some reason
        // by wrapping in a waitUntil, can tell whether
        // this step is the one that timed out
        await waitUntil(
            () => document.activeElement === textfield,
            `clicking focuses textfield`,
            { timeout: 100 }
        );

        expect(popover.placement).to.equal('top');

        // focus the button
        button.focus();
        expect(document.activeElement, `button focused`).to.equal(button);

        expect(overlayTrigger.open, `overlayTrigger.open`).to.equal(undefined);
        expect(overlay.state, `overlay.state`).to.equal('closed');

        // open the overlay
        overlayTrigger.open = 'click';

        await elementUpdated(overlayTrigger);

        expect(
            overlayTrigger.clickOverlayElement.state,
            'overlay state after clicking'
        ).to.equal('opening');

        // sometimes 300 is not enough for Firefox
        await overlayOpened(overlayTrigger.clickOverlayElement, 400);

        // click the textfield
        await waitUntil(
            async () => await sendMouseTo(textfield, 'click'),
            `textfield clicked again`,
            { timeout: 200 }
        );

        // verify the textfield is occluded
        expect(
            document.activeElement,
            `textfield cannot be clicked`
        ).to.not.equal(textfield);

        overlayTrigger.open = undefined;

        await overlayClosed(overlayTrigger.clickOverlayElement, 300);

        expect(document.activeElement, 'textfield is not focused').to.not.equal(
            textfield
        );

        sendMouseTo(textfield, 'click');

        // verify the textfield is focused
        // and that textfield is no longer occluded
        await waitUntil(
            () => document.activeElement === textfield,
            `clicking focuses textfield again`,
            { timeout: 100 }
        );
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
