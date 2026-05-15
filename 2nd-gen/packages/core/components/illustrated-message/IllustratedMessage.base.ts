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

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (window.__swc?.DEBUG) {
      if (
        changedProperties.has('size') &&
        !ILLUSTRATED_MESSAGE_VALID_SIZES.includes(this.size)
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> received an invalid "size" value of "${this.size}". Valid values are ${ILLUSTRATED_MESSAGE_VALID_SIZES.join(', ')}.`,
          'https://opensource.adobe.com/spectrum-web-components/components/illustrated-message/',
          { issues: [`size="${this.size}"`] }
        );
      }

      if (
        changedProperties.has('orientation') &&
        !ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS.includes(this.orientation)
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> received an invalid "orientation" value of "${this.orientation}". Valid values are ${ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS.join(', ')}.`,
          'https://opensource.adobe.com/spectrum-web-components/components/illustrated-message/',
          { issues: [`orientation="${this.orientation}"`] }
        );
      }
    }
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
    if (window.__swc?.DEBUG) {
      const headingSlot = event.target as HTMLSlotElement;
      for (const el of headingSlot.assignedElements()) {
        if (!['H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)) {
          window.__swc.warn(
            this,
            `<${this.localName}> heading slot received a <${el.tagName.toLowerCase()}> element. Only <h2>–<h6> elements are allowed in the heading slot.`,
            'https://opensource.adobe.com/spectrum-web-components/components/illustrated-message/',
            { issues: [`heading slot: <${el.tagName.toLowerCase()}>`] }
          );
        }
      }
    }
  }
}
