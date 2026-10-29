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

import type { ElementSize } from '@adobe/spectrum-wc-core/mixins/index.js';
import type { FieldStatus } from '@adobe/spectrum-wc-core/types/index.js';

// ──────────────────
//     SHARED
// ──────────────────

export const CHECKBOX_VALID_SIZES = [
  's',
  'm',
  'l',
  'xl',
] as const satisfies readonly ElementSize[];

/**
 * Authored statuses a checkbox accepts. A checkbox has no valid presentation,
 * so `valid` is left out.
 */
export const CHECKBOX_STATUSES = [
  'disabled',
  'invalid',
  'readonly',
] as const satisfies readonly FieldStatus[];

// ──────────────────
//     TYPES
// ──────────────────

export type CheckboxSize = (typeof CHECKBOX_VALID_SIZES)[number];
export type CheckboxStatus = (typeof CHECKBOX_STATUSES)[number];
