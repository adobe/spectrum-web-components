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

const { args, argTypes, template } = getStorybookHelpers(
  'swc-message-suggestions'
);

argTypes.suggestions = {
  ...argTypes.suggestions,
  control: { type: 'select' },
  options: ['1', '2', '3'],
  table: {
    category: 'attributes',
    defaultValue: { summary: '3' },
  },
};

/**
 * A row of up to three follow-up suggestion chips rendered below an AI response.
 * Slot text into `suggestion-1`, `suggestion-2`, and `suggestion-3` named slots.
 */
const meta: Meta = {
  title: 'Conversational AI/Message suggestions',
  component: 'swc-message-suggestions',
  args,
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
  args: {
    suggestions: '3',
    'show-title': false,
    'slot-suggestion-1': 'Create a slide deck from this',
    'slot-suggestion-2': 'Summarize this in 3 bullet points',
    'slot-suggestion-3': 'Translate this to Spanish',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  render: () => html`
    <swc-message-suggestions suggestions="3">
      <span slot="suggestion-1">Create a slide deck from this</span>
      <span slot="suggestion-2">Summarize in 3 bullet points</span>
      <span slot="suggestion-3">Translate to Spanish</span>
    </swc-message-suggestions>
  `,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A message suggestions component consists of:
 *
 * 1. **Title** — Optional "What would you like to do next?" heading (hidden by default)
 * 2. **Chips** — Up to three rounded buttons, each with an arrow icon and slot text
 */
export const Anatomy: Story = {
  render: () => html`
    <swc-message-suggestions suggestions="3" show-title>
      <span slot="suggestion-1">Create a slide deck from this</span>
      <span slot="suggestion-2">Summarize in 3 bullet points</span>
      <span slot="suggestion-3">Translate to Spanish</span>
    </swc-message-suggestions>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `suggestions` attribute controls how many chips are rendered:
 *
 * - **`1`** — One chip
 * - **`2`** — Two chips
 * - **`3`** — Three chips (default)
 */
export const SuggestionCount: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-suggestions suggestions="1">
          <span slot="suggestion-1">Create a slide deck from this</span>
        </swc-message-suggestions>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          1 suggestion
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-suggestions suggestions="2">
          <span slot="suggestion-1">Create a slide deck from this</span>
          <span slot="suggestion-2">Summarize in 3 bullet points</span>
        </swc-message-suggestions>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          2 suggestions
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-suggestions suggestions="3">
          <span slot="suggestion-1">Create a slide deck from this</span>
          <span slot="suggestion-2">Summarize in 3 bullet points</span>
          <span slot="suggestion-3">Translate to Spanish</span>
        </swc-message-suggestions>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          3 suggestions
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
        <swc-message-suggestions suggestions="3">
          <span slot="suggestion-1">Create a slide deck from this</span>
          <span slot="suggestion-2">Summarize in 3 bullet points</span>
          <span slot="suggestion-3">Translate to Spanish</span>
        </swc-message-suggestions>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          No title
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-suggestions suggestions="3" show-title>
          <span slot="suggestion-1">Create a slide deck from this</span>
          <span slot="suggestion-2">Summarize in 3 bullet points</span>
          <span slot="suggestion-3">Translate to Spanish</span>
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
 * - Slot text provides the accessible name for each chip
 */
export const Accessibility: Story = {
  render: () => html`
    <swc-message-suggestions suggestions="3">
      <span slot="suggestion-1">Create a slide deck from this</span>
      <span slot="suggestion-2">Summarize in 3 bullet points</span>
      <span slot="suggestion-3">Translate to Spanish</span>
    </swc-message-suggestions>
  `,
  tags: ['a11y'],
};
