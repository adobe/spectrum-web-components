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
import '../menu';
import '../menu-item';
import '../menu-group';
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
            <sp-action-button
                @click=${this.toggle}
                ?disabled=${this.disabled}
                aria-haspopup="true"
                icon-right
                class="spectrum-Dropdown-trigger"
            >
                Select a Country with a very long label, too long in fact
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
            </sp-action-button>
            <sp-popover
                direction="bottom"
                ?open=${this.open}
                class="spectrum-Dropdown-popover"
            >
                <sp-menu>
                    <sp-menu-item>
                        Deselect
                    </sp-menu-item>
                    <sp-menu-item>
                        Select Inverse
                    </sp-menu-item>
                    <sp-menu-item>
                        Feather...
                    </sp-menu-item>
                    <sp-menu-item>
                        Select and Mask...
                    </sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>
                        Save Selection
                    </sp-menu-item>
                    <sp-menu-item disabled>
                        Make Work Path
                    </sp-menu-item>
                </sp-menu>
            </sp-popover>
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        if (changedProperties.has('disabled') && this.disabled) {
            this.open = false;
        }
    }
}
