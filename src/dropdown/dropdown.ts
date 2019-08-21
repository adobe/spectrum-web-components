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
import buttonStyles from '../button/action-button.css';

import { defineCustomElements } from '../define';
import '../icon';
import '../popover';
import '../menu-item';
import * as MediumIcons from '../icons/icons-medium';
import { nothing } from 'lit-html';
import { Menu } from '../menu';
import { MenuItem } from '../menu-item';
import { Focusable } from '../shared/focusable';

defineCustomElements(...Object.values(MediumIcons));

/**
 * @slot default - This is the illustrated message slot
 */
export class Dropdown extends Focusable {
    public static get styles(): CSSResultArray {
        return [buttonStyles, dropdownStyles];
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

    @property({ type: String })
    public value = '';

    public constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
        this.addEventListener('click', this.onClick);
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

    protected onButtonClick(ev: Event): void {
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
            if (!(el instanceof Element)) {
                return false;
            }
            return el.getAttribute('role') === 'menuitem';
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
        const selectedItem = this.querySelector('[selected]') as MenuItem;
        if (selectedItem) {
            selectedItem.selected = false;
        }
        item.selected = true;
        this.value = (item.textContent || '').trim();
        this.open = false;
        if (this.button) {
            this.button.focus();
        }
    }

    public toggle(): void {
        this.open = !this.open;
    }

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                ${this.value
                    ? this.value
                    : html`
                          <div id="label"><slot></slot></div>
                      `}
                ${this.invalid
                    ? html`
                          <sp-icon name="ui:AlertSmall" slot="icon"></sp-icon>
                      `
                    : nothing}
                <sp-icon
                    name="ui:ChevronDownMedium"
                    size="s"
                    slot="icon"
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
            <sp-popover
                direction="bottom"
                ?open=${this.open}
                class="spectrum-Dropdown-popover"
            >
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
