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

// ─────────────────────────
//     PLACEMENT
// ─────────────────────────

/**
 * The full set of hyphenated placement values accepted by the public API
 * (`'bottom'`, `'bottom-start'`, `'start-top'`, etc.).
 *
 * Physical-alignment variants (`top-left`, `bottom-right`) are distinct from
 * logical-alignment variants (`top-start`, `bottom-end`) — physical stays fixed
 * regardless of direction; logical reverses in RTL via CSS.
 */
export const ALL_PLACEMENTS = [
  'bottom',
  'bottom-left',
  'bottom-right',
  'bottom-start',
  'bottom-end',
  'top',
  'top-left',
  'top-right',
  'top-start',
  'top-end',
  'left',
  'left-top',
  'left-bottom',
  'start',
  'start-top',
  'start-bottom',
  'right',
  'right-top',
  'right-bottom',
  'end',
  'end-top',
  'end-bottom',
] as const;

/**
 * The placement of the element with respect to its anchor element
 * (hyphenated form).
 */
export type Placement = (typeof ALL_PLACEMENTS)[number];

// ─────────────────────────
//     VIRTUAL TRIGGER
// ─────────────────────────

/**
 * A virtual trigger reference accepted by `PlacementController`. Mirrors
 * the Floating UI virtual-element shape: anything that can report its bounding
 * rect and (optionally) its context element is a valid anchor.
 */
export interface VirtualTrigger {
  getBoundingClientRect(): DOMRect;
  contextElement?: Element;
}

// ─────────────────────────
//     OPTIONS
// ─────────────────────────

/**
 * Options passed to `PlacementController.start`.
 */
export interface PlacementOptions {
  /**
   * Preferred side and alignment of the floating element relative to the
   * **trigger** (hyphenated, for example `'bottom'`, `'bottom-start'`).
   *
   * This is the requested placement. When `shouldFlip` is enabled,
   * Floating UI may compute a different side if the requested one does not fit.
   * The result is surfaced on `PlacementController.actualPlacement` and
   * via `onPlacementChange`.
   *
   * @default 'bottom'
   */
  placement?: Placement;

  /**
   * Gap along the **placement direction** between the trigger and the floating
   * element, in pixels (Floating UI `offset` main axis).
   *
   * For `'bottom'`, this is the space below the trigger. This is **not**
   * viewport padding — see `containerPadding` for inset from the overflow
   * boundary.
   *
   * Defaults to `0` so the controller-host contract stays neutral; each
   * consuming component sets its own pattern-specific default.
   *
   * @default 0
   */
  offset?: number;

  /**
   * Slide along the **trigger edge**, perpendicular to the placement
   * direction, in pixels (Floating UI `offset` cross axis).
   *
   * Adjusts alignment such as `'bottom-start'` vs `'bottom-end'` without
   * changing viewport inset. This is **not** `containerPadding`.
   *
   * @default 0
   */
  crossOffset?: number;

  /**
   * Minimum inset from the **overflow boundary**, in pixels, used for
   * collision detection.
   *
   * Floating UI applies this as padding around the boundary it uses for
   * collision detection. By default that is the floating element's clipping
   * ancestors, capped by the visual viewport — so fixed or top-layer popovers
   * usually behave like screen-edge inset, while surfaces inside a scrollable
   * clipping parent use that container's edges instead.
   *
   * This is **not** the gap from the trigger — use `offset` and
   * `crossOffset` for trigger-relative spacing.
   *
   * @default 8
   */
  containerPadding?: number;

  /**
   * Whether Floating UI may **flip** the floating element to the opposite side when the
   * requested `placement` does not fit within the overflow boundary.
   *
   * When `false`, the floating element stays on the requested side even if it
   * overflows — useful for tooltips that must not jump above the trigger.
   *
   * @default true
   */
  shouldFlip?: boolean;

  /**
   * Called after every successful `computePlacement` pass with the
   * computed hyphenated placement. Fires once after first compute and on
   * every subsequent `autoUpdate` tick — even if the value is unchanged —
   * so callers can mirror `actualPlacement` in a single callback. If you
   * only care about transitions, compare the incoming value against the
   * previous one in the handler.
   */
  onPlacementChange?: (placement: Placement) => void;
}
