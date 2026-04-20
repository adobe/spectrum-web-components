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
import '../../conversation-turn/index.js';
import '../../system-message/index.js';
import '../../user-message/index.js';
import '../../response-status/index.js';
import '../../message-feedback/index.js';
import '../../message-sources/index.js';

import '../../system-prose-demo.css';

// ────────────────
//    METADATA
// ────────────────

/**
 * Vertical thread wrapper for chat turns with arrow-key navigation.
 * Use `ArrowUp` / `ArrowDown` to move across turns and `Home` / `End` to jump.
 */
const meta: Meta = {
  title: 'Conversational AI/Conversation thread',
  component: 'swc-conversation-thread',
  parameters: {
    docs: {
      subtitle:
        'Stacks conversation turns and enables roving keyboard focus between them.',
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
    <swc-conversation-thread style="max-inline-size: 720px;">
      <swc-conversation-turn type="user">
        <swc-user-message>
          Can you help me create a 45-minute presentation, with animations, for
          an executive update?
        </swc-user-message>
      </swc-conversation-turn>

      <swc-conversation-turn type="system">
        <swc-system-message>
          <swc-response-status slot="status"></swc-response-status>
          <div class="swc-conversationalAi-systemProse">
            <h3>Big idea/core narrative: The warmth of welcome</h3>
            <p>
              Hospitality begins the moment our customers set foot off their
              plane.
            </p>
          </div>
          <swc-message-feedback slot="feedback"></swc-message-feedback>
          <swc-message-sources slot="sources">
            <li><a href="#source-1">Brand brief Q1 2026</a></li>
          </swc-message-sources>
        </swc-system-message>
      </swc-conversation-turn>

      <swc-conversation-turn type="user">
        <swc-user-message>
          Great. Can you shorten that into three slides?
        </swc-user-message>
      </swc-conversation-turn>
    </swc-conversation-thread>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  ...Playground,
  tags: ['overview'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

/**
 * ### Keyboard behavior
 *
 * - Tab enters the thread on the active turn.
 * - ArrowUp and ArrowDown move between turns.
 * - Home and End jump to first and last turn.
 *
 * ### Focus behavior
 *
 * - The thread applies roving `tabindex` across slotted `<swc-conversation-turn>` children.
 * - Exactly one turn is tabbable at a time.
 */
export const Accessibility: Story = {
  ...Playground,
  tags: ['a11y'],
};
