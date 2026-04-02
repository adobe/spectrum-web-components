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
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '../index.js';

// ────────────────
//    METADATA
// ────────────────

const {
  args: ceArgs,
  argTypes: ceArgTypes,
  template,
} = getStorybookHelpers('swc-message-feedback');

const args = { ...ceArgs } as Record<string, unknown>;
const argTypes = { ...ceArgTypes } as Record<string, unknown>;

argTypes.selection = {
  ...(argTypes.selection as object),
  control: { type: 'select' },
  options: ['none', 'thumb-up', 'thumb-down'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'none' },
  },
};

/**
 * Binary thumbs-up / thumbs-down feedback control placed below an AI response.
 * Selecting the active option again toggles it back to `none`.
 *
 * Prefer **`template(args)`** (or **`docs.source`**) so the docs code panel shows HTML.
 */
const meta: Meta = {
  title: 'Conversational AI/Message feedback',
  component: 'swc-message-feedback',
  args: args as Meta['args'],
  argTypes: argTypes as Meta['argTypes'],
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Binary thumbs-up / thumbs-down feedback control.',
    },
    /* Centers the thumbs in the Storybook canvas (not baked into the component). */
    layout: 'centered',
  },
  excludeStories: ['meta'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    selection: 'none',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {
    selection: 'none',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A message feedback control consists of two quiet icon buttons:
 *
 * 1. **Thumbs-up** — "Good response"
 * 2. **Thumbs-down** — "Poor response"
 *
 * The selected button renders with a dark filled background.
 */
export const Anatomy: Story = {
  args: {
    selection: 'none',
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `selection` attribute controls which button appears selected:
 *
 * - **`none`** — Neither button selected (default)
 * - **`thumb-up`** — Positive feedback
 * - **`thumb-down`** — Negative feedback
 */
export const Selection: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-feedback selection="none"></swc-message-feedback>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          None
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-feedback selection="thumb-up"></swc-message-feedback>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Thumb up
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-feedback selection="thumb-down"></swc-message-feedback>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Thumb down
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-message-feedback>` element implements the following accessibility features:
 *
 * #### Toggle buttons
 *
 * - The button group uses `role="radiogroup"` with `aria-label="Response feedback"`
 * - Each button carries a descriptive `aria-label`: "Good response" / "Poor response"
 * - Each button uses `aria-pressed` to communicate the selected state
 * - With `show-tooltips` (default), Spectrum **Tooltip (M)**-style labels appear on hover and keyboard focus; tooltip text is `aria-hidden` because the name is already on the button
 * - **Escape** blurs the focused thumb and dispatches **`swc-escape`** (`bubbles`, `composed`) for host-level dismiss or focus management
 */
export const Accessibility: Story = {
  args: {
    selection: 'none',
  },
  tags: ['a11y'],
};
