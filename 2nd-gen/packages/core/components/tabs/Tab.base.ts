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

let tabIdCounter = 0;

/**
 * Base class for an individual tab within a tabbed interface.
 *
 * Manages the tab's selection state, disabled behavior, ARIA
 * attributes, and roving tabindex. Concrete classes supply the
 * stylesheet and render template.
 *
 * Disabled tabs use `aria-disabled="true"` and remain focusable via
 * arrow keys per the ARIA Authoring Practices Guide, but are not
 * activatable (Enter, Space, and click are guarded).
 *
 * @slot - Text label of the tab
 * @slot icon - Optional icon displayed before the label
 */
export abstract class TabBase extends SpectrumElement {
  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Whether this tab is disabled. Disabled tabs are announced as
   * unavailable by assistive technology and cannot be activated,
   * but remain focusable via arrow keys within the tablist.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Whether this tab is currently selected. Managed by the parent
   * `swc-tabs` container — consumers should not set this directly.
   * Use `swc-tabs[selected]` instead.
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Whether the tab is displayed in vertical orientation.
   *
   * Orientation is primarily driven by the parent `swc-tabs` `direction`
   * attribute; this property remains for styling and any consumers that read
   * it explicitly. We can remove it in a future major once vertical layout is
   * fully parent-driven only—track that cleanup in the component backlog if
   * it becomes redundant in practice.
   */
  @property({ type: Boolean, reflect: true })
  public vertical = false;

  /**
   * Unique identifier for this tab. Used by the parent `swc-tabs`
   * to match this tab to its corresponding `swc-tab-panel`.
   */
  @property({ type: String, reflect: true, attribute: 'tab-id' })
  public tabId = '';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);

    this.setAttribute('role', 'tab');

    if (!this.hasAttribute('id')) {
      this.id = `swc-tab-${tabIdCounter++}`;
    }

    this.syncAriaSelected();
    this.syncAriaDisabled();

    // Initial tabindex: -1 by default. The parent TabsBase
    // manages roving tabindex via setRovingTabindex() /
    // updateCheckedState() to ensure exactly one tab has
    // tabindex="0" at all times.
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = -1;
    }
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);

    if (changes.has('selected')) {
      this.syncAriaSelected();
    }

    if (changes.has('disabled')) {
      this.syncAriaDisabled();
    }
  }

  private syncAriaSelected(): void {
    this.setAttribute('aria-selected', String(this.selected));
  }

  private syncAriaDisabled(): void {
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }
}
