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
import { PropertyValues, SpectrumElement } from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { SizedMixin } from '@spectrum-web-components/base/src/sizedMixin.js';
import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';

import {
  BADGE_VARIANTS_SEMANTIC,
  type BadgeVariant,
  FIXED_VALUES,
  type FixedValues,
} from './Badge.types.js';

/**
 * A badge component that displays short, descriptive information about an element.
 * Badges are typically used to indicate status, categories, or provide supplementary information.
 *
 * @attribute {ElementSize} size - The size of the badge.
 *
 * @slot - Text label of the badge.
 * @slot icon - Optional icon that appears to the left of the label
 */
export abstract class BadgeBase extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''),
  {
    noDefaultSize: true,
  }
) {
  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  /**
   * @internal
   *
   * A readonly array of the valid color variants for the badge.
   */
  static readonly VARIANTS_COLOR: readonly string[];

  /**
   * @internal
   *
   * A readonly array of all valid variants for the badge.
   */
  static readonly VARIANTS: readonly string[];

  /**
   * @internal
   *
   * The variant of the badge.
   */
  @property({ type: String, reflect: true })
  public variant: BadgeVariant = 'informative';

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * @internal
   */
  static readonly FIXED_VALUES: readonly string[] = FIXED_VALUES;

  /**
   * @internal
   */
  static readonly VARIANTS_SEMANTIC: readonly string[] =
    BADGE_VARIANTS_SEMANTIC;

  /**
   * The fixed position of the badge.
   */
  @property({ reflect: true })
  public get fixed(): FixedValues | undefined {
    return this._fixed;
  }

  public set fixed(fixed: FixedValues | undefined) {
    if (fixed === this.fixed) {
      return;
    }
    const oldValue = this.fixed;
    this._fixed = fixed;
    if (fixed) {
      this.setAttribute('fixed', fixed);
    } else {
      this.removeAttribute('fixed');
    }
    this.requestUpdate('fixed', oldValue);
  }

  private _fixed?: FixedValues;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * Used for rendering gap when the badge has an icon.
   *
   * @internal
   */
  protected get hasIcon(): boolean {
    return this.slotContentIsPresent;
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (window.__swc?.DEBUG) {
      const constructor = this.constructor as typeof BadgeBase;
      if (!constructor.VARIANTS.includes(this.variant)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expect the "variant" attribute to be one of the following:`,
          'https://opensource.adobe.com/spectrum-web-components/components/badge/#variants',
          {
            issues: [...constructor.VARIANTS],
          }
        );
      }
      // Check outline property if it exists (S2 only)
      if (
        'outline' in this &&
        (this as { outline: boolean }).outline === true &&
        !constructor.VARIANTS_SEMANTIC.includes(this.variant)
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> element only supports the outline styling if the variant is a semantic color variant.`,
          'https://opensource.adobe.com/spectrum-web-components/components/badge/#variants',
          {
            issues: [...constructor.VARIANTS_SEMANTIC],
          }
        );
      }
    }
  }
}
