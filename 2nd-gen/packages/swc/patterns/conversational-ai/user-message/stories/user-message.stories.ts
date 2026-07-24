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

import '../../conversation-turn/swc-conversation-turn.js';
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
  options: ['copy', 'attachments'],
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
  title: 'Conversational AI/User message',
  component: 'swc-user-message',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      packagePath: 'patterns/conversational-ai/user-message',
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
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    type: 'copy',
    'default-slot':
      'Can you help me create a 45-minute presentation, with animations, for an executive update?',
  },
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
          <swc-user-message type="attachments">
            <swc-user-message-attachment type="card">
              <div
                slot="thumbnail"
                style="inline-size:32px;block-size:32px;border-radius:3px;background:var(--swc-gray-200);flex-shrink:0;"
                role="img"
                aria-label="File"
              ></div>
              <span slot="title">Hilton commercial assets</span>
              <span slot="subtitle">2026</span>
            </swc-user-message-attachment>
          </swc-user-message>
        </swc-conversation-turn>
        <span class="swc-Detail swc-Detail--sizeS">Card</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn type="user">
          <swc-user-message type="attachments">
            <swc-user-message-attachment type="media">
              <div
                slot="thumbnail"
                style="background:linear-gradient(135deg,#a78bfa,#f472b6);"
                role="img"
                aria-label="Campaign preview"
              ></div>
              <span slot="title">Hilton commercial assets</span>
              <span slot="subtitle">2026</span>
            </swc-user-message-attachment>
          </swc-user-message>
        </swc-conversation-turn>
        <span class="swc-Detail swc-Detail--sizeS">
          Media (single attachment gets a larger hero tile)
        </span>
      </div>
    </div>
  `,
  tags: ['options'],
};

const mediaAttachment = (src: string, alt: string) => html`
  <swc-user-message-attachment type="media">
    <img slot="thumbnail" src=${src} alt=${alt} />
  </swc-user-message-attachment>
`;

export const Attachments: Story = {
  render: () => html`
    <swc-conversation-turn type="user">
      <swc-user-message type="attachments">
        ${mediaAttachment(
          'https://picsum.photos/id/64/240/240',
          'User portrait'
        )}
        ${mediaAttachment(
          'https://picsum.photos/id/823/240/240',
          'Team profile'
        )}
        ${mediaAttachment('https://picsum.photos/id/56/240/240', 'Texture')}
        <swc-user-message-attachment type="card">
          <div
            slot="thumbnail"
            style="inline-size:32px;block-size:32px;border-radius:3px;background:var(--swc-gray-200);"
            role="img"
            aria-label="Video file"
          ></div>
          <span slot="title">colorful-video-1770010806412.mp4</span>
          <span slot="subtitle">18 MB</span>
        </swc-user-message-attachment>
      </swc-user-message>
    </swc-conversation-turn>
  `,
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const AttachmentsDisclosure: Story = {
  render: () => html`
    <div style="min-block-size:300px;">
      <swc-conversation-turn type="user">
        <swc-user-message type="attachments">
          ${mediaAttachment('https://picsum.photos/id/64/240/240', 'Photo 1')}
          ${mediaAttachment('https://picsum.photos/id/823/240/240', 'Photo 2')}
          ${mediaAttachment('https://picsum.photos/id/56/240/240', 'Photo 3')}
          ${mediaAttachment('https://picsum.photos/id/65/240/240', 'Photo 4')}
          ${mediaAttachment('https://picsum.photos/id/48/240/240', 'Photo 5')}
          ${mediaAttachment('https://picsum.photos/id/28/240/240', 'Photo 6')}
        </swc-user-message>
      </swc-conversation-turn>
    </div>
  `,
  tags: ['behaviors'],
};
AttachmentsDisclosure.storyName = 'Show all / show less';

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
