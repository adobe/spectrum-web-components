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
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    queryAssignedNodes,
    state,
} from '@spectrum-web-components/base/src/decorators.js';

import { Menu } from './Menu.js';
import '../sp-menu.js';
import menuGroupStyles from './menu-group.css.js';

/**
 * @element sp-menu-group
 *
 * @slot header - headline of the menu group
 * @slot - menu items to be listed in the group
 */
export class MenuGroup extends Menu {
    public static override get styles(): CSSResultArray {
        return [...super.styles, menuGroupStyles];
    }

    private static instances = 0;

    private headerId!: string;

    public constructor() {
        super();
        MenuGroup.instances += 1;
        this.headerId = `sp-menu-group-label-${MenuGroup.instances}`;
    }

    @queryAssignedNodes('header', true)
    private headerElements!: NodeListOf<HTMLElement>;

    @state()
    private headerElement?: HTMLElement;

    protected override get ownRole(): string {
        switch (this.selects) {
            case 'multiple':
            case 'single':
            case 'inherit':
                return 'group';
            default:
                return 'menu';
        }
    }

    protected updateLabel(): void {
        const headerElement = this.headerElements.length
            ? this.headerElements[0]
            : undefined;
        if (headerElement !== this.headerElement) {
            if (this.headerElement && this.headerElement.id === this.headerId) {
                this.headerElement.removeAttribute('id');
            }
            if (headerElement) {
                const headerId = headerElement.id || this.headerId;
                if (!headerElement.id) {
                    headerElement.id = headerId;
                }
                this.setAttribute('aria-labelledby', headerId);
            } else {
                this.removeAttribute('aria-labelledby');
            }
        }
        this.headerElement = headerElement;
    }

    public override render(): TemplateResult {
        return html`
            <span
                class="header"
                aria-hidden="true"
                ?hidden=${!this.headerElement}
            >
                <slot name="header" @slotchange=${this.updateLabel}></slot>
            </span>
            <sp-menu role="none">${this.renderMenuItemSlot()}</sp-menu>
        `;
    }
}
