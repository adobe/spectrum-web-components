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

import type { ElementSize } from '@spectrum-web-components/base/src/sizedMixin.js';

// ──────────────────
//     SHARED
// ──────────────────

export const BADGE_VALID_SIZES = [
  's',
  'm',
  'l',
  'xl',
] as const satisfies readonly ElementSize[];

export const BADGE_VARIANTS_SEMANTIC = [
  'accent',
  'informative',
  'neutral',
  'positive',
  'notice',
  'negative',
] as const;

export const BADGE_VARIANTS_COLOR = [
  'fuchsia',
  'indigo',
  'magenta',
  'purple',
  'seafoam',
  'yellow',
  'gray',
  'red',
  'orange',
  'chartreuse',
  'celery',
  'green',
  'cyan',
  'blue',
  'pink',
  'turquoise',
  'brown',
  'cinnamon',
  'silver',
] as const;

export const FIXED_VALUES = [
  'block-start',
  'block-end',
  'inline-start',
  'inline-end',
] as const;

// ──────────────────────────────────────────
//     S1-ONLY (remove with 1st-gen)
// ──────────────────────────────────────────

export const BADGE_VARIANTS_COLOR_S1 = [
  'fuchsia',
  'indigo',
  'magenta',
  'purple',
  'seafoam',
  'yellow',
  'gray',
  'red',
  'orange',
  'chartreuse',
  'celery',
  'green',
  'cyan',
  'blue',
] as const satisfies readonly BadgeColorVariant[];

export const BADGE_VARIANTS_S1 = [
  ...BADGE_VARIANTS_SEMANTIC,
  ...BADGE_VARIANTS_COLOR_S1,
] as const;

// ──────────────────
//     CANONICAL
// ──────────────────

export const BADGE_VARIANTS = [
  ...BADGE_VARIANTS_SEMANTIC,
  ...BADGE_VARIANTS_COLOR,
] as const;

// ──────────────────
//     TYPES
// ──────────────────

// Shared
export type FixedValues = (typeof FIXED_VALUES)[number];
export type BadgeSize = (typeof BADGE_VALID_SIZES)[number];
export type BadgeSemanticVariant = (typeof BADGE_VARIANTS_SEMANTIC)[number];

// S1-only (remove with 1st-gen)
export type BadgeColorVariantS1 = (typeof BADGE_VARIANTS_COLOR_S1)[number]; // remove with 1st-gen
export type BadgeVariantS1 = (typeof BADGE_VARIANTS_S1)[number]; // remove with 1st-gen

// Canonical
export type BadgeColorVariant = (typeof BADGE_VARIANTS_COLOR)[number];
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
