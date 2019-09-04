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

import { property, html, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Focusable } from '@spectrum-web-components/shared/lib/focusable.js';

export class ButtonBase extends Focusable {
    /**
     * Supplies an address that the browser will navigate to when this button is
     * clicked
     */
    @property()
    public href?: string;

    @property()
    public target?: string;

    @property({ type: Boolean, reflect: true, attribute: 'icon-right' })
    protected iconRight = false;

    private get hasIcon(): boolean {
        return !!this.querySelector('[slot="icon"]');
    }

    public get focusElement(): HTMLElement {
        if (this.shadowRoot) {
            return this.shadowRoot.querySelector('#button') as HTMLElement;
        }
        return this;
    }

    protected get buttonContent(): TemplateResult[] {
        const icon = html`
            <slot name="icon"></slot>
        `;
        const content = [
            html`
                <div id="label"><slot></slot></div>
            `,
        ];
        if (!this.hasIcon) {
            return content;
        }
        this.iconRight ? content.push(icon) : content.unshift(icon);
        return content;
    }

    protected render(): TemplateResult {
        return this.href && this.href.length > 0
            ? html`
                  <a
                      href="${this.href}"
                      id="button"
                      target=${ifDefined(this.target)}
                  >
                      ${this.buttonContent}
                  </a>
              `
            : html`
                  <button id="button">
                      ${this.buttonContent}
                  </button>
              `;
    }
}
