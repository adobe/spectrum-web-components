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

import '../swc-suggestion-item.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-suggestion-item');

/**
 * Interactive follow-up chip action used inside `<swc-suggestion-group>`.
 * Label content is provided via the default slot.
 */
const meta: Meta = {
  title: 'Conversational AI/Suggestion group/Suggestion item',
  component: 'swc-suggestion-item',
  args: {
    ...args,
    'default-slot': 'Create a slide deck from this',
  },
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Interactive chip action used in suggestion groups.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
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

export const Anatomy: Story = {
  args: {
    'default-slot': 'Create a slide deck from this',
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Labels: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-item>Short action</swc-suggestion-item>
        <span class="swc-Detail swc-Detail--sizeS">Short label</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-item>
          Create a year-over-year growth chart for the next decade
        </swc-suggestion-item>
        <span class="swc-Detail swc-Detail--sizeS">Long label</span>
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
    'default-slot': 'Create a slide deck from this',
  },
  tags: ['a11y'],
};
