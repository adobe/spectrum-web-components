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
 * Base class for the static avatar component.
 *
 * Provides the shared image API (src, size, label, is-decorative) used by both
 * `<swc-avatar>` and `<swc-avatar-link>`. Link-specific properties live in
 * `AvatarLinkBase`.
 *
 * @attribute {number} size - The size of the avatar. One of: 50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500.
 * @attribute {string} src - URL of the profile image.
 * @attribute {string} label - Accessible label for the image. Required unless is-decorative is set.
 * @attribute {boolean} is-decorative - Marks the image as decorative (hidden from screen readers).
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
   * Accessible label for the avatar image.
   *
   * Becomes the `alt` attribute on the underlying `<img>` element.
   * Required unless `isDecorative` is set. Takes precedence over `isDecorative`
   * when both are present.
   */
  @property({ type: String })
  public label = '';

  /**
   * Marks the avatar image as decorative — it conveys no information and
   * should be hidden from assistive technology.
   *
   * When set, `alt=""` and `aria-hidden="true"` are applied to the image.
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-decorative' })
  public isDecorative = false;

  // ───────────────────
  //     SIZE API
  // ───────────────────

  /**
   * The size of the avatar.
   *
   * Accepts numeric values: 50, 75, 100 (default), 200, 300, 400, 500, 600,
   * 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500.
   *
   * Invalid values fall back to the default (100).
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

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', String(this.size));
    }
    this.warnMissingLabel();
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('label') || changes.has('isDecorative')) {
      this.warnMissingLabel();
    }
  }

  /**
   * Emits a DEBUG-mode warning when no accessible label information is provided.
   */
  protected warnMissingLabel(): void {
    if (!window.__swc?.DEBUG) {
      return;
    }

    if (!this.label && !this.isDecorative) {
      window.__swc.warn(
        this,
        `<${this.localName}> element requires either a "label" attribute or the "is-decorative" attribute to be accessible.`,
        'https://opensource.adobe.com/spectrum-web-components/components/avatar/#accessibility',
        { type: 'accessibility' }
      );
    }
  }
}
