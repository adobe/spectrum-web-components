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

/** Default-slot HTML for three chips (recommended count in docs). */
const threeChipsSlot = `<span>Create a slide deck from this</span><span>Summarize in 3 bullet points</span><span>Translate to Spanish</span>`;

const { args, argTypes, template } = getStorybookHelpers(
  'swc-message-suggestions'
);

/**
 * Follow-up suggestion chips for an AI response. Put **any number** of elements in the
 * **default slot** (one per chip); labels come from each element’s **`textContent`**.
 *
 * **Recommendation:** use **three** suggestions for most layouts; more are supported and
 * wrap to additional rows (`flex-wrap`).
 *
 * Stories use **`getStorybookHelpers` `template(args)`** so the docs **Source** panel shows
 * HTML (Storybook’s `docs.source.type: 'auto'` often fails on raw `render: () => html`… with
 * nested slotted children and falls back to dumping the CSF object).
 */
const meta: Meta = {
  title: 'Conversational AI/Message suggestions',
  component: 'swc-message-suggestions',
  args: {
    ...args,
    'default-slot': threeChipsSlot,
    showTitle: false,
  },
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Follow-up suggestion chips for an AI response.',
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
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A message suggestions component consists of:
 *
 * 1. **Title** — Optional "What would you like to do next?" heading (`show-title`)
 * 2. **Chips** — One rounded button per **default-slot** child; arrow icon + label from `textContent`
 */
export const Anatomy: Story = {
  args: {
    showTitle: true,
    'default-slot': threeChipsSlot,
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Chip count follows the number of **default-slot** children. Three is a good default for
 * scanning; one, many, or zero (empty row) are all valid.
 */
export const SuggestionCount: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-suggestions>
          <span>Create a slide deck from this</span>
        </swc-message-suggestions>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          One suggestion
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-suggestions>
          <span>Create a slide deck from this</span>
          <span>Summarize in 3 bullet points</span>
          <span>Translate to Spanish</span>
        </swc-message-suggestions>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Three suggestions (recommended)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-suggestions>
          <span>Refine the executive summary</span>
          <span>Add competitive analysis</span>
          <span>Shorten for a 5-minute read</span>
          <span>Export as talking points</span>
          <span>Suggest a subject line</span>
        </swc-message-suggestions>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Five suggestions (wraps)
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

/**
 * When `show-title` is set, a "What would you like to do next?" heading appears
 * above the chips row.
 */
export const Title: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-suggestions>
          <span>Create a slide deck from this</span>
          <span>Summarize in 3 bullet points</span>
          <span>Translate to Spanish</span>
        </swc-message-suggestions>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          No title
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-suggestions show-title>
          <span>Create a slide deck from this</span>
          <span>Summarize in 3 bullet points</span>
          <span>Translate to Spanish</span>
        </swc-message-suggestions>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          With title
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
 * The `<swc-message-suggestions>` element implements the following accessibility features:
 *
 * #### Chip buttons
 *
 * - Each chip is a native `<button>` element, fully keyboard-navigable
 * - The icon within each chip has an empty `label` to avoid duplicate announcements
 * - Button text is the suggestion label (from slotted `textContent`)
 * - The chips row uses `role="group"` with `aria-label="Follow-up suggestions"`
 */
export const Accessibility: Story = {
  tags: ['a11y'],
};
