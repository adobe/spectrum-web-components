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

export type IMenuItemEventDetail = string;

export class MenuItem extends LitElement {
    public static is = 'sp-menu-item';

    public static get styles() {
        return [menuItemStyles];
    }

    @property()
    public type = '';

    @property()
    public value = '';

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: Boolean, reflect: true })
    public select = false;

    public onClick(ev: Event) {
        ev.stopPropagation();
        ev.preventDefault();

        const clickEvent = new CustomEvent<IMenuItemEventDetail>('click', {
            bubbles: true,
            composed: true,
            detail: this.value,
        });

        this.dispatchEvent(clickEvent);
    }

    public onMouseDown(ev: Event) {
        //Prevent the blurring of the parent popover element
        ev.stopPropagation();
        ev.preventDefault();
    }

    protected render() {
        return html`
            <li
                id="container"
                role="menuitem"
                tabindex="0"
                @click=${this.onClick}
                @mousedown=${this.onMouseDown}
            >
                <slot name="icon-left"></slot>
                <span id="label">
                    <slot
                        @slotchange="${(ev: Event) => this.getValue(ev)}"
                    ></slot>
                </span>
                <slot name="icon-right"></slot>
            </li>
        `;
    }

    private getNodeText(nodes: Array<Node>) {
        /* Parse text from default slot. Ignore new lines and trailing white spaces */
        const nodeContent = nodes.map((node) => {
            const content = node.textContent;

            if (content && content.length) {
                return content;
            }
        });

        return nodeContent.join('').trim();
    }

    private getValue(ev: Event) {
        const slot = ev.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        const nodeText = this.getNodeText(nodes);

        if (nodeText) {
            this.value = nodeText;
        }
    }
}
