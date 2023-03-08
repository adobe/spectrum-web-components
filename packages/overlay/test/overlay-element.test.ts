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
    aTimeout,
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import { OverlayBase } from '@spectrum-web-components/overlay/src/OverlayBase.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import { Tooltip } from '@spectrum-web-components/tooltip';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { Theme } from '@spectrum-web-components/theme';
import { TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/button/sp-button.js';

import { sendMouse } from '../../../test/plugins/browser.js';
import { Button } from '@spectrum-web-components/button';

const OVERLAY_TYPES = ['modal', 'page', 'hint', 'auto', 'manual'] as const;
type OverlayTypes = typeof OVERLAY_TYPES[number];

async function styledFixture<T extends Element>(
    story: TemplateResult
): Promise<T> {
    const test = await fixture<Theme>(html`
        <sp-theme theme="spectrum" scale="medium" color="light">
            ${story}
        </sp-theme>
    `);
    return test.children[0] as T;
}

describe('sp-overlay', () => {
    function opensDeclaratively(overlayType: OverlayTypes): void {
        it(`as [type="'${overlayType}'"]`, async () => {
            const el = await styledFixture<OverlayBase>(html`
                <sp-overlay open type=${overlayType}>
                    <sp-tooltip>Content</sp-tooltip>
                </sp-overlay>
            `);
            const content = el.children[0] as Tooltip;
            let opened = oneEvent(el, 'sp-opened');
            await opened;
            await aTimeout(150);
            await elementUpdated(el);
            expect(content.open).to.be.true;
            // Required to cover the fact that `sp-opened` in 'modal'/'page'
            // overlays fires pseudo-syncronously, which means the transition
            // to "open" won't have started in a way that would allow `transitionend`
            // events to announce "closed" without the extra await between open => close
            // state transitions.
            //
            // Lock down the `sp-opened/closed` contract across overlay types...
            await nextFrame();

            const closed = oneEvent(el, 'sp-closed');
            el.open = false;

            await closed;
            await aTimeout(150);
            await elementUpdated(el);

            expect(content.open).to.be.false;
            await nextFrame();
            opened = oneEvent(el, 'sp-opened');
            el.open = true;

            await opened;
            await aTimeout(150);
            await elementUpdated(el);
            expect(content.open).to.be.true;
        });
    }

    describe('[type="modal"]', () => {
        opensDeclaratively('modal');
        xit('closes all other overlay types when opening', async () => {
            const test = await styledFixture<OverlayBase>(html`
                <div>
                    ${OVERLAY_TYPES.map(
                        (type) => html`
                            <sp-overlay type=${type}>
                                <sp-tooltip>${type} Content</sp-tooltip>
                            </sp-overlay>
                        `
                    )}
                </div>
            `);
            const modal = test.querySelector('[type="modal"]') as OverlayBase;
            const page = test.querySelector('[type="page"]') as OverlayBase;
            const hint = test.querySelector('[type="hint"]') as OverlayBase;
            const auto = test.querySelector('[type="auto"]') as OverlayBase;
            const manual = test.querySelector('[type="manual"]') as OverlayBase;

            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            let opened = oneEvent(page, 'sp-opened');
            page.open = true;
            await opened;
            await elementUpdated(page);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.true;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;
            // Required to cover the fact that `sp-opened` in 'modal'/'page'
            // overlays fires pseudo-syncronously, which means the transition
            // to "open" won't have started in a way that would allow `transitionend`
            // events to announce "closed" without the extra await between open => close
            // state transitions.
            //
            // Lock down the `sp-opened/closed` contract across overlay types...
            await nextFrame();

            opened = oneEvent(modal, 'sp-opened');
            let closed = oneEvent(page, 'sp-closed');
            modal.open = true;
            await opened;
            await closed;
            await elementUpdated(page);
            await elementUpdated(modal);
            expect(modal.open).to.be.true;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            closed = oneEvent(modal, 'sp-closed');
            modal.open = false;
            await closed;
            await elementUpdated(page);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(hint, 'sp-opened');
            hint.open = true;
            await opened;
            await elementUpdated(hint);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.true;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(modal, 'sp-opened');
            closed = oneEvent(hint, 'sp-closed');
            modal.open = true;
            await opened;
            await closed;
            await elementUpdated(page);
            await elementUpdated(modal);
            expect(modal.open).to.be.true;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            closed = oneEvent(modal, 'sp-closed');
            modal.open = false;
            await closed;
            await elementUpdated(page);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(auto, 'sp-opened');
            auto.open = true;
            await opened;
            await elementUpdated(auto);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.true;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(modal, 'sp-opened');
            closed = oneEvent(auto, 'sp-closed');
            modal.open = true;
            await opened;
            await closed;
            await elementUpdated(auto);
            await elementUpdated(modal);
            expect(modal.open).to.be.true;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            closed = oneEvent(modal, 'sp-closed');
            modal.open = false;
            await closed;
            await elementUpdated(modal);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(manual, 'sp-opened');
            manual.open = true;
            await opened;
            await elementUpdated(manual);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.true;

            await nextFrame();

            opened = oneEvent(modal, 'sp-opened');
            closed = oneEvent(manual, 'sp-closed');
            modal.open = true;
            await opened;
            await closed;
            await elementUpdated(page);
            await elementUpdated(manual);
            expect(modal.open).to.be.true;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;
        });
    });
    describe('[type="page"]', () => {
        opensDeclaratively('page');
        xit('closes all other overlay types when opening', async () => {
            const test = await styledFixture<OverlayBase>(html`
                <div>
                    ${OVERLAY_TYPES.map(
                        (type) => html`
                            <sp-overlay type=${type}>
                                <sp-tooltip>${type} Content</sp-tooltip>
                            </sp-overlay>
                        `
                    )}
                </div>
            `);
            const modal = test.querySelector('[type="modal"]') as OverlayBase;
            const page = test.querySelector('[type="page"]') as OverlayBase;
            const hint = test.querySelector('[type="hint"]') as OverlayBase;
            const auto = test.querySelector('[type="auto"]') as OverlayBase;
            const manual = test.querySelector('[type="manual"]') as OverlayBase;

            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            let opened = oneEvent(modal, 'sp-opened');
            modal.open = true;
            await opened;
            await elementUpdated(modal);
            expect(modal.open).to.be.true;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;
            // Required to cover the fact that `sp-opened` in 'modal'/'page'
            // overlays fires pseudo-syncronously, which means the transition
            // to "open" won't have started in a way that would allow `transitionend`
            // events to announce "closed" without the extra await between open => close
            // state transitions.
            //
            // Lock down the `sp-opened/closed` contract across overlay types...
            await nextFrame();

            opened = oneEvent(page, 'sp-opened');
            let closed = oneEvent(modal, 'sp-closed');
            page.open = true;
            await opened;
            await closed;
            await elementUpdated(page);
            await elementUpdated(modal);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.true;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            closed = oneEvent(page, 'sp-closed');
            page.open = false;
            await closed;
            await elementUpdated(page);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(hint, 'sp-opened');
            hint.open = true;
            await opened;
            await elementUpdated(hint);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.true;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(page, 'sp-opened');
            closed = oneEvent(hint, 'sp-closed');
            page.open = true;
            await opened;
            await closed;
            await elementUpdated(page);
            await elementUpdated(hint);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.true;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            closed = oneEvent(page, 'sp-closed');
            page.open = false;
            await closed;
            await elementUpdated(page);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(auto, 'sp-opened');
            auto.open = true;
            await opened;
            await elementUpdated(auto);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.true;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(page, 'sp-opened');
            closed = oneEvent(auto, 'sp-closed');
            page.open = true;
            await opened;
            await closed;
            await elementUpdated(auto);
            await elementUpdated(page);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.true;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            closed = oneEvent(page, 'sp-closed');
            page.open = false;
            await closed;
            await elementUpdated(page);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(manual, 'sp-opened');
            manual.open = true;
            await opened;
            await elementUpdated(manual);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.true;

            await nextFrame();

            opened = oneEvent(page, 'sp-opened');
            closed = oneEvent(manual, 'sp-closed');
            page.open = true;
            await opened;
            await closed;
            await elementUpdated(page);
            await elementUpdated(manual);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.true;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;
        });
    });

    describe('[type="hint"]', () => {
        opensDeclaratively('hint');

        it('closes other `[type=hint]` overlays when opening', async () => {
            const test = await styledFixture<OverlayBase>(html`
                <div>
                    ${[1, 2].map(
                        (overlay) => html`
                            <sp-overlay type="hint" class="hint-${overlay}">
                                <sp-tooltip>Hint ${overlay} Content</sp-tooltip>
                            </sp-overlay>
                        `
                    )}
                </div>
            `);
            const hint1 = test.querySelector('.hint-1') as OverlayBase;
            const hint2 = test.querySelector('.hint-2') as OverlayBase;

            expect(hint1.open).to.be.false;
            expect(hint2.open).to.be.false;

            let opened = oneEvent(hint1, 'sp-opened');
            hint1.open = true;
            await opened;
            await aTimeout(150);
            await elementUpdated(hint1);

            expect(hint1.open).to.be.true;
            expect(hint2.open).to.be.false;

            opened = oneEvent(hint2, 'sp-opened');
            let closed = oneEvent(hint1, 'sp-closed');
            hint2.open = true;
            await opened;
            await aTimeout(150);
            await closed;
            await elementUpdated(hint1);
            await elementUpdated(hint2);

            expect(hint1.open).to.be.false;
            expect(hint2.open).to.be.true;

            opened = oneEvent(hint1, 'sp-opened');
            closed = oneEvent(hint2, 'sp-closed');
            hint1.open = true;
            await opened;
            await closed;
            await elementUpdated(hint1);
            await elementUpdated(hint2);

            expect(hint1.open).to.be.true;
            expect(hint2.open).to.be.false;
        });
        xit('stays open when pointer enters overlay from trigger element', async () => {
            const test = await styledFixture(
                html`
                    <div>
                        <sp-button id="test-button">
                            This is a button.
                        </sp-button>
                        <sp-overlay
                            trigger="test-button@hover"
                            placement="bottom"
                            offset="-5"
                        >
                            <sp-tooltip>Help text.</sp-tooltip>
                        </sp-overlay>
                    </div>
                `
            );

            const button = test.querySelector('sp-button') as Button;
            const overlay = test.querySelector(
                'sp-overlay'
            ) as unknown as OverlayBase;
            const el = test.querySelector('sp-tooltip') as Tooltip;
            const buttonRect = button.getBoundingClientRect();
            const buttonPoint = [
                buttonRect.x + buttonRect.width / 2,
                buttonRect.y + buttonRect.height / 2,
            ] as [number, number];

            await elementUpdated(overlay);
            // This test is possibly weird in its over simplicity for this contexts...
            await expect(button).to.be.accessible();
            // Pointer enter the button to trigger the tooltip
            let opened = oneEvent(button, 'sp-opened');
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            await nextFrame();
            await nextFrame();
            const tooltipRect = (
                el.shadowRoot.querySelector('#tooltip') as HTMLDivElement
            ).getBoundingClientRect();
            const tooltipPoint = [
                tooltipRect.x + tooltipRect.width / 2,
                tooltipRect.y + tooltipRect.height / 2,
            ] as [number, number];
            // Pointer leave the button to close the tooltip, but...
            // Pointer enter the tooltip to keep the tooltip open
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: tooltipPoint,
                    },
                ],
            });
            await opened;
            await elementUpdated(el);

            expect(el.open).to.be.true;
            await expect(button).to.be.accessible();

            let closed = oneEvent(button, 'sp-closed');
            // point enter the button to trigger the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            // pointer leave the button to close the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width * 2,
                            buttonRect.y + buttonRect.height * 2,
                        ] as [number, number],
                    },
                ],
            });
            await closed;
            await elementUpdated(el);

            expect(el.open).to.be.false;

            opened = oneEvent(button, 'sp-opened');
            // pointer enter the button to trigger the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            await opened;
            await elementUpdated(el);

            closed = oneEvent(button, 'sp-closed');
            // pointer leave the button to close the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width * 2,
                            buttonRect.y + buttonRect.height * 2,
                        ] as [number, number],
                    },
                ],
            });
            await closed;
            await elementUpdated(el);
        });
        it('stays open when pointer enters overlay from trigger element', async () => {
            const button = await styledFixture(
                html`
                    <sp-button>
                        This is a button.
                        <sp-tooltip self-managed placement="bottom">
                            Help text.
                        </sp-tooltip>
                    </sp-button>
                `
            );

            const el = button.querySelector('sp-tooltip') as Tooltip;
            const buttonRect = button.getBoundingClientRect();
            const buttonPoint = [
                buttonRect.x + buttonRect.width / 2,
                buttonRect.y + buttonRect.height / 2,
            ] as [number, number];

            await elementUpdated(el);
            // This test is possibly weird in its over simplicity for this contexts...
            await expect(button).to.be.accessible();
            // Pointer enter the button to trigger the tooltip
            let opened = oneEvent(button, 'sp-opened');
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            await nextFrame();
            await nextFrame();
            const tooltipRect = (
                el.shadowRoot.querySelector('#tooltip') as HTMLDivElement
            ).getBoundingClientRect();
            const tooltipPoint = [
                tooltipRect.x + tooltipRect.width / 2,
                tooltipRect.y + tooltipRect.height / 2,
            ] as [number, number];
            // Pointer leave the button to close the tooltip, but...
            // Pointer enter the tooltip to keep the tooltip open
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: tooltipPoint,
                    },
                ],
            });
            await opened;
            await aTimeout(150);
            await elementUpdated(el);

            expect(el.open).to.be.true;
            await expect(button).to.be.accessible();

            let closed = oneEvent(button, 'sp-closed');
            // point enter the button to trigger the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            // pointer leave the button to close the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width * 2,
                            buttonRect.y + buttonRect.height * 2,
                        ] as [number, number],
                    },
                ],
            });
            await closed;
            await aTimeout(150);
            await elementUpdated(el);

            expect(el.open).to.be.false;

            opened = oneEvent(button, 'sp-opened');
            // pointer enter the button to trigger the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            await opened;
            await aTimeout(150);
            expect(el.open).to.be.true;

            closed = oneEvent(button, 'sp-closed');
            // pointer leave the button to close the tooltip
            sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width * 2,
                            buttonRect.y + buttonRect.height * 2,
                        ] as [number, number],
                    },
                ],
            });
            await closed;
            await elementUpdated(el);
            expect(el.open).to.be.false;
        });
    });
    describe('[type="auto"]', () => {
        opensDeclaratively('auto');
    });
    describe('[type="manual"]', () => {
        opensDeclaratively('manual');

        it('does not close other overlay types when opening', async () => {
            const test = await styledFixture<OverlayBase>(html`
                <div>
                    ${OVERLAY_TYPES.map(
                        (type) => html`
                            <sp-overlay type=${type}>
                                <sp-tooltip>${type} Content</sp-tooltip>
                            </sp-overlay>
                        `
                    )}
                </div>
            `);
            const modal = test.querySelector('[type="modal"]') as OverlayBase;
            const page = test.querySelector('[type="page"]') as OverlayBase;
            const hint = test.querySelector('[type="hint"]') as OverlayBase;
            const auto = test.querySelector('[type="auto"]') as OverlayBase;
            const manual = test.querySelector('[type="manual"]') as OverlayBase;

            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            let opened = oneEvent(modal, 'sp-opened');
            modal.open = true;
            await opened;
            await aTimeout(150);
            await elementUpdated(modal);
            expect(modal.open).to.be.true;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;
            // Required to cover the fact that `sp-opened` in 'modal'/'page'
            // overlays fires pseudo-syncronously, which means the transition
            // to "open" won't have started in a way that would allow `transitionend`
            // events to announce "closed" without the extra await between open => close
            // state transitions.
            //
            // Lock down the `sp-opened/closed` contract across overlay types...
            await nextFrame();

            opened = oneEvent(manual, 'sp-opened');
            manual.open = true;
            await opened;
            await aTimeout(150);
            await elementUpdated(manual);
            expect(modal.open).to.be.true;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.true;

            await nextFrame();

            let closed = oneEvent(modal, 'sp-closed');
            let manualClosed = oneEvent(manual, 'sp-closed');
            modal.open = false;
            manual.open = false;
            await closed;
            await manualClosed;
            await aTimeout(150);
            await elementUpdated(modal);
            await elementUpdated(manual);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(page, 'sp-opened');
            page.open = true;
            await opened;
            await aTimeout(150);
            await elementUpdated(page);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.true;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(manual, 'sp-opened');
            manual.open = true;
            await opened;
            await aTimeout(150);
            await elementUpdated(manual);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.true;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.true;

            await nextFrame();

            closed = oneEvent(page, 'sp-closed');
            manualClosed = oneEvent(manual, 'sp-closed');
            page.open = false;
            manual.open = false;
            await closed;
            await aTimeout(150);
            await manualClosed;
            await elementUpdated(page);
            await elementUpdated(manual);

            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(hint, 'sp-opened');
            hint.open = true;
            await opened;
            await aTimeout(150);
            await elementUpdated(hint);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.true;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(manual, 'sp-opened');
            manual.open = true;
            await opened;
            await elementUpdated(manual);

            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.true;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.true;

            await nextFrame();

            closed = oneEvent(hint, 'sp-closed');
            manualClosed = oneEvent(manual, 'sp-closed');
            hint.open = false;
            manual.open = false;
            await closed;
            await elementUpdated(hint);
            await elementUpdated(manual);
            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.false;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(auto, 'sp-opened');
            auto.open = true;
            await opened;
            await elementUpdated(auto);

            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.true;
            expect(manual.open).to.be.false;

            await nextFrame();

            opened = oneEvent(manual, 'sp-opened');
            manual.open = true;
            await opened;
            await elementUpdated(manual);

            expect(modal.open).to.be.false;
            expect(page.open).to.be.false;
            expect(hint.open).to.be.false;
            expect(auto.open).to.be.true;
            expect(manual.open).to.be.true;
        });
    });
});
