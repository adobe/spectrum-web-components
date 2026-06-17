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
            @beforetoggle=${this._onBeforeToggle}
          >
            ${content}
          </div>
        `;
  }
}
