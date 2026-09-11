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

import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  LINEAR_PROGRESS_VALID_SIZES,
  LinearProgressMixin,
  SizedMixin,
} from '@adobe/spectrum-wc-core/mixins/index.js';

/**
 * A non-focusable, read-only bar that shows task progress (0–100, or a custom
 * range) or an indeterminate loading animation when completion time is unknown.
 * Implements the WAI-ARIA `progressbar` role on the shadow `.swc-LinearProgress`
 * element (the host carries no ARIA).
 *
 * @attribute {ElementSize} size - The size of the progress bar.
 */
export abstract class ProgressBarBase extends LinearProgressMixin(
  SizedMixin(SpectrumElement, {
    validSizes: LINEAR_PROGRESS_VALID_SIZES,
    defaultSize: 'm',
  })
) {
  /**
   * The size of the progress bar.
   *
   * @default m
   */
  declare public size: (typeof LINEAR_PROGRESS_VALID_SIZES)[number];

  // ─────────────────────────────────────────
  //     PROGRESS-BAR-SPECIFIC PROPERTIES
  // ─────────────────────────────────────────

  /**
   * When true, the bar runs a looping fill animation and all four
   * `aria-value*` attributes are omitted from the DOM. The visible
   * value text is also omitted.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public indeterminate = false;
}
