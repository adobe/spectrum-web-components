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
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import {
  validateAllowedChildren,
  validateEnum,
} from '@spectrum-web-components/core/utils/index.js';

import { SlotAttributePropagationController } from '../../controllers/slot-attribute-propagation/index.js';
import {
  ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS,
  ILLUSTRATED_MESSAGE_VALID_SIZES,
  type IllustratedMessageOrientation,
  type IllustratedMessageSize,
} from './IllustratedMessage.types.js';

/**
 * An illustrated message displays an illustration and a message, typically
 * used in empty states or error pages.
 *
 * @slot - Decorative or informative SVG illustration
 * @slot heading - The heading element, h2–h6
 *   @todo SWC-1943 Add slot constraints once the CEM slot constraints work is complete:
 *   `{required} {allowedChildren: h2, h3, h4, h5, h6} {maxChildren: 1}`
 * @slot description - Supporting description text
 * @slot actions - Optional action controls displayed below the description, typically a button or button group. Receives `size` automatically from the illustrated message.
 */
export abstract class IllustratedMessageBase extends SpectrumElement {
  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  /**
   * @internal
   */
  static readonly VALID_SIZES: readonly IllustratedMessageSize[] =
    ILLUSTRATED_MESSAGE_VALID_SIZES;

  /**
   * @internal
   */
  static readonly VALID_ORIENTATIONS: readonly IllustratedMessageOrientation[] =
    ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * The size of the message
   *
   * @default m
   */
  @property({ type: String, reflect: true })
  public size: IllustratedMessageSize = 'm';

  /**
   * The layout orientation
   */
  @property({ type: String, reflect: true })
  public orientation: IllustratedMessageOrientation = 'vertical';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  private readonly _sizePropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => this.size,
      slotName: 'actions',
    }
  );

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('size')) {
      validateEnum(this, {
        prop: 'size',
        value: this.size,
        valid: ILLUSTRATED_MESSAGE_VALID_SIZES,
        url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-illustrated-message--docs',
      });
    }

    if (changedProperties.has('orientation')) {
      validateEnum(this, {
        prop: 'orientation',
        value: this.orientation,
        valid: ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS,
        url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-illustrated-message--docs',
      });
    }
  }

  protected handleActionsSlotChange(): void {
    this._sizePropagation.propagate();
  }

  /**
   * @internal
   *
   * Validates that the heading slot only contains `<h2>`–`<h6>` elements.
   * Rendering subclasses must wire this to the heading slot's `slotchange`
   * event (e.g. `<slot name="heading" @slotchange=${this.handleHeadingSlotChange}>`)
   * for the validation warning to fire.
   */
  protected handleHeadingSlotChange(event: Event): void {
    validateAllowedChildren(
      this,
      event.target as HTMLSlotElement,
      ['h2', 'h3', 'h4', 'h5', 'h6'],
      'heading',
      'https://spectrum-web-components.adobe.com/?path=/docs/components-illustrated-message--docs'
    );
  }
}
