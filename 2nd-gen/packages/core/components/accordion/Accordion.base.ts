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

import { LiveSelectionController } from '@spectrum-web-components/core/controllers/index.js';
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
 * @attribute {boolean} allowMultiple - Reflected as `allow-multiple`. When set,
 *   multiple items may be open at the same time.
 * @attribute {number} level - Heading level (2–6) applied to every item header.
 *   Values outside that range are clamped.
 * @attribute {AccordionSize} size - Size applied to all items.
 * @attribute {AccordionDensity} density - Vertical spacing between items.
 * @attribute {boolean} quiet - Renders the accordion in its quiet visual variant.
 * @attribute {boolean} disabled - Disables all items in the accordion.
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

  private assignedItems(): AccordionItemBase[] {
    const slot = this.renderRoot?.querySelector('slot');
    if (!slot) {
      return [];
    }
    return slot
      .assignedElements({ flatten: true })
      .filter((el): el is AccordionItemBase => el instanceof AccordionItemBase);
  }

  // LiveSelectionController observes swc-accordion-item-toggle events and
  // enforces the exclusive-open constraint when allowMultiple is false. Items
  // own their own open state; the controller only closes siblings.
  private readonly selectionController = new LiveSelectionController(this, {
    getItems: () => this.assignedItems(),
    readSelected: (item) => item.open,
    deselect: (item) => {
      item.open = false;
    },
    observeEvent: SWC_ACCORDION_ITEM_TOGGLE_EVENT,
    mode: () => (this.allowMultiple ? 'multiple' : 'single'),
  });

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    // The controller is event-driven and won't catch items that start open via
    // HTML attributes; read the initial DOM state and enforce the constraint now.
    this.selectionController.refresh();
  }

  protected syncAccordionItems(): void {
    for (const item of this.assignedItems()) {
      item.setManagedHeading(this.level);
      item.size = this.size;
      item.setManagedParentDisabled(this.disabled);
    }
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
    // When allow-multiple is removed, enforce the stricter single-select
    // constraint over the current DOM state.
    if (
      changedProperties.has('allowMultiple') &&
      changedProperties.get('allowMultiple') === true &&
      !this.allowMultiple
    ) {
      this.selectionController.refresh();
    }
    // When the accordion is re-enabled after being disabled, enforce
    // exclusive-open so items that were opened while disabled are corrected.
    if (
      changedProperties.has('disabled') &&
      changedProperties.get('disabled') === true &&
      !this.disabled &&
      !this.allowMultiple
    ) {
      this.selectionController.refresh();
    }
    super.update(changedProperties);
  }
}
