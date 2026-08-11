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

import { SlotTextController } from '@adobe/spectrum-wc-core/controllers/slot-text-controller/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  validateAllowedChildren,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

import { SlotAttributePropagationController } from '../../controllers/slot-attribute-propagation-controller/index.js';
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
 * @slot heading - Optional heading; when present, must be a single h2–h6 element.
 *   Both constraints (allowed h2–h6 children and a single heading) are validated
 *   in dev mode.
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
  //     CONTROLLERS
  // ──────────────────────

  /**
   * Observes whether the default (illustration) slot has assigned content.
   *
   * @internal
   */
  protected slotText = new SlotTextController(this);

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

  /**
   * Whether the default (illustration) slot has assigned content, so
   * rendering subclasses can collapse the illustration wrapper when no
   * illustration is provided instead of reserving its fixed size.
   */
  protected get hasIllustration(): boolean {
    return this.slotText.hasContent;
  }

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
   * Validates the heading slot: children must be `<h2>`–`<h6>`, and at most a
   * single heading is allowed. Rendering subclasses must wire this to the
   * heading slot's `slotchange` event (e.g.
   * `<slot name="heading" @slotchange=${this.handleHeadingSlotChange}>`) for the
   * validation warnings to fire.
   */
  protected handleHeadingSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    const url =
      'https://spectrum-web-components.adobe.com/?path=/docs/components-illustrated-message--docs';
    validateAllowedChildren(
      this,
      slot,
      ['h2', 'h3', 'h4', 'h5', 'h6'],
      'heading',
      url
    );
    const headingCount = slot.assignedElements().length;
    warnIf(
      this,
      headingCount > 1,
      `<${this.localName}> "heading" slot accepts a single heading element but received ${headingCount}.`,
      url,
      { issues: [`heading slot: ${headingCount} elements`] }
    );
  }
}
