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

import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import {
  type ElementSize,
  SizedMixin,
} from '@spectrum-web-components/core/mixins/index.js';

import { CHECKBOX_VALID_SIZES } from './Checkbox.types.js';

/**
 * Base class for Spectrum Checkbox components.
 * Holds state and behavior; subclasses provide rendering (input, box, label).
 *
 * @slot - Label content for the checkbox.
 * @fires change - When the checkbox checked state is changed by the user.
 */
export abstract class CheckboxBase extends SizedMixin(SpectrumElement, {
  validSizes: [...CHECKBOX_VALID_SIZES],
  noDefaultSize: true,
}) {
  /**
   * @internal
   */
  static override readonly VALID_SIZES: ElementSize[] = [...CHECKBOX_VALID_SIZES];

  /**
   * The native checkbox input element. Subclasses must provide this via @query.
   * @internal
   */
  abstract get inputElement(): HTMLInputElement;

  /**
   * When this control is rendered, focus it automatically.
   * @internal
   */
  @property({ type: Boolean })
  public override autofocus = false;

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
   * Whether the checkbox uses emphasized (accent) styling when checked.
   */
  @property({ type: Boolean, reflect: true })
  public emphasized = false;

  /**
   * Whether the checkbox is in an invalid state.
   */
  @property({ type: Boolean, reflect: true })
  public invalid = false;

  /**
   * Whether the checkbox is in an indeterminate state (e.g. "select all" with partial selection).
   */
  @property({ type: Boolean, reflect: true })
  public indeterminate = false;

  /**
   * Whether the checkbox is read-only (visual only, no interaction).
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /**
   * Form name for the checkbox when used in a form.
   */
  @property({ type: String, reflect: true })
  public name = '';

  /**
   * Called when the native input fires change. Updates checked state, clears indeterminate,
   * dispatches change event, and reverts if the event is default-prevented.
   * @internal
   */
  public handleChange(): void {
    if (this.readonly) {
      this.inputElement.checked = this.checked;
      return;
    }
    this.checked = this.inputElement.checked;
    this.indeterminate = false;
    const applyDefault = this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: { checked: this.checked },
      })
    );
    if (!applyDefault) {
      this.checked = !this.inputElement.checked;
      this.inputElement.checked = this.checked;
    }
  }

  public override click(): void {
    if (this.disabled) {
      return;
    }
    this.inputElement.click();
  }

  protected override firstUpdated(changes: PropertyValues<this>): void {
    super.firstUpdated(changes);
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }
    if (this.autofocus) {
      this.updateComplete.then(() => this.focus());
    }
  }

  protected override updated(changes: PropertyValues<this>): void {
    super.updated(changes);
    if (changes.has('invalid') && this.inputElement) {
      if (this.invalid) {
        this.inputElement.setAttribute('aria-invalid', 'true');
      } else {
        this.inputElement.removeAttribute('aria-invalid');
      }
    }
    if (changes.has('disabled') && this.inputElement) {
      this.inputElement.disabled = this.disabled;
    }
    if (changes.has('indeterminate') && this.inputElement) {
      this.inputElement.indeterminate = this.indeterminate;
    }
  }
}
