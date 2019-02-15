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

import { html, LitElement, property } from 'lit-element';

import menuItemStyles from './menu-item.css.js';

export class MenuItem extends LitElement {
    public static is = 'sp-menu-item';

    public static get styles() {
        return [menuItemStyles];
    }

    @property({ type: Boolean, reflect: true })
    public icon = false;

    public onMouseDown(ev: Event) {
        // Prevent the blurring of the parent popover element
        ev.stopPropagation();
        ev.preventDefault();
    }

    protected render() {
        return html`
            <li
                id="container"
                role="menuitem"
                tabindex="0"
                @mousedown=${this.onMouseDown}
            >
                <slot
                    name="icon"
                    @slotchange="${(ev: Event) => this.checkIcon(ev)}"
                ></slot>
                <span id="label"><slot></slot></span>
            </li>
        `;
    }

    private checkIcon(ev: Event) {
        const slot = ev.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();

        // Check to see if the icon slot is filled
        this.icon = nodes.length > 0;
    }
}
