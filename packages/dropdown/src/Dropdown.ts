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
    PropertyValues,
    CSSResultArray,
    TemplateResult,
    query,
} from '@spectrum-web-components/base';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import dropdownStyles from './dropdown.css.js';
import buttonBaseStyles from '@spectrum-web-components/button/src/button-base.css.js';
import actionButtonStyles from '@spectrum-web-components/button/src/action-button.css.js';
import fieldButtonStyles from '@spectrum-web-components/button/src/field-button.css.js';
import alertSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-alert-small.css.js';
import chevronDownMediumStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron-down-medium.css.js';

import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icon/sp-icon.js';
import {
    AlertSmallIcon,
    ChevronDownMediumIcon,
} from '@spectrum-web-components/icons-ui';
import {
    MenuItem,
    MenuItemQueryRoleEventDetail,
    Menu,
    MenuQueryRoleEventDetail,
} from '@spectrum-web-components/menu';
import '@spectrum-web-components/popover/sp-popover.js';
import {
    Placement,
    openOverlay,
    TriggerInteractions,
    OverlayOptions,
} from '@spectrum-web-components/overlay';

/**
 * @slot label - The placeholder content for the dropdown
 * @slot {"sp-menu"} - The menu of options that will display when the dropdown is open
 */
export class DropdownBase extends Focusable {
    public static get styles(): CSSResultArray {
        return [
            ...super.styles,
            buttonBaseStyles,
            actionButtonStyles,
            dropdownStyles,
            alertSmallStyles,
            chevronDownMediumStyles,
        ];
    }

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
    public invalid = false;

    @property()
    public label?: string;

    @property({ type: Boolean, reflect: true })
    public open = false;

    public optionsMenu?: Menu;

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

    @property({ type: String })
    public selectedItemText = '';

    private closeOverlay?: () => void;

    @query('sp-popover')
    private popover?: HTMLElement;

    protected listRole = 'listbox';
    protected itemRole = 'option';
    private placeholder?: Comment;

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
        if (this.open && this.optionsMenu) {
            return this.optionsMenu;
        }
        return this.button;
    }

    public click(): void {
        this.focusElement.click();
    }

    public onButtonBlur(): void {
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
        /* istanbul ignore if */
        if (!target || target.disabled) {
            if (target) {
                this.focus();
            }
            return;
        }
        this.setValueFromItem(target);
    }

    public onKeydown = (event: KeyboardEvent): void => {
        if (event.code !== 'ArrowDown') {
            return;
        }
        event.preventDefault();
        /* istanbul ignore if */
        if (!this.optionsMenu) {
            return;
        }
        this.open = true;
    };

    public setValueFromItem(item: MenuItem): void {
        const oldSelectedItemText = this.selectedItemText;
        const oldValue = this.value;
        this.selectedItemText = item.itemText;
        this.value = item.value;
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
            })
        );
        if (!applyDefault) {
            this.selectedItemText = oldSelectedItemText;
            this.value = oldValue;
            return;
        }
        const parentElement = item.parentElement as Element;
        const selectedItem = parentElement.querySelector(
            '[selected]'
        ) as MenuItem;
        /* istanbul ignore if */
        if (selectedItem) {
            selectedItem.selected = false;
        }
        item.selected = true;
        this.open = false;
    }

    public toggle(): void {
        this.open = !this.open;
    }

    public close(): void {
        this.open = false;
    }

    protected onOverlayClosed(): void {
        this.close();
        /* istanbul ignore else */
        if (this.optionsMenu && this.placeholder) {
            const parentElement =
                this.placeholder.parentElement ||
                this.placeholder.getRootNode();

            /* istanbul ignore else */
            if (parentElement) {
                parentElement.replaceChild(this.optionsMenu, this.placeholder);
            }
        }

        delete this.placeholder;
    }

    private async openMenu(): Promise<void> {
        /* istanbul ignore if */
        if (
            !this.popover ||
            !this.optionsMenu ||
            this.optionsMenu.children.length === 0
        ) {
            this.menuStateResolver();
            return;
        }

        this.placeholder = document.createComment(
            'placeholder for optionsMenu'
        );

        const parentElement =
            this.optionsMenu.parentElement || this.optionsMenu.getRootNode();

        /* istanbul ignore else */
        if (parentElement) {
            parentElement.replaceChild(this.placeholder, this.optionsMenu);
        }

        this.popover.append(this.optionsMenu);
        this.sizePopover(this.popover);
        const { button, popover } = this;
        this.closeOverlay = await Dropdown.openOverlay(
            button,
            'inline',
            popover,
            {
                placement: this.placement,
                receivesFocus: 'auto',
            }
        );
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

        this.menuStateResolver();
    }

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                <div
                    id="label"
                    class=${ifDefined(this.value ? undefined : 'placeholder')}
                >
                    ${this.value
                        ? this.selectedItemText
                        : html`
                              <slot name="label">${this.label}</slot>
                          `}
                </div>
                ${this.invalid
                    ? html`
                          <sp-icon class="icon alert-small" size="s">
                              ${AlertSmallIcon({ hidden: true })}
                          </sp-icon>
                      `
                    : nothing}
                <sp-icon class="icon dropdown chevron-down-medium" size="s">
                    ${ChevronDownMediumIcon({ hidden: true })}
                </sp-icon>
            `,
        ];
    }

    protected render(): TemplateResult {
        return html`
            <button
                aria-haspopup="true"
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
            <sp-popover
                open
                id="popover"
                @click=${this.onClick}
                @sp-overlay-closed=${this.onOverlayClosed}
            ></sp-popover>
        `;
    }

    protected firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);

        this.optionsMenu = this.querySelector('sp-menu') as Menu;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('value') && this.optionsMenu) {
            this.manageSelection();
        }
        if (changedProperties.has('disabled') && this.disabled) {
            this.open = false;
        }
        if (changedProperties.has('open')) {
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

    private async manageSelection(): Promise<void> {
        if (!this.optionsMenu) {
            return;
        }
        if (this.optionsMenu.menuItems.length) {
            let selectedItem: MenuItem | undefined;
            this.optionsMenu.menuItems.map((item) => {
                if (this.value === item.value && !item.disabled) {
                    selectedItem = item;
                } else {
                    item.selected = false;
                }
            });
            if (selectedItem) {
                selectedItem.selected = true;
                this.selectedItemText = selectedItem.itemText;
            } else {
                this.value = '';
                this.selectedItemText = '';
            }
            this.optionsMenu.updateSelectedItemIndex();
            return;
        }
        await this.optionsMenu.updateComplete;
        if (this.optionsMenu.menuItems.length) {
            this.manageSelection();
        }
    }

    private menuStatePromise = Promise.resolve();
    private menuStateResolver!: () => void;

    protected async _getUpdateComplete(): Promise<void> {
        await super._getUpdateComplete();
        await this.menuStatePromise;
    }

    public disconnectedCallback(): void {
        this.open = false;

        super.disconnectedCallback();
    }
}

export class Dropdown extends DropdownBase {
    public static get styles(): CSSResultArray {
        return [...super.styles, fieldButtonStyles];
    }
}
