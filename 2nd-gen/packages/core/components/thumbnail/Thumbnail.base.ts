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
import { warnIf } from '@adobe/spectrum-wc-core/utils/index.js';

import {
  THUMBNAIL_DEFAULT_FIT,
  THUMBNAIL_DEFAULT_SIZE,
  THUMBNAIL_VALID_FITS,
  THUMBNAIL_VALID_SIZES,
  type ThumbnailFit,
  type ThumbnailSize,
} from './Thumbnail.types.js';

/**
 * Base class for the thumbnail component.
 *
 * Provides the core API for wrapping a slotted preview image in a
 * checkerboard-backed frame. Concrete classes supply the stylesheet and
 * render template.
 *
 * `background`, `layer`, `disabled`, `focused`, and `selected` are
 * intentionally not declared here, or anywhere else on this component. The
 * checkerboard wrapper already covers `background`'s letterboxing purpose,
 * and a consumer reproduces the `layer`/`disabled`/`focused`/`selected`
 * visual outcomes with its own CSS targeting `swc-thumbnail` (or a wrapper
 * element). 1st-gen's `cover` boolean is replaced by `fit` below, not
 * dropped.
 */
export abstract class ThumbnailBase extends SpectrumElement {
  // ─────────────────────────
  //     STATIC
  // ─────────────────────────

  /**
   * @internal
   *
   * The set of valid numeric size values for the thumbnail.
   *
   * This is an internal property not intended for consumer use, but used in
   * internal validation logic, stories, and tests to keep them in sync with
   * the canonical type definition in `Thumbnail.types.ts`.
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

    warnIf(
      this,
      !isValid,
      `<${this.localName}> expects "fit" to be one of: ${THUMBNAIL_VALID_FITS.join(', ')}. Received "${value}".`,
      'https://spectrum-web-components.adobe.com/?path=/docs/components-thumbnail--docs',
      { issues: [`fit="${value}"`] }
    );

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
   * from assistive technology via `aria-hidden`. Concrete elements
   * additionally give the slotted image `alt=""` when unset; see the
   * `Thumbnail` class for that logic, which lives there because it needs a
   * `slotchange` listener bound to the rendered `<slot>` that this base
   * class does not have.
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
    this._syncAriaHidden();
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('decorative')) {
      this._syncAriaHidden();
    }
  }

  private _syncAriaHidden(): void {
    if (this.decorative) {
      this.setAttribute('aria-hidden', 'true');
    } else {
      this.removeAttribute('aria-hidden');
    }
  }
}
