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
import '../';
import '../../button';
import '../../popover';
import { Popover } from '../../popover';
import '../../theme';
import { Overlay } from '../../overlay';

import { waitForPredicate, isVisible } from '../../../test/testing-helpers';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe('Overlays', () => {
    let testDiv!: HTMLDivElement;

    beforeEach(async () => {
        testDiv = await fixture<HTMLDivElement>(
            html`
                <div id="top">
                    <style>
                        body {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        sp-button {
                            flex: none;
                        }

                        #overlay-content {
                            display: none;
                        }
                    </style>
                    <sp-button
                        id="first-button"
                        variant="primary"
                        slot="trigger"
                    >
                        Show Popover
                    </sp-button>
                    <div id="overlay-content">
                        <sp-popover
                            id="outer-popover"
                            dialog
                            slot="click-content"
                            direction="bottom"
                            tip
                            open
                        >
                            <div class="options-popover-content">
                                A popover message
                            </div>
                        </sp-popover>
                        <div id="hover-1" class="hover-content">
                            Hover message
                        </div>
                        <div id="hover-2" class="hover-content">
                            Other hover message
                        </div>
                    </div>
                </div>
            `
        );
        await elementUpdated(testDiv);
    });

    it('opens a popover', async () => {
        const button = testDiv.querySelector('#first-button') as HTMLElement;
        const outerPopover = testDiv.querySelector('#outer-popover') as Popover;

        expect(outerPopover.parentElement).to.exist;
        if (outerPopover.parentElement) {
            expect(outerPopover.parentElement.id).to.equal('overlay-content');
        }

        expect(isVisible(outerPopover)).to.be.false;

        expect(button).to.exist;

        Overlay.open(button, 'click', outerPopover, {
            delayed: false,
            placement: 'top',
            offset: 10,
        });

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () =>
                !!(
                    outerPopover.parentElement &&
                    outerPopover.parentElement.id !== 'overlay-content'
                )
        );

        expect(outerPopover.parentElement).to.exist;
        if (outerPopover.parentElement) {
            expect(outerPopover.parentElement.id).not.to.equal(
                'overlay-content'
            );
        }
        expect(isVisible(outerPopover)).to.be.true;
    });

    it('opens hover overlay', async () => {
        const button = testDiv.querySelector('#first-button') as HTMLElement;
        const hoverOverlay = testDiv.querySelector('#hover-1') as HTMLElement;
        const clickOverlay = testDiv.querySelector(
            '#outer-popover'
        ) as HTMLElement;

        expect(button).to.exist;
        expect(hoverOverlay).to.exist;

        expect(isVisible(hoverOverlay)).to.be.false;
        expect(isVisible(clickOverlay)).to.be.false;

        Overlay.open(button, 'hover', hoverOverlay, {
            delayed: false,
            placement: 'top',
            offset: 10,
        });

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () =>
                !!(
                    hoverOverlay.parentElement &&
                    hoverOverlay.parentElement.id !== 'overlay-content'
                )
        );

        expect(hoverOverlay.parentElement).to.exist;
        if (hoverOverlay.parentElement) {
            expect(hoverOverlay.parentElement.id).not.to.equal(
                'overlay-content'
            );
        }
        expect(isVisible(hoverOverlay)).to.be.true;

        // Opening click overlay should close the hover overlay
        Overlay.open(button, 'click', clickOverlay, {
            delayed: false,
            placement: 'bottom',
            offset: 10,
        });

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () =>
                !!(
                    clickOverlay.parentElement &&
                    clickOverlay.parentElement.id !== 'overlay-content' &&
                    hoverOverlay.parentElement &&
                    hoverOverlay.parentElement.id === 'overlay-content'
                )
        );

        if (hoverOverlay.parentElement) {
            expect(hoverOverlay.parentElement.id).to.equal('overlay-content');
        }

        expect(isVisible(hoverOverlay)).to.be.false;
        expect(isVisible(clickOverlay)).to.be.true;
    });

    it('opens custom overlay', async () => {
        const button = testDiv.querySelector('#first-button') as HTMLElement;
        const customOverlay = testDiv.querySelector('#hover-1') as HTMLElement;
        const clickOverlay = testDiv.querySelector(
            '#outer-popover'
        ) as HTMLElement;

        expect(button).to.exist;
        expect(customOverlay).to.exist;

        expect(isVisible(customOverlay)).to.be.false;
        expect(isVisible(clickOverlay)).to.be.false;

        Overlay.open(button, 'custom', customOverlay, {
            delayed: false,
            placement: 'top',
            offset: 10,
        });

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () =>
                !!(
                    customOverlay.parentElement &&
                    customOverlay.parentElement.id !== 'overlay-content'
                )
        );

        expect(customOverlay.parentElement).to.exist;
        if (customOverlay.parentElement) {
            expect(customOverlay.parentElement.id).not.to.equal(
                'overlay-content'
            );
        }
        expect(isVisible(customOverlay)).to.be.true;

        // Opening click overlay should close the hover overlay
        Overlay.open(button, 'click', clickOverlay, {
            delayed: false,
            placement: 'bottom',
            offset: 10,
        });

        // Wait for the DOM node to be stolen and reparented into the overlay
        await waitForPredicate(
            () =>
                !!(
                    clickOverlay.parentElement &&
                    clickOverlay.parentElement.id !== 'overlay-content'
                )
        );

        expect(isVisible(customOverlay)).to.be.true;
        expect(isVisible(clickOverlay)).to.be.true;
    });
});
