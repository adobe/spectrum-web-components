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
    CSSResultArray,
    PropertyValues,
    TemplateResult,
} from 'lit-element';

import menuItemStyles from './menu-item.css';
import { nothing } from 'lit-html';
import { defineCustomElements } from '../define';
import '../icon';
import * as MediumIcons from '../icons/icons-medium';

defineCustomElements(...Object.values(MediumIcons));

/**
 * Spectrum Link Component
 *
 * @attr quiet - uses quiet styles or not
 * @attr over-background - uses over background styles or not
 */
export class MenuItem extends LitElement {
    public static get styles(): CSSResultArray {
        return [menuItemStyles];
    }

    private get hasIcon(): boolean {
        return !!this.querySelector('[slot="icon"]');
    }

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public divider = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Number })
    public tabindex = 0;

    public render(): TemplateResult {
        if (this.divider)
            return html`
                <div id="item" class="divider"></div>
            `;
        return html`
            <button id="item" tabindex=${this.disabled ? -1 : this.tabindex}>
                ${this.hasIcon
                    ? html`
                          <slot name="icon"></slot>
                      `
                    : nothing}
                <span id="label"><slot></slot></span>
                ${this.selected
                    ? html`
                          <sp-icon
                              id="selected"
                              name="ui:CheckmarkMedium"
                              size="s"
                              slot="icon"
                          ></sp-icon>
                      `
                    : nothing}
            </button>
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        if (changedProperties.has('divider')) {
            this.setAttribute('role', this.divider ? 'separator' : 'menuitem');
        }
    }
}
