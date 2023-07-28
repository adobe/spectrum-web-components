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
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';

import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';

import menuItemStyles from './menu-item.css.js';
import checkmarkStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';
import type { Menu } from './Menu.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import type { Overlay } from 'overlay/src/Overlay.js';

/**
 * Duration during which a pointing device can leave an `<sp-menu-item>` element
 * and return to it or to the submenu opened from it before closing that submenu.
 **/
const POINTERLEAVE_TIMEOUT = 100;

type MenuCascadeItem = {
    hadFocusRoot: boolean;
    ancestorWithSelects?: HTMLElement;
};

export class MenuItemAddedOrUpdatedEvent extends Event {
    constructor(item: MenuItem) {
        super('sp-menu-item-added-or-updated', {
            bubbles: true,
            composed: true,
        });
        this.clear(item);
    }
    clear(item: MenuItem): void {
        this._item = item;
        this.currentAncestorWithSelects = undefined;
        item.menuData = {
            cleanupSteps: [],
            focusRoot: undefined,
            selectionRoot: undefined,
            parentMenu: undefined,
        };
        this.menuCascade = new WeakMap<HTMLElement, MenuCascadeItem>();
    }
    menuCascade = new WeakMap<HTMLElement, MenuCascadeItem>();
    get item(): MenuItem {
        return this._item;
    }
    private _item!: MenuItem;
    currentAncestorWithSelects?: Menu;
}

export type MenuItemChildren = { icon: Element[]; content: Node[] };

/**
 * @element sp-menu-item
 *
 * @slot - text content to display within the Menu Item
 * @slot icon - icon element to be placed at the start of the Menu Item
 * @slot value - content placed at the end of the Menu Item like values, keyboard shortcuts, etc.
 * @slot submenu - content placed in a submenu
 * @fires sp-menu-item-added - announces the item has been added so a parent menu can take ownerships
 */
export class MenuItem extends LikeAnchor(Focusable) {
    public static override get styles(): CSSResultArray {
        return [menuItemStyles, checkmarkStyles, chevronStyles];
    }

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
        return this.itemChildren.content.reduce(
            (acc, node) => acc + (node.textContent || '').trim(),
            ''
        );
    }

    @property({ type: Boolean })
    public hasSubmenu = false;

    @query('slot:not([name])')
    contentSlot!: HTMLSlotElement;

    @query('slot[name="icon"]')
    iconSlot!: HTMLSlotElement;

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

    @query('sp-overlay')
    public overlayElement!: Overlay;

    public override get focusElement(): HTMLElement {
        return this;
    }

    public get itemChildren(): MenuItemChildren {
        if (this._itemChildren) {
            return this._itemChildren;
        }
        const icon = this.iconSlot.assignedElements().map((element) => {
            const newElement = element.cloneNode(true) as HTMLElement;
            newElement.removeAttribute('slot');
            newElement.classList.toggle('icon');
            return newElement;
        });
        const content = this.contentSlot
            .assignedNodes()
            .map((node) => node.cloneNode(true));
        this._itemChildren = { icon, content };

        return this._itemChildren;
    }

    private _itemChildren?: MenuItemChildren;

    constructor() {
        super();
        this.addEventListener('click', this.handleClickCapture, {
            capture: true,
        });

        new MutationController(this, {
            config: {
                characterData: true,
                childList: true,
                subtree: true,
            },
            callback: () => {
                this.breakItemChildrenCache();
            },
        });
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    public override click(): void {
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

    private proxyFocus = (): void => {
        this.focus();
    };

    private shouldProxyClick(): boolean {
        let handled = false;
        if (this.anchorElement) {
            this.anchorElement.click();
            handled = true;
        }
        return handled;
    }

    protected breakItemChildrenCache(): void {
        this._itemChildren = undefined;
        this.triggerUpdate();
    }

    protected renderSubmenu(): TemplateResult {
        const slot = html`
            <slot
                name="submenu"
                @slotchange=${this.manageSubmenu}
                @sp-menu-item-added-or-updated=${{
                    handleEvent: (event: MenuItemAddedOrUpdatedEvent) => {
                        event.clear(event.item);
                    },
                    capture: true,
                }}
                @focusin=${(event: Event) => event.stopPropagation()}
            ></slot>
        `;
        if (!this.hasSubmenu) {
            return slot;
        }
        return html`
            <sp-overlay
                .triggerElement=${this as HTMLElement}
                ?disabled=${!this.hasSubmenu}
                ?open=${this.hasSubmenu && this.open}
                .placement=${this.isLTR ? 'right-start' : 'left-start'}
                .offset=${[-10, -4] as [number, number]}
                .type=${'auto'}
                @close=${(event: Event) => event.stopPropagation()}
            >
                <sp-popover
                    @change=${(event: Event) => {
                        this.handleSubmenuChange(event);
                        this.open = false;
                    }}
                    @pointerenter=${this.handleSubmenuPointerenter}
                    @pointerleave=${this.handleSubmenuPointerleave}
                    @sp-menu-item-added-or-updated=${(event: Event) =>
                        event.stopPropagation()}
                >
                    ${slot}
                </sp-popover>
            </sp-overlay>
            <sp-icon-chevron100
                class="spectrum-UIIcon-ChevronRight100 chevron icon"
            ></sp-icon-chevron100>
        `;
    }

    protected override render(): TemplateResult {
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
            ${this.renderSubmenu()}
        `;
    }

    protected manageSubmenu(event: Event & { target: HTMLSlotElement }): void {
        const assignedElements = event.target.assignedElements({
            flatten: true,
        });
        this.hasSubmenu = !!assignedElements.length;
        if (this.hasSubmenu) {
            this.setAttribute('aria-haspopup', 'true');
        }
    }

    private handleRemoveActive(): void {
        if (this.open) {
            return;
        }
        this.active = false;
    }

    private handlePointerdown(): void {
        this.active = true;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('tabindex', '-1');
        this.addEventListener('pointerdown', this.handlePointerdown);
        this.addEventListener('pointerenter', this.closeOverlaysForRoot);
        if (!this.hasAttribute('id')) {
            this.id = `sp-menu-item-${crypto.randomUUID().slice(0, 8)}`;
        }
    }

    protected closeOverlaysForRoot(): void {
        if (this.open) return;
        this.menuData.parentMenu?.closeDescendentOverlays();
    }

    protected handleSubmenuClick(event: Event): void {
        if (event.composedPath().includes(this.overlayElement)) {
            return;
        }
        this.openOverlay();
    }

    protected handlePointerenter(): void {
        if (this.leaveTimeout) {
            clearTimeout(this.leaveTimeout);
            delete this.leaveTimeout;
            return;
        }
        this.openOverlay();
    }

    protected leaveTimeout?: ReturnType<typeof setTimeout>;
    protected recentlyLeftChild = false;

    protected handlePointerleave(): void {
        if (this.open && !this.recentlyLeftChild) {
            this.leaveTimeout = setTimeout(() => {
                delete this.leaveTimeout;
                this.open = false;
            }, POINTERLEAVE_TIMEOUT);
        }
    }

    /**
     * When there is a `change` event in the submenu for this item
     * then we "click" this item to cascade the selection up the
     * menu tree allowing all submenus between the initial selection
     * and the root of the tree to have their selection changes and
     * be closed.
     */
    protected handleSubmenuChange(event: Event): void {
        event.stopPropagation();
        this.menuData.selectionRoot?.selectOrToggleItem(this);
    }

    protected handleSubmenuPointerenter(): void {
        this.recentlyLeftChild = true;
    }

    protected async handleSubmenuPointerleave(): Promise<void> {
        requestAnimationFrame(() => {
            this.recentlyLeftChild = false;
        });
    }

    protected handleSubmenuOpen(event: Event): void {
        this.focused = false;
        const parentOverlay = event.composedPath().find((el) => {
            return (
                el !== this.overlayElement &&
                (el as HTMLElement).localName === 'sp-overlay'
            );
        }) as Overlay;
        this.overlayElement.parentOverlayToForceClose = parentOverlay;
    }

    protected cleanup(): void {
        this.open = false;
        this.active = false;
    }

    public async openOverlay(): Promise<void> {
        if (!this.hasSubmenu || this.open || this.disabled) {
            return;
        }
        this.open = true;
        this.active = true;
        this.setAttribute('aria-expanded', 'true');
        this.addEventListener('sp-closed', this.cleanup, {
            once: true,
        });
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

    protected override updated(changes: PropertyValues<this>): void {
        super.updated(changes);
        if (
            changes.has('label') &&
            (this.label || typeof changes.get('label') !== 'undefined')
        ) {
            this.setAttribute('aria-label', this.label || '');
        }
        if (
            changes.has('active') &&
            (this.active || typeof changes.get('active') !== 'undefined')
        ) {
            if (this.active) {
                this.menuData.selectionRoot?.closeDescendentOverlays();
                this.addEventListener('pointerup', this.handleRemoveActive);
                this.addEventListener('pointerleave', this.handleRemoveActive);
                this.addEventListener('pointercancel', this.handleRemoveActive);
            } else {
                this.removeEventListener('pointerup', this.handleRemoveActive);
                this.removeEventListener(
                    'pointerleave',
                    this.handleRemoveActive
                );
                this.removeEventListener(
                    'pointercancel',
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
        if (
            changes.has('hasSubmenu') &&
            (this.hasSubmenu ||
                typeof changes.get('hasSubmenu') !== 'undefined')
        ) {
            if (this.hasSubmenu) {
                this.addEventListener('click', this.handleSubmenuClick);
                this.addEventListener('pointerenter', this.handlePointerenter);
                this.addEventListener('pointerleave', this.handlePointerleave);
                this.addEventListener('sp-opened', this.handleSubmenuOpen);
            } else {
                this.removeEventListener('click', this.handleSubmenuClick);
                this.removeEventListener(
                    'pointerenter',
                    this.handlePointerenter
                );
                this.removeEventListener(
                    'pointerleave',
                    this.handlePointerleave
                );
                this.removeEventListener('sp-opened', this.handleSubmenuOpen);
            }
        }
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.triggerUpdate();
    }

    _parentElement!: HTMLElement;

    public override disconnectedCallback(): void {
        this.menuData.cleanupSteps.forEach((removal) => removal(this));
        super.disconnectedCallback();
    }

    private willDispatchUpdate = false;

    public async triggerUpdate(): Promise<void> {
        if (this.willDispatchUpdate) {
            return;
        }
        this.willDispatchUpdate = true;
        await new Promise((ready) => requestAnimationFrame(ready));
        this.dispatchUpdate();
    }

    public dispatchUpdate(): void {
        this.dispatchEvent(new MenuItemAddedOrUpdatedEvent(this));
        this.willDispatchUpdate = false;
    }

    public menuData: {
        focusRoot?: Menu;
        parentMenu?: Menu;
        selectionRoot?: Menu;
        cleanupSteps: ((item: MenuItem) => void)[];
    } = {
        focusRoot: undefined,
        parentMenu: undefined,
        selectionRoot: undefined,
        cleanupSteps: [],
    };
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-menu-item-added-or-updated': MenuItemAddedOrUpdatedEvent;
    }
}
