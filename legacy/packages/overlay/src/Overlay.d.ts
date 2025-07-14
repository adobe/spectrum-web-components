import { PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { ElementResolutionController } from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';
import type { OpenableElement, OverlayState, OverlayTypes, Placement, TriggerInteraction } from './overlay-types.js';
import { AbstractOverlay } from './AbstractOverlay.js';
import { VirtualTrigger } from './VirtualTrigger.js';
import { PlacementController } from './PlacementController.js';
import type { ClickController } from './ClickController.js';
import type { HoverController } from './HoverController.js';
import type { LongpressController } from './LongpressController.js';
export { LONGPRESS_INSTRUCTIONS } from './LongpressController.js';
declare let ComputedOverlayBase: typeof AbstractOverlay & import("./overlay-types.js").Constructor<import("@spectrum-web-components/base").SpectrumElement>;
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
 */
export declare class Overlay extends ComputedOverlayBase {
    static styles: import("@spectrum-web-components/base").CSSResult[];
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
    get delayed(): boolean;
    set delayed(delayed: boolean);
    private _delayed;
    /**
     * A reference to the dialog element within the overlay.
     * This element is expected to have `showPopover` and `hidePopover` methods.
     */
    dialogEl: HTMLDialogElement & {
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
    get disabled(): boolean;
    set disabled(disabled: boolean);
    private _disabled;
    /**
     * A query to gather all elements slotted into the default slot, excluding elements
     * with the slot name "longpress-describedby-descriptor".
     */
    elements: OpenableElement[];
    /**
     * A reference to the parent overlay that should be force-closed, if any.
     */
    parentOverlayToForceClose?: Overlay;
    /**
     * Determines if the overlay has a non-virtual trigger element.
     *
     * @returns {boolean} `true` if the trigger element is not a virtual trigger, otherwise `false`.
     */
    private get hasNonVirtualTrigger();
    /**
     * The `offset` property accepts either a single number to define the offset of the
     * Overlay along the main axis from the trigger, or a 2-tuple to define the offset
     * along both the main axis and the cross axis. This option has no effect when there
     * is no trigger element.
     *
     * @type {number | [number, number]}
     * @default 0
     */
    offset: number | [number, number];
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
    protected get placementController(): PlacementController;
    /**
     * Indicates whether the Overlay is projected onto the "top layer" or not.
     *
     * When set to `true`, the overlay is open and visible. When set to `false`, the overlay is closed and hidden.
     *
     * @type {boolean}
     * @default false
     */
    get open(): boolean;
    set open(open: boolean);
    private _open;
    /**
     * Tracks the number of overlays that have been opened.
     *
     * This static property is used to manage the stacking context of multiple overlays.
     *
     * @type {number}
     * @default 1
     */
    static openCount: number;
    /**
     * Instruct the Overlay where to place itself in relationship to the trigger element.
     *
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     */
    placement?: Placement;
    /**
     * The state in which the last `request-slottable` event was dispatched.
     *
     * This property ensures that overlays do not dispatch the same state twice in a row.
     *
     * @type {boolean}
     * @default false
     */
    private lastRequestSlottableState;
    /**
     * Whether to pass focus to the overlay once opened, or
     * to the appropriate value based on the "type" of the overlay
     * when set to `"auto"`.
     *
     * @type {'true' | 'false' | 'auto'}
     * @default 'auto'
     */
    receivesFocus: 'true' | 'false' | 'auto';
    /**
     * A reference to the slot element within the overlay.
     *
     * This element is used to manage the content slotted into the overlay.
     *
     * @type {HTMLSlotElement}
     */
    slotEl: HTMLSlotElement;
    /**
     * The current state of the overlay.
     *
     * This property reflects the current state of the overlay, such as 'opened' or 'closed'.
     * When the state changes, it triggers the appropriate actions and updates the component.
     *
     * @type {OverlayState}
     * @default 'closed'
     */
    get state(): OverlayState;
    set state(state: OverlayState);
    _state: OverlayState;
    /**
     * The interaction strategy for opening the overlay.
     * This can be a ClickController, HoverController, or LongpressController.
     */
    strategy?: ClickController | HoverController | LongpressController;
    /**
     * The padding around the tip of the overlay.
     * This property defines the padding around the tip of the overlay, which can be used to adjust its positioning.
     *
     * @type {number}
     */
    tipPadding?: number;
    /**
     * An optional ID reference for the trigger element combined with the optional
     * interaction (click | hover | longpress) by which the overlay should open.
     * The format is `trigger@interaction`, e.g., `trigger@click` opens the overlay
     * when an element with the ID "trigger" is clicked.
     *
     * @type {string}
     */
    trigger?: string;
    /**
     * An element reference for the trigger element that the overlay should relate to.
     * This property is not reflected as an attribute.
     *
     * @type {HTMLElement | VirtualTrigger | null}
     */
    triggerElement: HTMLElement | VirtualTrigger | null;
    /**
     * The specific interaction to listen for on the `triggerElement` to open the overlay.
     * This property is not reflected as an attribute.
     *
     * @type {TriggerInteraction}
     */
    triggerInteraction?: TriggerInteraction;
    /**
     * Configures the open/close heuristics of the Overlay.
     *
     * @type {"auto" | "hint" | "manual" | "modal" | "page"}
     * @default "auto"
     */
    type: OverlayTypes;
    /**
     * Tracks whether the overlay was previously open.
     * This is used to restore the open state when re-enabling the overlay.
     *
     * @type {boolean}
     * @default false
     */
    protected wasOpen: boolean;
    /**
     * Focus trap to keep focus within the dialog
     * @private
     */
    private _focusTrap;
    /**
     * Provides an instance of the `ElementResolutionController` for managing the element
     * that the overlay should be associated with. If the instance does not already exist,
     * it is created and assigned to the `_elementResolver` property.
     *
     * @protected
     * @returns {ElementResolutionController} The `ElementResolutionController` instance.
     */
    protected get elementResolver(): ElementResolutionController;
    /**
     * Determines the value for the popover attribute based on the overlay type.
     *
     * @private
     * @returns {'auto' | 'manual' | undefined} The popover value or undefined if not applicable.
     */
    private get popoverValue();
    /**
     * Determines if the overlay requires positioning based on its type and state.
     *
     * @protected
     * @returns {boolean} True if the overlay requires positioning, otherwise false.
     */
    protected get requiresPositioning(): boolean;
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
    protected managePosition(): void;
    /**
     * Manages the process of opening the popover.
     *
     * This method handles the necessary steps to open the popover, including managing delays,
     * ensuring the popover is in the DOM, making transitions, and applying focus.
     *
     * @protected
     * @override
     * @returns {Promise<void>} A promise that resolves when the popover has been fully opened.
     */
    protected managePopoverOpen(): Promise<void>;
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
    protected applyFocus(targetOpenState: boolean, focusEl: HTMLElement | null): Promise<void>;
    /**
     * Returns focus to the trigger element if the overlay is closed.
     *
     * This method ensures that focus is returned to the trigger element when the overlay is closed,
     * unless the overlay is of type "hint" or the focus is already outside the overlay.
     *
     * @protected
     * @override
     */
    protected returnFocus(): void;
    /**
     * Handles the focus out event to close the overlay if the focus moves outside of it.
     *
     * This method ensures that the overlay is closed when the focus moves to an element
     * outside of the overlay, unless the focus is moved to a related element.
     *
     * @private
     * @param {FocusEvent} event - The focus out event.
     */
    private closeOnFocusOut;
    private closeOnCancelEvent;
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
    protected manageOpen(oldOpen: boolean): Promise<void>;
    /**
     * Binds event handling strategies to the overlay based on the specified trigger interaction.
     *
     * This method sets up the appropriate event handling strategy for the overlay, ensuring that
     * it responds correctly to user interactions such as clicks, hovers, or long presses.
     *
     * @protected
     */
    protected bindEvents(): void;
    /**
     * Handles the `beforetoggle` event to manage the overlay's state.
     *
     * This method checks the new state of the event and calls `handleBrowserClose`
     * if the new state is not 'open'.
     *
     * @protected
     * @param {Event & { newState: string }} event - The `beforetoggle` event with the new state.
     */
    protected handleBeforetoggle(event: Event & {
        newState: string;
    }): void;
    /**
     * Handles the browser's close event to manage the overlay's state.
     *
     * This method stops the propagation of the event and closes the overlay if it is not
     * actively opening. If the overlay is actively opening, it calls `manuallyKeepOpen`.
     *
     * @protected
     * @param {Event} event - The browser's close event.
     */
    protected handleBrowserClose(event: Event): void;
    /**
     * Manually keeps the overlay open.
     *
     * This method sets the overlay to open, allows placement updates, and manages the open state.
     *
     * @public
     * @override
     */
    manuallyKeepOpen(): void;
    /**
     * Handles the `slotchange` event to manage the overlay's state.
     *
     * This method checks if there are any elements in the slot. If there are no elements,
     * it releases the description from the strategy. If there are elements and the trigger
     * is non-virtual, it prepares the description for the trigger element.
     *
     * @protected
     */
    protected handleSlotchange(): void;
    /**
     * Determines whether the overlay should prevent closing.
     *
     * This method checks the `willPreventClose` flag and resets it to `false`.
     * It returns the value of the `willPreventClose` flag.
     *
     * @public
     * @returns {boolean} `true` if the overlay should prevent closing, otherwise `false`.
     */
    shouldPreventClose(): boolean;
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
    protected requestSlottable(): void;
    /**
     * Lifecycle method called before the component updates.
     *
     * This method handles various tasks before the component updates, such as setting an ID,
     * managing the open state, resolving the trigger element, and binding events.
     *
     * @override
     * @param {PropertyValues} changes - The properties that have changed.
     */
    willUpdate(changes: PropertyValues): void;
    /**
     * Lifecycle method called after the component updates.
     *
     * This method handles various tasks after the component updates, such as updating the placement
     * attribute, resetting the overlay position, and clearing the overlay position based on the state.
     *
     * @override
     * @param {PropertyValues} changes - The properties that have changed.
     */
    protected updated(changes: PropertyValues): void;
    /**
     * Renders the content of the overlay.
     *
     * This method returns a template result containing a slot element. The slot element
     * listens for the `slotchange` event to manage the overlay's state.
     *
     * @protected
     * @returns {TemplateResult} The template result containing the slot element.
     */
    protected renderContent(): TemplateResult;
    /**
     * Generates a style map for the dialog element.
     *
     * This method returns an object containing CSS custom properties for the dialog element.
     * The `--swc-overlay-open-count` custom property is set to the current open count of overlays.
     *
     * @private
     * @returns {StyleInfo} The style map for the dialog element.
     */
    private get dialogStyleMap();
    /**
     * Renders the popover element for the overlay.
     *
     * This method returns a template result containing a div element styled as a popover.
     * The popover element includes various attributes and event listeners to manage the overlay's state and behavior.
     *
     * @protected
     * @returns {TemplateResult} The template result containing the popover element.
     */
    protected renderPopover(): TemplateResult;
    /**
     * Renders the overlay component.
     *
     * This method returns a template result containing either a dialog or popover element
     * based on the overlay type. It also includes a slot for longpress descriptors.
     *
     * @override
     * @returns {TemplateResult} The template result containing the overlay content.
     */
    render(): TemplateResult;
    /**
     * Lifecycle method called when the component is added to the DOM.
     *
     * This method sets up event listeners and binds events if the component has already updated.
     *
     * @override
     */
    connectedCallback(): void;
    /**
     * Lifecycle method called when the component is removed from the DOM.
     *
     * This method releases the description from the strategy and updates the 'open' property.
     *
     * @override
     */
    disconnectedCallback(): void;
}
