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

/**
 * A non-interactive primitive: a draggable dot rendered on top of a color
 * area, slider, or wheel that shows the currently picked color (over an
 * opacity checkerboard) and pops a loupe on touch.
 *
 * The handle owns no ARIA role/name and is not independently focusable;
 * accessibility is provided by the parent color picker. Its only net-new a11y
 * obligation is WCAG 1.4.11 non-text contrast via an adaptive border, applied
 * in the rendering layer.
 *
 * @element swc-color-handle
 */
export abstract class ColorHandleBase extends SpectrumElement {
  // ─────────────────
  //     SHARED API
  // ─────────────────

  /**
   * The CSS color value shown inside the handle. Supports any valid CSS color
   * string, including alpha transparency (which reveals the checkerboard).
   *
   * Default is semi-transparent red so the opacity checkerboard is visible
   * when the component is rendered without a `color` attribute.
   */
  @property({ type: String })
  public color = 'rgba(255, 0, 0, 0.5)';

  /** Reflected. Suppresses the loupe (`open && !disabled`). */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Reflected. Set by the parent color component when the parent picker is
   * focused (keyboard or programmatic); enlarges the handle as the focus
   * indicator.
   */
  @property({ type: Boolean, reflect: true })
  public focused = false;

  /** Reflected. Shows the built-in loupe; auto-toggled by touch pointers. */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Reflected. `true` shows the inner color swatch (1st-gen behavior);
   * `false` renders an outline-only handle.
   */
  @property({ type: Boolean, reflect: true })
  public fill = true;

  // ──────────────────────────
  //     POINTER / TOUCH BEHAVIOR
  // ──────────────────────────

  private handlePointerdown(event: PointerEvent): void {
    if (event.pointerType === 'touch') {
      this.open = true;
    }
    this.setPointerCapture(event.pointerId);
  }

  private handlePointerup(event: PointerEvent): void {
    this.open = false;
    this.releasePointerCapture(event.pointerId);
  }

  protected override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    this.addEventListener('pointerdown', this.handlePointerdown);
    this.addEventListener('pointerup', this.handlePointerup);
    this.addEventListener('pointercancel', this.handlePointerup);
  }
}
