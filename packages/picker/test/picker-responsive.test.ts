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
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sync/sp-picker.js';
import { setViewport } from '@web/test-runner-commands';
import { spreadProps } from '../../../test/lit-helpers.js';
import { sendMouse } from '../../../test/plugins/browser.js';
import { isChrome } from '@spectrum-web-components/shared';

describe('Picker, responsive', () => {
    let el: Picker;
    const pickerFixture = async (args?: {
        forcePopover: boolean;
    }): Promise<Picker> => {
        const test = await fixture<HTMLDivElement>(html`
            <div>
                <sp-field-label for="picker">Where do you live?</sp-field-label>
                <sp-picker
                    id="picker"
                    style="width: 200px; --spectrum-alias-ui-icon-chevron-size-100: 10px;"
                    ${spreadProps(args || {})}
                >
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-picker>
            </div>
        `);

        return test.querySelector('sp-picker') as Picker;
    };

    describe('container', () => {
        beforeEach(async () => {
            el = await pickerFixture();
            await elementUpdated(el);
        });

        it('is a Tray in mobile', async () => {
            /**
             * This is a hack to set the `isMobile` property to true so that we can test the MobileController
             */
            el.isMobile.matches = true;
            el.bindEvents();

            /**
             * While we can set the view port, but not `(hover: none) and (pointer: coarse)`
             * which prevents us from testing this at unit time. Hopefully there will be
             * a future version of Playwright and/or @web/test-runner that does allow this.
             * See: https://github.com/microsoft/playwright/issues/11781
             **/
            await setViewport({ width: 360, height: 640 });
            // Allow viewport update to propagate.
            await nextFrame();

            const opened = oneEvent(el, 'sp-opened');

            const boundingRect = el.button.getBoundingClientRect();
            sendMouse({
                steps: [
                    {
                        type: 'click',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                ],
            });

            await opened;

            const tray = el.shadowRoot.querySelector('sp-tray');
            const popover = el.shadowRoot.querySelector('sp-popover');

            expect(tray).to.not.be.null;
            expect(popover).to.be.null;
        });

        it('is a Popover in desktop', async () => {
            await setViewport({ width: 701, height: 640 });
            // Allow viewport update to propagate.
            await nextFrame();
            await nextFrame();

            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            const popover = el.shadowRoot.querySelector('sp-popover');
            const tray = el.shadowRoot.querySelector('sp-tray');

            expect(popover).to.not.be.null;
            expect(tray).to.be.null;
        });
    });

    describe('forcePopover', () => {
        beforeEach(async () => {
            el = await pickerFixture({ forcePopover: true });
            await elementUpdated(el);
        });

        it('is a Popover in mobile', async function () {
            // This test is flaky in chrome on ci so we're skipping it for now
            if (isChrome()) {
                return;
            }

            /**
             * This is a hack to set the `isMobile` property to true so that we can test the MobileController
             */
            el.isMobile.matches = true;
            el.bindEvents();
            await elementUpdated(el);

            /**
             * While we can set the view port, but not `(hover: none) and (pointer: coarse)`
             * which prevents us from testing this at unit time. Hopefully there will be
             * a future version of Playwright and/or @web/test-runner that does allow this.
             * See: https://github.com/microsoft/playwright/issues/11781
             **/
            await setViewport({ width: 360, height: 640 });

            // Wait until the element is fully updated after viewport change
            await waitUntil(
                () => el.offsetWidth > 0,
                'Element should be visible'
            );
            await elementUpdated(el);

            // Setup event listener before clicking
            const opened = oneEvent(el, 'sp-opened');

            const boundingRect = el.button.getBoundingClientRect();
            sendMouse({
                steps: [
                    {
                        type: 'click',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                ],
            });

            // Wait for element to update after click
            await elementUpdated(el);

            // Wait for the opened event with a more explicit error message
            await opened.catch(() => {
                throw new Error(
                    'sp-opened event was not fired within the timeout period'
                );
            });

            // Wait until the popover is actually in the DOM
            await waitUntil(
                () => el.shadowRoot.querySelector('sp-popover') !== null,
                'Popover should be present in the DOM'
            );

            const tray = el.shadowRoot.querySelector('sp-tray');
            const popover = el.shadowRoot.querySelector('sp-popover');

            expect(popover).to.not.be.null;
            expect(tray).to.be.null;
        });

        it('is a Popover in desktop', async () => {
            await setViewport({ width: 701, height: 640 });
            // Allow viewport update to propagate.
            await nextFrame();
            await nextFrame();

            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            const popover = el.shadowRoot.querySelector('sp-popover');
            const tray = el.shadowRoot.querySelector('sp-tray');

            expect(tray).to.be.null;
            expect(popover).to.not.be.null;
        });
    });
});
