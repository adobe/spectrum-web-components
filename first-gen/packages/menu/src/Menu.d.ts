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
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { MenuItem } from './MenuItem.js';
import type { MenuItemKeydownEvent } from './MenuItem.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
export interface MenuChildItem {
    menuItem: MenuItem;
    managed: boolean;
    active: boolean;
    focusable: boolean;
    focusRoot: Menu;
}
declare const Menu_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * Spectrum Menu Component
 * @element sp-menu
 *
 * @slot - menu items to be listed in the menu
 * @fires change - Announces that the `value` of the element has changed
 * @attr selects - whether the element has a specific selection algorithm that it applies
 *   to its item descendants. `single` allows only one descendent to be selected at a time.
 *   `multiple` allows many descendants to be selected. `inherit` will be applied dynamically
 *   when an ancestor of this element is actively managing the selection of its descendents.
 *   When the `selects` attribute is not present a `value` will not be maintained and the Menu
 *   Item children of this Menu will not have their `selected` state managed.
 */
export declare class Menu extends Menu_base {
    static get styles(): CSSResultArray;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    private get isSubmenu();
    protected rovingTabindexController?: RovingTabindexController<MenuItem>;
    /**
     * label of the menu
     */
    label: string;
    /**
     * whether menu should be ignored by roving tabindex controller
     */
    ignore: boolean;
    /**
     * how the menu allows selection of its items:
     * - `undefined` (default): no selection is allowed
     * - `"inherit"`: the selection behavior is managed from an ancestor
     * - `"single"`: only one item can be selected at a time
     *  - `"multiple"`: multiple items can be selected
     */
    selects: undefined | 'inherit' | 'single' | 'multiple';
    /**
     * value of the selected item(s)
     */
    value: string;
    valueSeparator: string;
    /**
     * selected items values as string
     */
    get selected(): string[];
    set selected(selected: string[]);
    protected _selected: string[];
    /**
     * array of selected menu items
     */
    selectedItems: MenuItem[];
    menuSlot: HTMLSlotElement;
    private childItemSet;
    focusedItemIndex: number;
    focusInItemIndex: number;
    /**
     * Whether to support the pointerdown-drag-pointerup selection strategy.
     * Defaults to false to prevent click/touch events from being captured
     * behind the menu tray in mobile environments (since the menu closes
     * immediately on pointerup).
     */
    shouldSupportDragAndSelect: boolean;
    get focusInItem(): MenuItem | undefined;
    protected get controlsRovingTabindex(): boolean;
    private selectedItemsMap;
    /**
     * child items managed by menu
     */
    get childItems(): MenuItem[];
    private cachedChildItems;
    private updateCachedMenuItems;
    /**
     * Hide this getter from web-component-analyzer until
     * https://github.com/runem/web-component-analyzer/issues/131
     * has been addressed.
     *
     * @private
     */
    get childRole(): string;
    protected get ownRole(): string;
    /**
     * menuitem role based on selection type
     */
    private resolvedSelects?;
    /**
     * menu role based on selection type
     */
    private resolvedRole?;
    /**
     * When a descendant `<sp-menu-item>` element is added or updated it will dispatch
     * this event to announce its presence in the DOM. During the CAPTURE phase the first
     * Menu based element that the event encounters will manage the focus state of the
     * dispatching `<sp-menu-item>` element.
     * @param event
     */
    private onFocusableItemAddedOrUpdated;
    /**
     * When a descendant `<sp-menu-item>` element is added or updated it will dispatch
     * this event to announce its presence in the DOM. During the BUBBLE phase the first
     * Menu based element that the event encounters that does not inherit selection will
     * manage the selection state of the dispatching `<sp-menu-item>` element.
     * @param event
     */
    private onSelectableItemAddedOrUpdated;
    private addChildItem;
    private removeChildItem;
    constructor();
    /**
     * for picker elements, will set focus on first selected item
     */
    focusOnFirstSelectedItem({ preventScroll, }?: FocusOptions): void;
    focus({ preventScroll }?: FocusOptions): void;
    private pointerUpTarget;
    private handleFocusout;
    private handleClick;
    private handlePointerup;
    private handlePointerBasedSelection;
    private descendentOverlays;
    protected handleDescendentOverlayOpened(event: Event): void;
    protected handleDescendentOverlayClosed(event: Event): void;
    handleSubmenuClosed: (event: Event) => void;
    /**
     * given a menu item, returns the next focusable menu item before or after it;
     * if no menu item is provided, returns the first focusable menu item
     * @param menuItem {MenuItem}
     * @param before {boolean} return the item before; default is false
     * @returns {MenuItem}
     */
    getNeighboringFocusableElement(menuItem?: MenuItem, before?: boolean): MenuItem;
    handleSubmenuOpened: (event: Event) => void;
    selectOrToggleItem(targetItem: MenuItem): Promise<void>;
    protected navigateBetweenRelatedMenus(event: MenuItemKeydownEvent): void;
    handleKeydown(event: Event): void;
    private _hasUpdatedSelectedItemIndex;
    /**
     * on focus, removes focus from focus styling item, and updates the selected item index
     */
    private prepareToCleanUp;
    updateSelectedItemIndex(): void;
    private _willUpdateItems;
    private _updateFocus?;
    private handleItemsChanged;
    private updateCache;
    private updateItemFocus;
    closeDescendentOverlays(): void;
    private handleSlotchange;
    protected renderMenuItemSlot(): TemplateResult;
    render(): TemplateResult;
    protected firstUpdated(changed: PropertyValues): void;
    protected updated(changes: PropertyValues<this>): void;
    protected selectsChanged(): void;
    connectedCallback(): void;
    private isFocusableElement;
    disconnectedCallback(): void;
    protected childItemsUpdated: Promise<unknown[]>;
    protected cacheUpdated: Promise<void>;
    protected resolveCacheUpdated: () => void;
    protected getUpdateComplete(): Promise<boolean>;
}
export {};
