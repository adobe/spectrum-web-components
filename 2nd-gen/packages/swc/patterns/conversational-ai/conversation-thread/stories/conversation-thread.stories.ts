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
import '../../prompt-field/index.js';
import '../../upload-artifact/index.js';

import '../../system-prose-demo.css';

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

const threadExampleSource = `<swc-conversation-thread style="max-inline-size: 720px;">
  <swc-conversation-turn type="user">
    <swc-user-message>
      Can you help me create a 45-minute presentation, with animations, for an executive update?
    </swc-user-message>
  </swc-conversation-turn>
  <swc-conversation-turn type="system">
    <swc-system-message>
      <swc-response-status slot="status">I interpreted your request as an executive narrative task and prioritized a concise, audience-ready structure.</swc-response-status>
      <div class="swc-conversationalAi-systemProse">
        <h3>Big idea/core narrative: The warmth of welcome</h3>
        <p>Hospitality begins the moment our customers set foot off their plane.</p>
      </div>
      <swc-message-feedback slot="feedback"></swc-message-feedback>
      <swc-message-sources slot="sources">
        <li><a href="#source-1">Brand brief Q1 2026</a></li>
      </swc-message-sources>
    </swc-system-message>
  </swc-conversation-turn>
  <swc-conversation-turn type="user">
    <swc-user-message>Great. Can you shorten that into three slides?</swc-user-message>
  </swc-conversation-turn>
</swc-conversation-thread>`;

const renderThread = () => html`
  <swc-conversation-thread style="max-inline-size: 720px;">
    <swc-conversation-turn type="user">
      <swc-user-message>
        Can you help me create a 45-minute presentation, with animations, for an
        executive update?
      </swc-user-message>
    </swc-conversation-turn>

    <swc-conversation-turn type="system">
      <swc-system-message>
        <swc-response-status slot="status">
          I interpreted your request as an executive narrative task and
          prioritized a concise, audience-ready structure.
        </swc-response-status>
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
`;

const fullPatternSource = `<div style="max-width:800px; margin:auto; padding:24px; display:flex; flex-direction:column; gap:16px;">
  <swc-conversation-thread style="--swc-conversation-thread-gap:24px;">
    <swc-conversation-turn type="user">
      <swc-user-message>Can you help me create a 45-minute presentation?</swc-user-message>
    </swc-conversation-turn>
    <swc-conversation-turn type="system">
      <swc-system-message>
        <swc-response-status slot="status">I interpreted your request as an executive narrative task and prioritized a concise, audience-ready structure.</swc-response-status>
        <div class="swc-conversationalAi-systemProse">
          <p>Great direction. I suggest a 12-slide structure...</p>
        </div>
        <swc-message-feedback slot="feedback"></swc-message-feedback>
        <swc-message-sources slot="sources">
          <li><a href="#">Brand brief Q1 2026</a></li>
        </swc-message-sources>
      </swc-system-message>
    </swc-conversation-turn>
  </swc-conversation-thread>

  <swc-prompt-field>
    <swc-upload-artifact slot="artifact" type="card" dismissible>
      <div
        slot="thumbnail"
        role="img"
        aria-label="File thumbnail"
        style="background:var(--swc-gray-200);"
      ></div>
      <span slot="title">Hilton commercial assets</span>
      <span slot="subtitle">2026</span>
    </swc-upload-artifact>
  </swc-prompt-field>
</div>`;

const renderFullPattern = () => html`
  <div
    style="max-width:800px; margin:auto; padding:24px; display:flex; flex-direction:column; gap:16px;"
  >
    <swc-conversation-thread style="--swc-conversation-thread-gap:24px;">
      <swc-conversation-turn type="user">
        <swc-user-message>
          Can you help me create a 45-minute presentation?
        </swc-user-message>
      </swc-conversation-turn>
      <swc-conversation-turn type="system">
        <swc-system-message>
          <swc-response-status slot="status">
            I interpreted your request as an executive narrative task and
            prioritized a concise, audience-ready structure.
          </swc-response-status>
          <div class="swc-conversationalAi-systemProse">
            <p>Great direction. I suggest a 12-slide structure...</p>
          </div>
          <swc-message-feedback slot="feedback"></swc-message-feedback>
          <swc-message-sources slot="sources">
            <li><a href="#">Brand brief Q1 2026</a></li>
          </swc-message-sources>
        </swc-system-message>
      </swc-conversation-turn>
    </swc-conversation-thread>

    <swc-prompt-field>
      <swc-upload-artifact slot="artifact" type="card" dismissible>
        <div
          slot="thumbnail"
          role="img"
          aria-label="File thumbnail"
          style="background:var(--swc-gray-200);"
        ></div>
        <span slot="title">Hilton commercial assets</span>
        <span slot="subtitle">2026</span>
      </swc-upload-artifact>
    </swc-prompt-field>
  </div>
`;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: renderThread,
  tags: ['autodocs', 'dev'],
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

// ──────────────────────────────
//    FULL PATTERN STORY
// ──────────────────────────────

export const FullPattern: Story = {
  render: renderFullPattern,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: fullPatternSource,
      },
    },
  },
};
