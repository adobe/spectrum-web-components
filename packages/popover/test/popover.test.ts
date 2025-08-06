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
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import { Popover } from '@spectrum-web-components/popover';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

describe('popover', () => {
    let popover!: Popover;

    beforeEach(async () => {
        popover = await fixture<Popover>(html`
            <sp-popover placement="top" open>
                <sp-dialog>
                    <h3 slot="heading">Popover title</h3>
                    Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly
                    caramels. Icing soufflé chupa chups donut cheesecake.
                    Jelly-o chocolate cake sweet roll cake danish candy biscuit
                    halvah
                </sp-dialog>
            </sp-popover>
        `);
        await elementUpdated(popover);
    });

    it('loads', async () => {
        expect(popover).to.not.equal(undefined);
        expect(popover.textContent?.trim()).to.include('Popover title');

        await expect(popover).to.be.accessible();
    });
    it('tip exists only when tip attribute is true', async () => {
        if (!popover.shadowRoot) throw new Error('No shadowRoot');
        expect(popover.getAttribute('tip')).to.equal(null);

        let tip = popover.shadowRoot.querySelector('tip') as HTMLElement;
        expect(tip).to.equal(null);

        popover.setAttribute('tip', 'true');

        tip = popover.shadowRoot.querySelector('tip') as HTMLElement;
        expect(tip).to.not.equal(undefined);
    });

    it('surfaces tip element', async () => {
        const el = await fixture<Popover>(html`
            <sp-popover placement="top" tip open>
                <div id="title">Popover Title</div>
                <div id="content">
                    Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly
                    caramels. Icing soufflé chupa chups donut cheesecake.
                    Jelly-o chocolate cake sweet roll cake danish candy biscuit
                    halvah
                </div>
            </sp-popover>
        `);

        await elementUpdated(el);

        expect(typeof el.tipElement).to.not.equal('undefined');
    });
});
