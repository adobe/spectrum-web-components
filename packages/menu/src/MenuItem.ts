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
    property,
    CSSResultArray,
    TemplateResult,
    PropertyValues,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import { ActionButton } from '@spectrum-web-components/action-button';

import menuItemStyles from './menu-item.css.js';
import checkmarkStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';
import { Menu } from './Menu.js';

export class MenuItemRemovedEvent extends Event {
    constructor() {
        super('sp-menu-item-removed', {
            bubbles: true,
            composed: true,
        });
    }
    get item(): MenuItem {
        if (!this._item) {
            this._item = this.composedPath()[0] as MenuItem;
        }
        return this._item;
    }
    _item?: MenuItem;
    reset(): void {
        this._item = undefined;
    }
}

export class MenuItemAddedOrUpdatedEvent extends Event {
    constructor() {
        super('sp-menu-item-added-or-updated', {
            bubbles: true,
            composed: true,
        });
    }
    set focusRoot(root: Menu) {
        this.item.menuData.focusRoot = this.item.menuData.focusRoot || root;
    }
    set selectionRoot(root: Menu) {
        this.item.menuData.selectionRoot =
            this.item.menuData.selectionRoot || root;
    }
    get item(): MenuItem {
        if (!this._item) {
            this._item = this.composedPath()[0] as MenuItem;
        }
        return this._item;
    }
    _item?: MenuItem;
    set currentAncestorWithSelects(ancestor: Menu | undefined) {
        this._currentAncestorWithSelects = ancestor;
    }
    get currentAncestorWithSelects(): Menu | undefined {
        return this._currentAncestorWithSelects;
    }
    _currentAncestorWithSelects?: Menu;
    reset(item: MenuItem): void {
        this._item = undefined;
        this._currentAncestorWithSelects = undefined;
        item.menuData = {
            focusRoot: undefined,
            selectionRoot: undefined,
        };
    }
}

const addOrUpdateEvent = new MenuItemAddedOrUpdatedEvent();
const removeEvent = new MenuItemRemovedEvent();

/**
 * Spectrum Menu Item Component
 * @element sp-menu-item
 * @slot value - content placed at the end of the Menu Item like values, keyboard shortcuts, etc.
 * @fires sp-menu-item-added - announces the item has been added so a parent menu can take ownerships
 * @fires sp-menu-item-removed - announces when removed from the DOM so the parent menu can remove ownership and update selected state
 */
export class MenuItem extends ActionButton {
    public static get styles(): CSSResultArray {
        return [menuItemStyles, checkmarkStyles];
    }

    static instanceCount = 0;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({
        type: Boolean,
        reflect: true,
        attribute: 'no-wrap',
        hasChanged() {
            return false;
        },
    })
    public noWrap = false;

    public get itemChildren(): { icon: Element[]; content: Node[] } {
        const iconSlot = this.shadowRoot.querySelector(
            'slot[name="icon"]'
        ) as HTMLSlotElement;
        const icon = !iconSlot
            ? []
            : iconSlot.assignedElements().map((element) => {
                  const newElement = element.cloneNode(true) as HTMLElement;
                  newElement.removeAttribute('slot');
                  newElement.classList.toggle('icon');
                  return newElement;
              });
        const contentSlot = this.shadowRoot.querySelector(
            'slot:not([name])'
        ) as HTMLSlotElement;
        const content = !contentSlot
            ? []
            : contentSlot.assignedNodes().map((node) => node.cloneNode(true));
        return { icon, content };
    }

    protected get buttonContent(): TemplateResult[] {
        const content = super.buttonContent;
        content.push(
            html`
                <slot name="value"></slot>
            `
        );
        if (this.selected) {
            content.push(html`
                <sp-icon-checkmark100
                    class="spectrum-UIIcon-Checkmark100 icon checkmark"
                ></sp-icon-checkmark100>
            `);
        }
        return content;
    }

    protected renderButton(): TemplateResult {
        return html`
            ${this.buttonContent}
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        this.setAttribute('tabindex', '-1');
        super.firstUpdated(changes);
        if (!this.hasAttribute('id')) {
            this.id = `sp-menu-item-${MenuItem.instanceCount++}`;
        }
    }

    updateAriaSelected(): void {
        const role = this.getAttribute('role');
        if (role === 'option') {
            this.setAttribute(
                'aria-selected',
                this.selected ? 'true' : 'false'
            );
        } else if (role === 'menuitemcheckbox' || role === 'menuitemradio') {
            this.setAttribute('aria-checked', this.selected ? 'true' : 'false');
        }
    }

    public setRole(role: string): void {
        this.setAttribute('role', role);
        this.updateAriaSelected();
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('selected')) {
            this.updateAriaSelected();
        }
    }

    public connectedCallback(): void {
        super.connectedCallback();
        addOrUpdateEvent.reset(this);
        this.dispatchEvent(addOrUpdateEvent);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        removeEvent.reset();
        this.dispatchEvent(removeEvent);
    }

    public async triggerUpdate(): Promise<void> {
        await new Promise((ready) => requestAnimationFrame(ready));
        addOrUpdateEvent.reset(this);
        this.dispatchEvent(addOrUpdateEvent);
    }

    public menuData: {
        focusRoot?: Menu;
        selectionRoot?: Menu;
    } = {
        focusRoot: undefined,
        selectionRoot: undefined,
    };
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-menu-item-added-or-updated': MenuItemAddedOrUpdatedEvent;
        'sp-menu-item-removed': MenuItemRemovedEvent;
    }
}
