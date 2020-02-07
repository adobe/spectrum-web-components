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
import { QuickActions } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';
import { waitForPredicate } from '../../../test/testing-helpers';

type TestableQuickAnctionsType = {
    isShiftTabbing: boolean;
};

describe('Quick Action', () => {
    it('loads', async () => {
        const el = await fixture<QuickActions>(html`
            <sp-quick-actions>
                <sp-action-button quiet slot="action">
                    Action 1
                </sp-action-button>
                <sp-action-button quiet slot="action">
                    Action 2
                </sp-action-button>
                <img
                    tabindex="0"
                    src="https://placedog.net/300/400?id=15"
                    alt="Place Dog"
                />
            </sp-quick-actions>
        `);

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
    });
    it('loads - open', async () => {
        const el = await fixture<QuickActions>(html`
            <sp-quick-actions opened>
                <sp-action-button quiet slot="action">
                    Action 1
                </sp-action-button>
                <sp-action-button quiet slot="action">
                    Action 2
                </sp-action-button>
                <img
                    tabindex="0"
                    src="https://placedog.net/300/400?id=15"
                    alt="Place Dog"
                />
            </sp-quick-actions>
        `);

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
    });
    it('loads - open, overlay', async () => {
        const el = await fixture<QuickActions>(html`
            <sp-quick-actions opened overlay>
                <sp-action-button quiet slot="action">
                    Action 1
                </sp-action-button>
                <sp-action-button quiet slot="action">
                    Action 2
                </sp-action-button>
                <img
                    tabindex="0"
                    src="https://placedog.net/300/400?id=15"
                    alt="Place Dog"
                />
            </sp-quick-actions>
        `);

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
    });
    it('loads - open, isShiftTabbing', async () => {
        const el = await fixture<QuickActions>(html`
            <sp-quick-actions opened>
                <sp-action-button quiet slot="action">
                    Action 1
                </sp-action-button>
                <sp-action-button quiet slot="action">
                    Action 2
                </sp-action-button>
                <img
                    tabindex="0"
                    src="https://placedog.net/300/400?id=15"
                    alt="Place Dog"
                />
            </sp-quick-actions>
        `);

        await elementUpdated(el);

        el.dispatchEvent(new KeyboardEvent('keydown'));
        el.dispatchEvent(
            new KeyboardEvent('keydown', {
                shiftKey: true,
                code: 'Tab',
            })
        );

        await elementUpdated(el);

        expect(((el as unknown) as TestableQuickAnctionsType).isShiftTabbing).to
            .be.true;
        expect(el).shadowDom.to.equalSnapshot();

        el.opened = false;

        await elementUpdated(el);

        expect(((el as unknown) as TestableQuickAnctionsType).isShiftTabbing).to
            .be.false;
    });
    it('accepts `enter-from` values', async () => {
        const el = await fixture<QuickActions>(html`
            <sp-quick-actions>
                <sp-action-button quiet slot="action">
                    Action 1
                </sp-action-button>
                <sp-action-button quiet slot="action">
                    Action 2
                </sp-action-button>
                <img
                    tabindex="0"
                    src="https://placedog.net/300/400?id=15"
                    alt="Place Dog"
                />
            </sp-quick-actions>
        `);

        await elementUpdated(el);

        expect(el.enterFrom).to.equal('');
        expect(el.hasAttribute('enter-from')).to.be.false;

        el.enterFrom = 'left';

        await elementUpdated(el);

        expect(el.enterFrom).to.equal('left');
        expect(el.getAttribute('enter-from')).to.equal('left');

        el.setAttribute('enter-from', 'right');

        await elementUpdated(el);

        expect(el.enterFrom).to.equal('right');
        expect(el.getAttribute('enter-from')).to.equal('right');

        el.removeAttribute('enter-from');

        await elementUpdated(el);

        expect(el.enterFrom).to.equal('');
        expect(el.hasAttribute('enterFrom')).to.be.false;
    });
    it('validates `enter-from`', async () => {
        const el = await fixture<QuickActions>(html`
            <sp-quick-actions enter-from="bottom">
                <sp-action-button quiet slot="action">
                    Action 1
                </sp-action-button>
                <sp-action-button quiet slot="action">
                    Action 2
                </sp-action-button>
                <img
                    tabindex="0"
                    src="https://placedog.net/300/400?id=15"
                    alt="Place Dog"
                />
            </sp-quick-actions>
        `);

        await elementUpdated(el);

        expect(el.enterFrom).to.equal('');
        expect(el.hasAttribute('enter-from')).to.be.false;

        el.enterFrom = 'left';

        await elementUpdated(el);

        expect(el.enterFrom).to.equal('left');
        expect(el.getAttribute('enter-from')).to.equal('left');

        el.enterFrom = 'left';

        await elementUpdated(el);

        expect(el.enterFrom).to.equal('left');
        expect(el.getAttribute('enter-from')).to.equal('left');
    });
    it('opens', async () => {
        const el = await fixture<QuickActions>(html`
            <sp-quick-actions>
                <sp-action-button quiet slot="action">
                    Action 1
                </sp-action-button>
                <sp-action-button quiet slot="action">
                    Action 2
                </sp-action-button>
                <img
                    tabindex="0"
                    src="https://placedog.net/300/400?id=15"
                    alt="Place Dog"
                />
            </sp-quick-actions>
        `);

        await elementUpdated(el);

        expect(el.opened).to.be.false;
        const contents = el.shadowRoot
            ? (el.shadowRoot.querySelector('#contents') as HTMLDivElement)
            : (el.querySelector('#contents') as HTMLDivElement);
        contents.dispatchEvent(new MouseEvent('mouseenter'));

        await elementUpdated(el);

        expect(el.opened).to.be.true;
        el.opened = false;

        await elementUpdated(el);

        expect(el.opened).to.be.false;
        contents.dispatchEvent(new FocusEvent('focusin'));

        await elementUpdated(el);

        expect(el.opened).to.be.true;
    });
    it('closess', async () => {
        const el = await fixture<QuickActions>(html`
            <sp-quick-actions opened>
                <sp-action-button quiet slot="action">
                    Action 1
                </sp-action-button>
                <sp-action-button quiet slot="action">
                    Action 2
                </sp-action-button>
                <img
                    tabindex="0"
                    src="https://placedog.net/300/400?id=15"
                    alt="Place Dog"
                />
            </sp-quick-actions>
        `);

        await elementUpdated(el);

        expect(el.opened, 'loaded opened').to.be.true;
        const contents = el.shadowRoot
            ? (el.shadowRoot.querySelector('#contents') as HTMLDivElement)
            : (el.querySelector('#contents') as HTMLDivElement);
        contents.dispatchEvent(new MouseEvent('mouseleave'));

        await elementUpdated(el);
        await waitForPredicate(() => el.opened === false);

        expect(el.opened, 'mouseleave closes').to.be.false;
        el.opened = true;

        await elementUpdated(el);

        expect(el.opened, 'forces open').to.be.true;
        contents.dispatchEvent(new FocusEvent('focusout'));

        await elementUpdated(el);
        await waitForPredicate(() => el.opened === false);

        expect(el.opened, 'focusout closes').to.be.false;
    });
});
