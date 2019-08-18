/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { OverlayRoot } from '../src/overlay-root/overlay-root';
import { OverlayTrigger } from '../src/overlay-trigger';
import { Popover } from '../src/popover/popover';

import '../src/overlay-root';
import '../src/overlay-trigger';
import '../src/button';
import '../src/popover';

import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit-html';

function waitForPredicate(
    predicateFn: () => boolean | undefined,
    timeout: number = 250
): Promise<boolean> {
    const initialTime = Date.now();
    return new Promise<boolean>((resolve, reject) => {
        function testPredicate() {
            if (predicateFn()) {
                resolve(true);
            } else if (Date.now() - initialTime < timeout) {
                requestAnimationFrame(testPredicate);
            } else {
                reject(false);
            }
        }
        testPredicate();
    });
}

function wait(timeout: number): Promise<undefined> {
    return new Promise<undefined>((resolve) => {
        setTimeout(() => resolve(), timeout);
    });
}

function isVisible(element: HTMLElement) {
    return !!element.offsetParent;
}

function pressEscape() {
    const up = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        key: 'Escape',
    });
    document.dispatchEvent(up);
}

describe('Overlays', () => {
    let testDiv!: HTMLDivElement;

    beforeEach(async () => {
        testDiv = await fixture<HTMLDivElement>(
            html`
                <div>
                    <style>
                        overlay-root {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        overlay-trigger {
                            flex: none;
                        }
                    </style>
                    <overlay-root>
                        <overlay-trigger id="trigger" placement="top">
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
                            >
                                <div class="options-popover-content">
                                    <overlay-trigger
                                        id="inner-trigger"
                                        placement="bottom"
                                    >
                                        <sp-button
                                            id="inner-button"
                                            slot="trigger"
                                        >
                                            Press Me
                                        </sp-button>
                                        <sp-popover
                                            id="inner-popover"
                                            dialog
                                            slot="click-content"
                                            direction="bottom"
                                            tip
                                            open
                                        >
                                            <div
                                                class="options-popover-content"
                                            >
                                                Another Popover
                                            </div>
                                        </sp-popover>

                                        <div
                                            slot="hover-content"
                                            class="tooltip"
                                            delay="100"
                                        >
                                            Tooltip
                                        </div>
                                    </overlay-trigger>
                                </div>
                            </sp-popover>
                            <div
                                slot="hover-content"
                                class="tooltip"
                                delay="100"
                            >
                                Tooltip
                            </div>
                        </overlay-trigger>
                    </overlay-root>
                </div>
            `
        );
    });

    it('loads', async () => {
        const element = testDiv.querySelector('overlay-root') as OverlayRoot;
        expect(element).to.exist;
        expect(element.shadowRoot).to.exist;
        const popover = element.querySelector('sp-popover') as Popover;
        expect(popover).to.exist;
        expect(popover.shadowRoot).to.exist;
        expect(popover.parentElement).to.be.an.instanceOf(OverlayTrigger);
    });

    it('opens a popover', async () => {
        const button = testDiv.querySelector('#outer-button') as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;

        expect(isVisible(outerPopover)).to.be.false;

        expect(button).to.exist;
        button.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(outerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        expect(isVisible(outerPopover)).to.be.true;
    });

    it('opens a nested popover', async () => {
        const button = testDiv.querySelector('#outer-button') as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;
        const innerPopover = testDiv.querySelector('#inner-popover') as Popover;

        expect(isVisible(outerPopover)).to.be.false;
        expect(isVisible(innerPopover)).to.be.false;

        expect(button).to.exist;
        button.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(outerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(outerPopover.parentElement).to.not.be.an.instanceOf(
            OverlayTrigger
        );
        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.false;

        const innerButton = testDiv.querySelector(
            '#inner-button'
        ) as HTMLElement;
        innerButton.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(innerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;
    });

    it('escape closes an open popover', async () => {
        const innerButton = testDiv.querySelector(
            '#inner-button'
        ) as HTMLElement;
        const outerButton = testDiv.querySelector(
            '#outer-button'
        ) as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;
        const innerPopover = testDiv.querySelector('#inner-popover') as Popover;

        outerButton.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(outerPopover.parentElement instanceof OverlayTrigger)
        );

        innerButton.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(innerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;

        pressEscape();

        // Wait for the DOM node to be put back in its original place
        await waitForPredicate(
            () => innerPopover.parentElement instanceof OverlayTrigger
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.false;

        pressEscape();

        // Wait for the DOM node to be put back in its original place
        await waitForPredicate(
            () => outerPopover.parentElement instanceof OverlayTrigger
        );

        expect(isVisible(outerPopover)).to.be.false;
        expect(isVisible(innerPopover)).to.be.false;
    });

    it('click closes an open popover', async () => {
        const innerButton = testDiv.querySelector(
            '#inner-button'
        ) as HTMLElement;
        const outerButton = testDiv.querySelector(
            '#outer-button'
        ) as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;
        const innerPopover = testDiv.querySelector('#inner-popover') as Popover;

        outerButton.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(outerPopover.parentElement instanceof OverlayTrigger)
        );

        innerButton.click();

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () => !(innerPopover.parentElement instanceof OverlayTrigger)
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;

        // Test that clicking in the overlay content does not the overlay
        innerPopover.click();
        await wait(200);
        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.true;

        document.body.click();

        // Wait for the DOM node to be put back in its original place
        await waitForPredicate(
            () => innerPopover.parentElement instanceof OverlayTrigger
        );

        expect(isVisible(outerPopover)).to.be.true;
        expect(isVisible(innerPopover)).to.be.false;

        document.body.click();

        // Wait for the DOM node to be put back in its original place
        await waitForPredicate(
            () => outerPopover.parentElement instanceof OverlayTrigger
        );

        expect(isVisible(outerPopover)).to.be.false;
        expect(isVisible(innerPopover)).to.be.false;
    });
});
