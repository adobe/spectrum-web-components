/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { StyleInfo } from '@spectrum-web-components/base/src/directives.js';
import type { FieldLabel } from '@spectrum-web-components/field-label';
import type { Menu, MenuItem, MenuItemChildren, MenuItemKeydownEvent } from '@spectrum-web-components/menu';
import { Placement } from '@spectrum-web-components/overlay';
import { Overlay } from '@spectrum-web-components/overlay/src/Overlay.js';
import type { SlottableRequestEvent } from '@spectrum-web-components/overlay/src/slottable-request-event.js';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import type { Tooltip } from '@spectrum-web-components/tooltip';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/menu/sp-menu.js';
import { DesktopController } from './DesktopController.js';
import { MobileController } from './MobileController.js';
export declare const DESCRIPTION_ID = "option-picker";
/**
 * Base class for expandable picker-like components with overlay functionality.
 * Provides common properties and methods for managing an overlay menu,
 * device-specific interaction strategies, and focus management.
 *
 * Extended by Picker, ActionMenu, and other components that display
 * a menu overlay triggered by a button.
 */
export declare class ExpandableElement extends SpectrumElement {
    /**
     * Shadow root configuration with delegatesFocus enabled.
     * Allows focus to be delegated to focusable children within the shadow root.
     */
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** Controller that tracks whether the device is mobile. */
    isMobile: MatchMediaController;
    /** Controller that tracks whether the device supports touch input. */
    isTouchDevice: MatchMediaController;
    /** The interaction strategy controller (desktop or mobile) managing pointer and keyboard events. */
    strategy: DesktopController | MobileController;
    /** Reference to the component's trigger button element. */
    button: HTMLButtonElement;
    /** Controller that manages lazy-loading of overlay dependencies. */
    dependencyManager: DependencyManagerController;
    /** Whether the component is disabled. When disabled, the component cannot be interacted with. */
    disabled: boolean;
    /** Whether the component currently has visible focus. */
    focused: boolean;
    /** Whether the component is read-only. When read-only, the component displays its value but cannot be changed. */
    readonly: boolean;
    /** Whether the items are currently loading. */
    pending: boolean;
    /**
     * Forces the component to render as a popover on mobile instead of a tray.
     */
    forcePopover: boolean;
    /** Whether the component's menu overlay is currently open. */
    open: boolean;
    /** Reference to the component's internal menu element. */
    optionsMenu: Menu;
    /** Reference to the component's overlay element. */
    overlayElement: Overlay;
    /**
     * The preferred placement of the component's overlay relative to the trigger button.
     *
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    placement: Placement;
    /**
     * Returns the element that should receive focus.
     * When open, returns the options menu; otherwise returns the trigger button.
     */
    get focusElement(): HTMLElement;
    /**
     * Focuses the appropriate element (button or menu) based on the picker's state.
     *
     * @param options - Standard focus options
     */
    focus(options?: FocusOptions): void;
    /**
     * Closes the component's overlay.
     * Has no effect when the component is readonly.
     */
    close(): void;
    /**
     * Toggles the component's open state.
     * Has no effect when the component is readonly, pending, or disabled.
     *
     * @param target - Optional explicit open state. If not provided, toggles the current state.
     */
    toggle(target?: boolean): void;
    /**
     * Handles slottable request events from the overlay.
     * Override in subclasses to customize slottable behavior.
     *
     * @param _event - The slottable request event
     */
    handleSlottableRequest: (_event: SlottableRequestEvent) => void;
    /**
     * Handles the overlay's beforetoggle event.
     * Manages overlay state and prevents unwanted closures during interaction.
     *
     * @param event - The beforetoggle event with the new state
     */
    protected handleBeforetoggle: (event: Event & {
        target: Overlay;
        newState: "open" | "closed";
    }) => void;
    /**
     * Binds the appropriate interaction strategy (desktop or mobile) based on device type.
     * Aborts any existing strategy before creating a new one.
     */
    bindEvents(): void;
    /**
     * Lifecycle callback when the element is disconnected from the DOM.
     * Closes the overlay and releases strategy resources.
     */
    disconnectedCallback(): void;
}
declare const PickerBase_base: typeof ExpandableElement & import("@spectrum-web-components/base").Constructor<import("@spectrum-web-components/base").SizedElementInterface> & import("@spectrum-web-components/base").SizedElementConstructor;
/**
 * @slot label - The placeholder content for the Picker
 * @slot description - The description content for the Picker
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 * @slot - menu items to be listed in the Picker
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 * @deprecated This class is deprecated and will be removed in a future major release. Use the ExpandableElement base class instead.
 * @see https://opensource.adobe.com/spectrum-web-components/components/picker/#deprecation
 */
export declare class PickerBase extends PickerBase_base {
    /** The label applied to the picker, typically from an associated field label. */
    appliedLabel?: string;
    private deprecatedMenu;
    /**
     * Controls how icons are displayed in the picker button.
     * - `'only'`: Shows only the icon, hiding the label visually.
     * - `'none'`: Hides the icon entirely.
     */
    icons?: 'only' | 'none';
    /** Whether the picker is in an invalid state. Displays a validation icon when true. */
    invalid: boolean;
    /** Defines a string value that labels the Picker while it is in pending state. */
    pendingLabel: string;
    /** The placeholder label displayed when no item is selected. */
    label?: string;
    /**
     * The selection mode for the picker's menu.
     * Always forced to `'single'` for standard picker behavior.
     */
    selects: undefined | 'single';
    /** The alignment of the associated label, set by an external field label component. */
    labelAlignment?: 'inline';
    /**
     * Returns the list of menu items contained in the picker's options menu.
     */
    protected get menuItems(): MenuItem[];
    /**
     * @deprecated This property always returns true and will be removed in a future version.
     */
    get selfManageFocusElement(): boolean;
    /** Reference to the tooltip element, if one is slotted. */
    protected tooltipEl?: Tooltip;
    /** Whether to render the picker in quiet mode with minimal visual styling. */
    quiet: boolean;
    /** The current value of the picker, corresponding to the selected menu item's value. */
    value: string;
    /**
     * The currently selected menu item, or undefined if no item is selected.
     */
    get selectedItem(): MenuItem | undefined;
    set selectedItem(selectedItem: MenuItem | undefined);
    _selectedItem?: MenuItem;
    /** The ARIA role for the menu list element. */
    protected listRole: 'listbox' | 'menu';
    /** The ARIA role for individual menu items. */
    protected itemRole: string;
    /**
     * Programmatically applies visible focus styling to the picker.
     * Has no effect when the picker is disabled.
     */
    forceFocusVisible(): void;
    /**
     * Toggles the picker's open state when called programmatically.
     * Note: Pointer events are handled by the interaction controller.
     */
    click(): void;
    /**
     * Handles click events on the trigger button.
     * Note: Pointer events are typically handled by the interaction controller;
     * this method is called when `this.button.click()` is invoked programmatically.
     */
    handleButtonClick(): void;
    /**
     * Handles blur events on the trigger button, removing focus styling.
     */
    handleButtonBlur(): void;
    focus(options?: FocusOptions): void;
    /**
     * @deprecated Use `focus()` instead.
     * Focuses the picker button and applies focus styling.
     */
    handleHelperFocus(): void;
    /**
     * Handles focus events on the picker, applying visible focus styling
     * only when focus is visible in the tree.
     */
    handleFocus(): void;
    /**
     * Handles change events from the menu, updating the selected value.
     * Dispatches a `change` event that can be prevented to cancel the selection.
     *
     * @param event - The change event from the menu
     */
    handleChange(event: Event): void;
    /**
     * Handles focus events on the trigger button, delegating to the interaction strategy.
     *
     * @param event - The focus event
     */
    handleButtonFocus(event: FocusEvent): void;
    /**
     * Handles Escape key press to close the picker overlay.
     *
     * @param event - The keyboard event
     */
    protected handleEscape: (event: MenuItemKeydownEvent | KeyboardEvent) => void;
    /**
     * Handles keyboard navigation on the picker button.
     * Opens the menu on Arrow keys, Enter, or Space.
     *
     * @param event - The keyboard event
     */
    protected handleKeydown: (event: KeyboardEvent) => void;
    /**
     * Opens the picker via keyboard interaction and focuses the first selected item.
     * If already open, focuses the first selected item in the menu.
     */
    protected keyboardOpen(): Promise<void>;
    /**
     * Sets the picker's value from a menu item selection.
     * Dispatches a cancelable `change` event and reverts the selection if prevented.
     *
     * @param item - The menu item to select
     * @param menuChangeEvent - The original menu change event, if any
     */
    protected setValueFromItem(item: MenuItem, menuChangeEvent?: Event): Promise<void>;
    /**
     * Updates the selected state of a menu item.
     *
     * @param item - The menu item to update
     * @param value - Whether the item should be selected
     */
    protected setMenuItemSelected(item: MenuItem, value: boolean): void;
    /**
     * Returns inline styles for the overlay container.
     * On mobile, sets full width; on desktop, returns empty styles.
     */
    protected get containerStyles(): StyleInfo;
    /**
     * The content (icon and text) of the currently selected menu item.
     * Used to render the selected item's display in the picker button.
     */
    protected get selectedItemContent(): MenuItemChildren;
    protected set selectedItemContent(selectedItemContent: MenuItemChildren | undefined);
    _selectedItemContent?: MenuItemChildren;
    /**
     * Handles slotchange events for the tooltip slot.
     * Sets up the trigger element for self-managed tooltips.
     *
     * @param event - The slotchange event
     */
    protected handleTooltipSlotchange(event: Event & {
        target: HTMLSlotElement;
    }): void;
    /**
     * Renders the label content for the picker button.
     * Shows the selected item's content if available, otherwise renders the placeholder label.
     *
     * @param content - The content nodes from the selected item
     * @returns The rendered label content
     */
    protected renderLabelContent(content: Node[]): TemplateResult | Node[];
    /**
     * Renders the loading indicator shown during pending state.
     * Dynamically imports the progress-circle component.
     *
     * @returns The rendered progress circle template
     */
    protected renderLoader(): TemplateResult;
    /**
     * Returns the content to render inside the picker button,
     * including the icon, label, validation icon, and chevron.
     */
    protected get buttonContent(): TemplateResult[];
    /**
     * Callback invoked by an associated field label to apply its label value.
     * Sets the applied label and determines label alignment based on the field label's configuration.
     *
     * @param value - The label text value
     * @param labelElement - The field label element providing the label
     */
    applyFocusElementLabel: (value: string, labelElement: FieldLabel) => void;
    /**
     * Checks whether the picker has an accessible label through any supported method:
     * - `label` attribute
     * - `aria-label` attribute
     * - `aria-labelledby` attribute
     * - Applied label from a field label
     * - Slotted label content
     *
     * @returns True if an accessible label is present
     */
    protected hasAccessibleLabel(): boolean;
    /**
     * Logs a warning in debug mode when the picker lacks an accessible label.
     * Provides guidance on how to make the picker accessible.
     */
    protected warnNoLabel(): void;
    /**
     * Renders the overlay element containing the menu.
     * Configures the overlay with appropriate placement, type, and event handlers.
     *
     * @param menu - The menu template to render inside the overlay
     * @returns The rendered overlay template
     */
    protected renderOverlay(menu: TemplateResult): TemplateResult;
    /**
     * Renders the description slot for additional picker context.
     * Content is referenced by aria-describedby for accessibility.
     */
    protected get renderDescriptionSlot(): TemplateResult;
    protected render(): TemplateResult;
    protected willUpdate(changes: PropertyValues<this>): void;
    protected update(changes: PropertyValues<this>): void;
    /**
     * Binds the keydown event listener to the trigger button.
     * Called during first update to enable keyboard navigation.
     */
    protected bindButtonKeydownListener(): void;
    protected updated(changes: PropertyValues<this>): void;
    protected firstUpdated(changes: PropertyValues<this>): Promise<void>;
    /**
     * Renders a visually hidden dismiss button for accessibility.
     * Allows screen reader users to dismiss the overlay.
     */
    protected get dismissHelper(): TemplateResult;
    /**
     * Renders the overlay container (popover or tray) based on device type.
     * On mobile, uses a tray; on desktop, uses a popover.
     *
     * @param menu - The menu template to wrap in the container
     * @returns The rendered container template
     */
    protected renderContainer(menu: TemplateResult): TemplateResult;
    /** Tracks whether the overlay has been rendered at least once. */
    protected hasRenderedOverlay: boolean;
    /**
     * Dispatches a scroll event when the menu is scrolled.
     * Allows parent components to react to menu scroll events.
     */
    private onScroll;
    /**
     * Renders the menu and overlay structure.
     * Lazily renders the overlay only after the picker has been focused or opened.
     */
    protected get renderMenu(): TemplateResult;
    /** Tracks whether a selection change is already scheduled for the next frame. */
    willManageSelection: boolean;
    /**
     * Schedules selection management for the next animation frame.
     * Called when the value changes or menu slot content changes.
     * Prevents duplicate scheduling if already pending.
     *
     * @param event - Optional event that triggered the scheduling
     */
    protected shouldScheduleManageSelection(event?: Event): void;
    /**
     * Immediately manages selection when a menu item is added or updated.
     * Skips if selection management is already scheduled.
     */
    protected shouldManageSelection(): void;
    /**
     * Synchronizes the menu selection state with the picker's current value.
     * Finds and selects the menu item matching the current value,
     * and deselects all other items.
     */
    protected manageSelection(): Promise<void>;
    private selectionPromise;
    private selectionResolver;
    protected getUpdateComplete(): Promise<boolean>;
    private recentlyConnected;
    /** Tracks the target of an active Enter keydown to prevent double-activation. */
    private enterKeydownOn;
    /**
     * Handles Enter key events to prevent double-activation of menu items.
     * Tracks keydown state and clears it on keyup.
     * Also prevents Enter from triggering submenus that aren't open.
     *
     * @param event - The keyboard event
     */
    protected handleEnterKeydown: (event: KeyboardEvent) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare const Picker_base: typeof ExpandableElement & import("@spectrum-web-components/base").Constructor<import("@spectrum-web-components/base").SizedElementInterface> & import("@spectrum-web-components/base").SizedElementConstructor;
/**
 * An `<sp-picker>` is a dropdown selection component that allows users to choose
 * a single option from a list of menu items. It supports keyboard navigation,
 * including arrow keys to cycle through options without opening the menu.
 *
 * @element sp-picker
 *
 * @slot label - The placeholder content for the Picker
 * @slot description - The description content for the Picker
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 * @slot - menu items to be listed in the Picker
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
export declare class Picker extends Picker_base {
    static get styles(): CSSResultArray;
    /** The label applied to the picker, typically from an associated field label. */
    appliedLabel?: string;
    private deprecatedMenu;
    /**
     * Controls how icons are displayed in the picker button.
     * - `'only'`: Shows only the icon, hiding the label visually.
     * - `'none'`: Hides the icon entirely.
     */
    icons?: 'only' | 'none';
    /** Whether the picker is in an invalid state. Displays a validation icon when true. */
    invalid: boolean;
    /** Defines a string value that labels the Picker while it is in pending state. */
    pendingLabel: string;
    /** The placeholder label displayed when no item is selected. */
    label?: string;
    /**
     * The selection mode for the picker's menu.
     * Always forced to `'single'` for standard picker behavior.
     */
    selects: undefined | 'single';
    /** The alignment of the associated label, set by an external field label component. */
    labelAlignment?: 'inline';
    /**
     * Returns the list of menu items contained in the picker's options menu.
     */
    protected get menuItems(): MenuItem[];
    /**
     * @deprecated This property always returns true and will be removed in a future version.
     */
    get selfManageFocusElement(): boolean;
    /** Reference to the tooltip element, if one is slotted. */
    protected tooltipEl?: Tooltip;
    /** Whether to render the picker in quiet mode with minimal visual styling. */
    quiet: boolean;
    /** The current value of the picker, corresponding to the selected menu item's value. */
    value: string;
    /**
     * The currently selected menu item, or undefined if no item is selected.
     */
    get selectedItem(): MenuItem | undefined;
    set selectedItem(selectedItem: MenuItem | undefined);
    _selectedItem?: MenuItem;
    /** The ARIA role for the menu list element. */
    protected listRole: 'listbox' | 'menu';
    /** The ARIA role for individual menu items. */
    protected itemRole: string;
    /**
     * Programmatically applies visible focus styling to the picker.
     * Has no effect when the picker is disabled.
     */
    forceFocusVisible(): void;
    /**
     * Toggles the picker's open state when called programmatically.
     * Note: Pointer events are handled by the interaction controller.
     */
    click(): void;
    /**
     * Handles click events on the trigger button.
     * Note: Pointer events are typically handled by the interaction controller;
     * this method is called when `this.button.click()` is invoked programmatically.
     */
    handleButtonClick(): void;
    /**
     * Handles blur events on the trigger button, removing focus styling.
     */
    handleButtonBlur(): void;
    /**
     * @deprecated Use `focus()` instead.
     * Focuses the picker button and applies focus styling.
     */
    handleHelperFocus(): void;
    /**
     * Handles focus events on the picker, applying visible focus styling
     * only when focus is visible in the tree.
     */
    handleFocus(): void;
    /**
     * Handles change events from the menu, updating the selected value.
     * Dispatches a `change` event that can be prevented to cancel the selection.
     *
     * @param event - The change event from the menu
     */
    handleChange(event: Event): void;
    /**
     * Handles focus events on the trigger button, delegating to the interaction strategy.
     *
     * @param event - The focus event
     */
    handleButtonFocus(event: FocusEvent): void;
    /**
     * Handles Escape key press to close the picker overlay.
     *
     * @param event - The keyboard event
     */
    protected handleEscape: (event: MenuItemKeydownEvent | KeyboardEvent) => void;
    /**
     * Enhanced keyboard handler that supports arrow key navigation to cycle
     * through options without opening the menu (in addition to base navigation).
     *
     * @param event - The keyboard event
     */
    protected handleKeydown: (event: KeyboardEvent) => void;
    /**
     * Opens the picker via keyboard interaction and focuses the first selected item.
     * If already open, focuses the first selected item in the menu.
     */
    protected keyboardOpen(): Promise<void>;
    /**
     * Sets the picker's value from a menu item selection.
     * Dispatches a cancelable `change` event and reverts the selection if prevented.
     *
     * @param item - The menu item to select
     * @param menuChangeEvent - The original menu change event, if any
     */
    protected setValueFromItem(item: MenuItem, menuChangeEvent?: Event): Promise<void>;
    /**
     * Updates the selected state of a menu item.
     *
     * @param item - The menu item to update
     * @param value - Whether the item should be selected
     */
    protected setMenuItemSelected(item: MenuItem, value: boolean): void;
    /**
     * Returns inline styles for the overlay container.
     * On mobile, sets full width; on desktop, returns empty styles.
     */
    protected get containerStyles(): StyleInfo;
    /**
     * The content (icon and text) of the currently selected menu item.
     * Used to render the selected item's display in the picker button.
     */
    protected get selectedItemContent(): MenuItemChildren;
    protected set selectedItemContent(selectedItemContent: MenuItemChildren | undefined);
    _selectedItemContent?: MenuItemChildren;
    /**
     * Handles slotchange events for the tooltip slot.
     * Sets up the trigger element for self-managed tooltips.
     *
     * @param event - The slotchange event
     */
    protected handleTooltipSlotchange(event: Event & {
        target: HTMLSlotElement;
    }): void;
    /**
     * Renders the label content for the picker button.
     * Shows the selected item's content if available, otherwise renders the placeholder label.
     *
     * @param content - The content nodes from the selected item
     * @returns The rendered label content
     */
    protected renderLabelContent(content: Node[]): TemplateResult | Node[];
    /**
     * Renders the loading indicator shown during pending state.
     * Dynamically imports the progress-circle component.
     *
     * @returns The rendered progress circle template
     */
    protected renderLoader(): TemplateResult;
    /**
     * Returns the content to render inside the picker button,
     * including the icon, label, validation icon, and chevron.
     */
    protected get buttonContent(): TemplateResult[];
    /**
     * Callback invoked by an associated field label to apply its label value.
     * Sets the applied label and determines label alignment based on the field label's configuration.
     *
     * @param value - The label text value
     * @param labelElement - The field label element providing the label
     */
    applyFocusElementLabel: (value: string, labelElement: FieldLabel) => void;
    /**
     * Checks whether the picker has an accessible label through any supported method:
     * - `label` attribute
     * - `aria-label` attribute
     * - `aria-labelledby` attribute
     * - Applied label from a field label
     * - Slotted label content
     *
     * @returns True if an accessible label is present
     */
    protected hasAccessibleLabel(): boolean;
    /**
     * Logs a warning in debug mode when the picker lacks an accessible label.
     * Provides guidance on how to make the picker accessible.
     */
    protected warnNoLabel(): void;
    /**
     * Renders the overlay element containing the menu.
     * Configures the overlay with appropriate placement, type, and event handlers.
     *
     * @param menu - The menu template to render inside the overlay
     * @returns The rendered overlay template
     */
    protected renderOverlay(menu: TemplateResult): TemplateResult;
    /**
     * Renders the description slot for additional picker context.
     * Content is referenced by aria-describedby for accessibility.
     */
    protected get renderDescriptionSlot(): TemplateResult;
    protected render(): TemplateResult;
    protected willUpdate(changes: PropertyValues<this>): void;
    protected update(changes: PropertyValues<this>): void;
    /**
     * Binds the keydown event listener to the trigger button.
     * Called during first update to enable keyboard navigation.
     */
    protected bindButtonKeydownListener(): void;
    protected updated(changes: PropertyValues<this>): void;
    protected firstUpdated(changes: PropertyValues<this>): Promise<void>;
    /**
     * Renders a visually hidden dismiss button for accessibility.
     * Allows screen reader users to dismiss the overlay.
     */
    protected get dismissHelper(): TemplateResult;
    /**
     * Renders the overlay container (popover or tray) based on device type.
     * On mobile, uses a tray; on desktop, uses a popover.
     *
     * @param menu - The menu template to wrap in the container
     * @returns The rendered container template
     */
    protected renderContainer(menu: TemplateResult): TemplateResult;
    /** Tracks whether the overlay has been rendered at least once. */
    protected hasRenderedOverlay: boolean;
    /**
     * Dispatches a scroll event when the menu is scrolled.
     * Allows parent components to react to menu scroll events.
     */
    private onScroll;
    /**
     * Renders the menu and overlay structure.
     * Lazily renders the overlay only after the picker has been focused or opened.
     */
    protected get renderMenu(): TemplateResult;
    /** Tracks whether a selection change is already scheduled for the next frame. */
    willManageSelection: boolean;
    /**
     * Schedules selection management for the next animation frame.
     * Called when the value changes or menu slot content changes.
     * Prevents duplicate scheduling if already pending.
     *
     * @param event - Optional event that triggered the scheduling
     */
    protected shouldScheduleManageSelection(event?: Event): void;
    /**
     * Immediately manages selection when a menu item is added or updated.
     * Skips if selection management is already scheduled.
     */
    protected shouldManageSelection(): void;
    /**
     * Synchronizes the menu selection state with the picker's current value.
     * Finds and selects the menu item matching the current value,
     * and deselects all other items.
     */
    protected manageSelection(): Promise<void>;
    private selectionPromise;
    private selectionResolver;
    protected getUpdateComplete(): Promise<boolean>;
    private recentlyConnected;
    /** Tracks the target of an active Enter keydown to prevent double-activation. */
    private enterKeydownOn;
    /**
     * Handles Enter key events to prevent double-activation of menu items.
     * Tracks keydown state and clears it on keyup.
     * Also prevents Enter from triggering submenus that aren't open.
     *
     * @param event - The keyboard event
     */
    protected handleEnterKeydown: (event: KeyboardEvent) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export {};
