/*
Copyright 2019 Adobe. All rights reserved.
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
} from 'lit-element';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import dropdownStyles from './dropdown.css.js';
import actionButtonStyles from '@spectrum-web-components/button/lib/action-button.css.js';
import fieldButtonStyles from '@spectrum-web-components/button/lib/field-button.css.js';
import alertSmallStyles from '@spectrum-web-components/icon/lib/spectrum-icon-alert-small.css.js';
import chevronDownMediumStyles from '@spectrum-web-components/icon/lib/spectrum-icon-chevron-down-medium.css.js';

import { Focusable } from '@spectrum-web-components/shared/lib/focusable.js';
import '@spectrum-web-components/icon';
import '@spectrum-web-components/icons';
import { Menu, MenuQueryRoleEventDetail } from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu-item';
import {
    MenuItem,
    MenuItemQueryRoleEventDetail,
} from '@spectrum-web-components/menu-item';
import '@spectrum-web-components/popover';
import { Overlay, Placement } from '@spectrum-web-components/overlay';

/**
 * @slot label - The placeholder content for the dropdown
 * @slot {"sp-menu-item"|"sp-menu-divider"} - The options that will display when the dropdown is open
 */
export class DropdownBase extends Focusable {
    public static get styles(): CSSResultArray {
        return [
            ...super.styles,
            actionButtonStyles,
            dropdownStyles,
            alertSmallStyles,
            chevronDownMediumStyles,
        ];
    }

    @query('#button')
    public button?: HTMLButtonElement;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property()
    public label?: string;

    @property({ type: Boolean, reflect: true })
    public open = false;

    public optionsMenu?: Menu;

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

    private optionsList: MenuItem[] = [];

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
        /* istanbul ignore if */
        if (typeof this.button === 'undefined') {
            return this;
        }
        return this.button;
    }

    public onOptionsChange(event: Event): void {
        if (this.value) {
            this.requestUpdate('value');
        }
        const slot = event.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        this.optionsList = nodes.filter(
            (node) => (node as HTMLElement).tagName
        ) as MenuItem[];
        this.requestUpdate();
    }

    public onButtonBlur(): void {
        /* istanbul ignore if */
        if (typeof this.button === 'undefined') {
            return;
        }
        this.button.removeEventListener('keydown', this.onKeydown);
    }

    protected onButtonClick(): void {
        this.toggle();
    }

    public onButtonFocus(): void {
        if (this.open) {
            this.requestUpdate('open');
            return;
        }
        /* istanbul ignore if */
        if (typeof this.button === 'undefined') {
            return;
        }
        this.button.addEventListener('keydown', this.onKeydown);
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

    public onKeydown(event: KeyboardEvent): void {
        if (event.code !== 'ArrowDown') {
            return;
        }
        /* istanbul ignore if */
        if (!this.optionsMenu) {
            return;
        }
        this.open = true;
    }
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
        const selectedItem = this.querySelector('[selected]') as MenuItem;
        /* istanbul ignore if */
        if (selectedItem) {
            selectedItem.selected = false;
        }
        item.selected = true;
        this.open = false;
        this.focus();
    }

    public toggle(): void {
        this.open = !this.open;
    }

    public close(): void {
        this.open = false;
    }

    private openMenu(): void {
        /* istanbul ignore if */
        if (!this.popover) return;

        const menuWidthCustomPropertyValue = this.style.getPropertyValue(
            '--spectrum-dropdown-menu-width'
        );
        const hasCustomProperty =
            menuWidthCustomPropertyValue.search('-') !== -1;
        // only use `getComputedStyle(this)` if it's a custom property itself
        const computedMenuWidth = hasCustomProperty
            ? getComputedStyle(this).getPropertyValue(
                  '--spectrum-dropdown-menu-width'
              )
            : menuWidthCustomPropertyValue;
        // only use `this.offsetWidth` when no value is available
        const menuWidth = computedMenuWidth || `${this.offsetWidth}px`;
        this.popover.style.setProperty(
            '--spectrum-dropdown-menu-width',
            menuWidth
        );
        this.closeOverlay = Overlay.open(
            this.focusElement,
            'click',
            this.popover,
            {
                placement: this.placement,
            }
        );
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
                          <sp-icon
                              class="icon alert-small"
                              name="ui:AlertSmall"
                              size="s"
                          ></sp-icon>
                      `
                    : nothing}
                <sp-icon
                    class="icon dropdown chevron-down-medium"
                    name="ui:ChevronDownMedium"
                    size="s"
                ></sp-icon>
            `,
        ];
    }

    protected renderItem = (option: MenuItem): TemplateResult => {
        switch (option.tagName.toLowerCase()) {
            case 'sp-menu-item':
                return html`
                    <sp-menu-item
                        ?disabled=${option.disabled}
                        ?quiet=${option.quiet}
                        ?selected=${option.selected ||
                            option.value === this.value}
                        tabindex=${option.tabIndex}
                        value=${option.value}
                    >
                        ${option.textContent}
                    </sp-menu-item>
                `;
            case 'sp-menu-divider':
                return html`
                    <sp-menu-divider></sp-menu-divider>
                `;
        }
        /* istanbul ignore next */
        return html``;
    };

    protected render(): TemplateResult {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <button
                aria-haspopup="true"
                aria-label=${ifDefined(this.label || undefined)}
                id="button"
                @blur=${this.onButtonBlur}
                @click=${this.onButtonClick}
                @focus=${this.onButtonFocus}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </button>
            <sp-popover id="popover" open @sp-overlay-closed=${this.close}>
                <style>
                    sp-popover {
                        width: var(--spectrum-dropdown-menu-width);
                    }
                </style>
                <sp-menu @click=${this.onClick}>
                    ${this.optionsList.length
                        ? html`
                              ${this.optionsList.map(this.renderItem)}
                          `
                        : html`
                              <sp-menu-item disabled>
                                  There are no options currently available.
                              </sp-menu-item>
                          `}
                </sp-menu>
            </sp-popover>

            <slot @slotchange=${this.onOptionsChange} hidden></slot>
        `;
    }

    protected firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);

        /* istanbul ignore if */
        if (!this.shadowRoot) return;
        this.optionsMenu = this.shadowRoot.querySelector('sp-menu') as Menu;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('value')) {
            requestAnimationFrame(() => {
                /* istanbul ignore if */
                if (!this.optionsMenu) {
                    return;
                }
                const items = this.optionsList;
                let selectedItem: MenuItem | undefined;
                items.map((item) => {
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
            });
        }
        if (changedProperties.has('disabled') && this.disabled) {
            this.open = false;
        }
        if (changedProperties.has('open')) {
            if (this.open) {
                this.openMenu();
                requestAnimationFrame(() => {
                    /* istanbul ignore if */
                    if (!this.optionsMenu) {
                        return;
                    }
                    /* Trick :focus-visible polyfill into thinking keyboard based focus */
                    this.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            code: 'Tab',
                        })
                    );
                    this.optionsMenu.focus();
                });
            } else {
                this.closeMenu();
            }
        }
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();

        this.open = false;
    }
}

export class Dropdown extends DropdownBase {
    public static get styles(): CSSResultArray {
        return [...super.styles, fieldButtonStyles];
    }
}
