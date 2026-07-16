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
import {
  LINEAR_PROGRESS_VALID_SIZES,
  LinearProgressMixin,
  SizedMixin,
} from '@adobe/spectrum-wc-core/mixins/index.js';

import { METER_VARIANTS, type MeterVariant } from './Meter.types.js';

/**
 * A non-focusable, read-only bar that shows a value inside a fixed range.
 * Implements the WAI-ARIA `meter` role on the shadow `.swc-Meter` element
 * (the host carries no ARIA).
 *
 * @attribute {ElementSize} size - The size of the meter.
 */
export abstract class MeterBase extends LinearProgressMixin(
  SizedMixin(SpectrumElement, {
    validSizes: LINEAR_PROGRESS_VALID_SIZES,
    defaultSize: 'm',
  })
) {
  /**
   * The size of the meter.
   *
   * @default m
   */
  declare public size: (typeof LINEAR_PROGRESS_VALID_SIZES)[number];

  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  /**
   * @internal
   *
   * A readonly array of all valid variants for the meter. Concrete
   * subclasses re-declare with their own valid set so validation logic
   * resolves against `(this.constructor as typeof MeterBase).VARIANTS`.
   */
  static readonly VARIANTS: readonly string[] = METER_VARIANTS;

  /**
   * The variant of the meter. Drives the bar fill color.
   */
  @property({ type: String, reflect: true })
  public variant: MeterVariant = 'informative';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override willUpdate(changes: PropertyValues): void {
    const constructor = this.constructor as typeof MeterBase;
    if (!constructor.VARIANTS.includes(this.variant)) {
      if (window.__swc?.DEBUG) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
          'https://spectrum-web-components.adobe.com/?path=/docs/components-meter--docs',
          {
            issues: [...constructor.VARIANTS],
          }
        );
      }
      // Unknown variant: fall back to the default so the reflected
      // attribute and fill color always resolve to a valid variant.
      // Normalizing in `willUpdate` (Lit's input-normalization hook) folds
      // the change into the current cycle instead of scheduling a second
      // reactive update.
      this.variant = 'informative';
    }
    super.willUpdate(changes);
  }
}
