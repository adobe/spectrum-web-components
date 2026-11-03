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
import '../../upload-attachment/swc-upload-attachment.js';
import '../swc-user-message.js';

import { renderAttachmentPreview } from '../../stories/attachment-preview.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-user-message');
delete (args as Record<string, unknown>).content;
delete (argTypes as Record<string, unknown>).content;

argTypes.type = {
  ...argTypes.type,
  control: {
    type: 'select',
    labels: { undefined: 'Default (text)' },
  },
  options: [undefined, 'card', 'media'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'undefined' },
  },
};

/**
 * User-authored message bubble. Use inside `<swc-conversation-turn type="user">` for thread alignment.
 *
 * Consumers must sanitize user-provided or AI-generated markup and validate link targets.
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
  decorators: [
    (story) => html`
      <div style="max-inline-size:640px;">
        <swc-conversation-turn type="user">${story()}</swc-conversation-turn>
      </div>
    `,
  ],
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export { meta };
export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const attachments = (type: unknown, count: number) => html`
  ${Array.from({ length: count }, (_, index) =>
    type === 'card'
      ? html`
          <swc-upload-attachment slot="thumbnail" type="card">
            ${renderAttachmentPreview({
              fileName: `Campaign reference ${index + 1}.pdf`,
            })}
            <span slot="title">Campaign reference ${index + 1}.pdf</span>
            <span slot="subtitle">1.2 MB</span>
          </swc-upload-attachment>
        `
      : html`
          <img
            slot="thumbnail"
            src="images/card-preview.jpg"
            alt="Photobook reference ${index + 1}"
          />
        `
  )}
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    type: undefined,
    'default-slot': 'Can you summarize these campaign references?',
  },
  render: (args) =>
    template(
      args,
      args['thumbnail-slot'] || !args.type
        ? undefined
        : attachments(args.type, 2)
    ),
  tags: ['dev', 'overview'],
};

// ────────────────────
//    OPTIONS STORIES
// ────────────────────

export const Card: Story = {
  args: { type: 'card' },
  render: Playground.render,
  tags: ['options'],
};

export const Media: Story = {
  args: { type: 'media' },
  render: (args) =>
    template(
      args,
      args['thumbnail-slot'] || !args.type
        ? undefined
        : args.type === 'card'
          ? attachments('card', 4)
          : html`
              ${attachments('media', 2)}
              ${['PDF', 'DOCX'].map(
                (extension) => html`
                  <swc-upload-attachment
                    slot="thumbnail"
                    type="media"
                    accessible-label=${`Campaign brief.${extension.toLowerCase()}`}
                  >
                    ${renderAttachmentPreview({
                      fileName: `Campaign brief.${extension.toLowerCase()}`,
                    })}
                    <span slot="title">
                      Campaign brief.${extension.toLowerCase()}
                    </span>
                  </swc-upload-attachment>
                `
              )}
            `
    ),
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const Overflow: Story = {
  args: { ...Playground.args, type: 'media' },
  render: (args) =>
    template(
      args,
      args['thumbnail-slot'] || !args.type
        ? undefined
        : attachments(args.type, 24)
    ),
  tags: ['behaviors'],
};
