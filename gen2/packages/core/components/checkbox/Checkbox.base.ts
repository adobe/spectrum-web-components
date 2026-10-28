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
import {
  FieldDescriptionMixin,
  LabellingMixin,
  SizedMixin,
} from '@adobe/spectrum-wc-core/mixins/index.js';

import { CHECKBOX_VALID_SIZES, type CheckboxSize } from './Checkbox.types.js';

/**
 * A checkbox for selecting or marking an item, or for giving consent.
 *
 * @attribute {ElementSize} size - Size of the box, label, and supporting text.
 *
 * @slot label - Visible label. Clicking it toggles the checkbox.
 */
export abstract class CheckboxBase extends SizedMixin(
  FieldDescriptionMixin(LabellingMixin(SpectrumElement)),
  {
    validSizes: CHECKBOX_VALID_SIZES,
    defaultSize: 'm',
  }
) {
  /**
   * Size of the box, label, and supporting text.
   *
   * @default m
   */
  declare public size: CheckboxSize;
}
