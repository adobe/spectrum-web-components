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

import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';
import '../../conversation-turn/swc-conversation-turn.js';
import '../../upload-attachment/swc-upload-attachment.js';
import '../swc-user-message.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-user-message');
delete (args as Record<string, unknown>).content;
delete (argTypes as Record<string, unknown>).content;

argTypes.type = {
  ...argTypes.type,
  control: { type: 'select' },
  options: ['copy', 'card', 'media'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'copy' },
  },
};

// Wraps a single swc-user-message in a conversation turn for proper alignment.
const withUserTurn = (story: () => unknown) => html`
  <swc-conversation-turn type="user">${story()}</swc-conversation-turn>
`;

/**
 * User-authored message bubble. Use inside `<swc-conversation-turn type="user">` for thread alignment.
 *
 *
 * Note: This component does not sanitize slotted content. When rendering user-provided
 * or AI-generated markup, consumers must sanitize input to prevent XSS and
 * validate link targets. This is the consumer's responsibility.
 */
const meta: Meta = {
  title: 'AI Toolkit/User message',
  component: 'swc-user-message',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      packagePath: 'patterns/ai-toolkit/user-message',
      subtitle: 'User-submitted message rendered in the thread.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export { meta };
export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const galleryImages = (count: number) =>
  Array.from(
    { length: count },
    (_, index) => html`
      <img
        slot="thumbnail"
        src="images/card-preview.jpg"
        alt="Photobook reference ${index + 1}"
      />
    `
  );

const documentCard = (title: string, size: string) => html`
  <swc-upload-attachment slot="thumbnail" type="card">
    <swc-thumbnail slot="thumbnail" decorative></swc-thumbnail>
    <span slot="title">${title}</span>
    <span slot="subtitle">${size}</span>
  </swc-upload-attachment>
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    type: 'copy',
    'default-slot':
      'Can you help me create a 45-minute presentation, with animations, for an executive update?',
  },
  render: (args) =>
    template(
      args,
      args['thumbnail-slot']
        ? undefined
        : args.type === 'card'
          ? documentCard('Brand guidelines.pdf', '1.2 MB')
          : args.type === 'media'
            ? html`
                ${galleryImages(7)}
              `
            : undefined
    ),
  decorators: [withUserTurn],
  tags: ['dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {
    type: 'copy',
    'default-slot':
      'Can you help me create a 45-minute presentation, with animations, for an executive update?',
  },
  decorators: [withUserTurn],
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

export const Anatomy: Story = {
  args: {
    'default-slot': 'Can you help me create a 45-minute presentation?',
  },
  decorators: [withUserTurn],
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Content: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:32px;max-inline-size:640px;"
    >
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn type="user">
          <swc-user-message>
            Can you help me create a 45-minute presentation, with animations,
            for an executive update?
          </swc-user-message>
        </swc-conversation-turn>
        <span class="swc-Detail swc-Detail--sizeS">Copy</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn type="user">
          <swc-user-message type="card">
            ${documentCard('Hilton commercial assets', '2026')}
          </swc-user-message>
        </swc-conversation-turn>
        <span class="swc-Detail swc-Detail--sizeS">Card</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn type="user">
          <swc-user-message type="media">
            <div
              slot="thumbnail"
              style="background:linear-gradient(135deg,#a78bfa,#f472b6);"
              role="img"
              aria-label="Campaign preview"
            ></div>
          </swc-user-message>
        </swc-conversation-turn>
        <span class="swc-Detail swc-Detail--sizeS">Media</span>
      </div>
    </div>
  `,
  tags: ['options'],
};

export const Card: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:32px;max-inline-size:640px;"
    >
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn type="user">
          <swc-user-message type="card">
            ${documentCard('Brand guidelines.pdf', '1.2 MB')}
          </swc-user-message>
          <swc-user-message>
            Summarize the key brand guidelines for our campaign.
          </swc-user-message>
        </swc-conversation-turn>
        <span class="swc-Detail swc-Detail--sizeS">Single document</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn type="user">
          <swc-user-message type="card">
            ${documentCard('Campaign brief.pdf', '840 KB')}
            ${documentCard('Research notes.txt', '24 KB')}
            ${documentCard('Audience research.pdf', '2.4 MB')}
            ${documentCard('Brand voice.txt', '18 KB')}
            ${documentCard('Launch timeline.pdf', '640 KB')}
            ${documentCard('Budget summary.pdf', '96 KB')}
          </swc-user-message>
          <swc-user-message>
            Use this campaign brief and the research notes to draft a launch
            plan.
          </swc-user-message>
        </swc-conversation-turn>
        <span class="swc-Detail swc-Detail--sizeS">Multiple documents</span>
      </div>
    </div>
  `,
  tags: ['options'],
};

export const Media: Story = {
  render: () => html`
    <div style="max-inline-size:640px;">
      <swc-conversation-turn type="user">
        <swc-user-message type="media">${galleryImages(7)}</swc-user-message>
        <swc-user-message>
          Could you help me brainstorm creative directions for an end-of-year
          photobook I'm putting together? I have a lot of photos scattered
          across my phone, a few cloud albums, and some disposable camera scans
          I never organized, so the raw material is there. I just don't know how
          to turn it into something cohesive rather than a random chronological
          dump.
        </swc-user-message>
      </swc-conversation-turn>
    </div>
  `,
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const GalleryOverflow: Story = {
  render: () => html`
    <div style="max-inline-size:640px;">
      <swc-conversation-turn type="user">
        <swc-user-message type="media">${galleryImages(24)}</swc-user-message>
        <swc-user-message>
          Help me group these photobook references into a cohesive visual
          direction.
        </swc-user-message>
      </swc-conversation-turn>
    </div>
  `,
  tags: ['behaviors'],
};
GalleryOverflow.storyName = 'Gallery overflow';

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  args: {
    type: 'copy',
    'default-slot':
      'Can you help me create a 45-minute presentation, with animations, for an executive update?',
  },
  decorators: [withUserTurn],
  tags: ['a11y'],
};
