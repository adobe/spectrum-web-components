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
    ObserveSlotPresence,
    ObserveSlotText,
} from '@spectrum-web-components/shared';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';

import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import { openOverlay } from '@spectrum-web-components/overlay/src/loader.js';
import { OverlayCloseEvent } from '@spectrum-web-components/overlay/src/overlay-events.js';

import menuItemStyles from './menu-item.css.js';
import checkmarkStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';
import type { Menu } from './Menu.js';
import type { OverlayOpenCloseDetail } from '@spectrum-web-components/overlay';
import { reparentChildren } from '@spectrum-web-components/shared/src/reparent-children.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

/**
 * Duration during which a pointing device can leave an `<sp-menu-item>` element
 * and return to it or to the submenu opened from it before closing that submenu.
 **/
const POINTERLEAVE_TIMEOUT = 100;

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
    set focusRoot(root: Menu | undefined) {
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

export type MenuItemChildren = { icon: Element[]; content: Node[] };

let addOrUpdateEvent = new MenuItemAddedOrUpdatedEvent();
let removeEvent = new MenuItemRemovedEvent();
/**
 * Code to cleanup these global events async in batches
 */
let addOrUpdateEventRafId = 0;
function resetAddOrUpdateEvent(): void {
    if (addOrUpdateEventRafId === 0) {
        addOrUpdateEventRafId = requestAnimationFrame(() => {
            addOrUpdateEvent = new MenuItemAddedOrUpdatedEvent();
            addOrUpdateEventRafId = 0;
        });
    }
}
let removeEventEventtRafId = 0;
function resetRemoveEvent(): void {
    if (removeEventEventtRafId === 0) {
        removeEventEventtRafId = requestAnimationFrame(() => {
            removeEvent = new MenuItemRemovedEvent();
            removeEventEventtRafId = 0;
        });
    }
}

/**
 * @element sp-menu-item
 *
 * @slot - text content to display within the Menu Item
 * @slot icon - icon element to be placed at the start of the Menu Item
 * @slot value - content placed at the end of the Menu Item like values, keyboard shortcuts, etc.
 * @slot submenu - content placed in a submenu
 * @fires sp-menu-item-added - announces the item has been added so a parent menu can take ownerships
 * @fires sp-menu-item-removed - announces when removed from the DOM so the parent menu can remove ownership and update selected state
 */
export class MenuItem extends LikeAnchor(
    ObserveSlotText(ObserveSlotPresence(Focusable, '[slot="icon"]'))
) {
    public static override get styles(): CSSResultArray {
        return [menuItemStyles, checkmarkStyles, chevronStyles];
    }

    static instanceCount = 0;

    private isInSubmenu = false;

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

    public override get focusElement(): HTMLElement {
        return this;
    }

    protected get hasIcon(): boolean {
        return this.slotContentIsPresent;
    }

    public get itemChildren(): MenuItemChildren {
        if (this._itemChildren) {
            return this._itemChildren;
        }

        const iconSlot = this.shadowRoot?.querySelector(
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
        const contentSlot = this.shadowRoot?.querySelector(
            'slot:not([name])'
        ) as HTMLSlotElement;
        const content = !contentSlot
            ? []
            : contentSlot.assignedNodes().map((node) => node.cloneNode(true));
        this._itemChildren = { icon, content };

        return this._itemChildren;
    }

    private _itemChildren?: MenuItemChildren;

    constructor() {
        super();
        this.proxyFocus = this.proxyFocus.bind(this);

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

    @property({ type: Boolean })
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

    protected breakItemChildrenCache(): void {
        this._itemChildren = undefined;
        this.triggerUpdate();
    }

    protected override render(): TemplateResult {
        return html`
            ${this.selected
                ? html`
                      <sp-icon-checkmark100
                          id="selected"
                          class="spectrum-UIIcon-Checkmark100 
                            icon 
                            checkmark 
                            ${this.hasIcon
                              ? 'checkmark--withAdjacentIcon'
                              : 'checkmark--withAdjacentText'}"
                      ></sp-icon-checkmark100>
                  `
                : html``}
            <slot name="icon"></slot>
            <div id="label">
                <slot id="slot"></slot>
            </div>
            <slot name="value"></slot>
            ${this.href && this.href.length > 0
                ? super.renderAnchor({
                      id: 'button',
                      ariaHidden: true,
                      className: 'button anchor hidden',
                  })
                : html``}

            <slot
                hidden
                name="submenu"
                @slotchange=${this.manageSubmenu}
            ></slot>
            ${this.hasSubmenu
                ? html`
                      <sp-icon-chevron100
                          class="spectrum-UIIcon-ChevronRight100
                        chevron 
                        icon 
                        ${this.hasIcon
                              ? 'chevron--withAdjacentIcon'
                              : 'chevron--withAdjacentText'}"
                      ></sp-icon-chevron100>
                  `
                : html``}
        `;
    }

    protected manageSubmenu(event: Event & { target: HTMLSlotElement }): void {
        const assignedElements = event.target.assignedElements({
            flatten: true,
        });
        this.hasSubmenu = this.open || !!assignedElements;
        if (this.hasSubmenu) {
            this.setAttribute('aria-haspopup', 'true');
        }
    }

    private handleRemoveActive(event: Event): void {
        if (
            (event.type === 'pointerleave' && this.hasSubmenu) ||
            this.hasSubmenu ||
            this.open
        ) {
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
        if (!this.hasAttribute('id')) {
            this.id = `sp-menu-item-${MenuItem.instanceCount++}`;
        }
        this.addEventListener('pointerenter', this.closeOverlaysForRoot);
    }

    protected closeOverlaysForRoot(): void {
        if (this.open) return;
        const overalyCloseEvent = new OverlayCloseEvent({
            root: this.menuData.focusRoot,
        });
        this.dispatchEvent(overalyCloseEvent);
    }

    public closeOverlay?: () => Promise<void>;

    protected handleSubmenuClick(): void {
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

    protected handlePointerleave(): void {
        if (this.hasSubmenu && this.open) {
            this.leaveTimeout = setTimeout(() => {
                delete this.leaveTimeout;
                if (this.closeOverlay) this.closeOverlay();
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
    protected handleSubmenuChange = (): void => {
        this.menuData.selectionRoot?.selectOrToggleItem(this);
    };

    protected handleSubmenuPointerenter = (): void => {
        if (this.leaveTimeout) {
            clearTimeout(this.leaveTimeout);
            delete this.leaveTimeout;
        }
    };

    public async openOverlay(): Promise<void> {
        if (!this.hasSubmenu || this.open || this.disabled) {
            return;
        }
        this.open = true;
        this.active = true;
        this.setAttribute('aria-expanded', 'true');
        const submenu = (
            this.shadowRoot.querySelector(
                'slot[name="submenu"]'
            ) as HTMLSlotElement
        ).assignedElements()[0] as Menu;
        submenu.addEventListener(
            'pointerenter',
            this.handleSubmenuPointerenter
        );
        submenu.addEventListener('change', this.handleSubmenuChange);
        if (!submenu.id) {
            submenu.setAttribute('id', `${this.id}-submenu`);
        }
        this.setAttribute('aria-controls', submenu.id);
        const popover = document.createElement('sp-popover');
        const returnSubmenu = reparentChildren([submenu], popover, {
            position: 'beforeend',
            prepareCallback: (el) => {
                const slotName = el.slot;
                el.tabIndex = 0;
                el.removeAttribute('slot');
                el.isSubmenu = true;
                return (el) => {
                    el.tabIndex = -1;
                    el.slot = slotName;
                    el.isSubmenu = false;
                };
            },
        });
        const closeOverlay = openOverlay(this, 'click', popover, {
            placement: this.isLTR ? 'right-start' : 'left-start',
            receivesFocus: 'auto',
            root: this.menuData.focusRoot,
        });
        const closeSubmenu = async (): Promise<void> => {
            this.setAttribute('aria-expanded', 'false');
            delete this.closeOverlay;
            (await closeOverlay)();
        };
        this.closeOverlay = closeSubmenu;
        const cleanup = (event: CustomEvent<OverlayOpenCloseDetail>): void => {
            event.stopPropagation();
            delete this.closeOverlay;
            returnSubmenu();
            this.open = false;
            this.active = false;
        };
        this.addEventListener('sp-closed', cleanup as EventListener, {
            once: true,
        });
        popover.addEventListener('change', closeSubmenu);
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
        if (changes.has('label')) {
            this.setAttribute('aria-label', this.label || '');
        }
        if (changes.has('active')) {
            if (this.active) {
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
        if (changes.has('hasSubmenu')) {
            if (this.hasSubmenu) {
                this.addEventListener('click', this.handleSubmenuClick);
                this.addEventListener('pointerenter', this.handlePointerenter);
                this.addEventListener('pointerleave', this.handlePointerleave);
            } else if (!this.closeOverlay) {
                this.removeEventListener('click', this.handleSubmenuClick);
                this.removeEventListener(
                    'pointerenter',
                    this.handlePointerenter
                );
                this.removeEventListener(
                    'pointerleave',
                    this.handlePointerleave
                );
            }
        }
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.isInSubmenu = !!this.closest('[slot="submenu"]');
        if (this.isInSubmenu) {
            return;
        }
        addOrUpdateEvent.reset(this);
        this.dispatchEvent(addOrUpdateEvent);
        resetAddOrUpdateEvent();
        this._parentElement = this.parentElement as HTMLElement;
    }

    _parentElement!: HTMLElement;

    public override disconnectedCallback(): void {
        if (!this.isInSubmenu && this._parentElement) {
            removeEvent.reset(this);
            this._parentElement.dispatchEvent(removeEvent);
            resetRemoveEvent();
        }
        this.isInSubmenu = false;
        this._itemChildren = undefined;
        super.disconnectedCallback();
    }

    public async triggerUpdate(): Promise<void> {
        if (this.isInSubmenu) {
            return;
        }
        await new Promise((ready) => requestAnimationFrame(ready));
        addOrUpdateEvent.reset(this);
        this.dispatchEvent(addOrUpdateEvent);
        resetAddOrUpdateEvent();
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
