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

import {
  CSSResultArray,
  html,
  PropertyValues,
  SizedMixin,
  SpectrumElement,
  TemplateResult,
} from '@spectrum-web-components/base';
import {
  property,
  queryAssignedNodes,
} from '@spectrum-web-components/base/src/decorators.js';
import { FocusGroupController } from '@spectrum-web-components/reactive-controllers/src/FocusGroup.js';

import styles from './accordion.css.js';
import { AccordionItem } from './AccordionItem.js';

const ACCORDION_MIGRATION_DOC_URL =
  'https://opensource.adobe.com/spectrum-web-components/components/accordion/';

/**
 * @element sp-accordion
 * @slot - The sp-accordion-item children to display.
 */
export class Accordion extends SizedMixin(SpectrumElement, {
  noDefaultSize: true,
}) {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /**
   * Allows multiple accordion items to be opened at the same time
   */
  @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
  public allowMultiple = false;

  /**
   * Sets the spacing between the content to borders of an accordion item
   */
  @property({ type: String, reflect: true })
  public density?: 'compact' | 'spacious';

  /**
   * The heading level (2-6) to use for all accordion item titles.
   * Defaults to 3.
   */
  @property({ type: Number, reflect: true })
  public level: number = 3;

  @queryAssignedNodes()
  private defaultNodes!: NodeListOf<AccordionItem>;

  private get items(): AccordionItem[] {
    return [...(this.defaultNodes || [])].filter(
      (node: HTMLElement) => typeof node.tagName !== 'undefined'
    ) as AccordionItem[];
  }

  focusGroupController = new FocusGroupController<AccordionItem>(this, {
    direction: 'vertical',
    elements: () => this.items,
    isFocusableElement: (el: AccordionItem) => !el.disabled,
  });

  /**
   * @deprecated `focus()` on `<sp-accordion>` is deprecated and will be removed
   * in Spectrum 2. Focus the header button inside `<sp-accordion-item>` instead.
   */
  public override focus(): void {
    if (window.__swc?.DEBUG) {
      window.__swc.warn(
        this,
        `<${this.localName}> focus() is deprecated and will be removed in Spectrum 2. Focus the header button inside <sp-accordion-item> instead.`,
        ACCORDION_MIGRATION_DOC_URL,
        { level: 'deprecation' }
      );
    }
    this.focusGroupController.focus();
  }

  private async onToggle(event: Event): Promise<void> {
    const target = event.target as AccordionItem;
    // Let the event pass through the DOM so that it can be
    // prevented from the outside if a user so desires.
    await 0;
    if (this.allowMultiple || event.defaultPrevented) {
      // No toggling when `allowMultiple` or the user prevents it.
      return;
    }
    const items = [...this.items] as AccordionItem[];
    /* c8 ignore next 3 */
    if (items && !items.length) {
      // no toggling when there aren't items.
      return;
    }
    items.forEach((item) => {
      if (item !== target) {
        // Close all the items that didn't dispatch the event.
        item.open = false;
      }
    });
  }

  private handleSlotchange(): void {
    this.focusGroupController.clearElementCache();
    this.items.forEach((item) => {
      if (window.__swc?.DEBUG && item.level !== this.level) {
        window.__swc.warn(
          item,
          `<${item.localName}> the "level" attribute is deprecated on accordion items and will be removed in Spectrum 2. Use "level" on <${this.localName}> instead.`,
          ACCORDION_MIGRATION_DOC_URL,
          { level: 'deprecation' }
        );
      }
      item.size = this.size;
      item.level = this.level;
    });
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    if (changed.has('size')) {
      this.items.forEach((item) => {
        item.size = this.size;
      });
    }
    if (changed.has('level')) {
      this.items.forEach((item) => {
        if (window.__swc?.DEBUG && item.level !== this.level) {
          window.__swc.warn(
            item,
            `<${item.localName}> the "level" attribute is deprecated on accordion items and will be removed in Spectrum 2. Use "level" on <${this.localName}> instead.`,
            ACCORDION_MIGRATION_DOC_URL,
            { level: 'deprecation' }
          );
        }
        item.level = this.level;
      });
    }
  }

  protected override render(): TemplateResult {
    return html`
      <slot
        @slotchange=${this.handleSlotchange}
        @sp-accordion-item-toggle=${this.onToggle}
      ></slot>
    `;
  }
}
