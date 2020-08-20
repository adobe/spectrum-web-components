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

import { fixture, elementUpdated, expect, html } from '@open-wc/testing';
import { spy } from 'sinon';

import '../sp-tag.js';
import '../sp-tags.js';
import { Tag } from '..';
import { ClearButton } from '@spectrum-web-components/button';
import {
    deleteEvent,
    spaceEvent,
    backspaceEvent,
    enterEvent,
} from '../../../test/testing-helpers.js';

describe('Tag', () => {
    it('loads default tags accessibly', async () => {
        const el = await fixture<Tag>(
            html`
                <sp-tags>
                    <sp-tag>Tag 1</sp-tag>
                    <sp-tag invalid>Tag 2</sp-tag>
                    <sp-tag disabled>Tag 3</sp-tag>
                    <sp-tag deletable>Tag 4</sp-tag>
                </sp-tags>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('[disabled] manages [aria-disabled]', async () => {
        const el = await fixture<Tag>(
            html`
                <sp-tags>
                    <sp-tag>Tag 1</sp-tag>
                    <sp-tag invalid>Tag 2</sp-tag>
                    <sp-tag disabled>Tag 3</sp-tag>
                    <sp-tag deletable>Tag 4</sp-tag>
                </sp-tags>
            `
        );
        const notDisabled = el.querySelector('sp-tag') as Tag;
        const disabled = el.querySelector('[disabled]') as Tag;

        await elementUpdated(disabled);

        expect(notDisabled.hasAttribute('aria-disabled')).to.be.false;
        expect(disabled.hasAttribute('aria-disabled')).to.be.true;
        expect(disabled.getAttribute('aria-disabled')).to.equal('true');
    });
    it('dispatches `delete` events on click', async () => {
        const deleteSpy = spy();
        const handleDelete = (): void => deleteSpy();
        const el = await fixture<Tag>(
            html`
                <sp-tag @delete=${handleDelete} deletable>Tag 1</sp-tag>
            `
        );

        await elementUpdated(el);

        expect(deleteSpy.called).to.be.false;

        const root: HTMLElement | DocumentFragment = el.shadowRoot
            ? el.shadowRoot
            : el;
        const deleteButton = root.querySelector(
            'sp-clear-button'
        ) as ClearButton;
        deleteButton.click();

        await elementUpdated(el);

        expect(deleteSpy.called).to.be.true;
        expect(deleteSpy.callCount).to.equal(1);
    });
    it('dispatches `delete` events on keyboard input', async () => {
        const deleteSpy = spy();
        const handleDelete = (): void => deleteSpy();
        let expectedEventCount = 0;
        const el = await fixture<Tag>(
            html`
                <sp-tag @delete=${handleDelete}>Tag 1</sp-tag>
            `
        );
        const testKeyboardEvent = async (
            event: KeyboardEvent
        ): Promise<void> => {
            expectedEventCount += 1;

            el.dispatchEvent(event);
            await elementUpdated(el);

            expect(deleteSpy.called).to.be.true;
            expect(
                deleteSpy.callCount,
                `Accepts "${event.code}" key input`
            ).to.equal(expectedEventCount);
        };

        await elementUpdated(el);

        expect(deleteSpy.called).to.be.false;

        el.dispatchEvent(new FocusEvent('focusin'));
        await elementUpdated(el);

        el.dispatchEvent(deleteEvent);
        await elementUpdated(el);

        expect(deleteSpy.called).to.be.false;

        el.deletable = true;
        await elementUpdated(el);

        el.dispatchEvent(enterEvent);
        await elementUpdated(el);

        expect(deleteSpy.called).to.be.false;

        testKeyboardEvent(deleteEvent);
        testKeyboardEvent(spaceEvent);
        testKeyboardEvent(backspaceEvent);

        el.dispatchEvent(new FocusEvent('focusout'));
        await elementUpdated(el);

        el.dispatchEvent(deleteEvent);
        expect(
            deleteSpy.callCount,
            'Does not respond after `focusout`'
        ).to.equal(expectedEventCount);
    });
});
