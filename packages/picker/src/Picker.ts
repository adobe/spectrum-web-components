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
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
    query,
    nothing,
    SizedMixin,
    ElementSize,
    classMap,
} from '@spectrum-web-components/base';

import pickerStyles from './picker.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';

import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { reparentChildren } from '@spectrum-web-components/shared/src/reparent-children.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/menu/sp-menu.js';
import { MenuItem, Menu } from '@spectrum-web-components/menu';
import '@spectrum-web-components/popover/sp-popover.js';
import { Popover } from '@spectrum-web-components/popover';
import {
    Placement,
    openOverlay,
    TriggerInteractions,
    OverlayOptions,
} from '@spectrum-web-components/overlay';

const chevronClass = {
    s: 'spectrum-UIIcon-ChevronDown75',
    m: 'spectrum-UIIcon-ChevronDown100',
    l: 'spectrum-UIIcon-ChevronDown200',
    xl: 'spectrum-UIIcon-ChevronDown300',
};

type PickerSize = Exclude<ElementSize, 'xxl'>;

/**
 * @element sp-picker
 *
 * @slot label - The placeholder content for the Picker
 * @slot - menu items to be listed in the Picker
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
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

    @query('#button')
    public button!: HTMLButtonElement;

    public get target(): HTMLButtonElement | this {
        return this.button;
    }

    @property({ type: Boolean, reflect: true })
    public disabled = false;

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

    private closeOverlay?: () => void;

    @query('sp-popover')
    private popover!: Popover;

    protected listRole: 'listbox' | 'menu' = 'listbox';
    protected itemRole = 'option';

    public constructor() {
        super();
        this.onKeydown = this.onKeydown.bind(this);
    }

    public get focusElement(): HTMLElement {
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
        event.stopPropagation();
        const target = event.target as Menu;
        const [selected] = target.selectedItems;
        this.setValueFromItem(selected, event);
    }

    protected onKeydown = (event: KeyboardEvent): void => {
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
                cancelable: true,
            })
        );
        if (!applyDefault) {
            if (menuChangeEvent) {
                menuChangeEvent.preventDefault();
            }
            this.selectedItem = oldSelectedItem;
            this.value = oldValue;
            this.open = true;
            return;
        }
        if (oldSelectedItem) {
            oldSelectedItem.selected = !!this.selects ? false : false;
        }
        item.selected = !!this.selects ? true : false;
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

    protected onOverlayClosed(): void {
        this.close();
        if (this.restoreChildren) {
            this.restoreChildren();
            this.restoreChildren = undefined;
        }

        this.menuStateResolver();
    }

    private async openMenu(): Promise<void> {
        /* c8 ignore next 9 */
        let reparentableChildren: Element[] = [];

        const deprecatedMenu = this.querySelector('sp-menu');
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
        >(reparentableChildren, this.optionsMenu, () => {
            return (el) => {
                if (typeof el.focused !== 'undefined') {
                    el.focused = false;
                }
            };
        });

        this.sizePopover(this.popover);
        const { popover } = this;
        this.addEventListener(
            'sp-opened',
            () => {
                this.manageSelection();
                this.optionsMenu.updateComplete.then(() => {
                    this.menuStateResolver();
                });
            },
            { once: true }
        );
        this.closeOverlay = await Picker.openOverlay(this, 'inline', popover, {
            placement: this.placement,
            receivesFocus: 'auto',
        });
    }

    protected sizePopover(popover: HTMLElement): void {
        // only use `this.offsetWidth` when Standard variant
        const menuWidth = !this.quiet && `${this.offsetWidth}px`;
        if (menuWidth) {
            popover.style.setProperty('min-width', menuWidth);
        }
    }

    private closeMenu(): void {
        if (this.closeOverlay) {
            this.closeOverlay();
            delete this.closeOverlay;
        }
    }

    protected get selectedItemContent(): {
        icon: Element[];
        content: Node[];
    } {
        if (!this._selectedItemContent && this.selectedItem) {
            this._selectedItemContent = this.selectedItem.itemChildren;
        }
        return this._selectedItemContent || { icon: [], content: [] };
    }

    private _selectedItemContent?: {
        icon: Element[];
        content: Node[];
    };

    protected renderLabelContent(content: Node[]): TemplateResult | Node[] {
        if (this.value && this.selectedItem) {
            return content;
        }
        return html`
            <slot name="label">${this.label}</slot>
        `;
    }

    protected get buttonContent(): TemplateResult[] {
        const labelClasses = {
            'visually-hidden': this.icons === 'only' && !!this.value,
            placeholder: !this.value,
        };
        return [
            html`
                <span id="icon" ?hidden=${this.icons === 'none'}>
                    ${this.selectedItemContent.icon}
                </span>
                <span id="label" class=${classMap(labelClasses)}>
                    ${this.renderLabelContent(this.selectedItemContent.content)}
                </span>
                ${this.invalid
                    ? html`
                          <sp-icon-alert class="validationIcon"></sp-icon-alert>
                      `
                    : nothing}
                <sp-icon-chevron100
                    class="picker ${chevronClass[this.size as PickerSize]}"
                ></sp-icon-chevron100>
            `,
        ];
    }

    // a helper to throw focus to the button is needed because Safari
    // won't include buttons in the tab order even with tabindex="0"
    protected get renderButton(): TemplateResult {
        return html`
            <span
                id="focus-helper"
                tabindex="${this.focused ? '-1' : '0'}"
                @focus=${this.onHelperFocus}
            ></span>
            <button
                aria-haspopup="true"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-labelledby="button icon label"
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

    protected update(changes: PropertyValues<this>): void {
        if (changes.has('selectedItem')) {
            this._selectedItemContent = undefined;
        }
        if (this.selects) {
            // Always force `selects` to "single" when set.
            // TODO: Add support functionally and visually for "multiple"
            this.selects = 'single';
        }
        super.update(changes);
    }

    protected render(): TemplateResult {
        return html`
            ${this.renderButton} ${this.renderPopover}
        `;
    }

    protected get renderPopover(): TemplateResult {
        return html`
            <sp-popover id="popover" @sp-overlay-closed=${this.onOverlayClosed}>
                <sp-menu
                    id="menu"
                    role="${this.listRole}"
                    selects="single"
                    @change=${this.handleChange}
                ></sp-menu>
            </sp-popover>
        `;
    }

    protected updateMenuItems(): void {
        this.menuItems = [
            ...this.querySelectorAll('sp-menu-item'),
        ] as MenuItem[];
    }

    protected firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);

        // Since the sp-menu gets reparented by the popover, initialize it here
        this.optionsMenu = this.shadowRoot.querySelector('sp-menu') as Menu;

        this.updateMenuItems();

        const deprecatedMenu = this.querySelector('sp-menu');
        if (deprecatedMenu) {
            console.warn(
                `Deprecation Notice: You no longer need to provide an sp-menu child to ${this.tagName.toLowerCase()}. Any styling or attributes on the sp-menu will be ignored.`
            );
        }
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (
            changedProperties.has('value') &&
            !changedProperties.has('selectedItem')
        ) {
            this.manageSelection();
        }
        if (changedProperties.has('disabled') && this.disabled) {
            this.open = false;
        }
        if (
            changedProperties.has('open') &&
            (this.open || typeof changedProperties.get('open') !== 'undefined')
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
    }

    protected manageSelection(): void {
        if (!this.open) {
            this.updateMenuItems();
        }
        /* c8 ignore next 3 */
        if (this.menuItems.length > 0) {
            let selectedItem: MenuItem | undefined;
            this.menuItems.forEach((item) => {
                if (this.value === item.value && !item.disabled) {
                    selectedItem = item;
                } else {
                    item.selected = !!this.selects ? false : false;
                }
            });
            if (selectedItem) {
                selectedItem.selected = !!this.selects ? true : false;
                this.selectedItem = selectedItem;
            } else {
                this.value = '';
                this.selectedItem = undefined;
            }
            if (this.open) {
                this.optionsMenu.updateComplete.then(() => {
                    this.optionsMenu.updateSelectedItemIndex();
                });
            }
            return;
        }
    }

    private menuStatePromise = Promise.resolve();
    private menuStateResolver!: () => void;

    protected async _getUpdateComplete(): Promise<boolean> {
        const complete = (await super._getUpdateComplete()) as boolean;
        await this.menuStatePromise;
        return complete;
    }

    public connectedCallback(): void {
        if (!this.open) {
            this.updateMenuItems();
        }
        super.connectedCallback();
    }

    public disconnectedCallback(): void {
        this.open = false;

        super.disconnectedCallback();
    }
}

export class Picker extends PickerBase {
    public static get styles(): CSSResultArray {
        return [pickerStyles, chevronStyles];
    }

    protected onKeydown = (event: KeyboardEvent): void => {
        const { code } = event;
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
