/**
 * Copyright 2026 Adobe. All rights reserved.
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

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';

import { CHECKBOX_VALID_SIZES } from './Checkbox.types.js';

/**
 * Base class for checkbox components. Renders the native input and manages
 * checked state, change handling, and form-related attributes.
 *
 * @slot - The label content for the checkbox.
 * @fires change - Dispatched when the checked state changes.
 */
export abstract class CheckboxBase extends SizedMixin(SpectrumElement, {
  validSizes: CHECKBOX_VALID_SIZES,
  noDefaultSize: true,
}) {
  // ─────────────────────────
  //     SHARED API
  // ─────────────────────────

  /**
   * Whether the checkbox is checked.
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * The name of the checkbox for form submission.
   */
  @property({ type: String, reflect: true })
  public name: string | undefined;

  /**
   * When true, prevents the checked state from changing (read-only).
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /**
   * Disables the checkbox. It will not receive focus or events.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * When true, shows the indeterminate state (partial check).
   */
  @property({ type: Boolean, reflect: true })
  public indeterminate = false;

  /**
   * When true, indicates an invalid state (e.g. form validation).
   */
  @property({ type: Boolean, reflect: true })
  public invalid = false;

  /**
   * When true, uses the emphasized visual style.
   */
  @property({ type: Boolean, reflect: true })
  public emphasized = false;

  @property({ reflect: true, type: Number, attribute: 'tabindex' })
  public override tabIndex = 0;

  @query('#input')
  public inputElement!: HTMLInputElement;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  public override connectedCallback(): void {
    super.connectedCallback();
    if (this.hasAttribute('autofocus')) {
      this.updateComplete.then(() => {
        this.focus();
      });
    }
  }

  /**
   * Focuses the underlying input element.
   */
  public override focus(options?: FocusOptions): void {
    this.inputElement?.focus(options);
  }

  /**
   * Handles the change event from the native input. Subclasses may override
   * (e.g. to clear indeterminate state).
   */
  public handleChange(): void {
    if (this.readonly) {
      this.inputElement.checked = this.checked;
      return;
    }
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
   * Renders the native checkbox input. Subclasses should call this and add
   * the visual box and label in their render.
   */
  protected override render(): TemplateResult {
    return html`
      <input
        id="input"
        name=${ifDefined(this.name ?? undefined)}
        type="checkbox"
        .checked=${this.checked}
        ?disabled=${this.readonly || this.disabled}
        @change=${this.handleChange}
      />
    `;
  }

  protected override updated(changes: PropertyValues<this>): void {
    super.updated(changes);
    if (!this.inputElement) {
      return;
    }

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
    if (changes.has('indeterminate')) {
      this.inputElement.indeterminate = this.indeterminate;
    }
    if (changes.has('invalid')) {
      if (this.invalid) {
        this.inputElement.setAttribute('aria-invalid', 'true');
      } else {
        this.inputElement.removeAttribute('aria-invalid');
      }
    }
  }
}
