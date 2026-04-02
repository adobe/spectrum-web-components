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
 * Provides the core API for displaying a circular profile image. Concrete
 * classes supply the stylesheet and render template.
 */
export abstract class AvatarBase extends SpectrumElement {
  // ─────────────────────────
  //     STATIC
  // ─────────────────────────

  /**
   * @internal
   *
   * The set of valid numeric size values for the avatar.
   *
   * This is an internal property not intended for consumer use, but used in
   * internal validation logic, stories, and tests to keep them in sync with
   * the canonical type definition in `Avatar.types.ts`.
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
   * Pass `alt=""` to treat the image as decorative — the host receives
   * `aria-hidden="true"` so the entire shadow tree is hidden from assistive
   * technology. If omitted, the image renders with `alt=""` and a DEBUG
   * warning is issued; only the warning distinguishes this from an
   * intentional decorative image.
   */
  @property({ type: String })
  public alt: string | undefined;

  // ───────────────────
  //     SIZE API
  // ───────────────────

  /**
   * The size of the avatar. Invalid values fall back to the default (500).
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

  // ───────────────────────
  //     VISUAL API
  // ───────────────────────

  /**
   * Renders an outline around the avatar image so it remains visible against
   * backgrounds that share the same color as the image border.
   */
  @property({ type: Boolean, reflect: true, attribute: 'over-background' })
  public overBackground = false;

  // ──────────────────────────────────────────
  //     DEPRECATED — 1st-gen compat shims
  // ──────────────────────────────────────────

  /**
   * @deprecated Use `alt` instead. This shim will be removed in a future release.
   *
   * **Breaking change:** In 1st-gen, `label` was the primary way to provide
   * alternative text for the avatar image. In 2nd-gen, use `alt` instead.
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
        { type: 'api', level: 'deprecation' }
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
    this.toggleAttribute('aria-hidden', this.alt === '');
    if (window.__swc?.DEBUG) {
      this.warnMissingAlt();
    }
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('alt')) {
      this.toggleAttribute('aria-hidden', this.alt === '');
      if (window.__swc?.DEBUG) {
        this.warnMissingAlt();
      }
    }
  }

  private warnMissingAlt(): void {
    if (this.alt === undefined) {
      window.__swc?.warn(
        this,
        `<${this.localName}> is missing an \`alt\` attribute. Provide a text description or pass \`alt=""\` to mark it as decorative.`,
        'https://opensource.adobe.com/spectrum-web-components/components/avatar/#accessibility',
        {
          type: 'accessibility',
          issues: [
            'Provide an `alt` attribute with meaningful alternative text, or',
            'Set `alt=""` to mark the image as decorative (hidden from screen readers).',
          ],
        }
      );
    }
  }
}
