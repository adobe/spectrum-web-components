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

/**
 * Physical cross-axis labels mapped to Floating UI's start/end alignment on
 * each primary side. Floating UI only supports `start` / `end` alignment
 * suffixes; SWC exposes physical (`top`/`bottom`/`left`/`right`) cross-axis
 * names that this table translates.
 */
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
 * Reverse lookup for Floating UI placements that aren't valid SWC Placement
 * values. Used by `fromFloatingPlacement` to map the four Floating UI
 * outputs that have no direct SWC equivalent (`left-start`, `left-end`,
 * `right-start`, `right-end`) back into the SWC union. Other Floating UI
 * placements are already valid Placement values and pass through unchanged.
 */
const FLOATING_TO_SWC_PLACEMENT: Partial<Record<FloatingPlacement, Placement>> =
  {
    'left-start': 'left-top',
    'left-end': 'left-bottom',
    'right-start': 'right-top',
    'right-end': 'right-bottom',
  };

/**
 * Normalize a hyphenated `Placement` for Floating UI's `computePosition`.
 *
 * - Logical **sides** (`start`, `end`) map to `left` / `right`.
 * - Logical **alignments** (`bottom-start`, `top-end`) pass through unchanged.
 * - Physical alignments (`bottom-left`, `left-top`, `start-top`, etc.) map to
 *   the nearest Floating UI placement (LTR positioning math; RTL styling
 *   stays in CSS).
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
    // For logical sides combined with a physical sub-alignment
    // (e.g. `start-top`, `end-bottom`), use the physical-alignment table on
    // the resolved physical side. Without this, the function returns
    // strings like `left-top` that aren't valid Floating UI placements.
    const mapped = PHYSICAL_ALIGNMENT_TO_FLOATING[physicalPrimary]?.[alignment];
    if (mapped) {
      return mapped;
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
 * Surface a Floating UI placement as the public hyphenated `Placement`
 * form for `actualPlacement` and `onPlacementChange`.
 *
 * Floating UI emits four placements that don't appear in the SWC `Placement`
 * union (`left-start`, `left-end`, `right-start`, `right-end`) — those map
 * back to their physical equivalents (`left-top`, `left-bottom`, `right-top`,
 * `right-bottom`). The remaining eight Floating UI placements are already
 * valid SWC `Placement` values.
 *
 * @param placement - Placement returned by Floating UI after `flip`.
 * @returns Customer-facing hyphenated placement in the SWC `Placement` union.
 */
export function fromFloatingPlacement(placement: FloatingPlacement): Placement {
  return FLOATING_TO_SWC_PLACEMENT[placement] ?? (placement as Placement);
}
