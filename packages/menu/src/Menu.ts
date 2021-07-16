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
    html,
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
    query,
} from '@spectrum-web-components/base';

import { MenuItem, MenuItemUpdateEvent } from './MenuItem.js';
import menuStyles from './menu.css.js';

export interface MenuChildItem {
    menuItem: MenuItem;
    managed: boolean;
    active: boolean;
    focusable: boolean;
    focusRoot: Menu;
}

/**
 * Spectrum Menu Component
 * @element sp-menu
 * @fires change - Announces that the `value` of the element has changed
 * @attr selects - whether the element has a specific selection algorithm that it applies
 *   to its item descendants. `single` allows only one descendent to be selected at a time.
 *   `multiple` allows many descendants to be selected. `inherit` will be applied dynamically
 *   when an ancestor of this element is actively managing the selection of its descendents.
 */
export class Menu extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [menuStyles];
    }

    @property({ type: String, reflect: true })
    public label = '';

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
    private menuSlot!: HTMLSlotElement;

    public get childItems(): MenuChildItem[] {
        if (this.cachedChildItems !== undefined) {
            return this.cachedChildItems;
        } else {
            this.updateCachedMenuItems();
            return this.cachedChildItems || [];
        }
    }

    private childItemMap = new Map() as Map<MenuItem, MenuChildItem>;
    public focusedItemIndex = 0;
    public focusInItemIndex = 0;

    private selectedItemsMap = new Map() as Map<MenuItem, boolean>;

    private cachedResolvedSelects:
        | undefined
        | [string | undefined, string | null];
    private parentSelectsObservers: MutationObserver[] = [];

    private cachedChildItems: undefined | MenuChildItem[] = [];

    /**
     * Hide this getter from web-component-analyzer until
     * https://github.com/runem/web-component-analyzer/issues/131
     * has been addressed.
     *
     * @private
     */
    public get childRole(): string {
        const [selects, role] = this.resolvedSelectsAndRole;
        if (role === 'listbox') {
            return 'option';
        }
        switch (selects) {
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

    private get resolvedSelects(): undefined | string {
        return this.resolvedSelectsAndRole[0];
    }

    private clearParentSelectsObservers(): void {
        for (const observer of this.parentSelectsObservers) {
            observer.disconnect();
        }
        this.parentSelectsObservers = [];
    }

    private addParentSelectsObserver(parentMenu: HTMLElement): void {
        const observer = new MutationObserver((mutationList) => {
            for (const mutation of mutationList) {
                if (mutation.attributeName === 'selects') {
                    for (const child of this.childItems) {
                        child.menuItem.triggerUpdate();
                    }
                    this.cachedResolvedSelects = undefined;
                    this.clearParentSelectsObservers();
                    return;
                }
            }
        });
        observer.observe(parentMenu, { attributes: true });
        this.parentSelectsObservers.push(observer);
    }

    private get resolvedSelectsAndRole(): [string | undefined, string | null] {
        if (this.cachedResolvedSelects) {
            return this.cachedResolvedSelects;
        }
        let selects = 'none';
        let role = this.getAttribute('role');
        if (role === 'none') {
            // This menu is not part of the accessibility tree, it is
            // likely a child of an <sp-menu-group> and should not
            // effect the selection process of descendents
            selects = 'ignore';
        } else if (this.selects === 'inherit') {
            let parent = this.parentElement;
            if (parent == null) {
                const shadowRoot = this.getRootNode() as ShadowRoot;
                parent = shadowRoot?.host as HTMLElement;
            }
            // Search all parents in the same tree until a role is resolved
            // or there are no more parents.
            while (parent != null && !role) {
                if (
                    parent instanceof Menu ||
                    parent.localName == 'sp-menu-group'
                ) {
                    this.addParentSelectsObserver(parent);
                    const parentSelects = parent.getAttribute('selects');
                    if (!!parentSelects && parentSelects !== 'inheirt') {
                        selects = 'inherits';
                        role = parent.getAttribute('role') || role;
                    }
                }
                parent = parent.parentElement;
            }
        } else if (this.selects) {
            selects = this.selects;
        }
        this.cachedResolvedSelects = [selects, role];
        return this.cachedResolvedSelects;
    }

    private onItemAddedFocusable(
        event: CustomEvent<MenuItemUpdateEvent>
    ): void {
        this.applyChildItemConfiguration({
            menuItem: event.detail.item,
            focusable: event.detail.focusable,
        });
        event.detail.focusable = false;
    }

    private onItemAddedSelectable(
        event: CustomEvent<MenuItemUpdateEvent>
    ): void {
        const { item } = event.detail;
        const selects =
            this.resolvedSelects === 'single' ||
            this.resolvedSelects === 'multiple';
        let managed = selects;
        if (event.detail.owned || this.resolvedSelects === 'ignore') {
            managed = false;
        } else if (selects || !this.selects) {
            item.setRole(this.childRole);
            event.detail.owned = true;
            event.detail.focusRoot = selects ? this : undefined;
        }
        this.applyChildItemConfiguration({
            menuItem: item,
            managed: managed,
            active: false,
            focusRoot: event.detail.focusRoot,
        });
    }

    private applyChildItemConfiguration(item: Partial<MenuChildItem>): void {
        const menuItem = item.menuItem as MenuItem;
        if (this.childItemMap.has(menuItem)) {
            const menuChildItem = {
                ...this.childItemMap.get(menuItem),
                ...item,
            } as MenuChildItem;
            this.childItemMap.set(menuItem, menuChildItem);
        } else {
            this.childItemMap.set(menuItem, item as MenuChildItem);
        }
        this.handleItemsChanged();
    }

    private removeChildItem(event: CustomEvent<MenuItemUpdateEvent>): void {
        this.childItemMap.delete(event.detail.item);
        this.cachedChildItems = undefined;
    }

    public constructor() {
        super();

        this.addEventListener('sp-menu-item-added', this.onItemAddedSelectable);
        this.addEventListener(
            'sp-menu-item-update',
            this.onItemAddedSelectable
        );

        this.addEventListener('sp-menu-item-added', this.onItemAddedFocusable, {
            capture: true,
        });
        this.addEventListener(
            'sp-menu-item-update',
            this.onItemAddedFocusable,
            { capture: true }
        );

        this.addEventListener('sp-menu-item-removed', this.removeChildItem);
        this.addEventListener('click', this.onClick);
        this.addEventListener('focusin', this.startListeningToKeyboard);
    }

    public focus({ preventScroll }: FocusOptions = {}): void {
        if (
            !this.childItems.length ||
            this.childItems.every((childItem) => childItem.menuItem.disabled)
        ) {
            return;
        }
        if (this.childItems.some((childItem) => !childItem.focusable)) {
            super.focus({ preventScroll });
            return;
        }
        this.focusMenuItemByOffset(0);
        super.focus({ preventScroll });
        const selectedItem = this.querySelector('[selected]');
        if (selectedItem && !preventScroll) {
            selectedItem.scrollIntoView({ block: 'nearest' });
        }
    }

    private onClick(event: Event): void {
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
        const childItem = this.childItemMap.get(target);
        if (childItem?.managed && this.selects) {
            event.preventDefault();
            this.selectOrToggleItem(target);
        } else {
            return;
        }
        this.prepareToCleanUp();
    }

    public startListeningToKeyboard(): void {
        if (this.childItems.some((childItem) => !childItem.focusable)) {
            return;
        }
        const activeElement = (this.getRootNode() as Document).activeElement as
            | MenuItem
            | Menu;
        const focusRoot =
            this.childItems[this.focusedItemIndex]?.focusRoot || this;
        if (activeElement !== focusRoot) {
            focusRoot.focus({ preventScroll: true });
            if (activeElement && this.focusedItemIndex === 0) {
                const offset = this.childItems.findIndex(
                    (childItem) => childItem.menuItem === activeElement
                );
                if (offset > 0) {
                    this.focusMenuItemByOffset(offset);
                }
            }
        }
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('focusout', this.handleFocusout);
    }

    public handleFocusout(event: FocusEvent): void {
        this.stopListeningToKeyboard();
        if (
            event.target === this &&
            this.childItems.some((childItem) => childItem.focusable)
        ) {
            const focusedItem = this.childItems[this.focusedItemIndex];
            if (focusedItem) {
                focusedItem.menuItem.focused = false;
            }
        }
    }

    public stopListeningToKeyboard(): void {
        this.removeEventListener('keydown', this.handleKeydown);
    }

    public async selectOrToggleItem(targetItem: MenuItem): Promise<void> {
        const resolvedSelects = this.resolvedSelects;
        if (resolvedSelects === 'none') {
            return;
        }

        const oldSelectedItemsMap = new Map(this.selectedItemsMap);
        const oldSelected = this.selected.slice();
        const oldSelectedItems = this.selectedItems.slice();
        const oldValue = this.value;

        if (resolvedSelects === 'single') {
            this.selectedItemsMap.clear();
            this.selectedItemsMap.set(targetItem, true);
            this.value = targetItem.value;
            this.selected = [targetItem.value];
            this.selectedItems = [targetItem];
        } else {
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

            for (const childItem of this.childItems) {
                if (!childItem.managed) continue;

                if (this.selectedItemsMap.has(childItem.menuItem)) {
                    const item = childItem.menuItem;
                    selected.push(item.value);
                    selectedItems.push(item);
                }
            }
            this.selected = selected;
            this.selectedItems = selectedItems;
            this.value = this.selected.join(this.valueSeparator);
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

    public handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        if (code === 'Tab') {
            this.prepareToCleanUp();
            return;
        }
        if (code === 'Space' || code === 'Enter') {
            this.childItems[this.focusedItemIndex]?.menuItem.click();
            return;
        }
        if (code !== 'ArrowDown' && code !== 'ArrowUp') {
            return;
        }
        const lastFocusedItem = this.childItems[this.focusedItemIndex];
        const direction = code === 'ArrowDown' ? 1 : -1;
        const itemToFocus = this.focusMenuItemByOffset(direction);
        if (itemToFocus === lastFocusedItem) {
            return;
        }
        event.preventDefault();
        itemToFocus.menuItem.scrollIntoView({ block: 'nearest' });
    }

    public focusMenuItemByOffset(offset: number): MenuChildItem {
        const step = offset || 1;
        const focusedItem = this.childItems[this.focusedItemIndex];
        focusedItem.menuItem.focused = false;
        this.focusedItemIndex =
            (this.childItems.length + this.focusedItemIndex + offset) %
            this.childItems.length;
        let itemToFocus = this.childItems[this.focusedItemIndex];
        let availableItems = this.childItems.length;
        // cycle through the available items in the directions of the offset to find the next non-disabled item
        while (itemToFocus.menuItem.disabled && availableItems) {
            availableItems -= 1;
            this.focusedItemIndex =
                (this.childItems.length + this.focusedItemIndex + step) %
                this.childItems.length;
            itemToFocus = this.childItems[this.focusedItemIndex];
        }
        // if there are no non-disabled items, skip the work to focus a child
        if (!itemToFocus?.menuItem.disabled) {
            this.forwardFocusVisibleToItem(itemToFocus);
        }
        return itemToFocus;
    }

    private prepareToCleanUp(): void {
        document.addEventListener(
            'focusout',
            () => {
                requestAnimationFrame(() => {
                    const focusedItem = this.childItems[this.focusedItemIndex]
                        ?.menuItem;
                    if (focusedItem) {
                        focusedItem.focused = false;
                        this.updateSelectedItemIndex();
                    }
                });
            },
            { once: true }
        );
    }

    public updateSelectedItemIndex(): void {
        let index = this.childItems.length - 1;
        let item = this.childItems[index]?.menuItem;
        while (index && item && !item.selected) {
            index -= 1;
            item = this.childItems[index].menuItem;
        }
        index = Math.max(index, 0);
        const selectedItemsMap = new Map<MenuItem, boolean>();
        const selected: string[] = [];
        const selectedItems: MenuItem[] = [];
        this.childItems.forEach((childItem, i) => {
            if (!childItem.managed) return;

            const menuItem = childItem.menuItem;
            if (menuItem.selected) {
                selectedItemsMap.set(menuItem, true);
                selected.push(menuItem.value);
                selectedItems.push(menuItem);
            }
            if (i !== index) {
                item.focused = false;
            }
        });
        this.selectedItemsMap = selectedItemsMap;
        this.selected = selected;
        this.selectedItems = selectedItems;
        this.value = this.selected.join(this.valueSeparator);
        this.focusedItemIndex = index;
        this.focusInItemIndex = index;
    }

    // debounce update this.menuItems so they're in DOM order
    private updateCachedMenuItems(): void {
        this.cachedChildItems = [];

        const slotElements =
            this.menuSlot.assignedElements({ flatten: true }) || [];
        for (const slotElement of slotElements) {
            const childMenuItems: MenuItem[] =
                slotElement instanceof MenuItem
                    ? [slotElement as MenuItem]
                    : ([...slotElement.querySelectorAll(`*`)] as MenuItem[]);

            for (const childMenuItem of childMenuItems) {
                if (this.childItemMap.has(childMenuItem)) {
                    this.cachedChildItems.push(
                        this.childItemMap.get(childMenuItem) as MenuChildItem
                    );
                }
            }
        }
    }

    private _willUpdateItems = false;

    private handleItemsChanged(): void {
        this.cachedChildItems = undefined;
        if (!this._willUpdateItems) {
            let resolve = (): void => {
                return;
            };
            this.cacheUpdated = new Promise((res) => (resolve = res));
            this._willUpdateItems = true;
            // Debounce the update so we only update once
            // if multiple items have changed
            window.requestAnimationFrame(() => {
                if (this.cachedChildItems === undefined) {
                    this.updateSelectedItemIndex();
                    this.updateItemFocus();
                }
                this._willUpdateItems = false;
                resolve();
            });
        }
    }

    private updateItemFocus(): void {
        if (this.childItems.length == 0) {
            return;
        }
        const focusInItem = this.childItems[this.focusInItemIndex];
        if (
            (this.getRootNode() as Document).activeElement ===
            focusInItem.focusRoot
        ) {
            this.forwardFocusVisibleToItem(focusInItem);
        }
    }

    private forwardFocusVisibleToItem(item: MenuChildItem): void {
        const activeElement = (this.getRootNode() as Document).activeElement as
            | MenuItem
            | Menu;
        if (!item.focusable) {
            return;
        }
        let shouldFocus = false;
        try {
            // Browsers without support for the `:focus-visible`
            // selector will throw on the following test (Safari, older things).
            // Some won't throw, but will be focusing item rather than the menu and
            // will rely on the polyfill to know whether focus is "visible" or not.
            shouldFocus =
                activeElement.matches(':focus-visible') ||
                activeElement.matches('.focus-visible');
        } catch (error) {
            shouldFocus = activeElement.matches('.focus-visible');
        }
        item.menuItem.focused = shouldFocus;
        if (item.focusRoot) {
            if (item.focusRoot !== this) {
                item.focusRoot.focus();
            }
        }
    }

    public render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    private _notFirstUpdated = false;

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        const role = this.getAttribute('role');
        if (role === 'group') {
            this.tabIndex = -1;
        } else if (role !== 'none') {
            this.tabIndex = 0;
        }
        const updates: Promise<unknown>[] = [
            new Promise((res) => requestAnimationFrame(() => res(true))),
        ];
        [...this.children].forEach((item) => {
            if ((item as MenuItem).updateComplete) {
                updates.push((item as MenuItem).updateComplete);
            }
        });
        this.childItemsUpdated = Promise.all(updates);
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('selects') && this._notFirstUpdated) {
            this.cachedResolvedSelects = undefined;
            const updates: Promise<unknown>[] = [
                new Promise((res) => requestAnimationFrame(() => res(true))),
            ];
            for (const childItem of this.childItems) {
                updates.push(childItem.menuItem.triggerUpdate());
            }
            this.childItemsUpdated = Promise.all(updates);
        }
        if (changes.has('label')) {
            if (this.label) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }
        this._notFirstUpdated = true;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', this.ownRole);
        }
        this.updateComplete.then(() => this.updateItemFocus());
    }

    protected childItemsUpdated!: Promise<unknown[]>;
    protected cacheUpdated = Promise.resolve();

    protected async _getUpdateComplete(): Promise<void> {
        await super._getUpdateComplete();
        await this.childItemsUpdated;
        await this.cacheUpdated;
    }
}
