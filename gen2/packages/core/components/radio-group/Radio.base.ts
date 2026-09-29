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
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import type { RadioSize } from './RadioGroup.types.js';

/**
 * A single selectable option within a `swc-radio-group`. Rendering lives in `swc-radio`.
 *
 * @attribute {RadioSize} size - Size of the item. Inherited from the parent
 *   `swc-radio-group`.
 */
export abstract class RadioBase extends SpectrumElement {
  /**
   * The size of the item. Inherited from the parent radio group.
   */
  @property({ type: String, reflect: true })
  public size?: RadioSize;
}
