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

import dropdownStyles from './dropdown.css';
import actionButtonStyles from '../button/action-button.css';
import fieldButtonStyles from '../button/field-button.css';

import { defineCustomElements } from '../define';
import '../icon';
import '../popover';
import '../menu-item';
import * as MediumIcons from '../icons/icons-medium';
import { nothing } from 'lit-html';
import { Menu, MenuQueryRoleEventDetail } from '../menu';
import { MenuItem, MenuItemQueryRoleEventDetail } from '../menu-item';
import { Focusable } from '../shared/focusable';
import { ifDefined } from 'lit-html/directives/if-defined';

defineCustomElements(...Object.values(MediumIcons));

/**
 * @slot default - The placeholder content for the dropdown
 * @slot options - The menu with options that will display when the dropdown is open
 */
export class Dropdown extends Focusable {
    public static get styles(): CSSResultArray {
        return [actionButtonStyles, fieldButtonStyles, dropdownStyles];
    }

    @query('#button')
    public button?: HTMLButtonElement;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property({ type: Boolean, reflect: true })
    public open = false;

    public optionsMenu: Menu | null = null;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: String })
    public value = '';

    protected listRole: string = 'listbox';
    protected itemRole: string = 'option';

    public constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
        this.addEventListener('click', this.onClick);

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
        if (this.button) {
            return this.button;
        }
        return this;
    }

    public onOptionsChange(): void {
        this.optionsMenu = this.querySelector('sp-menu');
    }

    public onButtonBlur(): void {
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
        if (typeof this.button === 'undefined') {
            return;
        }
        this.button.addEventListener('keydown', this.onKeydown);
    }

    public onClick(ev: Event): void {
        const path = ev.composedPath();
        const target = path.find((el) => {
            if (!(el instanceof Element) || this.optionsMenu === null) {
                return false;
            }
            return el.getAttribute('role') === this.optionsMenu.childRole;
        }) as MenuItem;
        if (!target) {
            return;
        }
        this.setValueFromItem(target);
    }

    public onKeydown(ev: KeyboardEvent): void {
        if (ev.code !== 'ArrowDown') {
            return;
        }
        if (this.optionsMenu === null) {
            return;
        }
        this.open = true;
    }

    public setValueFromItem(item: MenuItem): void {
        const oldValue = this.value;
        this.value = (item.textContent || '').trim();
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
            })
        );
        if (!applyDefault) {
            this.value = oldValue;
            return;
        }
        const selectedItem = this.querySelector('[selected]') as MenuItem;
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

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                <div
                    id="label"
                    class=${ifDefined(this.value ? undefined : 'placeholder')}
                >
                    ${this.value
                        ? this.value
                        : html`
                              <slot></slot>
                          `}
                </div>
                ${this.invalid
                    ? html`
                          <sp-icon
                              class="icon"
                              name="ui:AlertSmall"
                              size="s"
                          ></sp-icon>
                      `
                    : nothing}
                <sp-icon
                    class="icon dropdown"
                    name="ui:ChevronDownMedium"
                    size="s"
                ></sp-icon>
            `,
        ];
    }

    protected render(): TemplateResult {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <button
                aria-haspopup="true"
                id="button"
                @blur=${this.onButtonBlur}
                @click=${this.onButtonClick}
                @focus=${this.onButtonFocus}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </button>
            <sp-popover direction="bottom" id="popover" ?open=${this.open}>
                <slot name="options" @slotchange=${this.onOptionsChange}>
                    <sp-menu-item disabled>
                        There are no options currently available.
                    </sp-menu-item>
                </slot>
            </sp-popover>
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('disabled') && this.disabled) {
            this.open = false;
        }
        if (changedProperties.has('open') && this.open) {
            requestAnimationFrame(() => {
                if (this.optionsMenu === null) {
                    return;
                }
                this.optionsMenu.focus();
            });
        }
    }
}
