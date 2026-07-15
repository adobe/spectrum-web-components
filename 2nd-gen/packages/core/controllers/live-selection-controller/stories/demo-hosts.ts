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

import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { LiveSelectionController, type LiveSelectionMode } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-live-selection-item': DemoLiveSelectionItem;
    'demo-live-selection-group': DemoLiveSelectionGroup;
  }
}

// ──────────────────────────────────────────
//     DEMO ITEM
// ──────────────────────────────────────────

/**
 * @internal
 *
 * A minimal expandable panel element used to demonstrate
 * {@link LiveSelectionController} in stories and tests. Items own their own
 * `open` state; the host group observes the dispatched toggle event.
 */
@customElement('demo-live-selection-item')
export class DemoLiveSelectionItem extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 14px;
      border: 1px solid var(--spectrum-gray-400, #bbb);
      border-radius: 4px;
      background: var(--spectrum-gray-50, #fff);
      cursor: pointer;
      font-size: 0.875rem;
      text-align: left;
    }
    button[aria-disabled='true'] {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .indicator {
      font-size: 0.75rem;
      color: var(--spectrum-gray-600, #666);
    }
    .panel {
      padding: 10px 14px;
      border: 1px solid var(--spectrum-gray-400, #bbb);
      border-top: none;
      border-radius: 0 0 4px 4px;
      background: var(--spectrum-gray-75, #f8f8f8);
      font-size: 0.875rem;
    }
  `;

  /** Whether the item panel is expanded. */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /** Label displayed in the toggle button. */
  @property({ type: String })
  public label = '';

  /** When true the item ignores user interaction. */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * @internal
   * Toggles `open`, dispatches a cancelable `demo-toggle` event, and reverts
   * if the event is canceled.
   */
  public toggle(): void {
    if (this.disabled) {
      return;
    }
    this.open = !this.open;
    const toggleEvent = new Event('demo-toggle', {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    if (!this.dispatchEvent(toggleEvent)) {
      this.open = !this.open;
    }
  }

  protected override render() {
    return html`
      <button
        @click=${this.toggle}
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <span>${this.label}</span>
        <span class="indicator">${this.open ? '▲' : '▼'}</span>
      </button>
      ${this.open
        ? html`
            <div class="panel" role="region"><slot></slot></div>
          `
        : ''}
    `;
  }
}

// ──────────────────────────────────────────
//     DEMO GROUP (CONTROLLER HOST)
// ──────────────────────────────────────────

/**
 * @internal
 *
 * Storybook-only container that hosts {@link LiveSelectionController}.
 * Accepts `demo-live-selection-item` children via its default slot and
 * enforces the selection constraint specified by `mode`.
 */
@customElement('demo-live-selection-group')
export class DemoLiveSelectionGroup extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-width: 22rem;
    }
  `;

  /**
   * Selection mode forwarded to the controller.
   * `'single'` (default) allows at most one open item;
   * `'multiple'` imposes no constraint.
   */
  @property({ type: String, reflect: true })
  public mode: LiveSelectionMode = 'single';

  private readonly selectionController = new LiveSelectionController(this, {
    getItems: () => this.items,
    readSelected: (item) => item.open,
    deselect: (item) => {
      item.open = false;
    },
    observeEvent: 'demo-toggle',
    mode: () => this.mode,
  });

  /** Returns slotted `demo-live-selection-item` elements. */
  public get items(): DemoLiveSelectionItem[] {
    const slot = this.renderRoot?.querySelector('slot');
    return (slot?.assignedElements({ flatten: true }) ?? []).filter(
      (el): el is DemoLiveSelectionItem => el instanceof DemoLiveSelectionItem
    );
  }

  /**
   * Enforces the current selection constraint over all slotted items.
   * Delegates directly to {@link LiveSelectionController.refresh}.
   */
  public refresh(): void {
    this.selectionController.refresh();
  }

  protected override render() {
    return html`
      <slot></slot>
    `;
  }
}
