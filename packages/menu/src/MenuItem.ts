/*
Copyright 2020 Adobe. All rights reserved.
Copyright 2021 Gaoding. All rights reserved.
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
    query,
} from '@iliad-ui/base';

import '@iliad-ui/icons-ui/icons/sp-icon-checkmark100.js';
import { LikeAnchor } from '@iliad-ui/shared/src/like-anchor.js';
import { Focusable } from '@iliad-ui/shared/src/focusable.js';

import menuItemStyles from './menu-item.css.js';
import checkmarkStyles from '@iliad-ui/icon/src/spectrum-icon-checkmark.css.js';
import { Menu } from './Menu.js';

export class MenuItemRemovedEvent extends Event {
    constructor() {
        super('sp-menu-item-removed', {
            bubbles: true,
            composed: true,
        });
    }
    get item(): MenuItem {
        return this._item;
    }
    _item!: MenuItem;
    focused = false;
    reset(item: MenuItem): void {
        this._item = item;
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
        return this._item;
    }
    _item!: MenuItem;
    set currentAncestorWithSelects(ancestor: Menu | undefined) {
        this._currentAncestorWithSelects = ancestor;
    }
    get currentAncestorWithSelects(): Menu | undefined {
        return this._currentAncestorWithSelects;
    }
    _currentAncestorWithSelects?: Menu;
    reset(item: MenuItem): void {
        this._item = item;
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
 * @element sp-menu-item
 *
 * @slot - text content to display within the Menu Item
 * @slot icon - icon element to be placed at the start of the Menu Item
 * @slot value - content placed at the end of the Menu Item like values, keyboard shortcuts, etc.
 * @fires sp-menu-item-added - announces the item has been added so a parent menu can take ownerships
 * @fires sp-menu-item-removed - announces when removed from the DOM so the parent menu can remove ownership and update selected state
 */
export class MenuItem extends LikeAnchor(Focusable) {
    public static get styles(): CSSResultArray {
        return [menuItemStyles, checkmarkStyles];
    }

    static instanceCount = 0;

    @property({ type: Boolean, reflect: true })
    public active = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: String })
    public get value(): string {
        return this._value || this.itemText;
    }

    public set value(value: string) {
        if (value === this._value) {
            return;
        }
        this._value = value || '';
        if (this._value) {
            this.setAttribute('value', this._value);
        } else {
            this.removeAttribute('value');
        }
    }

    private _value = '';

    /**
     * @private
     */
    public get itemText(): string {
        return (this.textContent || /* c8 ignore next */ '').trim();
    }

    @property({
        type: Boolean,
        reflect: true,
        attribute: 'no-wrap',
        hasChanged() {
            return false;
        },
    })
    public noWrap = false;

    @query('.anchor')
    private anchorElement!: HTMLAnchorElement;

    public get focusElement(): HTMLElement {
        return this;
    }

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

    constructor() {
        super();
        this.proxyFocus = this.proxyFocus.bind(this);

        this.addEventListener('click', this.handleClickCapture, {
            capture: true,
        });
    }

    public click(): void {
        if (this.disabled) {
            return;
        }

        if (this.shouldProxyClick()) {
            return;
        }

        super.click();
    }

    private handleClickCapture(event: Event): void | boolean {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            return false;
        }
    }

    private proxyFocus(): void {
        this.focus();
    }

    private shouldProxyClick(): boolean {
        let handled = false;
        if (this.anchorElement) {
            this.anchorElement.click();
            handled = true;
        }
        return handled;
    }

    protected render(): TemplateResult {
        return html`
            <slot name="icon"></slot>
            <div id="label">
                <slot id="slot"></slot>
            </div>
            <slot name="value"></slot>
            ${this.selected
                ? html`
                      <sp-icon-checkmark100
                          id="selected"
                          class="spectrum-UIIcon-Checkmark100 icon checkmark"
                      ></sp-icon-checkmark100>
                  `
                : html``}
            ${this.href && this.href.length > 0
                ? super.renderAnchor({
                      id: 'button',
                      ariaHidden: true,
                      className: 'button anchor hidden',
                  })
                : html``}
        `;
    }

    private handleRemoveActive(): void {
        this.active = false;
    }

    private handlePointerdown(): void {
        this.active = true;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('tabindex', '-1');
        this.addEventListener('pointerdown', this.handlePointerdown);
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

    protected updated(changes: PropertyValues<this>): void {
        super.updated(changes);
        if (changes.has('label')) {
            this.setAttribute('aria-label', this.label || '');
        }
        if (changes.has('active')) {
            if (this.active) {
                this.addEventListener('pointerup', this.handleRemoveActive);
                this.addEventListener('pointerleave', this.handleRemoveActive);
            } else {
                this.removeEventListener('pointerup', this.handleRemoveActive);
                this.removeEventListener(
                    'pointerleave',
                    this.handleRemoveActive
                );
            }
        }
        if (this.anchorElement) {
            this.anchorElement.addEventListener('focus', this.proxyFocus);
            this.anchorElement.tabIndex = -1;
        }
        if (changes.has('selected')) {
            this.updateAriaSelected();
        }
    }

    public connectedCallback(): void {
        super.connectedCallback();
        addOrUpdateEvent.reset(this);
        this.dispatchEvent(addOrUpdateEvent);
        this._parentElement = this.parentElement as HTMLElement;
    }

    _parentElement!: HTMLElement;

    public disconnectedCallback(): void {
        removeEvent.reset(this);
        this._parentElement?.dispatchEvent(removeEvent);
        super.disconnectedCallback();
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
