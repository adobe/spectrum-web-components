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
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';

// TODO: Consider adding SizedMixin if the header needs size variants (Button uses it)

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

export const VALID_HEADER_VARIANTS = ['l1', 'l2'] as const;

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

export class Header extends FocusVisiblePolyfillMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * The variant of the header - L1 for top-level pages, L2 for sub-pages
     */
    @property({ type: String, reflect: true })
    public get variant(): HeaderVariant {
        return this._variant;
    }
    public set variant(variant: HeaderVariant) {
        if (variant === this.variant) return;

        this.requestUpdate('variant', this.variant);
        
        if (!VALID_HEADER_VARIANTS.includes(variant as typeof VALID_HEADER_VARIANTS[number])) {
            this._variant = 'l1';
            if (window.__swc?.DEBUG) {
                window.__swc.warn(
                    this,
                    `The "${variant}" value of the "variant" attribute on <${this.localName}> is not valid. Valid values are: ${VALID_HEADER_VARIANTS.join(', ')}. Defaulting to "l1".`,
                    'https://opensource.adobe.com/spectrum-web-components/components/header/',
                    { level: 'default' }
                );
            }
        } else {
            this._variant = variant;
        }
        
        this.setAttribute('variant', this.variant);
    }
    private _variant: HeaderVariant = 'l1';

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
    public get maxTitleLength(): number | undefined {
        return this._maxTitleLength;
    }
    public set maxTitleLength(value: number | undefined) {
        if (value !== undefined && (value < 0 || !Number.isInteger(value))) {
            if (window.__swc?.DEBUG) {
                window.__swc.warn(
                    this,
                    `The "max-title-length" attribute on <${this.localName}> must be a positive integer. Received: ${value}`,
                    'https://opensource.adobe.com/spectrum-web-components/components/header/',
                    { level: 'default' }
                );
            }
            return;
        }
        this._maxTitleLength = value;
    }
    private _maxTitleLength?: number;


    /**
     * Internal edit state for title editing
     */
    @state()
    private editValue = '';

    /**
     * Current validation errors for title editing
     */
    @state()
    private validationErrors: HeaderValidationError[] = [];

    /**
     * Track if we're in the middle of saving a title edit
     */
    @state()
    private saving = false;

    /**
     * Whether title is truncated and should show tooltip
     */
    @state()
    private titleTruncated = false;

    /**
     * Whether to show success toast notification
     */
    @state()
    private showToast = false;

    /**
     * Track action overflow state for responsive design
     */
    @state()
    private isOverflowing = false;

    /**
     * Actions currently in overflow menu, grouped by slot type
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
     * Actions currently visible (not in overflow)
     */
    @state()
    private visibleActions: HTMLElement[] = [];

    /**
     * Available width for action buttons
     */
    @state()
    private availableWidth = 0;

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

    // TODO: Add error handling for null/undefined query results like Button does
    // TODO: Consider adding query validation in getter methods

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

    private get hasVisibleStartActions(): boolean {
        return this.visibleActions.some((action) =>
            this.startActionNodes.includes(action)
        );
    }

    private get hasVisibleMiddleActions(): boolean {
        return this.visibleActions.some((action) =>
            this.middleActionNodes.includes(action)
        );
    }

    private get hasVisibleEndActions(): boolean {
        return this.visibleActions.some((action) =>
            this.endActionNodes.includes(action)
        );
    }

    private focusGroupController = new FocusGroupController<HTMLElement>(this, {
        direction: 'horizontal',
        elements: () => this.actionElements,
        isFocusableElement: (el: HTMLElement) => !el.hasAttribute('disabled'),
    });

    // TODO: Add error handling for FocusGroupController initialization

    private resizeObserver?: ResizeObserver;

    // TODO: Consider adding pending state management like Button's PendingStateController
    // TODO: Add proper cleanup for all observers and controllers

    /**
     * Enhanced focus management that handles different states and contexts
     */
    public override focus(): void {
        try {
            if (this.editMode) {
                // In edit mode, focus the title input
                this.titleInput?.focus();
            } else if (this.showBack && this.variant === 'l2') {
                // If back button is available, focus it first
                const backButton = this.shadowRoot?.querySelector('.back-button') as HTMLElement;
                backButton?.focus();
            } else if (this.editableTitle && this.variant === 'l2') {
                // If title is editable, focus the title text
                const titleText = this.shadowRoot?.querySelector('.title-text') as HTMLElement;
                titleText?.focus();
            } else {
                // Otherwise, focus the first available action
                this.focusGroupController.focus();
            }
        } catch (error) {
            if (window.__swc?.DEBUG) {
                console.warn('Header focus operation failed:', error);
            }
        }
    }

    /**
     * Manages tabindex attributes for proper tab order
     */
    private updateTabOrder(): void {
        try {
            // Ensure proper tab order: back button -> title (if editable) -> actions
            const backButton = this.shadowRoot?.querySelector('.back-button') as HTMLElement;
            const titleText = this.shadowRoot?.querySelector('.title-text') as HTMLElement;
            const editButton = this.shadowRoot?.querySelector('.edit-button') as HTMLElement;

            if (backButton) {
                backButton.setAttribute('tabindex', '0');
            }

            if (titleText && this.editableTitle && this.variant === 'l2') {
                titleText.setAttribute('tabindex', '0');
            }

            if (editButton) {
                editButton.setAttribute('tabindex', '0');
            }

            // Ensure action elements maintain proper tab order
            this.actionElements.forEach((element) => {
                if (!element.hasAttribute('disabled')) {
                    element.setAttribute('tabindex', '0');
                }
            });
        } catch (error) {
            if (window.__swc?.DEBUG) {
                console.warn('Header tab order update failed:', error);
            }
        }
    }

    protected override willUpdate(changed: PropertyValues<this>): void {
        super.willUpdate(changed);

        if (changed.has('title') && !this.editMode) {
            this.editValue = this.title;
        }
    }

    // TODO: Add more comprehensive property change handling like Button does
    // TODO: Consider adding validation when properties change

    protected override updated(changed: PropertyValues<this>): void {
        super.updated(changed);

        if (changed.has('title') || changed.has('editMode')) {
            this.checkTitleTruncation();
        }

        if (changed.has('variant') || changed.has('editableTitle') || changed.has('showBack')) {
            this.updateTabOrder();
        }
    }

    // TODO: Add more sophisticated change detection and handling
    // TODO: Consider adding error handling for post-update operations

    private checkTitleTruncation(): void {
        try {
            if (this.titleTextElement && this.variant === 'l2' && !this.editMode) {
                const isOverflowing =
                    this.titleTextElement.scrollWidth >
                    this.titleTextElement.clientWidth;
                this.titleTruncated = isOverflowing;
            } else {
                this.titleTruncated = false;
            }
        } catch (error) {
            if (window.__swc?.DEBUG) {
                console.warn('Header title truncation check failed:', error);
            }
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

    // TODO: Add event detail for consistency with other events
    // TODO: Consider adding preventDefault handling like Button does

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

    // TODO: Add error handling for async operations
    // TODO: Consider adding validation before entering edit mode

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

    // TODO: Add more comprehensive keyboard handling like Button does
    // TODO: Consider adding Escape key handling for consistency

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

    // TODO: Add event detail for consistency
    // TODO: Consider adding confirmation for unsaved changes

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

    // TODO: Add more sophisticated validation patterns like Button has
    // TODO: Consider adding async validation support
    // TODO: Add error message internationalization support

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

    // TODO: Add more sophisticated error handling like Button's click() method
    // TODO: Consider adding retry logic for failed saves
    // TODO: Add proper loading state management like Button's PendingStateController

    private handleTitleInput(event: Event): void {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) {
            if (window.__swc?.DEBUG) {
                console.warn('Header title input event target is not an HTMLInputElement');
            }
            return;
        }
        
        this.editValue = target.value;

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

    // TODO: Consider debouncing validation for performance

    private handleTitleKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleEditSave();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            this.handleEditCancel();
        }
    }

    // TODO: Add more comprehensive keyboard shortcuts like Button does
    // TODO: Consider adding Tab key handling for focus management

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

    // TODO: Add error handling for composedPath operations
    // TODO: Consider making this method more robust like Button's event handlers

    private handleToastClose(): void {
        this.showToast = false;
    }

    // TODO: Add event handling consistency with other methods
    // TODO: Consider adding animation completion handling

    public override connectedCallback(): void {
        super.connectedCallback();
        try {
            document.addEventListener('click', this.handleOutsideClick);
            this.setupResizeObserver();
        } catch (error) {
            if (window.__swc?.DEBUG) {
                console.warn('Header connection setup failed:', error);
            }
        }
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
        try {
            document.removeEventListener('click', this.handleOutsideClick);
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
            }
        } catch (error) {
            if (window.__swc?.DEBUG) {
                console.warn('Header disconnection cleanup failed:', error);
            }
        }
    }

    // TODO: Ensure all controllers and observers are properly cleaned up
    // TODO: Add cleanup for focusGroupController if needed

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

    // TODO: Add error handling for ResizeObserver creation and observation
    // TODO: Consider adding debouncing for resize operations
    // TODO: Add validation for mainRowElement existence

    private handleResize(): void {
        if (!this.mainRowElement) return;

        this.calculateAvailableSpace();
        this.manageActionOverflow();
    }

    // TODO: Add error handling for resize operations
    // TODO: Consider adding performance optimizations

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
            120;
    }

    // TODO: Add error handling for DOM measurements
    // TODO: Consider making gap value configurable or reading from CSS
    // TODO: Add validation for calculation results

    private manageActionOverflow(): void {
        // Get actions in visual order (left to right)
        const actionsInOrder = [
            ...this.startActionNodes,
            ...this.middleActionNodes,
            ...this.endActionNodes,
        ];

        if (actionsInOrder.length === 0) return;

        // Start with all actions as visible
        const visible = [...actionsInOrder];
        const overflow = {
            startActions: [] as HTMLElement[],
            middleActions: [] as HTMLElement[],
            endActions: [] as HTMLElement[],
        };

        // Calculate total width needed
        let totalWidth = visible.reduce(
            (width, action) => width + this.getActionWidth(action),
            0
        );

        // Remove leftmost actions until we fit within available space
        while (totalWidth > this.availableWidth && visible.length > 0) {
            const leftmostAction = visible.shift()!;
            this.addActionToOverflowGroup(leftmostAction, overflow);
            totalWidth -= this.getActionWidth(leftmostAction);
        }

        // Always show overflow menu if there are overflow actions
        const totalOverflowActions =
            overflow.startActions.length +
            overflow.middleActions.length +
            overflow.endActions.length;
        const needsOverflowMenu = totalOverflowActions > 0;
        if (needsOverflowMenu) {
            const overflowMenuWidth = 40; // Estimated width of overflow menu button
            const currentWidth = visible.reduce(
                (width, action) => width + this.getActionWidth(action),
                0
            );
            if (
                currentWidth + overflowMenuWidth > this.availableWidth &&
                visible.length > 0
            ) {
                // Move the leftmost visible action to overflow to make room for the menu
                const leftmostVisible = visible.shift()!;
                this.addActionToOverflowGroup(leftmostVisible, overflow);
            }
        }

        this.visibleActions = visible;
        this.overflowActions = overflow;
        this.isOverflowing = needsOverflowMenu;

        this.updateActionVisibility();
    }

    // TODO: Add error handling for overflow calculations
    // TODO: Consider more sophisticated overflow algorithms
    // TODO: Add configuration options for overflow behavior
    // TODO: Consider performance optimizations for large action sets

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

    // TODO: Add more sophisticated width calculation
    // TODO: Consider caching width calculations for performance
    // TODO: Add error handling for DOM property access

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

    // TODO: Add error handling for slot determination
    // TODO: Consider more efficient slot detection methods

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

    // TODO: Add error handling for style manipulation
    // TODO: Consider using CSS classes instead of inline styles for better performance
    // TODO: Add animation support for visibility changes

    private handleOverflowMenuAction(action: HTMLElement): void {
        // Clone the action's click behavior
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        });
        action.dispatchEvent(clickEvent);
    }

    // TODO: Add error handling for event dispatching
    // TODO: Consider more sophisticated event cloning
    // TODO: Add support for other interaction events (keyboard, etc.)

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

    // TODO: Add more comprehensive accessibility attributes

    private renderTitle(): TemplateResult {
        if (this.variant === 'l2' && this.editableTitle && this.editMode) {
            return this.renderEditableTitle();
        }

        return this.renderStaticTitle();
    }

    // TODO: Add error handling for render conditions
    // TODO: Consider adding loading states like Button does

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

    // TODO: Add more comprehensive accessibility attributes
    // TODO: Consider tooltip support for truncated titles like Button does
    // TODO: Add error handling for rendering conditions
    // TODO: Consider adding ARIA live regions for dynamic content

    private renderEditableTitle(): TemplateResult {
        const hasErrors = this.validationErrors.length > 0;
        const errorMessage = hasErrors ? this.validationErrors[0].message : '';
        const titleInputId = 'title-input';
        const errorId = hasErrors ? `${titleInputId}-error` : undefined;

        return html`
            <div class="title-edit-container" role="group" aria-label="Title editing">
                <div class="input-wrapper ${hasErrors ? 'error' : ''}">
                    <sp-textfield
                        id="${titleInputId}"
                        class="title-input ${hasErrors ? 'invalid' : ''}"
                        .value=${this.editValue}
                        @input=${this.handleTitleInput}
                        @keydown=${this.handleTitleKeydown}
                        ?invalid=${hasErrors}
                        placeholder="Enter title..."
                        aria-label="Edit page title"
                        aria-describedby=${ifDefined(errorId)}
                        aria-invalid=${hasErrors ? 'true' : 'false'}
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
                <div class="edit-actions" role="group" aria-label="Edit actions">
                    <sp-action-button
                        class="save-button"
                        size="s"
                        quiet
                        @click=${this.handleEditSave}
                        ?disabled=${this.saving}
                        ?pending=${this.saving}
                        aria-label="Save title changes"
                        aria-describedby=${ifDefined(errorId)}
                    >
                        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
                    </sp-action-button>
                    <sp-action-button
                        class="cancel-button"
                        size="s"
                        quiet
                        @click=${this.handleEditCancel}
                        aria-label="Cancel title editing"
                    >
                        <sp-icon-close slot="icon"></sp-icon-close>
                    </sp-action-button>
                </div>
                ${hasErrors
                    ? html`
                          <div class="validation-errors" id=${ifDefined(errorId)} role="alert" aria-live="polite">
                              <sp-help-text variant="negative" class="error-message">
                                  ${errorMessage}
                              </sp-help-text>
                          </div>
                      `
                    : nothing}
            </div>
        `;
    }

    // TODO: Add more comprehensive error handling and validation display
    // TODO: Consider adding character count display like other inputs
    // TODO: Add support for multiple error messages display
    // TODO: Consider adding loading state management like Button's PendingStateController

    private renderStatusRow(): TemplateResult | typeof nothing {
        if (this.variant !== 'l2') {
            return nothing;
        }

        return html`
            <div class="status-row" role="group" aria-label="Status indicators">
                <slot name="status"></slot>
            </div>
        `;
    }

    // TODO: Add validation for status slot content
    // TODO: Consider adding default status indicators

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

    // TODO: Add more toast customization options like Button does
    // TODO: Consider adding different toast types (error, warning, etc.)
    // TODO: Add proper toast positioning and stacking management

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

    // TODO: Consider using CSS classes instead of inline styles
    // TODO: Add configuration options for divider appearance

    private handleSlotChange(): void {
        // Force a re-render when slot content changes
        this.requestUpdate();
    }

    // TODO: Add more sophisticated slot change handling
    // TODO: Consider debouncing slot change events for performance
    // TODO: Add validation for slot content like Button does

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

    // TODO: Add validation for action slot content
    // TODO: Consider adding maximum action limits like documented
    // TODO: Add error handling for slot rendering

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

        // Collect all non-empty sections (in reverse order - rightmost first)
        const allSections = [
            this.overflowActions.endActions.length > 0
                ? renderActionGroup(
                      [...this.overflowActions.endActions].reverse()
                  )
                : [],
            this.variant === 'l2' &&
            this.overflowActions.middleActions.length > 0
                ? renderActionGroup(
                      [...this.overflowActions.middleActions].reverse()
                  )
                : [],
            this.overflowActions.startActions.length > 0
                ? renderActionGroup(
                      [...this.overflowActions.startActions].reverse()
                  )
                : [],
        ].filter((section) => section.length > 0);

        // Join sections with dividers between them
        const menuItems = allSections
            .map((section, index) =>
                index === 0
                    ? section
                    : [
                          html`
                              <sp-menu-divider></sp-menu-divider>
                          `,
                          ...section,
                      ]
            )
            .flat();

        return html`
            <sp-action-menu
                class="overflow-menu"
                placement="bottom-end"
                quiet
                label="More actions"
                aria-label="Additional actions menu"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <sp-icon-more slot="icon"></sp-icon-more>
                ${menuItems}
            </sp-action-menu>
        `;
    }

    // TODO: Add error handling for overflow menu rendering
    // TODO: Consider more sophisticated error reporting than console.error
    // TODO: Add support for icons in overflow menu items
    // TODO: Consider adding keyboard navigation support for overflow menu

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
            // Only show divider if both start and middle actions are visible
            if (this.hasVisibleStartActions && this.hasVisibleMiddleActions) {
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
        // Only show divider if there are visible actions before end actions
        if (
            (this.hasVisibleStartActions || this.hasVisibleMiddleActions) &&
            this.hasVisibleEndActions
        ) {
            parts.push(this.renderActionDivider() as TemplateResult);
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
            // Only add divider after overflow menu if there are visible actions
            if (
                this.hasVisibleStartActions ||
                this.hasVisibleMiddleActions ||
                this.hasVisibleEndActions
            ) {
                const divider = this.renderActionDivider();
                if (divider !== nothing) {
                    parts.unshift(divider);
                }
            }
            parts.unshift(overflowMenu);
        }

        return parts.length > 0
            ? html`
                  <div class="actions-container">${parts}</div>
              `
            : nothing;
    }

    // TODO: Add error handling for action slot rendering
    // TODO: Consider more sophisticated action organization
    // TODO: Add validation for action slot limits as documented

    protected override render(): TemplateResult {
        return html`
            <header class="header ${this.variant}" role="banner" aria-label="Page header">
                <div class="main-row" role="group" aria-label="Header content">
                    ${this.renderBackButton()}
                    <div class="title-container" role="heading" aria-level="${this.variant === 'l1' ? '1' : '2'}">
                        ${this.renderTitle()}
                    </div>
                    ${this.renderActionSlots()}
                </div>
                ${this.renderStatusRow()}
            </header>
            ${this.renderSuccessToast()}
        `;
    }

    // TODO: Add more comprehensive accessibility structure
    // TODO: Consider adding loading states like Button does  
    // TODO: Add error boundaries for render operations
    // TODO: Consider adding dev mode warnings for invalid configurations like Button does
}

// TODO: Consider adding custom element registration like other packages do
// TODO: Add proper TypeScript module augmentation if needed
// TODO: Consider adding helper functions or utilities like Button package has
