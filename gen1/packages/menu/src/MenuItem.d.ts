/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import type { Overlay } from '@spectrum-web-components/overlay';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import type { Menu } from './Menu.js';
type MenuCascadeItem = {
    hadFocusRoot: boolean;
    ancestorWithSelects?: HTMLElement;
};
/**
 * Fires when a menu item is added or updated so that a parent menu can track it.
 */
export declare class MenuItemAddedOrUpdatedEvent extends Event {
    constructor(item: MenuItem);
    clear(item: MenuItem): void;
    menuCascade: WeakMap<HTMLElement, MenuCascadeItem>;
    get item(): MenuItem;
    private _item;
    currentAncestorWithSelects?: Menu;
}
/**
 * Fires to forward keyboard event information to parent menu.
 */
export declare class MenuItemKeydownEvent extends KeyboardEvent {
    root?: MenuItem;
    private _event?;
    constructor({ root, event }: {
        root?: MenuItem;
        event?: KeyboardEvent;
    });
    get altKey(): boolean;
    get code(): string;
    get ctrlKey(): boolean;
    get isComposing(): boolean;
    get key(): string;
    get location(): number;
    get metaKey(): boolean;
    get repeat(): boolean;
    get shiftKey(): boolean;
    /**
     * Original `KeyboardEvent` that triggered this forwarded event,
     * exposed so listeners on the parent menu can call
     * `preventDefault()`/`stopPropagation()` on the underlying event.
     */
    get nativeEvent(): KeyboardEvent | undefined;
}
export type MenuItemChildren = {
    icon: Element[];
    content: Node[];
};
declare const MenuItem_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared").SlotPresenceObservingInterface;
    prototype: import("@spectrum-web-components/shared").SlotPresenceObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared").SlotTextObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared").LikeAnchorInterface;
};
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
export declare class MenuItem extends MenuItem_base {
    static get styles(): CSSResultArray;
    abortControllerSubmenu: AbortController;
    /**
     * whether the menu item is active or has an active descendant
     */
    active: boolean;
    private dependencyManager;
    /**
     * whether the menu item has keyboard focus
     */
    focused: boolean;
    /**
     * whether the menu item is selected
     */
    selected: boolean;
    /**
     * value of the menu item which is used for selection
     */
    get value(): string;
    set value(value: string);
    private _value;
    /**
     * @private
     * text content of the menu item minus whitespace
     */
    get itemText(): string;
    /**
     * whether the menu item has a submenu
     */
    hasSubmenu: boolean;
    contentSlot: HTMLSlotElement;
    iconSlot: HTMLSlotElement;
    /**
     * whether menu item text content should not wrap
     */
    noWrap: boolean;
    private anchorElement;
    overlayElement: Overlay;
    /**
     * Reference to the slotted submenu element, captured by `manageSubmenu`.
     * Public so the parent `<sp-menu>` can project this submenu for mobile
     * drill-down and so tests can assert on its contents.
     *
     * @internal
     */
    submenuElement?: HTMLElement;
    /**
     * Set by the parent Menu when the submenu element is projected to the
     * mobile-submenu slot. Guards against `manageSubmenu` clearing
     * `hasSubmenu` when the slot appears empty during projection.
     * Cross-class implementation detail; do not depend on it from outside
     * the `@spectrum-web-components/menu` package.
     *
     * @internal
     */
    _mobileSubmenuProjected: boolean;
    /**
     * the focusable element of the menu item
     */
    get focusElement(): HTMLElement;
    protected get hasIcon(): boolean;
    get itemChildren(): MenuItemChildren;
    private _itemChildren?;
    constructor();
    /**
     * whether submenu is open
     */
    open: boolean;
    /**
     * whether menu item's submenu is opened via keyboard
     */
    private _openedViaKeyboard;
    /**
     * whether menu item's submenu is closed via pointer leave
     */
    private _closedViaPointer;
    /**
     * Touch interaction state for submenu toggling
     */
    private _activePointerId?;
    private _touchHandledViaPointerup;
    private _touchAbortController?;
    private handleClickCapture;
    private handleSlottableRequest;
    private proxyFocus;
    private shouldProxyClick;
    protected breakItemChildrenCache(): void;
    private get isMobileView();
    /**
     * Returns the root sp-menu with mobile-view, traversing up from
     * either the focusRoot or the DOM tree.
     */
    private get _mobileRootMenu();
    protected renderSubmenu(): TemplateResult;
    protected render(): TemplateResult;
    /**
     * Determines if item has a submenu and updates the `aria-haspopup` attribute.
     * Skips clearing state when the submenu is temporarily projected to the
     * parent Menu's mobile-submenu slot.
     */
    protected manageSubmenu(event: Event & {
        target: HTMLSlotElement;
    }): void;
    private handlePointerdown;
    private handleTouchSubmenuToggle;
    private handleTouchCleanup;
    protected firstUpdated(changes: PropertyValues): void;
    private getActiveElementSafely;
    handleMouseover(event: MouseEvent): void;
    /**
     * Determines if an element is an input field that should retain focus.
     * Uses multiple detection strategies to identify input elements generically.
     */
    private isInputElement;
    /**
     * Checks if an element is a native HTML input element.
     */
    private isNativeInputElement;
    /**
     * Checks if an element is a Spectrum Web Component with input behavior.
     * Uses ARIA roles and component patterns for generic detection.
     */
    private isSpectrumInputComponent;
    /**
     * forward key info from keydown event to parent menu
     */
    handleKeydown: (event: KeyboardEvent) => void;
    protected closeOverlaysForRoot(): void;
    protected handleFocus(event: FocusEvent): void;
    protected handleBlur(event: FocusEvent): void;
    protected handleSubmenuClick(event: Event): void;
    protected handleSubmenuFocus(): void;
    protected handleBeforetoggle: (event: Event) => void;
    protected handlePointerenter(event: PointerEvent): void;
    protected leaveTimeout?: ReturnType<typeof setTimeout>;
    protected recentlyLeftChild: boolean;
    protected handlePointerleave(event: PointerEvent): void;
    /**
     * When there is a `change` event in the submenu for this item
     * then we "click" this item to cascade the selection up the
     * menu tree allowing all submenus between the initial selection
     * and the root of the tree to have their selection changes and
     * be closed.
     */
    protected handleSubmenuChange(event: Event): void;
    protected handleSubmenuPointerenter(): void;
    protected handleSubmenuPointerleave(): Promise<void>;
    protected handleSubmenuOpen(event: Event): void;
    protected cleanup(): void;
    openOverlay(shouldFocus?: boolean): Promise<void>;
    updateAriaSelected(): void;
    setRole(role: string): void;
    protected willUpdate(changes: PropertyValues<this>): void;
    protected updated(changes: PropertyValues<this>): void;
    connectedCallback(): void;
    _parentElement: HTMLElement;
    disconnectedCallback(): void;
    private willDispatchUpdate;
    triggerUpdate(): Promise<void>;
    focus(): void;
    blur(): void;
    dispatchUpdate(): void;
    menuData: {
        focusRoot?: Menu;
        parentMenu?: Menu;
        selectionRoot?: Menu;
        cleanupSteps: ((item: MenuItem) => void)[];
    };
}
declare global {
    interface GlobalEventHandlersEventMap {
        'sp-menu-item-added-or-updated': MenuItemAddedOrUpdatedEvent;
    }
}
export {};
