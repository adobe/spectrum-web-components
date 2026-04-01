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

const { args, argTypes, template } = getStorybookHelpers('swc-response-status');

argTypes.state = {
  ...argTypes.state,
  control: { type: 'select' },
  options: ['loading', 'complete'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'loading' },
  },
};

argTypes.reasoning = {
  ...argTypes.reasoning,
  control: { type: 'select' },
  options: ['hidden', 'collapsed', 'expanded'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'hidden' },
  },
};

/**
 * Displays the current state of AI response generation — either a spinning
 * loading indicator or a "Response generated" confirmation.
 *
 * Stories use **`template(args)`** (or explicit **`docs.source`**) so the docs code panel
 * shows HTML instead of a dumped CSF object.
 */
const meta: Meta = {
  title: 'Conversational AI/Response status',
  component: 'swc-response-status',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'AI response generation status indicator.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    state: 'loading',
    reasoning: 'hidden',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {
    state: 'loading',
    reasoning: 'hidden',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A response status indicator consists of:
 *
 * 1. **Status row** — An animated spinner (loading) or checkmark (complete) with a label
 * 2. **Reasoning toggle** — Optional expandable disclosure for chain-of-thought content
 */
export const Anatomy: Story = {
  args: {
    state: 'loading',
    reasoning: 'hidden',
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `state` attribute controls which indicator is shown:
 *
 * - **`loading`** — Animated spinner + "Thinking…" label
 * - **`complete`** — Checkmark + "Response generated" label
 */
export const State: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status state="loading"></swc-response-status>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Loading
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status state="complete"></swc-response-status>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Complete
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

/**
 * When `state` is **`complete`**, set **`reasoning`** to **`collapsed`** or **`expanded`** to show the disclosure.
 * The component toggles between those two on click and keeps the **`reasoning`** attribute in sync. Use **`expanded`**
 * for an initially open panel. While **`state`** is **`loading`**, reasoning UI is not shown.
 */
export const Reasoning: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status
          state="complete"
          reasoning="collapsed"
        ></swc-response-status>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Reasoning collapsed
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status state="complete" reasoning="expanded">
          <span slot="reasoning">
            Step 1: Analyzing the request… Step 2: Searching for relevant
            context… Step 3: Composing response.
          </span>
        </swc-response-status>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Reasoning expanded
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 2 },
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-response-status>` element implements the following accessibility features:
 *
 * #### Status announcement
 *
 * - The spinner element carries `role="status"` and `aria-label="Thinking"` for screen reader announcement
 * - The reasoning toggle uses `aria-expanded` and `aria-controls` to communicate panel state
 * - The reasoning panel uses `role="region"` with `aria-label="Reasoning"`
 */
export const Accessibility: Story = {
  args: {
    state: 'complete',
    reasoning: 'collapsed',
  },
  tags: ['a11y'],
};
