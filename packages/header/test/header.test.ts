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

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import '@spectrum-web-components/header/sp-header.js';
import { Header } from '@spectrum-web-components/header';

describe('Header', () => {
    it('loads default header', async () => {
        const el = await fixture<Header>(html`
            <sp-header title="Test Title"></sp-header>
        `);

        await elementUpdated(el);

        expect(el).to.not.be.undefined;
        expect(el.title).to.equal('Test Title');
        expect(el.variant).to.equal('l1'); // default variant
    });

    it('loads L1 header with subtitle', async () => {
        const el = await fixture<Header>(html`
            <sp-header
                variant="l1"
                title="L1 Title"
                subtitle="This is a subtitle"
            ></sp-header>
        `);

        await elementUpdated(el);

        expect(el.variant).to.equal('l1');
        expect(el.title).to.equal('L1 Title');
        expect(el.subtitle).to.equal('This is a subtitle');
    });

    it('loads L2 header with back button', async () => {
        const el = await fixture<Header>(html`
            <sp-header variant="l2" title="L2 Title" show-back></sp-header>
        `);

        await elementUpdated(el);

        expect(el.variant).to.equal('l2');
        expect(el.title).to.equal('L2 Title');
        expect(el.showBack).to.be.true;
    });

    it('handles back button click', async () => {
        let backClicked = false;
        const el = await fixture<Header>(html`
            <sp-header
                variant="l2"
                title="L2 Title"
                show-back
                @sp-header-back=${() => {
                    backClicked = true;
                }}
            ></sp-header>
        `);

        await elementUpdated(el);

        const backButton = el.shadowRoot?.querySelector(
            '.back-button'
        ) as HTMLElement;
        expect(backButton).to.not.be.null;

        backButton.click();
        await elementUpdated(el);

        expect(backClicked).to.be.true;
    });

    it('handles editable title mode', async () => {
        const el = await fixture<Header>(html`
            <sp-header
                variant="l2"
                title="Editable Title"
                editable-title
            ></sp-header>
        `);

        await elementUpdated(el);

        expect(el.editableTitle).to.be.true;
        expect(el.editMode).to.be.false;

        // Test entering edit mode
        const editButton = el.shadowRoot?.querySelector(
            '.edit-button'
        ) as HTMLElement;
        expect(editButton).to.not.be.null;

        editButton.click();
        await elementUpdated(el);

        expect(el.editMode).to.be.true;
    });

    it('accepts slotted content in action slots', async () => {
        const el = await fixture<Header>(html`
            <sp-header title="Test Title">
                <sp-button slot="end-actions">Action Button</sp-button>
                <sp-badge slot="status">Status Badge</sp-badge>
            </sp-header>
        `);

        await elementUpdated(el);

        const actionButton = el.querySelector('[slot="end-actions"]');
        const statusBadge = el.querySelector('[slot="status"]');

        expect(actionButton).to.not.be.null;
        expect(statusBadge).to.not.be.null;
    });

    it('validates title input', async () => {
        const el = await fixture<Header>(html`
            <sp-header
                variant="l2"
                title="Test Title"
                editable-title
            ></sp-header>
        `);

        // Set up validation callback
        el.titleValidation = (title: string) => {
            if (title.length === 0)
                return [{ message: 'Title cannot be empty', type: 'empty' }];
            if (title.length > 50)
                return [{ message: 'Title too long', type: 'length' }];
            return [];
        };

        await elementUpdated(el);

        // Enter edit mode
        const editButton = el.shadowRoot?.querySelector(
            '.edit-button'
        ) as HTMLElement;
        editButton.click();
        await elementUpdated(el);

        // Test empty title validation
        const titleInput = el.shadowRoot?.querySelector(
            '.title-input input'
        ) as HTMLInputElement;
        expect(titleInput).to.not.be.null;

        titleInput.value = '';
        titleInput.dispatchEvent(new Event('input'));
        await elementUpdated(el);

        const errorElement = el.shadowRoot?.querySelector(
            '.validation-errors sp-help-text'
        );
        expect(errorElement?.textContent?.trim()).to.include(
            'Title cannot be empty'
        );
    });
});
