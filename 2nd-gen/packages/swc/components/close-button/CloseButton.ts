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
 * @element swc-close-button
 * @since 0.0.1
 *
 * @slot - Accessible text label rendered visually hidden next to the cross icon.
 *
 * @example
 * <swc-close-button accessible-label="Close"></swc-close-button>
 *
 * @example
 * <swc-close-button>Close</swc-close-button>
 */
export class CloseButton extends ButtonBase {
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
        class=${classMap({
          'swc-CloseButton': true,
          'swc-CloseButton--staticWhite': this.staticColor === 'white',
          'swc-CloseButton--staticBlack': this.staticColor === 'black',
        })}
        type="button"
        @click=${this.handleActivationClick}
        ?disabled=${this.disabled}
        aria-label=${ifDefined(resolvedName ?? undefined)}
      >
        <span class="swc-CloseButton-icon" aria-hidden="true">
          ${crossIconBySize[this.size]()}
        </span>
        <span class="swc-CloseButton-label">
          <slot></slot>
        </span>
      </button>
    `;
  }
}
