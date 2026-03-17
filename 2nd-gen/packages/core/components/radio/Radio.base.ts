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

import { RADIO_VALID_SIZES } from './Radio.types.js';

/**
 * Base class for Spectrum Radio components.
 * Holds state and behavior; subclasses provide rendering.
 *
 * @slot - Text label of the radio button.
 * @fires change - When the input is interacted with and its state is changed.
 */
export abstract class RadioBase extends SizedMixin(SpectrumElement, {
  validSizes: [...RADIO_VALID_SIZES],
  noDefaultSize: true,
}) {
  /**
   * @internal
   */
  static override readonly VALID_SIZES: ElementSize[] = [...RADIO_VALID_SIZES];

  /**
   * When this control is rendered, focus it automatically.
   * @internal
   */
  @property({ type: Boolean })
  public override autofocus = false;

  /**
   * Identifies this radio button within its radio group.
   */
  @property({ type: String, reflect: true })
  public value = '';

  /**
   * Whether the radio is selected.
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * Whether the radio is disabled.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Whether the radio uses emphasized (accent) styling when checked.
   */
  @property({ type: Boolean, reflect: true })
  public emphasized = false;

  /**
   * Whether the radio is in an invalid state.
   */
  @property({ type: Boolean, reflect: true })
  public invalid = false;

  /**
   * Whether the radio is read-only (visual only, no interaction).
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /**
   * @internal
   */
  public override click(): void {
    if (this.disabled) {
      return;
    }
    this.activate();
  }

  /**
   * Set the radio to checked and dispatch change. Called on click and Space key.
   * @internal
   */
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

  /**
   * @internal
   */
  protected handleKeyup(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      this.activate();
    }
  }

  /**
   * @internal
   */
  protected manageAutoFocus(): void {
    if (this.autofocus) {
      this.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'Tab',
        })
      );
      this.focus();
    }
  }

  protected override firstUpdated(changes: PropertyValues<this>): void {
    super.firstUpdated(changes);
    this.setAttribute('role', 'radio');
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }
    this.manageAutoFocus();
    this.addEventListener('click', () => this.activate());
    this.addEventListener('keyup', (e: KeyboardEvent) => this.handleKeyup(e));
  }

  protected override updated(changes: PropertyValues<this>): void {
    super.updated(changes);
    if (changes.has('invalid')) {
      if (this.invalid) {
        this.setAttribute('aria-invalid', 'true');
      } else {
        this.removeAttribute('aria-invalid');
      }
    }
    if (changes.has('checked')) {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
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
