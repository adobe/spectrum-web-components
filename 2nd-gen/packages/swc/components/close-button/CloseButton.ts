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
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  ButtonBase,
  type ButtonSize,
} from '@spectrum-web-components/core/components/button';

import {
  Cross200Icon,
  Cross300Icon,
  Cross400Icon,
  Cross500Icon,
} from '../icon/elements/index.js';

import styles from './close-button.css';

const crossIconBySize: Record<ButtonSize, () => TemplateResult> = {
  s: Cross200Icon,
  m: Cross300Icon,
  l: Cross400Icon,
  xl: Cross500Icon,
};

/**
 * A compact dismiss control for dialogs, banners, toasts, and similar chrome.
 *
 * Renders a native `<button type="button">` with delegated focus. Every
 * instance needs a discernible name via `accessible-label`. The cross icon is
 * decorative (`aria-hidden="true"`).
 *
 * @element swc-close-button
 * @since 2.0.0
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
 * @cssprop --swc-close-button-border-radius - Corner radius. Defaults to the full corner radius token.
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

  public override getResolvedAccessibleName(): string | null {
    return this.accessibleLabel ?? null;
  }

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    const resolvedName = this.getResolvedAccessibleName();

    return html`
      <button
        class="swc-CloseButton"
        type="button"
        @click=${this.handleActivationClick}
        ?disabled=${this.disabled}
        aria-label=${ifDefined(resolvedName ?? undefined)}
      >
        <span class="swc-CloseButton-icon" aria-hidden="true">
          ${crossIconBySize[this.size]()}
        </span>
      </button>
    `;
  }
}
