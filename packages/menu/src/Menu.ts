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

import {
    MenuItem,
    MenuItemAddedOrUpdatedEvent,
    MenuItemRemovedEvent,
} from './MenuItem.js';
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

/**
 * Spectrum Menu Component
 * @element sp-menu
 * @fires change - Announces that the `value` of the element has changed
 * @attr selects - whether the element has a specific selection algorithm that it applies
 *   to its item descendants. `single` allows only one descendent to be selected at a time.
 *   `multiple` allows many descendants to be selected. `inherit` will be applied dynamically
 *   when an ancestor of this element is actively managing the selection of its descendents.
 *   When the `selects` attribute is not present a `value` will not be maintained and the Menu
 *   Item children of this Menu will not have their `selected` state managed.
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

        const slotElements = this.menuSlot.assignedElements({ flatten: true });
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
     * this event to announce its presence in the DOM. During the capture phase the first
     * Menu based element that the event encounters will manage the focus state of the
     * dispatching `<sp-menu-item>` element.
     * @param event
     */
    private onFocusableItemAddedOrUpdated(
        event: MenuItemAddedOrUpdatedEvent
    ): void {
        event.focusRoot = this;
        this.addChildItem(event.item);

        if (this.selects === 'inherit') {
            this.resolvedSelects = 'inherit';
            this.resolvedRole = (event.currentAncestorWithSelects?.getAttribute(
                'role'
            ) ||
                this.getAttribute('role') ||
                undefined) as RoleType;
        } else if (this.selects) {
            this.resolvedRole = (this.getAttribute('role') ||
                undefined) as RoleType;
            this.resolvedSelects = this.selects;
            event.currentAncestorWithSelects = this;
        } else {
            this.resolvedRole = (this.getAttribute('role') ||
                undefined) as RoleType;
            this.resolvedSelects =
                this.resolvedRole === 'none' ? 'ignore' : 'none';
        }
    }

    /**
     * When a descendant `<sp-menu-item>` element is added or updated it will dispatch
     * this event to announce its presence in the DOM. During the bubble phase the first
     * Menu based element that the event encounters that does not inherit selection will
     * manage the selection state of the dispatching `<sp-menu-item>` element.
     * @param event
     */
    private onSelectableItemAddedOrUpdated(
        event: MenuItemAddedOrUpdatedEvent
    ): void {
        const selects =
            this.resolvedSelects === 'single' ||
            this.resolvedSelects === 'multiple';
        if (
            (selects || (!this.selects && this.resolvedSelects !== 'ignore')) &&
            !event.item.menuData.selectionRoot
        ) {
            event.item.setRole(this.childRole);
            event.selectionRoot = this;
        }
    }

    private addChildItem(item: MenuItem): void {
        this.childItemSet.add(item);
        this.handleItemsChanged();
    }

    private removeChildItem(event: MenuItemRemovedEvent): void {
        this.childItemSet.delete(event.item);
        this.cachedChildItems = undefined;
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

        this.addEventListener('sp-menu-item-removed', this.removeChildItem);
        this.addEventListener('click', this.onClick);
        this.addEventListener('focusin', this.startListeningToKeyboard);
    }

    public focus({ preventScroll }: FocusOptions = {}): void {
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
        if (target?.href && target.href.length) {
            return;
        }
        if (target?.menuData.selectionRoot === this) {
            event.preventDefault();
            this.selectOrToggleItem(target);
        } else {
            return;
        }
        this.prepareToCleanUp();
    }

    public startListeningToKeyboard(): void {
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
        if (activeElement !== selectionRoot) {
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
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('focusout', this.handleFocusout);
    }

    public handleFocusout(event: FocusEvent): void {
        this.stopListeningToKeyboard();
        if (
            event.target === this &&
            this.childItems.some(
                (childItem) => childItem.menuData.focusRoot === this
            )
        ) {
            const focusedItem = this.childItems[this.focusedItemIndex];
            if (focusedItem) {
                focusedItem.focused = false;
            }
        }
    }

    public stopListeningToKeyboard(): void {
        this.removeEventListener('keydown', this.handleKeydown);
    }

    public async selectOrToggleItem(targetItem: MenuItem): Promise<void> {
        const resolvedSelects = this.resolvedSelects;
        const oldSelectedItemsMap = new Map(this.selectedItemsMap);
        const oldSelected = this.selected.slice();
        const oldSelectedItems = this.selectedItems.slice();
        const oldValue = this.value;

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

    public handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        if (code === 'Tab') {
            this.prepareToCleanUp();
            return;
        }
        if (code === 'Space' || code === 'Enter') {
            this.childItems[this.focusedItemIndex]?.click();
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
        itemToFocus.scrollIntoView({ block: 'nearest' });
    }

    public focusMenuItemByOffset(offset: number): MenuItem {
        const step = offset || 1;
        const focusedItem = this.childItems[this.focusedItemIndex];
        focusedItem.focused = false;
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

    public updateSelectedItemIndex(): void {
        let index = this.childItems.length - 1;
        let item = this.childItems[index];
        while (index && item && !item.selected) {
            index -= 1;
            item = this.childItems[index];
        }
        index = Math.max(index, 0);
        const selectedItemsMap = new Map<MenuItem, boolean>();
        const selected: string[] = [];
        const selectedItems: MenuItem[] = [];
        this.childItems.forEach((childItem, i) => {
            if (childItem.menuData.selectionRoot !== this) return;

            if (childItem.selected) {
                selectedItemsMap.set(childItem, true);
                selected.push(childItem.value);
                selectedItems.push(childItem);
            }
            if (i !== index) {
                childItem.focused = false;
            }
        });
        this.selectedItemsMap = selectedItemsMap;
        this.selected = selected;
        this.selectedItems = selectedItems;
        this.value = this.selected.join(this.valueSeparator);
        this.focusedItemIndex = index;
        this.focusInItemIndex = index;
    }

    private _willUpdateItems = false;

    private handleItemsChanged(): void {
        this.cachedChildItems = undefined;
        if (!this._willUpdateItems) {
            /* c8 ignore next 3 */
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
            focusInItem.menuData.focusRoot
        ) {
            this.forwardFocusVisibleToItem(focusInItem);
        }
    }

    private forwardFocusVisibleToItem(item: MenuItem): void {
        const activeElement = (this.getRootNode() as Document).activeElement as
            | MenuItem
            | Menu;
        if (item.menuData.focusRoot !== this) {
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
        item.focused = shouldFocus;
        if (
            item.menuData.selectionRoot &&
            item.menuData.selectionRoot !== this
        ) {
            item.menuData.selectionRoot.focus();
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
            if ((item as MenuItem).localName === 'sp-menu-item') {
                updates.push((item as MenuItem).updateComplete);
            }
        });
        this.childItemsUpdated = Promise.all(updates);
    }

    protected updated(changes: PropertyValues<this>): void {
        super.updated(changes);
        if (changes.has('selects') && this._notFirstUpdated) {
            this.selectsChanged();
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

    protected selectsChanged(): void {
        const updates: Promise<unknown>[] = [
            new Promise((res) => requestAnimationFrame(() => res(true))),
        ];
        this.childItemSet.forEach((childItem) => {
            updates.push(childItem.triggerUpdate());
        });
        this.childItemsUpdated = Promise.all(updates);
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

    protected async _getUpdateComplete(): Promise<boolean> {
        const complete = (await super._getUpdateComplete()) as boolean;
        await this.childItemsUpdated;
        await this.cacheUpdated;
        return complete;
    }
}
