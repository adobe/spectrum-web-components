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
} from '@spectrum-web-components/base';

import { MenuItem, MenuItemQueryRoleEventDetail } from './MenuItem.js';
import menuStyles from './menu.css.js';

export interface MenuQueryRoleEventDetail {
    role: string;
}

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
    public selects: undefined | 'inherit' | 'single' | 'multiple';

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

    public menuItems = [] as MenuItem[];
    public focusedItemIndex = 0;
    public focusInItemIndex = 0;

    private selectedItemsMap = new Map() as Map<MenuItem, boolean>;

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

    private get resolvedSelects(): undefined | String {
        return this.resolvedSelectsAndRole[0];
    }

    private get resolvedSelectsAndRole(): [String | undefined, String | null] {
        if (this.selects === 'inherit') {
            let parent = this.parentElement;
            if (parent == null) {
                const shadowRoot = this.getRootNode() as ShadowRoot;
                parent = shadowRoot?.host as HTMLElement;
            }
            while (parent != null) {
                if (parent.tagName === 'SP-MENU') {
                    const selects = parent.getAttribute('selects');
                    const role = parent.getAttribute('role');
                    if (selects === 'single' || selects === 'multiple') {
                        return [selects, role];
                    } else if (selects !== 'inherit') {
                        return [undefined, role];
                    }
                }
                parent = parent.parentElement;
            }
            return [undefined, this.getAttribute('role')];
        } else {
            return [this.selects, this.getAttribute('role')];
        }
    }

    public constructor() {
        super();

        this.addEventListener(
            'sp-menu-item-query-role',
            (event: CustomEvent<MenuItemQueryRoleEventDetail>) => {
                event.stopPropagation();
                event.detail.role = this.childRole;
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
        /* c8 ignore next 3 */
        if (target && this.selects !== 'inherit') {
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
        if (resolvedSelects == null) {
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

    private async updateItemRoles() {
        const childMenuItems = [
            ...this.querySelectorAll(`sp-menu-item`),
        ] as MenuItem[];

        const promises: Promise<any>[] = [];

        for (const item of childMenuItems) {
            item.updateRole();
            promises.push(item.updateComplete);
        }
        await Promise.all(promises);
    }

    private async prepItems() {
        await this.updateItemRoles();

        this.menuItems = [
            ...this.querySelectorAll(`[role="${this.childRole}"]`),
        ] as MenuItem[];
        if (!this.menuItems || this.menuItems.length === 0) {
            return;
        }
        this.updateSelectedItemIndex();
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
        if (!this.observer) {
            this.observer = new MutationObserver(this.prepItems.bind(this));
        }
        this.observer.observe(this, { childList: true, subtree: true });
        this.updateComplete.then(() => this.prepItems());
        const selectedItem = this.querySelector('[selected]');
        if (selectedItem) {
            requestAnimationFrame(() => {
                selectedItem.scrollIntoView({ block: 'nearest' });
            });
        }
    }

    public disconnectedCallback(): void {
        this.observer.disconnect();
        super.disconnectedCallback();
    }

    protected updated(changes: PropertyValues): void {
        if (changes.has('selects')) {
            this.prepItems();
        }
    }

    private observer!: MutationObserver;
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-menu-query-role': CustomEvent<MenuQueryRoleEventDetail>;
    }
}
