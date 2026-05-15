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
import { styleMap } from 'lit/directives/style-map.js';

import { ColorLoupeBase } from '@spectrum-web-components/core/components/color-loupe';

import styles from './color-loupe.css';

/**
 * A visual magnifier that displays the currently picked color inside a
 * loupe-shaped container with an opacity checkerboard behind transparent
 * colors. The loupe is a non-interactive, visual-only companion to
 * color selection controls such as `<swc-color-field>`.
 *
 * @element swc-color-loupe
 * @since 0.0.1
 *
 * @example
 * <swc-color-loupe open color="rgba(0, 128, 255, 0.7)"></swc-color-loupe>
 */
export class ColorLoupe extends ColorLoupeBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  /**
   * @todo SWC-2029 - Migrate opacity-checkerboard to 2nd gen and consume it
   * here; checkerboard styling is currently hardcoded in color-loupe.css.
   */
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ColorLoupe">
        <div class="swc-ColorLoupe-checkerboard swc-ColorLoupe--clipped"></div>
        <div
          class="swc-ColorLoupe-colorFill swc-ColorLoupe--clipped"
          style=${styleMap({
            '--swc-color-loupe-picked-color': this.color,
          })}
        ></div>
        <svg aria-hidden="true" class="swc-ColorLoupe-svg" overflow="visible">
          <defs>
            <path
              id="loupe-path"
              d="M 22 60 C 18.2 56 14.6 51.7 11.3 47.2 C 8.3 43.3 5.7 39.1 3.5 34.7 C 1.2 30 0 25.9 0 22.4 C 0 17.2 1.8 12.2 5 8.2 C 8.2 4.2 12.7 1.5 17.6 0.4 C 22.6 -0.6 27.8 0.2 32.3 2.6 C 36.8 5 40.3 8.9 42.3 13.7 C 43.4 16.4 44 19.4 44 22.4 C 44 25.9 42.8 30 40.5 34.7 C 38.3 39.1 35.7 43.3 32.7 47.3 C 29.4 51.7 25.8 56 22 60 Z"
              transform="translate(2, 2)"
            />
            <mask id="loupe-mask">
              <rect x="0" y="0" height="100" width="100" fill="white" />
              <use href="#loupe-path" fill="black" />
            </mask>
          </defs>

          <g class="swc-ColorLoupe-loupe">
            <use
              href="#loupe-path"
              mask="url(#loupe-mask)"
              class="swc-ColorLoupe-innerBorder"
            />
            <use
              href="#loupe-path"
              mask="url(#loupe-mask)"
              class="swc-ColorLoupe-outerBorder"
            />
          </g>
        </svg>
      </div>
    `;
  }
}
