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

import { ThumbnailBase } from '@adobe/spectrum-wc-core/components/thumbnail';
import { warnIf } from '@adobe/spectrum-wc-core/utils';

import opacityCheckerboardStyles from '../../stylesheets/_lit-styles/opacity-checkerboard.css';
import styles from './thumbnail.css';

/**
 * Wraps a slotted image, such as an asset preview or a layer in a layers
 * panel, in a consistent checkerboard-backed frame.
 *
 * @element swc-thumbnail
 *
 * @slot - Image element to present in the thumbnail.
 *
 * @cssprop --swc-thumbnail-size - Size (inline and block) of the thumbnail. Defaults to the token matching the `size` attribute.
 *
 * @example
 * <swc-thumbnail>
 *   <img src="/preview.png" alt="Preview" />
 * </swc-thumbnail>
 */
export class Thumbnail extends ThumbnailBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [opacityCheckerboardStyles, styles];
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('decorative')) {
      this._syncSlottedImageAlt();
    }
  }

  private _handleSlotChange = (): void => {
    this._syncSlottedImageAlt();
  };

  // Tracks the last (image, decorative) pair already synced so the
  // `updated()` and `slotchange` triggers, which can both fire for the same
  // state on first render, don't double up on the alt-fallback or warning.
  private _lastSyncedImg: HTMLImageElement | null = null;
  private _lastSyncedDecorative: boolean | null = null;

  private _syncSlottedImageAlt(): void {
    const img = this.querySelector('img');
    if (!img) {
      return;
    }

    if (
      img === this._lastSyncedImg &&
      this.decorative === this._lastSyncedDecorative
    ) {
      return;
    }
    this._lastSyncedImg = img;
    this._lastSyncedDecorative = this.decorative;

    if (this.decorative) {
      if (!img.hasAttribute('alt')) {
        img.setAttribute('alt', '');
      }
      return;
    }

    const hasAccessibleName =
      img.hasAttribute('alt') ||
      !!img.getAttribute('aria-label') ||
      !!img.getAttribute('aria-labelledby');

    warnIf(
      this,
      !hasAccessibleName,
      `<${this.localName}> requires an accessible name on its slotted image.`,
      'https://spectrum-web-components.adobe.com/?path=/docs/components-thumbnail--docs',
      {
        type: 'accessibility',
        issues: [
          'add an `alt` attribute (an empty string is valid when the image is already described by surrounding context) to the slotted `<img>`, or',
          'add `aria-label` or `aria-labelledby` to the slotted `<img>`, or',
          'set `decorative` on the thumbnail if the image is purely presentational.',
        ],
      }
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Thumbnail swc-OpacityCheckerboard">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
