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

import type { Placement } from '@adobe/spectrum-wc-core/controllers/index.js';
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
 * The placement values `<swc-menu>` supports: React Spectrum S2's
 * `MenuTrigger.direction` sides (`bottom`, `top`, `left`, `right`, `start`,
 * `end`), each with its two `MenuTrigger.align` alignments. A single
 * hyphenated property, matching `Tooltip`/`Popover`'s `placement` shape
 * (`Popover.types.ts`), rather than a separate `direction`/`align` pair;
 * unlike `Popover`, which narrows to its logical sides only, this keeps
 * `left`/`right` since `MenuTrigger.direction` supports them.
 */
export const MENU_PLACEMENTS = [
  'bottom-start',
  'bottom-end',
  'top-start',
  'top-end',
  'left-top',
  'left-bottom',
  'right-top',
  'right-bottom',
  'start-top',
  'start-bottom',
  'end-top',
  'end-bottom',
] as const satisfies readonly Placement[];

/**
 * Tag names `swc-menu` accepts in its default slot this phase. `swc-menu-group`
 * and `swc-divider` (as a separator) join in a later migration phase.
 */
export const MENU_ALLOWED_CHILDREN = ['swc-menu-item'] as const;

// ──────────────────
//     TYPES
// ──────────────────

export type MenuSize = (typeof MENU_VALID_SIZES)[number];
export type MenuPlacement = (typeof MENU_PLACEMENTS)[number];
