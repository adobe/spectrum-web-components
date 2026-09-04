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
  ASSET_BACKGROUND_VALUES,
  ASSET_FIT_VALUES,
  type AssetBackground,
  type AssetFit,
} from './Asset.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-asset--docs';

/**
 * Normalizes an `aspectRatio` value: maps the `square` keyword to `1/1`, and
 * `:`-separated ratios (e.g. `16:9`) to the CSS `<ratio>` separator (`16/9`).
 */
function normalizeAspectRatio(value: string | undefined): string | undefined {
  if (!value) {
    return value;
  }
  if (value === 'square') {
    return '1/1';
  }
  return value.replace(':', '/');
}

export abstract class AssetBase extends SpectrumElement {
  // ─────────────────
  //     SHARED API
  // ─────────────────

  #aspectRatio: string | undefined;

  /**
   * The aspect ratio to apply to the asset, in CSS `<ratio>` syntax (e.g.
   * `"16/9"`), plus the `square` keyword. `:`-separated ratios (e.g.
   * `"16:9"`) are normalized to `/`. Falls through to an ancestor-supplied
   * default, else `auto`, when unset. Has no effect when both `width` and
   * `height` are also set.
   */
  @property({ attribute: 'aspect-ratio' })
  public get aspectRatio(): string | undefined {
    return this.#aspectRatio;
  }

  public set aspectRatio(value: string | undefined) {
    const oldValue = this.#aspectRatio;
    this.#aspectRatio = normalizeAspectRatio(value);
    this.requestUpdate('aspectRatio', oldValue);
  }

  /**
   * An explicit width, as a CSS `<length-percentage>` (e.g. `"100px"`,
   * `"90%"`). An alternative to `aspectRatio` for sizing the asset.
   */
  @property({ type: String })
  public width: string | undefined;

  /**
   * An explicit height, as a CSS `<length-percentage>` (e.g. `"100px"`,
   * `"90%"`). An alternative to `aspectRatio` for sizing the asset.
   */
  @property({ type: String })
  public height: string | undefined;

  /**
   * How slotted image/SVG content fits within the asset's box.
   *
   * @default cover
   */
  @property({ type: String, reflect: true })
  public fit: AssetFit = 'cover';

  /**
   * Marks the asset as decorative, removing it from the accessibility tree
   * (`aria-hidden="true"` on the host) regardless of slotted content or
   * `accessibleLabel`.
   */
  @property({ type: Boolean, reflect: true })
  public decorative = false;

  /**
   * A fallback accessible name, applied to the slotted `<img>` or `<svg>`
   * only when it doesn't already carry its own accessible name.
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel: string | undefined;

  /**
   * The background shown behind slotted content: `transparent` (no
   * background), a `solid` color, or an opacity `checkerboard`.
   *
   * @default transparent
   */
  @property({ type: String, reflect: true })
  public background: AssetBackground = 'transparent';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override update(changes: PropertyValues): void {
    validateEnum(this, {
      prop: 'fit',
      value: this.fit,
      valid: ASSET_FIT_VALUES,
      url: DOCS_URL,
    });
    validateEnum(this, {
      prop: 'background',
      value: this.background,
      valid: ASSET_BACKGROUND_VALUES,
      url: DOCS_URL,
    });
    warnIf(
      this,
      typeof this.aspectRatio !== 'undefined' &&
        typeof this.width !== 'undefined' &&
        typeof this.height !== 'undefined',
      `<${this.localName}> "aspect-ratio" has no effect when both "width" and "height" are set.`,
      DOCS_URL
    );
    this.#validateSlottedContent();
    this.#resolveAccessibleName();
    super.update(changes);
  }

  /**
   * Warns when the default slot receives more than one child, or a child
   * that isn't an `<img>` or `<svg>`. There is exactly one (default) slot,
   * so its assigned elements are the host's own light DOM children.
   */
  #validateSlottedContent(): void {
    const children = Array.from(this.children);
    warnIf(
      this,
      children.length > 1,
      `<${this.localName}> only supports a single slotted <img> or <svg> element. Received ${children.length} children.`,
      DOCS_URL
    );
    const [child] = children;
    if (child) {
      const tagName = child.tagName.toLowerCase();
      warnIf(
        this,
        tagName !== 'img' && tagName !== 'svg',
        `<${this.localName}> expects its slotted content to be an <img> or <svg> element. Received <${tagName}>.`,
        DOCS_URL
      );
    }
  }

  /**
   * Implements `decorative` and the `accessibleLabel` fallback, per the
   * detection order in the component plan's accessibility semantics notes:
   *
   * 1. `decorative` set → `aria-hidden="true"` on the host; everything else
   *    is skipped, regardless of slotted content.
   * 2. The slotted `<img>`/`<svg>` already carries its own accessible name
   *    → leave it alone.
   * 3. Neither of the above, but `accessibleLabel` is set → apply it to the
   *    slotted node (`alt` for `<img>`, `aria-label` + `role="img"` for
   *    `<svg>`, which has no native `alt`).
   * 4. None of the above → DEBUG warning.
   */
  #resolveAccessibleName(): void {
    if (this.decorative) {
      this.setAttribute('aria-hidden', 'true');
      return;
    }
    this.removeAttribute('aria-hidden');

    const [child] = Array.from(this.children);
    if (!child) {
      return;
    }
    const tagName = child.tagName.toLowerCase();
    if (tagName !== 'img' && tagName !== 'svg') {
      // Already warned about by #validateSlottedContent.
      return;
    }

    if (this.#hasOwnAccessibleName(child, tagName)) {
      return;
    }

    if (this.accessibleLabel) {
      if (tagName === 'img') {
        (child as HTMLImageElement).alt = this.accessibleLabel;
      } else {
        child.setAttribute('role', 'img');
        child.setAttribute('aria-label', this.accessibleLabel);
      }
      return;
    }

    warnIf(
      this,
      true,
      `<${this.localName}> requires an accessible name: set "alt" on the slotted <img> (or role="img" plus "aria-label"/"aria-labelledby"/a child <title> on the slotted <svg>), set "accessible-label" on <${this.localName}>, or set "decorative".`,
      DOCS_URL
    );
  }

  /**
   * Whether `child` (an `<img>` or `<svg>`, per `tagName`) already carries
   * its own accessible name and should be left untouched.
   */
  #hasOwnAccessibleName(child: Element, tagName: 'img' | 'svg'): boolean {
    if (tagName === 'img') {
      return child.hasAttribute('alt');
    }
    const hasRoleImg = child.getAttribute('role') === 'img';
    const hasAriaName =
      child.hasAttribute('aria-label') || child.hasAttribute('aria-labelledby');
    const hasTitleChild = !!child.querySelector(':scope > title');
    return hasRoleImg && (hasAriaName || hasTitleChild);
  }
}
