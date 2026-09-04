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

import { AssetBase } from '@adobe/spectrum-wc-core/components/asset';

import styles from './asset.css';

/**
 * A general image/media primitive that displays slotted content (typically
 * an `<img>` or `<svg>`).
 *
 * @element swc-asset
 * @slot - a single `<img>` or `<svg>` element to display
 *
 * @since 2.0.0-beta.1
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
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Asset">
        <slot></slot>
      </div>
    `;
  }
}
