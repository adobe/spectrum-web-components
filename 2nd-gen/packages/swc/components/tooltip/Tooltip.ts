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

import { TooltipBase } from '@spectrum-web-components/core/components/tooltip';

import styles from './tooltip.css';

/**
 * A tooltip component that displays a brief, contextual message near a trigger element.
 *
 * @element swc-tooltip
 * @since 2.0.0
 *
 * @example
 * <button id="save-btn">Save</button>
 * <swc-tooltip for="save-btn">Save your changes</swc-tooltip>
 *
 * @slot - Text label displayed in the tooltip.
 */
export class Tooltip extends TooltipBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <span class="swc-Tooltip-tip"></span>
      <span class="swc-Tooltip-label"><slot></slot></span>
    `;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('popover', 'auto');
  }
}
