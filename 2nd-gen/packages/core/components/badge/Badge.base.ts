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

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';
import { ObserveSlotPresence } from '@spectrum-web-components/core/mixins/observe-slot-presence.js';
import { ObserveSlotText } from '@spectrum-web-components/core/mixins/observe-slot-text.js';

import {
  BADGE_VALID_SIZES,
  BADGE_VARIANTS_SEMANTIC,
  type BadgeSize,
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
 *
 * @todo review the mixin composition here. We currently have 3 levels of mixins on this class, but the mixin composition guide recommends a maximum of 2.
 */
export abstract class BadgeBase extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''),
  {
    validSizes: BADGE_VALID_SIZES,
    defaultSize: 's',
  }
) {
  /**
   * The size of the badge.
   *
   * @default s
   */
  declare public size: BadgeSize;

  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  /**
   * @internal
   *
   * A readonly array of the valid color variants for the badge.
   *
   * This is an actual internal property, intended not for customer use
   * but for use in internal validation logic, stories, tests, etc.
   *
   * Because S1 and S2 support different color variants, the value of this
   * property must be set in each subclass.
   */
  static readonly VARIANTS_COLOR: readonly string[];

  /**
   * @internal
   *
   * A readonly array of all valid variants for the badge.
   *
   * This is an actual internal property, intended not for customer use
   * but for use in internal validation logic, stories, tests, etc.
   *
   * Because S1 and S2 support different variants, the value of this
   * property must be set in each subclass.
   */
  static readonly VARIANTS: readonly string[];

  /**
   * @internal
   *
   * The variant of the badge.
   *
   * This is a public property, but its valid values vary between S1 and S2,
   * so the property (and its docs) need to be redefined in each subclass.
   *
   * The type declared here is a union of the valid values for S1 and S2,
   * and should be narrowed in each subclass.
   */
  @property({ type: String, reflect: true })
  public variant: BadgeVariant = 'neutral';

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
  @property({ type: String, reflect: true })
  public fixed?: FixedValues;

  /**
   * Whether the badge is subtle.
   */
  @property({ type: Boolean, reflect: true })
  public subtle: boolean = false;

  /**
   * Whether the badge is outlined.
   *
   * Can only be used with semantic variants.
   */
  @property({ type: Boolean, reflect: true })
  public outline: boolean = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * @internal
   *
   * Used for rendering gap when the badge has an icon.
   */
  protected get hasIcon(): boolean {
    return this.slotContentIsPresent;
  }

  protected override update(changedProperties: PropertyValues): void {
    if (window.__swc?.DEBUG) {
      const constructor = this.constructor as typeof BadgeBase;
      if (!constructor.VARIANTS.includes(this.variant)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
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
    super.update(changedProperties);
  }
}
