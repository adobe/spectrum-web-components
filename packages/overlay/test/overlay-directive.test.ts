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

import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { html } from '@spectrum-web-components/base';
import {
    elementUpdated,
    expect,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';
import { elsewhere } from '../stories/overlay-directive.stories.js';
import { sendMouse } from '../../../test/plugins/browser.js';
import { fixture } from '../../../test/testing-helpers.js';

describe('Overlay Directive', () => {
    it('opens an Overlay after the trigger', async function () {
        const test = await fixture<HTMLElement>(html`
            <div
                style="width: 100%; height: 100vh; display: grid; place-content: center;"
            >
                ${elsewhere()}
            </div>
        `);

        const el = test.querySelector('sp-button') as Button;

        await elementUpdated(el);
        let overlays = document.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(0);

        const rect = el.getBoundingClientRect();
        let opened = oneEvent(el, 'sp-opened');
        // Open the Tooltip via "hover"
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    ],
                },
            ],
        });
        await opened;

        opened = oneEvent(el, 'sp-opened');
        // Open the Popover via "click"
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    ],
                },
                {
                    type: 'move',
                    position: [
                        rect.left - rect.width / 2,
                        rect.top - rect.height / 2,
                    ],
                },
            ],
        });
        await opened;

        overlays = document.querySelectorAll('sp-overlay');
        expect(overlays.length).to.be.gt(0);
        expect(overlays[0].previousElementSibling).to.equal(el);

        // `slottable-request` comes _after_ `sp-closed` and triggers DOM cleanup
        const closed = oneEvent(overlays[0], 'slottable-request');
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        rect.left - rect.width / 2,
                        rect.top - rect.height / 2,
                    ],
                },
            ],
        });
        await closed;

        await waitUntil(() => {
            overlays = document.querySelectorAll('sp-overlay');
            return overlays.length === 0;
        }, 'not all overlays were cleaned up');

        expect(overlays.length).to.equal(0);
    });

    it('opens an Overlay in a specific part of the DOM', async function () {
        const test = await fixture<HTMLElement>(html`
            <div
                style="width: 100%; height: 100vh; display: grid; place-content: center;"
            >
                ${elsewhere(elsewhere.args)}
            </div>
        `);

        const el = test.querySelector('sp-button') as Button;

        await elementUpdated(el);

        const otherElement = test.querySelector(
            '#other-element'
        ) as HTMLElement;
        let overlays = otherElement.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(0);

        const rect = el.getBoundingClientRect();
        let opened = oneEvent(el, 'sp-opened');
        // Open the Tooltip via "hover"
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    ],
                },
            ],
        });
        await opened;

        opened = oneEvent(el, 'sp-opened');
        // Open the Popover via "click"
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    ],
                },
            ],
        });
        await opened;

        overlays = otherElement.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(1);

        // `slottable-request` comes _after_ `sp-closed` and triggers DOM cleanup
        const closed = oneEvent(overlays[0], 'slottable-request');
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        rect.left - rect.width / 2,
                        rect.top - rect.height / 2,
                    ],
                },
            ],
        });
        await closed;

        // Wait for DOM clean up to complete
        await nextFrame();
        await nextFrame();

        overlays = otherElement.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(0);
    });
});
