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
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { StyleInfo } from '@spectrum-web-components/base/src/directives.js';
import type { FieldLabel } from '@spectrum-web-components/field-label';
import type { MenuItem, MenuItemChildren, MenuItemKeydownEvent } from '@spectrum-web-components/menu';
import { SlottableRequestEvent } from '@spectrum-web-components/overlay/src/slottable-request-event.js';
import { ExpandableElement } from '@spectrum-web-components/picker';
import type { Tooltip } from '@spectrum-web-components/tooltip';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
declare const ActionMenu_base: typeof ExpandableElement & import("@spectrum-web-components/base").Constructor<import("@spectrum-web-components/base").SizedElementInterface> & import("@spectrum-web-components/base").SizedElementConstructor & {
    new (...args: any[]): import("@spectrum-web-components/shared").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared").SlotTextObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared").SlotPresenceObservingInterface;
    prototype: import("@spectrum-web-components/shared").SlotPresenceObservingInterface;
};
/**
 * An `<sp-action-menu>` is an action button with an attached menu of options.
 * Unlike a standard picker, it does not maintain a selection by default and
 * displays a "more" icon instead of a chevron.
 *
 * @element sp-action-menu
 *
 * @slot - menu items to be listed in the Action Menu
 * @slot icon - The icon to use for the Action Menu
 * @slot label - The label to use for the Action Menu
 * @slot label-only - The label to use for the Action Menu (no icon space reserved)
 * @slot tooltip - Tooltip to be applied to the Action Button
 * @attr selects - By default `sp-action-menu` does not manage a selection. If
 * you'd like for a selection to be held by the `sp-menu` that it presents in
 * its overlay, use `selects="single" to activate this functionality.
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
export declare class ActionMenu extends ActionMenu_base {
    /**
     * Returns the component's styles including action menu specific styles.
     */
    static get styles(): CSSResultArray;
    /**
     * The selection mode for the action menu.
     * Unlike Picker, defaults to `undefined` (no selection management).
     * Set to `'single'` to maintain a selected item.
     */
    selects: undefined | 'single';
    /** The alignment of the associated label, set by an external field label component. */
    labelAlignment?: 'inline';
    /**
     * Returns the list of menu items contained in the picker's options menu.
     */
    protected get menuItems(): MenuItem[];
    /** The label applied to the picker, typically from an associated field label. */
    appliedLabel?: string;
    /**
     * @deprecated Reference to a legacy `<sp-menu>` child element.
     * Used for backwards compatibility with older usage patterns.
     */
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
     * Applies static color styling for use on colored backgrounds.
     * - `'white'`: Use on dark backgrounds
     * - `'black'`: Use on light backgrounds
     */
    staticColor?: 'white' | 'black';
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
    /** The ARIA role for the menu list element. Uses 'menu' for action menus. */
    protected listRole: 'listbox' | 'menu';
    /** The ARIA role for individual menu items. Uses 'menuitem' for action menus. */
    protected itemRole: string;
    /**
     * The currently selected menu item, or undefined if no item is selected.
     */
    get selectedItem(): MenuItem | undefined;
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
    /** Private backing field for selectedItemContent getter/setter. */
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
     * Returns the content to render inside the action button.
     * Includes the icon slot (with "more" icon default), label slot, and label-only slot.
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
     * Checks whether the action menu has an accessible label through any supported method:
     * Extends base check to include label slot content and label-only slot.
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
     * Logs a warning in debug mode when the action menu lacks an accessible label.
     * Provides guidance specific to action menu labeling options.
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
    /**
     * Renders the action menu component.
     * Uses an action button as the trigger instead of a standard button.
     */
    protected render(): TemplateResult;
    /**
     * Lifecycle callback before the component updates.
     * Transfers tabIndex from the host element to the internal button.
     *
     * @param changedProperties - Map of changed property names to previous values
     */
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    /**
     * Handles property updates.
     * Forces the invalid property to always be false since action menus
     * don't support validation states.
     *
     * @param changedProperties - Map of changed property names to previous values
     */
    protected update(changedProperties: PropertyValues<this>): void;
    /**
     * Binds the keydown event listener to the trigger button.
     * Called during first update to enable keyboard navigation.
     */
    protected bindButtonKeydownListener(): void;
    /**
     * Lifecycle callback after the component has updated.
     * Ensures the strategy has a reference to the overlay element when opened.
     *
     * @param changedProperties - Map of changed property names to previous values
     */
    protected updated(changedProperties: PropertyValues<this>): void;
    /**
     * Lifecycle callback after the component's first update.
     * Binds keyboard listeners and initializes the interaction strategy.
     *
     * @param changedProperties - Map of changed property names to previous values
     */
    protected firstUpdated(changedProperties: PropertyValues<this>): Promise<void>;
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
    /** Promise that resolves when selection management is complete. */
    private selectionPromise;
    /** Resolver function for the selectionPromise. */
    private selectionResolver;
    /**
     * Returns a promise that resolves when the component update is complete,
     * including any pending selection management.
     */
    protected getUpdateComplete(): Promise<boolean>;
    /**
     * Tracks whether the component was recently connected to the DOM.
     * Used to handle timing differences in Safari and Firefox.
     */
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
    /**
     * Lifecycle callback when the element is connected to the DOM.
     * Sets up tooltip trigger elements and focus event listeners.
     */
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Sets the currently selected menu item and updates the displayed content.
     *
     * @param selectedItem - The menu item to select, or undefined to clear selection
     */
    set selectedItem(selectedItem: MenuItem | undefined);
    /** Private backing field for selectedItem getter/setter. */
    _selectedItem?: MenuItem;
    /**
     * Whether the label slot has content.
     * Used to determine button layout and icon visibility.
     */
    private get hasLabel();
    /**
     * Whether the label-only slot is being used.
     * When true, no icon space is reserved.
     */
    private get labelOnly();
    /**
     * Handles slottable request events by re-dispatching them.
     * Allows parent components to intercept overlay content requests.
     *
     * @param event - The slottable request event
     */
    handleSlottableRequest: (event: SlottableRequestEvent) => void;
}
export {};
