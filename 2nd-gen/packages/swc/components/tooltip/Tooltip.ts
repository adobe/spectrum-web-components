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

import { TooltipBase } from '@adobe/spectrum-wc-core/components/tooltip';

import styles from './tooltip.css';

/**
 * A tooltip component that displays a brief, contextual message near a trigger element.
 *
 * @element swc-tooltip
 * @since 2.0.0-beta.2
 *
 * @example
 * <button id="save-btn">Save</button>
 * <swc-tooltip for="save-btn">Save your changes</swc-tooltip>
 *
 * @slot - Text label displayed in the tooltip.
 *
 * @cssprop --swc-tooltip-background-color - Background color of the tooltip bubble. Overrides the variant-specific background color.
 *
 * @fires swc-open - Dispatched when the tooltip begins to open, before the transition plays.
 * @fires swc-close - Dispatched when the tooltip begins to close, before the transition plays.
 * @fires swc-after-open - Dispatched after the tooltip finishes opening, once the transition completes.
 * @fires swc-after-close - Dispatched after the tooltip finishes closing, once the transition completes.
 */
export class Tooltip extends TooltipBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  // The tip is static in the template, so resolve it once and cache it. The
  // getter is read multiple times per open/close cycle (startPlacement and
  // clearPositioningState), and querySelector on every access is wasteful.
  private _tipElement: HTMLElement | null = null;

  protected override get tipElement(): HTMLElement | null {
    // Memoize lazily rather than in firstUpdated: if the getter is read before
    // the first render, renderRoot is empty and this returns null without
    // caching, so a later access still resolves the element.
    if (!this._tipElement) {
      this._tipElement =
        (this.renderRoot?.querySelector('.swc-Tooltip-tip') as HTMLElement) ??
        null;
    }
    return this._tipElement;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Tooltip">
        <span class="swc-Tooltip-tip" aria-hidden="true"></span>
        <slot></slot>
      </div>
    `;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    // Drop the cached reference so it is re-resolved against a fresh render
    // root if the element is reconnected.
    this._tipElement = null;
  }
}
