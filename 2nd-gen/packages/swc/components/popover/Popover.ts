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
 * @element swc-popover
 * @since 2.0.0
 *
 * @slot - Popover content.
 *
 * @fires swc-open - Dispatched when the popover begins opening.
 * @fires swc-after-open - Dispatched after the open transition completes.
 * @fires swc-close - Dispatched when the popover begins closing. `detail.source` reports `'escape'`, `'outside'`, or `'programmatic'`.
 * @fires swc-after-close - Dispatched after the close transition completes.
 *
 * @todo Phase 4/5: implement the dialog lifecycle (`showPopover()` /
 * `showModal()`), `swc-*` event dispatch, trigger and ARIA wiring,
 * `PlacementController` integration, and reactive `.swc-Popover--<placement>`
 * modifier classes.
 */
export class Popover extends PopoverBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
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

    // @todo Phase 4/5: guard against runtime `modal` toggles while open.
    // Changing `modal` while the popover is open swaps the internal element,
    // destroying top-layer state and event listeners. The lifecycle
    // implementation must close first, let Lit re-render, then re-open.
    return this.modal
      ? html`
          <dialog class="swc-Popover">${content}</dialog>
        `
      : html`
          <div class="swc-Popover" popover="auto">${content}</div>
        `;
  }
}
