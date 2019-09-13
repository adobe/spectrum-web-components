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

import { html, property, CSSResultArray, TemplateResult } from 'lit-element';

import { Focusable } from '@spectrum-web-components/shared/lib/focusable.js';

import tabItemStyles from './tab.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 */

export class Tab extends Focusable {
    public static get styles(): CSSResultArray {
        return [tabItemStyles];
    }

    private get hasIcon(): boolean {
        return !!this.querySelector('[slot="icon"]');
    }

    @property({ reflect: true })
    public label = '';

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    @property({ type: String, reflect: true })
    public value = '';

    public get focusElement(): HTMLElement {
        return this;
    }

    protected render(): TemplateResult {
        return html`
            ${this.hasIcon
                ? html`
                      <slot name="icon"></slot>
                  `
                : html``}
            <label id="itemLabel">
                ${this.label}
            </label>
        `;
    }
}
