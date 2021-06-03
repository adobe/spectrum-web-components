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

/**
 * Spectrum Menu Component
 * @element sp-menu
 * @fires change - Announces that the `value` of the element has changed
 *
 */
export class Menu extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [menuStyles];
    }

    @property({ type: String, reflect: true })
    public selects: undefined | 'none' | 'single' | 'multiple';

    @property({ type: String })
    public value = '';

    // For the multiple select case, we'll join the value strings together
    // for the value property with this separator
    @property({ type: String })
    public valueSeparator = ',';

    // TODO: which of these to keep?
    // TODO: allow setting this in the API to change the values
    @property({ attribute: false })
    public selected = [] as string[];

    @property({ attribute: false })
    public selectedItems = [] as MenuItem[];

    @query('slot')
    private menuSlot!: HTMLSlotElement;

    @property({ attribute: false, type: String, reflect: true })
    public get menuItems(): MenuItem[] {
        if (this.cachedMenuItems !== undefined) {
            return this.cachedMenuItems;
        } else {
            this.updateCachedMenuItems();
            return this.cachedMenuItems || [];
        }
    }

    private menuItemSet = new Set() as Set<MenuItem>;
    public focusedItemIndex = 0;
    public focusInItemIndex = 0;

    private selectedItemsMap = new Map() as Map<MenuItem, boolean>;

    private cachedResolvedSelects:
        | undefined
        | [string | undefined, string | null];
    private parentSelectsObservers: MutationObserver[] = [];

    private cachedMenuItems: undefined | MenuItem[] = [];

    /**
     * Hide this getter from web-component-analyzer until
     * https://github.com/runem/web-component-analyzer/issues/131
     * has been addressed.
     *
     * @private
     */
    public get childRole(): string {
        const [selects, role] = this.resolvedSelectsAndRole;
        if (role === 'menu' || role === 'group') {
            switch (selects) {
                case 'single':
                    return 'menuitemradio';
                case 'multiple':
                    return 'menuitemcheckbox';
                default:
                    return 'menuitem';
            }
        } else {
            return 'option';
        }
    }

    private get resolvedSelects(): undefined | string {
        return this.resolvedSelectsAndRole[0];
    }

    private clearParentSelectsObservers() {
        for (const observer of this.parentSelectsObservers) {
            observer.disconnect();
        }
        this.parentSelectsObservers = [];
    }

    private addParentSelectsObserver(parentMenu: HTMLElement) {
        const observer = new MutationObserver((mutationList) => {
            for (const mutation of mutationList) {
                if (mutation.attributeName === 'selects') {
                    for (const item of this.menuItems) {
                        item.triggerUpdate();
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
        if (this.selects) {
            this.cachedResolvedSelects = [
                this.selects,
                this.getAttribute('role'),
            ];
        } else {
            // when unspecified, we inherit `selects` from a parent menu if present
            let parent = this.parentElement;
            if (parent == null) {
                const shadowRoot = this.getRootNode() as ShadowRoot;
                parent = shadowRoot?.host as HTMLElement;
            }
            while (parent != null) {
                if (
                    parent instanceof Menu ||
                    parent.localName == 'sp-menu-group'
                ) {
                    this.addParentSelectsObserver(parent);
                    const selects = parent.getAttribute('selects');
                    const role = parent.getAttribute('role');
                    if (selects === 'single' || selects === 'multiple') {
                        this.cachedResolvedSelects = [selects, role];
                        break;
                    } else if (selects === 'none') {
                        this.cachedResolvedSelects = ['none', role];
                        break;
                    }
                }
                parent = parent.parentElement;
            }
            if (!this.cachedResolvedSelects) {
                this.cachedResolvedSelects = [
                    undefined,
                    this.getAttribute('role'),
                ];
            }
        }
        return this.cachedResolvedSelects;
    }

    public constructor() {
        super();

        this.addEventListener(
            'sp-menu-item-added',
            (event: CustomEvent<MenuItemUpdateEvent>) => {
                const item = event.detail.item;
                if (!this.selects && this.resolvedSelects) {
                    // We still track children for focus
                    if (!event.detail.inherited) {
                        event.detail.inherited = true;
                        this.addItem(item);
                    }
                    return;
                }
                event.stopPropagation();
                item.setRole(this.childRole);
                this.addItem(item);
            }
        );

        this.addEventListener(
            'sp-menu-item-update',
            (event: CustomEvent<MenuItemUpdateEvent>) => {
                const item = event.detail.item;
                if (event.detail.owned) {
                    // a child menu now owns this. Remove if we do now.
                    this.removeItem(item);
                    return;
                }
                if (!this.selects && this.resolvedSelects) {
                    // We still track direct children for focus
                    // TODO: need to be smarter about managing the focus list
                    if (!event.detail.inherited) {
                        event.detail.inherited = true;
                        this.addItem(item);
                    } else {
                        this.removeItem(item);
                    }
                    return;
                }
                event.detail.owned = true;
                item.setRole(this.childRole);
                this.addItem(item);
            }
        );

        this.addEventListener(
            'sp-menu-item-removed',
            (event: CustomEvent<MenuItemUpdateEvent>) => {
                event.stopPropagation();
                this.removeItem(event.detail.item);
            }
        );

        this.handleKeydown = this.handleKeydown.bind(this);
        this.startListeningToKeyboard = this.startListeningToKeyboard.bind(
            this
        );
        this.stopListeningToKeyboard = this.stopListeningToKeyboard.bind(this);
        this.onClick = this.onClick.bind(this);
        this.addEventListener('click', this.onClick);
        this.addEventListener('focusin', this.startListeningToKeyboard);
        this.addEventListener('focus', this.focus);
    }

    public focus(): void {
        if (
            !this.menuItems.length ||
            this.menuItems.every((item) => item.disabled)
        ) {
            return;
        }
        super.focus();
        this.focusMenuItemByOffset(0);
    }

    private onClick(event: Event): void {
        const path = event.composedPath();
        const target = path.find((el) => {
            /* c8 ignore next 3 */
            if (!(el instanceof Element)) {
                return false;
            }
            return el.getAttribute('role') === this.childRole;
        }) as MenuItem;
        if (target && this.selects) {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.selectOrToggleItem(target);
        } else {
            return;
        }
        this.prepareToCleanUp();
    }

    public startListeningToKeyboard(): void {
        const activeElement = (this.getRootNode() as Document).activeElement as
            | MenuItem
            | Menu;
        if (activeElement !== this) {
            this.focus();
            if (activeElement && this.focusedItemIndex === 0) {
                const offset = this.menuItems.indexOf(
                    activeElement as MenuItem
                );
                if (offset > 0) {
                    this.focusMenuItemByOffset(offset);
                }
            }
        }
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('focusout', this.handleFocusout);
    }

    public handleFocusout(): void {
        this.stopListeningToKeyboard();
        const focusedItem = this.menuItems[this.focusedItemIndex] as MenuItem;
        if (focusedItem) {
            focusedItem.focused = false;
        }
    }

    public stopListeningToKeyboard(): void {
        this.removeEventListener('keydown', this.handleKeydown);
    }

    public async selectOrToggleItem(item: MenuItem): Promise<void> {
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
            this.selectedItemsMap.set(item, true);
            this.value = item.value;
            this.selected = [item.value];
            this.selectedItems = [item];
        } else {
            if (this.selectedItemsMap.has(item)) {
                this.selectedItemsMap.delete(item);
            } else {
                this.selectedItemsMap.set(item, true);
            }

            // Match HTML select and set the first selected
            // item as the value. Also set the selected array
            // in the order of the menu items.
            let valueSet: boolean = false;
            let selected: string[] = [];
            let selectedItems: MenuItem[] = [];
            for (const menuItem of this.menuItems) {
                if (this.selectedItemsMap.has(menuItem)) {
                    if (!valueSet) {
                        this.value = menuItem.value;
                        valueSet = true;
                    }
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
            })
        );
        if (!applyDefault) {
            this.selected = oldSelected;
            this.selectedItems = oldSelectedItems;
            this.selectedItemsMap = oldSelectedItemsMap;
            this.value = oldValue;
            return;
        }
        if (resolvedSelects === 'single') {
            for (const oldItem of oldSelectedItemsMap.keys()) {
                if (oldItem !== item) {
                    oldItem.selected = false;
                }
            }
            item.selected = true;
        } else if (resolvedSelects === 'multiple') {
            item.selected = !item.selected;
        }
    }

    public handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        if (code === 'Tab') {
            this.prepareToCleanUp();
            return;
        }
        if (code === 'Space' || code === 'Enter') {
            this.menuItems[this.focusedItemIndex].click();
            return;
        }
        if (code !== 'ArrowDown' && code !== 'ArrowUp') {
            return;
        }
        const lastFocusedItem = this.menuItems[this.focusedItemIndex];
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
        const focusedItem = this.menuItems[this.focusedItemIndex] as MenuItem;
        focusedItem.focused = false;
        this.focusedItemIndex =
            (this.menuItems.length + this.focusedItemIndex + offset) %
            this.menuItems.length;
        let itemToFocus = this.menuItems[this.focusedItemIndex] as MenuItem;
        let availableItems = this.menuItems.length;
        // cycle through the available items in the directions of the offset to find the next non-disabled item
        while (itemToFocus.disabled && availableItems) {
            availableItems -= 1;
            this.focusedItemIndex =
                (this.menuItems.length + this.focusedItemIndex + step) %
                this.menuItems.length;
            itemToFocus = this.menuItems[this.focusedItemIndex] as MenuItem;
        }
        // if there are no non-disabled items, skip the work to focus a child
        if (!itemToFocus.disabled) {
            this.forwardFocusVisibleToitem(itemToFocus);
            this.setAttribute('aria-activedescendant', itemToFocus.id);
        }
        return itemToFocus;
    }

    private prepareToCleanUp(): void {
        document.addEventListener(
            'focusout',
            () => {
                requestAnimationFrame(() => {
                    /* c8 ignore next 3 */
                    if (this.menuItems.length === 0) {
                        return;
                    }
                    const focusedItem = this.menuItems[
                        this.focusedItemIndex
                    ] as MenuItem;
                    focusedItem.focused = false;
                    this.updateSelectedItemIndex();
                });
            },
            { once: true }
        );
    }

    public updateSelectedItemIndex(): void {
        let index = this.menuItems.length - 1;
        let item = this.menuItems[index] as MenuItem;
        while (index && item && !item.selected) {
            index -= 1;
            item = this.menuItems[index] as MenuItem;
        }
        index = Math.max(index, 0);
        const selectedItemsMap = new Map<MenuItem, boolean>();
        const selected: string[] = [];
        const selectedItems: MenuItem[] = [];
        this.menuItems.forEach((item, i) => {
            if (item.selected) {
                selectedItemsMap.set(item, true);
                selected.push(item.value);
                selectedItems.push(item);
            }
            if (i !== index) {
                item.focused = false;
            }
        });
        this.selectedItemsMap = selectedItemsMap;
        this.selected = selected;
        this.selectedItems = selectedItems;
        this.focusedItemIndex = index;
        this.focusInItemIndex = index;
    }

    // debounce update this.menuItems so they're in DOM order
    private updateCachedMenuItems(): void {
        this.cachedMenuItems = [];

        const slotElements =
            this.menuSlot.assignedElements({ flatten: true }) || [];
        for (const slotElement of slotElements) {
            const childItems: MenuItem[] =
                slotElement instanceof MenuItem
                    ? [slotElement as MenuItem]
                    : ([
                          ...slotElement.querySelectorAll(
                              `[role="${this.childRole}"]`
                          ),
                      ] as MenuItem[]);
            for (const childItem of childItems) {
                if (this.menuItemSet.has(childItem)) {
                    this.cachedMenuItems.push(childItem);
                }
            }
        }
    }

    private handleItemsChanged() {
        this.cachedMenuItems = undefined;
        // Debounce the update so we only update once
        // if multiple items have changed
        window.requestAnimationFrame(() => {
            if (this.cachedMenuItems === undefined) {
                this.updateSelectedItemIndex();
                this.updateItemFocus();
            }
        });
    }

    private addItem(item: MenuItem) {
        this.menuItemSet.add(item);
        this.handleItemsChanged();
    }

    private removeItem(itemToRemove: MenuItem) {
        this.menuItemSet.delete(itemToRemove);
        this.cachedMenuItems = undefined;
    }

    private async updateItemFocus() {
        const focusInItem = this.menuItems[this.focusInItemIndex] as MenuItem;
        if ((this.getRootNode() as Document).activeElement === this) {
            this.forwardFocusVisibleToitem(focusInItem);
        }
    }

    private forwardFocusVisibleToitem(item: MenuItem): void {
        let shouldFocus = false;
        try {
            // Browsers without support for the `:focus-visible`
            // selector will throw on the following test (Safari, older things).
            // Some won't throw, but will be focusing item rather than the menu and
            // will rely on the polyfill to know whether focus is "visible" or not.
            shouldFocus =
                this.matches(':focus-visible') ||
                this.matches('.focus-visible');
        } catch (error) {
            shouldFocus = this.matches('.focus-visible');
        }
        item.focused = shouldFocus;
    }

    public render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        if (this.getAttribute('role') !== 'presentation') {
            this.tabIndex = 0;
        }
    }

    public connectedCallback(): void {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'menu');
        }
        this.updateComplete.then(() => this.updateItemFocus());
        const selectedItem = this.querySelector('[selected]');
        if (selectedItem) {
            requestAnimationFrame(() => {
                selectedItem.scrollIntoView({ block: 'nearest' });
            });
        }
    }

    protected updated(changes: PropertyValues): void {
        if (changes.has('selects')) {
            this.cachedResolvedSelects = undefined;
            for (const item of this.menuItems) {
                item.triggerUpdate();
            }
        }
    }
}
