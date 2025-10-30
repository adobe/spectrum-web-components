/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    CSSResultArray,
    html,
    nothing,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import { Textfield } from '@spectrum-web-components/textfield';
import '@spectrum-web-components/button/sp-clear-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-search.js';

import searchStyles from './search.css.js';

const stopPropagation = (event: Event): void => event.stopPropagation();

/**
 * @element sp-search
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 *
 * @fires submit - The search form has been submitted.
 */
export class Search extends Textfield {
    public static override get styles(): CSSResultArray {
        return [...super.styles, searchStyles];
    }

    @property()
    public action = '';

    @property()
    public override label = 'Search';

    @property()
    public method?: 'get' | 'post' | 'dialog';

    @property()
    public override placeholder = 'Search';

    /**
     * Controls whether the typed value should be held (i.e., not cleared or reset) when the Escape key is pressed.
     * If set to true, pressing the Escape key will not affect the value in the search field.
     */
    @property({ type: Boolean })
    public holdValueOnEscape!: boolean;

    @query('#form')
    public form!: HTMLFormElement;

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
        if (code === 'Escape' && this.holdValueOnEscape) {
            return;
        }
        if (!this.value || code !== 'Escape') {
            return;
        }
        this.reset();
    }

    public async reset(): Promise<void> {
        this.value = '';
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

    protected override renderField(): TemplateResult {
        return html`
            <form
                action=${this.action}
                id="form"
                method=${ifDefined(this.method)}
                @submit=${this.handleSubmit}
                @reset=${this.reset}
                @keydown=${this.handleKeydown}
            >
                <sp-icon-search
                    size=${this.size}
                    class="icon magnifier icon-workflow icon-search"
                ></sp-icon-search>
                ${super.renderField()}
                ${this.value
                    ? html`
                          <sp-clear-button
                              id="button"
                              label="Reset"
                              tabindex="-1"
                              type="reset"
                              size=${ifDefined(this.size)}
                              @keydown=${stopPropagation}
                          ></sp-clear-button>
                      `
                    : nothing}
            </form>
        `;
    }

    public override firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);
        // if holdValueOnEscape is not set, default to search type
        if (!this.hasAttribute('holdValueOnEscape')) {
            this.inputElement.setAttribute('type', 'search');
        }
    }

    public override willUpdate(): void {
        this.multiline = false;
    }
}
