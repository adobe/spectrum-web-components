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
import {
  numberAttribute,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

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
   */
  @property({ type: String })
  public alt: string | undefined;

  // ───────────────────
  //     SIZE API
  // ───────────────────

  /**
   * The size of the avatar. Invalid values are kept as set, warn in dev
   * mode, and render at the default size.
   *
   * @default 100
   */
  @property({
    type: Number,
    reflect: true,
    // A removed attribute resets to the default; non-numeric text is kept
    // so reflection never writes `NaN` over the consumer's markup.
    converter: numberAttribute(AVATAR_DEFAULT_SIZE),
  })
  public size: AvatarSize = AVATAR_DEFAULT_SIZE;

  // ───────────────────────
  //     VISUAL API
  // ───────────────────────

  /**
   * Renders a visual outline around the avatar image.
   */
  @property({ type: Boolean, reflect: true })
  public outline = false;

  /**
   * Renders the avatar at reduced opacity, indicating the entity is inactive or unavailable.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  // ───────────────────────────
  //     ACCESSIBILITY API
  // ───────────────────────────

  /**
   * Marks the avatar as decorative, hiding it from assistive technology.
   */
  @property({ type: Boolean, reflect: true })
  public decorative = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override update(changes: PropertyValues): void {
    // An invalid size is kept as set; it matches no size selector in the
    // stylesheet, so the avatar renders at the default size.
    validateEnum(this, {
      prop: 'size',
      value: this.size,
      valid: AVATAR_VALID_SIZES,
      url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-avatar--docs',
    });
    super.update(changes);
  }

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', String(this.size));
    }
    this._syncAriaHidden();
    this._warnMissingAlt();
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('decorative')) {
      this._syncAriaHidden();
    }
    if (changes.has('alt')) {
      this._warnMissingAlt();
    }
  }

  private _syncAriaHidden(): void {
    if (this.decorative) {
      this.setAttribute('aria-hidden', 'true');
    } else {
      this.removeAttribute('aria-hidden');
    }
  }

  private _warnMissingAlt(): void {
    warnIf(
      this,
      this.alt === undefined && !this.decorative,
      `<${this.localName}> is missing an \`alt\` attribute. Provide a text description or pass \`alt=""\` and mark it as \`decorative\`.`,
      'https://spectrum-web-components.adobe.com/?path=/docs/components-avatar--docs',
      {
        type: 'accessibility',
        issues: [
          'Provide an `alt` attribute with meaningful alternative text, or',
          'Set `alt=""` and mark the image as `decorative` (hidden from screen readers).',
        ],
      }
    );
  }
}
