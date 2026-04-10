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
  'swc-message-feedback'
);

delete (args as Record<string, unknown>).selection;
delete (argTypes as Record<string, unknown>).selection;

argTypes.status = {
  ...argTypes.status,
  control: { type: 'select' },
  options: ['positive', 'negative'],
  table: {
    category: 'attributes',
    defaultValue: { summary: '(unset)' },
  },
};

/**
 * Binary positive / negative feedback control placed below an AI response.
 * This component is controlled: it emits `swc-feedback`, and consumers set `status`.
 */
const meta: Meta = {
  title: 'Conversational AI/Message feedback',
  component: 'swc-message-feedback',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Binary positive / negative feedback control.',
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
  args: {},
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {},
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A message feedback control consists of two quiet radio buttons:
 *
 * 1. **Positive** — "Positive response"
 * 2. **Negative** — "Negative response"
 *
 * The selected button renders with a dark filled background.
 */
export const Anatomy: Story = {
  args: {},
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `status` attribute controls which button appears selected:
 *
 * - **Unset** — Neither option selected (default)
 * - **`positive`** — Positive feedback selected
 * - **`negative`** — Negative feedback selected
 */
export const Status: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-feedback></swc-message-feedback>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Unset
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-feedback status="positive"></swc-message-feedback>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Positive
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-feedback status="negative"></swc-message-feedback>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Negative
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
 * The `<swc-message-feedback>` element implements the following accessibility features:
 *
 * #### Radio buttons
 *
 * - The group uses `role="radiogroup"` with `aria-label="Response feedback"`
 * - Each option uses `role="radio"` with `aria-checked` to communicate selection
 * - Each option carries a descriptive label: "Positive response" / "Negative response"
 */
export const Accessibility: Story = {
  args: {},
  tags: ['a11y'],
};
