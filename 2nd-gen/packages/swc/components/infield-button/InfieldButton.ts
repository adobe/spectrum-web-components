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

import { CSSResultArray, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  INFIELD_BUTTON_VALID_SIZES,
  InfieldButtonBase,
  type InfieldButtonSize,
} from '@adobe/spectrum-wc-core/components/infield-button';

import styles from './infield-button.css';

/**
 * A compact icon button embedded inside a form field (e.g. number field increment/decrement
 * control, search field clear button). Clickable via pointer only; not in the tab order.
 * The parent field owns all keyboard behavior and provides the visible focus ring.
 *
 * @element swc-infield-button
 * @since 2.0.0
 *
 * @slot icon - Icon to display inside the button.
 *
 * @cssprop --swc-infield-button-padding - Padding applied to all four sides of the button.
 *   Determines the visible button size together with the icon. Defaults to
 *   `accessory-item-padding-medium` (5px) for size M; overridden per size
 *   (S=3px, L=7px, XL=9px). Consuming fields can override this to adjust the button's visual footprint.
 * @cssprop --swc-infield-button-icon-size - Size of the slotted icon element.
 *   Defaults to `workflow-icon-3x-small` (10px) for sizes S and M.
 *   Overridden to `workflow-icon-2x-small` (12px) for L and `workflow-icon-extra-small` (14px) for XL.
 * @cssprop --swc-infield-button-background-color-disabled - Background color when disabled.
 *   Defaults to `token("disabled-background-color")`. Overridden to `transparent` by `[quiet]`.
 * @cssprop --swc-infield-button-down-state-transform - Transform applied on press (down state).
 *   Defaults to a perspective + translate3d that produces the tactile press effect.
 *   Set to `none` to disable the press animation (e.g. when the button is in a pending state).
 *
 * @example
 * <swc-infield-button accessible-label="Increment value" size="m">
 *   <sp-icon-chevron100 slot="icon"></sp-icon-chevron100>
 * </swc-infield-button>
 */
export class InfieldButton extends InfieldButtonBase {
  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /** @internal */
  static override readonly VALID_SIZES: readonly InfieldButtonSize[] =
    INFIELD_BUTTON_VALID_SIZES;

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <button
        class=${classMap({ 'swc-InfieldButton': true })}
        type="button"
        tabindex="-1"
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        aria-label=${ifDefined(this.accessibleLabel)}
      >
        <slot name="icon"></slot>
      </button>
    `;
  }
}
