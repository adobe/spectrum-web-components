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

const { args, argTypes, template } = getStorybookHelpers('swc-upload-artifact');

argTypes.type = {
  ...argTypes.type,
  control: { type: 'select' },
  options: ['card', 'media'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'card' },
  },
};

/**
 * Shared upload artifact primitive used across conversational AI surfaces such as prompt field and user message.
 * Supports both **`card`** and **`media`** types with a unified slot model.
 * For several attachments at once, see **Multi-artifact** and **[Prompt field → Artifact](/docs/patterns-conversational-ai-prompt-field--readme#artifact)**.
 */
const meta: Meta = {
  title: 'Conversational AI/Upload artifact',
  component: 'swc-upload-artifact',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle:
        'Card and media tiles for attachments; combine multiple in a strip (see Multi-artifact gallery) or slot them into the prompt field artifact region.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export default meta;

const playgroundCardThumbnail =
  '<div slot="thumbnail" role="img" aria-label="File thumbnail"></div>';
const playgroundMediaThumbnail =
  '<div slot="thumbnail" role="img" aria-label="Campaign preview"></div>';

/** Strings long enough to overflow at narrow widths (title and subtitle ellipsis). */
const longOverflowTitle =
  'Hotel commercial assets for marketing campaign Q1–Q2 regional rollout';
const longOverflowSubtitle =
  '2026 fiscal year planning deck and executive summary';

export const Playground: Story = {
  args: {
    type: 'card',
    dismissible: false,
    'title-slot': '<span slot="title">Hilton commercial assets</span>',
    'subtitle-slot': '<span slot="subtitle">2026</span>',
  },
  render: (args) => {
    const isMedia = args.type === 'media';
    return html`
      <div>
        ${template({
          ...args,
          'thumbnail-slot': isMedia
            ? playgroundMediaThumbnail
            : playgroundCardThumbnail,
        })}
      </div>
    `;
  },
  tags: ['dev'],
};

export const Overview: Story = {
  args: {
    type: 'card',
    dismissible: true,
    'thumbnail-slot':
      '<div slot="thumbnail" role="img" aria-label="File thumbnail"></div>',
    'title-slot': '<span slot="title">Hilton commercial assets</span>',
    'subtitle-slot': '<span slot="subtitle">2026</span>',
  },
  tags: ['overview'],
};

export const MultiArtifact: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:16px;max-inline-size:720px;"
    >
      <p class="swc-Detail swc-Detail--sizeS" style="margin:0;">
        Mirrors the prompt-field Attachment strip: cards and media tiles
        together, plus an extra card to stress-test wrapping at narrow widths.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start;">
        <swc-upload-artifact type="card" dismissible>
          <div slot="thumbnail" role="img" aria-label="PDF"></div>
          <span slot="title">Brand guidelines</span>
          <span slot="subtitle">PDF</span>
        </swc-upload-artifact>
        <swc-upload-artifact type="media" dismissible>
          <img
            slot="thumbnail"
            src="https://picsum.photos/id/64/68/68"
            alt="Campaign still"
            style="inline-size:100%;block-size:100%;object-fit:cover;"
          />
        </swc-upload-artifact>
        <swc-upload-artifact type="media" dismissible>
          <img
            slot="thumbnail"
            src="https://picsum.photos/id/56/68/68"
            alt="Storyboard frame"
            style="inline-size:100%;block-size:100%;object-fit:cover;"
          />
        </swc-upload-artifact>
        <swc-upload-artifact type="card" dismissible>
          <div slot="thumbnail" role="img" aria-label="Spreadsheet"></div>
          <span slot="title">Q2 metrics draft</span>
          <span slot="subtitle">XLSX</span>
        </swc-upload-artifact>
      </div>
    </div>
  `,
  tags: ['options'],
};

export const Card: Story = {
  render: () => html`
    <div style="max-inline-size:360px;">
      <swc-upload-artifact type="card" dismissible>
        <div slot="thumbnail" role="img" aria-label="File thumbnail"></div>
        <span slot="title">Hilton commercial assets</span>
        <span slot="subtitle">2026</span>
      </swc-upload-artifact>
    </div>
  `,
  tags: ['options'],
};

export const Media: Story = {
  render: () => html`
    <div style="inline-size:240px;">
      <swc-upload-artifact type="media" dismissible>
        <img
          slot="thumbnail"
          src="https://picsum.photos/id/823/68/68"
          alt="Campaign preview"
          style="inline-size:100%;block-size:100%;object-fit:cover;"
        />
      </swc-upload-artifact>
    </div>
  `,
  tags: ['options'],
};

export const TextOverflow: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:32px;max-inline-size:100%;"
    >
      <div style="max-inline-size:280px;">
        <swc-upload-artifact type="card" dismissible>
          <div slot="thumbnail" role="img" aria-label="File thumbnail"></div>
          <span slot="title">${longOverflowTitle}</span>
          <span slot="subtitle">${longOverflowSubtitle}</span>
        </swc-upload-artifact>
      </div>
    </div>
  `,
  tags: ['options'],
};
