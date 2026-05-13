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
import { property, queryAssignedElements } from 'lit/decorators.js';

import { FocusgroupNavigationController } from '@spectrum-web-components/core/controllers/index.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { getActiveElement } from '@spectrum-web-components/core/utils/index.js';

import styles from './conversation-thread.css';

/**
 * Thread-level layout wrapper for conversational turns with vertical keyboard navigation.
 *
 * Slotted `<swc-conversation-turn>` children participate in a roving `tabindex` model:
 * one active turn is tabbable while the rest are programmatically focusable.
 * Use <kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd> to move, and <kbd>Home</kbd> / <kbd>End</kbd>
 * to jump to the first/last turn. When new turns are appended, the newest turn
 * becomes the active roving target so re-entering the thread returns to latest content.
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

  @queryAssignedElements({ flatten: true, selector: 'swc-conversation-turn' })
  private _assignedTurns!: HTMLElement[];

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

  /**
   * Focuses the current active turn.
   *
   * Before focusing, we refresh the slotted turn list and roving-tabindex state so
   * we never target a stale turn when messages were added/removed just before focus.
   */
  public override focus(options?: FocusOptions): void {
    this._syncRovingFocusTarget();
    const turns = this._getItemsFromSlot();
    const active = this.focusgroupNavigationController.getActiveItem();
    active?.focus(options);
    if (!active && turns.length) {
      turns[this._clampIndex(this.activeIndex, turns)]?.focus(options);
    }
  }

  /**
   * Sets the active roving turn to the last slotted turn.
   * This aligns focus re-entry with the latest message in the thread.
   */
  public setActiveIndexToLast(): void {
    const turns = this._getItemsFromSlot();
    if (!turns.length) {
      return;
    }
    this._setActiveTurn(turns[turns.length - 1]);
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('activeIndex')) {
      this._syncActiveItemFromProperty();
    }
  }

  private _getItemsFromSlot(): HTMLElement[] {
    return Array.from(this._assignedTurns ?? []);
  }

  private _clampIndex(index: number, turns: HTMLElement[]): number {
    if (!turns.length) {
      return 0;
    }

    return Math.min(Math.max(index, 0), turns.length - 1);
  }

  private _syncRovingFocusTarget(setLatestAsTabStop = false): void {
    this.focusgroupNavigationController.refresh();
    const turns = this._getItemsFromSlot();
    if (!turns.length) {
      if (this.activeIndex !== 0) {
        this.activeIndex = 0;
      }
      return;
    }

    if (setLatestAsTabStop) {
      this.focusgroupNavigationController.setActiveItem(
        turns[turns.length - 1]
      );
    }
    this._syncActiveIndex(this.focusgroupNavigationController.getActiveItem());
  }

  private _syncActiveItemFromProperty(): void {
    const turns = this._getItemsFromSlot();
    if (!turns.length) {
      return;
    }

    this._setActiveTurn(turns[this._clampIndex(this.activeIndex, turns)]);
  }

  private _handleSlotChange(): void {
    const hadRovingTarget = this._getItemsFromSlot().some((turn) =>
      turn.hasAttribute('tabindex')
    );
    this._syncRovingFocusTarget(hadRovingTarget && !this._hasFocusWithin());
  }

  private _handleFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget;
    if (next instanceof Node && this.contains(next)) {
      return;
    }

    this.setActiveIndexToLast();
  }

  private _hasFocusWithin(): boolean {
    const active = getActiveElement(
      this.getRootNode() as Document | ShadowRoot
    );

    return active instanceof Node && this.contains(active);
  }

  private _setActiveTurn(turn: HTMLElement | undefined): void {
    if (!turn) {
      return;
    }

    this.focusgroupNavigationController.setActiveItem(turn);
    this._syncActiveIndex(this.focusgroupNavigationController.getActiveItem());
  }

  private _syncActiveIndex(active: HTMLElement | null): void {
    if (!active) {
      if (this.activeIndex !== 0) {
        this.activeIndex = 0;
      }
      return;
    }

    const index = this._getItemsFromSlot().indexOf(active);
    if (index !== -1 && index !== this.activeIndex) {
      this.activeIndex = index;
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ConversationThread" @focusout=${this._handleFocusOut}>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
