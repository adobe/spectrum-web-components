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

import { FocusgroupNavigationController } from '@spectrum-web-components/core/controllers/index.js';
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
  private focusgroupNavigationController = new FocusgroupNavigationController(
    this,
    {
      direction: 'vertical',
      getItems: () => this._getItemsFromSlot(),
      onActiveItemChange: (active) => this._syncActiveIndex(active),
    }
  );

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override focus(options?: FocusOptions): void {
    this._syncFocusableItems();
    const active =
      this.focusgroupNavigationController.getActiveItem() ??
      this._items[this._clampIndex(this.activeIndex)];
    active?.focus(options);
  }

  protected override firstUpdated(): void {
    this._syncFocusableItems();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('activeIndex')) {
      this._syncActiveItemFromProperty();
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

  private _clampIndex(index: number): number {
    if (!this._items.length) {
      return 0;
    }

    return Math.min(Math.max(index, 0), this._items.length - 1);
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

    this.focusgroupNavigationController.refresh();
    this._syncActiveIndex(this.focusgroupNavigationController.getActiveItem());
  }

  private _syncActiveItemFromProperty(): void {
    if (!this._items.length) {
      return;
    }

    const nextIndex = this._clampIndex(this.activeIndex);
    const nextActive = this._items[nextIndex];
    if (!nextActive) {
      return;
    }
    this.focusgroupNavigationController.setActiveItem(nextActive);
    this._syncActiveIndex(this.focusgroupNavigationController.getActiveItem());
  }

  private _handleSlotChange(): void {
    this._syncFocusableItems();
  }

  private _syncActiveIndex(active: HTMLElement | null): void {
    if (!active) {
      if (this.activeIndex !== 0) {
        this.activeIndex = 0;
      }
      return;
    }

    const index = this._items.indexOf(active);
    if (index !== -1 && index !== this.activeIndex) {
      this.activeIndex = index;
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ConversationThread">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
