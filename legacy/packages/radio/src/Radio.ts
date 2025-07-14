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
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';

import radioStyles from './radio.css.js';

/**
 * @element sp-radio
 *
 * @slot - text label of the Radio button
 * @attr invalid - Uses the invalid style
 * @attr disabled - Uses the disabled style
 * @attr checked - Represents when the input is checked
 * @attr value - Identifies this radio button within its radio group
 *
 * @fires change - When the input is interacted with and its state is changed
 */
export class Radio extends SizedMixin(
    FocusVisiblePolyfillMixin(SpectrumElement),
    { noDefaultSize: true }
) {
    public static override get styles(): CSSResultArray {
        return [radioStyles];
    }

    /**
     * When this control is rendered, focus it automatically
     * @private
     */
    @property({ type: Boolean })
    public override autofocus = false;

    @property({ type: String, reflect: true })
    public value = '';

    @property({ type: Boolean, reflect: true })
    public checked = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property({ type: Boolean, reflect: true })
    public readonly = false;

    public override click(): void {
        if (this.disabled) {
            return;
        }
        this.activate();
    }

    protected manageAutoFocus(): void {
        if (this.autofocus) {
            /**
             * Trick :focus-visible polyfill into thinking keyboard based focus
             *
             * @private
             **/
            this.dispatchEvent(
                new KeyboardEvent('keydown', {
                    code: 'Tab',
                })
            );
            this.focus();
        }
    }

    protected activate(): void {
        if (this.checked) {
            return;
        }
        this.checked = true;
        this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    protected handleKeyup(event: KeyboardEvent): void {
        if (event.code === 'Space') {
            this.activate();
        }
    }

    protected override render(): TemplateResult {
        return html`
            <div id="input"></div>
            <span id="button"></span>
            <span id="label" role="presentation"><slot></slot></span>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('role', 'radio');
        if (!this.hasAttribute('tabindex')) {
            this.tabIndex = 0;
        }
        this.manageAutoFocus();
        this.addEventListener('click', this.activate);
        this.addEventListener('keyup', this.handleKeyup);
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('invalid')) {
            if (this.invalid) {
                this.setAttribute('aria-invalid', 'true');
            } else {
                this.removeAttribute('aria-invalid');
            }
        }
        if (changes.has('checked')) {
            if (this.checked) {
                this.setAttribute('aria-checked', 'true');
            } else {
                this.setAttribute('aria-checked', 'false');
            }
        }
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
            }
        }
    }
}
