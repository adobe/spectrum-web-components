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

import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import './demo-hosts.js';

// ────────────────
//    METADATA
// ────────────────

/**
 * `SelectionController` manages item selection in three modes: **`single`** (one item,
 * no toggle), **`single-toggle`** (one item, click to deselect), and **`multiple`** (any
 * number of items). You supply `getItems` (who participates), `selectItem` / `deselectItem`
 * (how DOM or ARIA reflects state), and `mode` (selection behavior). Switch modes at runtime
 * via `setOptions({ mode })` — the controller normalizes selection automatically.
 *
 * Use [FocusgroupNavigationController](../?path=/docs/controllers-focus-group-navigation-controller--docs)
 * separately when the composite also needs roving `tabindex`, arrow keys, or focus memory.
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/ | APG listbox pattern}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ | APG accordion pattern}
 */
const meta: Meta = {
  title: 'Controllers/Selection controller',
  component: 'demo-selection-overview',
  parameters: {
    docs: {
      subtitle:
        'Single, single-toggle, and multiple selection in one controller — switch modes at runtime via setOptions.',
      canvas: { sourceState: 'none' },
    },
  },
  tags: ['migrated', 'controller'],
  render: () => html`
    <demo-selection-overview></demo-selection-overview>
  `,
};

export default meta;

type Story = StoryObj;

// ──────────────────────────
//    PLAYGROUND STORY
// ──────────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
};

// ──────────────────────────
//    USAGE STORIES
// ──────────────────────────

/**
 * ## Anatomy of a `SelectionController`
 *
 * The `SelectionController` constructor takes two arguments:
 *
 * - `host: ReactiveElement` — the Lit host element
 * - `options: SelectionControllerOptions` — configuration
 *   - `getItems: () => HTMLElement[]` — returns the current participant set
 *   - `selectItem: (item: HTMLElement) => void` — called when an item enters the selected state
 *   - `deselectItem: (item: HTMLElement) => void` — called when an item leaves the selected state
 *   - `mode?: SelectionMode` — `'single'` (default), `'single-toggle'`, or `'multiple'`
 *   - `defaultToFirstSelectable?: boolean` — select the first eligible item after `refresh` when nothing is selected (single-item modes only)
 *   - `keydownActivation?: boolean` — when `true`, **Enter** / **Space** toggles items using the current mode rules; pair with `FocusgroupNavigationController` for arrow keys
 *   - `onSelectionChange?: (detail) => void` — called when the selection changes
 *   - `confirmSelectionChange?: (detail) => boolean` — return `false` to abort the transition
 *
 * ```typescript
 * import { SelectionController } from '@spectrum-web-components/core/controllers';
 *
 * private readonly selection = new SelectionController(this, {
 *   getItems: () => [...],
 *   selectItem: (el) => el.setAttribute('aria-selected', 'true'),
 *   deselectItem: (el) => el.setAttribute('aria-selected', 'false'),
 *   mode: 'multiple',
 *   keydownActivation: true,
 * });
 * ```
 *
 * ### `getItems`
 *
 * Pass a **function** (not a static array) that returns the current list of `HTMLElement` nodes
 * that should be selectable — for example every `[role="option"]` inside `this.renderRoot`.
 *
 * The controller automatically filters out items that are:
 *
 * - Outside the reactive host's subtree (light DOM children and shadow descendants; nodes
 *   outside the host are ignored)
 * - Disconnected, `[inert]`, `hidden`, or `display: none` / `visibility: hidden`
 * - Native **`disabled`** or **`aria-disabled="true"`**
 *
 * Call **`selection.refresh()`** after the shadow tree exists and whenever the set of items
 * changes — typically from `firstUpdated` and from `updated` when templates or slot content changes.
 *
 * ```typescript
 * protected override firstUpdated(): void {
 *   this.selection.refresh();
 * }
 * ```
 *
 * ### `selectItem` and `deselectItem`
 *
 * Whenever the selection changes, the controller walks every scoped raw item from `getItems` and:
 *
 * - calls **`selectItem`** on each item in the new selection
 * - calls **`deselectItem`** on each item outside the new selection
 *
 * Your callbacks should only update that element — for example set or remove attributes, toggle
 * classes, or sync related nodes (such as a sibling panel's `[hidden]` flag).
 *
 * ```typescript
 * selectItem: (item) => item.setAttribute('aria-selected', 'true'),
 * deselectItem: (item) => item.setAttribute('aria-selected', 'false'),
 * ```
 *
 * ### Switching modes at runtime
 *
 * Call **`setOptions({ mode })`** to switch modes without reconstructing the controller. When
 * switching from **`multiple`** to a single-item mode with more than one item selected, only the
 * first selected item is retained — a change event fires for the deselected items.
 *
 * ```typescript
 * this.selection.setOptions({ mode: 'single-toggle' });
 * ```
 */
export const Usage: Story = {
  tags: ['usage', 'description-only'],
  parameters: { 'section-order': 0 },
};

/**
 * ## Examples
 * ### `single` mode — selecting without deselect
 *
 * Use **`mode: 'single'`** when exactly one item should always be active and clicking the
 * active item should do nothing. Good for tab lists and exclusive category filters.
 *
 * ```typescript
 * private readonly selection = new SelectionController(this, {
 *   getItems: () =>
 *     Array.from(this.renderRoot.querySelectorAll('[data-star]')),
 *   selectItem: (star) => star.setAttribute('aria-checked', 'true'),
 *   deselectItem: (star) => star.setAttribute('aria-checked', 'false'),
 *   mode: 'single',
 *   keydownActivation: true,
 * });
 * ```
 */
export const UsageExampleSingle: Story = {
  name: 'Example: single mode',
  tags: ['usage'],
  parameters: { 'section-order': 1 },
  render: () => html`
    <demo-selection-star-single></demo-selection-star-single>
  `,
};

/**
 * ### `single-toggle` mode — selecting and deselecting
 *
 * Use **`mode: 'single-toggle'`** when at most one item should be selected and the selection
 * should be clearable by clicking the active item again. Good for optional ratings, filters,
 * or accordion headers that should allow all panels to be closed.
 *
 * ```typescript
 * private readonly selection = new SelectionController(this, {
 *   getItems: () =>
 *     Array.from(this.renderRoot.querySelectorAll('[data-star]')),
 *   selectItem: (star) => star.setAttribute('aria-checked', 'true'),
 *   deselectItem: (star) => star.setAttribute('aria-checked', 'false'),
 *   mode: 'single-toggle',
 *   keydownActivation: true,
 * });
 * ```
 */
export const UsageExampleSingleToggle: Story = {
  name: 'Example: single-toggle mode',
  tags: ['usage'],
  parameters: { 'section-order': 2 },
  render: () => html`
    <demo-selection-star-toggle></demo-selection-star-toggle>
  `,
};

/**
 * ### `multiple` mode — independent toggles
 *
 * Use **`mode: 'multiple'`** when any number of items may be selected simultaneously, each
 * toggled independently. Combine **`selectAll()`** and **`clearAll()`** with UI buttons.
 *
 * ```typescript
 * private readonly selection = new SelectionController(this, {
 *   getItems: () => this.options,
 *   selectItem: (el) => el.setAttribute('aria-selected', 'true'),
 *   deselectItem: (el) => el.setAttribute('aria-selected', 'false'),
 *   mode: 'multiple',
 *   keydownActivation: true,
 * });
 *
 * // In response to a "Select all" button:
 * this.selection.selectAll();
 *
 * // In response to a "Clear" button:
 * this.selection.clearAll();
 * ```
 */
export const UsageExampleMultiple: Story = {
  name: 'Example: multiple mode',
  tags: ['usage'],
  parameters: { 'section-order': 3 },
  render: () => html`
    <demo-selection-listbox></demo-selection-listbox>
  `,
};

/**
 * ### Switching modes at runtime
 *
 * Call **`setOptions({ mode })`** on the controller to change the selection mode without
 * reconstructing it. This accordion starts in **`single`** mode; the buttons let you switch
 * to **`single-toggle`** or **`multiple`** and see how behavior changes immediately.
 *
 * - **`single`**: only one panel open, cannot close it by clicking its header again
 * - **`single-toggle`**: only one panel open, clicking the open header closes it
 * - **`multiple`**: each header toggles its own panel independently
 *
 * When switching from **`multiple`** back to a single-item mode while more than one panel is
 * open, all but the first are closed automatically.
 *
 * ```typescript
 * // Triggered by a user action or external API:
 * this.accordionSelection.setOptions({ mode: 'single-toggle' });
 * ```
 */
export const UsageExampleRuntimeModeSwitch: Story = {
  name: 'Example: switching modes at runtime',
  tags: ['usage'],
  parameters: { 'section-order': 4 },
  render: () => html`
    <demo-selection-accordion></demo-selection-accordion>
  `,
};

/**
 * ### Pairing with `FocusgroupNavigationController`
 *
 * For a manual-activation tab list, pair **`FocusgroupNavigationController`** (arrow keys,
 * roving **`tabindex`**, Home/End) with **`SelectionController`** (**`mode: 'single'`**,
 * **`keydownActivation: true`** for **Enter** / **Space** selection). Keep selection state
 * (`aria-selected`, panels) in **`selectItem`** / **`deselectItem`**; do not manage `tabindex`
 * there.
 *
 * ```typescript
 * import {
 *   FocusgroupNavigationController,
 *   SelectionController,
 * } from '@spectrum-web-components/core/controllers';
 *
 * private readonly tabNavigation = new FocusgroupNavigationController(this, {
 *   direction: 'horizontal',
 *   wrap: true,
 *   getItems: () => this.tabButtons,
 * });
 *
 * private readonly tabSelection = new SelectionController(this, {
 *   getItems: () => this.tabButtons,
 *   selectItem: (tab) => {
 *     tab.setAttribute('aria-selected', 'true');
 *     this.showPanelForTab(tab);
 *   },
 *   deselectItem: (tab) => {
 *     tab.setAttribute('aria-selected', 'false');
 *     this.hidePanelForTab(tab);
 *   },
 *   mode: 'single',
 *   keydownActivation: true,
 *   defaultToFirstSelectable: true,
 * });
 * ```
 */
export const UsageExampleTabsWithFocusgroup: Story = {
  name: 'Example: tablist with FocusgroupNavigationController',
  tags: ['usage'],
  parameters: { 'section-order': 5 },
  render: () => html`
    <demo-selection-tabs></demo-selection-tabs>
  `,
};

// ──────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────

export const SingleModeRating: Story = {
  name: 'single mode: no deselect on re-click',
  render: () => html`
    <demo-selection-star-single></demo-selection-star-single>
  `,
  tags: ['behaviors'],
  parameters: { docs: { disable: true } },
};

export const SingleToggleModeRating: Story = {
  name: 'single-toggle mode: click active item to deselect',
  render: () => html`
    <demo-selection-star-toggle></demo-selection-star-toggle>
  `,
  tags: ['behaviors'],
  parameters: { docs: { disable: true } },
};

export const MultipleListbox: Story = {
  name: 'multiple mode: listbox with selectAll and clearAll',
  render: () => html`
    <demo-selection-listbox></demo-selection-listbox>
  `,
  tags: ['behaviors'],
  parameters: { docs: { disable: true } },
};

export const AccordionModeSwitch: Story = {
  name: 'Accordion: runtime mode switch via setOptions',
  render: () => html`
    <demo-selection-accordion></demo-selection-accordion>
  `,
  tags: ['behaviors'],
  parameters: { docs: { disable: true } },
};

export const TablistWithFocusgroup: Story = {
  name: 'Tablist: FocusgroupNavigationController + SelectionController',
  render: () => html`
    <demo-selection-tabs></demo-selection-tabs>
  `,
  tags: ['behaviors'],
  parameters: { docs: { disable: true } },
};

// ──────────────────────────────
//    API STORY
// ──────────────────────────────

/**
 * ### Methods
 *
 * | Member | Description |
 * |---|---|
 * | `setOptions(partial)` | Merge new options, normalize selection for mode changes, and reapply. |
 * | `refresh()` | Remove stale selections and optionally select the first item (`defaultToFirstSelectable`). |
 * | `getSelectedItems()` | Returns the current selection as an ordered array. |
 * | `isSelected(item)` | Returns `true` when `item` is currently selected. |
 * | `getMode()` | Returns the current `SelectionMode`. |
 * | `setSelectedItem(item \| null)` | Select one item (single/single-toggle) or add to multiple selection; pass `null` to clear (single-toggle and multiple only). |
 * | `toggleItem(item)` | Toggle an item using the current mode rules. |
 * | `selectAll()` | Select all eligible items (multiple mode only; returns `false` otherwise). |
 * | `clearAll()` | Deselect all items (single-toggle and multiple modes; returns `false` in single mode). |
 *
 * ### Events
 *
 * The controller dispatches **`swc-selection-controller-change`** (`selectionControllerChange`)
 * on the host with `detail: { selectedItems, addedItems, removedItems }`. The event bubbles and
 * is composed.
 *
 * ```typescript
 * import { selectionControllerChange } from
 *   '@spectrum-web-components/core/controllers';
 *
 * host.addEventListener(selectionControllerChange, (event) => {
 *   const { selectedItems, addedItems, removedItems } = event.detail;
 *   console.log('Selected:', selectedItems);
 * });
 * ```
 *
 * ### Options
 *
 * | Option | Type | Default | Description |
 * |---|---|---|---|
 * | `getItems` | `() => HTMLElement[]` | (required) | Current selection participants. |
 * | `selectItem` | `(item: HTMLElement) => void` | (required) | Called on each item entering the selection. |
 * | `deselectItem` | `(item: HTMLElement) => void` | (required) | Called on each item leaving the selection. |
 * | `mode` | `'single' \| 'single-toggle' \| 'multiple'` | `'single'` | Selection behavior. |
 * | `defaultToFirstSelectable` | `boolean` | `false` | When `true`, `refresh` selects the first eligible item if nothing is selected (single-item modes only). |
 * | `keydownActivation` | `boolean` | `false` | When `true`, Enter/Space toggles the focused eligible item. Pair with `FocusgroupNavigationController` for arrow keys. |
 * | `onSelectionChange` | `(detail) => void` | — | Callback on selection change. |
 * | `confirmSelectionChange` | `(detail) => boolean` | — | Return `false` to abort the transition before mutators run. |
 */
export const API: Story = {
  tags: ['api', 'description-only'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Pointer and eligibility
 *
 * **`SelectionController`** resolves primary clicks with **`deepestSelectionItemContaining`**.
 * Disabled and **`aria-disabled="true"`** items are never toggled and do not receive selection
 * changes from pointer interaction.
 *
 * ### Keyboard and focus
 *
 * **`SelectionController`** does not implement roving **`tabindex`**, arrow keys, Home/End, or
 * programmatic **`focus()`**. Add **`FocusgroupNavigationController`** when the composite needs
 * those behaviors.
 *
 * With **`keydownActivation: true`**, the controller listens for **Enter** and **Space** on the
 * host (capture phase) and applies the current mode rules to the deepest eligible item on the
 * event path.
 *
 * ### ARIA
 *
 * Keep `aria-selected`, `aria-checked`, `aria-expanded`, and related attributes in sync inside
 * your **`selectItem`** / **`deselectItem`** callbacks; the controller does not infer state from
 * the DOM. For a multiselect listbox, also set **`aria-multiselectable="true"`** on the host.
 *
 * ### `confirmSelectionChange`
 *
 * When you need to run a cancelable host event **before** DOM mutators run, use
 * **`confirmSelectionChange`**. Return **`false`** to abort the transition; the selection stays
 * unchanged and no change event is dispatched.
 */
export const Accessibility: Story = {
  tags: ['a11y', 'description-only'],
};

/**
 * ### See also
 *
 * - [Focusgroup navigation controller](../?path=/docs/controllers-focus-group-navigation-controller--docs)
 * - [APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
 * - [APG accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
 * - [APG tab pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
 */
export const Appendix: Story = {
  tags: ['description-only', 'appendix'],
};
