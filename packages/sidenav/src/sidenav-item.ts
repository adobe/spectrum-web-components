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

import {
    html,
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
} from 'lit-element';
import { Focusable } from '@spectrum-web-components/shared';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { SidenavSelectDetail, SideNav } from './sidenav.js';

import sidenavItemStyles from './sidenav-item.css.js';

export class SideNavItem extends Focusable {
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
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public expanded = false;

    @property()
    public href: string | undefined = undefined;

    @property()
    public target?: '_blank' | '_parent' | '_self' | '_top';

    @property()
    public label = '';

    protected get parentSideNav(): SideNav | undefined {
        return this.closest('sp-sidenav') as SideNav | undefined;
    }

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

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        const parentSideNav = this.parentSideNav;
        if (parentSideNav) {
            parentSideNav.addEventListener('sidenav-select', (event) =>
                this.handleSideNavSelect(event)
            );
            this.selected =
                this.value != null && this.value === parentSideNav.value;
        }
    }

    protected handleSideNavSelect(event: Event): void {
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
                const selectDetail: SidenavSelectDetail = {
                    value: this.value,
                };

                const selectionEvent = new CustomEvent('sidenav-select', {
                    bubbles: true,
                    composed: true,
                    detail: selectDetail,
                });

                this.dispatchEvent(selectionEvent);
            }
        }
    }

    public click(): void {
        this.handleClick();
    }

    public get focusElement(): HTMLElement {
        /* istanbul ignore if */
        if (!this.shadowRoot) {
            return this;
        }
        return this.shadowRoot.querySelector('#itemLink') as HTMLElement;
    }

    protected render(): TemplateResult {
        const tabIndexForSelectedState = this.selected ? '0' : '-1';
        return html`
            <a
                tabindex=${this.manageTabIndex ? tabIndexForSelectedState : '0'}
                href=${this.href || '#'}
                target=${ifDefined(this.target)}
                data-level="${this.depth}"
                @click="${this.handleClick}"
                id="itemLink"
            >
                ${this.label}
            </a>
            ${this.expanded
                ? html`
                      <slot></slot>
                  `
                : undefined}
        `;
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('selected') || changes.has('manageTabIndex')) {
            const tabIndexForSelectedState = this.selected ? 0 : -1;
            this.tabIndex = this.manageTabIndex ? tabIndexForSelectedState : 0;
        }
    }

    public connectedCallback(): void {
        super.connectedCallback();
        const manageTabIndex = this.dispatchEvent(
            new Event('manage-tab-index', {
                cancelable: true,
            })
        );
        if (manageTabIndex) {
            this.manageTabIndex = true;
        }
    }
}
