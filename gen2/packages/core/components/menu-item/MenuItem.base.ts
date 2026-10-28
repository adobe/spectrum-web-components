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

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';

import { MENU_ITEM_VALID_SIZES, type MenuItemSize } from './MenuItem.types.js';

/**
 * Base class for a menu row. Implements the row half of the
 * {@link https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ | menu button}
 * pattern: `role="menuitem"` on the host, with the owning `swc-menu` driving
 * arrow-key navigation and roving tabindex across its rows.
 *
 * @slot label - Text of the row.
 * @slot visual - Optional leading icon.
 */
export abstract class MenuItemBase extends SizedMixin(SpectrumElement, {
  validSizes: MENU_ITEM_VALID_SIZES,
  defaultSize: 'm',
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

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  public override connectedCallback(): void {
    super.connectedCallback();
    // `swc-menu` collects rows by tag name on `slotchange`, which can run
    // before this element's first render, so the role cannot wait for one.
    // An author-supplied role wins: `menuitemcheckbox` and `menuitemradio`
    // rows arrive with selection.
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'menuitem');
    }
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (!changedProperties.has('disabled')) {
      return;
    }
    // Mapped by hand rather than via `DisabledMixin` (Q20): the mixin also
    // writes `tabindex`, which `FocusgroupNavigationController` owns here.
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }
}
