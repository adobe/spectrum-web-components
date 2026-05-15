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

delete (args as Record<string, unknown>).state;
delete (args as Record<string, unknown>).reasoning;
delete (argTypes as Record<string, unknown>).state;
delete (argTypes as Record<string, unknown>).reasoning;

argTypes.loading = {
  ...argTypes.loading,
  control: { type: 'boolean' },
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

argTypes.open = {
  ...argTypes.open,
  control: { type: 'boolean' },
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

argTypes.loadingLabel = {
  ...argTypes.loadingLabel,
  control: { type: 'text' },
  table: {
    category: 'attributes',
    defaultValue: { summary: 'Generating response' },
  },
};

argTypes.completeLabel = {
  ...argTypes.completeLabel,
  control: { type: 'text' },
  table: {
    category: 'attributes',
    defaultValue: { summary: 'Response generated' },
  },
};

/**
 * Displays AI response progress with an indeterminate progress circle and optional reasoning disclosure.
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

export { meta };
export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    loading: true,
    open: false,
    loadingLabel: 'Generating response',
    completeLabel: 'Response generated',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {
    loading: true,
    open: false,
    loadingLabel: 'Generating response',
    completeLabel: 'Response generated',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A response status indicator consists of:
 *
 * 1. **Status row** — An indeterminate progress circle (loading) or checkmark (complete) with a label
 * 2. **Reasoning toggle** — Optional expandable disclosure for chain-of-thought content
 */
export const Anatomy: Story = {
  args: {
    loading: true,
    open: false,
    loadingLabel: 'Generating response',
    completeLabel: 'Response generated',
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `loading` attribute controls which indicator is shown:
 *
 * - **`loading=true`** — Indeterminate progress circle + "Thinking…" label
 * - **`loading=false`** — Checkmark + "Response generated" label
 * - Set `loading-label` or `complete-label` to customize row text per state
 */
export const Loading: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status loading></swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">Loading</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status>
          I grouped your request into a presentation outline and prioritized key
          business messages.
        </swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">
          Complete (default label)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status complete-label="Ready">
          I grouped your request into a presentation outline and prioritized key
          business messages.
        </swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">
          Complete (custom label)
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

/**
 * Set **`open`** to control reasoning disclosure:
 *
 * - **`open=false`** — reasoning collapsed
 * - **`open=true`** — reasoning expanded
 *
 * The disclosure chevron only appears when default-slot reasoning content exists.
 * While **`loading=true`**, reasoning UI is not shown.
 * If reasoning slot content is later removed, the component automatically resets
 * `open` to `false`. This internal collapse does not emit `swc-response-status-toggle`.
 */
export const Reasoning: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status></swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">
          Complete without reasoning content (no disclosure chevron)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status>
          I grouped your request into a presentation outline and prioritized key
          business messages.
        </swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">Reasoning collapsed</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status open>
          Step 1: Analyzing the request… Step 2: Searching for relevant context…
          Step 3: Composing response.
        </swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">Reasoning expanded</span>
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
 * - The loading row carries `role="status"`, so the status label is announced for screen readers
 * - When reasoning content exists, the reasoning toggle uses `aria-expanded` and `aria-controls` to communicate panel state
 * - The reasoning panel uses `role="group"` with `aria-label="Reasoning"`
 */
export const Accessibility: Story = {
  args: {
    loading: false,
    open: false,
    loadingLabel: 'Thinking…',
    completeLabel: 'Response generated',
    'default-slot':
      'I grouped your request into a presentation outline and prioritized key business messages.',
  },
  tags: ['a11y'],
};
