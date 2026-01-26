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
import { html, PropertyValues, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
    SizedMixin,
    SpectrumElement,
} from '@spectrum-web-components/core/shared/base/index.js';

/**
 * A checkbox component that allows users to select or deselect options.
 * Checkboxes are typically used to allow users to make binary choices (yes/no, on/off)
 * or to select multiple items from a list.
 *
 * @attribute {ElementSize} size - The size of the checkbox.
 * @attribute {boolean} checked - Whether the checkbox is checked.
 * @attribute {boolean} disabled - Whether the checkbox is disabled.
 * @attribute {boolean} emphasized - Whether to use emphasized styling for the checked state.
 * @attribute {boolean} indeterminate - Whether the checkbox is in an indeterminate state.
 * @attribute {boolean} invalid - Whether the checkbox is in an invalid state.
 * @attribute {boolean} readonly - Whether the checkbox is readonly (checked state cannot be changed).
 * @attribute {string} name - The name of the checkbox for form submission.
 * @attribute {boolean} autofocus - Whether the checkbox should automatically receive focus when the page loads.
 *
 * @slot - Text label of the checkbox.
 *
 * @fires change - Announces a change in the checked property of the checkbox.
 */
export abstract class CheckboxBase extends SizedMixin(SpectrumElement, {
    noDefaultSize: true,
}) {
    // ──────────────────
    //     SHARED API
    // ──────────────────

    /**
     * Whether the checkbox is checked.
     */
    @property({ type: Boolean, reflect: true })
    public checked = false;

    /**
     * Whether the checkbox is disabled.
     */
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    /**
     * Whether to use emphasized styling for the checked state.
     */
    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    /**
     * Whether the checkbox is in an indeterminate state.
     * This is typically used for a "partially checked" state in hierarchical lists.
     */
    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

    /**
     * Whether the checkbox is in an invalid state.
     */
    @property({ type: Boolean, reflect: true })
    public invalid = false;

    /**
     * The name of the checkbox for form submission.
     */
    @property({ type: String, reflect: true })
    public name: string | undefined;

    /**
     * Whether the checkbox is readonly.
     * When readonly, the checkbox can be focused but its checked state cannot be changed.
     */
    @property({ type: Boolean, reflect: true })
    public readonly = false;

    /**
     * The tab index of the checkbox.
     */
    @property({ reflect: true, type: Number, attribute: 'tabindex' })
    public override tabIndex = 0;

    /**
     * Whether the checkbox should automatically receive focus when the page loads.
     */
    @property({ type: Boolean, reflect: true })
    public autofocus = false;

    // ──────────────────────
    //     IMPLEMENTATION
    // ──────────────────────

    /**
     * @internal
     * Reference to the native input element.
     */
    @query('#input')
    protected inputElement!: HTMLInputElement;

    /**
     * Programmatically click the checkbox.
     */
    public override click(): void {
        if (this.disabled) {
            return;
        }

        this.inputElement?.click();
    }

    /**
     * Handle changes to the checkbox state.
     * @internal
     */
    protected handleChange(): void {
        if (this.readonly) {
            this.inputElement.checked = this.checked;
            return;
        }

        // Clear indeterminate state when user interacts
        this.indeterminate = false;

        this.checked = this.inputElement.checked;

        const changeEvent = new CustomEvent('change', {
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        const applyDefault = this.dispatchEvent(changeEvent);

        if (!applyDefault) {
            this.checked = !this.inputElement.checked;
            this.inputElement.checked = this.checked;
        }
    }

    /**
     * Render the native input element.
     * @internal
     */
    protected renderInput(): TemplateResult {
        return html`
            <input
                id="input"
                type="checkbox"
                name=${ifDefined(this.name || undefined)}
                .checked=${this.checked}
                ?disabled=${this.readonly}
                @change=${this.handleChange}
            />
        `;
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);

        // Handle disabled state and tabindex management
        if (
            changes.has('disabled') &&
            (typeof changes.get('disabled') !== 'undefined' || this.disabled)
        ) {
            if (this.disabled) {
                this.inputElement.tabIndex = this.tabIndex;
                this.tabIndex = -1;
            } else {
                this.tabIndex = this.inputElement.tabIndex;
                this.inputElement.removeAttribute('tabindex');
            }
            this.inputElement.disabled = this.disabled;
        }

        // Sync indeterminate state to native input
        if (changes.has('indeterminate')) {
            this.inputElement.indeterminate = this.indeterminate;
        }

        // Sync invalid state to aria attribute
        if (changes.has('invalid')) {
            if (this.invalid) {
                this.inputElement.setAttribute('aria-invalid', 'true');
            } else {
                this.inputElement.removeAttribute('aria-invalid');
            }
        }
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        if (this.autofocus || this.hasAttribute('autofocus')) {
            this.updateComplete.then(() => {
                this.focus();
            });
        }
    }
}
