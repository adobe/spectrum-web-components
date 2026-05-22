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

const FALLBACKS: Record<FloatingPlacement, FloatingPlacement[]> = {
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

/**
 * Look up the fallback placement order for Floating UI's `flip` middleware
 * when the anchor is a {@link VirtualTrigger}.
 *
 * @param placement - Normalized Floating UI placement for the current side.
 * @returns Ordered list of placements to try when the primary side does not fit.
 */
export function getFallbackPlacements(
  placement: FloatingPlacement
): FloatingPlacement[] {
  return FALLBACKS[placement] ?? [placement];
}
