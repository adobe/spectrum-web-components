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

import '@spectrum-web-components/picker/sync/sp-picker.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import { Picker } from '@spectrum-web-components/picker';
import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';

describe('Picker, responsive', () => {
    let el: Picker;
    const pickerFixture = async (): Promise<Picker> => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-field-label for="picker">
                        Where do you live?
                    </sp-field-label>
                    <sp-picker
                        id="picker"
                        style="width: 200px; --spectrum-alias-ui-icon-chevron-size-100: 10px;"
                    >
                        <sp-menu-item>Deselect</sp-menu-item>
                        <sp-menu-item value="option-2">
                            Select Inverse
                        </sp-menu-item>
                        <sp-menu-item>Feather...</sp-menu-item>
                        <sp-menu-item>Select and Mask...</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Save Selection</sp-menu-item>
                        <sp-menu-item disabled>Make Work Path</sp-menu-item>
                    </sp-picker>
                </div>
            `
        );

        return test.querySelector('sp-picker') as Picker;
    };

    describe('container', () => {
        beforeEach(async () => {
            el = await pickerFixture();
            await elementUpdated(el);
        });

        xit('is a Tray in mobile', async () => {
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
            el.open = true;
            await opened;

            const tray = el.shadowRoot.querySelector('sp-tray');

            expect(tray).to.not.be.null;
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

            expect(popover).to.not.be.null;
        });
    });
});
