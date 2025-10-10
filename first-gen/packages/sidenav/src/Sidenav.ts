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

import {
    CSSResultArray,
    html,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

import sidenavStyles from './sidenav.css.js';
import { Focusable } from '@spectrum-web-components/shared';
import { SideNavItem } from './SidenavItem.js';
import { SideNavHeading } from './SidenavHeading.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

export interface SidenavSelectDetail {
    value: string;
}

/**
 * @element sp-sidenav
 *
 * @slot - the Sidenav Items to display
 * @fires change - Announces a change in the `value` property of the navigation element.
 * This change can be "canceled" via `event.preventDefault()`.
 */
export class SideNav extends Focusable {
    public static override get styles(): CSSResultArray {
        return [sidenavStyles];
    }

    private items = new Set<SideNavItem>();

    public startTrackingSelectionForItem(item: SideNavItem): void {
        this.items.add(item);
        this.rovingTabindexController.clearElementCache();
    }

    public stopTrackingSelectionForItem(item: SideNavItem): void {
        this.items.delete(item);
        this.rovingTabindexController.clearElementCache();
    }

    rovingTabindexController = new RovingTabindexController<SideNavItem>(this, {
        focusInIndex: (elements: SideNavItem[]) => {
            let parentSideNavItem: SideNavItem | undefined;
            let index = elements.findIndex((el) => {
                // If the selected item's parent is collapsed, save it for later.
                if (el.value === this.value && this.isDisabledChild(el)) {
                    parentSideNavItem = el.closest(
                        'sp-sidenav-item:not([expanded])'
                    ) as SideNavItem;
                }
                return this.value
                    ? !el.disabled &&
                          !this.isDisabledChild(el) &&
                          el.value === this.value
                    : !el.disabled && !this.isDisabledChild(el);
            });
            // If the selected item's parent is collapsed, focus the collapsed parent.
            if (index === -1 && parentSideNavItem) {
                index = elements.findIndex((el) => el === parentSideNavItem);
            }
            return index;
        },
        direction: 'vertical',
        elements: () =>
            [...this.querySelectorAll('sp-sidenav-item')] as SideNavItem[],
        isFocusableElement: (el: SideNavItem) =>
            !el.disabled && !this.isDisabledChild(el),
    });

    @property({ type: Boolean, reflect: true, attribute: 'manage-tab-index' })
    public manageTabIndex = false;

    @property({ reflect: true })
    public value: string | undefined = undefined;

    /**
     * The multilevel variant will have multiple layers of hierarchical navigation items.
     */
    @property({ reflect: true })
    public variant?: 'multilevel' = undefined;

    /**
     * An accessible label that describes the component,
     * so that the side navigation can be distinguished
     * from other navigation by screen reader users.
     * It will be applied to aria-label, but not visually rendered.
     */
    @property({ reflect: true })
    public label?: string | undefined = undefined;

    private handleSelect(
        event: CustomEvent<SidenavSelectDetail> & { target: SideNavItem }
    ): void {
        event.stopPropagation();
        if (this.value === event.detail.value) {
            return;
        }
        const oldValue = this.value;
        this.value = event.detail.value;
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        if (!applyDefault) {
            this.value = oldValue;
            event.target.selected = false;
            event.preventDefault();
        } else {
            this.items.forEach((item) => item.handleSideNavSelect(event));
        }
    }

    public override focus(): void {
        this.rovingTabindexController.focus();
    }

    public override blur(): void {
        if (this.focusElement === this) {
            return;
        }

        super.blur();
    }

    public override click(): void {
        if (this.focusElement === this) {
            return;
        }

        super.click();
    }

    public override get focusElement(): SideNavItem | SideNav {
        return this.rovingTabindexController.focusInElement || this;
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
        if (this.manageTabIndex) {
            this.rovingTabindexController.manage();
        } else {
            this.rovingTabindexController.unmanage();
        }
    }

    protected override render(): TemplateResult {
        return html`
            <nav
                @sidenav-select=${this.handleSelect}
                aria-label=${ifDefined(this.label)}
            >
                <div role="list">
                    <slot
                        name="descendant"
                        @slotchange=${this.handleSlotchange}
                    ></slot>
                </div>
            </nav>
        `;
    }

    protected override willUpdate(): void {
        if (!this.hasUpdated) {
            const selectedChild = this.querySelector(
                '[selected]'
            ) as SideNavItem;
            if (selectedChild) {
                this.value = selectedChild.value;
            }
        }
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('manageTabIndex')) {
            if (this.manageTabIndex) {
                this.rovingTabindexController.manage();
            } else {
                this.rovingTabindexController.unmanage();
            }
        }
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-sidenav:select': CustomEvent<SidenavSelectDetail>;
    }
}
