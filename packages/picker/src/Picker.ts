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
    ifDefined,
    SizedMixin,
    ElementSize,
} from '@spectrum-web-components/base';

import pickerStyles from './picker.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';

import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { reparentChildren } from '@spectrum-web-components/shared/src/reparent-children.js';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/menu/sp-menu.js';
import {
    MenuItem,
    MenuItemQueryRoleEventDetail,
    Menu,
    MenuQueryRoleEventDetail,
} from '@spectrum-web-components/menu';
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
 * @slot label - The placeholder content for the picker
 *
 * @fires sp-open - Announces that the overlay has been opened
 * @fires sp-close - Announces that the overlay has been closed
 */
export class PickerBase extends SizedMixin(Focusable) {
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

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property()
    public label?: string;

    @property({ type: Boolean, reflect: true })
    public open = false;

    public menuItems: MenuItem[] = [];
    private restoreChildren?: Function;

    @query('sp-menu', true) // important to cache since this can get reparented
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

    protected listRole = 'listbox';
    protected itemRole = 'option';

    public constructor() {
        super();
        this.onKeydown = this.onKeydown.bind(this);

        this.addEventListener(
            'sp-menu-item-query-role',
            (event: CustomEvent<MenuItemQueryRoleEventDetail>) => {
                event.stopPropagation();
                event.detail.role = this.itemRole;
            }
        );
        this.addEventListener(
            'sp-menu-query-role',
            (event: CustomEvent<MenuQueryRoleEventDetail>) => {
                event.stopPropagation();
                event.detail.role = this.listRole;
            }
        );
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

    public onButtonFocus(): void {
        (this.target as HTMLButtonElement).addEventListener(
            'keydown',
            this.onKeydown
        );
    }

    public onClick(event: Event): void {
        const target = event.target as MenuItem;
        /* c8 ignore 6 */
        if (!target || target.disabled) {
            if (target) {
                this.focus();
            }
            return;
        }
        if (target.value) {
            this.setValueFromItem(target);
        }
    }

    public onKeydown = (event: KeyboardEvent): void => {
        if (event.code !== 'ArrowDown' && event.code !== 'ArrowUp') {
            return;
        }
        event.preventDefault();
        this.open = true;
    };

    public async setValueFromItem(item: MenuItem): Promise<void> {
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
            this.selectedItem = oldSelectedItem;
            this.value = oldValue;
            this.open = true;
            return;
        }
        if (oldSelectedItem) {
            oldSelectedItem.selected = false;
        }
        item.selected = true;
    }

    public toggle(): void {
        this.open = !this.open;
    }

    public close(): void {
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

        this.restoreChildren = reparentChildren(
            reparentableChildren,
            this.optionsMenu
        );

        this.optionsMenu.selectable = true;

        this.sizePopover(this.popover);
        const { popover } = this;
        this.closeOverlay = await Picker.openOverlay(this, 'inline', popover, {
            placement: this.placement,
            receivesFocus: 'auto',
        });
        this.manageSelection();
        this.menuStateResolver();
    }

    protected sizePopover(popover: HTMLElement): void {
        // only use `this.offsetWidth` when Standard variant
        const menuWidth = !this.quiet && `${this.offsetWidth}px`;
        if (menuWidth) {
            popover.style.setProperty('width', menuWidth);
        }
    }

    private closeMenu(): void {
        if (this.closeOverlay) {
            this.closeOverlay();
            delete this.closeOverlay;
        }
    }

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                <span
                    id="label"
                    class=${ifDefined(this.value ? undefined : 'placeholder')}
                >
                    ${this.value && this.selectedItem
                        ? this.selectedItem.itemText
                        : html`
                              <slot name="label">${this.label}</slot>
                          `}
                </span>
                ${this.invalid
                    ? html`
                          <sp-icon-alert class="validationIcon"></sp-icon-alert>
                      `
                    : nothing}
                <sp-icon-chevron100
                    class="icon picker ${chevronClass[this.size as PickerSize]}"
                ></sp-icon-chevron100>
            `,
        ];
    }

    protected get renderButton(): TemplateResult {
        return html`
            <button
                aria-haspopup="true"
                aria-controls="popover"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-label=${ifDefined(this.label || undefined)}
                id="button"
                class="button"
                @blur=${this.onButtonBlur}
                @click=${this.onButtonClick}
                @focus=${this.onButtonFocus}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </button>
        `;
    }

    protected render(): TemplateResult {
        return html`
            ${this.renderButton} ${this.renderPopover}
        `;
    }

    protected get renderPopover(): TemplateResult {
        return html`
            <sp-popover
                open
                id="popover"
                @click=${this.onClick}
                @sp-overlay-closed=${this.onOverlayClosed}
            >
                <sp-menu id="menu" role="${this.listRole}"></sp-menu>
            </sp-popover>
        `;
    }

    protected firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);

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
        /* c8 ignore next 3 */
        if (this.menuItems.length > 0) {
            let selectedItem: MenuItem | undefined;
            this.menuItems.forEach((item) => {
                if (this.value === item.value && !item.disabled) {
                    selectedItem = item;
                } else {
                    item.selected = false;
                }
            });
            if (selectedItem) {
                selectedItem.selected = true;
                this.selectedItem = selectedItem;
            } else {
                this.value = '';
                this.selectedItem = undefined;
            }
            if (this.open) {
                this.optionsMenu.updateSelectedItemIndex();
            }
            return;
        }
    }

    private menuStatePromise = Promise.resolve();
    private menuStateResolver!: () => void;

    protected async _getUpdateComplete(): Promise<void> {
        await super._getUpdateComplete();
        await this.menuStatePromise;
    }

    public connectedCallback(): void {
        if (!this.open) {
            this.menuItems = [
                ...this.querySelectorAll(`sp-menu-item`),
            ] as MenuItem[];
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

    public onKeydown = (event: KeyboardEvent): void => {
        const { code } = event;
        if (!code.startsWith('Arrow')) {
            return;
        }
        event.preventDefault();
        if (code === 'ArrowUp' || code === 'ArrowDown') {
            this.open = true;
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
        nextIndex = Math.max(Math.min(nextIndex, this.menuItems.length), 0);
        if (!this.value || nextIndex !== selectedIndex) {
            this.setValueFromItem(this.menuItems[nextIndex]);
        }
    };
}
