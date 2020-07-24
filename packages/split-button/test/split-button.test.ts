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

import { fixture, elementUpdated, expect, nextFrame } from '@open-wc/testing';
import { spy } from 'sinon';

import '../sp-split-button.js';
import { SplitButton } from '..';
import { cta, moreCta } from '../stories/split-button.stories.js';
import { MenuItem } from '@spectrum-web-components/menu';

const keyboardEvent = (code: string, eventDetails = {}): KeyboardEvent => {
    return new KeyboardEvent('keydown', {
        ...eventDetails,
        bubbles: true,
        composed: true,
        cancelable: true,
        code,
    });
};
const arrowDownEvent = keyboardEvent('ArrowDown');
const tabEvent = keyboardEvent('Tab');
const shiftTabEvent = keyboardEvent('Tab', { shiftKey: true });

interface TestableSplitButton {
    isShiftTabbing: boolean;
}

describe('Splitbutton', () => {
    it('loads [type="field"] splitbutton accessibly', async () => {
        const test = await fixture<HTMLDivElement>(cta());
        const el1 = test.querySelector('sp-split-button') as SplitButton;
        const el2 = test.querySelector('sp-split-button[left]') as SplitButton;

        await elementUpdated(el1);
        await elementUpdated(el2);

        expect(el1).to.be.accessible();
        expect(el2).to.be.accessible();
    });
    it('loads [type="more"] splitbutton accessibly', async () => {
        const test = await fixture<HTMLDivElement>(moreCta());
        const el1 = test.querySelector('sp-split-button') as SplitButton;
        const el2 = test.querySelector('sp-split-button[left]') as SplitButton;

        await elementUpdated(el1);
        await elementUpdated(el2);

        expect(el1).to.be.accessible();
        expect(el2).to.be.accessible();
    });
    it('manages tab interactions', async () => {
        const test = await fixture<HTMLDivElement>(moreCta());
        const el = test.querySelector('sp-split-button') as SplitButton;

        await elementUpdated(el);

        const root = (el.shadowRoot ? el.shadowRoot : el) as ShadowRoot;
        const trigger = root.querySelector('.trigger') as HTMLButtonElement;

        el.focus();

        await elementUpdated(el);

        expect(root.activeElement).to.equal(el.focusElement);

        await elementUpdated(el);
        el.focusElement.dispatchEvent(shiftTabEvent);
        expect(((el as unknown) as TestableSplitButton).isShiftTabbing).to.be
            .true;
        await nextFrame();

        trigger.focus();

        expect(root.activeElement).to.equal(trigger);
        await elementUpdated(el);

        trigger.dispatchEvent(tabEvent);
        expect(
            ((el as unknown) as TestableSplitButton).isShiftTabbing,
            'forward from trigger'
        ).to.be.false;

        await elementUpdated(el);

        trigger.focus();
        trigger.dispatchEvent(shiftTabEvent);
        expect(
            ((el as unknown) as TestableSplitButton).isShiftTabbing,
            'backward from trigger'
        ).to.be.false;
    });
    it('[type="field"] manages `selectedItemText`', async () => {
        const test = await fixture<HTMLDivElement>(cta());
        const el = test.querySelector('sp-split-button') as SplitButton;

        await elementUpdated(el);

        expect(el.selectedItemText).to.equal('Option 1');
        expect(el.open).to.be.false;

        const item3 = el.querySelector('sp-menu-item:nth-child(3)') as MenuItem;
        const root = el.shadowRoot ? el.shadowRoot : el;
        const toggleButton = root.querySelector(
            '.trigger'
        ) as HTMLButtonElement;
        toggleButton.click();

        await elementUpdated(el);

        expect(el.open).to.be.true;

        item3.click();

        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItemText).to.equal('Short');
    });
    it('[type="more"] manages `selectedItemText`', async () => {
        const test = await fixture<HTMLDivElement>(moreCta());
        const el = test.querySelector('sp-split-button') as SplitButton;

        await elementUpdated(el);

        expect(el.selectedItemText).to.equal('Option 1');
        expect(el.open).to.be.false;

        const item3 = el.querySelector('sp-menu-item:nth-child(3)') as MenuItem;
        const root = el.shadowRoot ? el.shadowRoot : el;
        const toggleButton = root.querySelector(
            '.trigger'
        ) as HTMLButtonElement;
        toggleButton.click();

        await elementUpdated(el);

        expect(el.open).to.be.true;

        item3.click();

        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItemText).to.equal('Option 1');
    });
    it('passes click events as [type="field"]', async () => {
        const firstItemSpy = spy();
        const secondItemSpy = spy();
        const thirdItemSpy = spy();
        const test = await fixture<HTMLDivElement>(
            cta({
                firstItemHandler: (): void => firstItemSpy(),
                secondItemHandler: (): void => secondItemSpy(),
                thirdItemHandler: (): void => thirdItemSpy(),
            })
        );
        const el = test.querySelector('sp-split-button') as SplitButton;

        await elementUpdated(el);

        expect(el.selectedItemText).to.equal('Option 1');
        expect(el.open).to.be.false;

        const item1 = el.querySelector('sp-menu-item:nth-child(1)') as MenuItem;
        const item2 = el.querySelector('sp-menu-item:nth-child(2)') as MenuItem;
        const item3 = el.querySelector('sp-menu-item:nth-child(3)') as MenuItem;
        const root = el.shadowRoot ? el.shadowRoot : el;
        const main = root.querySelector('#button') as HTMLButtonElement;

        main.click();

        await elementUpdated(el);

        expect(firstItemSpy.called, 'first called').to.be.true;
        expect(firstItemSpy.calledOnce, 'first calledOnce').to.be.true;

        const trigger = root.querySelector('.trigger') as HTMLButtonElement;
        trigger.click();

        await elementUpdated(el);

        expect(el.open, 'open').to.be.true;

        item3.click();

        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(thirdItemSpy.called, 'third called').to.be.true;
        expect(thirdItemSpy.calledOnce, 'third calledOnce').to.be.true;

        main.click();

        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItemText).to.equal('Short');
        expect(thirdItemSpy.called, 'third called, still').to.be.true;
        expect(thirdItemSpy.callCount, 'third callCount').to.equal(2);
        expect(thirdItemSpy.calledTwice, 'third calledTwice').to.be.true;

        trigger.focus();
        trigger.dispatchEvent(arrowDownEvent);

        await elementUpdated(el);

        expect(el.open, 'reopened').to.be.true;

        item2.click();

        await elementUpdated(el);

        main.click();

        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItemText).to.equal('Option Extended');
        expect(secondItemSpy.called, 'second called').to.be.true;
        expect(secondItemSpy.calledTwice, 'second twice').to.be.true;

        trigger.click();

        await elementUpdated(el);

        expect(el.open, 'opened again').to.be.true;

        item1.click();
        await elementUpdated(el);

        main.click();

        await elementUpdated(el);

        expect(el.selectedItemText).to.equal('Option 1');
        expect(firstItemSpy.called, 'first called, sill').to.be.true;
        expect(firstItemSpy.callCount, 'first callCount').to.equal(3);
    });
    it('passes click events as [type="more"]', async () => {
        const firstItemSpy = spy();
        const secondItemSpy = spy();
        const thirdItemSpy = spy();
        const test = await fixture<HTMLDivElement>(
            moreCta({
                firstItemHandler: (): void => firstItemSpy(),
                secondItemHandler: (): void => secondItemSpy(),
                thirdItemHandler: (): void => thirdItemSpy(),
            })
        );
        const el = test.querySelector('sp-split-button') as SplitButton;

        await elementUpdated(el);

        expect(el.selectedItemText).to.equal('Option 1');
        expect(el.open).to.be.false;

        const item2 = el.querySelector('sp-menu-item:nth-child(2)') as MenuItem;
        const item3 = el.querySelector('sp-menu-item:nth-child(3)') as MenuItem;
        const root = el.shadowRoot ? el.shadowRoot : el;
        const main = root.querySelector('#button') as HTMLButtonElement;

        main.click();

        await elementUpdated(el);

        expect(firstItemSpy.called).to.be.true;
        expect(firstItemSpy.calledOnce).to.be.true;

        const trigger = root.querySelector('.trigger') as HTMLButtonElement;
        trigger.click();

        await elementUpdated(el);

        expect(el.open).to.be.true;

        item3.click();

        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItemText).to.equal('Option 1');
        expect(thirdItemSpy.called).to.be.true;
        expect(thirdItemSpy.calledOnce).to.be.true;

        trigger.click();

        await elementUpdated(el);

        expect(el.open).to.be.true;

        item2.click();

        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItemText).to.equal('Option 1');
        expect(secondItemSpy.called).to.be.true;
        expect(secondItemSpy.calledOnce).to.be.true;

        main.click();

        await elementUpdated(el);

        expect(firstItemSpy.called).to.be.true;
        expect(firstItemSpy.calledTwice).to.be.true;
    });
});
