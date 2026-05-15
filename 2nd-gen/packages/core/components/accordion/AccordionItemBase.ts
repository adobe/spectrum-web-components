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

import { property, state } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import {
  type AccordionSize,
  SWC_ACCORDION_ITEM_TOGGLE_EVENT,
} from './Accordion.types.js';

/**
 * Base class for accordion item components. Manages open/disabled state,
 * heading level (set by the parent accordion), and the toggle event.
 *
 * @slot label - The heading text for this accordion item.
 * @slot actions - Optional actions rendered adjacent to the heading, outside
 *   the toggle button so they remain independently interactive.
 * @slot - The panel content revealed when the item is open.
 */
export abstract class AccordionItemBase extends SpectrumElement {
  // ──────────────────
  //     PUBLIC API
  // ──────────────────

  /**
   * Whether the accordion item panel is expanded.
   */
  @property({ type: Boolean, reflect: true })
  public open: boolean = false;

  /**
   * Whether the accordion item is disabled. A disabled item keeps its header
   * in the tab order but blocks toggling.
   */
  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  /**
   * The size of the item. Inherited from the parent accordion; controls which
   * chevron icon is displayed. Has no effect when the item is used standalone.
   */
  @property({ type: String, reflect: true })
  public size?: AccordionSize;

  // ──────────────────────
  //     INTERNAL STATE
  // ──────────────────────

  /**
   * @internal
   * Heading level (2–6) propagated by the parent accordion. Defaults to 3
   * for standalone items. Public so AccordionBase can write to instances
   * without a type assertion.
   */
  @state()
  public heading: number = 3;

  /**
   * @internal
   * Set by the parent accordion when its own `disabled` is true. Causes the
   * item to render as disabled (aria-disabled + inert panel) without clobbering
   * the item's own `disabled` property, so the per-item state is preserved
   * when the accordion is re-enabled.
   */
  @state()
  public parentDisabled: boolean = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * @internal
   * Dispatches the toggle event. The concrete class wires this to the
   * header button's click handler and adds open-state management.
   */
  protected toggle(): void {
    this.dispatchEvent(
      new Event(SWC_ACCORDION_ITEM_TOGGLE_EVENT, {
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  }
}
