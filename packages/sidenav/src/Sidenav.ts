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
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

import sidenavStyles from './sidenav.css.js';
import { Focusable } from '@spectrum-web-components/shared';
import { SideNavItem } from './SidenavItem.js';
import { SideNavHeading } from './SidenavHeading.js';

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
            return elements.findIndex((el) => {
                return this.value
                    ? !el.disabled &&
                          !this.isDisabledChild(el) &&
                          el.value === this.value
                    : !el.disabled && !this.isDisabledChild(el);
            });
        },
        direction: 'vertical',
        elements: () => [...this.querySelectorAll('sp-sidenav-item')],
        isFocusableElement: (el: SideNavItem) =>
            !el.disabled && !this.isDisabledChild(el),
    });

    @property({ type: Boolean, reflect: true, attribute: 'manage-tab-index' })
    public manageTabIndex = false;

    @property({ reflect: true })
    public value: string | undefined = undefined;

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
            <nav @sidenav-select=${this.handleSelect}>
                <slot
                    name="descendant"
                    @slotchange=${this.handleSlotchange}
                ></slot>
            </nav>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        const selectedChild = this.querySelector('[selected]') as SideNavItem;
        if (selectedChild) {
            this.value = selectedChild.value;
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
