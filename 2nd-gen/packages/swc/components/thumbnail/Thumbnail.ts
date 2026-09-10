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

import { ThumbnailBase } from '@adobe/spectrum-wc-core/components/thumbnail';

import styles from './thumbnail.css';

/**
 * Wraps a slotted image, such as an asset preview or a layer in a layers
 * panel, in a consistent checkerboard-backed frame.
 *
 * @element swc-thumbnail
 *
 * @slot - The image (or other visual content) to display in the frame.
 *
 * @example
 * <swc-thumbnail>
 *   <img src="/preview.png" alt="Preview" />
 * </swc-thumbnail>
 */
export class Thumbnail extends ThumbnailBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }
}
