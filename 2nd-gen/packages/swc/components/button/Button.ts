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

import {
  CSSResultArray,
  html,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';

import {
  BUTTON_FILL_STYLES,
  BUTTON_STATIC_COLORS,
  BUTTON_VALID_SIZES,
  BUTTON_VARIANTS,
  ButtonBase,
  type ButtonFillStyle,
  type ButtonStaticColor,
  type ButtonVariant,
} from '@spectrum-web-components/core/components/button';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';

import styles from './button.css';

/**
 * A button component that triggers an action when activated.
 *
 * @element swc-button
 * @status alpha
 * @since 0.0.1
 *
 * @example
 * <swc-button>Save</swc-button>
 *
 * @example
 * <swc-button variant="secondary" fill-style="outline">Cancel</swc-button>
 */
export class Button extends SizedMixin(ButtonBase) {
  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /**
   * @internal
   */
  static override readonly VALID_SIZES = BUTTON_VALID_SIZES;

  // ───────────────────
  //     VISUAL API
  // ───────────────────

  /**
   * @internal
   */
  static readonly VARIANTS = BUTTON_VARIANTS;

  /**
   * @internal
   */
  static readonly FILL_STYLES = BUTTON_FILL_STYLES;

  /**
   * @internal
   */
  static readonly STATIC_COLORS = BUTTON_STATIC_COLORS;

  /**
   * The visual variant of the button.
   *
   * `outline` fill-style is only supported with `primary` and `secondary`.
   * `static-color` is only supported with `primary` and `secondary`.
   */
  @property({ type: String, reflect: true })
  public variant: ButtonVariant = 'primary';

  /**
   * The fill style of the button.
   *
   * `outline` is only supported with `primary` and `secondary` variants.
   */
  @property({ type: String, reflect: true, attribute: 'fill-style' })
  public fillStyle: ButtonFillStyle = 'fill';

  /**
   * Static color treatment for display over colored or image backgrounds.
   * Only supported with `primary` and `secondary` variants.
   */
  @property({ type: String, reflect: true, attribute: 'static-color' })
  public staticColor?: ButtonStaticColor;

  /**
   * Whether the button renders with an icon and no visible label. When
   * `true`, an accessible name via `aria-label` is required.
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-only' })
  public iconOnly: boolean = false;

  /**
   * Whether overflowing text is truncated with an ellipsis rather than
   * wrapping. Replaces the legacy `no-wrap` attribute from 1st-gen.
   */
  @property({ type: Boolean, reflect: true })
  public truncate: boolean = false;

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <button
        class="swc-Button"
        ?disabled=${this.disabled}
        aria-disabled=${this.pending && !this.disabled ? 'true' : nothing}
        aria-label=${this.pending ? this.getPendingAccessibleName() : nothing}
      >
        <slot name="icon"></slot>
        <span class="swc-Button-label">
          <slot></slot>
        </span>
      </button>
    `;
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (window.__swc?.DEBUG) {
      const constructor = this.constructor as typeof Button;
      if (!constructor.VARIANTS.includes(this.variant)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
          'https://opensource.adobe.com/spectrum-web-components/components/button/#variants',
          { issues: [...constructor.VARIANTS] }
        );
      }
      if (!constructor.FILL_STYLES.includes(this.fillStyle)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "fill-style" attribute to be one of the following:`,
          'https://opensource.adobe.com/spectrum-web-components/components/button/#fill-style',
          { issues: [...constructor.FILL_STYLES] }
        );
      }
      if (
        this.fillStyle === 'outline' &&
        (this.variant === 'accent' || this.variant === 'negative')
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> element only supports "fill-style=outline" with the "primary" and "secondary" variants.`,
          'https://opensource.adobe.com/spectrum-web-components/components/button/#fill-style',
          { issues: ['primary', 'secondary'] }
        );
      }
      if (
        this.staticColor &&
        (this.variant === 'accent' || this.variant === 'negative')
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> element only supports "static-color" with the "primary" and "secondary" variants.`,
          'https://opensource.adobe.com/spectrum-web-components/components/button/#static-color',
          { issues: ['primary', 'secondary'] }
        );
      }
    }
  }
}
