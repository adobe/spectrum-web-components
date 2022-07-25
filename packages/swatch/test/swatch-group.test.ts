/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { elementUpdated, expect, fixture, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import '../sp-swatch.js';
import { Swatch, SwatchGroup } from '../';
import { Default } from '../stories/swatch-group.stories.js';
import { spy } from 'sinon';
import { html } from '@spectrum-web-components/base';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('Swatch Group', () => {
    let el: SwatchGroup;
    beforeEach(async () => {
        el = await fixture<SwatchGroup>(Default(Default.args));

        await elementUpdated(el);
    });
    testForLitDevWarnings(
        async () => await fixture<SwatchGroup>(Default(Default.args))
    );
    it('loads default swatch accessibly', async () => {
        await expect(el).to.be.accessible();
    });
    it('forwards `border` to children', async () => {
        el.border = 'light';
        await elementUpdated(el);

        ([...el.children] as Swatch[]).forEach((child) => {
            expect(child.border).to.equal('light');
        });
    });
    it('forwards `rounding` to children', async () => {
        el.rounding = 'full';
        await elementUpdated(el);

        ([...el.children] as Swatch[]).forEach((child) => {
            expect(child.rounding).to.equal('full');
        });
    });
    it('forwards `size` to children', async () => {
        el.size = 'xs';
        await elementUpdated(el);

        ([...el.children] as Swatch[]).forEach((child) => {
            expect(child.size).to.equal('xs');
        });
    });
    it('forwards `shape` to children', async () => {
        el.shape = 'rectangle';
        await elementUpdated(el);

        ([...el.children] as Swatch[]).forEach((child) => {
            expect(child.shape).to.equal('rectangle');
        });
    });
    it('unsets forwarding', async () => {
        el.border = 'light';
        el.rounding = 'full';
        el.size = 'xs';
        el.shape = 'rectangle';
        await elementUpdated(el);

        ([...el.children] as Swatch[]).forEach((child) => {
            expect(child.border).to.not.be.undefined;
            expect(child.rounding).to.not.be.undefined;
            expect(child.size).to.not.equal('m');
            expect(child.shape).to.not.be.undefined;
        });

        el.border = undefined;
        el.rounding = undefined;
        el.removeAttribute('size');
        el.shape = undefined;
        await elementUpdated(el);

        ([...el.children] as Swatch[]).forEach((child) => {
            expect(child.border).to.equal(undefined);
            expect(child.rounding).to.equal(undefined);
            expect(child.size).to.equal('m');
            expect(child.shape).to.equal(undefined);
        });
    });
    it('does not dispatch `change` events without `selects` attribute', async () => {
        const selectedChild = el.querySelector(
            ':scope > sp-swatch:nth-child(4)'
        ) as Swatch;

        const changeSpy = spy();

        el.addEventListener('change', () => changeSpy());

        expect(el.selected).to.deep.equal([]);

        selectedChild.click();

        expect(changeSpy.called).to.be.false;
        expect(el.selected).to.deep.equal([]);
    });
    it('dispatches `change` events as [selects="single"]', async () => {
        el.selects = 'single';
        const selectedChild = el.querySelector(
            ':scope > sp-swatch:nth-child(4)'
        ) as Swatch;

        const changeSpy = spy();

        el.addEventListener('change', () => changeSpy());

        expect(el.selected).to.deep.equal([]);
        expect(selectedChild.selected).to.be.false;

        selectedChild.click();

        expect(changeSpy.calledOnce).to.be.true;
        expect(el.selected).to.deep.equal([selectedChild.value]);
        expect(selectedChild.selected).to.be.true;
    });
    it('can have `change` events prevented', async () => {
        el.selects = 'single';
        const selectedChild = el.querySelector(
            ':scope > sp-swatch:nth-child(4)'
        ) as Swatch;

        el.addEventListener('change', (event: Event) => event.preventDefault());

        expect(el.selected).to.deep.equal([]);
        expect(selectedChild.selected).to.be.false;

        selectedChild.click();

        expect(el.selected).to.deep.equal([]);
        expect(selectedChild.selected).to.be.false;
    });
    it('dispatches `change` events as [selects="multiple"]', async () => {
        el.selects = 'multiple';
        const selectedChild0 = el.querySelector(
            ':scope > sp-swatch:nth-child(1)'
        ) as Swatch;
        const selectedChild1 = el.querySelector(
            ':scope > sp-swatch:nth-child(4)'
        ) as Swatch;
        const selectedChild2 = el.querySelector(
            ':scope > sp-swatch:nth-child(6)'
        ) as Swatch;

        await elementUpdated(selectedChild0);

        const changeSpy = spy();

        el.addEventListener('change', () => changeSpy());

        expect(el.selected).to.deep.equal([]);

        selectedChild0.click();
        selectedChild1.click();
        selectedChild2.click();

        expect(changeSpy.callCount).to.equal(3);
        expect(el.selected).to.deep.equal([
            selectedChild0.value,
            selectedChild1.value,
            selectedChild2.value,
        ]);
    });
    it('filters `selected` when a selected Swatch is removed from the DOM', async () => {
        el.selects = 'multiple';
        const selectedChild0 = el.querySelector(
            ':scope > sp-swatch:nth-child(1)'
        ) as Swatch;
        const selectedChild1 = el.querySelector(
            ':scope > sp-swatch:nth-child(4)'
        ) as Swatch;
        const selectedChild2 = el.querySelector(
            ':scope > sp-swatch:nth-child(6)'
        ) as Swatch;

        await elementUpdated(selectedChild0);

        expect(el.selected).to.deep.equal([]);

        selectedChild0.click();
        selectedChild1.click();
        selectedChild2.click();

        expect(el.selected).to.deep.equal([
            selectedChild0.value,
            selectedChild1.value,
            selectedChild2.value,
        ]);

        selectedChild0.remove();
        await elementUpdated(el);

        expect(el.selected).to.deep.equal([
            selectedChild1.value,
            selectedChild2.value,
        ]);

        selectedChild2.remove();
        await elementUpdated(el);

        expect(el.selected).to.deep.equal([selectedChild1.value]);

        selectedChild1.remove();
        await elementUpdated(el);

        expect(el.selected).to.deep.equal([]);
    });
    it('maintains a single tab stop', async () => {
        const inputBefore = document.createElement('input');
        const inputAfter = document.createElement('input');
        el.insertAdjacentElement('beforebegin', inputBefore);
        el.insertAdjacentElement('afterend', inputAfter);
        inputBefore.focus();
        expect(document.activeElement === el.children[0]).to.be.false;
        await sendKeys({
            press: 'Tab',
        });
        expect(document.activeElement === el.children[0]).to.be.true;
        await sendKeys({
            press: 'Tab',
        });
        expect(document.activeElement === el.children[0]).to.be.false;
        await sendKeys({
            press: 'Shift+Tab',
        });
        expect(document.activeElement === el.children[0]).to.be.true;
    });
    it('makes the first selected child the single tab stop', async () => {
        const selectedChild = el.querySelector(
            ':scope > sp-swatch:nth-child(4)'
        ) as Swatch;
        expect(selectedChild.selected).to.be.false;

        const inputBefore = document.createElement('input');
        const inputAfter = document.createElement('input');
        el.insertAdjacentElement('beforebegin', inputBefore);
        el.insertAdjacentElement('afterend', inputAfter);
        inputBefore.focus();
        el.selects = 'single';
        el.selected = [selectedChild.value];
        await elementUpdated(el);
        await nextFrame();

        expect(selectedChild.selected).to.be.true;

        expect(document.activeElement === selectedChild).to.be.false;
        await sendKeys({
            press: 'Tab',
        });
        expect(document.activeElement === selectedChild).to.be.true;
        await sendKeys({
            press: 'Tab',
        });
        expect(document.activeElement === selectedChild).to.be.false;
        await sendKeys({
            press: 'Shift+Tab',
        });
        expect(document.activeElement === selectedChild).to.be.true;
    });
    it('focus()es to the first Swatch', async () => {
        el.focus();
        expect(document.activeElement === el.children[0]).to.be.true;
    });
    it('focus()es to the first selected Swatch', async () => {
        const selectedChild = el.querySelector(
            ':scope > sp-swatch:nth-child(4)'
        ) as Swatch;
        expect(selectedChild.selected).to.be.false;
        el.selects = 'single';
        el.selected = [selectedChild.value];
        await elementUpdated(el);
        await nextFrame();

        expect(selectedChild.selected).to.be.true;
        el.focus();
        expect(document.activeElement === selectedChild).to.be.true;
    });
});

describe('Swatch Group - DOM selected', () => {
    it('accepts selection from DOM', async () => {
        const el = await fixture<SwatchGroup>(html`
            <sp-swatch-group selects="multiple">
                <sp-swatch value="color-0" color="red"></sp-swatch>
                <sp-swatch value="color-1" color="green" selected></sp-swatch>
                <sp-swatch value="color-2" color="blue"></sp-swatch>
                <sp-swatch value="color-3" color="yellow" selected></sp-swatch>
            </sp-swatch-group>
        `);

        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['color-1', 'color-3']);
    });
    it('merges `selected` and selection from DOM', async () => {
        const el = await fixture<SwatchGroup>(html`
            <sp-swatch-group selects="multiple" .selected=${['color-1']}>
                <sp-swatch value="color-0" color="red"></sp-swatch>
                <sp-swatch value="color-1" color="green"></sp-swatch>
                <sp-swatch value="color-2" color="blue"></sp-swatch>
                <sp-swatch value="color-3" color="yellow" selected></sp-swatch>
            </sp-swatch-group>
        `);

        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['color-1', 'color-3']);
    });
    it('lazily accepts selection from DOM', async () => {
        const el = await fixture<SwatchGroup>(html`
            <sp-swatch-group selects="multiple">
                <sp-swatch value="color-0" color="red"></sp-swatch>
                <sp-swatch value="color-1" color="green"></sp-swatch>
                <sp-swatch value="color-2" color="blue"></sp-swatch>
                <sp-swatch value="color-3" color="yellow" selected></sp-swatch>
            </sp-swatch-group>
        `);

        await elementUpdated(el);
        const color1 = el.querySelector('[value="color-1"]') as Swatch;

        expect(el.selected).to.deep.equal(['color-3']);

        color1.selected = true;
        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['color-3', 'color-1']);
    });
});
