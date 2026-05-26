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

import type { FocusgroupDirection } from '../index.js';

// ────────────────
//    METADATA
// ────────────────

const args = {
  direction: 'horizontal' as FocusgroupDirection,
  wrap: true,
  memory: true,
  skipDisabled: false,
  pageStep: 0,
};

const argTypes = {
  direction: {
    control: 'select',
    options: ['horizontal', 'vertical', 'both', 'grid'],
    description:
      'Arrow-key mode. `both`: Left/Right and Up/Down on the same `getItems()` sequence.',
    table: { category: 'Options', defaultValue: { summary: '(required)' } },
  },
  wrap: {
    control: 'boolean',
    description: 'Wrap at ends.',
    table: { category: 'Options', defaultValue: { summary: 'false' } },
  },
  memory: {
    control: 'boolean',
    description: 'Remember last focused for re-entry via Tab.',
    table: { category: 'Options', defaultValue: { summary: 'true' } },
  },
  skipDisabled: {
    control: 'boolean',
    description: 'Skip `disabled` / `aria-disabled="true"` items.',
    table: { category: 'Options', defaultValue: { summary: 'false' } },
  },
  pageStep: {
    control: 'number',
    description:
      'Page Up / Page Down step size (items for linear modes, rows for grid). `0` disables.',
    table: { category: 'Options', defaultValue: { summary: '0' } },
  },
};

/**
 * `FocusgroupNavigationController` implements the
 * [roving `tabindex` pattern](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#managingfocuswithincomponentsusingarovingtabindex)
 * from the ARIA Authoring Practices Guide (APG) and directional keyboard behavior aligned with
 * the Open UI [`focusgroup` explainer](https://open-ui.org/components/scoped-focusgroup.explainer/).
 * Use it inside Lit-based custom elements (or any `ReactiveElement`) until native `focusgroup` is
 * widely available.
 *
 */
const meta: Meta = {
  title: 'Controllers/Focus group navigation controller',
  component: 'demo-focusgroup-playground',
  args,
  argTypes,
  render: (args) => html`
    <demo-focusgroup-playground
      direction=${args.direction}
      ?wrap=${args.wrap}
      ?memory=${args.memory}
      ?skip-disabled=${args.skipDisabled}
      page-step=${args.pageStep}
    ></demo-focusgroup-playground>
  `,
  parameters: {
    docs: {
      subtitle:
        'Roving tabindex and directional keys for composite widgets (APG-aligned, focusgroup-like).',
      canvas: { sourceState: 'none' },
    },
  },
  tags: ['migrated', 'controller'],
};

export default meta;

type Story = StoryObj;

// ──────────────────────────
//    AUTODOCS STORY
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
//    BASIC USAGE STORY
// ──────────────────────────

/**
 * ## What it does
 *
 * ### Navigation
 *
 * - Collapses the tab sequence to **one** tab stop by setting `tabindex="0"` on the active
 *   item and `tabindex="-1"` on all others.
 * - **Arrow** keys move focus according to `direction`: horizontal (inline axis), vertical
 *   (block axis), **both** (all four arrows on one linear order), or **grid** (rows and
 *   columns from layout).
 * - **Home** / **End** jump to the first or last item (row-major order for `grid`).
 * - **Ctrl+Home** / **Ctrl+End** (`grid` only) jump to the first cell of the first row or
 *   the last cell of the last row.
 * - **Page Up** / **Page Down** move `pageStep` items (linear modes) or rows (`grid`) when
 *   `pageStep` is set.
 *
 * ### Configuration
 *
 * - **`wrap`** — end wraps to start (and vice versa), similar to `wrap` concepts in the `focusgroup` proposal.
 * - **`memory`** — Tab returns to the last focused item instead of resetting, similar to the `nomemory` concepts in the `focusgroup` proposal.
 * - **`skipDisabled`** — when `true`, elements with `disabled` or `aria-disabled="true"` are
 *   excluded from the roving tab stop and arrow navigation.
 * - **`pageStep`** — non-zero positive integer enables Page Up / Page Down movement.
 *
 * ### Programmatic API
 *
 * - **`setActiveItem(element)`** — sets roving `tabindex` to a chosen eligible item (does
 *   **not** call `focus()`; call `getActiveItem()?.focus()` afterward).
 * - **`focusFirstItemByTextPrefix(prefix)`** — sets roving `tabindex` to the first eligible
 *   item whose label starts with `prefix` (case-insensitive). Does **not** call `focus()`.
 *
 * ## Basic usage
 *
 * 1. Construct the controller in your element's `constructor`, passing `getItems` and `direction`.
 * 2. Ensure `getItems` returns live `HTMLElement` references (for example from `this.renderRoot`
 *    or slotted content).
 * 3. After the first render, if items live in shadow DOM, call **`refresh()`** from `firstUpdated`
 *    (or after slotting) so roving tabindex can run once nodes exist.
 * 4. Provide appropriate **roles** and **labels** on the host and items (the controller does not
 *    set ARIA roles).
 *
 * ```typescript
 * import { LitElement, html, css } from 'lit';
 * import { customElement } from 'lit/decorators.js';
 * import { FocusgroupNavigationController } from
 *   '@spectrum-web-components/core/controllers/focusgroup-navigation-controller.js';
 *
 * @customElement('my-format-toolbar')
 * export class MyFormatToolbar extends LitElement {
 *   static styles = css`:host { display: flex; gap: 4px; }`;
 *
 *   private readonly navigation = new FocusgroupNavigationController(this, {
 *     direction: 'horizontal',
 *     wrap: true,
 *     getItems: () =>
 *       Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
 *   });
 *
 *   protected override firstUpdated(): void {
 *     super.firstUpdated();
 *     this.navigation.refresh();
 *   }
 *
 *   protected override render() {
 *     return html\`
 *       <button type="button">Bold</button>
 *       <button type="button">Italic</button>
 *       <button type="button">Underline</button>
 *     \`;
 *   }
 * }
 * ```
 */
export const Usage: Story = {
  tags: ['usage', 'description-only'],
};

// ──────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────

/**
 * Use `direction: 'horizontal'` for inline-axis arrow navigation. **ArrowLeft** and
 * **ArrowRight** move between controls (respecting `dir` for RTL); **Tab** yields one stop for
 * the entire group.
 *
 * ```typescript
 * this.navigation = new FocusgroupNavigationController(this, {
 *   direction: 'horizontal',
 *   wrap: true,
 *   getItems: () =>
 *     Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
 * });
 * ```
 */
export const HorizontalToolbar: Story = {
  render: () => html`
    <demo-focusgroup-horizontal
      role="toolbar"
      aria-label="Text formatting"
    ></demo-focusgroup-horizontal>
  `,
  tags: ['behaviors'],
  parameters: { 'section-order': 1 },
};

/**
 * Use `direction: 'both'` when controls are laid out in a line (or any single sequence) but you
 * want **ArrowUp** / **ArrowDown** to move focus as well as **ArrowLeft** / **ArrowRight**.
 * Inline arrows follow `dir` like `horizontal`; **ArrowUp** / **ArrowDown** step backward /
 * forward in `getItems()` order.
 *
 * ```typescript
 * this.navigation = new FocusgroupNavigationController(this, {
 *   direction: 'both',
 *   wrap: true,
 *   getItems: () =>
 *     Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
 * });
 * ```
 */
export const BothAxesLinear: Story = {
  render: () => html`
    <demo-focusgroup-both-axes
      role="toolbar"
      aria-label="Segmented controls"
    ></demo-focusgroup-both-axes>
  `,
  tags: ['behaviors'],
  parameters: { 'section-order': 2 },
};

/**
 * Use `direction: 'vertical'` for block-axis arrow navigation in menus and lists.
 * **ArrowDown** / **ArrowUp** traverse items; **Page Up** / **Page Down** skip multiple items
 * when `pageStep` is set (in this demo, `pageStep: 2`).
 *
 * One control uses `aria-disabled="true"` instead of native `disabled` so it stays focusable
 * while arrow keys move through the list — native `disabled` removes focusability and would
 * block reaching items after it.
 *
 * ```typescript
 * this.navigation = new FocusgroupNavigationController(this, {
 *   direction: 'vertical',
 *   wrap: true,
 *   pageStep: 2,
 *   skipDisabled: false,
 *   getItems: () =>
 *     Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
 * });
 * ```
 */
export const VerticalMenu: Story = {
  render: () => html`
    <demo-focusgroup-vertical
      role="menu"
      aria-label="Edit menu"
    ></demo-focusgroup-vertical>
  `,
  tags: ['behaviors'],
  parameters: { 'section-order': 3 },
};

/**
 * With `skipDisabled: true`, items stay in the DOM (for layout or screen-reader context), but
 * both native **`disabled`** and **`aria-disabled="true"`** items are removed from the roving
 * tab stop and from arrow movement. In this demo, **Save** (`disabled`) and **Close**
 * (`aria-disabled="true"`) are skipped; the arrow sequence is **New → Open → Print → Help**.
 *
 * ```typescript
 * this.navigation = new FocusgroupNavigationController(this, {
 *   direction: 'vertical',
 *   wrap: true,
 *   skipDisabled: true,
 *   getItems: () =>
 *     Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
 * });
 * ```
 *
 * ```html
 * <button type="button">New</button>
 * <button type="button">Open</button>
 * <button type="button" disabled>Save</button>
 * <button type="button">Print</button>
 * <button type="button" aria-disabled="true">Close</button>
 * <button type="button">Help</button>
 * ```
 */
export const SkipDisabledMenu: Story = {
  render: () => html`
    <demo-focusgroup-skip-disabled
      role="menu"
      aria-label="File menu (skip disabled)"
    ></demo-focusgroup-skip-disabled>
  `,
  tags: ['behaviors'],
  parameters: { 'section-order': 4 },
};

/**
 * Use `direction: 'grid'` when items are laid out in rows (for example CSS Grid). The controller
 * groups items into rows using bounding rectangles, then maps Arrow keys to cell movement.
 *
 * - **Home** / **End** use visual row-major order (first and last item in that flattened
 *   sequence).
 * - **Ctrl+Home** / **Ctrl+End** jump to the first cell of the top row or the last cell of the
 *   bottom row, which matches rectangular grids and differs from plain **End** only when the last
 *   row has fewer cells than earlier rows.
 * - **Page Up** / **Page Down** move `pageStep` rows at a time (in this demo, `pageStep: 2`);
 *   the focused column index is clamped when a row has fewer cells (same rule as **ArrowUp** /
 *   **ArrowDown**).
 *
 * ```typescript
 * this.navigation = new FocusgroupNavigationController(this, {
 *   direction: 'grid',
 *   wrap: false,
 *   pageStep: 2,
 *   getItems: () =>
 *     Array.from(this.renderRoot.querySelectorAll<HTMLElement>('.grid button')),
 * });
 * ```
 */
export const Grid: Story = {
  render: () => html`
    <demo-focusgroup-grid></demo-focusgroup-grid>
  `,
  tags: ['behaviors'],
  parameters: { 'section-order': 5 },
};

/**
 * **`setActiveItem(element)`** updates roving `tabindex` to a chosen eligible item only; it does
 * **not** call `focus()`. Returns `false` if the element is not eligible (not in `getItems()` or
 * skipped by `skipDisabled`). Call **`getActiveItem()?.focus()`** afterward to move focus.
 *
 * When invoked from a trigger `click`, defer `focus()` with **`queueMicrotask`** so the browser
 * does not move focus back to the clicked element after your handler returns:
 *
 * ```typescript
 * const el = this.renderRoot.querySelector<HTMLElement>('[data-item="c"]');
 * if (el && this.navigation.setActiveItem(el)) {
 *   queueMicrotask(() => {
 *     el.focus();
 *   });
 * }
 * ```
 */
export const ProgrammaticFocus: Story = {
  render: () => html`
    <demo-focusgroup-programmatic
      focus-target="c"
    ></demo-focusgroup-programmatic>
  `,
  tags: ['behaviors'],
  parameters: { 'section-order': 6 },
};

/**
 * **`focusFirstItemByTextPrefix(prefix)`** updates roving `tabindex` to the first eligible item
 * whose typeahead label starts with `prefix` (case-insensitive), in `getItems()` order. Matching
 * uses each item's typeahead label — trimmed **`aria-label`** if set, otherwise text from
 * **`aria-labelledby`** references (in order), otherwise trimmed **`textContent`**. Only
 * **eligible** items are considered (respects **`skipDisabled`**). The first match in
 * `getItems()` order becomes the roving tab stop; **`focus()` is not called** by the controller.
 *
 * Move focus yourself on **`getActiveItem()`**. From a **`click`** handler on another control,
 * defer `focus()` with **`queueMicrotask`** (or similar) so the browser does not move focus back
 * to the clicked element after your handler returns.
 *
 * ```typescript
 * // Example: after the user types into your menu search buffer `buffer`
 * if (this.navigation.focusFirstItemByTextPrefix(buffer)) {
 *   queueMicrotask(() => {
 *     this.navigation.getActiveItem()?.focus();
 *   });
 * }
 * ```
 */
export const TextPrefixFocus: Story = {
  render: () => html`
    <demo-focusgroup-text-prefix></demo-focusgroup-text-prefix>
  `,
  tags: ['behaviors'],
  parameters: {
    'section-order': 7,
  },
};

/**
 * ### Methods
 *
 * | Member | Description |
 * |---|---|
 * | `setOptions(partial)` | Merge new options and reapply roving tabindex. |
 * | `refresh()` | Re-query items and sync tabindex (call after DOM changes). |
 * | `setActiveItem(element)` | Set roving `tabindex` to the given eligible item (does **not** call `focus()`). Returns `false` if ineligible. |
 * | `focusFirstItemByTextPrefix(prefix)` | Set roving `tabindex` to the first eligible item matching prefix (case-insensitive). Does **not** call `focus()`. Returns `false` if no match. |
 * | `getActiveItem()` | Returns the eligible item with `tabindex="0"`, if any. |
 * ### Events
 *
 * The controller dispatches **`swc-focusgroup-navigation-active-change`**
 * (`focusgroupNavigationActiveChange`) on the host with `detail: { activeElement }` when the
 * active item changes. The event bubbles and is composed.
 *
 * ```typescript
 * import { focusgroupNavigationActiveChange } from
 *   '@spectrum-web-components/core/controllers/focusgroup-navigation-controller.js';
 *
 * host.addEventListener(focusgroupNavigationActiveChange, (event) => {
 *   console.log('Active item:', event.detail.activeElement);
 * });
 * ```
 *
 * ### Options
 *
 * | Option | Type | Default | Description |
 * |---|---|---|---|
 * | `getItems` | `() => HTMLElement[]` | (required) | Current navigable items. |
 * | `direction` | `'horizontal'` \| `'vertical'` \| `'both'` \| `'grid'` | (required) | Arrow-key mode. **`both`**: Left/Right and Up/Down on the same `getItems()` sequence. |
 * | `wrap` | `boolean` | `false` | Wrap at ends. |
 * | `memory` | `boolean` | `true` | Remember last focused for re-entry via Tab. |
 * | `skipDisabled` | `boolean` | `false` | Skip `disabled` / `aria-disabled="true"` items. |
 * | `pageStep` | `number` | — | Non-zero: **Page Up** / **Page Down** move this many items (linear) or rows (**grid**). `0` / omitted / non-finite: disabled. |
 * | `onActiveItemChange` | `(el) => void` | — | Callback when active item changes. |
 *
 * See the Controls table above for interactive demos of the configurable options.
 */
export const API: Story = {
  tags: ['api', 'description-only'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `FocusgroupNavigationController` implements several accessibility features:
 *
 * #### Roving tabindex
 *
 * Collapses a composite widget to a single Tab stop by managing `tabindex="0"` on the active
 * item and `tabindex="-1"` on all others. This follows the
 * [APG roving tabindex pattern](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#managingfocuswithincomponentsusingarovingtabindex).
 *
 * #### Keyboard navigation
 *
 * - <kbd>ArrowLeft</kbd> / <kbd>ArrowRight</kbd>: Move focus in horizontal and both modes
 * - <kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd>: Move focus in vertical, both, and grid modes
 * - <kbd>Home</kbd>: Jump to first item (row-major order for grid)
 * - <kbd>End</kbd>: Jump to last item (row-major order for grid)
 * - <kbd>Ctrl+Home</kbd>: First cell of first row (grid only)
 * - <kbd>Ctrl+End</kbd>: Last cell of last row (grid only)
 * - <kbd>Page Up</kbd> / <kbd>Page Down</kbd>: Move `pageStep` items or rows
 *
 * #### Disabled item handling
 *
 * - With `skipDisabled: false` (default): disabled items remain focusable so keyboard users can
 *   discover them
 * - With `skipDisabled: true`: disabled items are excluded from navigation entirely
 *
 * #### RTL and writing modes
 *
 * - For `horizontal`, **ArrowLeft** / **ArrowRight** follow the host's resolved `dir` (`rtl`
 *   swaps forward/back).
 * - For `both`, **ArrowLeft** / **ArrowRight** follow `dir` the same way, while **ArrowUp** /
 *   **ArrowDown** always step backward / forward in `getItems()` order.
 * - In `grid` mode, vertical movement uses row geometry; column movement respects `dir` for
 *   left/right.
 *
 * ### Best practices
 *
 * - Always provide appropriate ARIA `role` on the host (`toolbar`, `menu`, `grid`, `listbox`,
 *   etc.) — the controller does not set roles
 * - Always provide `aria-label` or `aria-labelledby` on the host element
 * - Use `aria-disabled="true"` instead of native `disabled` when items should remain focusable
 *   for discoverability
 * - Use `skipDisabled: true` only when disabled items should be completely unreachable via
 *   keyboard
 * - Call `refresh()` after any DOM change that adds or removes items from the group
 */
export const Accessibility: Story = {
  tags: ['a11y', 'description-only'],
};

/**
 * ### Relationship to native `focusgroup`
 *
 * Native `focusgroup` would supply guaranteed tab stops, memory, and arrow behavior in the
 * browser. This controller provides a **JavaScript** implementation for custom elements: you keep
 * explicit ARIA roles and selection logic, and use the controller for tabindex and arrow-key
 * focus movement.
 *
 * ### See also
 *
 * - [Keyboard navigation inside components (APG)](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)
 * - [Focusgroup explainer (Open UI)](https://open-ui.org/components/scoped-focusgroup.explainer/)
 */
export const Appendix: Story = {
  tags: ['description-only', 'appendix'],
};
