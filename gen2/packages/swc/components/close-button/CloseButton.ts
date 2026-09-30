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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  BUTTON_STATIC_COLORS,
  ButtonBase,
  type ButtonStaticColor,
} from '@adobe/spectrum-wc-core/components/button';
import { validateEnum } from '@adobe/spectrum-wc-core/utils';

import '../ui-icons/swc-ui-icon.js';

import styles from './close-button.css';

/**
 * A compact dismiss control for dialogs, banners, toasts, and similar chrome.
 *
 * Renders a native `<button type="button">` with delegated focus. Every
 * instance needs a discernible name via `accessible-label`. The cross icon is
 * decorative (`aria-hidden="true"`).
 *
 * @element swc-close-button
 * @since 2.0.0-beta.2
 *
 * @example
 * ```html
 * <swc-close-button accessible-label="Close"></swc-close-button>
 * ```
 *
 * @example
 * ```html
 * <swc-close-button static-color="white" accessible-label="Close"></swc-close-button>
 * ```
 *
 * @cssprop --swc-close-button-size - Inline and block size of the close button. Defaults to the medium component height token.
 * @cssprop --swc-close-button-icon-size - Size of the cross icon. Defaults to the medium cross icon token.
 * @cssprop --swc-close-button-icon-color-default - Cross icon color in the default state.
 * @cssprop --swc-close-button-icon-color-hover - Cross icon color when hovered.
 * @cssprop --swc-close-button-icon-color-down - Cross icon color when pressed.
 * @cssprop --swc-close-button-icon-color-focus - Cross icon color when keyboard focused.
 * @cssprop --swc-close-button-icon-color-disabled - Cross icon color when disabled.
 * @cssprop --swc-close-button-background-color-default - Background color in the default state.
 * @cssprop --swc-close-button-background-color-hover - Background color when hovered.
 * @cssprop --swc-close-button-background-color-down - Background color when pressed.
 * @cssprop --swc-close-button-background-color-focus - Background color when keyboard focused.
 * @cssprop --swc-close-button-focus-indicator-color - Focus ring color. Defaults to the focus indicator color token.
 */
export class CloseButton extends ButtonBase {
  /**
   * Static color treatment for display over colored or image backgrounds.
   */
  @property({ type: String, reflect: true, attribute: 'static-color' })
  public staticColor?: ButtonStaticColor;

  /**
   * Close buttons always render a cross icon; treat as icon-present for
   * shared {@link ButtonBase} accessibility checks.
   *
   * @internal
   */
  protected override get hasIcon(): boolean {
    return true;
  }

  protected override get hasLabel(): boolean {
    return false;
  }

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    // The wrapping .swc-CloseButton-icon span already sets the rendered box via
    // --swc-close-button-icon-size; "size" on swc-ui-icon only selects which
    // optically-tuned glyph step it renders, per the RFC's fixed size-to-step
    // map (CONTRIBUTOR-DOCS/03_project-planning/05_strategies/icon-rfc.md, section 7).
    // Passing the button's own size is the documented pattern for that mapping.
    return html`
      <button
        class="swc-CloseButton"
        type="button"
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        aria-label=${ifDefined(this.accessibleLabel ?? undefined)}
      >
        <span class="swc-CloseButton-icon" aria-hidden="true">
          <swc-ui-icon icon="cross" size=${this.size}></swc-ui-icon>
        </span>
      </button>
    `;
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (typeof this.staticColor !== 'undefined') {
      validateEnum(this, {
        prop: 'static-color',
        value: this.staticColor,
        valid: BUTTON_STATIC_COLORS,
        url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-close-button--docs',
      });
    }
  }
}
