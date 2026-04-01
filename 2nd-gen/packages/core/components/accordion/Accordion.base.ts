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

import { html, PropertyValues, type TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';

import {
  type CompositeFocusNavigationConfig,
  CompositeFocusNavigationController,
} from '@spectrum-web-components/core/controllers/index.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';

import type { AccordionDensity } from './Accordion.types.js';
import { AccordionItemBase } from './AccordionItem.base.js';

/**
 * Accordion groups multiple {@link AccordionItemBase} regions. Keyboard navigation
 * between headers uses {@link CompositeFocusNavigationController} (native `focusgroup`
 * when supported, otherwise a linear vertical polyfill). Item hosts use
 * `delegatesFocus` so roving `tabIndex` stays on the host while focus is delegated to
 * the inner header button.
 *
 * @slot - Accordion item elements (e.g. `swc-accordion-item`).
 */
export abstract class AccordionBase extends SizedMixin(SpectrumElement, {
  noDefaultSize: true,
}) {
  @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
  public allowMultiple = false;

  @property({ type: String, reflect: true })
  public density?: AccordionDensity;

  @property({ type: Number, reflect: true })
  public level = 3;

  @query('slot')
  private defaultSlot!: HTMLSlotElement;

  protected focusNavigation = new CompositeFocusNavigationController(
    this,
    {
      kind: 'accordion-headers',
      direction: 'vertical',
      wrap: false,
      hostDelegatesFocus: true,
      elements: () => [],
      isItemFocusable: () => true,
    }
  );

  protected get accordionItems(): AccordionItemBase[] {
    if (!this.defaultSlot) {
      return [];
    }
    return this.defaultSlot
      .assignedElements({ flatten: true })
      .filter((el): el is AccordionItemBase => el instanceof AccordionItemBase);
  }

  private get navigationItemHosts(): HTMLElement[] {
    return this.accordionItems;
  }

  protected createFocusNavConfig(): CompositeFocusNavigationConfig {
    return {
      kind: 'accordion-headers',
      direction: 'vertical',
      wrap: false,
      hostDelegatesFocus: true,
      elements: () => this.navigationItemHosts,
      isItemFocusable: (el) =>
        el instanceof AccordionItemBase && !el.disabled,
    };
  }

  public override focus(options?: FocusOptions): void {
    const first = this.accordionItems.find((item) => !item.disabled);
    first?.focus(options);
  }

  protected onItemToggle(event: Event): void {
    const target = event.target;
    if (!(target instanceof AccordionItemBase)) {
      return;
    }
    if (this.allowMultiple || event.defaultPrevented) {
      return;
    }
    const items = this.accordionItems;
    if (!items.length) {
      return;
    }
    for (const item of items) {
      if (item !== target) {
        item.open = false;
      }
    }
  }

  protected onSlotChange(): void {
    this.focusNavigation.updateConfig(this.createFocusNavConfig());
    this.syncItemsFromParent();
  }

  private syncItemsFromParent(): void {
    for (const item of this.accordionItems) {
      item.size = this.size;
      item.level = this.level;
      item.density = this.density;
    }
  }

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    this.focusNavigation.updateConfig(this.createFocusNavConfig());
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('size') || changes.has('level') || changes.has('density')) {
      this.syncItemsFromParent();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <slot
        @slotchange=${this.onSlotChange}
        @swc-accordion-item-toggle=${this.onItemToggle}
      ></slot>
    `;
  }
}
