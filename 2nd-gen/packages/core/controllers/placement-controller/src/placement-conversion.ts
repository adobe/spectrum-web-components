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

import type { Placement as FloatingPlacement } from '@floating-ui/dom';

import type { Placement } from './types.js';

const LOGICAL_SIDES = new Set(['start', 'end']);

const LOGICAL_TO_PHYSICAL: Record<string, string> = {
  start: 'left',
  end: 'right',
};

/** Physical cross-axis labels mapped to Floating UI start/end on each primary side. */
const PHYSICAL_ALIGNMENT_TO_FLOATING: Record<
  string,
  Record<string, FloatingPlacement>
> = {
  bottom: { left: 'bottom-start', right: 'bottom-end' },
  top: { left: 'top-start', right: 'top-end' },
  left: { top: 'left-start', bottom: 'left-end' },
  right: { top: 'right-start', bottom: 'right-end' },
};

/**
 * Normalize a hyphenated {@link Placement} for Floating UI's `computePosition`.
 *
 * - Logical **sides** (`start`, `end`) map to `left` / `right`.
 * - Logical **alignments** (`bottom-start`, `top-end`) pass through unchanged.
 * - Physical alignments (`bottom-left`, `left-top`) map to the nearest Floating
 *   UI placement (LTR positioning math; RTL styling stays in CSS).
 *
 * @param placement - Customer-facing hyphenated placement.
 * @returns Placement value understood by Floating UI.
 */
export function toFloatingPlacement(placement: Placement): FloatingPlacement {
  const [primary, alignment] = placement.split('-') as [string, string?];

  if (LOGICAL_SIDES.has(primary)) {
    const physicalPrimary = LOGICAL_TO_PHYSICAL[primary] ?? primary;
    if (!alignment) {
      return physicalPrimary as FloatingPlacement;
    }
    const physicalAlignment = LOGICAL_TO_PHYSICAL[alignment] ?? alignment;
    return `${physicalPrimary}-${physicalAlignment}` as FloatingPlacement;
  }

  if (!alignment) {
    return primary as FloatingPlacement;
  }

  if (alignment === 'start' || alignment === 'end') {
    return `${primary}-${alignment}` as FloatingPlacement;
  }

  const mapped = PHYSICAL_ALIGNMENT_TO_FLOATING[primary]?.[alignment];
  if (mapped) {
    return mapped;
  }

  return `${primary}-${alignment}` as FloatingPlacement;
}

/**
 * Surface a Floating UI placement as the public hyphenated {@link Placement}
 * form for `actualPlacement` and `onPlacementChange`.
 *
 * @param placement - Placement returned by Floating UI after `flip`.
 * @returns Customer-facing hyphenated placement.
 */
export function fromFloatingPlacement(placement: FloatingPlacement): Placement {
  return placement as Placement;
}

/**
 * Derive a CSS modifier suffix from a hyphenated placement (for example
 * `.swc-Popover--bottom-start`).
 *
 * @param placement - Customer-facing hyphenated placement.
 * @returns Class suffix safe to append after `--` in a BEM modifier.
 */
export function toPlacementClassSuffix(placement: Placement): string {
  return placement;
}
