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
  'swc-conversation-artifact-card'
);

const demoSlots = {
  'leading-slot':
    '<div slot="leading" style="inline-size:44px;block-size:44px;border-radius:4px;background:var(--swc-gray-200);" role="img" aria-label="PDF"></div>',
  'title-slot': '<span slot="title">Hilton commercial assets</span>',
  'subtitle-slot': '<span slot="subtitle">PDF file</span>',
};

/**
 * Horizontal file-style attachment layout for conversational AI surfaces.
 * Use inside `swc-user-message` (`content="card"`), `swc-prompt-field` (`uploaded-artifact="card"`), or any attachment surface.
 * Dismiss is owned by the host, not this component.
 */
const meta: Meta = {
  title: 'Conversational AI/Conversation artifact card',
  component: 'swc-conversation-artifact-card',
  args: { ...args, ...demoSlots },
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle:
        'Horizontal attachment row with leading visual, title, subtitle, and optional actions.',
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
 * ### Slots
 *
 * - **`leading`** — File-type icon or thumbnail
 * - **`title`** — Primary label (for example file name)
 * - **`subtitle`** — Secondary line (for example type or date)
 */
export const Anatomy: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:24px;max-inline-size:420px;"
    >
      <swc-conversation-artifact-card>
        <div
          slot="leading"
          style="inline-size:44px;block-size:44px;border-radius:4px;background:var(--swc-gray-200);"
          role="img"
          aria-label="PDF"
        ></div>
        <span slot="title">Hotel concept deck</span>
        <span slot="subtitle">PDF file</span>
      </swc-conversation-artifact-card>
      <swc-conversation-artifact-card>
        <div
          slot="leading"
          style="inline-size:44px;block-size:44px;border-radius:4px;background:var(--swc-gray-200);"
          role="img"
          aria-label="Project"
        ></div>
        <span slot="title">Hilton commercial assets</span>
        <span slot="subtitle">Shared project</span>
      </swc-conversation-artifact-card>
    </div>
  `,
  tags: ['anatomy'],
  parameters: { flexLayout: true },
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

/**
 * ### Best practices
 *
 * - Provide a text label via **`title`** (and optional **`subtitle`**)
 * - Give **`leading`** meaningful **`alt`** text if it is an image, or **`aria-label`** on a decorative placeholder
 */
export const Accessibility: Story = {
  args: {
    ...demoSlots,
    'title-slot': '<span slot="title">Quarterly brand review</span>',
    'subtitle-slot': '<span slot="subtitle">PDF file</span>',
  },
  tags: ['a11y'],
};
