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

import { computeBorderAlpha } from '@adobe/spectrum-wc-core/components/color-handle';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

/**
 * Minimum inner-border opacity (matches the existing `transparent-black-200`
 * token) so the default look on mid/dark colors is unchanged.
 */
export const COLOR_LOUPE_ALPHA_FLOOR = 0.12;

/**
 * A visual magnifier that shows the currently picked color, including
 * transparency over an opacity checkerboard, inside a loupe shape.
 *
 * The loupe is not an interactive control — accessibility semantics are
 * provided by the parent color picker / color field.
 *
 * @element swc-color-loupe
 */
export abstract class ColorLoupeBase extends SpectrumElement {
  // ─────────────────
  //     SHARED API
  // ─────────────────

  /**
   * Whether the loupe is visible. When `false` the loupe is hidden via
   * CSS opacity and transform transitions.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * The CSS color value to display inside the loupe.
   * Supports any valid CSS color string, including those with alpha
   * transparency (which reveals the checkerboard behind).
   *
   * Default is semi-transparent red so the opacity checkerboard is visible
   * when the component is rendered without a `color` attribute.
   */
  @property({ type: String })
  public color = 'rgba(255, 0, 0, 0.5)';

  // ──────────────────────────
  //     ADAPTIVE CONTRAST
  // ──────────────────────────

  /**
   * The adaptive inner-border opacity for the current `color`, derived by the
   * white-first strategy (shared with `<swc-color-handle>`) so the loupe
   * chrome meets WCAG 1.4.11 (≥3:1) across the color spectrum. The white
   * outer border is unchanged; the rendering layer applies this value to the
   * inner border only.
   *
   * @internal
   */
  protected get borderAlpha(): number {
    return computeBorderAlpha(this.color, { floor: COLOR_LOUPE_ALPHA_FLOOR });
  }
}
