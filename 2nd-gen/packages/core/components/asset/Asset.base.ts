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
  isDebug,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

import {
  ASSET_BACKGROUND_VALUES,
  ASSET_FIT_VALUES,
  ASSET_LOAD_STATE_VALUES,
  type AssetBackground,
  type AssetErrorEventDetail,
  type AssetFit,
  type AssetLoadState,
  SWC_ASSET_ERROR_EVENT,
  SWC_ASSET_LOAD_EVENT,
} from './Asset.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-asset--docs';

/** A CSS `<ratio>`: one or two positive numbers separated by `/`. */
const ASPECT_RATIO_PATTERN = /^\d+(\.\d+)?(\s*\/\s*\d+(\.\d+)?)?$/;

// `object-fit` doesn't apply to a directly-embedded `<svg>` (not a CSS
// replaced element like `<img>`), so `fit` maps to `preserveAspectRatio`.
const SVG_PRESERVE_ASPECT_RATIO: Record<AssetFit, string> = {
  cover: 'xMidYMid slice',
  contain: 'xMidYMid meet',
};

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

  private _aspectRatio: string | undefined;

  /**
   * The aspect ratio to apply to the asset, in CSS `<ratio>` syntax (e.g.
   * `"16/9"`), plus the `square` keyword. `:`-separated ratios (e.g.
   * `"16:9"`) are normalized to `/`. Falls through to an ancestor-supplied
   * default, else `auto`, when unset. Has no effect when both `width` and
   * `height` are also set.
   */
  @property({ attribute: 'aspect-ratio' })
  public get aspectRatio(): string | undefined {
    return this._aspectRatio;
  }

  public set aspectRatio(value: string | undefined) {
    const oldValue = this._aspectRatio;
    this._aspectRatio = normalizeAspectRatio(value);
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

  /**
   * The load status of the slotted `<img>`: `'loading'` while its request is
   * in flight, `'loaded'` on success, `'error'` on failure. Immediately
   * `'loaded'` for a slotted `<svg>` or no slotted content, since there's
   * nothing asynchronous to wait for. Set internally by Asset; a consumer
   * influences it only by changing what's slotted, not by setting it
   * directly.
   */
  @property({ type: String, reflect: true, attribute: 'load-state' })
  public loadState: AssetLoadState = 'loading';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  // Only remove `aria-hidden` if this instance is the one that set it, so a
  // consumer-applied `aria-hidden` unrelated to `decorative` survives.
  private _appliedAriaHidden = false;

  // The `<img>` currently wired up for load tracking, so re-running
  // `updateLoadState` on unrelated property changes doesn't tear down and
  // reset state for the same element, and so listeners are removed from the
  // right element when the slotted content changes. `undefined` specifically
  // means "not yet determined" (distinct from `null`, "confirmed no `<img>`
  // child"), so the very first resolution to "no `<img>`" isn't mistaken for
  // an unchanged steady state and skipped.
  private _trackedImg: HTMLImageElement | null | undefined = undefined;

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
    validateEnum(this, {
      prop: 'load-state',
      value: this.loadState,
      valid: ASSET_LOAD_STATE_VALUES,
      url: DOCS_URL,
    });
    warnIf(
      this,
      typeof this.aspectRatio !== 'undefined' &&
        !ASPECT_RATIO_PATTERN.test(this.aspectRatio),
      `<${this.localName}> expects "aspect-ratio" to be a CSS <ratio> (e.g. "16/9"), the "square" keyword, or a ":"-separated ratio (e.g. "16:9"). Received "${this.aspectRatio}".`,
      DOCS_URL
    );
    warnIf(
      this,
      typeof this.aspectRatio !== 'undefined' &&
        typeof this.width !== 'undefined' &&
        typeof this.height !== 'undefined',
      `<${this.localName}> "aspect-ratio" has no effect when both "width" and "height" are set.`,
      DOCS_URL
    );

    const children = Array.from(this.children);
    if (isDebug()) {
      this.validateSlottedContent(children);
    }
    this.resolveAccessibleName(children);
    this.applyFitToSvg(children);
    this.updateLoadState(children);
    super.update(changes);
  }

  /**
   * Warns when the default slot receives more than one child, or a child
   * that isn't an `<img>` or `<svg>`. There is exactly one (default) slot,
   * so its assigned elements are the host's own light DOM children.
   */
  private validateSlottedContent(children: Element[]): void {
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
  private resolveAccessibleName(children: Element[]): void {
    if (this.decorative) {
      this.setAttribute('aria-hidden', 'true');
      this._appliedAriaHidden = true;
      return;
    }
    if (this._appliedAriaHidden) {
      this.removeAttribute('aria-hidden');
      this._appliedAriaHidden = false;
    }

    const [child] = children;
    if (!child) {
      return;
    }
    const tagName = child.tagName.toLowerCase();
    if (tagName !== 'img' && tagName !== 'svg') {
      // Already warned about by validateSlottedContent.
      return;
    }

    if (this.hasOwnAccessibleName(child, tagName)) {
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
  private hasOwnAccessibleName(
    child: Element,
    tagName: 'img' | 'svg'
  ): boolean {
    const hasAriaName =
      child.hasAttribute('aria-label') || child.hasAttribute('aria-labelledby');
    if (tagName === 'img') {
      return hasAriaName || child.hasAttribute('alt');
    }
    const hasRoleImg = child.getAttribute('role') === 'img';
    const hasTitleChild = !!child.querySelector(':scope > title');
    return hasRoleImg && (hasAriaName || hasTitleChild);
  }

  private applyFitToSvg(children: Element[]): void {
    const [child] = children;
    if (child?.tagName.toLowerCase() !== 'svg') {
      return;
    }
    child.setAttribute(
      'preserveAspectRatio',
      SVG_PRESERVE_ASPECT_RATIO[this.fit] ?? SVG_PRESERVE_ASPECT_RATIO.cover
    );
  }

  /**
   * Tracks `loadState` against the slotted `<img>`, re-wiring listeners only
   * when the tracked element actually changes (a no-op on every other
   * property update, since re-running this for the same `<img>` would
   * incorrectly reset an already-resolved `loadState` back to `'loading'`).
   */
  private updateLoadState(children: Element[]): void {
    const [child] = children;
    const img =
      child?.tagName.toLowerCase() === 'img'
        ? (child as HTMLImageElement)
        : null;

    if (img === this._trackedImg) {
      return;
    }

    if (this._trackedImg) {
      this._trackedImg.removeEventListener('load', this.handleImgLoad);
      this._trackedImg.removeEventListener('error', this.handleImgError);
    }
    this._trackedImg = img;

    if (!img) {
      // No <img> to wait for: a slotted <svg>, an unsupported child, or
      // nothing slotted at all.
      this.loadState = 'loaded';
      return;
    }

    this.loadState = 'loading';
    img.addEventListener('load', this.handleImgLoad);
    img.addEventListener('error', this.handleImgError);

    // Timing guarantee: an already-complete `<img>` (e.g. served from
    // cache) has already fired its native `load`/`error` before these
    // listeners were attached, so schedule the equivalent transition
    // instead of skipping it. This lets a consumer always just listen for
    // `swc-asset-load`/`swc-asset-error` and get exactly one fire per
    // slotted `<img>`, without a separate synchronous check for the cached
    // case. An `<img>` with no `src` yet is also `complete`, but has
    // nothing to report; it's left at `'loading'` until a real `src`
    // resolves via the listeners already attached above.
    if (img.complete && img.currentSrc) {
      const succeeded = img.naturalWidth > 0;
      queueMicrotask(() => {
        if (this._trackedImg !== img) {
          return;
        }
        if (succeeded) {
          this.handleImgLoad();
        } else {
          this.handleImgError();
        }
      });
    }
  }

  private readonly handleImgLoad = (): void => {
    this.loadState = 'loaded';
    this.dispatchEvent(
      new CustomEvent(SWC_ASSET_LOAD_EVENT, {
        bubbles: true,
        composed: true,
      })
    );
  };

  private readonly handleImgError = (): void => {
    this.loadState = 'error';
    this.dispatchEvent(
      new CustomEvent<AssetErrorEventDetail>(SWC_ASSET_ERROR_EVENT, {
        bubbles: true,
        composed: true,
        detail: { src: this._trackedImg?.currentSrc ?? '' },
      })
    );
  };
}
