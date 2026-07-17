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

import type { ElementSize } from '@spectrum-web-components/core/mixins/index.js';

// ──────────────────
//     SHARED
// ──────────────────

export const CARD_VALID_SIZES = [
  'xs',
  's',
  'm',
  'l',
  'xl',
] as const satisfies readonly ElementSize[];

export const CARD_VARIANTS = [
  'primary',
  'secondary',
  'tertiary',
  'quiet',
] as const;

export const CARD_DENSITIES = ['compact', 'regular', 'spacious'] as const;

export const SWC_CARD_CLICK_EVENT = 'swc-card-click' as const;

// ──────────────────
//     TYPES
// ──────────────────

export type CardSize = (typeof CARD_VALID_SIZES)[number];
export type CardVariant = (typeof CARD_VARIANTS)[number];
export type CardDensity = (typeof CARD_DENSITIES)[number];
