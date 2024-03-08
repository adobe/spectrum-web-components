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
import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';
import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';
import type { Tooltip } from '@spectrum-web-components/tooltip';

describe('Tooltip Directive', () => {
    it('opens an Overlay that was previously not on the DOM', async function () {
        const el = await fixture<Button>(html`
            <sp-button
                ${tooltip(
                    () =>
                        html`
                            Tip me!
                        `
                )}
            >
                I'm a button...
            </sp-button>
        `);

        await elementUpdated(el);

        let overlays = document.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(0);

        const opened = oneEvent(el, 'sp-opened');
        el.focus();
        await opened;

        overlays = document.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(1);

        // `slottable-request` comes _after_ `sp-closed` and triggers DOM cleanup
        const closed = oneEvent(overlays[0], 'slottable-request');
        el.blur();
        await closed;

        // Wait for DOM clean up to complete
        await nextFrame();
        await nextFrame();

        overlays = document.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(0);
    });

    it('accepts `options`', async function () {
        const variant = 'positive';
        const offset = 10;
        const el = await fixture<Button>(html`
            <sp-button
                ${tooltip(
                    () =>
                        html`
                            Tip me!
                        `,
                    {
                        variant,
                        overlayOptions: {
                            offset,
                        },
                    }
                )}
            >
                I'm a button...
            </sp-button>
        `);

        await elementUpdated(el);

        let overlays = document.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(0);

        const opened = oneEvent(el, 'sp-opened');
        el.focus();
        await opened;

        overlays = document.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(1);
        expect(overlays[0].offset).to.equal(offset);
        const tooltipEl = overlays[0].querySelector('sp-tooltip') as Tooltip;
        expect(tooltipEl.variant).to.equal(variant);

        // `slottable-request` comes _after_ `sp-closed` and triggers DOM cleanup
        const closed = oneEvent(overlays[0], 'slottable-request');
        el.blur();
        await closed;

        // Wait for DOM clean up to complete
        await nextFrame();
        await nextFrame();

        overlays = document.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(0);
    });
});
