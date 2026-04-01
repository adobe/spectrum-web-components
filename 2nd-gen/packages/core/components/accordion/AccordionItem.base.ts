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

import { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';

import type { AccordionDensity } from './Accordion.types.js';

/**
 * Single collapsible region in an accordion. The header `#header` button is the
 * roving-tabindex target managed by the parent {@link AccordionBase}.
 *
 * @slot - Panel content shown when {@link AccordionItemBase.open} is true.
 *
 * @fires swc-accordion-item-toggle - Cancelable; parent may prevent default to block toggle.
 */
export abstract class AccordionItemBase extends SizedMixin(SpectrumElement, {
  noDefaultSize: true,
}) {
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true })
  public open = false;

  @property({ type: String, reflect: true })
  public label = '';

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Heading level for the header wrapper (2–6). Set by the parent accordion.
   */
  @property({ type: Number, reflect: true })
  public level = 3;

  /**
   * Density inherited from parent accordion for spacing tokens.
   */
  @property({ type: String, reflect: true })
  public density?: AccordionDensity;

  /**
   * Header button used for focus and keyboard navigation. Exposed for
   * {@link AccordionBase}’s {@link CompositeFocusNavigationController}.
   */
  getNavButton(): HTMLButtonElement | null {
    return this.shadowRoot?.querySelector<HTMLButtonElement>('#header') ?? null;
  }

  protected toggle(): void {
    if (this.disabled) {
      return;
    }
    this.open = !this.open;
    const applyDefault = this.dispatchEvent(
      new CustomEvent('swc-accordion-item-toggle', {
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
    if (!applyDefault) {
      this.open = !this.open;
    }
  }

  protected onHeaderClick(): void {
    this.toggle();
  }

  protected getHeadingLevel(): number {
    const level = this.level ?? 3;
    return Math.max(2, Math.min(6, level));
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }
}
