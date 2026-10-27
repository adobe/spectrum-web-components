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

import '../swc-conversation-thread.js';
import '../../conversation-turn/swc-conversation-turn.js';
import '../../system-message/swc-system-message.js';
import '../../user-message/swc-user-message.js';
import '../../response-status/swc-response-status.js';
import '../../message-feedback/swc-message-feedback.js';
import '../../message-sources/swc-message-sources.js';

// ────────────────
//    METADATA
// ────────────────

/**
 * Vertical thread wrapper for chat turns with arrow-key navigation.
 * Use `ArrowUp` / `ArrowDown` to move across turns and `Home` / `End` to jump.
 *
 *
 * Note: `swc-conversation-thread` uses a per-instance navigation controller that
 * queries slotted items on slot changes and keyboard events. Virtualization is
 * explicitly out of scope for this component; it is a presentational layer
 * only. Products should implement virtualization at the data or model layer
 * and feed only visible subsets to the thread.
 */
const meta: Meta = {
  title: 'AI Toolkit/Conversation thread',
  component: 'swc-conversation-thread',
  parameters: {
    docs: {
      packagePath: 'patterns/ai-toolkit/conversation-thread',
      subtitle:
        'Stacks conversation turns and enables roving keyboard focus between them.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export { meta };
export default meta;

const threadExampleSource = `<div style="max-inline-size: 720px;">
  <swc-conversation-thread>
    <swc-conversation-turn type="user">
      <swc-user-message>
        Can you help me create a 45-minute presentation, with animations, for an executive update?
      </swc-user-message>
    </swc-conversation-turn>
    <swc-conversation-turn type="system">
      <swc-system-message>
        <swc-response-status slot="status" status="complete" style="--swc-response-status-label-max-lines: 1;"><span slot="label">I interpreted your request as an executive narrative task and prioritized a concise, audience-ready structure.</span></swc-response-status>
        <div class="swc-Typography--prose">
          <h3>Big idea/core narrative: The warmth of welcome</h3>
          <p>Hospitality begins the moment our customers set foot off their plane.</p>
        </div>
        <swc-message-feedback slot="feedback"></swc-message-feedback>
        <swc-message-sources slot="sources">
          <a href="#source-1">Brand brief Q1 2026</a>
        </swc-message-sources>
      </swc-system-message>
    </swc-conversation-turn>
    <swc-conversation-turn type="user">
      <swc-user-message>Great. Can you shorten that into three slides?</swc-user-message>
    </swc-conversation-turn>
  </swc-conversation-thread>
</div>`;

const renderThread = () => html`
  <div style="max-inline-size: 720px;">
    <swc-conversation-thread>
      <swc-conversation-turn type="user">
        <swc-user-message>
          Can you help me create a 45-minute presentation, with animations, for
          an executive update?
        </swc-user-message>
      </swc-conversation-turn>

      <swc-conversation-turn type="system">
        <swc-system-message>
          <swc-response-status
            slot="status"
            status="complete"
            style="--swc-response-status-label-max-lines: 1;"
          >
            <span slot="label">
              I interpreted your request as an executive narrative task and
              prioritized a concise, audience-ready structure.
            </span>
          </swc-response-status>
          <div class="swc-Typography--prose">
            <h3>Big idea/core narrative: The warmth of welcome</h3>
            <p>
              Hospitality begins the moment our customers set foot off their
              plane.
            </p>
          </div>
          <swc-message-feedback slot="feedback"></swc-message-feedback>
          <swc-message-sources slot="sources">
            <a href="#source-1">Brand brief Q1 2026</a>
          </swc-message-sources>
        </swc-system-message>
      </swc-conversation-turn>

      <swc-conversation-turn type="user">
        <swc-user-message>
          Great. Can you shorten that into three slides?
        </swc-user-message>
      </swc-conversation-turn>
    </swc-conversation-thread>
  </div>
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: renderThread,
  tags: ['dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  render: renderThread,
  tags: ['overview'],
  parameters: {
    docs: {
      source: {
        code: threadExampleSource,
      },
    },
  },
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  render: renderThread,
  tags: ['a11y'],
  parameters: {
    docs: {
      source: {
        code: threadExampleSource,
      },
    },
  },
};
