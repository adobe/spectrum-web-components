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
import { customElement } from 'lit/decorators.js';

import {
  type FocusgroupDirection,
  FocusgroupNavigationController,
} from '../../focusgroup-navigation-controller/index.js';
import { SelectionController, type SelectionMode } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-selection-view-switcher': DemoSelectionViewSwitcher;
    'demo-selection-priority': DemoSelectionPriority;
    'demo-selection-filter-tags': DemoSelectionFilterTags;
    'demo-selection-mode-switcher': DemoSelectionModeSwitcher;
    'demo-selection-tablist': DemoSelectionTablist;
    'demo-selection-eligibility': DemoSelectionEligibility;
  }
}

/** Name of the cancelable custom event `demo-selection-tablist` dispatches from `confirmSelectionChange`. */
export const DEMO_TABLIST_CHANGE_EVENT = 'demo-tablist-change';

// ─────────────────────────────────────────────
//   Shared button-group styles
// ─────────────────────────────────────────────

const groupStyles = css`
  :host {
    display: block;
    font:
      0.95rem system-ui,
      sans-serif;
  }
  .hint {
    margin-block-start: 0;
    margin-block-end: 0.75rem;
    font-size: 0.85rem;
    color: var(--spectrum-gray-700, #464646);
  }
  .group {
    display: flex;
    gap: 2px;
    inline-size: fit-content;
  }
  .group button {
    font: inherit;
    padding: 0.4rem 0.9rem;
    border: 1px solid var(--spectrum-gray-400, #b9b9b9);
    background: white;
    cursor: pointer;
  }
  .group button:first-child {
    border-start-start-radius: 4px;
    border-end-start-radius: 4px;
  }
  .group button:last-child {
    border-start-end-radius: 4px;
    border-end-end-radius: 4px;
  }
  .group button + button {
    border-inline-start: none;
  }
  .group button[aria-checked='true'],
  .group button[aria-pressed='true'] {
    background: var(--spectrum-blue-800, #0265dc);
    border-color: var(--spectrum-blue-800, #0265dc);
    color: white;
  }
  .group button:disabled {
    color: var(--spectrum-gray-500, #8e8e8e);
    cursor: not-allowed;
  }
  .group button:focus-visible {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: -2px;
    z-index: 1;
    position: relative;
  }
  .actions {
    margin-block-start: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .action-btn {
    font: inherit;
    font-size: 0.85rem;
    padding: 0.3rem 0.75rem;
    border: 1px solid var(--spectrum-gray-400, #b9b9b9);
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
  }
  .count {
    font-size: 0.85rem;
    color: var(--spectrum-gray-700, #464646);
  }
`;

// ─────────────────────────────────────────────
//   View switcher — mode: 'single'
// ─────────────────────────────────────────────

/**
 * Segmented "view switcher" using **`mode: 'single'`**: one view is always selected, and
 * clicking the active view has no effect. Represents the most common use of this controller —
 * a group of mutually exclusive options, like tabs or a radio group.
 *
 * @internal
 */
@customElement('demo-selection-view-switcher')
export class DemoSelectionViewSwitcher extends LitElement {
  static override styles = groupStyles;

  private readonly selection = new SelectionController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-view]')
      ),
    selectItem: (item) => item.setAttribute('aria-checked', 'true'),
    deselectItem: (item) => item.setAttribute('aria-checked', 'false'),
    mode: 'single',
    defaultToFirstSelectable: true,
    keydownActivation: true,
  });

  protected override firstUpdated(): void {
    this.selection.refresh();
  }

  /**
   * Clears the selection despite `mode: 'single'` — normally rejected interactively (a
   * mandatory single-select group can't be emptied by clicking), but a consumer resyncing from
   * an external property that explicitly represents "nothing selected" can still clear it with
   * `{ silent: true }`.
   *
   * @internal
   */
  public clearSelectionSilently(): void {
    this.selection.setSelectedItem(null, { silent: true });
  }

  protected override render(): TemplateResult {
    return html`
      <p class="hint">
        Clicking the active view has no effect —
        <code>mode</code>
        is
        <code>'single'</code>
        .
      </p>
      <div class="group" role="radiogroup" aria-label="View">
        ${['List', 'Grid', 'Table'].map(
          (label) => html`
            <button
              type="button"
              data-view
              role="radio"
              aria-checked="false"
              aria-label="${label} view"
            >
              ${label}
            </button>
          `
        )}
      </div>
      <div class="actions">
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
//   Priority selector — mode: 'single-toggle'
// ─────────────────────────────────────────────

/**
 * Priority selector using **`mode: 'single-toggle'`**: clicking the active option clears it,
 * representing "no priority set." Demonstrates an optional (not mandatory) single choice.
 *
 * @internal
 */
@customElement('demo-selection-priority')
export class DemoSelectionPriority extends LitElement {
  static override styles = groupStyles;

  private readonly selection = new SelectionController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-priority]')
      ),
    selectItem: (item) => item.setAttribute('aria-checked', 'true'),
    deselectItem: (item) => item.setAttribute('aria-checked', 'false'),
    mode: 'single-toggle',
    keydownActivation: true,
  });

  protected override firstUpdated(): void {
    this.selection.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <p class="hint">
        Clicking the active option clears it —
        <code>mode</code>
        is
        <code>'single-toggle'</code>
        .
      </p>
      <div class="group" role="radiogroup" aria-label="Priority">
        ${['Low', 'Medium', 'High'].map(
          (label) => html`
            <button
              type="button"
              data-priority
              role="radio"
              aria-checked="false"
              aria-label="${label} priority"
            >
              ${label}
            </button>
          `
        )}
      </div>
    `;
  }
}

// ─────────────────────────────────────────────
//   Filter tags — mode: 'multiple'
// ─────────────────────────────────────────────

const filterTagsStyles = css`
  ${groupStyles}
  .group {
    flex-wrap: wrap;
  }
  .group button {
    border-radius: 999px;
    border-inline-start: 1px solid var(--spectrum-gray-400, #b9b9b9);
  }
`;

const FILTER_TAGS = ['Photos', 'Documents', 'Videos', 'Audio', 'Archives'];

/**
 * Multi-select filter tags using **`mode: 'multiple'`**: any number of tags can be active at
 * once, and clicking a tag toggles it independently of the others. Demonstrates `selectAll`,
 * `clearAll`, and `onSelectionChange` mirroring the count into the host.
 *
 * @internal
 */
@customElement('demo-selection-filter-tags')
export class DemoSelectionFilterTags extends LitElement {
  static override styles = filterTagsStyles;

  private selectedCount = 0;

  private readonly selection = new SelectionController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-tag]')
      ),
    selectItem: (item) => item.setAttribute('aria-pressed', 'true'),
    deselectItem: (item) => item.setAttribute('aria-pressed', 'false'),
    mode: 'multiple',
    keydownActivation: true,
    onSelectionChange: ({ selectedItems }) => {
      this.selectedCount = selectedItems.length;
      this.requestUpdate();
    },
  });

  protected override firstUpdated(): void {
    this.selection.refresh();
  }

  private selectAll = (): void => {
    this.selection.selectAll();
  };

  private clearAll = (): void => {
    this.selection.clearAll();
  };

  protected override render(): TemplateResult {
    return html`
      <p class="hint">
        Any number of tags may be active —
        <code>mode</code>
        is
        <code>'multiple'</code>
        .
      </p>
      <div class="group" role="group" aria-label="Filter by type">
        ${FILTER_TAGS.map(
          (label) => html`
            <button type="button" data-tag aria-pressed="false">
              ${label}
            </button>
          `
        )}
      </div>
      <div class="actions">
        <button type="button" class="action-btn" @click=${this.selectAll}>
          Select all
        </button>
        <button type="button" class="action-btn" @click=${this.clearAll}>
          Clear all
        </button>
        <span class="count">
          ${this.selectedCount === 0
            ? 'No filters selected'
            : `${this.selectedCount} filter${
                this.selectedCount === 1 ? '' : 's'
              } selected`}
        </span>
      </div>
    `;
  }
}

// ─────────────────────────────────────────────
//   Mode switcher — runtime setOptions({ mode })
// ─────────────────────────────────────────────

const modeSwitcherStyles = css`
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
  }
  .mode-btn[aria-pressed='true'] {
    background: var(--spectrum-blue-800, #0265dc);
    border-color: var(--spectrum-blue-800, #0265dc);
    color: white;
  }
  .panels {
    max-width: 26rem;
    border: 1px solid var(--spectrum-gray-300, #cbcbcb);
    border-radius: 6px;
    overflow: clip;
  }
  section {
    border-block-end: 1px solid var(--spectrum-gray-200, #e6e6e6);
  }
  section:last-of-type {
    border-block-end: none;
  }
  button.trigger {
    display: block;
    width: 100%;
    font: inherit;
    padding: 0.65rem 1rem;
    border: none;
    background: white;
    cursor: pointer;
    text-align: start;
  }
  button.trigger[aria-expanded='true'] {
    font-weight: 600;
  }
  .panel-body {
    padding: 0 1rem 0.75rem;
    font-size: 0.9rem;
    color: var(--spectrum-gray-700, #464646);
  }
`;

const MODE_SWITCHER_PANELS = [
  { key: 'general', label: 'General', body: 'General settings content.' },
  {
    key: 'appearance',
    label: 'Appearance',
    body: 'Appearance settings content.',
  },
  { key: 'privacy', label: 'Privacy', body: 'Privacy settings content.' },
];

const MODE_OPTIONS: SelectionMode[] = ['single', 'single-toggle', 'multiple'];

/**
 * Trigger/panel group that switches its `SelectionController`'s `mode` at runtime via
 * `setOptions({ mode })`. Demonstrates that switching from `multiple` down to a single-item
 * mode automatically collapses an over-selection to the first selected item.
 *
 * @internal
 */
@customElement('demo-selection-mode-switcher')
export class DemoSelectionModeSwitcher extends LitElement {
  static override styles = modeSwitcherStyles;

  private mode: SelectionMode = 'single-toggle';

  private readonly selection = new SelectionController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-panel-trigger]'
        )
      ),
    selectItem: (item) => {
      item.setAttribute('aria-expanded', 'true');
      const body = this.panelBodyFor(item);
      if (body) {
        body.hidden = false;
      }
    },
    deselectItem: (item) => {
      item.setAttribute('aria-expanded', 'false');
      const body = this.panelBodyFor(item);
      if (body) {
        body.hidden = true;
      }
    },
    mode: this.mode,
  });

  private panelBodyFor(trigger: HTMLElement): HTMLElement | null {
    const key = trigger.getAttribute('data-panel-trigger');
    return this.renderRoot.querySelector(`[data-panel-body="${key}"]`);
  }

  protected override firstUpdated(): void {
    this.selection.refresh();
  }

  private handleModeClick = (event: Event): void => {
    const mode = (event.currentTarget as HTMLElement).getAttribute(
      'data-mode'
    ) as SelectionMode;
    this.mode = mode;
    this.selection.setOptions({ mode });
    this.requestUpdate();
  };

  protected override render(): TemplateResult {
    return html`
      <div class="controls" role="group" aria-label="Selection mode">
        <span>Mode:</span>
        ${MODE_OPTIONS.map(
          (mode) => html`
            <button
              type="button"
              class="mode-btn"
              data-mode=${mode}
              aria-pressed=${this.mode === mode}
              @click=${this.handleModeClick}
            >
              ${mode}
            </button>
          `
        )}
      </div>
      <div class="panels">
        ${MODE_SWITCHER_PANELS.map(
          (panel) => html`
            <section>
              <button
                type="button"
                class="trigger"
                data-panel-trigger=${panel.key}
                aria-expanded="false"
              >
                ${panel.label}
              </button>
              <div class="panel-body" data-panel-body=${panel.key} hidden>
                ${panel.body}
              </div>
            </section>
          `
        )}
      </div>
    `;
  }
}

// ─────────────────────────────────────────────────────────
//   Tablist — paired with FocusgroupNavigationController
// ─────────────────────────────────────────────────────────

const tablistStyles = css`
  :host {
    display: block;
    font:
      0.95rem system-ui,
      sans-serif;
  }
  .hint {
    margin-block-start: 0;
    margin-block-end: 0.75rem;
    font-size: 0.85rem;
    color: var(--spectrum-gray-700, #464646);
  }
  [role='tablist'] {
    display: flex;
    gap: 2px;
    border-block-end: 2px solid var(--spectrum-gray-300, #cbcbcb);
  }
  [role='tab'] {
    font: inherit;
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
    border-block-end: 2px solid transparent;
    margin-block-end: -2px;
  }
  [role='tab'][aria-selected='true'] {
    border-block-end-color: var(--spectrum-blue-800, #0265dc);
    font-weight: 600;
  }
  [role='tab']:focus-visible {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: 2px;
  }
  [role='tabpanel'] {
    padding: 0.75rem 0.25rem;
    font-size: 0.9rem;
    color: var(--spectrum-gray-700, #464646);
  }
`;

const TABLIST_TABS = [
  { key: 'layers', label: 'Layers', body: 'Layers panel content.' },
  {
    key: 'adjustments',
    label: 'Adjustments',
    body: 'Adjustments panel content.',
  },
  { key: 'export', label: 'Export', body: 'Export panel content.' },
];

/**
 * Manual-activation tablist pattern pairing `SelectionController` (click / Enter / Space
 * ownership, `defaultToFirstSelectable`, cancelable `confirmSelectionChange`) with
 * `FocusgroupNavigationController` (arrow-key roving `tabindex`) — the combination the JSDoc on
 * `SelectionController` recommends for a composite that needs both. Demonstrates the
 * mutators-before-`confirmSelectionChange` ordering: a listener for
 * `demo-tablist-change` sees the newly selected tab's `aria-selected` and panel visibility
 * already updated, and can call `preventDefault()` to revert the transition.
 *
 * @internal
 */
@customElement('demo-selection-tablist')
export class DemoSelectionTablist extends LitElement {
  static override styles = tablistStyles;

  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'horizontal' as FocusgroupDirection,
    wrap: true,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('[data-tab]')),
  });

  private readonly selection = new SelectionController(this, {
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('[data-tab]')),
    selectItem: (item) => {
      item.setAttribute('aria-selected', 'true');
      const panel = this.panelFor(item);
      if (panel) {
        panel.hidden = false;
      }
    },
    deselectItem: (item) => {
      item.setAttribute('aria-selected', 'false');
      const panel = this.panelFor(item);
      if (panel) {
        panel.hidden = true;
      }
    },
    mode: 'single',
    defaultToFirstSelectable: true,
    keydownActivation: true,
    confirmSelectionChange: () =>
      this.dispatchEvent(
        new Event(DEMO_TABLIST_CHANGE_EVENT, { cancelable: true })
      ),
  });

  private panelFor(tab: HTMLElement): HTMLElement | null {
    const key = tab.getAttribute('data-tab');
    return this.renderRoot.querySelector(`[data-tab-panel="${key}"]`);
  }

  protected override firstUpdated(): void {
    this.navigation.refresh();
    this.selection.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <p class="hint">
        Arrow keys move focus; Enter / Space selects the focused tab.
        <code>defaultToFirstSelectable</code>
        selects the first tab on mount.
      </p>
      <div role="tablist" aria-label="Demo tablist">
        ${TABLIST_TABS.map(
          (tab) => html`
            <button
              type="button"
              role="tab"
              data-tab=${tab.key}
              aria-selected="false"
            >
              ${tab.label}
            </button>
          `
        )}
      </div>
      ${TABLIST_TABS.map(
        (tab) => html`
          <div role="tabpanel" data-tab-panel=${tab.key} hidden>
            ${tab.body}
          </div>
        `
      )}
    `;
  }
}

// ─────────────────────────────────────────────
//   Eligibility — disabled, hidden, custom isDisabled
// ─────────────────────────────────────────────

/**
 * Test-only fixture (not referenced from the docs page) exercising
 * eligibility exclusion: the built-in `disabled` and `hidden` checks, plus a
 * custom `isDisabled` override treating `data-locked` as disabled.
 *
 * @internal
 */
@customElement('demo-selection-eligibility')
export class DemoSelectionEligibility extends LitElement {
  static override styles = groupStyles;

  private readonly selection = new SelectionController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-elig]')
      ),
    selectItem: (item) => item.setAttribute('aria-pressed', 'true'),
    deselectItem: (item) => item.setAttribute('aria-pressed', 'false'),
    mode: 'multiple',
    keydownActivation: true,
    isDisabled: (item) => item.hasAttribute('data-locked'),
  });

  protected override firstUpdated(): void {
    this.selection.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="group" role="group" aria-label="Eligibility test">
        <button type="button" data-elig="normal" aria-pressed="false">
          Normal
        </button>
        <button
          type="button"
          data-elig="disabled"
          disabled
          aria-pressed="false"
        >
          Disabled
        </button>
        <button type="button" data-elig="hidden" hidden aria-pressed="false">
          Hidden
        </button>
        <button
          type="button"
          data-elig="locked"
          data-locked
          aria-pressed="false"
        >
          Locked
        </button>
      </div>
    `;
  }
}
