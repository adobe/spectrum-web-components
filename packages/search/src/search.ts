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
    CSSResultArray,
    PropertyValues,
    TemplateResult,
    property,
    query,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import { Textfield } from '@spectrum-web-components/textfield';
import '@spectrum-web-components/button';
import '@spectrum-web-components/icon';
import '@spectrum-web-components/icons';

import searchStyles from './search.css.js';
import magnifierStyles from '@spectrum-web-components/icon/lib/spectrum-icon-magnifier.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 */

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

    public reset(): void {
        /* istanbul ignore if */
        if (!this.form) {
            return;
        }
        this.value = '';
        this.form.reset();
    }

    protected render(): TemplateResult {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <form
                action=${ifDefined(this.action)}
                id="form"
                method=${ifDefined(this.method)}
                @submit=${this.handleSubmit}
            >
                ${super.render()}
                <sp-icon
                    id="icon"
                    class="icon magnifier"
                    size="s"
                    name="ui:Magnifier"
                ></sp-icon>
                ${this.value
                    ? html`
                          <sp-clear-button
                              id="button"
                              label="Reset"
                              @click=${this.reset}
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
