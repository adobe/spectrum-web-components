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

import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import {
  LINK_STATIC_COLORS,
  LINK_VARIANTS,
  type LinkStaticColor,
  type LinkVariant,
  type ReferrerPolicy,
  type LinkTarget,
} from './Link.types.js';

/**
 * Base class for Spectrum Link components.
 * Holds anchor and link-specific API; subclasses provide rendering and focusElement.
 *
 * @slot - Link text content.
 */
export abstract class LinkBase extends SpectrumElement {
  /**
   * @internal
   *
   * A readonly array of the valid static color variants for the link.
   */
  static readonly STATIC_COLORS: readonly string[] = LINK_STATIC_COLORS;

  /**
   * @internal
   *
   * A readonly array of the valid variants for the link.
   */
  static readonly VARIANTS: readonly string[] = LINK_VARIANTS;

  /**
   * The element that receives focus when the link is focused.
   * Implemented by the subclass (the inner anchor element).
   */
  abstract get focusElement(): HTMLElement;

  // ─── Anchor attributes (mirroring LikeAnchor) ───────────────────────────

  /**
   * Causes the browser to treat the linked URL as a download.
   */
  @property()
  public download?: string;

  /**
   * An accessible label that describes the component.
   * Applied to aria-label and not visually rendered.
   */
  @property()
  public label?: string;

  /**
   * The URL that the hyperlink points to.
   */
  @property()
  public href?: string;

  /**
   * Where to display the linked URL (e.g. _blank, _self).
   */
  @property()
  public target?: LinkTarget;

  /**
   * How much of the referrer to send when following the link.
   */
  @property({ attribute: 'referrerpolicy' })
  public referrerPolicy?: ReferrerPolicy;

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @property()
  public rel?: string;

  // ─── Link-specific and focus behavior ──────────────────────────────────

  /**
   * Whether the link is disabled. When true, the link is not focusable and does not respond to click.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The visual variant of the link (e.g. secondary).
   */
  @property({ type: String, reflect: true })
  public variant?: LinkVariant;

  /**
   * Static color for use on colored backgrounds (black or white).
   */
  @property({ reflect: true, attribute: 'static-color' })
  public staticColor?: LinkStaticColor;

  /**
   * Uses quiet styles (no underline by default; underline on hover/focus).
   */
  @property({ type: Boolean, reflect: true, attribute: 'quiet' })
  public quiet = false;
}
