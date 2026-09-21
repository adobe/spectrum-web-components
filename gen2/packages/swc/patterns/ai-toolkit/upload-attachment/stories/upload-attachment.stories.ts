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
import '@adobe/spectrum-wc/components/asset/swc-asset.js';
import '@adobe/spectrum-wc/components/badge/swc-badge.js';

const { args, argTypes, template } = getStorybookHelpers(
  'swc-upload-attachment'
);

argTypes.type = {
  ...argTypes.type,
  control: { type: 'radio' },
  options: ['card', 'media'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'card' },
  },
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'radio' },
  options: ['m', 'l'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'm' },
  },
};

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

/** Strings long enough to overflow at narrow widths (title and subtitle ellipsis). */
const longOverflowTitle =
  'Hotel commercial assets for marketing campaign Q1–Q2 regional rollout';
const longOverflowSubtitle =
  '2026 fiscal year planning deck and executive summary';

export const Playground: Story = {
  args: {
    type: 'media',
    dismissible: false,
    'title-slot': '<span slot="title">Hilton commercial assets</span>',
    'subtitle-slot': '<span slot="subtitle">2026</span>',
    'thumbnail-slot':
      '<swc-asset slot="thumbnail" aspect-ratio="1:1"><img src="images/landscape-asset.jpg" alt="Campaign preview"></swc-asset>',
    'badge-slot': '<swc-badge slot="badge" size="s" subtle>PDF</swc-badge>',
    size: 'l',
  },
  render: (args) => template(args),
  tags: ['dev'],
};

export const Overview: Story = {
  args: {
    type: 'card',
    dismissible: true,
    'thumbnail-slot':
      '<swc-asset slot="thumbnail" aspect-ratio="1:1"><img src="images/landscape-asset.jpg" alt="Campaign preview"></swc-asset>',
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
          <swc-asset slot="thumbnail" aspect-ratio="1:1">
            <img src="images/landscape-asset.jpg" alt="Campaign preview" />
          </swc-asset>
          <span slot="title">Brand guidelines</span>
          <span slot="subtitle">PDF</span>
        </swc-upload-attachment>
        <swc-upload-attachment type="card" dismissible>
          <swc-asset slot="thumbnail" aspect-ratio="1:1">
            <img src="images/landscape-asset.jpg" alt="Campaign preview" />
          </swc-asset>
          <span slot="title">Q2 metrics draft</span>
          <span slot="subtitle">XLSX</span>
        </swc-upload-attachment>
        <swc-upload-attachment type="card" dismissible>
          <swc-asset slot="thumbnail" aspect-ratio="1:1">
            <img src="images/landscape-asset.jpg" alt="Campaign preview" />
          </swc-asset>
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
          <swc-asset slot="thumbnail" aspect-ratio="1:1">
            <img src="images/landscape-asset.jpg" alt="Campaign still" />
          </swc-asset>
        </swc-upload-attachment>
        <swc-upload-attachment type="media" size="l" dismissible>
          <swc-asset slot="thumbnail" aspect-ratio="1:1">
            <img src="images/card-preview.jpg" alt="Document preview" />
          </swc-asset>
          <swc-badge slot="badge">PDF</swc-badge>
        </swc-upload-attachment>
        <swc-upload-attachment type="media" dismissible>
          <swc-asset slot="thumbnail" aspect-ratio="1:1">
            <img src="images/portrait-asset.jpg" alt="Storyboard frame" />
          </swc-asset>
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
        <swc-asset slot="thumbnail" aspect-ratio="1:1">
          <img src="images/landscape-asset.jpg" alt="Campaign preview" />
        </swc-asset>
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
        <swc-asset slot="thumbnail" aspect-ratio="1:1">
          <img src="images/landscape-asset.jpg" alt="Campaign preview" />
        </swc-asset>
      </swc-upload-attachment>
    </div>
  `,
  tags: ['options'],
};

export const MediaWithBadge: Story = {
  render: () => html`
    <div style="inline-size:240px;">
      <swc-upload-attachment type="media" size="l" dismissible>
        <swc-asset slot="thumbnail" aspect-ratio="1:1">
          <img src="images/card-preview.jpg" alt="Mixed attachment preview" />
        </swc-asset>
        <swc-badge slot="badge" size="s" subtle>PDF</swc-badge>
      </swc-upload-attachment>
    </div>
  `,
  tags: ['options'],
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <swc-upload-attachment type="media" size="m" dismissible>
        <swc-asset slot="thumbnail" aspect-ratio="1:1">
          <img src="images/landscape-asset.jpg" alt="Campaign preview" />
        </swc-asset>
      </swc-upload-attachment>
      <swc-upload-attachment type="media" size="l" dismissible>
        <swc-asset slot="thumbnail" aspect-ratio="1:1">
          <img src="images/card-preview.jpg" alt="Campaign preview" />
        </swc-asset>
        <swc-badge slot="badge" size="s" subtle>PDF</swc-badge>
      </swc-upload-attachment>
    </div>
  `,
  tags: ['options'],
};

export const UploadProgress: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <swc-upload-attachment type="media" dismissible progress="0">
        <swc-asset slot="thumbnail" aspect-ratio="1:1">
          <img src="images/landscape-asset.jpg" alt="Campaign still" />
        </swc-asset>
      </swc-upload-attachment>
      <swc-upload-attachment type="media" dismissible progress="42">
        <swc-asset slot="thumbnail" aspect-ratio="1:1">
          <img src="images/card-preview.jpg" alt="Document preview" />
        </swc-asset>
      </swc-upload-attachment>
      <swc-upload-attachment type="media" dismissible progress="100">
        <swc-asset slot="thumbnail" aspect-ratio="1:1">
          <img src="images/portrait-asset.jpg" alt="Storyboard frame" />
        </swc-asset>
      </swc-upload-attachment>
    </div>
  `,
  tags: ['behaviors'],
};
UploadProgress.storyName = 'Upload progress';

export const TextOverflow: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:32px;max-inline-size:100%;"
    >
      <div style="max-inline-size:280px;">
        <swc-upload-attachment type="card" dismissible>
          <swc-asset slot="thumbnail" aspect-ratio="1:1">
            <img src="images/landscape-asset.jpg" alt="Campaign preview" />
          </swc-asset>
          <span slot="title">${longOverflowTitle}</span>
          <span slot="subtitle">${longOverflowSubtitle}</span>
        </swc-upload-attachment>
      </div>
    </div>
  `,
  tags: ['options'],
};
TextOverflow.storyName = 'Text overflow';
