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

import type { ReactiveController, ReactiveElement } from 'lit';

/**
 * A reactive controller that observes whether a slot contains meaningful text
 * content.
 *
 * Uses a `MutationObserver` on `characterData` and `subtree` to detect
 * in-place text edits, and exposes a `handleSlotChange` callback to bind
 * to the slot's `@slotchange` event so the controller is notified when
 * assigned nodes change.
 *
 * @example
 * ```typescript
 * class MyButton extends SpectrumElement {
 *     private slotText = new SlotTextController(this);
 *
 *     protected get hasLabel(): boolean {
 *         return this.slotText.hasContent;
 *     }
 *
 *     protected override render(): TemplateResult {
 *         return html`<slot @slotchange=${this.slotText.handleSlotChange}></slot>`;
 *     }
 * }
 *
 * // Named slot with exclusions
 * class MyComponent extends SpectrumElement {
 *     private slotText = new SlotTextController(this, {
 *         slot: 'label',
 *         excludedSelectors: ['sp-tooltip'],
 *     });
 *
 *     protected override render(): TemplateResult {
 *         return html`<slot name="label" @slotchange=${this.slotText.handleSlotChange}></slot>`;
 *     }
 * }
 * ```
 */
export class SlotTextController implements ReactiveController {
  private host: ReactiveElement;
  private slotName: string;
  private excludedSelectors: string[];
  private observer = new MutationObserver((mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        this.checkChildNodes();
        return;
      }
    }
  });

  /**
   * Whether the observed slot currently contains meaningful text content
   * (non-whitespace, excluding filtered elements).
   */
  hasContent = false;

  constructor(
    host: ReactiveElement,
    {
      slot = '',
      excludedSelectors = [] as string[],
    }: {
      slot?: string;
      excludedSelectors?: string[];
    } = {}
  ) {
    this.host = host;
    this.slotName = slot;
    this.excludedSelectors = excludedSelectors;
    this.host.addController(this);
  }

  public hostConnected(): void {
    this.observer.observe(this.host, {
      characterData: true,
      subtree: true,
    });
    // Before the first render, check child nodes directly since slots
    // have not been assigned yet.
    this.checkChildNodes();
  }

  public hostDisconnected(): void {
    this.observer.disconnect();
  }

  /**
   * Bind this to the slot's `@slotchange` event to re-evaluate content
   * when assigned nodes change.
   *
   * @example
   * ```html
   * <slot @slotchange=${this.slotText.handleSlotChange}></slot>
   * ```
   */
  public handleSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    this.evaluateAssignedNodes(slot);
  };

  /**
   * Pre-render check that inspects raw child nodes before slot assignment
   * has occurred. Used on first connect to set initial `hasContent` state.
   */
  private checkChildNodes(): void {
    const { childNodes } = this.host;
    const hasText = [...childNodes].some((currentNode) => {
      const node = currentNode as HTMLElement;
      if (node.tagName) {
        if (this.excludedSelectors.some((s) => node.matches(s))) {
          return false;
        }
        return this.slotName
          ? node.getAttribute('slot') === this.slotName
          : !node.hasAttribute('slot');
      }
      return node.textContent ? !!node.textContent.trim() : false;
    });
    if (hasText !== this.hasContent) {
      this.hasContent = hasText;
      this.host.requestUpdate();
    }
  }

  /**
   * Evaluates the assigned nodes of a slot to determine whether meaningful
   * text content is present.
   */
  private evaluateAssignedNodes(slot: HTMLSlotElement): void {
    const nodes = slot.assignedNodes({ flatten: true });
    const hasText = [...nodes].some((currentNode) => {
      const node = currentNode as HTMLElement;
      if (node.tagName) {
        return !this.excludedSelectors.some((s) => node.matches(s));
      }
      return node.textContent ? !!node.textContent.trim() : false;
    });
    if (hasText !== this.hasContent) {
      this.hasContent = hasText;
      this.host.requestUpdate();
    }
  }
}
