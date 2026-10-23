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

import '../swc-upload-attachment.js';

const { args, argTypes, template } = getStorybookHelpers(
  'swc-upload-attachment'
);

/**
 * Shared upload attachment primitive used across AI surfaces such as prompt field and user message.
 * Supports **`card`** and **`media`** types with a unified slot model.
 * Use one layout type per attachment strip: cards only, or media tiles only (with or without badge).
 * When uploads mix images and documents, normalize to all media tiles.
 * For several attachments at once, see **Multi-card**, **Multi-media**, and **[Prompt field → Attachment](/docs/patterns-ai-toolkit-prompt-field--docs#attachment)**.
 */
const meta: Meta = {
  title: 'AI Toolkit/Upload attachment',
  component: 'swc-upload-attachment',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      packagePath: 'patterns/ai-toolkit/upload-attachment',
      subtitle:
        'Card and media tiles for attachments. Use one layout type per strip; normalize mixed uploads to media with badges.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
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

export const MultiCard: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:16px;max-inline-size:720px;"
    >
      <p class="swc-Detail swc-Detail--sizeS" style="margin:0;">
        Multiple card attachments in one strip. Do not combine cards with media
        tiles in the same composer session.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start;">
        <swc-upload-attachment type="card" dismissible>
          <div slot="thumbnail" role="img" aria-label="PDF"></div>
          <span slot="title">Brand guidelines</span>
          <span slot="subtitle">PDF</span>
        </swc-upload-attachment>
        <swc-upload-attachment type="card" dismissible>
          <div slot="thumbnail" role="img" aria-label="Spreadsheet"></div>
          <span slot="title">Q2 metrics draft</span>
          <span slot="subtitle">XLSX</span>
        </swc-upload-attachment>
        <swc-upload-attachment type="card" dismissible>
          <div slot="thumbnail" role="img" aria-label="Deck"></div>
          <span slot="title">Executive summary</span>
          <span slot="subtitle">PPTX</span>
        </swc-upload-attachment>
      </div>
    </div>
  `,
  tags: ['options'],
};

export const MultiMedia: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:16px;max-inline-size:720px;"
    >
      <p class="swc-Detail swc-Detail--sizeS" style="margin:0;">
        Multiple media tiles in one strip, with and without a badge. Use media
        only, not mixed with cards.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start;">
        <swc-upload-attachment type="media" dismissible>
          <div
            slot="thumbnail"
            role="img"
            aria-label="Campaign still"
            style="inline-size:100%;block-size:100%;background:linear-gradient(135deg,#a78bfa,#f472b6);"
          ></div>
        </swc-upload-attachment>
        <swc-upload-attachment type="media" dismissible>
          <div
            slot="thumbnail"
            role="img"
            aria-label="Document preview"
            style="inline-size:100%;block-size:100%;background:#f3f3f3;"
          ></div>
          <span slot="badge">PDF</span>
        </swc-upload-attachment>
        <swc-upload-attachment type="media" dismissible>
          <div
            slot="thumbnail"
            role="img"
            aria-label="Storyboard frame"
            style="inline-size:100%;block-size:100%;background:linear-gradient(135deg,#f472b6,#facc15);"
          ></div>
        </swc-upload-attachment>
      </div>
    </div>
  `,
  tags: ['options'],
};
MultiCard.storyName = 'Multi attachment';

export const Card: Story = {
  render: () => html`
    <div style="max-inline-size:360px;">
      <swc-upload-attachment type="card" dismissible>
        <div slot="thumbnail" role="img" aria-label="File thumbnail"></div>
        <span slot="title">Hilton commercial assets</span>
        <span slot="subtitle">2026</span>
      </swc-upload-attachment>
    </div>
  `,
  tags: ['options'],
};

export const Media: Story = {
  render: () => html`
    <div style="inline-size:240px;">
      <swc-upload-attachment type="media" dismissible>
        <div
          slot="thumbnail"
          role="img"
          aria-label="Campaign preview"
          style="inline-size:100%;block-size:100%;background:linear-gradient(135deg,#a78bfa,#f472b6);"
        ></div>
      </swc-upload-attachment>
    </div>
  `,
  tags: ['options'],
};

export const MediaWithBadge: Story = {
  render: () => html`
    <div style="inline-size:240px;">
      <swc-upload-attachment type="media" dismissible>
        <div
          slot="thumbnail"
          role="img"
          aria-label="Mixed attachment preview"
          style="inline-size:100%;block-size:100%;background:linear-gradient(135deg,#a78bfa,#f472b6);"
        ></div>
        <span slot="badge">PDF</span>
      </swc-upload-attachment>
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
        <swc-upload-attachment type="card" dismissible>
          <div slot="thumbnail" role="img" aria-label="File thumbnail"></div>
          <span slot="title">${longOverflowTitle}</span>
          <span slot="subtitle">${longOverflowSubtitle}</span>
        </swc-upload-attachment>
      </div>
    </div>
  `,
  tags: ['options'],
};
TextOverflow.storyName = 'Text overflow';
