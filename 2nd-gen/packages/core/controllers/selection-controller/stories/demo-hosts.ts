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

import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { FocusgroupNavigationController } from '../../focusgroup-navigation-controller/index.js';
import {
  SelectionController,
  type SelectionControllerChangeDetail,
  type SelectionMode,
} from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-selection-star-single': DemoSelectionStarSingle;
    'demo-selection-star-toggle': DemoSelectionStarToggle;
    'demo-selection-accordion': DemoSelectionAccordion;
    'demo-selection-listbox': DemoSelectionListbox;
    'demo-selection-tabs': DemoSelectionTabs;
  }
}

// ─────────────────────────────────────────────
//   Shared star-rating chrome
// ─────────────────────────────────────────────

const starRatingStyles = css`
  :host {
    display: block;
  }
  [role='radiogroup'] {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 22rem;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid var(--spectrum-gray-300, #d3d3d3);
    font:
      0.95rem system-ui,
      sans-serif;
  }
  #rating-label {
    font-weight: 600;
  }
  .hint {
    margin: 0;
    font-size: 0.85rem;
    color: var(--spectrum-gray-700, #464646);
  }
  .stars {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .stars button {
    display: inline-grid;
    place-items: center;
    box-sizing: border-box;
    inline-size: 2.75rem;
    block-size: 2.75rem;
    padding: 0.35rem;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--spectrum-gray-500, #8f8f8f);
    cursor: pointer;
  }
  .stars button:hover {
    color: var(--spectrum-gray-800, #2c2c2c);
    background: var(--spectrum-gray-100, #f1f1f1);
  }
  .stars button:focus-visible {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: 2px;
  }
  .stars button[aria-checked='true'] {
    color: var(--spectrum-orange-900, #b14c00);
    background: var(--spectrum-orange-300, #ffb02e);
  }
  .stars button[aria-checked='true']:hover {
    color: var(--spectrum-orange-900, #8a3b00);
    background: var(--spectrum-orange-400, #ffa037);
  }
  .stars button svg {
    inline-size: 1.85rem;
    block-size: 1.85rem;
    flex-shrink: 0;
  }
  .action-btn {
    align-self: flex-start;
    font: inherit;
    font-size: 0.85rem;
    padding: 0.3rem 0.75rem;
    border: 1px solid var(--spectrum-gray-400, #b9b9b9);
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }
  .action-btn:hover {
    background: var(--spectrum-gray-100, #f1f1f1);
  }
  .action-btn:focus-visible {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: 2px;
  }
`;

const starSvg = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
`;

// ─────────────────────────────────────────────
//   Star rating — single mode (no toggle)
// ─────────────────────────────────────────────

/**
 * Five-star rating using **`mode: 'single'`**. Clicking the active star has no effect; a new
 * star replaces the current selection.
 *
 * @internal
 */
@customElement('demo-selection-star-single')
export class DemoSelectionStarSingle extends LitElement {
  static override styles = starRatingStyles;

  private readonly stars = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: true,
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-star-single]'
        )
      ),
  });

  private readonly selection = new SelectionController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-star-single]'
        )
      ),
    selectItem: (star) => star.setAttribute('aria-checked', 'true'),
    deselectItem: (star) => star.setAttribute('aria-checked', 'false'),
    mode: 'single',
    defaultToFirstSelectable: false,
    keydownActivation: true,
  });

  protected override firstUpdated(): void {
    this.stars.refresh();
    this.selection.refresh();
  }

  /**
   * Clears the selection despite `mode: 'single'` — normally rejected
   * interactively, but a consumer resyncing from an external property that
   * explicitly represents "nothing selected" (like `<swc-tabs selected="">`)
   * can still clear it with `{ silent: true }`.
   *
   * @internal
   */
  public clearSelectionSilently(): void {
    this.selection.setSelectedItem(null, { silent: true });
  }

  protected override render(): TemplateResult {
    return html`
      <div role="radiogroup" aria-labelledby="single-label">
        <div id="single-label">Rating (single — no deselect)</div>
        <p class="hint">
          Click a star to select it. Clicking the active star again has no
          effect because
          <code>mode</code>
          is
          <code>'single'</code>
          .
        </p>
        <div class="stars">
          ${[1, 2, 3, 4, 5].map((value) => {
            const label = value === 1 ? `${value} star` : `${value} stars`;
            return html`
              <button
                type="button"
                data-star-single
                role="radio"
                aria-checked="false"
                aria-label=${label}
              >
                ${starSvg}
              </button>
            `;
          })}
        </div>
        <button
          type="button"
          class="action-btn"
          @click=${this.clearSelectionSilently}
        >
          Clear (silent)
        </button>
      </div>
    `;
  }
}

// ─────────────────────────────────────────────
//   Star rating — single-toggle mode
// ─────────────────────────────────────────────

/**
 * Five-star rating using **`mode: 'single-toggle'`**. Clicking the active star deselects it
 * (clears the rating). Clicking a different star replaces the selection.
 *
 * @internal
 */
@customElement('demo-selection-star-toggle')
export class DemoSelectionStarToggle extends LitElement {
  static override styles = starRatingStyles;

  private readonly stars = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: true,
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-star-toggle]'
        )
      ),
  });

  private readonly selection = new SelectionController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-star-toggle]'
        )
      ),
    selectItem: (star) => star.setAttribute('aria-checked', 'true'),
    deselectItem: (star) => star.setAttribute('aria-checked', 'false'),
    mode: 'single-toggle',
    keydownActivation: true,
  });

  protected override firstUpdated(): void {
    this.stars.refresh();
    this.selection.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <div role="radiogroup" aria-labelledby="toggle-label">
        <div id="toggle-label">Rating (single-toggle — can deselect)</div>
        <p class="hint">
          Click the active star to clear the rating.
          <code>mode</code>
          is
          <code>'single-toggle'</code>
          .
        </p>
        <div class="stars">
          ${[1, 2, 3, 4, 5].map((value) => {
            const label = value === 1 ? `${value} star` : `${value} stars`;
            return html`
              <button
                type="button"
                data-star-toggle
                role="radio"
                aria-checked="false"
                aria-label=${label}
              >
                ${starSvg}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
}

// ─────────────────────────────────────────────
//   Accordion with runtime mode switcher
// ─────────────────────────────────────────────

const accordionStyles = css`
  :host {
    display: block;
    font:
      0.95rem system-ui,
      sans-serif;
  }
  .controls {
    display: flex;
    gap: 0.5rem;
    margin-block-end: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }
  .controls span {
    font-size: 0.85rem;
    color: var(--spectrum-gray-700, #464646);
  }
  .mode-btn {
    font: inherit;
    font-size: 0.85rem;
    padding: 0.3rem 0.75rem;
    border: 1px solid var(--spectrum-gray-400, #b9b9b9);
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
    transition: background 0.12s;
  }
  .mode-btn:hover {
    background: var(--spectrum-gray-100, #f1f1f1);
  }
  .mode-btn[aria-pressed='true'] {
    background: var(--spectrum-blue-800, #0265dc);
    border-color: var(--spectrum-blue-800, #0265dc);
    color: white;
  }
  .mode-btn:focus-visible {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: 2px;
  }
  .accordion {
    max-width: 28rem;
    border: 1px solid var(--spectrum-gray-300, #cbcbcb);
    border-radius: 6px;
    overflow: clip;
  }
  article {
    border-block-end: 1px solid var(--spectrum-gray-200, #e6e6e6);
  }
  article:last-of-type {
    border-block-end: none;
  }
  button.trigger {
    display: flex;
    width: 100%;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    font: inherit;
    padding: 0.75rem 1rem;
    border: none;
    background: white;
    cursor: pointer;
    text-align: start;
  }
  button.trigger:focus-visible {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: -2px;
  }
  button.trigger span.chevron::before {
    content: '';
    inline-size: 0.65rem;
    block-size: 0.65rem;
    border-inline-end: 2px solid currentColor;
    border-block-end: 2px solid currentColor;
    display: inline-block;
    rotate: -45deg;
    translate: 0 0.1rem;
  }
  button[aria-expanded='true'] span.chevron::before {
    rotate: 135deg;
    translate: 0 -0.1rem;
  }
  .region {
    padding: 0.75rem 1rem 1rem;
    background: var(--spectrum-gray-75, #fafafa);
    border-block-start: 1px solid var(--spectrum-gray-200, #e6e6e6);
  }
  .region[hidden] {
    display: none;
  }
  .accordion-heading {
    margin: 0;
    font: inherit;
    font-weight: 600;
  }
`;

const ACCORDION_ITEMS = [
  {
    key: 'general',
    heading: 'General',
    copy: 'In single mode, one panel stays open and cannot be closed by clicking its own header. Switch to single-toggle to allow closing the open panel, or multiple to open several at once.',
  },
  {
    key: 'appearance',
    heading: 'Appearance',
    copy: 'In single-toggle mode, clicking the open header closes its panel. Clicking a different header closes the current panel and opens the new one.',
  },
  {
    key: 'content',
    heading: 'Content',
    copy: 'In multiple mode, each header toggles its own panel independently. Several panels can be open simultaneously.',
  },
  {
    key: 'support',
    heading: 'Support',
    copy: 'Use setOptions({ mode }) to switch modes at runtime — no need to reconstruct the controller. The selection is normalized automatically when switching from multiple to a single-item mode.',
  },
] as const;

type AccordionKey = (typeof ACCORDION_ITEMS)[number]['key'];

/**
 * Accordion that can switch between **`single`**, **`single-toggle`**, and **`multiple`** modes
 * at runtime using **`setOptions`**. The mode-selector buttons call
 * **`this.accordionSelection.setOptions({ mode })`** directly.
 *
 * @internal
 */
@customElement('demo-selection-accordion')
export class DemoSelectionAccordion extends LitElement {
  static override styles = accordionStyles;

  @state() private mode: SelectionMode = 'single';

  private readonly accordionSelection = new SelectionController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-accordion]')
      ),
    selectItem: (header) => {
      header.setAttribute('aria-expanded', 'true');
      this.togglePanel(header.dataset.accordion as AccordionKey, true);
    },
    deselectItem: (header) => {
      header.setAttribute('aria-expanded', 'false');
      this.togglePanel(header.dataset.accordion as AccordionKey, false);
    },
    mode: 'single',
  });

  private togglePanel(key: AccordionKey, open: boolean): void {
    const panel = this.renderRoot.querySelector<HTMLElement>(
      `[data-panel="${key}"]`
    );
    if (panel) {
      panel.hidden = !open;
    }
  }

  protected override updated(): void {
    for (const { key } of ACCORDION_ITEMS) {
      const btn = this.renderRoot.querySelector<HTMLButtonElement>(
        `[data-accordion="${key}"]`
      );
      if (!btn) {
        continue;
      }
      const isOpen = this.accordionSelection.isSelected(btn);
      btn.setAttribute('aria-expanded', String(isOpen));
      this.togglePanel(key as AccordionKey, isOpen);
    }
  }

  private setMode(newMode: SelectionMode): void {
    this.mode = newMode;
    this.accordionSelection.setOptions({ mode: newMode });
  }

  protected override render(): TemplateResult {
    const modes: SelectionMode[] = ['single', 'single-toggle', 'multiple'];
    return html`
      <div class="controls" role="group" aria-label="Selection mode">
        <span>Mode:</span>
        ${modes.map(
          (m) => html`
            <button
              class="mode-btn"
              type="button"
              aria-pressed=${String(this.mode === m) as 'true' | 'false'}
              @click=${() => this.setMode(m)}
            >
              ${m}
            </button>
          `
        )}
      </div>
      <div class="accordion">
        ${ACCORDION_ITEMS.map(
          ({ key, heading, copy }) => html`
            <article>
              <h3 class="accordion-heading">
                <button
                  type="button"
                  class="trigger"
                  data-accordion=${key}
                  aria-expanded="false"
                  aria-controls="accordion-panel-${key}"
                  id="accordion-heading-${key}"
                >
                  <span>${heading}</span>
                  <span class="chevron" aria-hidden="true"></span>
                </button>
              </h3>
              <div
                class="region"
                id="accordion-panel-${key}"
                role="region"
                aria-labelledby="accordion-heading-${key}"
                data-panel=${key}
                hidden
              >
                ${copy}
              </div>
            </article>
          `
        )}
      </div>
    `;
  }
}

// ─────────────────────────────────────────────
//   Listbox — multiple mode
// ─────────────────────────────────────────────

const listboxStyles = css`
  :host {
    display: block;
    font:
      0.95rem system-ui,
      sans-serif;
  }
  .wrapper {
    max-width: 22rem;
  }
  .listbox-label {
    font-weight: 600;
    margin-block-end: 0.5rem;
    id: listbox-label;
  }
  [role='listbox'] {
    border: 1px solid var(--spectrum-gray-300, #d3d3d3);
    border-radius: 6px;
    padding: 0.25rem;
    background: var(--spectrum-gray-50, #fff);
    min-block-size: 8rem;
  }
  [role='option'] {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.65rem;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
  }
  [role='option']:focus {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: -2px;
  }
  [role='option']:hover {
    background: var(--spectrum-gray-100, #f1f1f1);
  }
  [role='option'][aria-selected='true'] {
    background: var(--spectrum-blue-100, #e0f0ff);
    color: var(--spectrum-blue-900, #014380);
    font-weight: 600;
  }
  .checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 1.1rem;
    block-size: 1.1rem;
    border: 2px solid currentColor;
    border-radius: 3px;
    flex-shrink: 0;
    background: transparent;
  }
  [aria-selected='true'] .checkbox {
    background: var(--spectrum-blue-800, #0265dc);
    border-color: var(--spectrum-blue-800, #0265dc);
    color: white;
  }
  .checkbox svg {
    inline-size: 0.75rem;
    block-size: 0.75rem;
    visibility: hidden;
  }
  [aria-selected='true'] .checkbox svg {
    visibility: visible;
  }
  .actions {
    display: flex;
    gap: 0.5rem;
    margin-block-start: 0.5rem;
  }
  .action-btn {
    font: inherit;
    font-size: 0.85rem;
    padding: 0.3rem 0.75rem;
    border: 1px solid var(--spectrum-gray-400, #b9b9b9);
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }
  .action-btn:hover {
    background: var(--spectrum-gray-100, #f1f1f1);
  }
  .action-btn:focus-visible {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: 2px;
  }
  .count {
    margin-block-start: 0.5rem;
    font-size: 0.85rem;
    color: var(--spectrum-gray-700, #464646);
  }
`;

const LISTBOX_OPTIONS = [
  { key: 'photoshop', label: 'Photoshop' },
  { key: 'illustrator', label: 'Illustrator' },
  { key: 'indesign', label: 'InDesign' },
  { key: 'premiere', label: 'Premiere Pro' },
  { key: 'aftereffects', label: 'After Effects' },
  { key: 'xd', label: 'Adobe XD' },
  { key: 'lightroom', label: 'Lightroom' },
] as const;

const checkmarkSvg = html`
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <polyline
      points="1.5,6 4.5,9 10.5,3"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

/**
 * Multi-select listbox pairing **`FocusgroupNavigationController`** (arrow keys, roving
 * **`tabindex`**) with **`SelectionController`** (**`mode: 'multiple'`**, **`keydownActivation:
 * true`** for **Enter** / **Space** toggle). "Select all" and "Clear" call **`selectAll()`** and
 * **`clearAll()`**.
 *
 * @internal
 */
@customElement('demo-selection-listbox')
export class DemoSelectionListbox extends LitElement {
  static override styles = listboxStyles;

  @state() private selectedCount = 0;

  private options: HTMLElement[] = [];

  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'vertical',
    wrap: false,
    getItems: () => this.options,
  });

  private readonly selection = new SelectionController(this, {
    getItems: () => this.options,
    selectItem: (el) => {
      el.setAttribute('aria-selected', 'true');
    },
    deselectItem: (el) => {
      el.setAttribute('aria-selected', 'false');
    },
    mode: 'multiple',
    keydownActivation: true,
    onSelectionChange: (detail: SelectionControllerChangeDetail) => {
      this.selectedCount = detail.selectedItems.length;
    },
  });

  protected override firstUpdated(): void {
    this.options = Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>('[data-option]')
    );
    this.navigation.refresh();
    this.selection.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="wrapper">
        <div id="listbox-label" class="listbox-label">Creative Cloud apps</div>
        <div
          role="listbox"
          aria-labelledby="listbox-label"
          aria-multiselectable="true"
        >
          ${LISTBOX_OPTIONS.map(
            ({ key, label }) => html`
              <div
                role="option"
                tabindex="-1"
                aria-selected="false"
                data-option=${key}
              >
                <span class="checkbox" aria-hidden="true">${checkmarkSvg}</span>
                ${label}
              </div>
            `
          )}
        </div>
        <div class="actions">
          <button
            class="action-btn"
            type="button"
            @click=${() => {
              this.selection.selectAll();
              this.selectedCount = this.selection.getSelectedItems().length;
            }}
          >
            Select all
          </button>
          <button
            class="action-btn"
            type="button"
            @click=${() => {
              this.selection.clearAll();
              this.selectedCount = 0;
            }}
          >
            Clear
          </button>
        </div>
        <p class="count" aria-live="polite" aria-atomic="true">
          ${this.selectedCount === 0
            ? 'No apps selected'
            : `${this.selectedCount} app${this.selectedCount === 1 ? '' : 's'} selected`}
        </p>
      </div>
    `;
  }
}

// ─────────────────────────────────────────────
//   Tabs — pairing with FocusgroupNavigationController
// ─────────────────────────────────────────────

/**
 * Cancelable event dispatched from `confirmSelectionChange`, mirroring
 * `<swc-tabs>`'s `change` event.
 *
 * @internal
 */
export const DEMO_TAB_CHANGE_EVENT = 'demo-tab-change';

const tabStyles = css`
  :host {
    display: block;
    max-width: 28rem;
    font:
      0.95rem system-ui,
      sans-serif;
  }
  [role='tablist'] {
    display: flex;
    gap: 0.25rem;
    padding: 0.35rem;
    border-radius: 8px;
    border: 1px solid var(--spectrum-gray-300, #d3d3d3);
    background: var(--spectrum-gray-75, #fafafa);
  }
  [role='tab'] {
    flex: 1 1 auto;
    margin: 0;
    padding: 0.5rem 0.65rem;
    border: 1px solid transparent;
    border-radius: 6px;
    background: transparent;
    font: inherit;
    cursor: pointer;
  }
  [role='tab']:focus-visible {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: 2px;
  }
  [role='tab'][aria-selected='true'] {
    background: var(--spectrum-gray-200, #e6e6e6);
    border-color: var(--spectrum-gray-400, #b1b1b1);
    font-weight: 600;
  }
  .panels {
    margin-block-start: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--spectrum-gray-300, #d3d3d3);
  }
  [role='tabpanel'] {
    margin: 0;
  }
  [role='tabpanel'][hidden] {
    display: none;
  }
  .hint {
    margin: 0 0 0.65rem;
    font-size: 0.82rem;
    color: var(--spectrum-gray-700, #464646);
  }
`;

/**
 * Manual-activation tablist pairing **`FocusgroupNavigationController`** (arrow keys, roving
 * **`tabindex`**) with **`SelectionController`** (**`mode: 'single'`**, **`keydownActivation:
 * true`** for **Enter** / **Space** activation).
 *
 * @internal
 */
@customElement('demo-selection-tabs')
export class DemoSelectionTabs extends LitElement {
  static override styles = tabStyles;

  private tabButtons: HTMLButtonElement[] = [];

  private readonly tabNavigation = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: true,
    getItems: () => this.tabButtons,
  });

  private readonly tabSelection = new SelectionController(this, {
    getItems: () => this.tabButtons,
    selectItem: (tab) => {
      tab.setAttribute('aria-selected', 'true');
      const key = tab.dataset.tab!;
      const panel = this.renderRoot.querySelector<HTMLElement>(
        `[data-tab-panel="${key}"]`
      );
      panel?.removeAttribute('hidden');
    },
    deselectItem: (tab) => {
      tab.setAttribute('aria-selected', 'false');
      const key = tab.dataset.tab!;
      const panel = this.renderRoot.querySelector<HTMLElement>(
        `[data-tab-panel="${key}"]`
      );
      panel?.setAttribute('hidden', '');
    },
    mode: 'single',
    keydownActivation: true,
    defaultToFirstSelectable: true,
    // Mirrors <swc-tabs>: dispatches a cancelable event from
    // confirmSelectionChange, which SelectionController calls *after*
    // mutators and internal state are already applied for the candidate
    // transition — so a listener reading tab/panel state synchronously
    // sees the new selection, not the prior one. Returning false (via
    // preventDefault) reverts everything to the prior selection.
    confirmSelectionChange: () =>
      this.dispatchEvent(
        new Event(DEMO_TAB_CHANGE_EVENT, { cancelable: true })
      ),
  });

  protected override firstUpdated(): void {
    this.tabButtons = Array.from(
      this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-tab]')
    );
    this.tabNavigation.refresh();
    this.tabSelection.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <p class="hint">
        Arrow keys move focus via
        <code>FocusgroupNavigationController</code>
        ; press
        <kbd>Enter</kbd>
        or
        <kbd>Space</kbd>
        to select via
        <code>SelectionController</code>
        (
        <code>mode: 'single'</code>
        ). Pointer also works.
      </p>
      <div role="tablist" aria-label="Sample tabs">
        <button
          type="button"
          role="tab"
          data-tab="layers"
          id="demo-tab-layers"
          aria-controls="demo-panel-layers"
          aria-selected="false"
        >
          Layers
        </button>
        <button
          type="button"
          role="tab"
          data-tab="adjustments"
          id="demo-tab-adjustments"
          aria-controls="demo-panel-adjustments"
          aria-selected="false"
        >
          Adjustments
        </button>
        <button
          type="button"
          role="tab"
          data-tab="export"
          id="demo-tab-export"
          aria-controls="demo-panel-export"
          aria-selected="false"
        >
          Export
        </button>
      </div>
      <div class="panels">
        <div
          id="demo-panel-layers"
          role="tabpanel"
          data-tab-panel="layers"
          aria-labelledby="demo-tab-layers"
          hidden
        >
          <p>Layers panel — manage layer order and visibility.</p>
        </div>
        <div
          id="demo-panel-adjustments"
          role="tabpanel"
          data-tab-panel="adjustments"
          aria-labelledby="demo-tab-adjustments"
          hidden
        >
          <p>Adjustments panel — color grading and filters.</p>
        </div>
        <div
          id="demo-panel-export"
          role="tabpanel"
          data-tab-panel="export"
          aria-labelledby="demo-tab-export"
          hidden
        >
          <p>Export panel — choose format, size, and destination.</p>
        </div>
      </div>
    `;
  }
}

// ─────────────────────────────────────────────
//   Overview / playground host
// ─────────────────────────────────────────────

declare global {
  interface HTMLElementTagNameMap {
    'demo-selection-overview': DemoSelectionOverview;
  }
}

/**
 * Overview host for the Playground story — renders a five-star rating with
 * **`mode: 'single-toggle'`** so the active star can be cleared.
 *
 * @internal
 */
@customElement('demo-selection-overview')
export class DemoSelectionOverview extends LitElement {
  static override styles = starRatingStyles;

  private readonly stars = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: true,
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-star-overview]'
        )
      ),
  });

  private readonly selection = new SelectionController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-star-overview]'
        )
      ),
    selectItem: (star) => star.setAttribute('aria-checked', 'true'),
    deselectItem: (star) => star.setAttribute('aria-checked', 'false'),
    mode: 'single-toggle',
    keydownActivation: true,
  });

  protected override firstUpdated(): void {
    this.stars.refresh();
    this.selection.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <div role="radiogroup" aria-labelledby="overview-label">
        <div id="overview-label">Rating</div>
        <div class="stars">
          ${[1, 2, 3, 4, 5].map((value) => {
            const label = value === 1 ? `${value} star` : `${value} stars`;
            return html`
              <button
                type="button"
                data-star-overview
                role="radio"
                aria-checked="false"
                aria-label=${label}
              >
                ${starSvg}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
}
