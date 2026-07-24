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
import { queryAssignedElements } from 'lit/decorators.js';

import { FocusgroupNavigationController } from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { getActiveElement } from '@adobe/spectrum-wc-core/utils/index.js';

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
  @queryAssignedElements({ flatten: true, selector: 'swc-conversation-turn' })
  private _assignedTurns!: HTMLElement[];

  private focusgroupNavigationController = new FocusgroupNavigationController(
    this,
    {
      direction: 'vertical',
      getItems: () => this._getItemsFromSlot(),
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
    const active = this.focusgroupNavigationController.getActiveItem();
    active?.focus(options);
  }

  /**
   * Sets the active roving turn to the last slotted turn.
   * This aligns focus re-entry with the latest message in the thread.
   */
  private _setActiveToLast(): void {
    const turns = this._getItemsFromSlot();
    if (!turns.length) {
      return;
    }
    this.focusgroupNavigationController.setActiveItem(turns[turns.length - 1]);
  }

  private _getItemsFromSlot(): HTMLElement[] {
    return Array.from(this._assignedTurns ?? []);
  }

  private _syncRovingFocusTarget(setLatestAsTabStop = false): void {
    this.focusgroupNavigationController.refresh();
    const turns = this._getItemsFromSlot();
    if (!turns.length) {
      return;
    }

    if (setLatestAsTabStop) {
      this.focusgroupNavigationController.setActiveItem(
        turns[turns.length - 1]
      );
    }
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

    this._setActiveToLast();
  }

  private _hasFocusWithin(): boolean {
    const active = getActiveElement(
      this.getRootNode() as Document | ShadowRoot
    );

    return active instanceof Node && this.contains(active);
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ConversationThread" @focusout=${this._handleFocusOut}>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
