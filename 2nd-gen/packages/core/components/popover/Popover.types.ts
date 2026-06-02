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

import {
  ALL_PLACEMENTS,
  type Placement,
} from '@spectrum-web-components/core/controllers/index.js';

// ─────────────────────────
//     PLACEMENT
// ─────────────────────────

/**
 * The placement of the popover relative to its trigger, re-exported from the
 * `PlacementController` so the popover and the controller share a single source
 * of truth for the 22 supported values.
 */
export type { Placement };
export { ALL_PLACEMENTS };

/**
 * The full set of placement values accepted by `<swc-popover>`. Downstream
 * first-party components narrow this set per the proxy pattern.
 */
export const POPOVER_VALID_PLACEMENTS =
  ALL_PLACEMENTS satisfies readonly Placement[];

// ─────────────────────────
//     SIZE
// ─────────────────────────

/**
 * Optional fixed sizes for the popover. When unset, the popover fits its
 * contents. Each size pins a fixed inline size (`s` → 336px, `m` → 416px,
 * `l` → 576px).
 */
export const POPOVER_VALID_SIZES = ['s', 'm', 'l'] as const;

export type PopoverSize = (typeof POPOVER_VALID_SIZES)[number];

// ─────────────────────────
//     EVENTS
// ─────────────────────────

/**
 * The cause of a popover close, carried on `swc-close.detail.source`.
 *
 * - `'escape'`: the Escape key dismissed the popover.
 * - `'outside'`: a click outside the popover (light-dismiss in default mode,
 *   wired backdrop-click in modal mode) dismissed it.
 * - `'programmatic'`: `open` was set to `false` in code.
 */
export type PopoverCloseSource = 'escape' | 'outside' | 'programmatic';

/**
 * Detail payload carried on the `swc-close` event.
 */
export interface PopoverCloseEventDetail {
  /** What triggered the close. */
  source: PopoverCloseSource;
}
