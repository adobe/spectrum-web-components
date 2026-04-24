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
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';

import { BUTTON_VALID_SIZES } from './Button.types.js';

/**
 * Abstract base class for all button-like components. Owns shared semantic
 * concerns: interaction state, sizing, accessible-name resolution, and
 * host-to-internal-button attribute forwarding.
 *
 * Visual API specific to `sp-button` (`variant`, `fill-style`, `static-color`)
 * is intentionally absent so that ActionButton, ClearButton, CloseButton,
 * PickerButton, and InfieldButton can extend this base without inheriting
 * the `swc-button` visual surface.
 *
 * @slot - Visible button label.
 * @slot icon - Optional leading icon.
 */
export abstract class ButtonBase extends SizedMixin(SpectrumElement, {
  validSizes: BUTTON_VALID_SIZES,
}) {
  protected override createRenderRoot(): ShadowRoot {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  /**
   * Whether the button is disabled. Removes focusability and prevents
   * interaction.
   */
  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  /**
   * Whether the button is in a pending (busy) state. The button remains
   * focusable but activation is suppressed.
   */
  @property({ type: Boolean, reflect: true })
  public pending: boolean = false;

  /**
   * Custom accessible label used during the pending state. When omitted,
   * the pending label is derived from the resolved non-busy accessible name
   * plus a busy suffix (e.g. "Save, busy").
   */
  @property({ type: String, attribute: 'pending-label' })
  public pendingLabel?: string;

  /**
   * Resolves the accessible name for the button from `aria-label` or
   * visible text content. Returns `null` when no accessible name is
   * determinable.
   *
   * @internal
   */
  protected getResolvedAccessibleName(): string | null {
    return (
      this.getAttribute('aria-label') ?? (this.textContent?.trim() || null)
    );
  }

  /**
   * Derives the pending-state accessible label. Prefers an explicit
   * `pendingLabel`, then falls back to the resolved non-busy accessible
   * name plus a ", busy" suffix, then a fixed "Busy" fallback.
   *
   * @internal
   */
  protected getPendingAccessibleName(): string {
    if (this.pendingLabel) {
      return this.pendingLabel;
    }
    const resolvedName = this.getResolvedAccessibleName();
    return resolvedName ? `${resolvedName}, busy` : 'Busy';
  }

  /**
   * Returns the set of attributes that should be forwarded to the internal
   * semantic `<button>` element.
   *
   * @internal
   */
  protected getForwardedButtonAttributes(): Record<
    string,
    string | boolean | undefined
  > {
    return {
      disabled: this.disabled,
      'aria-disabled': this.pending && !this.disabled ? 'true' : undefined,
    };
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._suppressPendingClick);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._suppressPendingClick);
  }

  private readonly _suppressPendingClick = (event: Event): void => {
    if (this.pending) {
      event.stopImmediatePropagation();
    }
  };

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (window.__swc?.DEBUG) {
      if (this.pending && this.disabled) {
        window.__swc.warn(
          this,
          `<${this.localName}> should not set both "pending" and "disabled" simultaneously. Use "pending" to keep the button focusable while unavailable, or "disabled" to fully remove it from the tab order.`,
          'https://opensource.adobe.com/spectrum-web-components/components/button/#pending',
          {}
        );
      }
    }
  }
}
