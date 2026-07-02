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

import { html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Shared pending-spinner SVG template used by both swc-button and
 * swc-action-button. Returns `nothing` when `pending` is false so callers
 * can interpolate unconditionally: `${renderPendingSpinner(this.pending,
 * this.pendingActive)}`.
 */
export function renderPendingSpinner(
  pending: boolean,
  pendingActive: boolean
): TemplateResult | typeof nothing {
  if (!pending) {
    return nothing;
  }
  return html`
    <svg
      class=${classMap({
        'swc-PendingSpinner': true,
        'swc-PendingSpinner--active': pendingActive,
      })}
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        class="swc-PendingSpinner-track"
        cx="50%"
        cy="50%"
        r="calc(50% - 1px)"
      />
      <circle
        class="swc-PendingSpinner-fill"
        cx="50%"
        cy="50%"
        r="calc(50% - 1px)"
        pathLength="100"
        stroke-dasharray="100 200"
        stroke-dashoffset="75"
        stroke-linecap="round"
      />
    </svg>
  `;
}
