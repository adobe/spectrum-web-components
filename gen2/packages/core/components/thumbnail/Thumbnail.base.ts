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

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { validateEnum, warnIf } from '@adobe/spectrum-wc-core/utils/index.js';

import {
  THUMBNAIL_DEFAULT_FIT,
  THUMBNAIL_DEFAULT_SIZE,
  THUMBNAIL_VALID_FITS,
  THUMBNAIL_VALID_SIZES,
  type ThumbnailFit,
  type ThumbnailSize,
} from './Thumbnail.types.js';

export abstract class ThumbnailBase extends SpectrumElement {
  // ─────────────────────────
  //     STATIC
  // ─────────────────────────

  /**
   * @internal
   *
   * Valid numeric size values, exposed for validation, stories, and tests.
   */
  static readonly VALID_SIZES: readonly ThumbnailSize[] = THUMBNAIL_VALID_SIZES;

  // ───────────────────
  //     SIZE API
  // ───────────────────

  /**
   * The size of the thumbnail. Invalid values fall back to the default (500).
   *
   * @default 500
   */
  @property({ type: Number, reflect: true })
  public get size(): ThumbnailSize {
    return this._size;
  }

  public set size(value: ThumbnailSize) {
    const isValid = (THUMBNAIL_VALID_SIZES as readonly number[]).includes(
      Number(value)
    );
    const validSize = isValid
      ? (Number(value) as ThumbnailSize)
      : THUMBNAIL_DEFAULT_SIZE;

    warnIf(
      this,
      !isValid,
      `<${this.localName}> expects "size" to be one of: ${THUMBNAIL_VALID_SIZES.join(', ')}. Received "${value}".`,
      'https://spectrum-web-components.adobe.com/?path=/docs/components-thumbnail--docs',
      { issues: [`size="${value}"`] }
    );

    if (this._size === validSize) {
      return;
    }

    const oldSize = this._size;
    this._size = validSize;
    this.requestUpdate('size', oldSize);
  }

  private _size: ThumbnailSize = THUMBNAIL_DEFAULT_SIZE;

  // ───────────────────
  //     FIT API
  // ───────────────────

  /**
   * How the slotted image fits within the thumbnail's bounds. Invalid
   * values fall back to the default (`'contain'`).
   *
   * @default 'contain'
   */
  @property({ type: String, reflect: true })
  public get fit(): ThumbnailFit {
    return this._fit;
  }

  public set fit(value: ThumbnailFit) {
    const isValid = (THUMBNAIL_VALID_FITS as readonly string[]).includes(value);
    const validFit = isValid ? value : THUMBNAIL_DEFAULT_FIT;

    validateEnum(this, {
      prop: 'fit',
      value,
      valid: THUMBNAIL_VALID_FITS,
      url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-thumbnail--docs',
    });

    if (this._fit === validFit) {
      return;
    }

    const oldFit = this._fit;
    this._fit = validFit;
    this.requestUpdate('fit', oldFit);
  }

  private _fit: ThumbnailFit = THUMBNAIL_DEFAULT_FIT;

  // ───────────────────────────
  //     ACCESSIBILITY API
  // ───────────────────────────

  /**
   * Marks the thumbnail as decorative, hiding it (and its slotted image)
   * from assistive technology via `aria-hidden`. The `Thumbnail` class
   * additionally gives the slotted image `alt=""` when unset.
   */
  @property({ type: Boolean, reflect: true })
  public decorative = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', String(this.size));
    }
    if (!this.hasAttribute('fit')) {
      this.setAttribute('fit', this.fit);
    }
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('decorative')) {
      this._syncAriaHidden();
    }
  }

  // Only clear `aria-hidden` if this instance set it, so a consumer's own
  // attribute survives.
  private _appliedAriaHidden = false;

  private _syncAriaHidden(): void {
    if (this.decorative) {
      this._appliedAriaHidden = !this.hasAttribute('aria-hidden');
      this.setAttribute('aria-hidden', 'true');
      return;
    }
    if (this._appliedAriaHidden) {
      this.removeAttribute('aria-hidden');
      this._appliedAriaHidden = false;
    }
  }
}
