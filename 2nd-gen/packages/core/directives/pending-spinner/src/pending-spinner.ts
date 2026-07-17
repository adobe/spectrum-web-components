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

import { html, nothing, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

/** Return type of {@link renderPendingSpinner}: the spinner template, or `nothing`. */
export type PendingSpinnerResult = TemplateResult | typeof nothing;

/**
 * Renders the shared pending-spinner SVG used by pending-capable components.
 * Returns `nothing` when `pending` is false so callers can interpolate
 * unconditionally: `${renderPendingSpinner(this.pending, this.pendingActive)}`.
 *
 * Most consumers do not call this directly: `PendingController` (and
 * `PendingMixin`) expose `renderPendingState()`, which calls this with the
 * controller's own state. Use this directive directly only for a stateless
 * spinner without a controller.
 *
 * This is render-only and carries no design-token dependency. Pair it with the
 * shared `pending-spinner.css` style fragment, which themes the
 * `swc-PendingSpinner*` classes this emits.
 *
 * @param pending - Whether the host is in the pending (busy) state.
 * @param pendingActive - Whether the delayed busy visual is active; toggles the
 * `swc-PendingSpinner--active` class that runs the spin animation.
 */
export function renderPendingSpinner(
  pending: boolean,
  pendingActive: boolean
): PendingSpinnerResult {
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
