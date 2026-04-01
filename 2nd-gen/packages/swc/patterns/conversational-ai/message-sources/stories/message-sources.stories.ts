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

const { args, argTypes, template } = getStorybookHelpers('swc-message-sources');

const defaultListItems =
  '<li><a href="#">Adobe Experience Manager documentation</a></li><li><a href="#">Creative Cloud release notes 2026</a></li><li><a href="#">Firefly API getting started guide</a></li>';

argTypes.state = {
  ...argTypes.state,
  control: { type: 'select' },
  options: ['collapsed', 'expanded'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'collapsed' },
  },
};

/**
 * A collapsible list of sources that informed an AI response.
 * Slot `<li>` elements into the default slot; they will be numbered automatically.
 */
const meta: Meta = {
  title: 'Conversational AI/Message sources',
  component: 'swc-message-sources',
  args: {
    ...args,
    state: 'collapsed',
    'default-slot': defaultListItems,
  },
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Collapsible list of sources for an AI response.',
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
  args: {
    state: 'expanded',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A message sources component consists of:
 *
 * 1. **Toggle button** — Chevron + "Sources" label, acts as a disclosure button
 * 2. **Sources list** — Numbered list of linked source items (visible when expanded)
 */
export const Anatomy: Story = {
  args: {
    state: 'expanded',
    'default-slot':
      '<li><a href="#">Adobe Experience Manager documentation</a></li><li><a href="#">Creative Cloud release notes 2026</a></li>',
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `state` attribute controls whether the sources list is visible:
 *
 * - **`collapsed`** — Only the toggle button is shown (default)
 * - **`expanded`** — The numbered source list is revealed below the toggle
 */
export const State: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-sources state="collapsed">
          <li><a href="#">Adobe Experience Manager documentation</a></li>
          <li><a href="#">Creative Cloud release notes 2026</a></li>
        </swc-message-sources>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Collapsed
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-sources state="expanded">
          <li><a href="#">Adobe Experience Manager documentation</a></li>
          <li><a href="#">Creative Cloud release notes 2026</a></li>
          <li><a href="#">Firefly API getting started guide</a></li>
        </swc-message-sources>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Expanded
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
 * The `<swc-message-sources>` element implements the following accessibility features:
 *
 * #### Disclosure pattern
 *
 * - The toggle button uses `aria-expanded` to communicate open/closed state
 * - The toggle button uses `aria-controls` pointing to the panel `id`
 * - The sources panel uses `role="list"` with `aria-label="Sources"`
 */
export const Accessibility: Story = {
  args: {
    state: 'expanded',
  },
  tags: ['a11y'],
};
