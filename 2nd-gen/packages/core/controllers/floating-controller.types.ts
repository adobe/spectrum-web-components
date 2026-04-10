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

import type { Placement } from '@floating-ui/dom';

export type { Placement };

export interface FloatingOptions {
  /**
   * Preferred placement of the floating element relative to the trigger.
   *
   * @default 'bottom-start'
   */
  placement?: Placement;

  /**
   * Distance (in px) between the trigger and the floating element.
   * A single number sets the main-axis offset. A tuple sets
   * `[mainAxis, crossAxis]`.
   *
   * Floating UI's `offset` middleware is placement-aware: a positive
   * value always pushes the floating element **away** from the trigger,
   * regardless of which side it's on.
   *
   * @default 0
   */
  offset?: number | [number, number];
}

/**
 * Fallback placements tried by `flip()` when the floating element
 * overflows the viewport at the requested placement.
 *
 * Matches the fallback logic from the 1st-gen PlacementController.
 */
export const FALLBACK_PLACEMENTS: Record<string, Placement[]> = {
  left: ['right', 'bottom', 'top'],
  'left-start': ['right-start', 'bottom', 'top'],
  'left-end': ['right-end', 'bottom', 'top'],
  right: ['left', 'bottom', 'top'],
  'right-start': ['left-start', 'bottom', 'top'],
  'right-end': ['left-end', 'bottom', 'top'],
  top: ['bottom', 'left', 'right'],
  'top-start': ['bottom-start', 'left', 'right'],
  'top-end': ['bottom-end', 'left', 'right'],
  bottom: ['top', 'left', 'right'],
  'bottom-start': ['top-start', 'left', 'right'],
  'bottom-end': ['top-end', 'left', 'right'],
};
