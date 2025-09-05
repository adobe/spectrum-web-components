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
    elementUpdated,
    expect,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import { render, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-button.js';
import type { Tooltip } from '@spectrum-web-components/tooltip';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';
import { sendTabKey } from '../../../test/testing-helpers';

describe('Tooltip Directive', () => {
    const renderTooltip = (): TemplateResult => html`
        Tip me!
    `;
    function renderButton(
        ...directiveParams: Parameters<typeof tooltip>
    ): TemplateResult {
        return html`
            <sp-button ${tooltip(...directiveParams)}>
                I'm a button...
            </sp-button>
        `;
    }
    function opensTooltip(): void {
        it('opens tooltip not previously on DOM', async function () {
            await elementUpdated(this.el);

            const input = document.createElement('input');
            this.el.insertAdjacentElement('beforebegin', input);

            this.overlays = document.querySelectorAll('sp-overlay');
            expect(this.overlays.length).to.equal(0);

            const opened = oneEvent(this.el, 'sp-opened');
            input.focus();
            await sendTabKey();
            expect(document.activeElement === this.el).to.be.true;
            expect(this.el.matches(':focus-visible')).to.be.true;
            await opened;

            this.overlays = document.querySelectorAll('sp-overlay');
            expect(this.overlays.length).to.equal(1);
        });
    }
    function closesTooltip(): void {
        it('closes a tooltip and removes it from the DOM', async function () {
            // `slottable-request` comes _after_ `sp-closed` and triggers DOM cleanup
            const closed = oneEvent(this.overlays[0], 'slottable-request');
            this.el.blur();
            await closed;

            // Wait for DOM clean up to complete
            await nextFrame();
            await nextFrame();

            this.overlays = document.querySelectorAll('sp-overlay');
            expect(this.overlays.length).to.equal(0);
        });
    }
    describe('template only', () => {
        before(async function () {
            this.testEl = document.createElement('div');
            document.body.append(this.testEl);
            render(renderButton(renderTooltip), this.testEl);
            this.el = this.testEl.querySelector('sp-button');
            this.overlays = null;
        });
        after(function () {
            this.testEl.remove();
        });
        opensTooltip();
        closesTooltip();
    });
    describe('with `options`', () => {
        before(async function () {
            this.variant = 'positive';
            this.offset = 10;
            this.testEl = document.createElement('div');
            document.body.append(this.testEl);
            render(
                renderButton(renderTooltip, {
                    variant: this.variant,
                    overlayOptions: {
                        offset: this.offset,
                    },
                }),
                this.testEl
            );
            this.el = this.testEl.querySelector('sp-button');
            this.overlays = null;
        });
        after(function () {
            this.testEl.remove();
        });
        opensTooltip();
        it('passes `options` to the overlay', async function () {
            expect(this.overlays[0].offset).to.equal(this.offset);
            const tooltipEl = this.overlays[0].querySelector(
                'sp-tooltip'
            ) as Tooltip;
            expect(tooltipEl.variant).to.equal(this.variant);
        });
        closesTooltip();
    });
});
