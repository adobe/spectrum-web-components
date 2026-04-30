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
 * A suggestion item consists of:
 *
 * 1. **Leading icon** — Curved-arrow glyph
 * 2. **Label** — Consumer-provided default-slot content
 */
export const Anatomy: Story = {
  args: {
    'default-slot': 'Create a slide deck from this',
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Suggestion item labels come from default-slot content and can vary in length.
 */
export const Labels: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-item>Short action</swc-suggestion-item>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          Short label
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-suggestion-item>
          Create a year-over-year growth chart for the next decade
        </swc-suggestion-item>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          Long label
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
 * The `<swc-suggestion-item>` element implements:
 *
 * - Native `<button>` interaction semantics
 * - Keyboard activation via <kbd>Enter</kbd> and <kbd>Space</kbd>
 * - Bubbled `swc-suggestion` custom event on activation
 */
export const Accessibility: Story = {
  args: {
    'default-slot': 'Create a slide deck from this',
  },
  tags: ['a11y'],
};
