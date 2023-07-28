/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    CSSResultArray,
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';

import { MenuItem } from './MenuItem.js';
import type { MenuItemAddedOrUpdatedEvent } from './MenuItem.js';
import type { Overlay } from '@spectrum-web-components/overlay';
import menuStyles from './menu.css.js';

export interface MenuChildItem {
    menuItem: MenuItem;
    managed: boolean;
    active: boolean;
    focusable: boolean;
    focusRoot: Menu;
}

type SelectsType = 'none' | 'ignore' | 'inherit' | 'multiple' | 'single';
type RoleType = 'group' | 'menu' | 'listbox' | 'none';

function elementIsOrContains(
    el: Node,
    isOrContains: Node | undefined | null
): boolean {
    return !!isOrContains && (el === isOrContains || el.contains(isOrContains));
}

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
export class Menu extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [menuStyles];
    }

    private get isSubmenu(): boolean {
        return this.slot === 'submenu';
    }

    @property({ type: String, reflect: true })
    public label = '';

    @property({ type: Boolean, reflect: true })
    public ignore = false;

    @property({ type: String, reflect: true })
    public selects: undefined | 'inherit' | 'single' | 'multiple';

    @property({ type: String })
    public value = '';

    // For the multiple select case, we'll join the value strings together
    // for the value property with this separator
    @property({ type: String, attribute: 'value-separator' })
    public valueSeparator = ',';

    // TODO: which of these to keep?
    // TODO: allow setting this in the API to change the values
    @property({ attribute: false })
    public selected = [] as string[];

    @property({ attribute: false })
    public selectedItems = [] as MenuItem[];

    @query('slot:not([name])')
    public menuSlot!: HTMLSlotElement;

    private childItemSet = new Set<MenuItem>();
    public focusedItemIndex = 0;
    public focusInItemIndex = 0;

    private selectedItemsMap = new Map() as Map<MenuItem, boolean>;

    public get childItems(): MenuItem[] {
        if (!this.cachedChildItems) {
            this.cachedChildItems = this.updateCachedMenuItems();
        }
        return this.cachedChildItems;
    }

    private cachedChildItems: MenuItem[] | undefined;

    private updateCachedMenuItems(): MenuItem[] {
        this.cachedChildItems = [];

        const slotElements = this.menuSlot
            ? this.menuSlot.assignedElements({ flatten: true })
            : [];
        for (const slotElement of slotElements) {
            const childMenuItems: MenuItem[] =
                slotElement instanceof MenuItem
                    ? [slotElement as MenuItem]
                    : ([...slotElement.querySelectorAll(`*`)] as MenuItem[]);

            for (const childMenuItem of childMenuItems) {
                if (this.childItemSet.has(childMenuItem)) {
                    this.cachedChildItems.push(childMenuItem);
                }
            }
        }

        return this.cachedChildItems;
    }

    /**
     * Hide this getter from web-component-analyzer until
     * https://github.com/runem/web-component-analyzer/issues/131
     * has been addressed.
     *
     * @private
     */
    public get childRole(): string {
        if (this.resolvedRole === 'listbox') {
            return 'option';
        }
        switch (this.resolvedSelects) {
            case 'single':
                return 'menuitemradio';
            case 'multiple':
                return 'menuitemcheckbox';
            default:
                return 'menuitem';
        }
    }

    protected get ownRole(): string {
        return 'menu';
    }

    private resolvedSelects?: SelectsType;
    private resolvedRole?: RoleType;

    /**
     * When a descendant `<sp-menu-item>` element is added or updated it will dispatch
     * this event to announce its presence in the DOM. During the CAPTURE phase the first
     * Menu based element that the event encounters will manage the focus state of the
     * dispatching `<sp-menu-item>` element.
     * @param event
     */
    private onFocusableItemAddedOrUpdated(
        event: MenuItemAddedOrUpdatedEvent
    ): void {
        event.menuCascade.set(this, {
            hadFocusRoot: !!event.item.menuData.focusRoot,
            ancestorWithSelects: event.currentAncestorWithSelects,
        });
        if (this.selects) {
            event.currentAncestorWithSelects = this;
        }
        event.item.menuData.focusRoot = event.item.menuData.focusRoot || this;
    }

    /**
     * When a descendant `<sp-menu-item>` element is added or updated it will dispatch
     * this event to announce its presence in the DOM. During the BUBBLE phase the first
     * Menu based element that the event encounters that does not inherit selection will
     * manage the selection state of the dispatching `<sp-menu-item>` element.
     * @param event
     */
    private onSelectableItemAddedOrUpdated(
        event: MenuItemAddedOrUpdatedEvent
    ): void {
        const cascadeData = event.menuCascade.get(this);
        if (!cascadeData) return;

        event.item.menuData.parentMenu = event.item.menuData.parentMenu || this;
        if (cascadeData.hadFocusRoot && !this.ignore) {
            // Only have one tab stop per Menu tree
            this.tabIndex = -1;
        }
        this.addChildItem(event.item);

        if (this.selects === 'inherit') {
            this.resolvedSelects = 'inherit';
            const ignoreMenu = event.currentAncestorWithSelects?.ignore;
            this.resolvedRole = ignoreMenu
                ? 'none'
                : ((event.currentAncestorWithSelects?.getAttribute('role') ||
                      this.getAttribute('role') ||
                      undefined) as RoleType);
        } else if (this.selects) {
            this.resolvedRole = this.ignore
                ? 'none'
                : ((this.getAttribute('role') || undefined) as RoleType);
            this.resolvedSelects = this.selects;
        } else {
            this.resolvedRole = this.ignore
                ? 'none'
                : ((this.getAttribute('role') || undefined) as RoleType);
            this.resolvedSelects =
                this.resolvedRole === 'none' ? 'ignore' : 'none';
        }

        const selects =
            this.resolvedSelects === 'single' ||
            this.resolvedSelects === 'multiple';
        event.item.menuData.cleanupSteps.push((item: MenuItem) =>
            this.removeChildItem(item)
        );
        if (
            (selects || (!this.selects && this.resolvedSelects !== 'ignore')) &&
            !event.item.menuData.selectionRoot
        ) {
            event.item.setRole(this.childRole);
            event.item.menuData.selectionRoot =
                event.item.menuData.selectionRoot || this;
            if (event.item.selected) {
                this.selectedItemsMap.set(event.item, true);
                this.selectedItems = [...this.selectedItems, event.item];
                this.selected = [...this.selected, event.item.value];
                this.value = this.selected.join(this.valueSeparator);
            }
        }
    }

    private addChildItem(item: MenuItem): void {
        this.childItemSet.add(item);
        this.handleItemsChanged();
    }

    private async removeChildItem(item: MenuItem): Promise<void> {
        this.childItemSet.delete(item);
        this.cachedChildItems = undefined;
        if (item.focused) {
            this.handleItemsChanged();
            await this.updateComplete;
            this.focus();
        }
    }

    public constructor() {
        super();

        this.addEventListener(
            'sp-menu-item-added-or-updated',
            this.onSelectableItemAddedOrUpdated
        );
        this.addEventListener(
            'sp-menu-item-added-or-updated',
            this.onFocusableItemAddedOrUpdated,
            {
                capture: true,
            }
        );

        this.addEventListener('click', this.handleClick);
        this.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
        this.addEventListener('sp-opened', this.handleSubmenuOpened);
        this.addEventListener('sp-closed', this.handleSubmenuClosed);
    }

    public override focus({ preventScroll }: FocusOptions = {}): void {
        if (
            !this.childItems.length ||
            this.childItems.every((childItem) => childItem.disabled)
        ) {
            return;
        }
        if (
            this.childItems.some(
                (childItem) => childItem.menuData.focusRoot !== this
            )
        ) {
            super.focus({ preventScroll });
            return;
        }
        this.focusMenuItemByOffset(0);
        super.focus({ preventScroll });
        const selectedItem = this.selectedItems[0];
        if (selectedItem && !preventScroll) {
            selectedItem.scrollIntoView({ block: 'nearest' });
        }
    }

    private handleClick(event: Event): void {
        if (event.defaultPrevented) {
            return;
        }
        const path = event.composedPath();
        const target = path.find((el) => {
            /* c8 ignore next 3 */
            if (!(el instanceof Element)) {
                return false;
            }
            return el.getAttribute('role') === this.childRole;
        }) as MenuItem;
        if (target?.href && target.href.length) {
            // This event will NOT ALLOW CANCELATION as link action
            // cancelation should occur on the `<sp-menu-item>` itself.
            this.dispatchEvent(
                new Event('change', {
                    bubbles: true,
                    composed: true,
                })
            );
            return;
        } else if (
            target?.menuData.selectionRoot === this &&
            this.childItems.length
        ) {
            event.preventDefault();
            if (target.hasSubmenu || target.open) {
                return;
            }
            this.selectOrToggleItem(target);
        } else {
            return;
        }
        this.prepareToCleanUp();
    }

    public handleFocusin(event: FocusEvent): void {
        const wasOrContainedRelatedTarget = elementIsOrContains(
            this,
            event.relatedTarget as Node
        );
        if (
            this.childItems.some(
                (childItem) => childItem.menuData.focusRoot !== this
            )
        ) {
            return;
        }
        const activeElement = (this.getRootNode() as Document).activeElement as
            | MenuItem
            | Menu;
        const selectionRoot =
            this.childItems[this.focusedItemIndex]?.menuData.selectionRoot ||
            this;
        if (
            activeElement !== selectionRoot ||
            (!wasOrContainedRelatedTarget && event.target !== this)
        ) {
            selectionRoot.focus({ preventScroll: true });
            if (activeElement && this.focusedItemIndex === 0) {
                const offset = this.childItems.findIndex(
                    (childItem) => childItem === activeElement
                );
                if (offset > 0) {
                    this.focusMenuItemByOffset(offset);
                }
            }
        }
        this.startListeningToKeyboard();
    }

    public startListeningToKeyboard(): void {
        this.addEventListener('keydown', this.handleKeydown);
    }

    public handleFocusout(event: FocusEvent): void {
        if (elementIsOrContains(this, event.relatedTarget as Node)) {
            return;
        }
        this.stopListeningToKeyboard();
        this.childItems.forEach((child) => (child.focused = false));
        this.removeAttribute('aria-activedescendant');
    }

    public stopListeningToKeyboard(): void {
        this.removeEventListener('keydown', this.handleKeydown);
    }

    private descendentOverlays = new Map<Overlay, Overlay>();

    protected handleDescendentOverlayOpened(event: Event): void {
        const target = event.composedPath()[0] as MenuItem;
        if (!target.overlayElement) return;
        this.descendentOverlays.set(
            target.overlayElement,
            target.overlayElement
        );
    }

    protected handleDescendentOverlayClosed(event: Event): void {
        const target = event.composedPath()[0] as MenuItem;
        if (!target.overlayElement) return;
        this.descendentOverlays.delete(target.overlayElement);
    }

    public handleSubmenuClosed = (event: Event): void => {
        event.stopPropagation();
        const target = event.composedPath()[0] as Overlay;
        target.dispatchEvent(
            new Event('sp-menu-submenu-closed', {
                bubbles: true,
                composed: true,
            })
        );
    };

    public handleSubmenuOpened = (event: Event): void => {
        event.stopPropagation();
        const target = event.composedPath()[0] as Overlay;
        target.dispatchEvent(
            new Event('sp-menu-submenu-opened', {
                bubbles: true,
                composed: true,
            })
        );
        const focusedItem = this.childItems[this.focusedItemIndex];
        if (focusedItem) {
            focusedItem.focused = false;
        }
        const openedItem = event
            .composedPath()
            .find((el) => this.childItemSet.has(el as MenuItem));
        if (!openedItem) return;
        const openedItemIndex = this.childItems.indexOf(openedItem as MenuItem);
        this.focusedItemIndex = openedItemIndex;
        this.focusInItemIndex = openedItemIndex;
    };

    public async selectOrToggleItem(targetItem: MenuItem): Promise<void> {
        const resolvedSelects = this.resolvedSelects;
        const oldSelectedItemsMap = new Map(this.selectedItemsMap);
        const oldSelected = this.selected.slice();
        const oldSelectedItems = this.selectedItems.slice();
        const oldValue = this.value;
        this.childItems[this.focusedItemIndex].focused = false;
        this.childItems[this.focusedItemIndex].active = false;
        this.focusedItemIndex = this.childItems.indexOf(targetItem);
        this.forwardFocusVisibleToItem(targetItem);

        if (resolvedSelects === 'multiple') {
            if (this.selectedItemsMap.has(targetItem)) {
                this.selectedItemsMap.delete(targetItem);
            } else {
                this.selectedItemsMap.set(targetItem, true);
            }

            // Match HTML select and set the first selected
            // item as the value. Also set the selected array
            // in the order of the menu items.
            const selected: string[] = [];
            const selectedItems: MenuItem[] = [];

            this.childItemSet.forEach((childItem) => {
                if (childItem.menuData.selectionRoot !== this) return;

                if (this.selectedItemsMap.has(childItem)) {
                    selected.push(childItem.value);
                    selectedItems.push(childItem);
                }
            });
            this.selected = selected;
            this.selectedItems = selectedItems;
            this.value = this.selected.join(this.valueSeparator);
        } else {
            this.selectedItemsMap.clear();
            this.selectedItemsMap.set(targetItem, true);
            this.value = targetItem.value;
            this.selected = [targetItem.value];
            this.selectedItems = [targetItem];
        }

        await this.updateComplete;
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );
        if (!applyDefault) {
            // Cancel the event & don't apply the selection
            this.selected = oldSelected;
            this.selectedItems = oldSelectedItems;
            this.selectedItemsMap = oldSelectedItemsMap;
            this.value = oldValue;
            return;
        }
        // Apply the selection changes to the menu items
        if (resolvedSelects === 'single') {
            for (const oldItem of oldSelectedItemsMap.keys()) {
                if (oldItem !== targetItem) {
                    oldItem.selected = false;
                }
            }
            targetItem.selected = true;
        } else if (resolvedSelects === 'multiple') {
            targetItem.selected = !targetItem.selected;
        }
    }

    protected navigateWithinMenu(event: KeyboardEvent): void {
        const { code } = event;
        const lastFocusedItem = this.childItems[this.focusedItemIndex];
        const direction = code === 'ArrowDown' ? 1 : -1;
        const itemToFocus = this.focusMenuItemByOffset(direction);
        if (itemToFocus === lastFocusedItem) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        itemToFocus.scrollIntoView({ block: 'nearest' });
    }

    protected navigateBetweenRelatedMenus(event: KeyboardEvent): void {
        const { code } = event;
        const shouldOpenSubmenu =
            (this.isLTR && code === 'ArrowRight') ||
            (!this.isLTR && code === 'ArrowLeft');
        const shouldCloseSelfAsSubmenu =
            (this.isLTR && code === 'ArrowLeft') ||
            (!this.isLTR && code === 'ArrowRight');
        if (shouldOpenSubmenu) {
            event.stopPropagation();
            const lastFocusedItem = this.childItems[this.focusedItemIndex];
            if (lastFocusedItem?.hasSubmenu) {
                // Remove focus while opening overlay from keyboard or the visible focus
                // will slip back to the first item in the menu.
                // this.blur();
                lastFocusedItem.openOverlay();
            }
        } else if (shouldCloseSelfAsSubmenu && this.isSubmenu) {
            event.stopPropagation();
            this.dispatchEvent(new Event('close', { bubbles: true }));
            this.updateSelectedItemIndex();
        }
    }

    public handleKeydown(event: KeyboardEvent): void {
        if (
            event.target !== this &&
            this !== (event.target as HTMLElement).parentElement
        ) {
            return;
        }
        const { code } = event;
        if (code === 'Tab') {
            this.prepareToCleanUp();
            return;
        }
        if (code === 'Space') {
            const lastFocusedItem = this.childItems[this.focusedItemIndex];
            if (lastFocusedItem?.hasSubmenu) {
                // Remove focus while opening overlay from keyboard or the visible focus
                // will slip back to the first item in the menu.
                // this.blur();
                lastFocusedItem.openOverlay();
                return;
            }
        }
        if (code === 'Space' || code === 'Enter') {
            this.childItems[this.focusedItemIndex]?.click();
            return;
        }
        if (code === 'ArrowDown' || code === 'ArrowUp') {
            this.navigateWithinMenu(event);
            return;
        }
        this.navigateBetweenRelatedMenus(event);
    }

    public focusMenuItemByOffset(offset: number): MenuItem {
        const step = offset || 1;
        const focusedItem = this.childItems[this.focusedItemIndex];
        if (focusedItem) {
            focusedItem.focused = false;
            focusedItem.active = false;
        }
        this.focusedItemIndex =
            (this.childItems.length + this.focusedItemIndex + offset) %
            this.childItems.length;
        let itemToFocus = this.childItems[this.focusedItemIndex];
        let availableItems = this.childItems.length;
        // cycle through the available items in the directions of the offset to find the next non-disabled item
        while (itemToFocus.disabled && availableItems) {
            availableItems -= 1;
            this.focusedItemIndex =
                (this.childItems.length + this.focusedItemIndex + step) %
                this.childItems.length;
            itemToFocus = this.childItems[this.focusedItemIndex];
        }
        // if there are no non-disabled items, skip the work to focus a child
        if (!itemToFocus?.disabled) {
            this.forwardFocusVisibleToItem(itemToFocus);
        }
        return itemToFocus;
    }

    private prepareToCleanUp(): void {
        document.addEventListener(
            'focusout',
            () => {
                requestAnimationFrame(() => {
                    const focusedItem = this.childItems[this.focusedItemIndex];
                    if (focusedItem) {
                        focusedItem.focused = false;
                        this.updateSelectedItemIndex();
                    }
                });
            },
            { once: true }
        );
    }

    private _hasUpdatedSelectedItemIndex = false;

    public updateSelectedItemIndex(): void {
        let firstOrFirstSelectedIndex = 0;
        const selectedItemsMap = new Map<MenuItem, boolean>();
        const selected: string[] = [];
        const selectedItems: MenuItem[] = [];
        let itemIndex = this.childItems.length;
        while (itemIndex) {
            itemIndex -= 1;
            const childItem = this.childItems[itemIndex];
            if (childItem.menuData.selectionRoot === this) {
                if (
                    childItem.selected ||
                    (!this._hasUpdatedSelectedItemIndex &&
                        this.selected.includes(childItem.value))
                ) {
                    firstOrFirstSelectedIndex = itemIndex;
                    selectedItemsMap.set(childItem, true);
                    selected.unshift(childItem.value);
                    selectedItems.unshift(childItem);
                }
                // Remove "focused" from non-"selected" items ONLY
                // Preserve "focused" on index===0 when no selection
                if (itemIndex !== firstOrFirstSelectedIndex) {
                    childItem.focused = false;
                }
            }
        }
        selectedItems.map((item, i) => {
            // When there is more than one "selected" item,
            // ensure only the first one can be "focused"
            if (i > 0) {
                item.focused = false;
            }
        });
        this.selectedItemsMap = selectedItemsMap;
        this.selected = selected;
        this.selectedItems = selectedItems;
        this.value = this.selected.join(this.valueSeparator);
        this.focusedItemIndex = firstOrFirstSelectedIndex;
        this.focusInItemIndex = firstOrFirstSelectedIndex;
    }

    private _willUpdateItems = false;

    private handleItemsChanged(): void {
        this.cachedChildItems = undefined;
        if (!this._willUpdateItems) {
            this._willUpdateItems = true;
            this.cacheUpdated = this.updateCache();
        }
    }

    private async updateCache(): Promise<void> {
        await new Promise((res) => requestAnimationFrame(() => res(true)));
        if (this.cachedChildItems === undefined) {
            this.updateSelectedItemIndex();
            this.updateItemFocus();
        }
        this._willUpdateItems = false;
    }

    private updateItemFocus(): void {
        if (this.childItems.length == 0) {
            return;
        }
        const focusInItem = this.childItems[this.focusInItemIndex];
        if (
            (this.getRootNode() as Document).activeElement ===
            focusInItem.menuData.focusRoot
        ) {
            this.forwardFocusVisibleToItem(focusInItem);
        }
    }

    public closeDescendentOverlays(): void {
        this.descendentOverlays.forEach((overlay) => {
            overlay.open = false;
        });
        this.descendentOverlays = new Map<Overlay, Overlay>();
    }

    private forwardFocusVisibleToItem(item: MenuItem): void {
        if (item.menuData.focusRoot !== this) {
            return;
        }
        this.closeDescendentOverlays();
        const focused =
            this.hasVisibleFocusInTree() ||
            !!this.childItems.find((child) => {
                return child.hasVisibleFocusInTree();
            });
        item.focused = focused;
        this.setAttribute('aria-activedescendant', item.id);
        if (
            item.menuData.selectionRoot &&
            item.menuData.selectionRoot !== this
        ) {
            item.menuData.selectionRoot.focus();
        }
    }

    private handleSlotchange({
        target,
    }: Event & { target: HTMLSlotElement }): void {
        const assignedElement = target.assignedElements({
            flatten: true,
        }) as MenuItem[];
        if (this.childItems.length !== assignedElement.length) {
            assignedElement.forEach((item) => {
                if (typeof item.triggerUpdate !== 'undefined') {
                    item.triggerUpdate();
                }
            });
        }
    }

    protected renderMenuItemSlot(): TemplateResult {
        return html`
            <slot
                @sp-menu-submenu-opened=${this.handleDescendentOverlayOpened}
                @sp-menu-submenu-closed=${this.handleDescendentOverlayClosed}
                @slotchange=${this.handleSlotchange}
            ></slot>
        `;
    }

    public override render(): TemplateResult {
        return this.renderMenuItemSlot();
    }

    protected override firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        if (!this.hasAttribute('tabindex') && !this.ignore) {
            const role = this.getAttribute('role');
            if (role === 'group') {
                this.tabIndex = -1;
            } else {
                this.tabIndex = 0;
            }
        }
        const updates: Promise<unknown>[] = [
            new Promise((res) => requestAnimationFrame(() => res(true))),
        ];
        [...this.children].forEach((item) => {
            if ((item as MenuItem).localName === 'sp-menu-item') {
                updates.push((item as MenuItem).updateComplete);
            }
        });
        this.childItemsUpdated = Promise.all(updates);
    }

    protected override updated(changes: PropertyValues<this>): void {
        super.updated(changes);
        if (changes.has('selects') && this.hasUpdated) {
            this.selectsChanged();
        }
        if (
            changes.has('label') &&
            (this.label || typeof changes.get('label') !== 'undefined')
        ) {
            if (this.label) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }
    }

    protected selectsChanged(): void {
        const updates: Promise<unknown>[] = [
            new Promise((res) => requestAnimationFrame(() => res(true))),
        ];
        this.childItemSet.forEach((childItem) => {
            updates.push(childItem.triggerUpdate());
        });
        this.childItemsUpdated = Promise.all(updates);
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        if (!this.hasAttribute('role') && !this.ignore) {
            this.setAttribute('role', this.ownRole);
        }
        this.updateComplete.then(() => this.updateItemFocus());
    }
    public override disconnectedCallback(): void {
        this.cachedChildItems = undefined;
        super.disconnectedCallback();
    }

    protected childItemsUpdated!: Promise<unknown[]>;
    protected cacheUpdated = Promise.resolve();
    /* c8 ignore next 3 */
    protected resolveCacheUpdated = (): void => {
        return;
    };

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        await this.childItemsUpdated;
        await this.cacheUpdated;
        return complete;
    }
}
