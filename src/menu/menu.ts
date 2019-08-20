/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, LitElement, CSSResultArray, TemplateResult } from 'lit-element';

import menuStyles from './menu.css';

interface MenuItem extends HTMLElement {
    disabled: boolean;
    selected: boolean;
    tabIndex: number;
}

/**
 * Spectrum Menu Component
 * @element sp-menu
 *
 */
export class Menu extends LitElement {
    public static get styles(): CSSResultArray {
        return [menuStyles];
    }

    public menuItems = [] as Element[];
    public focusedItemIndex = 0;
    public focusInItemIndex = 0;

    public constructor() {
        super();
        this.handleKeydown = this.handleKeydown.bind(this);
        this.startListeningToKeyboard = this.startListeningToKeyboard.bind(
            this
        );
        this.stopListeningToKeyboard = this.stopListeningToKeyboard.bind(this);
        this.addEventListener('focusin', this.startListeningToKeyboard);
        this.addEventListener('focusout', this.stopListeningToKeyboard);
    }

    public focus(): void {
        if (this.menuItems.length === 0) {
            return;
        }

        const focusInItem = this.menuItems[this.focusInItemIndex] as MenuItem;
        focusInItem.focus();
    }

    public startListeningToKeyboard(): void {
        if (this.menuItems.length === 0) {
            return;
        }
        this.addEventListener('keydown', this.handleKeydown);
    }

    public stopListeningToKeyboard(): void {
        this.removeEventListener('keydown', this.handleKeydown);
    }

    public handleKeydown(e: KeyboardEvent): void {
        const { code } = e;
        if (code === 'Tab') {
            document.addEventListener(
                'focusout',
                () => {
                    this.focusedItemIndex = this.focusInItemIndex;
                    const itemToFocus = this.menuItems[
                        this.focusInItemIndex
                    ] as MenuItem;
                    itemToFocus.tabIndex = 0;
                },
                { once: true }
            );
            return;
        }
        if (code !== 'ArrowDown' && code !== 'ArrowUp') {
            return;
        }
        e.preventDefault();
        const direction = code === 'ArrowDown' ? 1 : -1;
        this.focusMenuItemByOffset(direction);
    }

    public focusMenuItemByOffset(offset: number): void {
        const focusedItem = this.menuItems[this.focusedItemIndex] as MenuItem;
        this.focusedItemIndex =
            (this.menuItems.length + this.focusedItemIndex + offset) %
            this.menuItems.length;
        let itemToFocus = this.menuItems[this.focusedItemIndex] as MenuItem;
        while (itemToFocus.disabled) {
            this.focusedItemIndex =
                (this.menuItems.length + this.focusedItemIndex + offset) %
                this.menuItems.length;
            itemToFocus = this.menuItems[this.focusedItemIndex] as MenuItem;
        }
        itemToFocus.focus();
        focusedItem.tabIndex = -1;
    }

    public handleSlotchange(): void {
        this.menuItems = [...this.querySelectorAll('[role="menuitem"]')];
        if (!this.menuItems || this.menuItems.length === 0) {
            return;
        }
        if (this.querySelector('[selected]')) {
            let index = this.menuItems.length - 1;
            let item = this.menuItems[index] as MenuItem;
            while (!item.selected) {
                index -= 1;
                item = this.menuItems[index] as MenuItem;
            }
            this.focusInItemIndex = index;
        } else {
            this.focusInItemIndex = 0;
        }
        const focusInItem = this.menuItems[this.focusInItemIndex] as MenuItem;
        focusInItem.tabIndex = 0;
        this.focusedItemIndex = this.focusInItemIndex;
    }

    public render(): TemplateResult {
        return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
    }

    protected firstUpdated(): void {
        this.setAttribute('role', 'menu');
    }
}
