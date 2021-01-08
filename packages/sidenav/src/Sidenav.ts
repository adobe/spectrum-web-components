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
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
} from '@spectrum-web-components/base';

import sidenavStyles from './sidenav.css.js';
import { Focusable, getActiveElement } from '@spectrum-web-components/shared';
import { SideNavItem } from './SidenavItem.js';
import { SideNavHeading } from './SidenavHeading.js';

export interface SidenavSelectDetail {
    value: string;
}

export class SideNav extends Focusable {
    public static get styles(): CSSResultArray {
        return [sidenavStyles];
    }

    @property({ type: Boolean, reflect: true, attribute: 'manage-tab-index' })
    public manageTabIndex = false;

    @property({ reflect: true })
    public value: string | undefined = undefined;

    private handleSelect(event: CustomEvent<SidenavSelectDetail>): void {
        this.value = event.detail.value;
    }

    public constructor() {
        super();
        this.addEventListener('focusin', this.startListeningToKeyboard);
        this.addEventListener('focusout', this.stopListeningToKeyboard);
    }

    public focus(): void {
        if (this.focusElement.isSameNode(this)) {
            return;
        }

        super.focus();
    }

    public blur(): void {
        if (this.focusElement.isSameNode(this)) {
            return;
        }

        super.blur();
    }

    public click(): void {
        if (this.focusElement.isSameNode(this)) {
            return;
        }

        super.click();
    }

    public get focusElement(): SideNavItem | SideNav {
        const selected = this.querySelector('[selected]') as SideNavItem;
        if (selected && !this.isDisabledChild(selected)) {
            return selected;
        }
        const items = [...this.querySelectorAll('sp-sidenav-item')];
        let index = 0;
        while (
            index < items.length &&
            items[index] &&
            this.isDisabledChild(items[index])
        ) {
            index += 1;
        }
        if (items[index]) {
            return items[index];
        }
        /* c8 ignore next */
        return this;
    }

    private startListeningToKeyboard(): void {
        this.addEventListener('keydown', this.handleKeydown);
        if (this.value && this.manageTabIndex) {
            const selected = this.querySelector(
                `[value="${this.value}"]`
            ) as SideNavItem;
            if (selected) {
                selected.tabIndex = -1;
            }
        }
    }

    private stopListeningToKeyboard(): void {
        this.removeEventListener('keydown', this.handleKeydown);
        if (this.value && this.manageTabIndex) {
            const selected = this.querySelector(
                `[value="${this.value}"]`
            ) as SideNavItem;
            if (selected) {
                selected.tabIndex = 0;
            }
        }
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        /* c8 ignore next */
        if (code !== 'ArrowDown' && code !== 'ArrowUp') {
            return;
        }
        event.preventDefault();
        const direction = code === 'ArrowDown' ? 1 : -1;
        this.focusItemByOffset(direction);
    }

    private focusItemByOffset(direction: number): void {
        const items = [...this.querySelectorAll('sp-sidenav-item')];
        const focused = items.indexOf(getActiveElement(this) as SideNavItem);
        let next = focused;
        next = (items.length + next + direction) % items.length;
        let availableItems = items.length;
        // cycle through the available items in the directions of the offset to find the next non-disabled item
        while (this.isDisabledChild(items[next]) && availableItems) {
            availableItems -= 1;
            next = (items.length + next + direction) % items.length;
        }
        // if there are no non-disabled items, skip the work to focus a child
        if (this.isDisabledChild(items[next])) {
            return;
        }
        items[next].focus();
    }

    private isDisabledChild(child: SideNavItem): boolean {
        if (child.disabled) {
            return true;
        }
        let parent = child.parentElement as
            | SideNavItem
            | SideNav
            | SideNavHeading;
        while (
            parent instanceof SideNavHeading ||
            (!(parent as SideNavItem).disabled &&
                parent instanceof SideNavItem &&
                parent.expanded)
        ) {
            parent = parent.parentElement as
                | SideNavItem
                | SideNav
                | SideNavHeading;
        }
        return parent !== this;
    }

    private handleSlotchange(): void {
        this.manageTabIndexes();
    }

    private async manageTabIndexes(): Promise<void> {
        if (!this.value && this.manageTabIndex) {
            const managed = this.querySelector(
                'sp-sidenav-item:not([tabindex])'
            ) as SideNavItem;
            if (managed) {
                managed.tabIndex = -1;
            }
            const first = this.querySelector('sp-sidenav-item');
            if (first) {
                await first.updateComplete;
                first.tabIndex = 0;
            }
        }
    }

    protected render(): TemplateResult {
        return html`
            <nav @sidenav-select=${this.handleSelect}>
                <slot @slotchange=${this.handleSlotchange}></slot>
            </nav>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        const selectedChild = this.querySelector('[selected]') as SideNavItem;
        if (selectedChild) {
            this.value = selectedChild.value;
        } else {
            this.manageTabIndexes();
        }
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('manageTabIndex')) {
            const items = [...this.querySelectorAll('sp-sidenav-item')];
            items.map((item) => (item.manageTabIndex = this.manageTabIndex));
            if (this.manageTabIndex) {
                this.removeEventListener(
                    'manage-tab-index',
                    this.handleManageTabIndex,
                    true
                );
            } else {
                this.addEventListener(
                    'manage-tab-index',
                    this.handleManageTabIndex,
                    true
                );
            }
        }
    }

    private handleManageTabIndex(event: Event): void {
        event.preventDefault();
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-sidenav:select': CustomEvent<SidenavSelectDetail>;
    }
}
