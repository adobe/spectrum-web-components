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
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  BUTTON_FILL_STYLES,
  BUTTON_VARIANTS,
  ButtonBase,
  type ButtonFillStyle,
  type ButtonStaticColor,
  type ButtonVariant,
} from '@spectrum-web-components/core/components/button';

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
export class Button extends ButtonBase {
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

  // @todo SWC-2034: handle form-associated types reset / submit
  protected override render(): TemplateResult {
    return html`
      <button
        class=${classMap({
          'swc-Button': true,
          'swc-Button--iconOnly': this.hasIcon && !this.hasLabel,
        })}
        type="button"
        @click=${this._handleClick}
        ?disabled=${this.disabled}
        aria-disabled=${ifDefined(
          this.pending && !this.disabled ? 'true' : undefined
        )}
        aria-label=${this.pending
          ? this.getPendingAccessibleName()
          : (this.getAttribute('aria-label') ?? nothing)}
      >
        <slot name="icon"></slot>
        <span class="swc-Button__label">
          <slot></slot>
        </span>
      </button>
    `;
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (window.__swc?.DEBUG) {
      if (!BUTTON_VARIANTS.includes(this.variant)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
          'https://opensource.adobe.com/spectrum-web-components/components/button/#variants',
          { issues: [...BUTTON_VARIANTS] }
        );
      }
      if (!BUTTON_FILL_STYLES.includes(this.fillStyle)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "fill-style" attribute to be one of the following:`,
          'https://opensource.adobe.com/spectrum-web-components/components/button/#fill-style',
          { issues: [...BUTTON_FILL_STYLES] }
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
