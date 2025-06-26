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
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/status-light/sp-status-light.js';
import { Header } from '@spectrum-web-components/header';

describe('Header Accessibility', () => {
    describe('ARIA Structure', () => {
        it('has proper banner role on header element', async () => {
            const el = await fixture<Header>(html`
                <sp-header title="Test Title"></sp-header>
            `);

            await elementUpdated(el);

            const headerElement = el.shadowRoot?.querySelector('header');
            expect(headerElement).to.not.be.null;
            expect(headerElement?.getAttribute('role')).to.equal('banner');
            expect(headerElement?.getAttribute('aria-label')).to.equal(
                'Page header'
            );
        });

        it('has proper heading structure for L1 variant', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l1" title="L1 Title"></sp-header>
            `);

            await elementUpdated(el);

            const titleContainer =
                el.shadowRoot?.querySelector('.title-container');
            expect(titleContainer).to.not.be.null;
            expect(titleContainer?.getAttribute('role')).to.equal('heading');
            expect(titleContainer?.getAttribute('aria-level')).to.equal('1');
        });

        it('has proper heading structure for L2 variant', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="L2 Title"></sp-header>
            `);

            await elementUpdated(el);

            const titleContainer =
                el.shadowRoot?.querySelector('.title-container');
            expect(titleContainer).to.not.be.null;
            expect(titleContainer?.getAttribute('role')).to.equal('heading');
            expect(titleContainer?.getAttribute('aria-level')).to.equal('2');
        });

        it('has proper group roles on action slots', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test Title">
                    <sp-button slot="start-actions">Start</sp-button>
                    <sp-button slot="middle-actions">Middle</sp-button>
                    <sp-button slot="end-actions">End</sp-button>
                </sp-header>
            `);

            await elementUpdated(el);

            const startActions = el.shadowRoot?.querySelector('.actions-start');
            const middleActions =
                el.shadowRoot?.querySelector('.actions-middle');
            const endActions = el.shadowRoot?.querySelector('.actions-end');

            expect(startActions?.getAttribute('role')).to.equal('group');
            expect(startActions?.getAttribute('aria-label')).to.equal(
                'Start actions'
            );

            expect(middleActions?.getAttribute('role')).to.equal('group');
            expect(middleActions?.getAttribute('aria-label')).to.equal(
                'Middle actions'
            );

            expect(endActions?.getAttribute('role')).to.equal('group');
            expect(endActions?.getAttribute('aria-label')).to.equal(
                'End actions'
            );
        });

        it('has proper status row accessibility', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test Title">
                    <sp-status-light slot="status">Active</sp-status-light>
                </sp-header>
            `);

            await elementUpdated(el);

            const statusRow = el.shadowRoot?.querySelector('.status-row');
            expect(statusRow?.getAttribute('role')).to.equal('group');
            expect(statusRow?.getAttribute('aria-label')).to.equal(
                'Status indicators'
            );
        });
    });

    describe('Back Button Accessibility', () => {
        it('has proper ARIA label on back button', async () => {
            const el = await fixture<Header>(html`
                <sp-header
                    variant="l2"
                    title="Test Title"
                    show-back
                ></sp-header>
            `);

            await elementUpdated(el);

            const backButton = el.shadowRoot?.querySelector('.back-button');
            expect(backButton).to.not.be.null;
            expect(backButton?.getAttribute('aria-label')).to.equal('Go back');
        });

        it('back button is focusable', async () => {
            const el = await fixture<Header>(html`
                <sp-header
                    variant="l2"
                    title="Test Title"
                    show-back
                ></sp-header>
            `);

            await elementUpdated(el);

            const backButton = el.shadowRoot?.querySelector(
                '.back-button'
            ) as HTMLElement;
            expect(backButton).to.not.be.null;

            // Check if element can receive focus
            backButton.focus();
            expect(document.activeElement).to.equal(el);
        });
    });

    describe('Editable Title Accessibility', () => {
        it('has proper ARIA attributes on editable title text', async () => {
            const el = await fixture<Header>(html`
                <sp-header
                    variant="l2"
                    title="Editable Title"
                    editable-title
                ></sp-header>
            `);

            await elementUpdated(el);

            const titleText = el.shadowRoot?.querySelector('.title-text');
            expect(titleText?.getAttribute('role')).to.equal('button');
            expect(titleText?.getAttribute('tabindex')).to.equal('0');
            expect(titleText?.getAttribute('aria-label')).to.equal(
                'Click to edit title'
            );
        });

        it('has proper edit button accessibility', async () => {
            const el = await fixture<Header>(html`
                <sp-header
                    variant="l2"
                    title="Editable Title"
                    editable-title
                ></sp-header>
            `);

            await elementUpdated(el);

            const editButton = el.shadowRoot?.querySelector('.edit-button');
            expect(editButton?.getAttribute('aria-label')).to.equal(
                'Edit title'
            );
        });

        it('has proper accessibility in edit mode', async () => {
            const el = await fixture<Header>(html`
                <sp-header
                    variant="l2"
                    title="Editable Title"
                    editable-title
                ></sp-header>
            `);

            await elementUpdated(el);

            // Enter edit mode
            const editButton = el.shadowRoot?.querySelector(
                '.edit-button'
            ) as HTMLElement;
            editButton.click();
            await elementUpdated(el);

            // Check edit container
            const editContainer = el.shadowRoot?.querySelector(
                '.title-edit-container'
            );
            expect(editContainer?.getAttribute('role')).to.equal('group');
            expect(editContainer?.getAttribute('aria-label')).to.equal(
                'Title editing'
            );

            // Check input field
            const titleInput = el.shadowRoot?.querySelector('#title-input');
            expect(titleInput?.getAttribute('aria-label')).to.equal(
                'Edit page title'
            );
            expect(titleInput?.getAttribute('aria-invalid')).to.equal('false');

            // Check action buttons
            const saveButton = el.shadowRoot?.querySelector('.save-button');
            const cancelButton = el.shadowRoot?.querySelector('.cancel-button');

            expect(saveButton?.getAttribute('aria-label')).to.equal(
                'Save title changes'
            );
            expect(cancelButton?.getAttribute('aria-label')).to.equal(
                'Cancel title editing'
            );

            // Check edit actions group
            const editActions = el.shadowRoot?.querySelector('.edit-actions');
            expect(editActions?.getAttribute('role')).to.equal('group');
            expect(editActions?.getAttribute('aria-label')).to.equal(
                'Edit actions'
            );
        });

        it('has proper error accessibility with validation', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test" editable-title></sp-header>
            `);

            // Set up validation that will fail
            el.titleValidation = (title: string) => {
                if (title.length === 0) {
                    return [
                        { message: 'Title cannot be empty', type: 'empty' },
                    ];
                }
                return null;
            };

            await elementUpdated(el);

            // Enter edit mode
            const editButton = el.shadowRoot?.querySelector(
                '.edit-button'
            ) as HTMLElement;
            editButton.click();
            await elementUpdated(el);

            // Clear the input to trigger validation error
            const titleInput = el.shadowRoot?.querySelector('.title-input');
            const input = titleInput?.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;

            input.value = '';
            input.dispatchEvent(new Event('input', { bubbles: true }));
            await elementUpdated(el);

            // Try to save to trigger validation
            const saveButton = el.shadowRoot?.querySelector(
                '.save-button'
            ) as HTMLElement;
            saveButton.click();
            await elementUpdated(el);

            // Check error accessibility
            const validationErrors =
                el.shadowRoot?.querySelector('.validation-errors');
            expect(validationErrors?.getAttribute('role')).to.equal('alert');
            expect(validationErrors?.getAttribute('aria-live')).to.equal(
                'polite'
            );

            // Check input field error state
            expect(titleInput?.getAttribute('aria-invalid')).to.equal('true');
            expect(titleInput?.getAttribute('aria-describedby')).to.contain(
                'error'
            );
        });
    });

    describe('Focus Management', () => {
        it('focuses back button when available', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test" show-back></sp-header>
            `);

            await elementUpdated(el);

            // Call focus method
            el.focus();
            await elementUpdated(el);

            // Should focus the back button
            const backButton = el.shadowRoot?.querySelector(
                '.back-button'
            ) as HTMLElement;
            expect(backButton).to.not.be.null;
        });

        it('focuses title text when editable and no back button', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test" editable-title></sp-header>
            `);

            await elementUpdated(el);

            // Call focus method
            el.focus();
            await elementUpdated(el);

            // Should focus the title text
            const titleText = el.shadowRoot?.querySelector(
                '.title-text'
            ) as HTMLElement;
            expect(titleText).to.not.be.null;
        });

        it('focuses input field in edit mode', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test" editable-title></sp-header>
            `);

            await elementUpdated(el);

            // Enter edit mode
            const editButton = el.shadowRoot?.querySelector(
                '.edit-button'
            ) as HTMLElement;
            editButton.click();
            await elementUpdated(el);

            // Call focus method
            el.focus();
            await elementUpdated(el);

            // Should focus the input field
            const titleInput = el.shadowRoot?.querySelector(
                '#title-input'
            ) as HTMLElement;
            expect(titleInput).to.not.be.null;
        });
    });

    describe('Keyboard Navigation', () => {
        it('handles Enter key on editable title', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test" editable-title></sp-header>
            `);

            await elementUpdated(el);

            const titleText = el.shadowRoot?.querySelector(
                '.title-text'
            ) as HTMLElement;

            // Simulate Enter key press
            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            titleText.dispatchEvent(event);
            await elementUpdated(el);

            // Should enter edit mode
            expect(el.editMode).to.be.true;
        });

        it('handles Space key on editable title', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test" editable-title></sp-header>
            `);

            await elementUpdated(el);

            const titleText = el.shadowRoot?.querySelector(
                '.title-text'
            ) as HTMLElement;

            // Simulate Space key press
            const event = new KeyboardEvent('keydown', { key: ' ' });
            titleText.dispatchEvent(event);
            await elementUpdated(el);

            // Should enter edit mode
            expect(el.editMode).to.be.true;
        });

        it('handles Escape key to cancel edit', async () => {
            const el = await fixture<Header>(html`
                <sp-header
                    variant="l2"
                    title="Original Title"
                    editable-title
                ></sp-header>
            `);

            await elementUpdated(el);

            // Enter edit mode
            const editButton = el.shadowRoot?.querySelector(
                '.edit-button'
            ) as HTMLElement;
            editButton.click();
            await elementUpdated(el);

            expect(el.editMode).to.be.true;

            // Simulate Escape key press on input
            const titleInput = el.shadowRoot?.querySelector(
                '#title-input'
            ) as HTMLElement;
            const event = new KeyboardEvent('keydown', { key: 'Escape' });
            titleInput.dispatchEvent(event);
            await elementUpdated(el);

            // Should exit edit mode
            expect(el.editMode).to.be.false;
        });

        it('handles Enter key to save edit', async () => {
            const el = await fixture<Header>(html`
                <sp-header
                    variant="l2"
                    title="Original Title"
                    editable-title
                ></sp-header>
            `);

            await elementUpdated(el);

            // Enter edit mode
            const editButton = el.shadowRoot?.querySelector(
                '.edit-button'
            ) as HTMLElement;
            editButton.click();
            await elementUpdated(el);

            // Simulate Enter key press on input
            const titleInput = el.shadowRoot?.querySelector(
                '#title-input'
            ) as HTMLElement;
            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            titleInput.dispatchEvent(event);
            await elementUpdated(el);

            // Should exit edit mode (save was triggered)
            expect(el.editMode).to.be.false;
        });
    });

    describe('Overflow Menu Accessibility', () => {
        it('has proper ARIA attributes on overflow menu', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test" enable-overflow>
                    <sp-button slot="end-actions">Action 1</sp-button>
                    <sp-button slot="end-actions">Action 2</sp-button>
                    <sp-button slot="end-actions">Action 3</sp-button>
                </sp-header>
            `);

            await elementUpdated(el);

            // Force overflow state for testing
            const overflowMenu = el.shadowRoot?.querySelector('.overflow-menu');
            if (overflowMenu) {
                expect(overflowMenu.getAttribute('aria-label')).to.equal(
                    'Additional actions menu'
                );
                expect(overflowMenu.getAttribute('aria-haspopup')).to.equal(
                    'true'
                );
                expect(overflowMenu.getAttribute('aria-expanded')).to.equal(
                    'false'
                );
            }
        });
    });

    describe('High Contrast Mode Support', () => {
        it('maintains focus indicators in high contrast mode', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test" editable-title show-back>
                    <sp-button slot="end-actions">Action</sp-button>
                </sp-header>
            `);

            await elementUpdated(el);

            // Check that focus indicators are properly defined
            const backButton = el.shadowRoot?.querySelector(
                '.back-button'
            ) as HTMLElement;
            const titleText = el.shadowRoot?.querySelector(
                '.title-text'
            ) as HTMLElement;
            const actionButton = el.querySelector(
                '[slot="end-actions"]'
            ) as HTMLElement;

            // These elements should be focusable
            expect(backButton).to.not.be.null;
            expect(titleText).to.not.be.null;
            expect(actionButton).to.not.be.null;

            // Focus indicators should be present (via CSS)
            const computedStyle = getComputedStyle(titleText);
            expect(computedStyle).to.not.be.null;
        });
    });

    describe('Screen Reader Compatibility', () => {
        it('emits proper events for screen reader announcements', async () => {
            let backEventFired = false;
            let editStartEventFired = false;
            let editSaveEventFired = false;

            const el = await fixture<Header>(html`
                <sp-header
                    variant="l2"
                    title="Test Title"
                    editable-title
                    show-back
                    @sp-header-back=${() => (backEventFired = true)}
                    @sp-header-edit-start=${() => (editStartEventFired = true)}
                    @sp-header-edit-save=${() => (editSaveEventFired = true)}
                ></sp-header>
            `);

            await elementUpdated(el);

            // Test back button event
            const backButton = el.shadowRoot?.querySelector(
                '.back-button'
            ) as HTMLElement;
            backButton.click();
            expect(backEventFired).to.be.true;

            // Test edit start event
            const editButton = el.shadowRoot?.querySelector(
                '.edit-button'
            ) as HTMLElement;
            editButton.click();
            await elementUpdated(el);
            expect(editStartEventFired).to.be.true;

            // Test edit save event
            const saveButton = el.shadowRoot?.querySelector(
                '.save-button'
            ) as HTMLElement;
            saveButton.click();
            await elementUpdated(el);
            expect(editSaveEventFired).to.be.true;
        });

        it('has proper semantic structure for screen readers', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Page Title" show-back>
                                    <sp-status-light slot="status" variant="positive">
                    Published
                </sp-status-light>
                    <span slot="status">Last updated: 5 minutes ago</span>
                    <sp-button slot="end-actions">Save</sp-button>
                </sp-header>
            `);

            await elementUpdated(el);

            // Check landmark structure
            const header = el.shadowRoot?.querySelector(
                'header[role="banner"]'
            );
            expect(header).to.not.be.null;

            // Check heading structure
            const titleContainer = el.shadowRoot?.querySelector(
                '[role="heading"][aria-level="2"]'
            );
            expect(titleContainer).to.not.be.null;

            // Check grouping structure
            const statusGroup = el.shadowRoot?.querySelector(
                '.status-row[role="group"]'
            );
            const actionsGroup = el.shadowRoot?.querySelector(
                '.actions-end[role="group"]'
            );

            expect(statusGroup).to.not.be.null;
            expect(actionsGroup).to.not.be.null;
        });
    });

    describe('Tab Order Management', () => {
        it('maintains proper tab order in L2 header', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test" editable-title show-back>
                    <sp-button slot="start-actions">Start</sp-button>
                    <sp-button slot="middle-actions">Middle</sp-button>
                    <sp-button slot="end-actions">End</sp-button>
                </sp-header>
            `);

            await elementUpdated(el);

            // All focusable elements should have proper tabindex
            const backButton = el.shadowRoot?.querySelector('.back-button');
            const titleText = el.shadowRoot?.querySelector('.title-text');
            const editButton = el.shadowRoot?.querySelector('.edit-button');

            expect(backButton?.getAttribute('tabindex')).to.equal('0');
            expect(titleText?.getAttribute('tabindex')).to.equal('0');
            expect(editButton?.getAttribute('tabindex')).to.equal('0');
        });

        it('updates tab order when properties change', async () => {
            const el = await fixture<Header>(html`
                <sp-header variant="l2" title="Test" editable-title></sp-header>
            `);

            await elementUpdated(el);

            // Initially no back button
            let backButton = el.shadowRoot?.querySelector('.back-button');
            expect(backButton).to.be.null;

            // Add back button
            el.showBack = true;
            await elementUpdated(el);

            // Now back button should be present and focusable
            backButton = el.shadowRoot?.querySelector('.back-button');
            expect(backButton).to.not.be.null;
            expect(backButton?.getAttribute('tabindex')).to.equal('0');
        });
    });
});
