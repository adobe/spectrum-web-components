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

import type { ElementSize } from '@adobe/spectrum-wc-core/mixins/index.js';

// ──────────────────
//     SHARED
// ──────────────────

export const MENU_VALID_SIZES = [
  's',
  'm',
  'l',
  'xl',
] as const satisfies readonly ElementSize[];

/**
 * Where the anchored surface opens relative to the trigger. Matches React
 * Spectrum S2's `MenuTrigger.direction` exactly.
 */
export const MENU_DIRECTIONS = [
  'bottom',
  'top',
  'left',
  'right',
  'start',
  'end',
] as const;

/**
 * Cross-axis alignment of the anchored surface against the trigger. Matches
 * React Spectrum S2's `MenuTrigger.align` exactly.
 */
export const MENU_ALIGNMENTS = ['start', 'end'] as const;

/**
 * Tag names `swc-menu` accepts in its default slot this phase. `swc-menu-group`
 * and `swc-divider` (as a separator) join in a later migration phase.
 */
export const MENU_ALLOWED_CHILDREN = ['swc-menu-item'] as const;

// ──────────────────
//     TYPES
// ──────────────────

export type MenuSize = (typeof MENU_VALID_SIZES)[number];
export type MenuDirection = (typeof MENU_DIRECTIONS)[number];
export type MenuAlignment = (typeof MENU_ALIGNMENTS)[number];
