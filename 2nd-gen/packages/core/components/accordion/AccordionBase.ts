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

import { html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import {
  type AccordionDensity,
  type AccordionSize,
} from './Accordion.types.js';
import { AccordionItemBase } from './AccordionItemBase.js';

/**
 * Base class for accordion components. Manages item propagation, heading
 * level, density, and the exclusive-open constraint.
 *
 * @slot - One or more `swc-accordion-item` elements.
 */
export abstract class AccordionBase extends SpectrumElement {
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
  public level: number = 3;

  /**
   * Size applied to all items. When set, overrides any size set on individual
   * items.
   */
  @property({ type: String, reflect: true })
  public size?: AccordionSize;

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

  private updateItems(): void {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) {
      return;
    }
    const items = slot
      .assignedElements({ flatten: true })
      .filter((el): el is AccordionItemBase => el instanceof AccordionItemBase);
    for (const item of items) {
      item.heading = this.level;
      item.size = this.size;
    }
  }

  protected override update(changedProperties: PropertyValues): void {
    if (changedProperties.has('level')) {
      const clamped = Math.min(6, Math.max(2, this.level));
      if (this.level !== clamped) {
        this.level = clamped;
      }
    }
    if (changedProperties.has('level') || changedProperties.has('size')) {
      this.updateItems();
    }
    super.update(changedProperties);
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    if (window.__swc?.DEBUG && !this.hasAttribute('density')) {
      window.__swc.warn(
        this,
        `<${this.localName}> should have an explicit "density" attribute set. Defaulting to "regular", which corresponds to the 1st-gen default.`,
        'https://opensource.adobe.com/spectrum-web-components/components/accordion/',
        { type: 'api', level: 'low' }
      );
    }
  }

  protected override render(): TemplateResult {
    return html`
      <slot @slotchange=${this.updateItems}></slot>
    `;
  }
}
