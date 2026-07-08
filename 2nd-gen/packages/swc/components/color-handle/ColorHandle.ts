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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { ColorHandleBase } from '@spectrum-web-components/core/components/color-handle';

import '../color-loupe/swc-color-loupe.js';

import opacityCheckerboardStyles from '../../stylesheets/_lit-styles/opacity-checkerboard.css';
import styles from './color-handle.css';

/**
 * A draggable dot rendered on top of a color area, slider, or wheel that shows
 * the currently picked color over an opacity checkerboard and pops a built-in
 * `<swc-color-loupe>` on touch. It is a non-interactive, visual-only primitive;
 * accessibility is owned by the parent color picker.
 *
 * @element swc-color-handle
 * @since 0.0.1
 *
 * @example
 * <swc-color-handle color="rgba(0, 128, 255, 0.7)"></swc-color-handle>
 */
export class ColorHandle extends ColorHandleBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [opacityCheckerboardStyles, styles];
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('color')) {
      // Apply the core white-first contrast decision to the dark borders.
      this.style.setProperty(
        '--_swc-color-handle-border-alpha',
        String(this.borderAlpha)
      );
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ColorHandle-inner">
        <div
          class="swc-ColorHandle-layer swc-OpacityCheckerboard swc-OpacityCheckerboard--sizeS"
        ></div>
        <div
          class="swc-ColorHandle-layer swc-ColorHandle-colorFill"
          style=${styleMap({ '--swc-color-handle-picked-color': this.color })}
        ></div>
      </div>
      <swc-color-loupe
        color=${this.color}
        ?open=${this.open && !this.disabled}
      ></swc-color-loupe>
    `;
  }
}
