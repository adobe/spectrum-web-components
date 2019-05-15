/*
Copyright 2018 Adobe. All rights reserved.
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
    LitElement,
    CSSResultArray,
    TemplateResult,
    property,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { SidenavSelectDetail, SideNav } from './sidenav';

import sidenavItemStyles from './sidenav-item.css';

export class SideNavItem extends LitElement {
    public static readonly is = 'sp-sidenav-item';

    public static get styles(): CSSResultArray {
        return [sidenavItemStyles];
    }

    @property()
    public value: string | undefined = undefined;

    @property({ type: Boolean, reflect: true })
    public selected: boolean = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public expanded = true;

    @property()
    public href: string | undefined = undefined;

    @property()
    public label: string = '';

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

    protected firstUpdated(): void {
        const parentSideNav = this.parentSideNav;
        if (parentSideNav) {
            parentSideNav.addEventListener('select', (ev) =>
                this.handleSideNavSelect(ev)
            );
            this.selected =
                this.value != null && this.value === parentSideNav.value;
        }
    }

    protected handleSideNavSelect(ev: Event): void {
        this.selected = ev.target === this;
    }

    protected handleClick(): void {
        if (this.value && !this.disabled) {
            if (this.hasChildren) {
                this.expanded = !this.expanded;
            } else {
                const selectDetail: SidenavSelectDetail = {
                    value: this.value,
                };

                const selectionEvent = new CustomEvent<SidenavSelectDetail>(
                    'select',
                    {
                        bubbles: true,
                        composed: true,
                        detail: selectDetail,
                    }
                );

                this.dispatchEvent(selectionEvent);
            }
        }
    }

    protected render(): TemplateResult {
        return html`
            <a
                .href=${ifDefined(this.href)}
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
}
