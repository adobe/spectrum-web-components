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

import { property, html, TemplateResult } from 'lit-element';
import { Focusable } from '../shared/focusable';

export class ButtonBase extends Focusable {
    /**
     * Supplies an address that the browser will navigate to when this button is
     * clicked
     */
    @property()
    public href?: string;

    @property({ type: Boolean, reflect: true, attribute: 'icon-right' })
    protected iconRight = false;

    public get focusElement(): HTMLElement {
        if (this.shadowRoot) {
            return this.shadowRoot.querySelector('#button') as HTMLElement;
        }
        return this;
    }

    protected renderWithIcon(): TemplateResult[] {
        const iconAndLabel = [
            html`
                <slot name="icon"></slot>
            `,
            html`
                <div id="label"><slot></slot></div>
            `,
        ];
        return this.iconRight ? iconAndLabel.reverse() : iconAndLabel;
    }

    protected render(): TemplateResult {
        return this.href && this.href.length > 0
            ? html`
                  <a href="${this.href}" id="button">
                      ${this.renderWithIcon()}
                  </a>
              `
            : html`
                  <button id="button">${this.renderWithIcon()}</button>
              `;
    }
}
