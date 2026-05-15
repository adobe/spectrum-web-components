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
import { CSSResultArray, html, nothing, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { TabsBase } from '@spectrum-web-components/core/components/tabs';

import styles from './tabs.css';

/**
 * A tabbed interface for organizing content into separate views where
 * only one view is visible at a time.
 *
 * Uses a three-element architecture: `swc-tabs` (container),
 * `swc-tab` (individual tabs), and `swc-tab-panel` (panel content).
 *
 * **Accessibility:** `role="tablist"`, `aria-label`, and
 * `aria-orientation` are co-located on the same inner element.
 *
 * @element swc-tabs
 * @since 2.0.0
 *
 * @slot - Tab items (`swc-tab` elements)
 * @slot tab-panel - Tab panel content (`swc-tab-panel` elements)
 *
 * @example
 * <swc-tabs selected="1" accessible-label="Product details">
 *   <swc-tab tab-id="1">Overview</swc-tab>
 *   <swc-tab tab-id="2">Specs</swc-tab>
 *   <swc-tab-panel tab-id="1">Product overview content</swc-tab-panel>
 *   <swc-tab-panel tab-id="2">Technical specifications</swc-tab-panel>
 * </swc-tabs>
 */
export class Tabs extends TabsBase {
  /**
   * Shadow `delegatesFocus: true` keeps native focus-delegation where supported;
   * `TabsBase.focus()` focuses the selected slotted tab explicitly so
   * programmatic `focus()` matches 1st-gen expectations regardless of engine.
   */
  public static override shadowRootOptions: ShadowRootInit = {
    delegatesFocus: true,
    mode: 'open',
  };

  // ─────────────────────────────
  //     RENDERING & STYLING
  // ─────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div
        role="tablist"
        class="tablist"
        aria-label=${this.accessibleLabel || nothing}
        aria-orientation=${ifDefined(
          this.direction === 'vertical' ? 'vertical' : undefined
        )}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <slot @slotchange=${this.handleTabSlotChange}></slot>
        <div
          class="selection-indicator ${this.shouldAnimate
            ? ''
            : 'first-position'}"
          style=${this.selectionIndicatorStyle}
          role="presentation"
        ></div>
      </div>
      <slot name="tab-panel" @slotchange=${this.handlePanelSlotChange}></slot>
    `;
  }
}
