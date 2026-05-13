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

let panelIdCounter = 0;

/**
 * Base class for a tab panel that displays content associated with
 * a tab.
 *
 * Manages visibility, ARIA hidden state, tabindex, and the
 * focus-in/out behavior that prevents Tab-key trapping inside panel
 * content.
 *
 * In 1st-gen, `slot="tab-panel"` was
 * assigned programmatically in `firstUpdated` so consumers never
 * wrote it in markup. This behavior is preserved in 2nd-gen.
 *
 * The panel removes its own
 * `tabindex` on `focusin` so that Tab presses inside the panel
 * move to the next interactive element rather than being trapped.
 * On `focusout`, `tabindex` is restored so the panel remains
 * focusable from the tablist.
 *
 * @slot - Content displayed when the associated tab is selected
 */
export abstract class TabPanelBase extends SpectrumElement {
  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Whether this panel is currently visible (its associated tab is
   * selected). Managed by the parent `swc-tabs` — consumers should
   * not set this directly.
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Unique identifier linking this panel to its corresponding tab.
   * Must match the `tab-id` attribute on the associated `swc-tab`.
   */
  @property({ type: String, reflect: true, attribute: 'tab-id' })
  public tabId = '';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * Removes the panel's `tabindex` while focus is inside the panel
   * so that Tab presses navigate to the next interactive element
   * rather than the panel container itself.
   */
  protected handleFocusin(): void {
    this.removeAttribute('tabindex');
  }

  /**
   * Restores `tabindex` when focus leaves the panel so the panel
   * remains directly focusable from the tablist via Tab key.
   */
  protected handleFocusout(): void {
    this.tabIndex = this.selected ? 0 : -1;
  }

  protected override firstUpdated(_changes: PropertyValues): void {
    super.firstUpdated(_changes);

    this.slot = 'tab-panel';
    this.setAttribute('role', 'tabpanel');
    this.tabIndex = 0;

    if (!this.hasAttribute('id')) {
      this.id = `swc-tab-panel-${panelIdCounter++}`;
    }
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);

    if (changes.has('selected')) {
      this.syncVisibility();
    }
  }

  private syncVisibility(): void {
    if (this.selected) {
      this.removeAttribute('aria-hidden');
      this.tabIndex = 0;
    } else {
      this.setAttribute('aria-hidden', 'true');
      this.tabIndex = -1;
    }
  }
}
