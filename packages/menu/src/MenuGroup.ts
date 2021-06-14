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
} from '@spectrum-web-components/base';

import { Menu } from './Menu.js';
import '../sp-menu.js';
import menuGroupStyles from './menu-group.css.js';

/**
 * Spectrum Menu Group Component
 * @element sp-menu-group
 *
 * @slot header - headline of the menu group
 * @slot - menu items to be listed in the group
 */
export class MenuGroup extends Menu {
    public static get styles(): CSSResultArray {
        return [...super.styles, menuGroupStyles];
    }

    protected get ownRole(): string {
        switch (this.selects) {
            case 'multiple':
            case 'single':
            case 'inherit':
                return 'group';
            default:
                return 'menu';
        }
    }

    public render(): TemplateResult {
        return html`
            <span class="header" aria-hidden="true">
                <slot name="header"></slot>
            </span>
            <sp-menu role="none">
                <slot></slot>
            </sp-menu>
        `;
    }
}
