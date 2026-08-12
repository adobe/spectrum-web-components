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

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';

import { ICON_VALID_SIZES } from './Icon.types.js';

/**
 * Shared behavior for icon elements: the `size` scale, the `accessibleLabel`, and
 * host-owned accessibility. Concrete elements own their own `render()` and styles;
 * this base carries no template and no CSS.
 *
 * The host owns semantics: when `accessibleLabel` is set the host is exposed as an
 * image (`role="img"` with that label); when empty (the default) the host is marked
 * `aria-hidden` and the icon is decorative. The rendered or slotted SVG is never
 * given its own role, avoiding double-announcement.
 *
 * @attribute {string} accessible-label - Accessible label for the icon.
 * @attribute {string} size - T-shirt icon size.
 */
export abstract class IconBase extends SizedMixin(SpectrumElement, {
  validSizes: [...ICON_VALID_SIZES],
}) {
  /**
   * T-shirt icon size.
   *
   * @default m
   */
  declare public size: (typeof ICON_VALID_SIZES)[number];

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Accessible label for the icon. When empty the icon is decorative.
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  // ──────────────────────
  //     ACCESSIBILITY
  // ──────────────────────

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.updateHostAccessibility();
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('accessibleLabel')) {
      this.updateHostAccessibility();
    }
  }

  private updateHostAccessibility(): void {
    if (this.accessibleLabel) {
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', this.accessibleLabel);
      this.removeAttribute('aria-hidden');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
      this.setAttribute('aria-hidden', 'true');
    }
  }
}
