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

export const ACTION_GROUP_VALID_SIZES = [
  'xs',
  's',
  'm',
  'l',
  'xl',
] as const satisfies readonly ElementSize[];

export const ACTION_GROUP_ORIENTATIONS = ['horizontal', 'vertical'] as const;

export const ACTION_GROUP_STATIC_COLORS = ['white', 'black'] as const;

// ──────────────────
//     TYPES
// ──────────────────

export type ActionGroupSize = (typeof ACTION_GROUP_VALID_SIZES)[number];
export type ActionGroupOrientation = (typeof ACTION_GROUP_ORIENTATIONS)[number];
export type ActionGroupStaticColor =
  (typeof ACTION_GROUP_STATIC_COLORS)[number];
