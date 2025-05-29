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
    fixture,
    html,
    nextFrame,
} from '@open-wc/testing';
import { TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/dialog/sp-dialog.js';
import { Dialog } from '@spectrum-web-components/dialog';
import {
    alertError,
    dismissable,
    fullscreen,
    small,
} from '../stories/dialog.stories.js';
import { spy } from 'sinon';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('Dialog', () => {
    testForLitDevWarnings(async () => await fixture<Dialog>(small()));
    it('loads `[size=small]` dialog accessibly', async () => {
        const el = await fixture<Dialog>(small());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads `[size=alert]` dialog accessibly', async () => {
        const el = await fixture<Dialog>(alertError());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads `[dismissable]` dialog accessibly', async () => {
        const el = await fixture<Dialog>(dismissable());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads `[mode=fullscreen]` dialog accessibly', async () => {
        const el = await fixture<Dialog>(fullscreen());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads dialog without footer accessibly', async () => {
        const el = await fixture<Dialog>(small());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('does not recycle applied content ids', async () => {
        const el = await fixture<Dialog>(html`
            <sp-dialog size="s">
                <h2 slot="heading">Disclaimer</h2>
            </sp-dialog>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();

        const paragraph = document.createElement('p');
        paragraph.textContent = 'Added paragraph.';

        el.querySelector('p')?.remove();
        el.insertAdjacentElement('beforeend', paragraph);

        // Slotchange time exists outside of the standard update lifecycle
        await nextFrame();

        await elementUpdated(el);

        await expect(el).to.be.accessible();

        paragraph.querySelector('p')?.remove();

        // Slotchange time exists outside of the standard update lifecycle
        await nextFrame();

        await elementUpdated(el);

        await expect(el).to.be.accessible();

        el.insertAdjacentElement('beforeend', paragraph);

        // Slotchange time exists outside of the standard update lifecycle
        await nextFrame();

        await elementUpdated(el);

        await expect(el).to.be.accessible();

        const heading = document.createElement('h2');
        heading.slot = 'heading';
        heading.textContent = 'New heading';

        el.querySelector('h2')?.remove();
        el.insertAdjacentElement('afterbegin', heading);

        // Slotchange time exists outside of the standard update lifecycle
        await nextFrame();

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('closes', async () => {
        const closeSpy = spy();
        const el = await fixture<Dialog>(dismissable());
        el.addEventListener('close', () => closeSpy());
        await elementUpdated(el);

        const closeButton = (
            el.shadowRoot
                ? el.shadowRoot.querySelector('.close-button')
                : el.querySelector('.close-button ')
        ) as HTMLElement;

        expect(closeButton.ariaLabel).to.be.equals('Close');

        closeButton.click();

        await elementUpdated(el);
        expect(closeSpy.calledOnce).to.be.true;
    });
    it('allows hero override', async () => {
        class Override extends Dialog {
            protected override get hasHero(): boolean {
                return true;
            }
            protected override renderHero(): TemplateResult {
                return html`
                    <div id="hero-container"></div>
                `;
            }
        }

        customElements.define('hero-dialog', Override);

        const el = await fixture<Override>(html`
            <hero-dialog></hero-dialog>
        `);

        const container = el.shadowRoot.querySelector('#hero-container');
        expect(container).to.not.be.null;
    });
    it('allows heading override', async () => {
        class Override extends Dialog {
            protected override renderHeading(): TemplateResult {
                return html`
                    <h2 id="heading-container">Test</h2>
                `;
            }
        }

        customElements.define('heading-dialog', Override);

        const el = await fixture<Override>(html`
            <heading-dialog></heading-dialog>
        `);

        const container = el.shadowRoot.querySelector('#heading-container');
        expect(container).to.not.be.null;
    });
    it('allows content override', async () => {
        class Override extends Dialog {
            protected override renderContent(): TemplateResult {
                return html`
                    <p id="content-container">Test</p>
                `;
            }
        }

        customElements.define('content-dialog', Override);

        const el = await fixture<Override>(html`
            <content-dialog></content-dialog>
        `);

        const container = el.shadowRoot.querySelector('#content-container');
        expect(container).to.not.be.null;
    });
    it('allows footer override', async () => {
        class Override extends Dialog {
            protected override get hasFooter(): boolean {
                return true;
            }
            protected override renderFooter(): TemplateResult {
                return html`
                    <p id="footer-container">Test</p>
                `;
            }
        }

        customElements.define('footer-dialog', Override);

        const el = await fixture<Override>(html`
            <footer-dialog></footer-dialog>
        `);

        const container = el.shadowRoot.querySelector('#footer-container');
        expect(container).to.not.be.null;
    });
    it('allows button override', async () => {
        class Override extends Dialog {
            protected override get hasButtons(): boolean {
                return true;
            }
            protected override renderButtons(): TemplateResult {
                return html`
                    <p id="button-container">Test</p>
                `;
            }
        }

        customElements.define('button-dialog', Override);

        const el = await fixture<Override>(html`
            <button-dialog></button-dialog>
        `);

        const container = el.shadowRoot.querySelector('#button-container');
        expect(container).to.not.be.null;
    });
    it('allows dismiss override', async () => {
        class Override extends Dialog {
            protected override renderDismiss(): TemplateResult {
                return html`
                    <p id="dismiss-container">Test</p>
                `;
            }
        }

        customElements.define('dismiss-dialog', Override);

        const el = await fixture<Override>(html`
            <dismiss-dialog dismissable></dismiss-dialog>
        `);

        const container = el.shadowRoot.querySelector('#dismiss-container');
        expect(container).to.not.be.null;
    });
});
