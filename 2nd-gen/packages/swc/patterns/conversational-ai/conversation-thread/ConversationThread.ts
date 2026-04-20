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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import styles from './conversation-thread.css';

/**
 * Thread-level layout wrapper for conversational turns with vertical keyboard navigation.
 *
 * Slotted `<swc-conversation-turn>` children participate in a roving `tabindex` model:
 * one active turn is tabbable while the rest are programmatically focusable.
 * Use <kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd> to move, and <kbd>Home</kbd> / <kbd>End</kbd>
 * to jump to the first/last turn.
 *
 * @element swc-conversation-thread
 * @slot - Conversation turns, typically `<swc-conversation-turn>` elements.
 */
export class ConversationThread extends SpectrumElement {
  /**
   * Active turn index used by roving focus.
   */
  @property({ type: Number, attribute: 'active-index' })
  public activeIndex = 0;

  private _items: HTMLElement[] = [];

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('focusin', this._handleFocusIn);
  }

  public override disconnectedCallback(): void {
    this.removeEventListener('keydown', this._handleKeydown);
    this.removeEventListener('focusin', this._handleFocusIn);
    this._resetManagedTabIndex();
    super.disconnectedCallback();
  }

  public override focus(options?: FocusOptions): void {
    this._syncFocusableItems();
    this._focusItem(this.activeIndex, options);
  }

  protected override firstUpdated(): void {
    this._syncFocusableItems();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('activeIndex')) {
      this._applyRovingTabIndex(this._clampIndex(this.activeIndex));
    }
  }

  private _getItemsFromSlot(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot');
    const assigned = slot?.assignedElements({ flatten: true }) ?? [];

    return assigned.filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        element.tagName.toLowerCase() === 'swc-conversation-turn'
    );
  }

  private _resetManagedTabIndex(): void {
    for (const item of this._items) {
      item.removeAttribute('tabindex');
    }
  }

  private _clampIndex(index: number): number {
    if (!this._items.length) {
      return 0;
    }

    return Math.min(Math.max(index, 0), this._items.length - 1);
  }

  private _applyRovingTabIndex(index: number): void {
    this._items.forEach((item, itemIndex) => {
      item.tabIndex = itemIndex === index ? 0 : -1;
    });
  }

  private _syncFocusableItems(): void {
    const nextItems = this._getItemsFromSlot();

    for (const previousItem of this._items) {
      if (!nextItems.includes(previousItem)) {
        previousItem.removeAttribute('tabindex');
      }
    }

    this._items = nextItems;
    if (!this._items.length) {
      return;
    }

    const clampedIndex = this._clampIndex(this.activeIndex);
    if (clampedIndex !== this.activeIndex) {
      this.activeIndex = clampedIndex;
    }
    this._applyRovingTabIndex(clampedIndex);
  }

  private _focusItem(index: number, options?: FocusOptions): void {
    if (!this._items.length) {
      return;
    }

    const nextIndex = this._clampIndex(index);
    this.activeIndex = nextIndex;
    this._applyRovingTabIndex(nextIndex);
    this._items[nextIndex]?.focus(options);
  }

  private _getCurrentItemIndex(eventTarget: EventTarget | null): number {
    if (!this._items.length) {
      return -1;
    }

    const targetNode = eventTarget instanceof Node ? eventTarget : null;
    if (targetNode) {
      const targetIndex = this._items.findIndex(
        (item) => item === targetNode || item.contains(targetNode)
      );
      if (targetIndex !== -1) {
        return targetIndex;
      }
    }

    const activeElement = this.ownerDocument.activeElement;
    return this._items.findIndex((item) => item === activeElement);
  }

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (
      event.key !== 'ArrowDown' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'Home' &&
      event.key !== 'End'
    ) {
      return;
    }

    this._syncFocusableItems();
    if (!this._items.length) {
      return;
    }

    const indexedTarget = this._getCurrentItemIndex(event.target);
    const currentIndex =
      indexedTarget === -1 ? this._clampIndex(this.activeIndex) : indexedTarget;

    let nextIndex = currentIndex;
    if (event.key === 'ArrowDown') {
      nextIndex = Math.min(currentIndex + 1, this._items.length - 1);
    } else if (event.key === 'ArrowUp') {
      nextIndex = Math.max(currentIndex - 1, 0);
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = this._items.length - 1;
    }

    if (nextIndex === currentIndex) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this._focusItem(nextIndex);
  };

  private _handleSlotChange(): void {
    this._syncFocusableItems();
  }

  private _handleFocusIn = (event: FocusEvent): void => {
    this._syncFocusableItems();
    if (!this._items.length) {
      return;
    }

    const focusedIndex = this._getCurrentItemIndex(event.target);
    if (focusedIndex === -1) {
      return;
    }

    if (focusedIndex !== this.activeIndex) {
      this.activeIndex = focusedIndex;
    }
    this._applyRovingTabIndex(focusedIndex);
  };

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ConversationThread">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
