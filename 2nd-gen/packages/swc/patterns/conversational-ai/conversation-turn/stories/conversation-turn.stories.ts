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
import '../../system-message/index.js';
import '../../user-message/index.js';
import '../../response-status/index.js';
import '../../message-feedback/index.js';

// ────────────────
//    METADATA
// ────────────────

/**
 * Column alignment for one chat turn: `type="user"` (end) vs `type="system"` (start, full width).
 * Slot **`swc-user-message`** or **`swc-system-message`**.
 * Stack consecutive messages in one turn to create grouped spacing.
 */
const meta: Meta = {
  title: 'Conversational AI/Conversation turn',
  component: 'swc-conversation-turn',
  parameters: {
    docs: {
      subtitle:
        'Aligns user vs system content in a thread column and supports grouped message stacking.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export { meta };
export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:16px;max-inline-size:600px;"
    >
      <swc-conversation-turn type="user">
        <swc-user-message>Short user question for the demo.</swc-user-message>
      </swc-conversation-turn>
      <swc-conversation-turn type="system">
        <swc-system-message>
          <swc-response-status slot="status">
            I mapped your request to a concise executive narrative and grouped
            the response by audience and channel themes.
          </swc-response-status>
          <div class="swc-Typography--prose">
            <p>System reply body goes here.</p>
          </div>
          <swc-message-feedback slot="feedback"></swc-message-feedback>
        </swc-system-message>
      </swc-conversation-turn>
    </div>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:16px;max-inline-size:600px;"
    >
      <swc-conversation-turn type="user">
        <swc-user-message>
          Can you summarize the attached campaign assets?
        </swc-user-message>
      </swc-conversation-turn>
      <swc-conversation-turn type="system">
        <swc-system-message>
          <swc-response-status slot="status">
            I prioritized campaign outcomes, segmented messaging pillars, and
            next-step actions to keep the summary presentation-ready.
          </swc-response-status>
          <div class="swc-Typography--prose">
            <p>
              Here is a concise summary based on the files you shared. I grouped
              themes by audience and channel.
            </p>
          </div>
          <swc-message-feedback slot="feedback"></swc-message-feedback>
        </swc-system-message>
      </swc-conversation-turn>
    </div>
  `,
  tags: ['overview'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

/**
 * ### Features
 *
 * Each `<swc-conversation-turn>` exposes **`role="group"`** and an
 * **`aria-label`** on the host element. This ensures the element that receives
 * roving keyboard focus has an accessible role and name.
 *
 * Default labels are derived from **`type`**:
 *
 * - **`type="user"`** → **"User message"**
 * - **`type="system"`** → **"System message"**
 *
 * You can provide **`accessible-label`** for localization or custom phrasing.
 *
 * Sighted users infer the speaker from alignment; this label gives screen reader
 * users the same turn context before the slotted message content is read.
 *
 * When used inside `<swc-conversation-thread>`, ArrowUp and ArrowDown move
 * focus between turns. Tab leaves the thread for the next page control, and
 * Shift+Tab back into the thread returns to the current roving focus target.
 * When focus has left the thread, newly appended turns become the next tab
 * target so users can return from the prompt field to the latest response
 * without focus being moved while they type.
 */
export const Accessibility: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:16px;max-inline-size:600px;"
    >
      <swc-conversation-turn type="user">
        <swc-user-message>Example user text.</swc-user-message>
      </swc-conversation-turn>
      <swc-conversation-turn
        type="system"
        accessible-label="Mensaje del sistema"
      >
        <swc-system-message>
          <div class="swc-Typography--prose">
            <p>Example system reply.</p>
          </div>
        </swc-system-message>
      </swc-conversation-turn>
    </div>
  `,
  tags: ['a11y'],
};
