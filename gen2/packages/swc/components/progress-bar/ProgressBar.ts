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
import { ifDefined } from 'lit/directives/if-defined.js';

import { ProgressBarBase } from '@adobe/spectrum-wc-core/components/progress-bar';

import sharedStyles from '../../stylesheets/_lit-styles/linear-progress-base.css';
import styles from './progress-bar.css';

/**
 * A progress bar is a non-focusable, read-only bar that shows the progression of
 * a system operation such as downloading, uploading, or processing. When the
 * completion time is unknown, set `indeterminate` to show a looping animation.
 * The WAI-ARIA `progressbar` role lives on the shadow `.swc-LinearProgress`
 * wrapper; the host carries no ARIA role.
 *
 * @element swc-progress-bar
 * @since 2.0.0-beta.2
 *
 * @example
 * <swc-progress-bar value="60">
 *   <span slot="label">Uploading</span>
 * </swc-progress-bar>
 *
 * @example
 * <swc-progress-bar indeterminate accessible-label="Loading"></swc-progress-bar>
 *
 * @slot label - Visible label for the progress bar. Referenced via
 *               `aria-labelledby` on the shadow `progressbar` role element.
 * @slot description - Additional description text below the progress bar.
 *                     Referenced via `aria-describedby` on the shadow
 *                     `progressbar` role element when assigned nodes are present.
 *
 * @cssprop --swc-linear-progress-fill-color - Color of the bar fill. Defaults to the accent content color token.
 * @cssprop --swc-linear-progress-track-color - Color of the bar track. Defaults to the track color token.
 * @cssprop --swc-linear-progress-text-color - Color of the label and value text. Defaults to the neutral subdued content color token.
 * @cssprop --swc-linear-progress-thickness - Block size of the track and fill. Defaults to the size-specific progress bar thickness token.
 * @cssprop --swc-linear-progress-font-size - Font size of the label and value text. Defaults to the size-specific font size token.
 * @cssprop --swc-linear-progress-top-to-text - Spacing between the bar and the text. Defaults to the size-specific component top-to-text token.
 */
export class ProgressBar extends ProgressBarBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [sharedStyles, styles];
  }

  protected override render(): TemplateResult {
    // Cache derived values so each getter is only evaluated once per render.
    const hasLabel = this.hasLabelSlotContent;
    const hasDescription = this.hasDescriptionSlotContent;
    const indeterminate = this.indeterminate;
    const sanitizedMin = this.sanitizedMin;
    const sanitizedMax = this.sanitizedMax;
    const clampedValue = this.clampedValue;
    const formattedValue = this.formattedValue;
    const fillPercent = this.fillPercent;
    const ariaLabelledBy = hasLabel ? this.labelContainerId : undefined;
    const ariaLabel =
      !hasLabel && this.accessibleLabel ? this.accessibleLabel : undefined;
    const ariaDescribedBy = hasDescription
      ? this.descriptionContainerId
      : undefined;

    return html`
      <div
        class="swc-LinearProgress"
        role="progressbar"
        aria-valuemin=${indeterminate ? nothing : sanitizedMin}
        aria-valuemax=${indeterminate ? nothing : sanitizedMax}
        aria-valuenow=${indeterminate ? nothing : clampedValue}
        aria-valuetext=${indeterminate ? nothing : formattedValue}
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
        ${indeterminate
          ? nothing
          : html`
              <span class="swc-LinearProgress-value">${formattedValue}</span>
            `}
        <div class="swc-LinearProgress-track">
          <div
            class="swc-LinearProgress-fill"
            style=${ifDefined(
              indeterminate ? undefined : `inline-size: ${fillPercent}%;`
            )}
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
