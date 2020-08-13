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
        if (this.disabled || this.focusElement.isSameNode(this)) {
            return;
        }

        this.focusElement.focus();
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
        /* istanbul ignore else */
        if (items[index]) {
            return items[index];
        }
        /* istanbul ignore next */
        return this;
    }

    private startListeningToKeyboard = (): void => {
        this.addEventListener('keydown', this.handleKeydown);
        /* istanbul ignore else */
        if (this.value) {
            const selected = this.querySelector(
                `[value="${this.value}"]`
            ) as SideNavItem;
            /* istanbul ignore else */
            if (selected) {
                selected.tabIndex = -1;
            }
        }
    };

    private stopListeningToKeyboard = (): void => {
        this.removeEventListener('keydown', this.handleKeydown);
        /* istanbul ignore else */
        if (this.value) {
            const selected = this.querySelector(
                `[value="${this.value}"]`
            ) as SideNavItem;
            /* istanbul ignore else */
            if (selected) {
                selected.tabIndex = 0;
            }
        }
    };

    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        /* istanbul ignore if */
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
        while (this.isDisabledChild(items[next])) {
            next = (items.length + next + direction) % items.length;
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

    protected render(): TemplateResult {
        return html`
            <nav @sidenav-select=${this.handleSelect}>
                <slot></slot>
            </nav>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.tabIndex = 0;
        const selectedChild = this.querySelector('[selected]') as SideNavItem;
        if (selectedChild) {
            this.value = selectedChild.value;
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

    protected manageShiftTab(): void {
        this.addEventListener('keydown', (event: KeyboardEvent) => {
            const items = [...this.querySelectorAll('sp-sidenav-item')];
            const firstFocusable = items.find(
                (item) => !this.isDisabledChild(item)
            ) as SideNavItem;
            if (
                !event.defaultPrevented &&
                event.shiftKey &&
                event.code === 'Tab' &&
                (this.manageTabIndex ||
                    (event.composedPath() as SideNavItem[]).includes(
                        firstFocusable
                    ))
            ) {
                this.isShiftTabbing = true;
                HTMLElement.prototype.focus.apply(this);
                setTimeout(() => (this.isShiftTabbing = false), 0);
            }
        });
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
