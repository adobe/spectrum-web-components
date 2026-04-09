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
  ILLUSTRATED_MESSAGE_VALID_HEADING_LEVELS,
  ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS,
  ILLUSTRATED_MESSAGE_VALID_SIZES,
  type IllustratedMessageHeadingLevel,
  type IllustratedMessageOrientation,
  type IllustratedMessageSize,
} from './IllustratedMessage.types.js';

/**
 * An illustrated message displays an illustration and a message, typically
 * used in empty states or error pages.
 *
 * @slot - Decorative or informative SVG illustration. Decorative SVGs should include
 *   `aria-hidden="true"`; informative SVGs should include `role="img"` and `aria-label`.
 * @slot heading - Heading text. Must be a single `<span>` element — the shadow DOM owns the
 *   heading tag and level. Consumers who previously slotted an `<h2>` must switch to `<span>`.
 * @slot description - Description text. Links must be real `<a>` elements or link components
 *   with visible names.
 */
export abstract class IllustratedMessageBase extends SpectrumElement {
  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  /**
   * @internal
   */
  static readonly VALID_HEADING_LEVELS: readonly IllustratedMessageHeadingLevel[] =
    ILLUSTRATED_MESSAGE_VALID_HEADING_LEVELS;

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
   * The heading level of the illustrated message title. Accepts 2–6.
   */
  @property({ type: Number, reflect: true, attribute: 'heading-level' })
  public headingLevel: IllustratedMessageHeadingLevel = 2;

  /**
   * The size of the illustrated message.
   */
  @property({ type: String, reflect: true })
  public size: IllustratedMessageSize = 'm';

  /**
   * The layout orientation of the illustrated message.
   */
  @property({ type: String, reflect: true })
  public orientation: IllustratedMessageOrientation = 'vertical';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * Returns a valid heading level clamped to 2–6.
   *
   * @internal
   */
  protected getHeadingLevel(): number {
    return Math.max(2, Math.min(6, this.headingLevel));
  }

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

      if (
        changedProperties.has('headingLevel') &&
        (this.headingLevel < 2 || this.headingLevel > 6)
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> received an invalid "heading-level" value of "${this.headingLevel}". Valid values are 2–6. The value has been clamped to ${this.getHeadingLevel()}.`,
          'https://opensource.adobe.com/spectrum-web-components/components/illustrated-message/',
          { issues: [`heading-level="${this.headingLevel}"`] }
        );
      }

      const headingSlot = this.shadowRoot?.querySelector<HTMLSlotElement>(
        'slot[name="heading"]'
      );
      const assigned = headingSlot?.assignedElements() ?? [];
      if (assigned.length > 0 && assigned[0].tagName.toLowerCase() !== 'span') {
        window.__swc.warn(
          this,
          `<${this.localName}> expects the "heading" slot to contain a single <span> element. The shadow DOM owns the heading tag. Received: <${assigned[0].tagName.toLowerCase()}>.`,
          'https://opensource.adobe.com/spectrum-web-components/components/illustrated-message/',
          { issues: [`heading slot: <${assigned[0].tagName.toLowerCase()}>`] }
        );
      }
    }
  }
}
