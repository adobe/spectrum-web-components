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

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';

import { PopoverBase } from '@spectrum-web-components/core/components/popover';

import styles from './popover.css';

/**
 * An anchored popover surface that renders an internal top-layer element. The
 * default lifecycle uses a `<div popover="auto">` with native light-dismiss;
 * setting the `modal` attribute renders a `<dialog>` opened via
 * `showModal()` for blocking modal behavior.
 *
 * The behavior (lifecycle, trigger and ARIA wiring, positioning, events) lives
 * in `PopoverBase`; this class supplies only the styles, the render template,
 * and the shadow-DOM element getters the base reads.
 *
 * @element swc-popover
 * @since 2.0.0
 *
 * @slot - Popover content.
 *
 * @cssprop --swc-popover-content-padding - Padding around the slotted content. Defaults to the `popover-edge-to-content-area` token.
 * @cssprop --swc-popover-background-color - Background color of the surface and arrow. Defaults to the `background-layer-2-color` token.
 * @cssprop --swc-popover-border-color - Border color of the surface and arrow. Defaults to the `popover-border-color` token.
 * @cssprop --swc-popover-corner-radius - Corner radius of the surface. Defaults to the `corner-radius-700` token.
 *
 * @fires swc-open - Dispatched when the popover begins opening.
 * @fires swc-after-open - Dispatched after the open transition completes.
 * @fires swc-close - Dispatched when the popover begins closing. `detail.source` reports `'escape'`, `'outside'`, or `'programmatic'`.
 * @fires swc-after-close - Dispatched after the close transition completes.
 */
export class Popover extends PopoverBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override get internalElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.swc-Popover') ?? null;
  }

  protected override get tipElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.swc-Popover-tip') ?? null;
  }

  // Memoized arrow clearance; see `arrowHeight`. Cleared on disconnect so a
  // remount (potentially under a different platform scale) recomputes.
  private _arrowHeight?: number;

  // The arrow clearance lives in this layer's CSS (`--_swc-popover-tip-height`
  // on `.swc-Popover`); read it here so the base never reaches into the surface
  // styles. The token is stable for the element's lifetime, so the
  // `getComputedStyle` reflow is memoized after the first read rather than run on
  // every re-anchor. Falls back to 0 (uncached) if the surface is not yet
  // rendered/styled, so a later read recomputes once it is.
  protected override get arrowHeight(): number {
    if (this._arrowHeight !== undefined) {
      return this._arrowHeight;
    }
    const surface = this.internalElement;
    if (!surface) {
      return 0;
    }
    this._arrowHeight =
      parseFloat(
        getComputedStyle(surface).getPropertyValue('--_swc-popover-tip-height')
      ) || 0;
    return this._arrowHeight;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._arrowHeight = undefined;
  }

  protected override render(): TemplateResult {
    const content = html`
      <div class="swc-Popover-content">
        <slot></slot>
      </div>
      ${this.hideArrow
        ? nothing
        : html`
            <span class="swc-Popover-tip"></span>
          `}
    `;

    // The render shape branches on `modal`: a `<div popover="auto">` in the
    // default (non-modal) mode, a `<dialog>` (`.showModal()`) in modal mode. The
    // event handlers are defined on the base and bound here so the base owns the
    // behavior while this layer owns only the markup.
    return this.modal
      ? html`
          <dialog
            class="swc-Popover"
            aria-label=${this.accessibleLabel.trim() || nothing}
            @cancel=${this._onCancel}
            @close=${this._onClose}
            @pointerdown=${this._onPointerDown}
          >
            ${content}
          </dialog>
        `
      : html`
          <div
            class="swc-Popover"
            popover="auto"
            role="dialog"
            tabindex="-1"
            aria-label=${this.accessibleLabel.trim() || nothing}
            @beforetoggle=${this._onBeforeToggle}
          >
            ${content}
          </div>
        `;
  }
}
