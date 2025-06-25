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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
    queryAssignedElements,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import { FocusGroupController } from '@spectrum-web-components/reactive-controllers/src/FocusGroup.js';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/toast/sp-toast.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-left.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-close.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';

import styles from './header.css.js';

export type HeaderVariant = 'l1' | 'l2';
export type HeaderValidationError = {
    message: string;
    type: 'length' | 'characters' | 'empty' | 'server';
};
export type HeaderValidationCallback = (
    value: string
) => HeaderValidationError[] | null;

export type HeaderOverflowBehavior = 'hide' | 'menu' | 'scroll';
export type HeaderActionPriority = 'low' | 'medium' | 'high' | 'critical';

/**
 * @element sp-header
 *
 * @slot title - The main title content
 * @slot subtitle - The subtitle content (L1 only)
 * @slot start-actions - Action buttons at the start of the header (L1: ✅, L2: ✅)
 * @slot middle-actions - Middle action buttons (L1: ❌, L2: ✅ only)
 * @slot end-actions - Action buttons at the end of the header (L1: ✅, L2: ✅)
 * @slot status - Status indicators and badges (L2 only)
 *
 * @fires sp-header-back - Dispatched when back button is clicked (L2 only)
 * @fires sp-header-edit-start - Dispatched when edit mode is started (L2 only)
 * @fires sp-header-edit-save - Dispatched when edit is saved (L2 only)
 * @fires sp-header-edit-cancel - Dispatched when edit is cancelled (L2 only)
 * @fires sp-header-title-renamed - Dispatched when title is successfully renamed (L2 only)
 *
 * ## Action Slot Limitations:
 * - **L1 Header**: Maximum 2 action slots (start-actions, end-actions)
 * - **L2 Header**: Maximum 3 action slots (start-actions, middle-actions, end-actions)
 * - **Dividers**: Only available for L2 headers with `show-action-dividers` property
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
     * Whether to show success toast after title rename
     */
    @property({ type: Boolean, attribute: 'show-success-toast' })
    public showSuccessToast = true;

    /**
     * Custom success toast message
     */
    @property({ type: String, attribute: 'success-toast-message' })
    public successToastMessage = 'Title has been renamed';

    /**
     * Maximum character limit for title editing (defaults to no limit)
     */
    @property({ type: Number, attribute: 'max-title-length' })
    public maxTitleLength?: number;

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

    /**
     * Whether title is truncated and should show tooltip
     */
    @state()
    private titleTruncated = false;

    /**
     * Whether to show success toast
     */
    @state()
    private showToast = false;

    /**
     * Track overflow state
     */
    @state()
    private isOverflowing = false;

    /**
     * Actions currently in overflow menu, grouped by slot
     */
    @state()
    private overflowActions: {
        startActions: HTMLElement[];
        middleActions: HTMLElement[];
        endActions: HTMLElement[];
    } = {
        startActions: [],
        middleActions: [],
        endActions: [],
    };

    /**
     * Actions currently visible
     */
    @state()
    private visibleActions: HTMLElement[] = [];

    /**
     * Available width for actions
     */
    @state()
    private availableWidth = 0;

    /**
     * How to handle overflow of action slots
     */
    @property({ type: String, attribute: 'overflow-behavior' })
    public overflowBehavior: HeaderOverflowBehavior = 'menu';

    /**
     * Enable responsive overflow handling
     */
    @property({ type: Boolean, attribute: 'enable-overflow' })
    public enableOverflow = true;

    /**
     * Minimum space (px) required before triggering overflow
     */
    @property({ type: Number, attribute: 'overflow-threshold' })
    public overflowThreshold = 120;

    /**
     * Maximum actions to show before overflow (0 = no limit)
     */
    @property({ type: Number, attribute: 'max-visible-actions' })
    public maxVisibleActions = 0;

    @query('#title-input')
    private titleInput?: HTMLInputElement;

    @query('.title-text')
    private titleTextElement?: HTMLElement;

    @query('.main-row')
    private mainRowElement?: HTMLElement;

    @queryAssignedElements({ slot: 'start-actions', flatten: true })
    private startActionNodes!: HTMLElement[];

    @queryAssignedElements({ slot: 'end-actions', flatten: true })
    private endActionNodes!: HTMLElement[];

    @queryAssignedElements({ slot: 'middle-actions', flatten: true })
    private middleActionNodes!: HTMLElement[];

    private get actionElements(): HTMLElement[] {
        return [
            ...(this.startActionNodes || []),
            ...(this.middleActionNodes || []),
            ...(this.endActionNodes || []),
        ];
    }

    private get hasStartActions(): boolean {
        return this.startActionNodes && this.startActionNodes.length > 0;
    }

    private get hasMiddleActions(): boolean {
        return this.middleActionNodes && this.middleActionNodes.length > 0;
    }

    private get hasEndActions(): boolean {
        return this.endActionNodes && this.endActionNodes.length > 0;
    }

    focusGroupController = new FocusGroupController<HTMLElement>(this, {
        direction: 'horizontal',
        elements: () => this.actionElements,
        isFocusableElement: (el: HTMLElement) => !el.hasAttribute('disabled'),
    });

    private resizeObserver?: ResizeObserver;
    private actionPriorityMap = new WeakMap<
        HTMLElement,
        HeaderActionPriority
    >();

    public override focus(): void {
        if (this.editMode) {
            this.titleInput?.focus();
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

        // Check if title is truncated after render
        this.updateComplete.then(() => {
            this.checkTitleTruncation();
        });
    }

    private checkTitleTruncation(): void {
        if (this.titleTextElement && this.variant === 'l2' && !this.editMode) {
            const isOverflowing =
                this.titleTextElement.scrollWidth >
                this.titleTextElement.clientWidth;
            this.titleTruncated = isOverflowing;
        } else {
            this.titleTruncated = false;
        }
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
            this.titleInput?.focus();
            this.titleInput?.select();
        });
    }

    private handleTitleClick(): void {
        if (this.variant === 'l2' && this.editableTitle && !this.editMode) {
            this.handleEditStart();
        }
    }

    private handleTitleKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleTitleClick();
        }
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

        // Character limit validation
        if (this.maxTitleLength && value.length > this.maxTitleLength) {
            errors.push({
                type: 'length',
                message: 'Max character limit reached.',
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
        const oldTitle = this.title;

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

                // Dispatch renamed event for external listeners
                this.dispatchEvent(
                    new CustomEvent('sp-header-title-renamed', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            newTitle: this.title,
                            oldTitle: oldTitle,
                        },
                    })
                );

                // Show success toast if enabled
                if (this.showSuccessToast) {
                    this.showToast = true;
                    // Auto-hide toast after 6 seconds
                    setTimeout(() => {
                        this.showToast = false;
                    }, 6000);
                }
            }
        } finally {
            this.saving = false;
        }
    }

    private handleTitleInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.editValue = input.value;

        // Real-time validation - show errors as user types
        if (
            this.maxTitleLength &&
            this.editValue.length > this.maxTitleLength
        ) {
            this.validationErrors = this.validateTitle(this.editValue);
        } else {
            // Clear validation errors if under limit
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

    private handleOutsideClick = (event: Event): void => {
        if (this.editMode) {
            const composedPath = event.composedPath();
            const clickedInsideHeader = composedPath.some(
                (element) => element === this
            );
            if (!clickedInsideHeader) {
                this.handleEditCancel();
            }
        }
    };

    private handleToastClose(): void {
        this.showToast = false;
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        document.addEventListener('click', this.handleOutsideClick);

        if (this.enableOverflow) {
            this.setupResizeObserver();
        }
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
        document.removeEventListener('click', this.handleOutsideClick);

        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    private setupResizeObserver(): void {
        if (!this.resizeObserver) {
            this.resizeObserver = new ResizeObserver(() => {
                this.updateComplete.then(() => {
                    this.handleResize();
                });
            });
        }

        this.updateComplete.then(() => {
            if (this.mainRowElement) {
                this.resizeObserver!.observe(this.mainRowElement);
            }
        });
    }

    private handleResize(): void {
        if (!this.enableOverflow || !this.mainRowElement) return;

        this.calculateAvailableSpace();
        this.manageActionOverflow();
    }

    private calculateAvailableSpace(): void {
        if (!this.mainRowElement) return;

        const containerWidth = this.mainRowElement.offsetWidth;
        const backButtonWidth =
            this.querySelector('.back-button')?.getBoundingClientRect().width ||
            0;
        const titleWidth =
            this.querySelector('.title-container')?.getBoundingClientRect()
                .width || 0;
        const gap = 12; // CSS gap value in pixels

        this.availableWidth =
            containerWidth -
            backButtonWidth -
            titleWidth -
            gap * 3 -
            this.overflowThreshold;
    }

    private manageActionOverflow(): void {
        if (!this.enableOverflow) return;

        const allActions = [...this.actionElements];
        if (allActions.length === 0) return;

        // Sort actions by priority (critical first, low last)
        const sortedActions = this.sortActionsByPriority(allActions);

        let currentWidth = 0;
        const visible: HTMLElement[] = [];
        const overflow = {
            startActions: [] as HTMLElement[],
            middleActions: [] as HTMLElement[],
            endActions: [] as HTMLElement[],
        };

        for (const action of sortedActions) {
            const actionWidth = this.getActionWidth(action);

            if (
                this.maxVisibleActions > 0 &&
                visible.length >= this.maxVisibleActions
            ) {
                this.addActionToOverflowGroup(action, overflow);
                continue;
            }

            if (currentWidth + actionWidth <= this.availableWidth) {
                visible.push(action);
                currentWidth += actionWidth;
            } else {
                this.addActionToOverflowGroup(action, overflow);
            }
        }

        // Always show overflow menu if there are overflow actions
        const totalOverflowActions =
            overflow.startActions.length +
            overflow.middleActions.length +
            overflow.endActions.length;
        const needsOverflowMenu = totalOverflowActions > 0;
        if (needsOverflowMenu) {
            const overflowMenuWidth = 40; // Estimated width of overflow menu button
            if (
                currentWidth + overflowMenuWidth > this.availableWidth &&
                visible.length > 0
            ) {
                // Move the last visible action to overflow to make room for the menu
                const lastVisible = visible.pop()!;
                this.addActionToOverflowGroup(lastVisible, overflow);
            }
        }

        this.visibleActions = visible;
        this.overflowActions = overflow;
        this.isOverflowing = needsOverflowMenu;

        this.updateActionVisibility();
    }

    private sortActionsByPriority(actions: HTMLElement[]): HTMLElement[] {
        return actions.sort((a, b) => {
            const priorityA = this.getActionPriority(a);
            const priorityB = this.getActionPriority(b);

            const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
            return priorityOrder[priorityA] - priorityOrder[priorityB];
        });
    }

    private getActionPriority(action: HTMLElement): HeaderActionPriority {
        // Check for explicit priority attribute
        const priority = action.getAttribute(
            'data-priority'
        ) as HeaderActionPriority;
        if (
            priority &&
            ['low', 'medium', 'high', 'critical'].includes(priority)
        ) {
            return priority;
        }

        // Check cached priority
        if (this.actionPriorityMap.has(action)) {
            return this.actionPriorityMap.get(action)!;
        }

        // Determine priority based on action characteristics
        let inferredPriority: HeaderActionPriority = 'medium';

        // Primary/accent buttons are typically high priority
        if (
            action.getAttribute('variant') === 'accent' ||
            action.hasAttribute('variant')
        ) {
            inferredPriority = 'high';
        }

        // Buttons with "save", "publish", "submit" text are critical
        const text = action.textContent?.toLowerCase() || '';
        if (
            text.includes('save') ||
            text.includes('publish') ||
            text.includes('submit')
        ) {
            inferredPriority = 'critical';
        }

        // Icon-only actions are typically lower priority
        if (action.hasAttribute('quiet') && !action.textContent?.trim()) {
            inferredPriority = 'low';
        }

        this.actionPriorityMap.set(action, inferredPriority);
        return inferredPriority;
    }

    private getActionWidth(action: HTMLElement): number {
        // If action is currently visible, get its actual width
        if (action.offsetWidth > 0) {
            return action.offsetWidth + 8; // Add gap
        }

        // Estimate width based on content
        const text = action.textContent?.trim() || '';
        const hasIcon = action.querySelector('[slot="icon"]') !== null;

        let estimatedWidth = 32; // Base button padding

        if (hasIcon) {
            estimatedWidth += 20; // Icon width
        }

        if (text) {
            estimatedWidth += text.length * 8; // Rough character width
        }

        return Math.min(estimatedWidth, 200); // Cap at reasonable maximum
    }

    private addActionToOverflowGroup(
        action: HTMLElement,
        overflow: {
            startActions: HTMLElement[];
            middleActions: HTMLElement[];
            endActions: HTMLElement[];
        }
    ): void {
        // Determine which slot this action belongs to
        if (this.startActionNodes.includes(action)) {
            overflow.startActions.push(action);
        } else if (this.middleActionNodes.includes(action)) {
            overflow.middleActions.push(action);
        } else if (this.endActionNodes.includes(action)) {
            overflow.endActions.push(action);
        }
    }

    private updateActionVisibility(): void {
        // Hide all actions first
        this.actionElements.forEach((action) => {
            action.style.display = 'none';
        });

        // Show visible actions
        this.visibleActions.forEach((action) => {
            action.style.display = '';
        });
    }

    private handleOverflowMenuAction(action: HTMLElement): void {
        // Clone the action's click behavior
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        });
        action.dispatchEvent(clickEvent);
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

        const titleText = html`
            <span
                class="title-text ${this.variant === 'l2' && this.editableTitle
                    ? 'clickable'
                    : ''}"
                @click=${this.handleTitleClick}
                @keydown=${this.variant === 'l2' && this.editableTitle
                    ? this.handleTitleKeyPress
                    : undefined}
                tabindex=${ifDefined(
                    this.variant === 'l2' && this.editableTitle
                        ? '0'
                        : undefined
                )}
                role=${ifDefined(
                    this.variant === 'l2' && this.editableTitle
                        ? 'button'
                        : undefined
                )}
                aria-label=${ifDefined(
                    this.variant === 'l2' && this.editableTitle
                        ? 'Click to edit title'
                        : undefined
                )}
            >
                <slot name="title">${this.title}</slot>
            </span>
        `;

        const titleContent = html`
            ${this.titleTruncated && this.variant === 'l2'
                ? html`
                      ${titleText}
                  `
                : titleText}
            ${editButton}
        `;

        return html`
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
        `;
    }

    private renderEditableTitle(): TemplateResult {
        const hasErrors = this.validationErrors.length > 0;

        return html`
            <div class="title-edit-container">
                <div class="input-wrapper ${hasErrors ? 'error' : ''}">
                    <sp-textfield
                        id="title-input"
                        class="title-input ${hasErrors ? 'invalid' : ''}"
                        .value=${this.editValue}
                        @input=${this.handleTitleInput}
                        @keydown=${this.handleTitleKeydown}
                        ?invalid=${hasErrors}
                        placeholder="Enter title..."
                        aria-label="Edit page title"
                    ></sp-textfield>
                    ${hasErrors
                        ? html`
                              <sp-icon-alert
                                  class="error-icon"
                                  aria-hidden="true"
                              ></sp-icon-alert>
                          `
                        : nothing}
                </div>
                <div class="edit-actions">
                    <sp-action-button
                        class="save-button"
                        size="s"
                        quiet
                        @click=${this.handleEditSave}
                        ?disabled=${this.saving}
                        ?pending=${this.saving}
                        aria-label="Save title changes"
                    >
                        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
                    </sp-action-button>
                </div>
                ${hasErrors
                    ? html`
                          <div class="validation-errors">
                              ${this.validationErrors.map(
                                  (error) => html`
                                      <div class="error-message">
                                          ${error.message}
                                      </div>
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

    private renderSuccessToast(): TemplateResult | typeof nothing {
        if (!this.showToast) {
            return nothing;
        }

        return html`
            <sp-toast
                class="success-toast"
                variant="positive"
                ?open=${this.showToast}
                timeout="6000"
                @close=${this.handleToastClose}
            >
                ${this.successToastMessage}
            </sp-toast>
        `;
    }

    private renderActionDivider(): TemplateResult | typeof nothing {
        return html`
            <sp-divider
                class="action-divider"
                size="s"
                vertical
                style="align-self: stretch; height: auto;"
            ></sp-divider>
        `;
    }

    private handleSlotChange(): void {
        // Force a re-render when slot content changes
        this.requestUpdate();
    }

    private renderStartActions(): TemplateResult | typeof nothing {
        return html`
            <div class="actions-start" role="group" aria-label="Start actions">
                <slot
                    name="start-actions"
                    @slotchange=${this.handleSlotChange}
                ></slot>
            </div>
        `;
    }

    private renderMiddleActions(): TemplateResult | typeof nothing {
        if (this.variant !== 'l2') {
            return nothing;
        }

        return html`
            <div
                class="actions-middle"
                role="group"
                aria-label="Middle actions"
            >
                <slot
                    name="middle-actions"
                    @slotchange=${this.handleSlotChange}
                ></slot>
            </div>
        `;
    }

    private renderEndActions(): TemplateResult | typeof nothing {
        return html`
            <div class="actions-end" role="group" aria-label="End actions">
                <slot
                    name="end-actions"
                    @slotchange=${this.handleSlotChange}
                ></slot>
            </div>
        `;
    }

    private renderOverflowMenu(): TemplateResult | typeof nothing {
        const totalActions =
            this.overflowActions.startActions.length +
            this.overflowActions.middleActions.length +
            this.overflowActions.endActions.length;

        if (!this.isOverflowing || totalActions === 0) {
            return nothing;
        }

        const renderActionGroup = (actions: HTMLElement[]) => {
            return actions
                .map((action) => {
                    const textContent = action.textContent?.trim();
                    const ariaLabel = action.getAttribute('aria-label');
                    const text = textContent || ariaLabel;

                    if (!text) {
                        console.error(
                            'sp-header: Action element missing accessible label',
                            {
                                element: action,
                                tagName: action.tagName,
                                className: action.className,
                                id: action.id,
                                attributes: Array.from(action.attributes).map(
                                    (attr) => `${attr.name}="${attr.value}"`
                                ),
                                innerHTML: action.innerHTML,
                                message:
                                    'Action should have either text content or aria-label attribute for accessibility',
                            }
                        );
                        return nothing;
                    }

                    const isDisabled = action.hasAttribute('disabled');

                    return html`
                        <sp-menu-item
                            ?disabled=${isDisabled}
                            @click=${() =>
                                this.handleOverflowMenuAction(action)}
                        >
                            ${text}
                        </sp-menu-item>
                    `;
                })
                .filter((item) => item !== nothing) as TemplateResult[];
        };

        const menuItems: TemplateResult[] = [];

        // Add start actions
        if (this.overflowActions.startActions.length > 0) {
            menuItems.push(
                ...renderActionGroup(this.overflowActions.startActions)
            );
        }

        // Add divider and middle actions (L2 only)
        if (
            this.variant === 'l2' &&
            this.overflowActions.middleActions.length > 0
        ) {
            if (menuItems.length > 0) {
                menuItems.push(html`
                    <sp-menu-divider></sp-menu-divider>
                `);
            }
            menuItems.push(
                ...renderActionGroup(this.overflowActions.middleActions)
            );
        }

        // Add divider and end actions
        if (this.overflowActions.endActions.length > 0) {
            if (menuItems.length > 0) {
                menuItems.push(html`
                    <sp-menu-divider></sp-menu-divider>
                `);
            }
            menuItems.push(
                ...renderActionGroup(this.overflowActions.endActions)
            );
        }

        return html`
            <sp-action-menu
                class="overflow-menu"
                placement="bottom-end"
                quiet
                label="More actions"
            >
                <sp-icon-more slot="icon"></sp-icon-more>
                ${menuItems}
            </sp-action-menu>
        `;
    }

    private renderActionSlots(): TemplateResult | typeof nothing {
        const parts: TemplateResult[] = [];

        // Always render start actions (hidden by CSS if empty)
        const startActions = this.renderStartActions();
        if (startActions !== nothing) {
            parts.push(html`
                <div ?hidden=${!this.hasStartActions}>${startActions}</div>
            `);
        }

        // Add divider and middle actions for L2
        if (this.variant === 'l2') {
            if (this.hasStartActions && this.hasMiddleActions) {
                const divider = this.renderActionDivider();
                if (divider !== nothing) {
                    parts.push(divider);
                }
            }
            const middleActions = this.renderMiddleActions();
            if (middleActions !== nothing) {
                parts.push(html`
                    <div ?hidden=${!this.hasMiddleActions}>
                        ${middleActions}
                    </div>
                `);
            }
        }

        // Add divider and end actions
        if (
            (this.hasStartActions || this.hasMiddleActions) &&
            this.hasEndActions
        ) {
            const divider = this.renderActionDivider();
            if (divider !== nothing) {
                parts.push(divider);
            }
        }
        const endActions = this.renderEndActions();
        if (endActions !== nothing) {
            parts.push(html`
                <div ?hidden=${!this.hasEndActions}>${endActions}</div>
            `);
        }

        // Add overflow menu if needed
        const overflowMenu = this.renderOverflowMenu();
        if (overflowMenu !== nothing) {
            if (parts.length > 0) {
                const divider = this.renderActionDivider();
                if (divider !== nothing) {
                    parts.push(divider);
                }
            }
            parts.push(overflowMenu);
        }

        return parts.length > 0
            ? html`
                  <div class="actions-container">${parts}</div>
              `
            : nothing;
    }

    protected override render(): TemplateResult {
        return html`
            <header class="header ${this.variant}" role="banner">
                <div class="main-row">
                    ${this.renderBackButton()}
                    <div class="title-container">${this.renderTitle()}</div>
                    ${this.renderActionSlots()}
                </div>
                ${this.renderStatusRow()}
            </header>
            ${this.renderSuccessToast()}
        `;
    }
}
