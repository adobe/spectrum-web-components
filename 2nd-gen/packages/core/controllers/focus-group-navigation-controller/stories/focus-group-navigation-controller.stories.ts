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

// ─────────────────────────
//     STORYBOOK
// ─────────────────────────

/**
 * Storybook metadata: documentation body comes from `focus-group-navigation-controller.md`.
 */
const meta: Meta = {
  title: 'Core/Controllers/Focus group navigation controller',
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: `Roving tabindex and directional keys for composite widgets (APG-aligned, focusgroup-like).`,
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Inline-axis arrows move between formatting controls; Tab yields one stop for the group.
 */
export const HorizontalToolbar: Story = {
  render: () => html`
    <demo-focusgroup-horizontal
      role="toolbar"
      aria-label="Text formatting"
    ></demo-focusgroup-horizontal>
  `,
};

/**
 * **ArrowLeft** / **ArrowRight** and **ArrowUp** / **ArrowDown** all move along the same
 * control order (LTR: Right and Down advance, Left and Up go back). Useful when layout is
 * horizontal but users expect vertical arrow keys to work as well.
 */
export const BothAxesLinear: Story = {
  render: () => html`
    <demo-focusgroup-both-axes
      role="toolbar"
      aria-label="Segmented controls"
    ></demo-focusgroup-both-axes>
  `,
};

/**
 * Block-axis arrows traverse menu-like items; **Page Up** / **Page Down** skip two items.
 * One control uses `aria-disabled` (not native `disabled`) so it stays focusable and items
 * after it remain reachable.
 */
export const VerticalMenu: Story = {
  render: () => html`
    <demo-focusgroup-vertical
      role="menu"
      aria-label="Edit menu"
    ></demo-focusgroup-vertical>
  `,
};

/**
 * With `skipDisabled: true`, **Save** (`disabled`) and **Close** (`aria-disabled="true"`) are
 * left out of the tab order and arrow sequence; **New**, **Open**, **Print**, and **Help** are
 * all reachable with **ArrowDown** / **ArrowUp** (wrap on).
 */
export const SkipDisabledMenu: Story = {
  render: () => html`
    <demo-focusgroup-skip-disabled
      role="menu"
      aria-label="File menu (skip disabled)"
    ></demo-focusgroup-skip-disabled>
  `,
};

/**
 * Arrow keys move across a 3×3 grid; **Page Up** / **Page Down** move two rows at a time.
 * **Home** / **End** jump to the first and last cell in row-major order; **Ctrl+Home** /
 * **Ctrl+End** jump to the first cell of the first row and the last cell of the last row
 * (equivalent here to cells **1** and **9**).
 */
export const Grid: Story = {
  render: () => html`
    <demo-focusgroup-grid></demo-focusgroup-grid>
  `,
};

/**
 * Demo calls \`setActiveItem\` then \`focus()\` so the roving tab stop matches keyboard navigation.
 */
export const ProgrammaticFocus: Story = {
  render: () => html`
    <demo-focusgroup-programmatic
      focus-target="c"
    ></demo-focusgroup-programmatic>
  `,
};

/**
 * The controller's **focusFirstItemByTextPrefix** only syncs roving `tabindex` to the first label
 * match; the demo triggers then call `focus()` on {@link FocusgroupNavigationController.getActiveItem}
 * in a microtask. Call the same pattern from application code (for example on `keydown` for typeahead).
 */
export const TextPrefixFocus: Story = {
  render: () => html`
    <demo-focusgroup-text-prefix></demo-focusgroup-text-prefix>
  `,
};
