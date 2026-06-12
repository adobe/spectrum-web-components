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
import baseStyles from './button-base.css';

/**
 * A button component that triggers an action when activated.
 *
 * @element swc-button
 * @since 0.0.1
 *
 * @slot - Visible button label.
 * @slot icon - Leading icon displayed before the label.
 *
 * @cssprop --swc-button-min-block-size - Minimum block size of the button.
 * @cssprop --swc-button-border-radius - Corner radius. Defaults to half the height (pill shape).
 * @cssprop --swc-button-padding-vertical - Block padding (adjusted for border width).
 * @cssprop --swc-button-edge-to-text - Inline padding from edge to text.
 * @cssprop --swc-button-edge-to-visual - Inline padding from edge to icon when label is also present.
 * @cssprop --swc-button-edge-to-visual-only - Inline padding from edge to icon when no label is present.
 * @cssprop --swc-button-font-size - Font size of the button label.
 * @cssprop --swc-button-gap - Gap between icon and label.
 * @cssprop --swc-button-icon-size - Size (inline and block) of the slotted icon.
 * @cssprop --swc-button-icon-inline-size - Inline size override for the slotted icon.
 * @cssprop --swc-button-icon-block-size - Block size override for the slotted icon.
 * @cssprop --swc-button-focus-indicator-color - Color of the focus ring outline.
 * @cssprop --swc-button-background-color-default - Background color in the default state.
 * @cssprop --swc-button-border-color-default - Border color in the default state.
 * @cssprop --swc-button-content-color-default - Text and icon color in the default state.
 * @cssprop --swc-button-background-color-hover - Background color on hover.
 * @cssprop --swc-button-border-color-hover - Border color on hover.
 * @cssprop --swc-button-content-color-hover - Text and icon color on hover.
 * @cssprop --swc-button-background-color-focus - Background color when focused.
 * @cssprop --swc-button-border-color-focus - Border color when focused.
 * @cssprop --swc-button-content-color-focus - Text and icon color when focused.
 * @cssprop --swc-button-background-color-down - Background color when pressed.
 * @cssprop --swc-button-border-color-down - Border color when pressed.
 * @cssprop --swc-button-content-color-down - Text and icon color when pressed.
 * @cssprop --swc-button-background-color-disabled - Background color when disabled or pending.
 * @cssprop --swc-button-border-color-disabled - Border color when disabled or pending.
 * @cssprop --swc-button-content-color-disabled - Text and icon color when disabled or pending.
 *
 * @example
 * <swc-button>Save</swc-button>
 *
 * @example
 * <swc-button variant="secondary" fill-style="outline">Cancel</swc-button>
 */
export class Button extends ButtonBase {
  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

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

  /**
   * Enables the button to become full-width, if the container
   * allows it.
   */
  @property({ type: Boolean, reflect: true })
  public justified: boolean = false;

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [baseStyles, styles];
  }

  // @todo SWC-2034: handle form-associated types reset / submit
  protected override render(): TemplateResult {
    return html`
      <button
        class=${classMap({
          'swc-Button': true,
          'swc-Button--hasIcon': this.hasIcon,
          'swc-Button--iconOnly': this.hasIcon && !this.hasLabel,
          'swc-Button--pendingActive': this.pendingActive,
        })}
        type="button"
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        aria-disabled=${ifDefined(
          this.pending && !this.disabled ? 'true' : undefined
        )}
        aria-label=${ifDefined(
          this.pending ? this.getPendingAccessibleName() : this.accessibleLabel
        )}
      >
        <slot name="icon"></slot>
        <span class="swc-Button-label">
          <slot></slot>
        </span>
        ${this.pending
          ? html`
              <svg
                class="swc-Button-pendingSpinner"
                width="100%"
                height="100%"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <circle
                  class="swc-Button-pendingSpinner-track"
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 1px)"
                />
                <circle
                  class="swc-Button-pendingSpinner-fill"
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 1px)"
                  pathLength="100"
                  stroke-dasharray="100 200"
                  stroke-dashoffset="75"
                  stroke-linecap="round"
                />
              </svg>
            `
          : nothing}
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
