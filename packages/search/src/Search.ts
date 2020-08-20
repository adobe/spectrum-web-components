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
    CSSResultArray,
    PropertyValues,
    TemplateResult,
    property,
    query,
} from '@spectrum-web-components/base';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { Textfield } from '@spectrum-web-components/textfield';
import '@spectrum-web-components/button/sp-clear-button.js';
import '@spectrum-web-components/icon/sp-icon.js';
import { MagnifierIcon } from '@spectrum-web-components/icons-ui';

import searchStyles from './search.css.js';
import magnifierStyles from '@spectrum-web-components/icon/src/spectrum-icon-magnifier.css.js';

const stopPropagation = (event: Event): void => event.stopPropagation();

export class Search extends Textfield {
    public static get styles(): CSSResultArray {
        return [...super.styles, searchStyles, magnifierStyles];
    }

    @property()
    public action?: string;

    @property()
    public label = 'Search';

    @property()
    public method?: 'GET' | 'POST' | 'dialog';

    @property()
    public placeholder = 'Search';

    @query('#form')
    public form?: HTMLFormElement;

    private handleSubmit(event: Event): void {
        const applyDefault = this.dispatchEvent(
            new Event('submit', {
                cancelable: true,
                bubbles: true,
            })
        );
        if (!applyDefault) {
            event.preventDefault();
        }
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        if (!this.value || code !== 'Escape') {
            return;
        }
        this.reset();
    }

    public async reset(): Promise<void> {
        /* istanbul ignore if */
        if (!this.form) {
            return;
        }
        this.value = '';
        this.form.reset();
        await this.updateComplete;
        this.focusElement.dispatchEvent(
            new InputEvent('input', {
                bubbles: true,
                composed: true,
            })
        );
        // The native `change` event on an `input` element is not composed,
        // so this synthetic replication of a `change` event must not be
        // either as the `Textfield` baseclass should only need to handle
        // the native variant of this interaction.
        this.focusElement.dispatchEvent(
            new InputEvent('change', {
                bubbles: true,
            })
        );
    }

    protected render(): TemplateResult {
        return html`
            <form
                action=${ifDefined(this.action)}
                id="form"
                method=${ifDefined(this.method)}
                @submit=${this.handleSubmit}
                @keydown=${this.handleKeydown}
            >
                <sp-icon class="icon magnifier icon-workflow" size="s">
                    ${MagnifierIcon({ hidden: true })}
                </sp-icon>
                ${super.render()}
                ${this.value
                    ? html`
                          <sp-clear-button
                              id="button"
                              label="Reset"
                              tabindex="-1"
                              @click=${this.reset}
                              @keydown=${stopPropagation}
                          ></sp-clear-button>
                      `
                    : html``}
            </form>
        `;
    }

    public updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('multiline')) {
            this.multiline = false;
        }
    }
}
