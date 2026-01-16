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
    INPUT_COMPONENT_PATTERN,
    nothing,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    ObserveSlotPresence,
    ObserveSlotText,
    randomID,
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
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';

import menuItemStyles from './menu-item.css.js';
import checkmarkStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';
import type { Menu } from './Menu.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import type { Overlay } from '@spectrum-web-components/overlay';
import { SlottableRequestEvent } from '@spectrum-web-components/overlay/src/slottable-request-event.js';

/**
 * Duration during which a pointing device can leave an `<sp-menu-item>` element
 * and return to it or to the submenu opened from it before closing that submenu.
 **/
const POINTERLEAVE_TIMEOUT = 100;

type MenuCascadeItem = {
    hadFocusRoot: boolean;
    ancestorWithSelects?: HTMLElement;
};

/**
 * Fires when a menu item is added or updated so that a parent menu can track it.
 */
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

/**
 * Fires to forward keyboard event information to parent menu.
 */
export class MenuItemKeydownEvent extends KeyboardEvent {
    root?: MenuItem;
    private _event?: KeyboardEvent;
    constructor({ root, event }: { root?: MenuItem; event?: KeyboardEvent }) {
        super('sp-menu-item-keydown', { bubbles: true, composed: true });
        this.root = root;
        this._event = event;
    }

    public override get altKey(): boolean {
        return this._event?.altKey || false;
    }

    public override get code(): string {
        return this._event?.code || '';
    }

    public override get ctrlKey(): boolean {
        return this._event?.ctrlKey || false;
    }

    public override get isComposing(): boolean {
        return this._event?.isComposing || false;
    }

    public override get key(): string {
        return this._event?.key || '';
    }

    public override get location(): number {
        return this._event?.location || 0;
    }

    public override get metaKey(): boolean {
        return this._event?.metaKey || false;
    }

    public override get repeat(): boolean {
        return this._event?.repeat || false;
    }

    public override get shiftKey(): boolean {
        return this._event?.shiftKey || false;
    }
}

export type MenuItemChildren = { icon: Element[]; content: Node[] };

/**
 * @element sp-menu-item
 *
 * @slot - text content to display within the Menu Item
 * @slot description - description to be placed below the label of the Menu Item
 * @slot icon - icon element to be placed at the start of the Menu Item
 * @slot value - content placed at the end of the Menu Item like values, keyboard shortcuts, etc.
 * @slot submenu - content placed in a submenu
 * @fires sp-menu-item-added - announces the item has been added so a parent menu can take ownerships
 */
export class MenuItem extends LikeAnchor(
    ObserveSlotText(ObserveSlotPresence(Focusable, '[slot="icon"]'))
) {
    public static override get styles(): CSSResultArray {
        return [menuItemStyles, checkmarkStyles, chevronStyles];
    }

    abortControllerSubmenu!: AbortController;

    /**
     * whether the menu item is active or has an active descendant
     */
    @property({ type: Boolean, reflect: true })
    public active = false;

    private dependencyManager = new DependencyManagerController(this);

    /**
     * whether the menu item has keyboard focus
     */
    @property({ type: Boolean, reflect: true })
    public focused = false;

    /**
     * whether the menu item is selected
     */
    @property({ type: Boolean, reflect: true })
    public selected = false;

    /**
     * value of the menu item which is used for selection
     */
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
     * text content of the menu item minus whitespace
     */
    public get itemText(): string {
        return this.itemChildren.content.reduce(
            (acc, node) => acc + (node.textContent || '').trim(),
            ''
        );
    }

    /**
     * whether the menu item has a submenu
     */
    @property({ type: Boolean, reflect: true, attribute: 'has-submenu' })
    public hasSubmenu = false;

    @query('slot:not([name])')
    contentSlot!: HTMLSlotElement;

    @query('slot[name="icon"]')
    iconSlot!: HTMLSlotElement;

    /**
     * whether menu item text content should not wrap
     */
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

    private submenuElement?: HTMLElement;

    /**
     * the focusable element of the menu item
     */
    public override get focusElement(): HTMLElement {
        return this;
    }

    protected get hasIcon(): boolean {
        return this.slotContentIsPresent;
    }

    public get itemChildren(): MenuItemChildren {
        if (!this.iconSlot || !this.contentSlot) {
            return {
                icon: [],
                content: [],
            };
        }
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
        this.addEventListener('focus', this.handleFocus);
        this.addEventListener('blur', this.handleBlur);

        new MutationController(this, {
            config: {
                characterData: true,
                childList: true,
                subtree: true,
                attributeFilter: ['src'],
            },
            callback: (mutations) => {
                const isSubmenu = mutations.every(
                    (mutation) =>
                        (mutation.target as HTMLElement).slot === 'submenu'
                );
                if (isSubmenu) {
                    return;
                }
                this.breakItemChildrenCache();
            },
        });
    }

    /**
     * whether submenu is open
     */
    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * whether menu item's submenu is opened via keyboard
     */
    private _openedViaKeyboard = false;

    /**
     * whether menu item's submenu is closed via pointer leave
     */
    private _closedViaPointer = false;

    /**
     * Touch interaction state for submenu toggling
     */
    private _activePointerId?: number;
    private _touchHandledViaPointerup = false;
    private _touchAbortController?: AbortController;

    private handleClickCapture(event: Event): void | boolean {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            return false;
        }

        if (this.shouldProxyClick()) {
            return;
        }
    }

    private handleSlottableRequest = (event: SlottableRequestEvent): void => {
        this.submenuElement?.dispatchEvent(
            new SlottableRequestEvent(event.name, event.data)
        );
    };

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
        this.dependencyManager.add('sp-overlay');
        this.dependencyManager.add('sp-popover');
        import('@spectrum-web-components/overlay/sp-overlay.js');
        import('@spectrum-web-components/popover/sp-popover.js');
        return html`
            <sp-overlay
                receives-focus="false"
                .triggerElement=${this as HTMLElement}
                ?disabled=${!this.hasSubmenu}
                ?open=${this.hasSubmenu &&
                this.open &&
                this.dependencyManager.loaded}
                .placement=${this.isLTR ? 'right-start' : 'left-start'}
                receives-focus="false"
                .offset=${[-10, 0] as [number, number]}
                .type=${'auto'}
                @close=${(event: Event) => event.stopPropagation()}
                @slottable-request=${this.handleSlottableRequest}
            >
                <sp-popover
                    style="margin-block-start: var(--system-submenu-offset-block, -5px)"
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
            ${this.selected
                ? html`
                      <sp-icon-checkmark100
                          id="selected"
                          class="spectrum-UIIcon-Checkmark100
                            icon
                            checkmark
                            ${this.hasIcon
                              ? 'checkmark--withAdjacentIcon'
                              : ''}"
                      ></sp-icon-checkmark100>
                  `
                : nothing}
            <slot name="icon"></slot>
            <div id="label">
                <slot id="slot"></slot>
            </div>
            <slot name="description"></slot>
            <slot name="value"></slot>
            ${this.href && this.href.length > 0
                ? super.renderAnchor({
                      id: 'button',
                      ariaHidden: true,
                      className: 'button anchor hidden',
                  })
                : nothing}
            ${this.renderSubmenu()}
        `;
    }

    /**
     * determines if item has a submenu and updates the `aria-haspopup` attribute
     */
    protected manageSubmenu(event: Event & { target: HTMLSlotElement }): void {
        this.submenuElement = event.target.assignedElements({
            flatten: true,
        })[0] as HTMLElement;
        this.hasSubmenu = !!this.submenuElement;
        if (this.hasSubmenu) {
            this.setAttribute('aria-haspopup', 'true');
        }
    }

    private handlePointerdown(event: PointerEvent): void {
        const path = event.composedPath();
        const targetIsInOverlay =
            this.overlayElement && path.includes(this.overlayElement);

        if (
            event.pointerType === 'touch' &&
            this.hasSubmenu &&
            !targetIsInOverlay &&
            this._activePointerId === undefined
        ) {
            this._activePointerId = event.pointerId;
            this._touchAbortController = new AbortController();

            window.addEventListener(
                'pointerup',
                this.handleTouchSubmenuToggle,
                { once: true, signal: this._touchAbortController.signal }
            );
            window.addEventListener('pointercancel', this.handleTouchCleanup, {
                once: true,
                signal: this._touchAbortController.signal,
            });
        }

        if (
            !targetIsInOverlay &&
            this.hasSubmenu &&
            this.open &&
            event.pointerType !== 'touch'
        ) {
            this.addEventListener('focus', this.handleSubmenuFocus, {
                once: true,
            });
            this.overlayElement?.addEventListener(
                'beforetoggle',
                this.handleBeforetoggle
            );
        }
    }

    private handleTouchSubmenuToggle = (event: PointerEvent): void => {
        if (event.pointerId !== this._activePointerId) {
            return;
        }

        this._touchAbortController?.abort();
        this._touchHandledViaPointerup = true;
        this._activePointerId = undefined;

        if (this.open) {
            this.open = false;
        } else {
            this.openOverlay();
        }

        setTimeout(() => {
            this._touchHandledViaPointerup = false;
        }, 0);
    };

    private handleTouchCleanup = (event: PointerEvent): void => {
        if (event.pointerId !== this._activePointerId) {
            return;
        }
        this._touchAbortController?.abort();
        this._activePointerId = undefined;
        this._touchHandledViaPointerup = false;
    };

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('tabindex', '-1');
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('mouseover', this.handleMouseover);
        this.addEventListener('pointerdown', this.handlePointerdown);
        this.addEventListener('pointerenter', this.closeOverlaysForRoot);
        if (!this.hasAttribute('id')) {
            this.id = `sp-menu-item-${randomID()}`;
        }
    }

    private getActiveElementSafely(): HTMLElement | null {
        let root = this.getRootNode() as Document | ShadowRoot;
        let activeElement = root.activeElement as HTMLElement;

        // If no active element in current context and we're in shadow DOM,
        // traverse up to find the document-level active element
        if (!activeElement && root !== document) {
            while (root && root !== document && 'host' in root) {
                root = (root as ShadowRoot).host.getRootNode() as
                    | Document
                    | ShadowRoot;
                activeElement = root.activeElement as HTMLElement;
                if (activeElement) break;
            }
        }

        return activeElement;
    }

    handleMouseover(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        if (target === this) {
            // Check for active input elements across shadow boundaries
            const activeElement = this.getActiveElementSafely();

            // Only focus this menu item if no input element is currently active
            // This prevents interrupting user input in search boxes, text fields, etc.
            if (!activeElement || !this.isInputElement(activeElement)) {
                this.focus();
            }
            this.focused = false;
        }
    }

    /**
     * Determines if an element is an input field that should retain focus.
     * Uses multiple detection strategies to identify input elements generically.
     */
    private isInputElement(element: HTMLElement): boolean {
        // Check for native HTML input elements
        if (this.isNativeInputElement(element)) {
            return true;
        }

        // Check for contenteditable elements (rich text editors)
        if (element.contentEditable === 'true') {
            return true;
        }

        // Check for Spectrum Web Components with input-like behavior
        if (this.isSpectrumInputComponent(element)) {
            return true;
        }

        return false;
    }

    /**
     * Checks if an element is a native HTML input element.
     */
    private isNativeInputElement(element: HTMLElement): boolean {
        return (
            element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement
        );
    }

    /**
     * Checks if an element is a Spectrum Web Component with input behavior.
     * Uses ARIA roles and component patterns for generic detection.
     */
    private isSpectrumInputComponent(element: HTMLElement): boolean {
        // Check if it's a Spectrum Web Component
        if (!element.tagName.startsWith('SP-')) {
            return false;
        }

        // Check ARIA role for input-like behavior
        const role = element.getAttribute('role');
        const inputRoles = ['textbox', 'searchbox', 'combobox', 'slider'];
        if (role && inputRoles.includes(role)) {
            return true;
        }

        // Check for components that typically contain input elements
        // This covers components like sp-search, sp-textfield, sp-number-field, etc.
        const inputComponentPattern = INPUT_COMPONENT_PATTERN;
        if (inputComponentPattern.test(element.tagName)) {
            return true;
        }

        return false;
    }
    /**
     * forward key info from keydown event to parent menu
     */
    handleKeydown = (event: KeyboardEvent): void => {
        const { target, key } = event;
        const openSubmenuKey =
            this.hasSubmenu && !this.open && [' ', 'Enter'].includes(key);
        if (target === this) {
            if (
                ['ArrowLeft', 'ArrowRight', 'Escape'].includes(key) ||
                openSubmenuKey
            )
                event.preventDefault();
            this.dispatchEvent(
                new MenuItemKeydownEvent({ root: this, event: event })
            );
        }
    };

    protected closeOverlaysForRoot(): void {
        if (this.open) return;
        this.menuData.parentMenu?.closeDescendentOverlays();
    }

    protected handleFocus(event: FocusEvent): void {
        const { target } = event;
        if (target === this) {
            this.focused = true;
        }
    }

    protected handleBlur(event: FocusEvent): void {
        const { target } = event;
        if (target === this) {
            this.focused = false;
        }
    }

    protected handleSubmenuClick(event: Event): void {
        if (this._touchHandledViaPointerup) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }

        if (event.composedPath().includes(this.overlayElement)) {
            return;
        }

        this.openOverlay(true);
    }

    protected handleSubmenuFocus(): void {
        requestAnimationFrame(() => {
            // Wait till after `closeDescendentOverlays` has happened in Menu
            // to reopen (keep open) the direct descendent of this Menu Item
            this.overlayElement.open = this.open;
            this.focused = false;
        });
    }

    protected handleBeforetoggle = (event: Event): void => {
        if ((event as Event & { newState: string }).newState === 'closed') {
            this.open = true;
            this.overlayElement.manuallyKeepOpen();
            this.overlayElement.removeEventListener(
                'beforetoggle',
                this.handleBeforetoggle
            );
        }
    };

    protected handlePointerenter(event: PointerEvent): void {
        // For touch devices, don't open on pointerenter - let click handle it
        if (event.pointerType === 'touch') {
            return;
        }

        if (this.leaveTimeout) {
            clearTimeout(this.leaveTimeout);
            delete this.leaveTimeout;
            this.recentlyLeftChild = false;
            return;
        }
        this.focus();
        this.openOverlay();
    }

    protected leaveTimeout?: ReturnType<typeof setTimeout>;
    protected recentlyLeftChild = false;

    protected handlePointerleave(event: PointerEvent): void {
        // For touch devices, don't close on pointerleave - let click handle it
        if (event.pointerType === 'touch') {
            return;
        }

        this._closedViaPointer = true;
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
        this.recentlyLeftChild = false;
    }

    protected handleSubmenuOpen(event: Event): void {
        const parentOverlay = event.composedPath().find((el) => {
            return (
                el !== this.overlayElement &&
                (el as HTMLElement).localName === 'sp-overlay'
            );
        }) as Overlay;
        if (this._openedViaKeyboard) {
            this.submenuElement?.focus();
        }
        this.overlayElement.parentOverlayToForceClose = parentOverlay;
    }

    protected cleanup(): void {
        this._closedViaPointer = false;
        this.setAttribute('aria-expanded', 'false');
        this.open = false;
        this.active = false;
    }

    public async openOverlay(shouldFocus: boolean = false): Promise<void> {
        if (!this.hasSubmenu || this.open || this.disabled) {
            return;
        }
        this.open = true;
        this.active = true;
        this.setAttribute('aria-expanded', 'true');
        this._openedViaKeyboard = shouldFocus;
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

    protected override willUpdate(changes: PropertyValues<this>): void {
        super.updated(changes);

        // make sure focus returns to the anchor element when submenu is closed
        if (
            changes.has('open') &&
            !this.open &&
            this.hasSubmenu &&
            !this._closedViaPointer &&
            this.matches(':focus-within')
        ) {
            this.focus();
        }
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
                this.abortControllerSubmenu = new AbortController();
                const options = { signal: this.abortControllerSubmenu.signal };
                this.addEventListener(
                    'click',
                    this.handleSubmenuClick,
                    options
                );
                this.addEventListener(
                    'pointerenter',
                    this.handlePointerenter,
                    options
                );
                this.addEventListener(
                    'pointerleave',
                    this.handlePointerleave,
                    options
                );
                this.addEventListener(
                    'sp-opened',
                    this.handleSubmenuOpen,
                    options
                );
            } else {
                this.abortControllerSubmenu?.abort();
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
        this.menuData = {
            focusRoot: undefined,
            parentMenu: undefined,
            selectionRoot: undefined,
            cleanupSteps: [],
        };

        // Clean up any active touch listeners
        this._touchAbortController?.abort();
        this._activePointerId = undefined;
        this._touchHandledViaPointerup = false;

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

    public override focus(): void {
        super.focus();
        // ensure focus event fires in Chromium for tests
        this.dispatchEvent(new FocusEvent('focus'));
    }

    public override blur(): void {
        // ensure focus event fires in Chromium for tests
        this.dispatchEvent(new FocusEvent('blur'));
        super.blur();
    }

    public dispatchUpdate(): void {
        if (!this.isConnected) {
            return;
        }
        this.dispatchEvent(new MenuItemAddedOrUpdatedEvent(this));
        this.willDispatchUpdate = false;
    }

    public menuData: {
        focusRoot?: Menu;
        parentMenu?: Menu;
        selectionRoot?: Menu;
        cleanupSteps: ((item: MenuItem) => void)[];
    } = {
        // menu that controls ArrowUp/ArrowDown navigation
        focusRoot: undefined,
        parentMenu: undefined,
        // menu or menu group that controls selection
        selectionRoot: undefined,
        cleanupSteps: [],
    };
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-menu-item-added-or-updated': MenuItemAddedOrUpdatedEvent;
    }
}
