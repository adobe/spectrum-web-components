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

export interface IMenuItemEventDetail {
    label: string;
    dataId: string;
}

export class MenuItem extends LitElement {
    public static is = 'sp-menu-item';

    public static get styles() {
        return [menuItemStyles];
    }

    @property()
    public type = '';

    @property()
    public label = '';

    @property({ reflect: true, attribute: 'data-id' })
    public dataId = '';

    @property({ type: Boolean, reflect: true })
    public icon = false;

    public onClick(ev: Event) {
        ev.stopPropagation();
        ev.preventDefault();

        //If user does not provide a dataId, use the label instead
        const dataId = this.dataId.length ? this.dataId : this.label;

        const clickEvent = new CustomEvent<IMenuItemEventDetail>('click', {
            bubbles: true,
            composed: true,
            detail: {
                label: this.label,
                dataId: dataId,
            },
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
                <slot
                    name="icon"
                    @slotchange="${(ev: Event) => this.checkIcon(ev)}"
                ></slot>
                <span id="label">
                    <slot
                        @slotchange="${(ev: Event) => this.getLabel(ev)}"
                    ></slot>
                </span>
            </li>
        `;
    }

    private checkIcon(ev: Event) {
        const slot = ev.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();

        //Check to see if the icon slot is filled
        if (nodes.length) {
            this.icon = true;
        } else {
            this.icon = false;
        }
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

    private getLabel(ev: Event) {
        const slot = ev.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        const nodeText = this.getNodeText(nodes);

        if (nodeText) {
            this.label = nodeText;
        }
    }
}
