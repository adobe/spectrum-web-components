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
import { property, state } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import {
  ObserveSlotPresence,
  ObserveSlotText,
  SizedMixin,
} from '@spectrum-web-components/core/mixins/index.js';

import { BUTTON_VALID_SIZES } from './Button.types.js';

/**
 * Abstract base class for all button-like components. Owns shared semantic
 * concerns: interaction state, sizing, slot-derived icon/label state,
 * accessible-name resolution, and host-to-internal-button attribute forwarding.
 *
 * Visual API specific to `sp-button` (`variant`, `fill-style`, `static-color`)
 * is intentionally absent so that ActionButton, ClearButton, CloseButton,
 * PickerButton, and InfieldButton can extend this base without inheriting
 * the `swc-button` visual surface.
 *
 * @slot - Visible button label.
 * @slot icon - Optional leading icon.
 *
 * @attribute {ElementSize} size - The size of the button.
 *
 * @todo We currently have 3 levels of mixins on this class, but the mixin
 * composition guide recommends a maximum of 2. Explore reducing after milestone 2.
 */
export abstract class ButtonBase extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''),
  { validSizes: BUTTON_VALID_SIZES }
) {
  static override shadowRootOptions: ShadowRootInit = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };

  // ──────────────────
  //     SHARED API
  // ──────────────────

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
   * Accessible label forwarded to the internal `<button>` element as
   * `aria-label`. Required for icon-only buttons, which have no visible text.
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel?: string;

  /**
   * Custom accessible label used during the pending state. When omitted,
   * the pending label is derived from the resolved non-busy accessible name
   * plus a busy suffix (e.g. "Save, busy").
   */
  @property({ type: String, attribute: 'pending-label' })
  public pendingLabel?: string;

  /**
   * Tracks whether the pending visual (disabled colors + spinner) is currently
   * active. Set to `true` after a 1-second delay once `pending` becomes true,
   * so the button does not immediately flash to its unavailable appearance.
   * Protected so subclasses can reference it in their `classMap` binding.
   */
  @state()
  protected pendingActive: boolean = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  private _pendingTimer: number | null = null;

  protected get hasIcon(): boolean {
    return this.slotContentIsPresent;
  }

  protected get hasLabel(): boolean {
    return this.slotHasContent;
  }

  /**
   * Resolves the accessible name for the button from `accessibleLabel` or
   * visible text content. Returns `null` when no accessible name is
   * determinable.
   *
   * @internal
   */
  protected getResolvedAccessibleName(): string | null {
    return this.accessibleLabel ?? (this.textContent?.trim() || null);
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
   * semantic `<button>` element, if not otherwise directly managed.
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
    this.addEventListener('click', this.handleClick);
  }

  public override disconnectedCallback(): void {
    this.removeEventListener('click', this.handleClick);
    if (this._pendingTimer !== null) {
      clearTimeout(this._pendingTimer);
      this._pendingTimer = null;
    }
    this.pendingActive = false;
    super.disconnectedCallback();
  }

  /**
   * Suppresses click activation while the button is in a `pending` state.
   * Subclasses' templates wire this onto the rendered `<button>` via `@click`.
   */
  protected readonly handleClick = (event: Event): void => {
    if (this.pending) {
      event.stopImmediatePropagation();
    }
  };

  protected override update(changedProperties: PropertyValues): void {
    if (changedProperties.has('pending')) {
      if (this.pending) {
        this._pendingTimer = setTimeout(() => {
          if (this.pending) {
            const internalButton = this.renderRoot.querySelector('button');
            if (internalButton) {
              internalButton.style.setProperty(
                '--_swc-button-pending-inline-size',
                `${internalButton.offsetWidth}px`
              );
            }
            this.pendingActive = true;
          }
          this._pendingTimer = null;
        }, 1000);
      } else {
        if (this._pendingTimer !== null) {
          clearTimeout(this._pendingTimer);
          this._pendingTimer = null;
        }
        this.renderRoot
          .querySelector('button')
          ?.style.removeProperty('--_swc-button-pending-inline-size');
        this.pendingActive = false;
      }
    }
    super.update(changedProperties);
    if (window.__swc?.DEBUG) {
      if (this.pending && this.disabled) {
        window.__swc.warn(
          this,
          `<${this.localName}> should not set both "pending" and "disabled" simultaneously. Use "pending" to keep the button focusable while unavailable, or "disabled" to fully remove it from the tab order.`,
          'https://opensource.adobe.com/spectrum-web-components/components/button/#pending',
          { issues: ['pending + disabled'] }
        );
      }
      if (this.hasIcon && !this.hasLabel && !this.accessibleLabel) {
        window.__swc.warn(
          this,
          `<${this.localName}> with an icon and no label must have an "accessible-label" attribute to be accessible.`,
          'https://opensource.adobe.com/spectrum-web-components/components/button/#icon-only',
          { issues: ['accessible-label'] }
        );
      }
    }
  }
}
