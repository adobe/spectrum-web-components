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

// ──────────────────────────
//     VARIANTS
// ──────────────────────────

export const TOOLTIP_VARIANTS = ['neutral', 'informative', 'negative'] as const;

// ──────────────────────────
//     PLACEMENTS
// ──────────────────────────

// Physical cardinal placements
export const TOOLTIP_PHYSICAL_PLACEMENTS = [
  'top',
  'bottom',
  'left',
  'right',
] as const;

// Logical inline placements (RTL-aware equivalents of left/right)
export const TOOLTIP_LOGICAL_PLACEMENTS = ['start', 'end'] as const;

export const TOOLTIP_PLACEMENTS = [
  ...TOOLTIP_PHYSICAL_PLACEMENTS,
  ...TOOLTIP_LOGICAL_PLACEMENTS,
] as const;

// ──────────────────────────
//     TYPES
// ──────────────────────────

export type TooltipVariant = (typeof TOOLTIP_VARIANTS)[number];
export type TooltipPlacement = (typeof TOOLTIP_PLACEMENTS)[number];
