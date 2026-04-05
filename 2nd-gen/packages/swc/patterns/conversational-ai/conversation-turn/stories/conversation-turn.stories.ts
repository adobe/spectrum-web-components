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
import '../../assistant-message/index.js';
import '../../user-message/index.js';
import '../../conversation-artifact-card/index.js';
import '../../conversation-artifact-media/index.js';
import '../../prompt-field/index.js';
import '../../response-status/index.js';
import '../../message-feedback/index.js';
import '../../message-sources/index.js';
import '../../message-suggestions/index.js';

import '../../assistant-prose-demo.css';

// ────────────────
//    METADATA
// ────────────────

/**
 * Column alignment for one chat turn: `participant="user"` (end) vs `participant="assistant"` (start, full width).
 * Slot **`swc-user-message`**, **`swc-assistant-message`**, or custom markup.
 * Stack consecutive messages in one turn to create grouped spacing.
 */
const meta: Meta = {
  title: 'Conversational AI/Conversation turn',
  component: 'swc-conversation-turn',
  parameters: {
    docs: {
      subtitle:
        'Aligns user vs assistant content in a thread column and supports grouped message stacking.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:16px;max-inline-size:600px;"
    >
      <swc-conversation-turn participant="user">
        <swc-user-message content="copy">
          Short user question for the demo.
        </swc-user-message>
      </swc-conversation-turn>
      <swc-conversation-turn participant="assistant">
        <swc-assistant-message>
          <swc-response-status
            slot="status"
            state="complete"
          ></swc-response-status>
          <div class="swc-conversationalAi-assistantProse" slot="message">
            <p>Assistant reply body goes here.</p>
          </div>
          <swc-message-feedback slot="feedback"></swc-message-feedback>
        </swc-assistant-message>
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
      <swc-conversation-turn participant="user">
        <swc-user-message content="copy">
          Can you summarize the attached campaign assets?
        </swc-user-message>
      </swc-conversation-turn>
      <swc-conversation-turn participant="assistant">
        <swc-assistant-message>
          <swc-response-status
            slot="status"
            state="complete"
          ></swc-response-status>
          <div class="swc-conversationalAi-assistantProse" slot="message">
            <p>
              Here is a concise summary based on the files you shared. I grouped
              themes by audience and channel.
            </p>
          </div>
          <swc-message-feedback slot="feedback"></swc-message-feedback>
        </swc-assistant-message>
      </swc-conversation-turn>
    </div>
  `,
  tags: ['overview'],
};

// ──────────────────────────────────────────
//    FULL PATTERN STORY
// ──────────────────────────────────────────

/**
 * Product-style column with grouped user content: three consecutive user
 * messages are stacked in one turn, followed by one assistant turn
 * (`swc-assistant-message`) and the **prompt field**.
 */
export const FullPattern: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:24px;max-width:600px;padding:24px;"
    >
      <swc-conversation-turn participant="user">
        <swc-user-message content="media">
          <div style="inline-size:240px;">
            <swc-conversation-artifact-media>
              <div
                slot="preview"
                style="inline-size:100%;block-size:196px;background:linear-gradient(135deg,#6366f1 0%,#a855f7 40%,#ec4899 70%,#f59e0b 100%);"
                role="img"
                aria-label="Campaign preview"
              ></div>
              <span slot="title">Hilton commercial assets</span>
              <span slot="subtitle">2026</span>
            </swc-conversation-artifact-media>
          </div>
        </swc-user-message>
        <swc-user-message content="card">
          <swc-conversation-artifact-card>
            <div
              slot="leading"
              style="inline-size:36px;block-size:36px;border-radius:4px;background:var(--swc-gray-200);flex-shrink:0;"
              role="img"
              aria-label="File"
            ></div>
            <span slot="title">Hilton commercial assets</span>
            <span slot="subtitle">2026</span>
          </swc-conversation-artifact-card>
        </swc-user-message>
        <swc-user-message content="copy">
          Can you help me create a 45-minute presentation, with animations, for
          an executive update?
        </swc-user-message>
      </swc-conversation-turn>

      <swc-conversation-turn participant="assistant">
        <swc-assistant-message>
          <swc-response-status
            slot="status"
            state="complete"
            reasoning="expanded"
          >
            <span slot="reasoning">
              The user said make a presentation deck but didn't specify duration
              of deck. Assumption is a brief presentation. I should check
              previous Hilton executive presentation decks and extract the
              structure.
            </span>
          </swc-response-status>

          <div class="swc-conversationalAi-assistantProse" slot="message">
            <p
              style="font-size:var(--swc-font-size-400);font-weight:800;line-height:var(--swc-line-height-font-size-400);color:var(--swc-gray-900);margin:0;"
            >
              Big idea / core narrative: The warmth of welcome
            </p>
            <p>
              Hospitality begins the moment our customers set foot off their
              plane. We are more than accommodation, and we service a diverse
              base. We hope to be the anchor and bounce board for all who stay
              with us.
            </p>
            <p
              style="font-size:var(--swc-font-size-300);font-weight:800;line-height:var(--swc-line-height-font-size-300);color:var(--swc-gray-900);margin:0;"
            >
              Belonging happens at Hilton
            </p>
            <p>
              We strive to be familiar but exceed expectations. These assets
              highlight how belonging is personified.
            </p>
            <p
              style="font-size:var(--swc-font-size-300);font-weight:800;line-height:var(--swc-line-height-font-size-300);color:var(--swc-gray-900);margin:0;"
            >
              We are more than accommodation
            </p>
            <ul>
              <li>Airport pick up service</li>
              <li>Local recommendations</li>
              <li>Everyday excursions</li>
              <li>Customizable experience</li>
            </ul>
          </div>

          <swc-message-feedback slot="feedback"></swc-message-feedback>

          <swc-message-sources slot="sources" state="expanded">
            <li><a href="#">Hilton brand email — Q1 campaign 2026</a></li>
            <li><a href="#">Market research — hospitality trends 2025</a></li>
            <li><a href="#">User research — loyalty programme survey</a></li>
          </swc-message-sources>

          <swc-message-suggestions slot="suggestions" show-title>
            <span>
              Create a year-over-year growth chart for the next decade
            </span>
            <span>Generate a congratulatory poster</span>
            <span>Summarize development pipeline</span>
          </swc-message-suggestions>
        </swc-assistant-message>
      </swc-conversation-turn>

      <swc-prompt-field state="send" populated uploaded-artifact="card">
        <swc-conversation-artifact-card slot="artifact">
          <div
            slot="leading"
            style="inline-size:28px;block-size:28px;border-radius:3px;background:var(--swc-gray-200);flex-shrink:0;"
            role="img"
            aria-label="File"
          ></div>
          <span slot="title">Hilton commercial assets</span>
          <span slot="subtitle">2026</span>
        </swc-conversation-artifact-card>
      </swc-prompt-field>
    </div>
  `,
  tags: ['full-pattern'],
};
