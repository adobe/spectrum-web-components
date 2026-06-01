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

import { CSSResultArray, html, TemplateResult } from 'lit';
import { when } from 'lit/directives/when.js';

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
 * @todo Phase 3 (API): popover/dialog lifecycle, event dispatch (`swc-open`,
 * `swc-after-open`, `swc-close`, `swc-after-close`), trigger and ARIA wiring.
 * @todo Phase 5 (styling): reactive `.swc-Popover--<placement>` modifier classes.
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
      ${when(
        this.tip,
        () => html`
          <span class="swc-Popover-tip"></span>
        `
      )}
    `;

    // The render shape branches on `modal`: a `<div popover="auto">` in the
    // default (non-modal) mode, a `<dialog>`(.showModal()) in modal mode.
    return this.modal
      ? html`
          <dialog class="swc-Popover">${content}</dialog>
        `
      : html`
          <div class="swc-Popover" popover="auto">${content}</div>
        `;
  }
}
