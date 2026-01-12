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
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    queryAssignedNodes,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';

import { Menu } from './Menu.js';
// Leveraged in build systems that use aliasing to prevent multiple registrations: https://github.com/adobe/spectrum-web-components/pull/3225
// eslint-disable-next-line import/no-extraneous-dependencies
import '@spectrum-web-components/menu/sp-menu.js';
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

    private headerId = '';

    @queryAssignedNodes({
        slot: 'header',
        flatten: true,
    })
    private headerElements!: NodeListOf<HTMLElement>;

    @state()
    private headerElement?: HTMLElement;

    /**
     * a menu group must have the role `group`
     * and should never function as a menu
     */
    protected override get ownRole(): string {
        return 'group';
    }

    /**
     * only a menu controls roving tabindex;
     * groups should defer navigation to parent menu
     */
    // protected override get controlsRovingTabindex(): boolean {
    //     return false;
    // }

    protected updateLabel(): void {
        const headerElement = this.headerElements.length
            ? this.headerElements[0]
            : undefined;
        if (headerElement !== this.headerElement) {
            if (this.headerElement && this.headerElement.id === this.headerId) {
                this.headerElement.removeAttribute('id');
            }
            if (headerElement) {
                this.headerId =
                    this.headerId || `sp-menu-group-label-${randomID()}`;
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
            <span class="header" ?hidden=${!this.headerElement}>
                <slot name="header" @slotchange=${this.updateLabel}></slot>
            </span>
            ${this.renderMenuItemSlot()}
        `;
    }
}
