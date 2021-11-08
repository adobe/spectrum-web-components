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
    PropertyValues,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

import { SidenavSelectDetail, SideNav } from './Sidenav.js';

import sidenavItemStyles from './sidenav-item.css.js';

/**
 * @element sp-sidenav-item
 *
 * @slot - the Sidenav Items to display as children of this item
 */
export class SideNavItem extends LikeAnchor(Focusable) {
    public static get styles(): CSSResultArray {
        return [sidenavItemStyles];
    }

    @property()
    public value: string | undefined = undefined;

    @property({ type: Boolean, attribute: false })
    public manageTabIndex = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Boolean, reflect: true })
    public expanded = false;

    protected get parentSideNav(): SideNav | undefined {
        if (!this._parentSidenav) {
            this._parentSidenav = this.closest('sp-sidenav') as
                | SideNav
                | undefined;
        }
        return this._parentSidenav;
    }

    protected _parentSidenav?: SideNav;

    protected get hasChildren(): boolean {
        return !!this.querySelector('sp-sidenav-item');
    }

    protected get depth(): number {
        let depth = 0;
        let element = this.parentElement;
        while (element instanceof SideNavItem) {
            depth++;
            element = element.parentElement;
        }
        return depth;
    }

    public handleSideNavSelect(event: Event): void {
        this.selected = event.target === this;
    }

    protected handleClick(event?: Event): void {
        if (!this.href && event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (this.hasChildren) {
                this.expanded = !this.expanded;
            } else if (this.value) {
                this.announceSelected(this.value);
            }
        }
    }

    private announceSelected(value: string): void {
        const selectDetail: SidenavSelectDetail = {
            value,
        };

        const selectionEvent = new CustomEvent('sidenav-select', {
            bubbles: true,
            composed: true,
            detail: selectDetail,
        });

        this.dispatchEvent(selectionEvent);
    }

    public click(): void {
        this.handleClick();
    }

    public get focusElement(): HTMLElement {
        return this.shadowRoot.querySelector('#item-link') as HTMLElement;
    }

    protected update(changes: PropertyValues): void {
        if (!this.hasAttribute('slot')) {
            this.slot = 'descendant';
        }
        super.update(changes);
    }

    protected render(): TemplateResult {
        return html`
            <a
                href=${this.href || '#'}
                target=${ifDefined(this.target)}
                download=${ifDefined(this.download)}
                rel=${ifDefined(this.rel)}
                data-level="${this.depth}"
                @click="${this.handleClick}"
                id="item-link"
                aria-current=${ifDefined(
                    this.selected && this.href ? 'page' : undefined
                )}
            >
                <slot name="icon"></slot>
                ${this.label}
                <slot></slot>
            </a>
            ${this.expanded
                ? html`
                      <slot name="descendant"></slot>
                  `
                : html``}
        `;
    }

    protected updated(changes: PropertyValues): void {
        if (changes.has('selected') || changes.has('manageTabIndex')) {
            const tabIndexForSelectedState = this.selected ? 0 : -1;
            this.tabIndex = this.manageTabIndex ? tabIndexForSelectedState : 0;
        }
        super.updated(changes);
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.startTrackingSelection();
    }

    public disconnectedCallback(): void {
        this.stopTrackingSelection();
        super.disconnectedCallback();
    }

    private async startTrackingSelection(): Promise<void> {
        const parentSideNav = this.parentSideNav;
        if (parentSideNav) {
            await parentSideNav.updateComplete;
            this.manageTabIndex = parentSideNav.manageTabIndex;
            parentSideNav.startTrackingSelectionForItem(this);
            this.selected =
                this.value != null && this.value === parentSideNav.value;
        }
    }

    private stopTrackingSelection(): void {
        const parentSideNav = this.parentSideNav;
        if (parentSideNav) {
            parentSideNav.stopTrackingSelectionForItem(this);
        }
        this._parentSidenav = undefined;
    }
}
