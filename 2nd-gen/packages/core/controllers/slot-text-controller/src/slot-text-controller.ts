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

export interface SlotTextConfig {
  /**
   * The slot name to observe. Use `''` (empty string) for the default slot.
   *
   * @default '' (default slot)
   */
  slotName?: string;

  /**
   * CSS selectors for elements to exclude when checking for content.
   * Matched elements are ignored — only non-excluded elements and
   * non-empty text nodes count as "content."
   */
  excludeSelectors?: string[];
}

/**
 * A reactive controller that observes whether a slot contains meaningful
 * text or element content.
 *
 * Replaces the `ObserveSlotText` mixin with a composition-based approach.
 *
 * Monitors for `characterData` mutations (text changes) and re-evaluates
 * on slot change events. The host is requested to update whenever the
 * content state changes.
 *
 * @example
 * ```typescript
 * class MyButton extends SpectrumElement {
 *   private slotText = new SlotTextController(this);
 *
 *   get hasLabel(): boolean {
 *     return this.slotText.hasContent;
 *   }
 *
 *   override render() {
 *     return html`<slot @slotchange=${this.slotText.handleSlotChange}></slot>`;
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Named slot with exclusions
 * class MyComponent extends SpectrumElement {
 *   private slotText = new SlotTextController(this, {
 *     slotName: 'description',
 *     excludeSelectors: ['.visually-hidden'],
 *   });
 * }
 * ```
 */
export class SlotTextController implements ReactiveController {
  private host: ReactiveElement;
  private slotName: string;
  private excludeSelectors: string[];
  private observer: MutationObserver;
  private _hasContent = false;

  constructor(host: ReactiveElement, config: SlotTextConfig = {}) {
    this.host = host;
    this.slotName = config.slotName ?? '';
    this.excludeSelectors = config.excludeSelectors ?? [];
    this.host.addController(this);

    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') {
          this.checkContent();
          return;
        }
      }
    });
  }

  /**
   * Whether the observed slot has meaningful content (text nodes or
   * non-excluded elements).
   */
  get hasContent(): boolean {
    return this._hasContent;
  }

  /**
   * Bind this to the slot's `@slotchange` event in the template.
   *
   * @example
   * ```html
   * <slot @slotchange=${this.slotText.handleSlotChange}></slot>
   * ```
   */
  handleSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this.evaluateNodes(nodes);
  };

  private evaluateNodes(nodes: Iterable<Node>): void {
    const hasContent = [...nodes].some((node) => {
      const el = node as HTMLElement;
      if (el.tagName) {
        return !this.excludeSelectors.some((sel) => el.matches(sel));
      }
      // A bare text node can never carry a `slot` attribute, so it is only
      // ever assigned to the default slot. When observing a named slot it must
      // not count as content.
      if (this.slotName) {
        return false;
      }
      return node.textContent ? node.textContent.trim().length > 0 : false;
    });

    if (hasContent !== this._hasContent) {
      this._hasContent = hasContent;
      this.host.requestUpdate();
    }
  }

  /**
   * Checks initial content from light DOM children before the first render,
   * before slots are assigned.
   *
   * This runs from `hostConnected`, which Lit invokes during the host's
   * `connectedCallback` — before the first `update()`. It sets `_hasContent`
   * directly and intentionally does not call `requestUpdate()`: the first
   * render has not happened yet, so it will read the correct value when it
   * runs. This differs from the `ObserveSlotText` mixin, where `slotHasContent`
   * was a reactive `@property` assigned in `update()`. After the first render,
   * `handleSlotChange` (bound via `@slotchange`) and the `characterData`
   * observer take over and do call `requestUpdate()` on change. The
   * controller stories cover initial content being reflected on first paint.
   */
  private checkInitialContent(): void {
    const { childNodes } = this.host;
    const relevant = [...childNodes].filter((node) => {
      const el = node as HTMLElement;
      if (el.tagName) {
        const excluded = this.excludeSelectors.some((sel) => el.matches(sel));
        if (excluded) {
          return false;
        }
        // Match slot assignment: named slot checks slot attribute,
        // default slot checks for no slot attribute
        return this.slotName
          ? el.getAttribute('slot') === this.slotName
          : !el.hasAttribute('slot');
      }
      // A bare text node has no `slot` attribute, so it is only assigned to
      // the default slot; it never counts as content for a named slot.
      if (this.slotName) {
        return false;
      }
      return node.textContent ? node.textContent.trim().length > 0 : false;
    });
    this._hasContent = relevant.length > 0;
  }

  private checkContent(): void {
    // Re-query assigned nodes from the slot element in the shadow root
    const slot = this.host.shadowRoot?.querySelector(
      this.slotName ? `slot[name="${this.slotName}"]` : 'slot:not([name])'
    ) as HTMLSlotElement | null;
    if (slot) {
      const nodes = slot.assignedNodes({ flatten: true });
      this.evaluateNodes(nodes);
    }
  }

  hostConnected(): void {
    this.observer.observe(this.host, {
      characterData: true,
      subtree: true,
    });
    this.checkInitialContent();
  }

  hostDisconnected(): void {
    this.observer.disconnect();
  }
}
