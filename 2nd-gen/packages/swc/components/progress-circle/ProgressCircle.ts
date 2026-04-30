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
  PROGRESS_CIRCLE_STATIC_COLORS,
  ProgressCircleBase,
  type ProgressCircleStaticColor,
} from '@spectrum-web-components/core/components/progress-circle';
import { capitalize } from '@spectrum-web-components/core/utils/index.js';

import styles from './progress-circle.css';

/**
 * Progress circles show the progression of a system operation such as downloading, uploading, processing, etc. in a visual way.
 *
 * They can represent determinate (with a specific progress value) or indeterminate (loading) progress. If no `progress` value is given, the progress circle is indeterminate.
 *
 * @element swc-progress-circle
 * @since 0.0.1
 *
 * @example
 * <swc-progress-circle progress="75" label="Loading progress"></swc-progress-circle>
 *
 * @example
 * <swc-progress-circle label="Loading..."></swc-progress-circle>
 *
 * @cssprop --swc-progress-circle-size - Inline and block size of the circle.
 * @cssprop --swc-progress-circle-track-border-color - Color of the track (background ring).
 * @cssprop --swc-progress-circle-fill-border-color - Color of the fill (progress indicator).
 * @cssprop --swc-progress-circle-thickness - Stroke width of the circle rings.
 */
export class ProgressCircle extends ProgressCircleBase {
  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /**
   * @internal
   */
  static override readonly STATIC_COLORS = PROGRESS_CIRCLE_STATIC_COLORS;

  /**
   * Static color variant for use on different backgrounds.
   *
   * When set to 'white', the component uses white styling for images with a dark tinted background.
   *
   * When set to 'black', the component uses black styling for images with a light tinted background.
   */
  @property({ reflect: true, attribute: 'static-color' })
  public override staticColor?: ProgressCircleStaticColor;

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /**
   * Compute the SVG stroke-dashoffset for the fill circle.
   *
   * - **Indeterminate** (`progress` is `null`): returns `undefined` so CSS
   *   animation keyframes fully control the offset.
   * - **0%**: returns 98 instead of 100. A dashoffset of 100 hides the fill
   *   entirely, which fails WCAG 1.4.11 non-text contrast (the track alone
   *   may not meet 3:1 against the background). The 2-unit fill keeps the
   *   graphical element perceivable. `aria-valuenow` stays at 0.
   * - **1–100%**: returns `100 - progress`.
   */
  private computeDashOffset(): number | undefined {
    if (this.progress === null) {
      return undefined;
    }
    if (this.progress === 0) {
      return 98;
    }
    return 100 - this.progress;
  }

  protected override render(): TemplateResult {
    const strokeWidth = this.size === 's' ? 2 : this.size === 'l' ? 6 : 4;
    // SVG strokes are centered, so subtract half the stroke width from the radius to create an inner stroke.
    const radius = `calc(50% - ${strokeWidth / 2}px)`;

    return html`
      <div
        class=${classMap({
          ['swc-ProgressCircle']: true,
          ['swc-ProgressCircle--indeterminate']: this.progress === null,
          [`swc-ProgressCircle--static${capitalize(this.staticColor)}`]:
            typeof this.staticColor !== 'undefined',
        })}
      >
        <svg aria-hidden="true" fill="none" width="100%" height="100%">
          <circle
            cx="50%"
            cy="50%"
            r=${`calc(50% - ${strokeWidth}px)`}
            stroke-width=${strokeWidth}
          />
          <circle
            cx="50%"
            cy="50%"
            class="swc-ProgressCircle-track"
            r=${radius}
          />
          <circle
            cx="50%"
            cy="50%"
            r=${radius}
            class="swc-ProgressCircle-fill"
            pathLength="100"
            stroke-dasharray="100 200"
            stroke-dashoffset=${ifDefined(this.computeDashOffset())}
            stroke-linecap="round"
          />
        </svg>
      </div>
    `;
  }
}
