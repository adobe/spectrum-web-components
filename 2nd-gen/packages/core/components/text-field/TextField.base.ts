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
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';

import {
  TEXT_FIELD_VALID_SIZES,
  type TextFieldSize,
} from './TextField.types.js';

/**
 * A single-line text field for entering and editing text.
 *
 * @attribute {ElementSize} size - The size of the text field.
 */
export abstract class TextFieldBase extends SizedMixin(SpectrumElement, {
  validSizes: TEXT_FIELD_VALID_SIZES,
  defaultSize: 'm',
}) {
  /**
   * The size of the text field.
   *
   * @default m
   */
  declare public size: TextFieldSize;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  // @todo (Phase 3, API): implement the public API surface, dev-warnings, and
  // value/validity normalization per the migration plan.

  // @todo (SWC-2466 / SWC-2467): wire the shared LabellingController and
  // FieldAssociationController once they land.
}
