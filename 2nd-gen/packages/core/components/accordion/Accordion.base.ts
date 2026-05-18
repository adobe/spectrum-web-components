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
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';

import {
  ACCORDION_VALID_SIZES,
  type AccordionDensity,
  type AccordionHeadingLevel,
  type AccordionSize,
  SWC_ACCORDION_ITEM_TOGGLE_EVENT,
} from './Accordion.types.js';
import { AccordionItemBase } from './AccordionItem.base.js';

/**
 * Base class for accordion components. Manages item propagation, heading
 * level, density, and the exclusive-open constraint.
 *
 * @slot - One or more `swc-accordion-item` elements.
 */
export abstract class AccordionBase extends SizedMixin(SpectrumElement, {
  validSizes: ACCORDION_VALID_SIZES,
  defaultSize: 'm',
}) {
  // ──────────────────
  //     PUBLIC API
  // ──────────────────

  /**
   * When set, multiple items may be open at the same time. By default only
   * one item can be open.
   */
  @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
  public allowMultiple: boolean = false;

  /**
   * Heading level applied to every item header (2–6). Defaults to 3.
   * Values outside that range are clamped.
   */
  @property({ type: Number, reflect: true })
  public level: AccordionHeadingLevel = 3;

  /**
   * Size applied to all items. Defaults to `m`.
   */
  declare public size: AccordionSize;

  /**
   * Controls vertical spacing between items.
   *
   * @default regular
   */
  @property({ type: String, reflect: true })
  public density: AccordionDensity = 'regular';

  /**
   * Renders the accordion in its quiet (no-border) visual variant.
   */
  @property({ type: Boolean, reflect: true })
  public quiet: boolean = false;

  /**
   * Disables all items in the accordion. Individual items may also be
   * disabled independently.
   */
  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  private closeSiblingsOnOpen = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    if (this.allowMultiple) {
      return;
    }
    const toggling = event.target;
    if (!(toggling instanceof AccordionItemBase) || !toggling.open) {
      return;
    }
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) {
      return;
    }
    const items = slot
      .assignedElements({ flatten: true })
      .filter((el): el is AccordionItemBase => el instanceof AccordionItemBase);
    for (const item of items) {
      if (item !== toggling) {
        item.open = false;
      }
    }
  };

  protected syncAccordionItems(): void {
    const slot = this.renderRoot?.querySelector('slot');
    if (!slot) {
      return;
    }
    const items = slot
      .assignedElements({ flatten: true })
      .filter((el): el is AccordionItemBase => el instanceof AccordionItemBase);
    for (const item of items) {
      item.setManagedHeading(this.level);
      item.size = this.size;
      item.setManagedParentDisabled(this.disabled);
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(
      SWC_ACCORDION_ITEM_TOGGLE_EVENT,
      this.closeSiblingsOnOpen
    );
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(
      SWC_ACCORDION_ITEM_TOGGLE_EVENT,
      this.closeSiblingsOnOpen
    );
  }

  protected override update(changedProperties: PropertyValues): void {
    if (changedProperties.has('level')) {
      const clamped = Math.min(
        6,
        Math.max(2, this.level)
      ) as AccordionHeadingLevel;
      if (this.level !== clamped) {
        this.level = clamped;
      }
    }
    if (
      changedProperties.has('level') ||
      changedProperties.has('size') ||
      changedProperties.has('disabled')
    ) {
      this.syncAccordionItems();
    }
    super.update(changedProperties);
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    if (window.__swc?.DEBUG && !this.hasAttribute('density')) {
      window.__swc.warn(
        this,
        `<${this.localName}> should have an explicit "density" attribute set. Defaulting to "regular".`,
        'https://opensource.adobe.com/spectrum-web-components/components/accordion/',
        { type: 'api', level: 'low' }
      );
    }
  }
}
