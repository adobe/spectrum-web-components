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
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { AssetBase } from '@adobe/spectrum-wc-core/components/asset';

import opacityCheckerboardStyles from '../../stylesheets/_lit-styles/opacity-checkerboard.css';
import styles from './asset.css';

/**
 * A general image/media primitive that displays slotted content (typically
 * an `<img>` or `<svg>`).
 *
 * @element swc-asset
 * @slot - a single `<img>` or `<svg>` element to display
 *
 * @cssprop --swc-asset-aspect-ratio - Fallback aspect ratio applied when
 * `aspectRatio` is unset; an ancestor can set this to hand Asset a default.
 * @cssprop --swc-asset-background-color - Background color used when
 * `background="solid"`. Defaults to `token("gray-100")`.
 *
 * @since 2.0.0-beta.3
 *
 * @example
 * <swc-asset>
 *   <img src="example.png" alt="Example image" />
 * </swc-asset>
 */
export class Asset extends AssetBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [opacityCheckerboardStyles, styles];
  }

  protected override render(): TemplateResult {
    const style: Record<string, string> = {};
    if (typeof this.aspectRatio !== 'undefined') {
      style['--_swc-asset-aspect-ratio'] = this.aspectRatio;
    }
    if (typeof this.width !== 'undefined') {
      style['--_swc-asset-width'] = this.width;
    }
    if (typeof this.height !== 'undefined') {
      style['--_swc-asset-height'] = this.height;
    }

    return html`
      <div
        class=${classMap({
          ['swc-Asset']: true,
          ['swc-OpacityCheckerboard']: this.background === 'checkerboard',
        })}
        style=${styleMap(style)}
      >
        <slot></slot>
      </div>
    `;
  }
}
