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
import { PropertyValues } from 'lit';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';

import { RadioBase } from './Radio.base.js';
import { RADIO_VALID_SIZES, type RadioSize } from './RadioGroup.types.js';

/**
 * Coordinates a set of `swc-radio` items as a single mutually-exclusive selection.
 * Rendering lives in `swc-radio-group`.
 *
 * @attribute {RadioSize} size - Size applied to all items.
 */
export abstract class RadioGroupBase extends SizedMixin(SpectrumElement, {
  validSizes: RADIO_VALID_SIZES,
  defaultSize: 'm',
}) {
  /**
   * Size applied to all items. Defaults to `m`.
   */
  declare public size: RadioSize;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  private assignedItems(): RadioBase[] {
    const slot = this.renderRoot?.querySelector('slot');
    if (!slot) {
      return [];
    }
    return (slot as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((el): el is RadioBase => el instanceof RadioBase);
  }

  protected syncRadioItems(): void {
    for (const item of this.assignedItems()) {
      item.size = this.size;
    }
  }

  protected override update(changedProperties: PropertyValues): void {
    if (changedProperties.has('size')) {
      this.syncRadioItems();
    }
    super.update(changedProperties);
  }
}
