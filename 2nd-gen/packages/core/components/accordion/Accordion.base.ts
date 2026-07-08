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

import { SelectionController } from '@spectrum-web-components/core/controllers/index.js';
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

  /**
   * @internal
   *
   * Applies the exclusive-open constraint when in `single-toggle` mode, in
   * place of manually iterating `assignedItems()`. `allowMultiple` drives this
   * controller's `mode` via `setOptions` (see the `allowMultiple` branch in
   * `update()`), so `closeSiblingsOnOpen` only needs to consult `getMode()`
   * rather than reading the `allowMultiple` property directly. The controller
   * is only ever driven imperatively from `closeSiblingsOnOpen` with
   * `{ silent: true }` — items keep their own click handling and
   * cancelable-toggle lifecycle in `AccordionItemBase.toggle()` unchanged.
   * `enableInteraction: false` means this controller never attaches its own
   * click/keydown listeners; `getItems` is only used for `applyMutators`' live
   * scan of every assigned item when a silent transition is asserted.
   *
   * In `multiple` mode this controller's selection cache is intentionally left
   * unpopulated: `closeSiblingsOnOpen` no-ops entirely, since items already
   * manage their own `open` state independently and multiple mode does not
   * need siblings closed. Routing every open/close through the controller's
   * `multiple`-mode bookkeeping (`setSelectedItem`/`toggleItem`) was
   * considered, but their `next` selection set is built by extending the
   * cached `selectedItems`, so a cache that drifted from reality (an item
   * closing without going through the controller) could cause a later open to
   * re-select, and therefore re-open, an already-closed item. This controller
   * is deliberately not the source of truth for `multiple` mode as a result.
   *
   * Known limitation: an item opened via a direct `open` property/attribute set
   * (bypassing `toggle()`) is not reconciled by this controller, the same way
   * `closeSiblingsOnOpen` itself only reacts to toggle-driven changes today.
   */
  private readonly _selection = new SelectionController(this, {
    getItems: () => this.assignedItems() as HTMLElement[],
    selectItem: (item) => {
      (item as AccordionItemBase).open = true;
    },
    deselectItem: (item) => {
      (item as AccordionItemBase).open = false;
    },
    mode: 'single-toggle',
    enableInteraction: false,
  });

  private closeSiblingsOnOpen = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    if (this._selection.getMode() === 'multiple') {
      return;
    }
    const toggling = event.target;
    if (!(toggling instanceof AccordionItemBase)) {
      return;
    }
    // Defer until after dispatch returns so that a canceled toggle (where the
    // item reverts open back to false) does not incorrectly close siblings.
    queueMicrotask(() => {
      if (!toggling.open) {
        return;
      }
      // Asserts toggling as the sole selection; applyMutators diffs against a
      // live scan of every assigned item, so every other item is closed
      // regardless of what this controller previously believed was selected.
      this._selection.setSelectedItem(toggling, { silent: true });
    });
  };

  protected syncAccordionItems(): void {
    for (const item of this.assignedItems()) {
      item.setManagedHeading(this.level);
      item.size = this.size;
      item.setManagedParentDisabled(this.disabled);
    }
  }

  private enforceExclusiveOpen(): void {
    let foundOpen = false;
    for (const item of this.assignedItems()) {
      if (item.open) {
        if (foundOpen) {
          item.open = false;
        } else {
          foundOpen = true;
        }
      }
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
    if (changedProperties.has('allowMultiple')) {
      this._selection.setOptions({
        mode: this.allowMultiple ? 'multiple' : 'single-toggle',
      });
    }
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
    // changedProperties.get() returns the previous value; this fires only when
    // disabled transitions from true → false (re-enable).
    if (
      changedProperties.has('disabled') &&
      changedProperties.get('disabled') === true &&
      !this.allowMultiple
    ) {
      this.enforceExclusiveOpen();
    }
    super.update(changedProperties);
  }
}
