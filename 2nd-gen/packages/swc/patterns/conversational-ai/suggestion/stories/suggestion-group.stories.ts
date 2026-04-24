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

const { args, argTypes, template } = getStorybookHelpers(
  'swc-suggestion-group'
);

/**
 * Follow-up suggestion group for an AI response.
 * Put one or more `<swc-suggestion-item>` elements in the default slot.
 */
const meta: Meta = {
  title: 'Conversational AI/Suggestion group',
  component: 'swc-suggestion-group',
  args: {
    ...args,
    'default-slot': threeSuggestionItems,
    heading: 'What would you like to do next?',
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
 * 1. **Heading** — Optional heading text (configured via the `heading` property)
 * 2. **Items** — One or more slotted `<swc-suggestion-item>` actions
 */
export const Anatomy: Story = {
  args: {
    heading: 'What would you like to do next?',
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
        <swc-suggestion-group heading="What would you like to do next?">
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
        </swc-suggestion-group>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          One suggestion
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-group heading="What would you like to do next?">
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
          <swc-suggestion-item>
            Summarize in 3 bullet points
          </swc-suggestion-item>
          <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
        </swc-suggestion-group>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          Three suggestions (recommended)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-group heading="What would you like to do next?">
          <swc-suggestion-item>
            Refine the executive summary
          </swc-suggestion-item>
          <swc-suggestion-item>Add competitive analysis</swc-suggestion-item>
          <swc-suggestion-item>Shorten for a 5-minute read</swc-suggestion-item>
          <swc-suggestion-item>Export as talking points</swc-suggestion-item>
          <swc-suggestion-item>Suggest a subject line</swc-suggestion-item>
        </swc-suggestion-group>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
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
 * The heading text sits above the suggestion row and can be customized per context.
 */
export const Heading: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-group heading="What would you like to do next?">
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
          <swc-suggestion-item>
            Summarize in 3 bullet points
          </swc-suggestion-item>
          <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
        </swc-suggestion-group>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          Default heading
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-group heading="Suggested next actions">
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
          <swc-suggestion-item>
            Summarize in 3 bullet points
          </swc-suggestion-item>
          <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
        </swc-suggestion-group>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          Custom heading
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
 * The `<swc-suggestion-group>` container and `<swc-suggestion-item>` controls
 * implement:
 *
 * - Native `<button>` semantics per suggestion item
 * - Group labeling via `aria-labelledby` when `heading` is set, otherwise via
 *   configurable `accessible-label`
 * - Item click event bubbling from each `<swc-suggestion-item>`
 */
export const Accessibility: Story = {
  args: {
    heading: 'What would you like to do next?',
    'default-slot': threeSuggestionItems,
  },
  tags: ['a11y'],
};
