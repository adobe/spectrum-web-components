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
import { property, query } from 'lit/decorators.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import { validateRequiredSlot } from '@adobe/spectrum-wc-core/utils/index.js';

import { MENU_ITEM_VALID_SIZES, type MenuItemSize } from './MenuItem.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-menu--docs';

/**
 * Base class for a menu row. Implements the row half of the
 * {@link https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ | menu button}
 * pattern: `role="menuitem"` on the host, with the owning `swc-menu` driving
 * arrow-key navigation and roving tabindex across its rows.
 *
 * @slot label - Text of the row. Required; referenced as the row's accessible
 * name.
 * @slot visual - Optional leading icon or thumbnail.
 * @slot description - Optional secondary text below the label. Referenced as
 * the row's accessible description.
 */
export abstract class MenuItemBase extends SizedMixin(SpectrumElement, {
  validSizes: MENU_ITEM_VALID_SIZES,
}) {
  /**
   * The size of the menu item.
   *
   * @default m
   */
  declare public size: MenuItemSize;

  /**
   * Whether the row is unavailable for interaction.
   *
   * Exposed as `aria-disabled`, never the native `disabled` attribute, so the
   * row keeps its place in the menu's roving tabindex and stays reachable by
   * arrow keys. A row a user cannot find is a row they cannot be told about.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * ARIA the component supplies itself goes through `internals`, where it acts
   * as a default a consumer's own attributes still override. Writing the same
   * values to `this` would reflect onto the host and clobber them.
   */
  protected readonly internals = this.attachInternals();

  @query('slot[name="label"]')
  private labelSlot?: HTMLSlotElement;

  @query('slot[name="description"]')
  private descriptionSlot?: HTMLSlotElement;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  public override connectedCallback(): void {
    super.connectedCallback();
    // Set here, not in render(): `swc-menu` collects rows on `slotchange`,
    // which can run first. Always `menuitem`; selection rows ship as their
    // own components rather than as a role swap on this one.
    this.setAttribute('role', 'menuitem');
    this.addEventListener('keydown', this.handleKeyDown);
  }

  public override disconnectedCallback(): void {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  // Enter and Space activate a row. Turning them into a click is what makes
  // keyboard and pointer activation reach the same consumer handler.
  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    // Enter would otherwise re-fire on the trigger the menu restores focus
    // to, and Space would scroll the page under the open surface.
    event.preventDefault();
    if (!this.disabled) {
      this.click();
    }
  };

  // `slotchange` never fires for a slot that starts empty, so the first render
  // is the only chance to wire a row that arrives without content, and the
  // only chance for the missing-label warning to reach an empty one.
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.handleTextSlotChange();
  }

  /**
   * Names the row from its `label` slot and describes it from its
   * `description` slot. Wire this to both slots' `slotchange` event in the
   * SWC render().
   *
   * Element references rather than ID refs: the slotted content is
   * consumer-authored, so there is no `id` to point at.
   */
  protected handleTextSlotChange(): void {
    // Flattened, so a row whose slots are forwarded through another
    // component still resolves to the elements that actually render.
    const label = this.labelSlot?.assignedElements({ flatten: true }) ?? [];
    const description =
      this.descriptionSlot?.assignedElements({ flatten: true }) ?? [];
    // `menuitem` names from contents, so without explicit references the
    // description is folded into the name rather than announced as one.
    this.internals.ariaLabelledByElements = label.length > 0 ? label : null;
    this.internals.ariaDescribedByElements =
      description.length > 0 ? description : null;
    // Without a label the row falls back to naming from contents, which folds
    // any description into the name. Every row needs one.
    validateRequiredSlot(this, this.labelSlot, 'label', DOCS_URL, {
      type: 'accessibility',
    });
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    // Mapped by hand rather than via `DisabledMixin` (Q20): the mixin also
    // writes `tabindex`, which `FocusgroupNavigationController` owns here.
    if (changedProperties.has('disabled')) {
      this.ariaDisabled = this.disabled ? 'true' : null;
    }
  }
}
