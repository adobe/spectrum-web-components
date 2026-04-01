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
  'swc-conversation-artifact-media'
);

const demoSlots = {
  'preview-slot':
    '<div slot="preview" style="inline-size:100%;block-size:140px;background:linear-gradient(135deg,#6366f1,#ec4899);" role="img" aria-label="Preview"></div>',
  'title-slot': '<span slot="title">Hilton commercial assets</span>',
  'subtitle-slot': '<span slot="subtitle">Campaign stills</span>',
};

const withPreviewFrame = (story: () => unknown) => html`
  <div style="max-inline-size:220px;">${story()}</div>
`;

/**
 * Media-first attachment layout for conversational AI surfaces.
 * Omit **`title`** and **`subtitle`** when slotting into `swc-prompt-field` with `uploaded-artifact="media"` so the preview fills the square tile.
 */
const meta: Meta = {
  title: 'Conversational AI/Conversation artifact media',
  component: 'swc-conversation-artifact-media',
  args: { ...args, ...demoSlots },
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle:
        'Preview-first attachment with optional title and subtitle below the preview.',
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
  decorators: [(story) => withPreviewFrame(story)],
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  decorators: [(story) => withPreviewFrame(story)],
  tags: ['overview'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * With no **`title`** or **`subtitle`**, the component hides the text block and stretches **`preview`** to the host (for example the 68×68 region on `swc-prompt-field` with `uploaded-artifact="media"`).
 */
export const PreviewOnlyTile: Story = {
  render: () => html`
    <div style="inline-size:68px;block-size:68px;">
      <swc-conversation-artifact-media>
        <div
          slot="preview"
          style="inline-size:100%;block-size:100%;background:linear-gradient(135deg,#a78bfa,#f472b6);"
          role="img"
          aria-label="Attachment preview"
        ></div>
      </swc-conversation-artifact-media>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * ### Slots
 *
 * - **`preview`** — Primary visual (`<img>`, gradient tile, video poster, etc.)
 * - **`title`** and **`subtitle`** — Optional text below the preview; when both are empty, only **`preview`** is shown (tile fills the host)
 */
export const Anatomy: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start;">
      <div style="inline-size:200px;">
        <swc-conversation-artifact-media>
          <div
            slot="preview"
            style="inline-size:100%;block-size:120px;background:linear-gradient(135deg,#0ea5e9,#6366f1);"
            role="img"
            aria-label="Preview"
          ></div>
          <span slot="title">Resort launch video</span>
          <span slot="subtitle">MP4 · 12 MB</span>
        </swc-conversation-artifact-media>
      </div>
      <div style="inline-size:68px;block-size:68px;">
        <swc-conversation-artifact-media>
          <div
            slot="preview"
            style="inline-size:100%;block-size:100%;background:linear-gradient(135deg,#34d399,#059669);"
            role="img"
            aria-label="Thumbnail only"
          ></div>
        </swc-conversation-artifact-media>
      </div>
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
 * - Use real **`alt`** text on images in **`preview`**, or **`role="img"`** with **`aria-label`** on non-image previews
 * - When **`title`** is present, keep it descriptive
 */
export const Accessibility: Story = {
  args: {
    'preview-slot':
      '<div slot="preview" style="inline-size:100%;block-size:120px;background:var(--swc-gray-200);" role="img" aria-label="Storyboard frame 3 of 12"></div>',
    'title-slot': '<span slot="title">Lobby storyboard</span>',
    'subtitle-slot': '<span slot="subtitle">PNG sequence</span>',
  },
  decorators: [(story) => withPreviewFrame(story)],
  tags: ['a11y'],
};
