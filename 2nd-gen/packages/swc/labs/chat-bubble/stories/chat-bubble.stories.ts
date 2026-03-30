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

import '../index.js';

// ────────────────
//    METADATA
// ────────────────

const meta: Meta = {
  title: 'Chat bubble',
  component: 'swc-chat-bubble',
  parameters: {
    docs: {
      subtitle:
        'A chat bubble for conversational UI with sender info, timestamps, and variant styles.',
    },
  },
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <swc-chat-bubble sender="Alice" timestamp="2:34 PM">
      Hey, have you seen the new Spectrum 2 tokens?
    </swc-chat-bubble>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * A realistic conversation with avatars, alternating between incoming and outgoing messages.
 */
export const Conversation: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 12px; width: 500px;"
    >
      <swc-chat-bubble sender="Alice" timestamp="2:34 PM">
        <img slot="avatar" src="https://picsum.photos/id/64/80/80" alt="Alice" />
        Hey, have you seen the new Spectrum 2 tokens?
      </swc-chat-bubble>
      <swc-chat-bubble sender="You" timestamp="2:35 PM" variant="outgoing">
        Yes! The semantic colors are so much better now.
      </swc-chat-bubble>
      <swc-chat-bubble sender="Alice" timestamp="2:36 PM">
        <img slot="avatar" src="https://picsum.photos/id/64/80/80" alt="Alice" />
        Right? And the component sizing tokens make everything consistent.
      </swc-chat-bubble>
      <swc-chat-bubble sender="You" timestamp="2:37 PM" variant="outgoing">
        I just prototyped a whole component using Labs. Took 5 minutes.
      </swc-chat-bubble>
    </div>
  `,
  tags: ['options'],
  parameters: { 'section-order': 1 },
};

/**
 * Multiple incoming messages showing the default left-aligned neutral style.
 */
export const Incoming: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 12px; width: 500px;"
    >
      <swc-chat-bubble sender="Alice" timestamp="10:00 AM">
        Good morning! Ready for the design review?
      </swc-chat-bubble>
      <swc-chat-bubble sender="Alice" timestamp="10:01 AM">
        I pushed the latest token updates to Figma.
      </swc-chat-bubble>
      <swc-chat-bubble sender="Bob" timestamp="10:02 AM">
        Let me pull those up now.
      </swc-chat-bubble>
    </div>
  `,
  tags: ['options'],
  parameters: { 'section-order': 2 },
};

/**
 * Multiple outgoing messages showing the right-aligned accent style.
 */
export const Outgoing: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 12px; width: 500px;"
    >
      <swc-chat-bubble sender="You" timestamp="3:15 PM" variant="outgoing">
        Just finished the component audit.
      </swc-chat-bubble>
      <swc-chat-bubble sender="You" timestamp="3:16 PM" variant="outgoing">
        All tokens are mapped and verified.
      </swc-chat-bubble>
      <swc-chat-bubble sender="You" timestamp="3:16 PM" variant="outgoing">
        Shipping the update now!
      </swc-chat-bubble>
    </div>
  `,
  tags: ['options'],
  parameters: { 'section-order': 3 },
};
