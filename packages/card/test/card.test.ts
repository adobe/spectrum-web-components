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

import '../sp-card.js';
import { Card } from '../';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

import { Default, smallHorizontal } from '../stories/card.stories.js';
import { Checkbox } from '@spectrum-web-components/checkbox/src/Checkbox';
import { spy } from 'sinon';
import { spaceEvent } from '../../../test/testing-helpers.js';

describe('card', () => {
    it('loads', async () => {
        const el = await fixture<Card>(
            html`
                <sp-card heading="Card Heading" subheading="JPG">
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="footer">Footer</div>
                </sp-card>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [quiet]', async () => {
        const el = await fixture<Card>(
            html`
                <sp-card
                    variant="quiet"
                    heading="Card Heading"
                    subheading="JPG"
                >
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="description">10/15/18</div>
                    <div slot="footer">Footer</div>
                </sp-card>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('loads - [quiet][small]', async () => {
        const el = await fixture<Card>(
            html`
                <sp-card
                    small
                    heading="Card Heading"
                    subheading="JPG"
                    variant="quiet"
                    style="width: 115px;"
                >
                    <img
                        src="https://picsum.photos/300/400"
                        alt="Demo Graphic"
                        slot="preview"
                    />
                    <div slot="footer">Footer</div>
                    <sp-action-menu
                        slot="actions"
                        placement="bottom-end"
                        label="More Actions"
                    >
                        <sp-menu>
                            <sp-menu-item>Deselect</sp-menu-item>
                            <sp-menu-item>Select Inverse</sp-menu-item>
                            <sp-menu-item>Feather...</sp-menu-item>
                            <sp-menu-item>Select and Mask...</sp-menu-item>
                            <sp-menu-divider></sp-menu-divider>
                            <sp-menu-item>Save Selection</sp-menu-item>
                            <sp-menu-item disabled>Make Work Path</sp-menu-item>
                        </sp-menu>
                    </sp-action-menu>
                </sp-card>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [gallery]', async () => {
        const el = await fixture<Card>(
            html`
                <sp-card
                    variant="gallery"
                    heading="Card Heading"
                    subheading="JPG"
                >
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="description">10/15/18</div>
                    <div slot="footer">Footer</div>
                </sp-card>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [horizontal]', async () => {
        const el = await fixture<Card>(smallHorizontal(smallHorizontal.args));

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('converts `Space` to `click` event', async () => {
        const clickSpy = spy();
        const handleClick = (): void => clickSpy();
        const el = await fixture<Card>(Default(Default.args));
        el.addEventListener('click', handleClick);

        await elementUpdated(el);
        expect(el.focused, 'default focused').to.be.false;

        el.dispatchEvent(new Event('focusin'));
        await elementUpdated(el);
        expect(el.focused, 'first time focused').to.be.true;

        el.dispatchEvent(spaceEvent);
        await elementUpdated(el);
        expect(el.focused, 'still focused').to.be.true;
        expect(clickSpy.called).to.be.true;
        expect(clickSpy.calledOnce).to.be.true;
    });
    it('can be `[toggles]`', async () => {
        const el = await fixture<Card>(Default(Default.args));
        el.toggles = true;

        await elementUpdated(el);

        const checkbox = el.shadowRoot.querySelector('sp-checkbox') as Checkbox;
        expect(el.focused, 'default focused').to.be.false;
        expect(el.selected, 'default selected').to.be.false;

        el.dispatchEvent(new Event('focusin'));

        await elementUpdated(el);
        expect(el.focused, 'first time focused').to.be.true;
        expect(el.selected, 'still not selected').to.be.false;

        el.dispatchEvent(spaceEvent);

        await elementUpdated(el);
        expect(el.focused, 'still focused').to.be.true;
        expect(el.selected, 'first selected').to.be.true;

        el.addEventListener('change', (event: Event) => event.preventDefault());
        el.dispatchEvent(spaceEvent);

        await elementUpdated(el);
        expect(el.focused, 'still focused after default prevented').to.be.true;
        expect(el.selected, 'first selected after default prevented').to.be
            .true;

        checkbox.dispatchEvent(
            new Event('focusin', {
                composed: true,
                bubbles: true,
            })
        );
        checkbox.focus();

        await elementUpdated(el);
        expect(el.focused, 'still focused, again').to.be.true;
        expect(el.selected, 'still selected').to.be.true;

        el.dispatchEvent(new Event('focusin'));

        await elementUpdated(el);
        expect(el.focused, 'focused, again').to.be.true;
        expect(el.selected, 'still selected, again').to.be.true;

        el.dispatchEvent(new Event('focusout'));

        await elementUpdated(el);
        expect(el.focused, 'still not focused, again').to.be.false;
        expect(el.selected, 'still selected, again 2').to.be.true;

        el.dispatchEvent(new Event('focusout'));

        checkbox.click();

        await elementUpdated(el);
        expect(el.focused, 'still not focused, again 2').to.be.false;
        // change event is prevented
        expect(el.selected, 'still selected, again 3');
    });

    it('announces when `[toggles]`', async () => {
        const changeSpy = spy();
        const el = await fixture<Card>(Default(Default.args));
        el.toggles = true;
        el.addEventListener('change', changeSpy);

        await elementUpdated(el);

        const checkbox = el.shadowRoot.querySelector('sp-checkbox') as Checkbox;
        expect(el.selected, 'default to not selected').to.be.false;
        checkbox.click();
        await elementUpdated(el);

        expect(el.selected, 'selected');
        expect(changeSpy.callCount).to.equal(1);
        checkbox.click();
        await elementUpdated(el);

        expect(el.selected, 'no longer selected').to.be.false;
        expect(changeSpy.callCount).to.equal(2);
    });
    it('displays the `heading` attribute as `.title`', async () => {
        const testHeading = 'This is a test heading';
        const el = await fixture<Card>(
            html`
                <sp-card heading=${testHeading} subheading="JPG">
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="footer">Footer</div>
                </sp-card>
            `
        );

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const headingEl = root.querySelector('.title');

        expect(headingEl, 'did not find title element').to.not.be.null;
        expect((headingEl as HTMLDivElement).textContent).to.contain(
            testHeading,
            'the heading renders in the element'
        );
    });
    it('displays the slotted content as `.title`', async () => {
        const testHeading = 'This is a test heading';
        const el = await fixture<Card>(
            html`
                <sp-card subheading="JPG">
                    <h1 slot="heading">${testHeading}</h1>
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="footer">Footer</div>
                </sp-card>
            `
        );

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const headingSlot = root.querySelector(
            '.title [name="heading"]'
        ) as HTMLSlotElement;

        expect(headingSlot, 'did not find slot element').to.not.be.null;
        const nodes = headingSlot.assignedNodes();
        const h1Element = nodes.find(
            (node) => (node as HTMLElement).tagName === 'H1'
        );
        expect(h1Element, 'did not find H1 element').to.not.be.null;
        expect((h1Element as HTMLHeadingElement).textContent).to.contain(
            testHeading,
            'the slotted content renders in the element'
        );
    });
});
