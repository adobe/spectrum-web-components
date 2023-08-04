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
    DefaultElementSize,
    html,
    nothing,
    PropertyValues,
    render,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    classMap,
    ifDefined,
} from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';

import pickerStyles from './picker.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';

import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { reparentChildren } from '@spectrum-web-components/shared/src/reparent-children.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/menu/sp-menu.js';
import type {
    Menu,
    MenuItem,
    MenuItemAddedOrUpdatedEvent,
    MenuItemChildren,
    MenuItemRemovedEvent,
} from '@spectrum-web-components/menu';
import '@spectrum-web-components/tray/sp-tray.js';
import '@spectrum-web-components/popover/sp-popover.js';
import type { Popover } from '@spectrum-web-components/popover';
import {
    openOverlay,
    OverlayOptions,
    Placement,
    TriggerInteractions,
} from '@spectrum-web-components/overlay';
import {
    IS_MOBILE,
    MatchMediaController,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';

const chevronClass = {
    s: 'spectrum-UIIcon-ChevronDown75',
    m: 'spectrum-UIIcon-ChevronDown100',
    l: 'spectrum-UIIcon-ChevronDown200',
    xl: 'spectrum-UIIcon-ChevronDown300',
};

export class PickerBase extends SizedMixin(Focusable) {
    /**
     * @private
     */
    public static openOverlay = async (
        target: HTMLElement,
        interaction: TriggerInteractions,
        content: HTMLElement,
        options: OverlayOptions
    ): Promise<() => void> => {
        return await openOverlay(target, interaction, content, options);
    };

    protected isMobile = new MatchMediaController(this, IS_MOBILE);

    @state()
    appliedLabel?: string;

    @query('#button')
    public button!: HTMLButtonElement;

    public get target(): HTMLButtonElement | this {
        return this.button;
    }

    @property({ type: Boolean, reflect: true })
    public override disabled = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: String, reflect: true })
    public icons?: 'only' | 'none';

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property()
    public label?: string;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: Boolean, reflect: true })
    public readonly = false;

    public selects: undefined | 'single' = 'single';

    public menuItems: MenuItem[] = [];
    private restoreChildren?: () => void;

    public optionsMenu!: Menu;

    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
     * @attr
     */

    @property()
    public placement: Placement = 'bottom-start';

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: String })
    public value = '';

    @property({ attribute: false })
    public selectedItem?: MenuItem;

    private closeOverlay?: Promise<() => void>;

    private popoverEl!: Popover;

    protected listRole: 'listbox' | 'menu' = 'listbox';
    protected itemRole = 'option';

    public constructor() {
        super();
        this.onKeydown = this.onKeydown.bind(this);
    }

    public override get focusElement(): HTMLElement {
        if (this.open) {
            return this.optionsMenu;
        }
        return this.button;
    }

    public forceFocusVisible(): void {
        this.focused = true;
    }

    public onButtonBlur(): void {
        this.focused = false;
        (this.target as HTMLButtonElement).removeEventListener(
            'keydown',
            this.onKeydown
        );
    }

    protected onButtonClick(): void {
        this.toggle();
    }

    public override focus(options?: FocusOptions): void {
        super.focus(options);

        if (!this.disabled && this.focusElement) {
            this.focused = this.hasVisibleFocusInTree();
        }
    }

    public onHelperFocus(): void {
        // set focused to true here instead of onButtonFocus so clicks don't flash a focus outline
        this.focused = true;
        this.button.focus();
    }

    public onButtonFocus(): void {
        (this.target as HTMLButtonElement).addEventListener(
            'keydown',
            this.onKeydown
        );
    }

    public handleChange(event: Event): void {
        const target = event.target as Menu;
        const [selected] = target.selectedItems;
        if (event.cancelable) {
            event.stopPropagation();
            this.setValueFromItem(selected, event);
        } else {
            // Non-cancelable "change" events announce a selection with no value
            // change that should close the Picker element.
            this.open = false;
        }
    }

    protected onKeydown = (event: KeyboardEvent): void => {
        this.focused = true;
        if (event.code !== 'ArrowDown' && event.code !== 'ArrowUp') {
            return;
        }
        event.preventDefault();
        this.toggle(true);
    };

    public async setValueFromItem(
        item: MenuItem,
        menuChangeEvent?: Event
    ): Promise<void> {
        const oldSelectedItem = this.selectedItem;
        const oldValue = this.value;
        this.selectedItem = item;
        this.value = item.value;
        this.open = false;
        await this.updateComplete;
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
        if (!applyDefault) {
            if (menuChangeEvent) {
                menuChangeEvent.preventDefault();
            }
            this.setMenuItemSelected(this.selectedItem, false);
            if (oldSelectedItem) {
                this.setMenuItemSelected(oldSelectedItem, true);
            }
            this.selectedItem = oldSelectedItem;
            this.value = oldValue;
            this.open = true;
            return;
        }
        if (oldSelectedItem) {
            this.setMenuItemSelected(oldSelectedItem, false);
        }
        this.setMenuItemSelected(item, !!this.selects);
    }

    protected setMenuItemSelected(item: MenuItem, value: boolean): void {
        // matches null | undefined
        if (this.selects == null) return;
        item.selected = value;
    }

    public toggle(target?: boolean): void {
        if (this.readonly) {
            return;
        }
        this.open = typeof target !== 'undefined' ? target : !this.open;
    }

    public close(): void {
        if (this.readonly) {
            return;
        }
        this.open = false;
    }

    public overlayOpenCallback = async (): Promise<void> => {
        this.updateMenuItems();
        await this.itemsUpdated;
        await this.optionsMenu.updateComplete;
        requestAnimationFrame(() => this.menuStateResolver());
    };

    public overlayCloseCallback = async (): Promise<void> => {
        if (this.restoreChildren) {
            this.restoreChildren();
            this.restoreChildren = undefined;
        }
        this.close();
        requestAnimationFrame(() => this.menuStateResolver());
    };

    private popoverFragment!: DocumentFragment;

    private async generatePopover(): Promise<void> {
        if (!this.popoverFragment) {
            this.popoverFragment = document.createDocumentFragment();
        }
        render(this.renderPopover, this.popoverFragment, { host: this });
        this.popoverEl = this.popoverFragment.children[0] as Popover;
        this.optionsMenu = this.popoverEl.children[1] as Menu;
    }

    private async openMenu(): Promise<void> {
        /* c8 ignore next 9 */
        let reparentableChildren: Element[] = [];
        const deprecatedMenu = this.querySelector(':scope > sp-menu') as Menu;

        await this.generatePopover();
        if (deprecatedMenu) {
            reparentableChildren = Array.from(deprecatedMenu.children);
        } else {
            reparentableChildren = Array.from(this.children).filter(
                (element) => {
                    return !element.hasAttribute('slot');
                }
            );
        }

        if (reparentableChildren.length === 0) {
            this.menuStateResolver();
            return;
        }

        this.restoreChildren = reparentChildren<
            Element & { focused?: boolean }
        >(reparentableChildren, this.optionsMenu, {
            position: 'beforeend',
            prepareCallback: (
                el: Element & {
                    focused?: boolean | undefined;
                    value?: string;
                    selected?: boolean;
                }
            ) => {
                if (this.value === el.value) {
                    this.setMenuItemSelected(el as MenuItem, true);
                }
                return (el) => {
                    if (typeof el.focused !== 'undefined') {
                        el.focused = false;
                    }
                };
            },
        });

        this.sizePopover(this.popoverEl);
        if (window.__swc.DEBUG) {
            window.__swc.ignoreWarningLevels.deprecation = true;
        }
        this.closeOverlay = Picker.openOverlay(this, 'modal', this.popoverEl, {
            placement: this.isMobile.matches ? 'none' : this.placement,
            receivesFocus: 'auto',
        });
        if (window.__swc.DEBUG) {
            window.__swc.ignoreWarningLevels.deprecation = false;
        }
    }

    protected sizePopover(popover: HTMLElement): void {
        if (this.isMobile.matches) {
            popover.style.setProperty('--swc-menu-width', `100%`);
            return;
        }
    }

    private async closeMenu(): Promise<void> {
        if (this.closeOverlay) {
            const closeOverlay = this.closeOverlay;
            delete this.closeOverlay;
            (await closeOverlay)();
        }
    }

    protected get selectedItemContent(): MenuItemChildren {
        if (this.selectedItem) {
            return this.selectedItem.itemChildren;
        }
        return { icon: [], content: [] };
    }

    protected renderLabelContent(content: Node[]): TemplateResult | Node[] {
        if (this.value && this.selectedItem) {
            return content;
        }
        return html`
            <slot name="label">
                <span
                    aria-hidden=${ifDefined(
                        this.appliedLabel ? undefined : 'true'
                    )}
                >
                    ${this.label}
                </span>
            </slot>
        `;
    }

    protected get buttonContent(): TemplateResult[] {
        const labelClasses = {
            'visually-hidden': this.icons === 'only' && !!this.value,
            placeholder: !this.value,
        };
        const appliedLabel = this.appliedLabel || this.label;
        return [
            html`
                </span>
                <span id="icon" ?hidden=${this.icons === 'none'}>
                    ${this.selectedItemContent.icon}
                </span>
                <span id="label" class=${classMap(labelClasses)}>
                    ${this.renderLabelContent(this.selectedItemContent.content)}
                </span>
                ${
                    this.value && this.selectedItem
                        ? html`
                              <span
                                  aria-hidden="true"
                                  class="visually-hidden"
                                  id="applied-label"
                              >
                                  ${appliedLabel}
                                  <slot name="label"></slot>
                              </span>
                          `
                        : html`
                              <span hidden id="applied-label">
                                  ${appliedLabel}
                              </span>
                          `
                }
                ${
                    this.invalid
                        ? html`
                              <sp-icon-alert
                                  class="validation-icon"
                              ></sp-icon-alert>
                          `
                        : nothing
                }
                <sp-icon-chevron100
                    class="picker ${
                        chevronClass[this.size as DefaultElementSize]
                    }"
                ></sp-icon-chevron100>
            `,
        ];
    }

    applyFocusElementLabel = (value?: string): void => {
        this.appliedLabel = value;
    };

    // a helper to throw focus to the button is needed because Safari
    // won't include buttons in the tab order even with tabindex="0"
    protected override render(): TemplateResult {
        return html`
            <span
                id="focus-helper"
                tabindex="${this.focused ? '-1' : '0'}"
                @focus=${this.onHelperFocus}
            ></span>
            <button
                aria-haspopup="true"
                aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-labelledby="icon label applied-label"
                id="button"
                class="button"
                @blur=${this.onButtonBlur}
                @click=${this.onButtonClick}
                @focus=${this.onButtonFocus}
                ?disabled=${this.disabled}
                tabindex="-1"
            >
                ${this.buttonContent}
            </button>
        `;
    }

    protected override update(changes: PropertyValues<this>): void {
        if (this.selects) {
            // Always force `selects` to "single" when set.
            // TODO: Add support functionally and visually for "multiple"
            this.selects = 'single';
        }
        if (changes.has('disabled') && this.disabled) {
            this.open = false;
        }
        if (
            changes.has('open') &&
            (this.open || typeof changes.get('open') !== 'undefined')
        ) {
            this.menuStatePromise = new Promise(
                (res) => (this.menuStateResolver = res)
            );
            if (this.open) {
                this.openMenu();
            } else {
                this.closeMenu();
            }
        }
        if (changes.has('value') && !changes.has('selectedItem')) {
            this.updateMenuItems();
        }
        if (window.__swc.DEBUG) {
            if (!this.hasUpdated && this.querySelector('sp-menu')) {
                const { localName } = this;
                window.__swc.warn(
                    this,
                    `You no longer need to provide an <sp-menu> child to ${localName}. Any styling or attributes on the <sp-menu> will be ignored.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/picker/#sizes',
                    { level: 'deprecation' }
                );
            }
        }
        super.update(changes);
    }

    protected get dismissHelper(): TemplateResult {
        return html`
            <div class="visually-hidden">
                <button
                    tabindex="-1"
                    aria-label="Dismiss"
                    @click=${this.close}
                ></button>
            </div>
        `;
    }

    protected get renderPopover(): TemplateResult {
        const content = html`
            ${this.dismissHelper}
            <sp-menu
                id="menu"
                role="${this.listRole}"
                @change=${this.handleChange}
                .selects=${this.selects}
                size=${this.size}
            ></sp-menu>
            ${this.dismissHelper}
        `;
        if (this.isMobile.matches) {
            return html`
                <sp-tray
                    id="popover"
                    role="presentation"
                    @sp-menu-item-added-or-updated=${this.updateMenuItems}
                    .overlayOpenCallback=${this.overlayOpenCallback}
                    .overlayCloseCallback=${this.overlayCloseCallback}
                >
                    ${content}
                </sp-tray>
            `;
        }
        return html`
            <sp-popover
                id="popover"
                role="presentation"
                @sp-menu-item-added-or-updated=${this.updateMenuItems}
                .overlayOpenCallback=${this.overlayOpenCallback}
                .overlayCloseCallback=${this.overlayCloseCallback}
            >
                ${content}
            </sp-popover>
        `;
    }

    private _willUpdateItems = false;
    protected itemsUpdated: Promise<void> = Promise.resolve();

    /**
     * Acquire the available MenuItems in the Picker by
     * direct element query or by assuming the list managed
     * by the Menu within the open options overlay.
     */
    protected updateMenuItems(
        event?: MenuItemAddedOrUpdatedEvent | MenuItemRemovedEvent
    ): void {
        if (this.open && event?.type === 'sp-menu-item-removed') return;
        if (this._willUpdateItems) return;
        this._willUpdateItems = true;
        if (event?.item === this.selectedItem) {
            this.requestUpdate();
        }

        let resolve = (): void => {
            return;
        };
        this.itemsUpdated = new Promise((res) => (resolve = res));
        // Debounce the update so we only update once
        // if multiple items have changed
        window.requestAnimationFrame(async () => {
            if (this.open) {
                await this.optionsMenu.updateComplete;
                this.menuItems = this.optionsMenu.childItems;
            } else {
                this.menuItems = [
                    ...this.querySelectorAll(
                        'sp-menu-item:not([slot="submenu"] *)'
                    ),
                ] as MenuItem[];
            }
            this.manageSelection();
            resolve();
            this._willUpdateItems = false;
        });
    }

    protected async manageSelection(): Promise<void> {
        if (this.selects == null) return;

        await this.menuStatePromise;
        this.selectionPromise = new Promise(
            (res) => (this.selectionResolver = res)
        );
        let selectedItem: MenuItem | undefined;
        this.menuItems.forEach((item) => {
            if (this.value === item.value && !item.disabled) {
                selectedItem = item;
            } else {
                item.selected = false;
            }
        });
        if (selectedItem) {
            selectedItem.selected = !!this.selects;
            this.selectedItem = selectedItem;
        } else {
            this.value = '';
            this.selectedItem = undefined;
        }
        if (this.open) {
            await this.optionsMenu.updateComplete;
            this.optionsMenu.updateSelectedItemIndex();
        }
        this.selectionResolver();
    }

    private menuStatePromise = Promise.resolve();
    private menuStateResolver!: () => void;
    private selectionPromise = Promise.resolve();
    private selectionResolver!: () => void;

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        await this.menuStatePromise;
        await this.itemsUpdated;
        await this.selectionPromise;
        return complete;
    }

    public override connectedCallback(): void {
        this.updateMenuItems();
        this.addEventListener(
            'sp-menu-item-added-or-updated',
            this.updateMenuItems
        );
        this.addEventListener('sp-menu-item-removed', this.updateMenuItems);
        super.connectedCallback();
    }

    public override disconnectedCallback(): void {
        this.close();

        super.disconnectedCallback();
    }
}

/**
 * @element sp-picker
 *
 * @slot label - The placeholder content for the Picker
 * @slot - menu items to be listed in the Picker
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
export class Picker extends PickerBase {
    public static override get styles(): CSSResultArray {
        return [pickerStyles, chevronStyles];
    }

    protected override sizePopover(popover: HTMLElement): void {
        super.sizePopover(popover);

        if (this.quiet) return;
        // only use `this.offsetWidth` when Standard variant
        popover.style.setProperty('min-width', `${this.offsetWidth}px`);
    }

    protected override onKeydown = (event: KeyboardEvent): void => {
        const { code } = event;
        this.focused = true;
        if (!code.startsWith('Arrow') || this.readonly) {
            return;
        }
        event.preventDefault();
        if (code === 'ArrowUp' || code === 'ArrowDown') {
            this.toggle(true);
            return;
        }
        const selectedIndex = this.selectedItem
            ? this.menuItems.indexOf(this.selectedItem)
            : -1;
        // use a positive offset to find the first non-disabled item when no selection is available.
        const nextOffset = !this.value || code === 'ArrowRight' ? 1 : -1;
        let nextIndex = selectedIndex + nextOffset;
        while (
            this.menuItems[nextIndex] &&
            this.menuItems[nextIndex].disabled
        ) {
            nextIndex += nextOffset;
        }
        if (!this.menuItems[nextIndex] || this.menuItems[nextIndex].disabled) {
            return;
        }
        if (!this.value || nextIndex !== selectedIndex) {
            this.setValueFromItem(this.menuItems[nextIndex]);
        }
    };
}
