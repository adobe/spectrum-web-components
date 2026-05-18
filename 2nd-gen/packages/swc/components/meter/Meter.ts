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
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  METER_VARIANTS,
  MeterBase,
  type MeterVariant,
} from '@spectrum-web-components/core/components/meter';

import styles from './meter.css';

/**
 * A meter is a non-focusable, read-only bar that displays a value inside a
 * fixed range. The WAI-ARIA `meter` role lives on the shadow `.swc-Meter`
 * wrapper — the host carries no ARIA role.
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
 *
 * @cssprop --swc-meter-fill-color - Bar fill color. Overrides the variant default.
 * @cssprop --swc-meter-track-color - Bar track color.
 * @cssprop --swc-meter-thickness - Bar thickness (block-size of the track and fill).
 * @cssprop --swc-meter-min-width - Minimum inline-size of the meter.
 * @cssprop --swc-meter-max-width - Maximum inline-size of the meter.
 * @cssprop --swc-meter-description-spacing - Block-start spacing between the bar and the description slot.
 * @cssprop --swc-meter-label-to-value-spacing - Inline spacing between label and value text in `label-position="side"`.
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
    return [styles];
  }

  protected override render(): TemplateResult {
    const hasLabel = this.hasLabelSlotContent;
    const hasDescription = this.hasDescriptionSlotContent;
    const ariaLabelledBy = hasLabel ? this.labelContainerId : undefined;
    const ariaLabel =
      !hasLabel && this.accessibleLabel ? this.accessibleLabel : undefined;
    const ariaDescribedBy = hasDescription
      ? this.descriptionContainerId
      : undefined;

    return html`
      <span
        id=${this.labelContainerId}
        class=${classMap({
          ['swc-Meter-label']: true,
          ['is-empty']: !hasLabel,
        })}
      >
        <slot name="label" @slotchange=${this.onLabelSlotChange}></slot>
      </span>
      <div
        class=${classMap({
          ['swc-Meter']: true,
          [`swc-Meter--${this.variant}`]: typeof this.variant !== 'undefined',
          [`swc-Meter--sideLabel`]: this.labelPosition === 'side',
          [`swc-Meter--staticWhite`]: this.staticColor === 'white',
          [`swc-Meter--staticBlack`]: this.staticColor === 'black',
        })}
        role="meter"
        aria-valuemin=${this.minValue}
        aria-valuemax=${this.maxValue}
        aria-valuenow=${this.clampedValue}
        aria-valuetext=${this.formattedValue}
        aria-labelledby=${ifDefined(ariaLabelledBy)}
        aria-label=${ifDefined(ariaLabel)}
        aria-describedby=${ifDefined(ariaDescribedBy)}
      >
        <span class="swc-Meter-value">${this.formattedValue}</span>
        <div class="swc-Meter-track">
          <div
            class="swc-Meter-fill"
            style="inline-size: ${this.fillPercent}%;"
          ></div>
        </div>
      </div>
      <span
        id=${this.descriptionContainerId}
        class=${classMap({
          ['swc-Meter-description']: true,
          ['is-empty']: !hasDescription,
        })}
      >
        <slot
          name="description"
          @slotchange=${this.onDescriptionSlotChange}
        ></slot>
      </span>
    `;
  }
}
