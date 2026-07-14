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

import '../../suggestion-item/swc-suggestion-item.js';
import '../swc-suggestion-group.js';

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
    'heading-slot': '<h3 slot="heading">What would you like to do next?</h3>',
  },
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      packagePath: 'patterns/conversational-ai/suggestion',
      subtitle: 'Follow-up suggestion group for an AI response.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export { meta };
export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <swc-suggestion-group>
      <h3 slot="heading">What would you like to do next?</h3>
      <swc-suggestion-item>Create a slide deck from this</swc-suggestion-item>
      <swc-suggestion-item>Summarize in 3 bullet points</swc-suggestion-item>
      <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
    </swc-suggestion-group>
  `,
  tags: ['dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  render: () => html`
    <swc-suggestion-group>
      <h3 slot="heading">What would you like to do next?</h3>
      <swc-suggestion-item>Create a slide deck from this</swc-suggestion-item>
      <swc-suggestion-item>Summarize in 3 bullet points</swc-suggestion-item>
      <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
    </swc-suggestion-group>
  `,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

export const Anatomy: Story = {
  args: {
    'heading-slot': '<h3 slot="heading">What would you like to do next?</h3>',
    'default-slot': threeSuggestionItems,
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const SuggestionCount: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-group>
          <h3 slot="heading">What would you like to do next?</h3>
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
        </swc-suggestion-group>
        <span class="swc-Detail swc-Detail--sizeS">One suggestion</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-group>
          <h3 slot="heading">What would you like to do next?</h3>
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
          <swc-suggestion-item>
            Summarize in 3 bullet points
          </swc-suggestion-item>
          <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
        </swc-suggestion-group>
        <span class="swc-Detail swc-Detail--sizeS">
          Three suggestions (recommended)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-group>
          <h3 slot="heading">What would you like to do next?</h3>
          <swc-suggestion-item>
            Refine the executive summary
          </swc-suggestion-item>
          <swc-suggestion-item>Add competitive analysis</swc-suggestion-item>
          <swc-suggestion-item>Shorten for a 5-minute read</swc-suggestion-item>
          <swc-suggestion-item>Export as talking points</swc-suggestion-item>
          <swc-suggestion-item>Suggest a subject line</swc-suggestion-item>
        </swc-suggestion-group>
        <span class="swc-Detail swc-Detail--sizeS">
          Five suggestions (wraps)
        </span>
      </div>
    </div>
  `,
  tags: ['options'],
};

export const Heading: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-group>
          <h3 slot="heading">What would you like to do next?</h3>
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
          <swc-suggestion-item>
            Summarize in 3 bullet points
          </swc-suggestion-item>
          <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
        </swc-suggestion-group>
        <span class="swc-Detail swc-Detail--sizeS">Default heading</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-group>
          <h2 slot="heading">Suggested next actions</h2>
          <swc-suggestion-item>
            Create a slide deck from this
          </swc-suggestion-item>
          <swc-suggestion-item>
            Summarize in 3 bullet points
          </swc-suggestion-item>
          <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
        </swc-suggestion-group>
        <span class="swc-Detail swc-Detail--sizeS">
          Custom semantics (h2 heading slot)
        </span>
      </div>
    </div>
  `,
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  args: {
    'heading-slot': '<h3 slot="heading">What would you like to do next?</h3>',
    'default-slot': threeSuggestionItems,
  },
  tags: ['a11y'],
};
