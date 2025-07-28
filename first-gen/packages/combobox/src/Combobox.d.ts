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
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { PendingStateController } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';
import { Textfield } from '@spectrum-web-components/textfield';
import { Menu, MenuItem } from '@spectrum-web-components/menu';
export type ComboboxOption = {
    value: string;
    itemText: string;
    disabled?: boolean;
};
/**
 * @element sp-combobox
 * @slot - Supply Menu Item elements to the default slot in order to populate the available options
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 */
export declare class Combobox extends Textfield {
    static get styles(): CSSResultArray;
    /**
     * The currently active ComboboxItem descendant, when available.
     */
    private activeDescendant?;
    autocomplete: 'list' | 'none';
    private availableOptions;
    /**
     * Whether the listbox is visible.
     **/
    open: boolean;
    /** Whether the items are currently loading. */
    pending: boolean;
    /** Defines a string value that labels the Combobox while it is in pending state. */
    pendingLabel: string;
    pendingStateController: PendingStateController<this>;
    /**
     * Initializes the `PendingStateController` for the Combobox component.
     * When the pending state changes to `true`, the `open` property of the Combobox is set to `false`.
     */
    constructor();
    private optionSlot;
    overlayOpen: boolean;
    private input;
    private itemValue;
    /**
     * An array of options to present in the Menu provided while typing into the input
     */
    options?: (ComboboxOption | MenuItem)[];
    /**
     * The array of the children of the combobox, ie ComboboxItems.
     **/
    protected optionEls: MenuItem[];
    private tooltipEl?;
    private resizeObserver?;
    private fieldWidth;
    focus(): void;
    click(): void;
    private scrollToActiveDescendant;
    handleComboboxKeydown(event: KeyboardEvent): void;
    /**
     * Convert the flattened array of assigned elements of `slot[name='option']` to
     * an array of `ComboboxOptions` for use in rendering options in the shadow DOM.s
     **/
    handleSlotchange(): void;
    protected handleTooltipSlotchange(event: Event & {
        target: HTMLSlotElement;
    }): void;
    setOptionsFromSlottedItems(): void;
    activateNextDescendant(): void;
    activatePreviousDescendant(): void;
    selectDescendant(): void;
    filterAvailableOptions(): void;
    handleInput(event: Event): void;
    protected handleMenuChange(event: PointerEvent & {
        target: Menu;
    }): void;
    handleClosed(): void;
    handleOpened(): void;
    toggleOpen(): void;
    protected shouldUpdate(changed: PropertyValues<this & {
        optionEls: MenuItem[];
    }>): boolean;
    protected onBlur(event: FocusEvent): void;
    protected renderAppliedLabel(): TemplateResult;
    protected renderLoader(): TemplateResult;
    protected renderField(): TemplateResult;
    protected render(): TemplateResult;
    applyFocusElementLabel: (value?: string) => void;
    protected firstUpdated(changed: PropertyValues<this & {
        optionEls: MenuItem[];
    }>): void;
    private _returnItems;
    protected manageListOverlay(): Promise<void>;
    protected updated(changed: PropertyValues<this & {
        optionEls: MenuItem[];
        activeDescendant: MenuItem;
    }>): void;
    protected getUpdateComplete(): Promise<boolean>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private itemObserver;
}
