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

import { CSSResultArray, html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  AccordionItemBase,
  SWC_ACCORDION_ITEM_TOGGLE_EVENT,
} from '@spectrum-web-components/core/components/accordion';

import '../icon/swc-icon.js';

import { Chevron75Icon } from '../icon/elements/Chevron75Icon.js';
import { Chevron100Icon } from '../icon/elements/Chevron100Icon.js';
import { Chevron200Icon } from '../icon/elements/Chevron200Icon.js';
import { Chevron300Icon } from '../icon/elements/Chevron300Icon.js';

import styles from './accordion.css';

/**
 * An accordion item component that wraps a single expandable content section.
 *
 * @element swc-accordion-item
 * @since 2.0.0
 *
 * @example
 * <swc-accordion-item>
 *   <span slot="label">Section heading</span>
 *   Panel content goes here.
 * </swc-accordion-item>
 */
export class AccordionItem extends AccordionItemBase {
  // ──────────────────────────────
  //     STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  // ──────────────────────────────
  //     DELEGATION
  // ──────────────────────────────

  public override focus(options?: FocusOptions): void {
    this.shadowRoot?.getElementById('header')?.focus(options);
  }

  public override click(): void {
    this.shadowRoot?.getElementById('header')?.click();
  }

  // ──────────────────────────────
  //     TOGGLE BEHAVIOR
  // ──────────────────────────────

  protected override toggle(): void {
    if (this.disabled || this.parentDisabled) {
      return;
    }
    this.open = !this.open;
    const event = new Event(SWC_ACCORDION_ITEM_TOGGLE_EVENT, {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    if (!this.dispatchEvent(event)) {
      this.open = !this.open;
    }
  }

  // ──────────────────────────────
  //     RENDERING
  // ──────────────────────────────

  private chevronForSize(): TemplateResult {
    switch (this.size) {
      case 's':
        return Chevron75Icon();
      case 'l':
        return Chevron200Icon();
      case 'xl':
        return Chevron300Icon();
      case 'm':
      default:
        return Chevron100Icon();
    }
  }

  private handleActionsSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    const container = slot.parentElement as HTMLElement | null;
    if (container) {
      container.hidden = slot.assignedNodes({ flatten: true }).length === 0;
    }
  }

  private handleActionsContainerInteraction(event: Event): void {
    event.stopPropagation();
  }

  private renderHeadingWrapper(content: TemplateResult): TemplateResult {
    switch (this.heading) {
      case 2:
        return html`
          <h2>${content}</h2>
        `;
      case 4:
        return html`
          <h4>${content}</h4>
        `;
      case 5:
        return html`
          <h5>${content}</h5>
        `;
      case 6:
        return html`
          <h6>${content}</h6>
        `;
      default:
        return html`
          <h3>${content}</h3>
        `;
    }
  }

  protected override render(): TemplateResult {
    const button = html`
      <button
        id="header"
        type="button"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls="content"
        aria-disabled=${ifDefined(
          this.disabled || this.parentDisabled ? 'true' : undefined
        )}
        @click=${this.toggle}
      >
        <swc-icon class="spectrum-Accordion-itemIndicator" aria-hidden="true">
          ${this.chevronForSize()}
        </swc-icon>
        <span class="spectrum-Accordion-itemTitle">
          <slot name="label"></slot>
        </span>
      </button>
    `;
    return html`
      ${this.renderHeadingWrapper(button)}
      <div
        class="spectrum-Accordion-itemDirectActions"
        hidden
        @click=${this.handleActionsContainerInteraction}
        @keydown=${this.handleActionsContainerInteraction}
      >
        <slot name="actions" @slotchange=${this.handleActionsSlotChange}></slot>
      </div>
      <div
        id="content"
        class="spectrum-Accordion-itemContent"
        role="region"
        aria-labelledby="header"
        .inert=${this.disabled || this.parentDisabled}
      >
        <slot></slot>
      </div>
    `;
  }
}
