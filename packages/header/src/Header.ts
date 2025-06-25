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
    CSSResultArray,
    html,
    nothing,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    queryAssignedNodes,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import { FocusGroupController } from '@spectrum-web-components/reactive-controllers/src/FocusGroup.js';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-left.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-close.js';

import styles from './header.css.js';

export type HeaderVariant = 'l1' | 'l2';
export type HeaderValidationError = {
    message: string;
    type: 'length' | 'characters' | 'empty' | 'server';
};
export type HeaderValidationCallback = (
    value: string
) => HeaderValidationError[] | null;

/**
 * @element sp-header
 *
 * @slot title - The main title content
 * @slot subtitle - The subtitle content (L1 only)
 * @slot start-actions - Action buttons at the start of the header
 * @slot end-actions - Action buttons at the end of the header
 * @slot status - Status indicators and badges (L2 only)
 * @slot middle-actions - Middle action buttons (L2 only)
 *
 * @fires sp-header-back - Dispatched when back button is clicked (L2 only)
 * @fires sp-header-edit-start - Dispatched when edit mode is started (L2 only)
 * @fires sp-header-edit-save - Dispatched when edit is saved (L2 only)
 * @fires sp-header-edit-cancel - Dispatched when edit is cancelled (L2 only)
 */
export class Header extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * The variant of the header - L1 for top-level pages, L2 for sub-pages
     */
    @property({ type: String, reflect: true })
    public variant: HeaderVariant = 'l1';

    /**
     * Whether the title can be edited (L2 only)
     */
    @property({ type: Boolean, reflect: true, attribute: 'editable-title' })
    public editableTitle = false;

    /**
     * The current title value
     */
    @property({ type: String })
    public override title = '';

    /**
     * The current subtitle value (L1 only)
     */
    @property({ type: String })
    public subtitle = '';

    /**
     * Whether the header is in edit mode (L2 only)
     */
    @property({ type: Boolean, reflect: true, attribute: 'edit-mode' })
    public editMode = false;

    /**
     * Custom validation function for title editing
     */
    @property({ attribute: false })
    public titleValidation?: HeaderValidationCallback;

    /**
     * Whether to show the back button (L2 only)
     */
    @property({ type: Boolean, reflect: true, attribute: 'show-back' })
    public showBack = false;

    /**
     * Disable the back button
     */
    @property({ type: Boolean, reflect: true, attribute: 'disable-back' })
    public disableBack = false;

    /**
     * Internal edit state
     */
    @state()
    private editValue = '';

    /**
     * Current validation errors
     */
    @state()
    private validationErrors: HeaderValidationError[] = [];

    /**
     * Track if we're in the middle of saving
     */
    @state()
    private saving = false;

    @queryAssignedNodes({ slot: 'start-actions' })
    private startActionNodes!: NodeListOf<HTMLElement>;

    @queryAssignedNodes({ slot: 'end-actions' })
    private endActionNodes!: NodeListOf<HTMLElement>;

    @queryAssignedNodes({ slot: 'middle-actions' })
    private middleActionNodes!: NodeListOf<HTMLElement>;

    private get actionElements(): HTMLElement[] {
        return [
            ...(this.startActionNodes || []),
            ...(this.middleActionNodes || []),
            ...(this.endActionNodes || []),
        ].filter((node: HTMLElement) => node.nodeType === Node.ELEMENT_NODE);
    }

    focusGroupController = new FocusGroupController<HTMLElement>(this, {
        direction: 'horizontal',
        elements: () => this.actionElements,
        isFocusableElement: (el: HTMLElement) => !el.hasAttribute('disabled'),
    });

    public override focus(): void {
        if (this.editMode) {
            const editInput = this.shadowRoot?.querySelector(
                '#title-input'
            ) as HTMLInputElement;
            editInput?.focus();
        } else {
            this.focusGroupController.focus();
        }
    }

    protected override willUpdate(changed: PropertyValues<this>): void {
        super.willUpdate(changed);

        if (changed.has('title') && !this.editMode) {
            this.editValue = this.title;
        }
    }

    protected override updated(changed: PropertyValues<this>): void {
        super.updated(changed);
    }

    private handleBackClick(): void {
        if (this.disableBack) return;

        this.dispatchEvent(
            new CustomEvent('sp-header-back', {
                bubbles: true,
                composed: true,
            })
        );
    }

    private handleEditStart(): void {
        if (!this.editableTitle || this.variant !== 'l2') return;

        this.editValue = this.title;
        this.editMode = true;
        this.validationErrors = [];

        this.dispatchEvent(
            new CustomEvent('sp-header-edit-start', {
                bubbles: true,
                composed: true,
                detail: { currentTitle: this.title },
            })
        );

        // Focus the input after it's rendered
        this.updateComplete.then(() => {
            const input = this.shadowRoot?.querySelector(
                '#title-input'
            ) as HTMLInputElement;
            input?.focus();
        });
    }

    private handleEditCancel(): void {
        this.editMode = false;
        this.editValue = this.title;
        this.validationErrors = [];

        this.dispatchEvent(
            new CustomEvent('sp-header-edit-cancel', {
                bubbles: true,
                composed: true,
            })
        );
    }

    private validateTitle(value: string): HeaderValidationError[] {
        const errors: HeaderValidationError[] = [];

        // Built-in validation
        if (!value.trim()) {
            errors.push({
                type: 'empty',
                message: 'Title cannot be empty',
            });
        }

        // Custom validation
        if (this.titleValidation) {
            const customErrors = this.titleValidation(value);
            if (customErrors) {
                errors.push(...customErrors);
            }
        }

        return errors;
    }

    private async handleEditSave(): Promise<void> {
        if (this.saving) return;

        const errors = this.validateTitle(this.editValue);
        this.validationErrors = errors;

        if (errors.length > 0) {
            return;
        }

        this.saving = true;

        try {
            const saveEvent = new CustomEvent('sp-header-edit-save', {
                bubbles: true,
                composed: true,
                detail: {
                    newTitle: this.editValue,
                    oldTitle: this.title,
                },
            });

            this.dispatchEvent(saveEvent);

            // If not prevented, update the title
            if (!saveEvent.defaultPrevented) {
                this.title = this.editValue;
                this.editMode = false;
                this.validationErrors = [];
            }
        } finally {
            this.saving = false;
        }
    }

    private handleTitleInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.editValue = input.value;

        // Clear validation errors on input
        if (this.validationErrors.length > 0) {
            this.validationErrors = [];
        }
    }

    private handleTitleKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleEditSave();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            this.handleEditCancel();
        }
    }

    private renderBackButton(): TemplateResult | typeof nothing {
        if (this.variant !== 'l2' || !this.showBack) {
            return nothing;
        }

        return html`
            <sp-action-button
                class="back-button"
                quiet
                ?disabled=${this.disableBack}
                @click=${this.handleBackClick}
                aria-label="Go back"
            >
                <sp-icon-chevron-left slot="icon"></sp-icon-chevron-left>
            </sp-action-button>
        `;
    }

    private renderTitle(): TemplateResult {
        if (this.variant === 'l2' && this.editableTitle && this.editMode) {
            return this.renderEditableTitle();
        }

        return this.renderStaticTitle();
    }

    private renderStaticTitle(): TemplateResult {
        const editButton =
            this.variant === 'l2' && this.editableTitle
                ? html`
                      <sp-action-button
                          class="edit-button"
                          size="s"
                          quiet
                          @click=${this.handleEditStart}
                          aria-label="Edit title"
                      >
                          <sp-icon-edit slot="icon"></sp-icon-edit>
                      </sp-action-button>
                  `
                : nothing;

        const titleContent = html`
            <slot name="title">${this.title}</slot>
            ${editButton}
        `;

        return html`
            <div class="title-container">
                ${this.variant === 'l1'
                    ? html`
                          <h1 class="title">${titleContent}</h1>
                      `
                    : html`
                          <h2 class="title">${titleContent}</h2>
                      `}
                ${this.variant === 'l1' && this.subtitle
                    ? html`
                          <p class="subtitle">
                              <slot name="subtitle">${this.subtitle}</slot>
                          </p>
                      `
                    : nothing}
            </div>
        `;
    }

    private renderEditableTitle(): TemplateResult {
        const hasErrors = this.validationErrors.length > 0;

        return html`
            <div class="title-edit-container">
                <sp-textfield
                    id="title-input"
                    class="title-input ${hasErrors ? 'invalid' : ''}"
                    .value=${this.editValue}
                    @input=${this.handleTitleInput}
                    @keydown=${this.handleTitleKeydown}
                    ?invalid=${hasErrors}
                    placeholder="Enter title..."
                ></sp-textfield>
                <div class="edit-actions">
                    <sp-action-button
                        class="save-button"
                        size="s"
                        variant="accent"
                        @click=${this.handleEditSave}
                        ?disabled=${this.saving}
                        ?pending=${this.saving}
                    >
                        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
                        Save
                    </sp-action-button>
                    <sp-action-button
                        class="cancel-button"
                        size="s"
                        quiet
                        @click=${this.handleEditCancel}
                        ?disabled=${this.saving}
                    >
                        <sp-icon-close slot="icon"></sp-icon-close>
                        Cancel
                    </sp-action-button>
                </div>
                ${hasErrors
                    ? html`
                          <div class="validation-errors">
                              ${this.validationErrors.map(
                                  (error) => html`
                                      <sp-help-text variant="negative">
                                          ${error.message}
                                      </sp-help-text>
                                  `
                              )}
                          </div>
                      `
                    : nothing}
            </div>
        `;
    }

    private renderStatusRow(): TemplateResult | typeof nothing {
        if (this.variant !== 'l2') {
            return nothing;
        }

        return html`
            <div class="status-row">
                <slot name="status"></slot>
            </div>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            <header class="header ${this.variant}">
                <div class="main-row">
                    ${this.renderBackButton()} ${this.renderTitle()}
                    <div class="actions-start">
                        <slot name="start-actions"></slot>
                    </div>
                    ${this.variant === 'l2'
                        ? html`
                              <div class="actions-middle">
                                  <slot name="middle-actions"></slot>
                              </div>
                          `
                        : nothing}
                    <div class="actions-end">
                        <slot name="end-actions"></slot>
                    </div>
                </div>
                ${this.renderStatusRow()}
            </header>
        `;
    }
}
