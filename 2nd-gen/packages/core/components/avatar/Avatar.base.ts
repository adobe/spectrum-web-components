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

import {
  AVATAR_DEFAULT_SIZE,
  AVATAR_VALID_SIZES,
  type AvatarSize,
} from './Avatar.types.js';

/**
 * Base class for the avatar component.
 *
 * @attribute {string} src - URL of the profile image.
 * @attribute {string} alt - Text description of the avatar. Pass `alt=""` or omit to mark the image as decorative.
 * @attribute {number} size - One of: 50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500.
 */
export abstract class AvatarBase extends SpectrumElement {
  // ─────────────────────────
  //     STATIC
  // ─────────────────────────

  /**
   * @internal
   */
  static readonly VALID_SIZES: readonly AvatarSize[] = AVATAR_VALID_SIZES;

  // ──────────────────
  //     CORE API
  // ──────────────────

  /**
   * URL of the profile image to display.
   */
  @property({ type: String })
  public src = '';

  /**
   * Text description of the avatar image.
   *
   * Becomes the `alt` attribute on the underlying `<img>` element.
   * Pass `alt=""` or omit entirely to treat the image as decorative.
   */
  @property({ type: String })
  public alt: string | undefined;

  // ───────────────────
  //     SIZE API
  // ───────────────────

  /**
   * The size of the avatar.
   *
   * Accepts numeric values: 50, 75, 100, 200, 300, 400, 500 (default), 600,
   * 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500.
   *
   * Invalid values fall back to the default (500).
   */
  @property({ type: Number, reflect: true })
  public get size(): AvatarSize {
    return this._size;
  }

  public set size(value: AvatarSize) {
    const validSize = (AVATAR_VALID_SIZES as readonly number[]).includes(
      Number(value)
    )
      ? (Number(value) as AvatarSize)
      : AVATAR_DEFAULT_SIZE;

    if (this._size === validSize) {
      return;
    }

    const oldSize = this._size;
    this._size = validSize;
    this.requestUpdate('size', oldSize);
  }

  private _size: AvatarSize = AVATAR_DEFAULT_SIZE;

  // ──────────────────────────────────────────
  //     DEPRECATED — 1st-gen compat shims
  // ──────────────────────────────────────────

  /**
   * @deprecated Use `alt` instead. This shim will be removed in a future release.
   */
  public get label(): string | undefined {
    return this.alt;
  }

  public set label(value: string | undefined) {
    if (window.__swc?.DEBUG) {
      window.__swc.warn(
        this,
        `The "label" attribute on <${this.localName}> is deprecated. Use "alt" instead.`,
        'https://opensource.adobe.com/spectrum-web-components/components/avatar/',
        { type: 'api' }
      );
    }
    this.alt = value;
  }

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', String(this.size));
    }
  }
}
