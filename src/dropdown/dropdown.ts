/*
Copyright 2018 Adobe. All rights reserved.
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
    LitElement,
    property,
    PropertyValues,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import dropdownStyles from './dropdown.css';

import { defineCustomElements } from '../define';
import '../icon';
import '../popover';
import * as MediumIcons from '../icons/icons-medium';
import { nothing } from 'lit-html';

defineCustomElements(...Object.values(MediumIcons));

/**
 * @slot default - This is the illustrated message slot
 */
export class Dropdown extends LitElement {
    public static get styles(): CSSResultArray {
        return [dropdownStyles];
    }

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property({ type: Boolean, reflect: true })
    public open = false;

    public toggle(): void {
        this.open = !this.open;
    }

    protected render(): TemplateResult {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <button
                @click=${this.toggle}
                ?disabled=${this.disabled}
                class="spectrum-FieldButton spectrum-Dropdown-trigger"
                aria-haspopup="true"
            >
                <span class="spectrum-Dropdown-label is-placeholder">
                    Select a Country with a very long label, too long in fact
                </span>
                ${this.invalid
                    ? html`
                          <sp-icon name="ui:AlertSmall" class="icon"></sp-icon>
                      `
                    : nothing}
                <sp-icon
                    name="ui:ChevronDownMedium"
                    class="icon dropdown"
                    size="s"
                ></sp-icon>
            </button>
            <sp-popover
                direction="bottom"
                ?open=${this.open}
                class="spectrum-Dropdown-popover"
            >
                <ul class="spectrum-Menu" role="listbox">
                    <li
                        class="spectrum-Menu-item is-selected"
                        role="option"
                        aria-selected="true"
                        tabindex="0"
                    >
                        <span class="spectrum-Menu-itemLabel">Ballard</span>
                        <svg
                            class="spectrum-Icon spectrum-UIIcon-CheckmarkMedium spectrum-Menu-checkmark"
                            focusable="false"
                            aria-hidden="true"
                        >
                            <use
                                xlink:href="#spectrum-css-icon-CheckmarkMedium"
                            ></use>
                        </svg>
                    </li>
                    <li class="spectrum-Menu-item" role="option" tabindex="0">
                        <span class="spectrum-Menu-itemLabel">Fremont</span>
                    </li>
                    <li class="spectrum-Menu-item" role="option" tabindex="0">
                        <span class="spectrum-Menu-itemLabel">Greenwood</span>
                    </li>
                    <li class="spectrum-Menu-divider" role="separator"></li>
                    <li
                        class="spectrum-Menu-item is-disabled"
                        role="option"
                        aria-disabled="true"
                    >
                        <span class="spectrum-Menu-itemLabel">
                            United States of America
                        </span>
                    </li>
                </ul>
            </sp-popover>
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        if (changedProperties.has('disabled') && this.disabled) {
            this.open = false;
        }
    }
}
