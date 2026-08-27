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

// ──────────────────
//     SHARED
// ──────────────────

export const TEXT_FIELD_VALID_SIZES = [
  's',
  'm',
  'l',
  'xl',
] as const satisfies readonly ElementSize[];

export const TEXT_FIELD_TYPES = [
  'text',
  'url',
  'tel',
  'email',
  'password',
] as const;

export const TEXT_FIELD_LABEL_POSITIONS = ['top', 'side'] as const;

// ──────────────────
//     TYPES
// ──────────────────

export type TextFieldSize = (typeof TEXT_FIELD_VALID_SIZES)[number];
export type TextFieldType = (typeof TEXT_FIELD_TYPES)[number];
export type TextFieldLabelPosition =
  (typeof TEXT_FIELD_LABEL_POSITIONS)[number];

/**
 * Valid `autocomplete` tokens for the text field. Aliases the platform
 * `AutoFill` union, which is the standard HTML autofill grammar and excludes
 * the combobox-only `list`/`none` tokens 1st-gen widened it with (B5); those
 * belong to the combobox component.
 */
export type TextFieldAutocomplete = AutoFill;
