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
  fromFloatingPlacement,
  type Placement,
  toFloatingPlacement,
} from '../controllers/placement-controller/index.js';

/**
 * Resolve an element's computed writing direction.
 *
 * @param element - The element whose `direction` is read.
 * @returns `'rtl'` when the computed direction is right-to-left, else `'ltr'`.
 */
export function resolveDirection(element: Element): 'ltr' | 'rtl' {
  return getComputedStyle(element).direction === 'rtl' ? 'rtl' : 'ltr';
}

/**
 * The physical side (`'top'` / `'bottom'` / `'left'` / `'right'`) of a placement,
 * dropping any alignment suffix (for example `'bottom-start'` becomes `'bottom'`).
 * Use for the `PlacementController`'s `onPlacementChange`, whose argument is
 * already a resolved physical placement.
 *
 * @param placement - A resolved (physical) placement value.
 */
export function physicalSide(placement: Placement): string {
  return placement.split('-')[0];
}

/**
 * Reflect the physical side of `placement` onto `host` as the `actual-placement`
 * attribute, resolving logical `start` / `end` against `directionSource`'s
 * writing direction. Components style off this attribute (tip orientation, gap)
 * rather than exposing the computed placement as a public property.
 *
 * @param host - The element the `actual-placement` attribute is set on.
 * @param placement - The requested (possibly logical) placement.
 * @param directionSource - The element whose writing direction resolves
 *   `start` / `end` (typically the trigger/anchor).
 */
export function reflectActualPlacement(
  host: Element,
  placement: Placement,
  directionSource: Element
): void {
  const direction = resolveDirection(directionSource);
  const side = physicalSide(
    fromFloatingPlacement(toFloatingPlacement(placement, direction))
  );
  host.setAttribute('actual-placement', side);
}
