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
    html,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    queryAssignedElements,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import {
    ElementResolutionController,
    elementResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';
import {
    ifDefined,
    StyleInfo,
    styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';
import type {
    OpenableElement,
    OverlayState,
    OverlayTypes,
    Placement,
    TriggerInteraction,
} from './overlay-types.js';
import { AbstractOverlay, nextFrame } from './AbstractOverlay.js';
import { OverlayPopover } from './OverlayPopover.js';
import { OverlayNoPopover } from './OverlayNoPopover.js';
import { overlayStack } from './OverlayStack.js';
import { VirtualTrigger } from './VirtualTrigger.js';
import { PlacementController } from './PlacementController.js';
import type { ClickController } from './ClickController.js';
import type { HoverController } from './HoverController.js';
import type { LongpressController } from './LongpressController.js';
export { LONGPRESS_INSTRUCTIONS } from './LongpressController.js';
import { strategies } from './strategies.js';
import {
    removeSlottableRequest,
    SlottableRequestEvent,
} from './slottable-request-event.js';

import styles from './overlay.css.js';
import { FocusTrap } from 'focus-trap';

const browserSupportsPopover = 'showPopover' in document.createElement('div');

// Start the base class and add the popover or no-popover functionality
let ComputedOverlayBase = OverlayPopover(AbstractOverlay);
if (!browserSupportsPopover) {
    ComputedOverlayBase = OverlayNoPopover(AbstractOverlay);
}

/**
 * @element sp-overlay
 *
 * @slot default - The content that will be displayed in the overlay
 *
 * @fires sp-opened - announces that an overlay has completed any entry animations
 * @fires sp-closed - announce that an overlay has compelted any exit animations
 * @fires slottable-request - requests to add or remove slottable content
 *
 * @attr {string} placement - The placement of the overlay relative to the trigger
 * @attr {number} offset - The distance between the overlay and the trigger
 * @attr {boolean} disabled - Whether the overlay trigger is disabled
 * @attr {string} receives-focus - How focus should be handled ('true'|'false'|'auto')
 * @attr {boolean} delayed - Whether the overlay should wait for a warm-up period before opening
 * @attr {boolean} open - Whether the overlay is currently open
 * @attr {boolean} allow-outside-click - @deprecated Whether clicks outside the overlay should close it (not recommended for accessibility)
 */
export class Overlay extends ComputedOverlayBase {
    static override styles = [styles];

    /**
     * An Overlay that is `delayed` will wait until a warm-up period of 1000ms
     * has completed before opening. Once the warm-up period has completed, all
     * subsequent Overlays will open immediately. When no Overlays are opened,
     * a cool-down period of 1000ms will begin. Once the cool-down has completed,
     * the next Overlay to be opened will be subject to the warm-up period if
     * provided that option.
     *
     * This behavior helps to manage the performance and user experience by
     * preventing multiple overlays from opening simultaneously and ensuring
     * a smooth transition between opening and closing overlays.
     *
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean })
    override get delayed(): boolean {
        return this.elements.at(-1)?.hasAttribute('delayed') || this._delayed;
    }

    override set delayed(delayed: boolean) {
        this._delayed = delayed;
    }

    private _delayed = false;

    /**
     * A reference to the dialog element within the overlay.
     * This element is expected to have `showPopover` and `hidePopover` methods.
     */
    @query('.dialog')
    override dialogEl!: HTMLDialogElement & {
        showPopover(): void;
        hidePopover(): void;
    };

    /**
     * Indicates whether the overlay is currently functional or not.
     *
     * When set to `true`, the overlay is disabled, and any active strategy is aborted.
     * The overlay will also close if it is currently open. When set to `false`, the
     * overlay will re-bind events and re-open if it was previously open.
     *
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean })
    override get disabled(): boolean {
        return this._disabled;
    }

    override set disabled(disabled: boolean) {
        this._disabled = disabled;
        if (disabled) {
            // Abort any active strategy and close the overlay if it is currently open
            this.strategy?.abort();
            this.wasOpen = this.open;
            this.open = false;
        } else {
            // Re-bind events and re-open the overlay if it was previously open
            this.bindEvents();
            this.open = this.open || this.wasOpen;
            this.wasOpen = false;
        }
    }

    private _disabled = false;

    /**
     * A query to gather all elements slotted into the default slot, excluding elements
     * with the slot name "longpress-describedby-descriptor".
     */
    @queryAssignedElements({
        flatten: true,
        selector: ':not([slot="longpress-describedby-descriptor"], slot)',
    })
    override elements!: OpenableElement[];

    /**
     * A reference to the parent overlay that should be force-closed, if any.
     */
    public parentOverlayToForceClose?: Overlay;

    /**
     * Determines if the overlay has a non-virtual trigger element.
     *
     * @returns {boolean} `true` if the trigger element is not a virtual trigger, otherwise `false`.
     */
    private get hasNonVirtualTrigger(): boolean {
        return (
            !!this.triggerElement &&
            !(this.triggerElement instanceof VirtualTrigger)
        );
    }

    /**
     * The `offset` property accepts either a single number to define the offset of the
     * Overlay along the main axis from the trigger, or a 2-tuple to define the offset
     * along both the main axis and the cross axis. This option has no effect when there
     * is no trigger element.
     *
     * @type {number | [number, number]}
     * @default 0
     */
    @property({ type: Number })
    override offset: number | [number, number] = 0;

    /**
     * Provides an instance of the `PlacementController` for managing the positioning
     * of the overlay relative to its trigger element.
     *
     * If the `PlacementController` instance does not already exist, it is created and
     * assigned to the `_placementController` property.
     *
     * @protected
     * @returns {PlacementController} The `PlacementController` instance.
     */
    protected override get placementController(): PlacementController {
        if (!this._placementController) {
            this._placementController = new PlacementController(this);
        }
        return this._placementController;
    }

    /**
     * Indicates whether the Overlay is projected onto the "top layer" or not.
     *
     * When set to `true`, the overlay is open and visible. When set to `false`, the overlay is closed and hidden.
     *
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean, reflect: true })
    override get open(): boolean {
        return this._open;
    }

    override set open(open: boolean) {
        // Don't respond if the overlay is disabled.
        if (open && this.disabled) return;

        // Don't respond if the state is not changing.
        if (open === this.open) return;

        // Don't respond if the overlay is in the shadow state during a longpress.
        // The shadow state occurs when the first "click" would normally close the popover.
        if (this.strategy?.activelyOpening && !open) return;

        // Update the internal _open property.
        this._open = open;

        // Increment the open count if the overlay is opening.
        if (this.open) {
            Overlay.openCount += 1;
        }

        // Request an update to re-render the component if necessary.
        this.requestUpdate('open', !this.open);

        // Request slottable content if the overlay is opening.
        if (this.open) {
            this.requestSlottable();
        }
    }

    private _open = false;

    /**
     * Tracks the number of overlays that have been opened.
     *
     * This static property is used to manage the stacking context of multiple overlays.
     *
     * @type {number}
     * @default 1
     */
    static openCount = 1;

    /**
     * Instruct the Overlay where to place itself in relationship to the trigger element.
     *
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     */
    @property()
    override placement?: Placement;

    /**
     * The state in which the last `request-slottable` event was dispatched.
     *
     * This property ensures that overlays do not dispatch the same state twice in a row.
     *
     * @type {boolean}
     * @default false
     */
    private lastRequestSlottableState = false;

    /**
     * Whether to pass focus to the overlay once opened, or
     * to the appropriate value based on the "type" of the overlay
     * when set to `"auto"`.
     *
     * @type {'true' | 'false' | 'auto'}
     * @default 'auto'
     */
    @property({ attribute: 'receives-focus' })
    override receivesFocus: 'true' | 'false' | 'auto' = 'auto';

    /**
     * @deprecated This property will be removed in a future version.
     * We do not recommend using this property for accessibility reasons.
     * It allows clicks outside the overlay to close it, which can cause
     * unexpected behavior and accessibility issues.
     *
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean, attribute: 'allow-outside-click' })
    allowOutsideClick = false;

    /**
     * A reference to the slot element within the overlay.
     *
     * This element is used to manage the content slotted into the overlay.
     *
     * @type {HTMLSlotElement}
     */
    @query('slot')
    slotEl!: HTMLSlotElement;

    /**
     * The current state of the overlay.
     *
     * This property reflects the current state of the overlay, such as 'opened' or 'closed'.
     * When the state changes, it triggers the appropriate actions and updates the component.
     *
     * @type {OverlayState}
     * @default 'closed'
     */
    @state()
    override get state(): OverlayState {
        return this._state;
    }

    override set state(state) {
        // Do not respond if the state is not changing.
        if (state === this.state) return;

        const oldState = this.state;

        this._state = state;

        // Complete the opening strategy if the state is 'opened' or 'closed'.
        if (this.state === 'opened' || this.state === 'closed') {
            this.strategy?.shouldCompleteOpen();
        }

        // Request an update to re-render the component if necessary.
        this.requestUpdate('state', oldState);
    }

    override _state: OverlayState = 'closed';

    /**
     * The interaction strategy for opening the overlay.
     * This can be a ClickController, HoverController, or LongpressController.
     */
    public strategy?: ClickController | HoverController | LongpressController;

    /**
     * The padding around the tip of the overlay.
     * This property defines the padding around the tip of the overlay, which can be used to adjust its positioning.
     *
     * @type {number}
     */
    @property({ type: Number, attribute: 'tip-padding' })
    tipPadding?: number;

    /**
     * An optional ID reference for the trigger element combined with the optional
     * interaction (click | hover | longpress) by which the overlay should open.
     * The format is `trigger@interaction`, e.g., `trigger@click` opens the overlay
     * when an element with the ID "trigger" is clicked.
     *
     * @type {string}
     */
    @property()
    trigger?: string;

    /**
     * An element reference for the trigger element that the overlay should relate to.
     * This property is not reflected as an attribute.
     *
     * @type {HTMLElement | VirtualTrigger | null}
     */
    @property({ attribute: false })
    override triggerElement: HTMLElement | VirtualTrigger | null = null;

    /**
     * The specific interaction to listen for on the `triggerElement` to open the overlay.
     * This property is not reflected as an attribute.
     *
     * @type {TriggerInteraction}
     */
    @property({ attribute: false })
    triggerInteraction?: TriggerInteraction;

    /**
     * Configures the open/close heuristics of the Overlay.
     *
     * @type {"auto" | "hint" | "manual" | "modal" | "page"}
     * @default "auto"
     */
    @property()
    override type: OverlayTypes = 'auto';

    /**
     * Tracks whether the overlay was previously open.
     * This is used to restore the open state when re-enabling the overlay.
     *
     * @type {boolean}
     * @default false
     */
    protected wasOpen = false;

    /**
     * Focus trap to keep focus within the dialog
     * @private
     */
    private _focusTrap: FocusTrap | null = null;

    /**
     * Provides an instance of the `ElementResolutionController` for managing the element
     * that the overlay should be associated with. If the instance does not already exist,
     * it is created and assigned to the `_elementResolver` property.
     *
     * @protected
     * @returns {ElementResolutionController} The `ElementResolutionController` instance.
     */
    protected override get elementResolver(): ElementResolutionController {
        if (!this._elementResolver) {
            this._elementResolver = new ElementResolutionController(this);
        }

        return this._elementResolver;
    }

    /**
     * Determines the value for the popover attribute based on the overlay type.
     *
     * @private
     * @returns {'auto' | 'manual' | undefined} The popover value or undefined if not applicable.
     */
    private get popoverValue(): 'auto' | 'manual' | undefined {
        const hasPopoverAttribute = 'popover' in this;

        if (!hasPopoverAttribute) {
            return undefined;
        }

        switch (this.type) {
            case 'modal':
                return 'auto';
            case 'page':
                return 'manual';
            case 'hint':
                return 'manual';
            default:
                return this.type;
        }
    }

    /**
     * Determines if the overlay requires positioning based on its type and state.
     *
     * @protected
     * @returns {boolean} True if the overlay requires positioning, otherwise false.
     */
    protected get requiresPositioning(): boolean {
        // Do not position "page" overlays as they should block the entire UI.
        if (this.type === 'page' || !this.open) return false;

        // Do not position content without a trigger element, as there is nothing to position it relative to.
        // Do not automatically position content unless it is a "hint".
        if (!this.triggerElement || (!this.placement && this.type !== 'hint'))
            return false;

        return true;
    }

    /**
     * Manages the positioning of the overlay relative to its trigger element.
     *
     * This method calculates the necessary parameters for positioning the overlay,
     * such as offset, placement, and tip padding, and then delegates the actual
     * positioning to the `PlacementController`.
     *
     * @protected
     * @override
     */
    protected override managePosition(): void {
        // Do not proceed if positioning is not required or the overlay is not open.
        if (!this.requiresPositioning || !this.open) return;

        const offset = this.offset || 0;

        const trigger = this.triggerElement as HTMLElement;

        const placement = (this.placement as Placement) || 'right';

        const tipPadding = this.tipPadding;

        this.placementController.placeOverlay(this.dialogEl, {
            offset,
            placement,
            tipPadding,
            trigger,
            type: this.type,
        });
    }

    /**
     * Manages the process of opening the popover.
     *
     * This method handles the necessary steps to open the popover, including managing delays,
     * ensuring the popover is in the DOM, making transitions, and applying focus.
     * @protected
     * @override
     * @returns {Promise<void>} A promise that resolves when the popover has been fully opened.
     */
    protected override async managePopoverOpen(): Promise<void> {
        // Call the base class method to handle any initial setup.
        super.managePopoverOpen();

        const targetOpenState = this.open;

        // Ensure the open state has not changed before proceeding.
        if (this.open !== targetOpenState) {
            return;
        }

        // Manage any delays before opening the popover.
        await this.manageDelay(targetOpenState);

        if (this.open !== targetOpenState) {
            return;
        }

        // Only wait for next frame if `longpress` is the trigger.
        // In Safari, awaiting nextFrame here causes layout issues
        // when rendering trays inside modals, so we skip it otherwise.
        if (this.triggerInteraction === 'longpress') {
            await nextFrame();
        }

        // Ensure the popover is in the DOM before proceeding.
        await this.ensureOnDOM(targetOpenState);

        if (this.open !== targetOpenState) {
            return;
        }

        // Make any necessary transitions for opening the popover.
        const focusEl = await this.makeTransition(targetOpenState);

        if (this.open !== targetOpenState) {
            return;
        }
        if (targetOpenState) {
            const focusTrap = await import('focus-trap');
            this._focusTrap = focusTrap.createFocusTrap(this.dialogEl, {
                initialFocus: focusEl || undefined,
                tabbableOptions: {
                    getShadowRoot: true,
                },
                fallbackFocus: () => {
                    // set tabIndex to -1 allow the focus-trap to still be applied
                    this.dialogEl.setAttribute('tabIndex', '-1');
                    return this.dialogEl;
                },
                // disable escape key capture to close the overlay, the focus-trap library captures it otherwise
                escapeDeactivates: false,
                allowOutsideClick: this.allowOutsideClick,
            });

            if (this.type === 'modal' || this.type === 'page') {
                this._focusTrap.activate();
            }
        }
        // Apply focus to the appropriate element after opening the popover.
        await this.applyFocus(targetOpenState, focusEl);
    }

    /**
     * Applies focus to the appropriate element after the popover has been opened.
     *
     * This method handles the focus management for the overlay, ensuring that the correct
     * element receives focus based on the overlay's type and state.
     *
     * @protected
     * @override
     * @param {boolean} targetOpenState - The target open state of the overlay.
     * @param {HTMLElement | null} focusEl - The element to focus after opening the popover.
     * @returns {Promise<void>} A promise that resolves when the focus has been applied.
     */
    protected override async applyFocus(
        targetOpenState: boolean,
        focusEl: HTMLElement | null
    ): Promise<void> {
        // Do not move focus when explicitly told not to or when the overlay is a "hint".
        if (this.receivesFocus === 'false' || this.type === 'hint') {
            return;
        }

        // Wait for the next two animation frames to ensure the DOM is updated.
        await nextFrame();
        await nextFrame();

        // If the open state has changed during the delay, do not proceed.
        if (targetOpenState === this.open && !this.open) {
            // If the overlay is closing and the trigger element is still focused, return focus to the trigger element.
            if (
                this.hasNonVirtualTrigger &&
                this.contains((this.getRootNode() as Document).activeElement)
            ) {
                (this.triggerElement as HTMLElement).focus();
            }
            return;
        }

        // Apply focus to the specified focus element.
        focusEl?.focus();
    }

    /**
     * Returns focus to the trigger element if the overlay is closed.
     *
     * This method ensures that focus is returned to the trigger element when the overlay is closed,
     * unless the overlay is of type "hint" or the focus is already outside the overlay.
     *
     * @protected
     * @override
     */
    protected override returnFocus(): void {
        // Do not proceed if the overlay is open or if the overlay type is "hint".
        if (this.open || this.type === 'hint') return;

        /**
         * Retrieves the ancestors of the currently focused element.
         *
         * @returns {HTMLElement[]} An array of ancestor elements.
         */
        const getAncestors = (): HTMLElement[] => {
            const ancestors: HTMLElement[] = [];

            // eslint-disable-next-line @spectrum-web-components/document-active-element
            let currentNode = document.activeElement;

            // Traverse the shadow DOM to find the active element.
            while (currentNode?.shadowRoot?.activeElement) {
                currentNode = currentNode.shadowRoot.activeElement;
            }

            // Traverse the DOM tree to collect ancestor elements.
            while (currentNode) {
                const ancestor =
                    currentNode.assignedSlot ||
                    currentNode.parentElement ||
                    (currentNode.getRootNode() as ShadowRoot)?.host;
                if (ancestor) {
                    ancestors.push(ancestor as HTMLElement);
                }
                currentNode = ancestor;
            }
            return ancestors;
        };

        // Check if focus should be returned to the trigger element.
        if (
            this.receivesFocus !== 'false' &&
            !!(this.triggerElement as HTMLElement)?.focus &&
            (this.contains((this.getRootNode() as Document).activeElement) ||
                getAncestors().includes(this) ||
                // eslint-disable-next-line @spectrum-web-components/document-active-element
                document.activeElement === document.body)
        ) {
            // Return focus to the trigger element.
            (this.triggerElement as HTMLElement).focus();
        }
    }

    /**
     * Handles the focus out event to close the overlay if the focus moves outside of it.
     *
     * This method ensures that the overlay is closed when the focus moves to an element
     * outside of the overlay, unless the focus is moved to a related element.
     *
     * @private
     * @param {FocusEvent} event - The focus out event.
     */
    private closeOnFocusOut = (event: FocusEvent): void => {
        // If the related target (newly focused element) is not known, do nothing.
        if (!event.relatedTarget) {
            return;
        }

        // Create a custom event to query the relationship of the newly focused element.
        const relationEvent = new Event('overlay-relation-query', {
            bubbles: true,
            composed: true,
        });

        // Add an event listener to the related target to handle the custom event.
        event.relatedTarget.addEventListener(
            relationEvent.type,
            (event: Event) => {
                // Check if the newly focused element is within the overlay or its children
                const path = event.composedPath();
                const isWithinOverlay = path.some((el) => el === this);

                // Only close if focus moves outside the overlay and its children
                if (!isWithinOverlay) {
                    this.open = false;
                }
            }
        );

        // Dispatch the custom event to the related target.
        event.relatedTarget.dispatchEvent(relationEvent);
    };

    private closeOnCancelEvent = (): void => {
        this.open = false;
    };

    /**
     * Manages the process of opening or closing the overlay.
     *
     * This method handles the necessary steps to open or close the overlay, including updating the state,
     * managing the overlay stack, and handling focus events.
     *
     * @protected
     * @param {boolean} oldOpen - The previous open state of the overlay.
     * @returns {Promise<void>} A promise that resolves when the overlay has been fully managed.
     */
    protected async manageOpen(oldOpen: boolean): Promise<void> {
        // Prevent entering the manage workflow if the overlay is not connected to the DOM.
        // The `.showPopover()` event will error on content that is not connected to the DOM.
        if (!this.isConnected && this.open) return;

        // Wait for the component to finish updating if it has not already done so.
        if (!this.hasUpdated) {
            await this.updateComplete;
        }

        if (this.open) {
            // Add the overlay to the overlay stack.
            overlayStack.add(this);

            if (this.willPreventClose) {
                // Add an event listener to handle the pointerup event and toggle the 'not-immediately-closable' class.
                document.addEventListener(
                    'pointerup',
                    () => {
                        this.dialogEl.classList.toggle(
                            'not-immediately-closable',
                            false
                        );
                        this.willPreventClose = false;
                    },
                    { once: true }
                );
                this.dialogEl.classList.toggle(
                    'not-immediately-closable',
                    true
                );
            }
        } else {
            if (oldOpen) {
                this._focusTrap?.deactivate();
                this._focusTrap = null;
                // Dispose of the overlay if it was previously open.
                this.dispose();
            }

            // Remove the overlay from the overlay stack.
            overlayStack.remove(this);
        }

        // Update the state of the overlay based on the open property.
        if (this.open && this.state !== 'opened') {
            this.state = 'opening';
        } else if (!this.open && this.state !== 'closed') {
            this.state = 'closing';
        }

        this.managePopoverOpen();

        const listenerRoot = this.getRootNode() as Document;
        // Handle focus events for auto type overlays.
        if (this.type === 'auto') {
            if (this.open) {
                listenerRoot.addEventListener(
                    'focusout',
                    this.closeOnFocusOut,
                    { capture: true }
                );
            } else {
                listenerRoot.removeEventListener(
                    'focusout',
                    this.closeOnFocusOut,
                    { capture: true }
                );
            }
        }

        // Handle cancel events for modal and page type overlays.
        if (this.type === 'modal' || this.type === 'page') {
            if (this.open) {
                listenerRoot.addEventListener(
                    'cancel',
                    this.closeOnCancelEvent,
                    {
                        capture: true,
                    }
                );
            } else {
                listenerRoot.removeEventListener(
                    'cancel',
                    this.closeOnCancelEvent,
                    {
                        capture: true,
                    }
                );
            }
        }
    }

    /**
     * Binds event handling strategies to the overlay based on the specified trigger interaction.
     *
     * This method sets up the appropriate event handling strategy for the overlay, ensuring that
     * it responds correctly to user interactions such as clicks, hovers, or long presses.
     *
     * @protected
     */
    protected bindEvents(): void {
        // Abort any existing strategy to ensure a clean setup.
        this.strategy?.abort();
        this.strategy = undefined;

        // Return early if there is no non-virtual trigger element.
        if (!this.hasNonVirtualTrigger) return;

        // Return early if no trigger interaction is specified.
        if (!this.triggerInteraction) return;

        // Set up a new event handling strategy based on the specified trigger interaction.
        this.strategy = new strategies[this.triggerInteraction](
            this.triggerElement as HTMLElement,
            {
                overlay: this,
            }
        );
    }

    /**
     * Handles the `beforetoggle` event to manage the overlay's state.
     *
     * This method checks the new state of the event and calls `handleBrowserClose`
     * if the new state is not 'open'.
     *
     * @protected
     * @param {Event & { newState: string }} event - The `beforetoggle` event with the new state.
     */
    protected handleBeforetoggle(event: Event & { newState: string }): void {
        if (event.newState !== 'open') {
            this.handleBrowserClose(event);
        }
    }

    /**
     * Handles the browser's close event to manage the overlay's state.
     *
     * This method stops the propagation of the event and closes the overlay if it is not
     * actively opening. If the overlay is actively opening, it calls `manuallyKeepOpen`.
     *
     * @protected
     * @param {Event} event - The browser's close event.
     */
    protected handleBrowserClose(event: Event): void {
        event.stopPropagation();
        if (!this.strategy?.activelyOpening) {
            this.open = false;
            return;
        }
        this.manuallyKeepOpen();
    }

    /**
     * Manually keeps the overlay open.
     *
     * This method sets the overlay to open, allows placement updates, and manages the open state.
     *
     * @public
     * @override
     */
    public override manuallyKeepOpen(): void {
        this.open = true;
        this.placementController.allowPlacementUpdate = true;
        this.manageOpen(false);
    }

    /**
     * Handles the `slotchange` event to manage the overlay's state.
     *
     * This method checks if there are any elements in the slot. If there are no elements,
     * it releases the description from the strategy. If there are elements and the trigger
     * is non-virtual, it prepares the description for the trigger element.
     *
     * @protected
     */
    protected handleSlotchange(): void {
        if (!this.elements.length) {
            // Release the description if there are no elements in the slot.
            this.strategy?.releaseDescription();
        } else if (this.hasNonVirtualTrigger) {
            // Prepare the description for the trigger element if it is non-virtual.
            this.strategy?.prepareDescription(
                this.triggerElement as HTMLElement
            );
        }
    }

    /**
     * Determines whether the overlay should prevent closing.
     *
     * This method checks the `willPreventClose` flag and resets it to `false`.
     * It returns the value of the `willPreventClose` flag.
     *
     * @public
     * @returns {boolean} `true` if the overlay should prevent closing, otherwise `false`.
     */
    public shouldPreventClose(): boolean {
        const shouldPreventClose = this.willPreventClose;
        this.willPreventClose = false;
        return shouldPreventClose;
    }

    /**
     * Requests slottable content for the overlay.
     *
     * This method dispatches a `SlottableRequestEvent` to request or remove slottable content
     * based on the current open state of the overlay. It ensures that the same state is not
     * dispatched twice in a row.
     *
     * @protected
     * @override
     */
    protected override requestSlottable(): void {
        // Do not dispatch the same state twice in a row.
        if (this.lastRequestSlottableState === this.open) {
            return;
        }

        // Force a reflow if the overlay is closing.
        if (!this.open) {
            document.body.offsetHeight;
        }

        /**
         * @ignore
         */
        // Dispatch a custom event to request or remove slottable content based on the open state.
        this.dispatchEvent(
            new SlottableRequestEvent(
                'overlay-content',
                this.open ? {} : removeSlottableRequest
            )
        );

        // Update the last request slottable state.
        this.lastRequestSlottableState = this.open;
    }

    /**
     * Lifecycle method called before the component updates.
     *
     * This method handles various tasks before the component updates, such as setting an ID,
     * managing the open state, resolving the trigger element, and binding events.
     *
     * @override
     * @param {PropertyValues} changes - The properties that have changed.
     */
    override willUpdate(changes: PropertyValues): void {
        // Ensure the component has an ID attribute.
        if (!this.hasAttribute('id')) {
            this.setAttribute(
                'id',
                `${this.tagName.toLowerCase()}-${randomID()}`
            );
        }

        // Warn about deprecated allowOutsideClick property
        if (changes.has('allowOutsideClick') && this.allowOutsideClick) {
            if (window.__swc?.DEBUG) {
                window.__swc.warn(
                    this,
                    `The "allow-outside-click" attribute on <${this.localName}> has been deprecated and will be removed in a future release. We do not recommend using this attribute for accessibility reasons. It allows clicks outside the overlay to close it, which can cause unexpected behavior and accessibility issues.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/overlay/',
                    { level: 'deprecation' }
                );
            } else {
                // Fallback for testing environments or when SWC is not available
                console.warn(
                    `[${this.localName}] The "allow-outside-click" attribute has been deprecated and will be removed in a future release. We do not recommend using this attribute for accessibility reasons. It allows clicks outside the overlay to close it, which can cause unexpected behavior and accessibility issues.`
                );
            }
        }

        // Manage the open state if the 'open' property has changed.
        if (changes.has('open') && (this.hasUpdated || this.open)) {
            this.manageOpen(changes.get('open'));
        }

        // Resolve the trigger element if the 'trigger' property has changed.
        if (changes.has('trigger')) {
            const [id, interaction] = this.trigger?.split('@') || [];
            this.elementResolver.selector = id ? `#${id}` : '';
            this.triggerInteraction = interaction as
                | 'click'
                | 'longpress'
                | 'hover'
                | undefined;
        }

        // Initialize oldTrigger to track the previous trigger element.
        let oldTrigger: HTMLElement | false | undefined = false;

        // Check if the element resolver has been updated.
        if (changes.has(elementResolverUpdatedSymbol)) {
            // Store the current trigger element.
            oldTrigger = this.triggerElement as HTMLElement;
            // Update the trigger element from the element resolver.
            this.triggerElement = this.elementResolver.element;
        }

        // Check if the 'triggerElement' property has changed.
        if (changes.has('triggerElement')) {
            // Store the old trigger element.
            oldTrigger = changes.get('triggerElement');
        }

        // If the trigger element has changed, bind the new events.
        if (oldTrigger !== false) {
            this.bindEvents();
        }
    }

    /**
     * Lifecycle method called after the component updates.
     *
     * This method handles various tasks after the component updates, such as updating the placement
     * attribute, resetting the overlay position, and clearing the overlay position based on the state.
     *
     * @override
     * @param {PropertyValues} changes - The properties that have changed.
     */
    protected override updated(changes: PropertyValues): void {
        // Call the base class method to handle any initial setup.
        super.updated(changes);

        // Check if the 'placement' property has changed.
        if (changes.has('placement')) {
            if (this.placement) {
                // Set the 'actual-placement' attribute on the dialog element.
                this.dialogEl.setAttribute('actual-placement', this.placement);
            } else {
                // Remove the 'actual-placement' attribute from the dialog element.
                this.dialogEl.removeAttribute('actual-placement');
            }

            // If the overlay is open and the 'placement' property has changed, reset the overlay position.
            if (this.open && typeof changes.get('placement') !== 'undefined') {
                this.placementController.resetOverlayPosition();
            }
        }

        // Check if the 'state' property has changed and the overlay is closed.
        if (
            changes.has('state') &&
            this.state === 'closed' &&
            typeof changes.get('state') !== 'undefined'
        ) {
            // Clear the overlay position.
            this.placementController.clearOverlayPosition();
        }
    }

    /**
     * Renders the content of the overlay.
     *
     * This method returns a template result containing a slot element. The slot element
     * listens for the `slotchange` event to manage the overlay's state.
     *
     * @protected
     * @returns {TemplateResult} The template result containing the slot element.
     */
    protected renderContent(): TemplateResult {
        return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
    }

    /**
     * Generates a style map for the dialog element.
     *
     * This method returns an object containing CSS custom properties for the dialog element.
     * The `--swc-overlay-open-count` custom property is set to the current open count of overlays.
     *
     * @private
     * @returns {StyleInfo} The style map for the dialog element.
     */
    private get dialogStyleMap(): StyleInfo {
        return {
            '--swc-overlay-open-count': Overlay.openCount.toString(),
        };
    }

    /**
     * Renders the popover element for the overlay.
     *
     * This method returns a template result containing a div element styled as a popover.
     * The popover element includes various attributes and event listeners to manage the overlay's state and behavior.
     *
     * @protected
     * @returns {TemplateResult} The template result containing the popover element.
     */
    protected renderPopover(): TemplateResult {
        /**
         * The `--swc-overlay-open-count` custom property is applied to mimic the single stack
         * nature of the top layer in browsers that do not yet support it.
         *
         * The value should always represent the total number of overlays that have ever been opened.
         * This value will be added to the `--swc-overlay-z-index-base` custom property, which can be
         * provided by a consuming developer. By default, `--swc-overlay-z-index-base` is set to 1000
         * to ensure that the overlay stacks above most other elements during fallback delivery.
         */
        return html`
            <div
                class="dialog"
                part="dialog"
                role=${ifDefined(
                    this.type === 'modal' || this.type === 'page'
                        ? 'dialog'
                        : undefined
                )}
                aria-modal=${ifDefined(
                    this.type === 'modal' || this.type === 'page'
                        ? 'true'
                        : undefined
                )}
                placement=${ifDefined(
                    this.requiresPositioning
                        ? this.placement || 'right'
                        : undefined
                )}
                popover=${ifDefined(this.popoverValue)}
                style=${styleMap(this.dialogStyleMap)}
                @beforetoggle=${this.handleBeforetoggle}
                @close=${this.handleBrowserClose}
                ?is-visible=${this.state !== 'closed'}
            >
                ${this.renderContent()}
            </div>
        `;
    }

    /**
     * Renders the overlay component.
     *
     * This method returns a template result containing either a dialog or popover element
     * based on the overlay type. It also includes a slot for longpress descriptors.
     *
     * @override
     * @returns {TemplateResult} The template result containing the overlay content.
     */
    public override render(): TemplateResult {
        return html`
            ${this.renderPopover()}
            <slot name="longpress-describedby-descriptor"></slot>
        `;
    }

    /**
     * Lifecycle method called when the component is added to the DOM.
     *
     * This method sets up event listeners and binds events if the component has already updated.
     *
     * @override
     */
    override connectedCallback(): void {
        super.connectedCallback();

        // Add an event listener to handle the 'close' event and update the 'open' property.
        this.addEventListener('close', () => {
            this.open = false;
        });

        // Bind events if the component has already updated.
        if (this.hasUpdated) {
            this.bindEvents();
        }
    }

    /**
     * Lifecycle method called when the component is removed from the DOM.
     *
     * This method releases the description from the strategy and updates the 'open' property.
     *
     * @override
     */
    override disconnectedCallback(): void {
        // Release the description from the strategy.
        this.strategy?.releaseDescription();
        // Update the 'open' property to false.
        this.open = false;
        super.disconnectedCallback();
    }
}
