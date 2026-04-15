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

import '../../suggestion-item/index.js';
import '../index.js';

// ────────────────
//    METADATA
// ────────────────

/** Default-slot HTML for three suggestion items (recommended count in docs). */
const threeSuggestionItems =
  `<swc-suggestion-item>Create a slide deck from this</swc-suggestion-item>` +
  `<swc-suggestion-item>Summarize in 3 bullet points</swc-suggestion-item>` +
  `<swc-suggestion-item>Translate to Spanish</swc-suggestion-item>`;

const { args, argTypes, template } = getStorybookHelpers('swc-suggestion');

/**
 * Follow-up suggestion group for an AI response.
 * Put one or more `<swc-suggestion-item>` elements in the default slot.
 */
const meta: Meta = {
  title: 'Conversational AI/Suggestion',
  component: 'swc-suggestion',
  args: {
    ...args,
    'default-slot': threeSuggestionItems,
    title: '',
  },
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Follow-up suggestion group for an AI response.',
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
 * A suggestion group consists of:
 *
 * 1. **Title** — Optional heading via the `title` property
 * 2. **Items** — One or more slotted `<swc-suggestion-item>` actions
 */
export const Anatomy: Story = {
  args: {
    title: 'What would you like to do next?',
    'default-slot': threeSuggestionItems,
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Suggestion count follows the number of `<swc-suggestion-item>` elements.
 */
export const SuggestionCount: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion>
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
        </swc-suggestion>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          One suggestion
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion>
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
          <swc-suggestion-item>
            Summarize in 3 bullet points
          </swc-suggestion-item>
          <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
        </swc-suggestion>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Three suggestions (recommended)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion>
          <swc-suggestion-item>
            Refine the executive summary
          </swc-suggestion-item>
          <swc-suggestion-item>Add competitive analysis</swc-suggestion-item>
          <swc-suggestion-item>Shorten for a 5-minute read</swc-suggestion-item>
          <swc-suggestion-item>Export as talking points</swc-suggestion-item>
          <swc-suggestion-item>Suggest a subject line</swc-suggestion-item>
        </swc-suggestion>
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
 * When `title` is provided, a heading appears above the item row.
 */
export const Title: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion>
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
          <swc-suggestion-item>
            Summarize in 3 bullet points
          </swc-suggestion-item>
          <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
        </swc-suggestion>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          No title
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion title="What would you like to do next?">
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
          <swc-suggestion-item>
            Summarize in 3 bullet points
          </swc-suggestion-item>
          <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
        </swc-suggestion>
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
 * The `<swc-suggestion>` group and `<swc-suggestion-item>` controls implement:
 *
 * - Native `<button>` semantics per suggestion item
 * - Group labeling via `role="group"` and `aria-label="Follow-up suggestions"`
 * - Item click event bubbling from each `<swc-suggestion-item>`
 */
export const Accessibility: Story = {
  args: {
    'default-slot': threeSuggestionItems,
  },
  tags: ['a11y'],
};
