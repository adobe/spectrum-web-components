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

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  METER_VARIANTS,
  MeterBase,
  type MeterVariant,
} from '@spectrum-web-components/core/components/meter';

import sharedStyles from '../../stylesheets/shared/linear-progress-base.css';
import styles from './meter.css';

/**
 * A meter is a non-focusable, read-only bar that displays a value inside a
 * fixed range. The WAI-ARIA `meter` role lives on the shadow
 * `.swc-LinearProgress` wrapper — the host carries no ARIA role.
 *
 * @element swc-meter
 * @since 2.0.0
 *
 * @example
 * <swc-meter value="60" variant="positive">
 *   <span slot="label">Storage used</span>
 *   <span slot="description">2 GB of 10 GB used</span>
 * </swc-meter>
 *
 * @slot label - Visible label for the meter. Referenced via `aria-labelledby`
 *               on the shadow `meter` role element.
 * @slot description - Additional description text below the meter. Referenced
 *                     via `aria-describedby` on the shadow `meter` role element
 *                     when assigned nodes are present.
 */
export class Meter extends MeterBase {
  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /**
   * @internal
   */
  static override readonly VARIANTS = METER_VARIANTS;

  // Re-declare so the `reflect: true` setting from the base is honored on
  // the concrete element class (ES2022 class-field semantics).
  @property({ type: String, reflect: true })
  public override variant: MeterVariant = 'informative';

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [sharedStyles, styles];
  }

  protected override render(): TemplateResult {
    // Cache derived values so each getter is only evaluated once per render
    // (each one re-allocates an `Intl.NumberFormat` or rescans the slot map).
    const hasLabel = this.hasLabelSlotContent;
    const hasDescription = this.hasDescriptionSlotContent;
    const sanitizedMin = this.sanitizedMin;
    const sanitizedMax = this.sanitizedMax;
    const clampedValue = this.clampedValue;
    const fillPercent = this.fillPercent;
    const formattedValue = this.formattedValue;
    const ariaLabelledBy = hasLabel ? this.labelContainerId : undefined;
    const ariaLabel =
      !hasLabel && this.accessibleLabel ? this.accessibleLabel : undefined;
    const ariaDescribedBy = hasDescription
      ? this.descriptionContainerId
      : undefined;

    return html`
      <div
        class="swc-LinearProgress"
        role="meter"
        aria-valuemin=${sanitizedMin}
        aria-valuemax=${sanitizedMax}
        aria-valuenow=${clampedValue}
        aria-valuetext=${formattedValue}
        aria-labelledby=${ifDefined(ariaLabelledBy)}
        aria-label=${ifDefined(ariaLabel)}
        aria-describedby=${ifDefined(ariaDescribedBy)}
      >
        ${hasLabel
          ? html`
              <span
                id=${this.labelContainerId}
                class="swc-LinearProgress-label"
              >
                <slot name="label"></slot>
              </span>
            `
          : nothing}
        <span class="swc-LinearProgress-value">${formattedValue}</span>
        <div class="swc-LinearProgress-track">
          <div
            class="swc-LinearProgress-fill"
            style="inline-size: ${fillPercent}%;"
          ></div>
        </div>
        ${hasDescription
          ? html`
              <span
                id=${this.descriptionContainerId}
                class="swc-LinearProgress-description"
              >
                <slot name="description"></slot>
              </span>
            `
          : nothing}
      </div>
    `;
  }
}
