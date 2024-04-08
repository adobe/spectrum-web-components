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

import { TextfieldBase } from '@spectrum-web-components/textfield';
import { ClearButton } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-clear-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';

import searchStyles from './search.css.js';

const stopPropagation = (event: Event): void => event.stopPropagation();

/**
 * @element sp-search
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 *
 * @fires submit - The search form has been submitted.
 */
export class Search extends TextfieldBase {
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

    @property({ type: String })
    public override set value(value: string) {
        if (value === this.value) {
            return;
        }
        const oldValue = this._value;
        this._value = value;
        this.requestUpdate('value', oldValue);
    }

    public override get value(): string {
        return this._value;
    }

    protected override _value = '';

    @query('#form')
    public form!: HTMLFormElement;

    @query('sp-clear-button')
    protected clearButton!: ClearButton;

    private _formEventHandlers = {
        submit: this.handleSubmit.bind(this),
        reset: this.reset.bind(this),
        keydown: this.handleKeydown.bind(this),
    };

    protected override _firstUpdateAfterConnected = false;

    protected formAbortController?: AbortController;

    protected clearButtonAbortController?: AbortController;

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

    private _manageClearButtonListeners(): void {
        // add clear button listener when button is added to the DOM
        if (this.clearButton && !this.clearButtonAbortController) {
            this.clearButtonAbortController = new AbortController();
            const { signal } = this.clearButtonAbortController;
            this.clearButton.addEventListener('keydown', stopPropagation, {
                signal,
            });

            // remove listener when button is removed from DOM
        } else if (!this.clearButton && this.clearButtonAbortController) {
            this.clearButtonAbortController.abort();
            this.clearButtonAbortController = undefined;
        }
    }

    protected override renderField(): TemplateResult {
        return html`
            <form
                action=${this.action}
                id="form"
                method=${ifDefined(this.method)}
            >
                <sp-icon-magnify
                    class="icon magnifier icon-workflow icon-search"
                ></sp-icon-magnify>
                ${super.renderField()}
                ${this.value
                    ? html`
                          <sp-clear-button
                              id="button"
                              label="Reset"
                              tabindex="-1"
                              type="reset"
                              size=${ifDefined(this.size)}
                          ></sp-clear-button>
                      `
                    : nothing}
            </form>
        `;
    }

    public override firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);
        this.inputElement.setAttribute('type', 'search');
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this._firstUpdateAfterConnected = true;
        this.requestUpdate();
    }

    public override disconnectedCallback(): void {
        // Cleanup all form & button event listeners and remove form element from DOM
        this.formAbortController?.abort();
        this.clearButtonAbortController?.abort();
        this.clearButtonAbortController = undefined;
        this.form.remove();

        super.disconnectedCallback();
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        // Adding this here instead of firstUpdated because we want to make sure
        // this is called again on the first update after a previous disconnect
        if (this._firstUpdateAfterConnected) {
            this._firstUpdateAfterConnected = false;
            this.firstUpdateAfterConnected();
        }

        if (changedProperties.has('value')) {
            this._manageClearButtonListeners();
        }
    }

    protected override firstUpdateAfterConnected(): void {
        super.firstUpdateAfterConnected();

        this.formAbortController = new AbortController();
        const { signal } = this.formAbortController;
        this.form.addEventListener(
            'submit',
            this._formEventHandlers['submit'],
            { signal }
        );
        this.form.addEventListener('reset', this._formEventHandlers['reset'], {
            signal,
        });
        this.form.addEventListener(
            'keydown',
            this._formEventHandlers['keydown'],
            { signal }
        );

        this._manageClearButtonListeners();
    }

    public override willUpdate(): void {
        this.multiline = false;
    }
}
