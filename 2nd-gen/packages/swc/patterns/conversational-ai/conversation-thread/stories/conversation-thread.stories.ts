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
import '../../response-status/index.js';
import '../../system-message/index.js';
import '../../message-feedback/index.js';
import '../../message-sources/index.js';
import '../../message-suggestions/index.js';
import '../../user-message/index.js';
import '../../prompt-field/index.js';
import '@adobe/spectrum-wc/icon';

import { ThreeDotsIcon } from '../../utils/icons/index.js';

// ────────────────
//    METADATA
// ────────────────

/**
 * Layout container for a single AI conversation exchange.
 *
 * Compose the full response by slotting sub-components into the named slots:
 * `status`, `message`, `feedback`, `sources`, and `suggestions`.
 */
const meta: Meta = {
  title: 'Conversational AI/Conversation thread',
  component: 'swc-conversation-thread',
  parameters: {
    docs: {
      subtitle: 'Layout container for a single AI conversation exchange.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export default meta;

// Shared rich content for Overview / Playground
const richContent = html`
  <swc-response-status
    slot="status"
    state="loading-complete"
    show-reasoning
    reasoning-expanded
  >
    <span slot="reasoning">
      The user said make a presentation deck but didn't specify duration of
      deck. Assumption is a brief presentation. I should check previous Hilton
      executive presentation decks and extract the structure.
    </span>
  </swc-response-status>
  <swc-system-message slot="message">
    <p>
      According to the assets, there is a clear journey from beginning to end.
      Let's start with overarching themes and build from there.
    </p>
    <p
      style="font-size:var(--swc-font-size-400);font-weight:800;line-height:var(--swc-line-height-font-size-400);color:var(--swc-gray-900);margin:0;"
    >
      Big idea/ core narrative: The warmth of welcome
    </p>
    <p>
      Hospitality begins the moment our customers set foot off their plane. We
      are more than accommodation, and we service a diverse base. We hope to be
      the anchor and bounce board for all who stay with us.
    </p>
    <p
      style="font-size:var(--swc-font-size-300);font-weight:800;line-height:var(--swc-line-height-font-size-300);color:var(--swc-gray-900);margin:0;"
    >
      Belonging happens at Hilton
    </p>
    <p>
      We strive to be familiar but exceed expectations. These assets highlight
      how belonging is personified.
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
  </swc-system-message>
  <swc-message-feedback slot="feedback"></swc-message-feedback>
  <swc-message-sources slot="sources">
    <li><a href="#">Adobe Experience Manager documentation</a></li>
    <li><a href="#">Creative Cloud release notes 2026</a></li>
    <li><a href="#">Firefly API getting started guide</a></li>
  </swc-message-sources>
  <swc-message-suggestions slot="suggestions" suggestions="3" show-title>
    <span slot="suggestion-1">
      Create a year-over-year growth chart for the next decade
    </span>
    <span slot="suggestion-2">Generate a congratulatory poster</span>
    <span slot="suggestion-3">Summarize development pipeline</span>
  </swc-message-suggestions>
`;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <swc-conversation-thread>${richContent}</swc-conversation-thread>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  render: () => html`
    <swc-conversation-thread>${richContent}</swc-conversation-thread>
  `,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A conversation thread composes five named slots:
 *
 * 1. **`status`** — `<swc-response-status>` thinking / complete indicator
 * 2. **`message`** — `<swc-system-message>` AI response body
 * 3. **`feedback`** — `<swc-message-feedback>` thumbs up/down
 * 4. **`sources`** — `<swc-message-sources>` collapsible source list
 * 5. **`suggestions`** — `<swc-message-suggestions>` follow-up chips (outside the body)
 */
export const Anatomy: Story = {
  render: () => html`
    <swc-conversation-thread>
      <swc-response-status
        slot="status"
        state="loading-complete"
      ></swc-response-status>
      <swc-system-message slot="message">
        <p>Here is the AI-generated response content.</p>
      </swc-system-message>
      <swc-message-feedback slot="feedback"></swc-message-feedback>
      <swc-message-sources slot="sources">
        <li><a href="#">Source one</a></li>
      </swc-message-sources>
      <swc-message-suggestions slot="suggestions" suggestions="2" show-title>
        <span slot="suggestion-1">Follow up suggestion one</span>
        <span slot="suggestion-2">Follow up suggestion two</span>
      </swc-message-suggestions>
    </swc-conversation-thread>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * While the AI is generating a response, slot a `<swc-response-status state="loading">`
 * into the `status` slot. Once generation is complete, switch to `state="loading-complete"`.
 */
export const Loading: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:48px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-thread>
          <swc-response-status
            slot="status"
            state="loading"
          ></swc-response-status>
        </swc-conversation-thread>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Generating response
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-thread>
          <swc-response-status
            slot="status"
            state="loading-complete"
          ></swc-response-status>
          <swc-system-message slot="message">
            <p>
              According to the assets, there is a clear journey from beginning
              to end.
            </p>
          </swc-system-message>
          <swc-message-feedback slot="feedback"></swc-message-feedback>
          <swc-message-sources slot="sources">
            <li><a href="#">Adobe Experience Manager documentation</a></li>
          </swc-message-sources>
        </swc-conversation-thread>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Response complete
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-conversation-thread>` element provides a layout container.
 * Accessibility is delegated to the slotted sub-components:
 *
 * - `<swc-response-status>` announces generation state via `role="status"`
 * - `<swc-message-feedback>` exposes `role="group"` with labelled toggle buttons
 * - `<swc-message-sources>` uses `aria-expanded` on its disclosure toggle
 * - `<swc-message-suggestions>` chips are native focusable `<button>` elements
 *
 * ### Best practices
 *
 * - Slot `<swc-system-message>` with semantic HTML for screen reader clarity
 * - Ensure source links have descriptive text
 */
export const Accessibility: Story = {
  render: () => html`
    <swc-conversation-thread>
      <swc-response-status
        slot="status"
        state="loading-complete"
      ></swc-response-status>
      <swc-system-message slot="message">
        <p>
          According to the assets, there is a clear journey from beginning to
          end. Let's start with overarching themes and build from there.
        </p>
      </swc-system-message>
      <swc-message-feedback slot="feedback"></swc-message-feedback>
      <swc-message-sources slot="sources" state="expanded">
        <li><a href="#">Adobe Experience Manager documentation</a></li>
        <li><a href="#">Creative Cloud release notes 2026</a></li>
      </swc-message-sources>
      <swc-message-suggestions slot="suggestions" suggestions="2" show-title>
        <span slot="suggestion-1">
          Create a year-over-year growth chart for the next decade
        </span>
        <span slot="suggestion-2">Generate a congratulatory poster</span>
      </swc-message-suggestions>
    </swc-conversation-thread>
  `,
  tags: ['a11y'],
};

// ──────────────────────────────────────────
//    FULL PATTERN STORY
// ──────────────────────────────────────────

/**
 * The complete conversational-AI stack in one view:
 *
 * 1. **User messages** — image asset card, horizontal file card, and a copy bubble (right-aligned)
 * 2. **Conversation thread** — `<swc-response-status>` with reasoning expanded, rich `<swc-system-message>`,
 *    `<swc-message-feedback>`, `<swc-message-sources>` (expanded), and three suggestion chips
 * 3. **Prompt field** — ready to send, with an uploaded card artifact
 */
export const FullPattern: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:24px;max-width:600px;padding:24px;"
    >
      <!-- ── User messages (right-aligned) ─────────────────────── -->
      <div
        style="display:flex;flex-direction:column;align-items:flex-end;gap:16px;"
      >
        <!-- Image card -->
        <swc-user-message content="image">
          <div style="display:flex;flex-direction:column;gap:8px;width:200px;">
            <div
              style="width:200px;height:150px;border-radius:10px;overflow:hidden;"
            >
              <div
                style="width:100%;height:100%;background:linear-gradient(135deg,#6366f1 0%,#a855f7 40%,#ec4899 70%,#f59e0b 100%);"
              ></div>
            </div>
            <div
              style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;"
            >
              <div>
                <div
                  style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-100);font-weight:700;color:var(--swc-gray-900);"
                >
                  Hilton commercial assets
                </div>
                <div
                  style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
                >
                  2026
                </div>
              </div>
              <button
                style="display:inline-flex;align-items:center;justify-content:center;padding:0;background:transparent;border:none;cursor:pointer;color:var(--swc-gray-700);flex-shrink:0;"
                aria-label="More options"
              >
                <swc-icon
                  label="More options"
                  style="--swc-icon-inline-size:20px;--swc-icon-block-size:20px;"
                >
                  ${ThreeDotsIcon()}
                </swc-icon>
              </button>
            </div>
          </div>
        </swc-user-message>

        <!-- Horizontal file card -->
        <swc-user-message content="card">
          <div
            style="display:flex;gap:12px;align-items:center;padding:12px;background:var(--swc-gray-75);border-radius:8px;min-width:240px;"
          >
            <div
              style="width:36px;height:36px;border-radius:4px;background:var(--swc-gray-200);flex-shrink:0;"
            ></div>
            <div style="flex:1;min-width:0;">
              <div
                style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-100);font-weight:700;color:var(--swc-gray-900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
              >
                Hilton commercial assets
              </div>
              <div
                style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
              >
                2026
              </div>
            </div>
            <button
              style="display:inline-flex;align-items:center;justify-content:center;padding:0;background:transparent;border:none;cursor:pointer;color:var(--swc-gray-700);flex-shrink:0;"
              aria-label="More options"
            >
              <swc-icon
                label="More options"
                style="--swc-icon-inline-size:20px;--swc-icon-block-size:20px;"
              >
                ${ThreeDotsIcon()}
              </swc-icon>
            </button>
          </div>
        </swc-user-message>

        <!-- Copy bubble -->
        <swc-user-message content="copy">
          Can you help me create a 45-minute presentation, with animations, for
          an executive update?
        </swc-user-message>
      </div>

      <!-- ── Conversation thread ────────────────────────────────── -->
      <swc-conversation-thread>
        <swc-response-status
          slot="status"
          state="loading-complete"
          show-reasoning
          reasoning-expanded
        >
          <span slot="reasoning">
            The user said make a presentation deck but didn't specify duration
            of deck. Assumption is a brief presentation. I should check previous
            Hilton executive presentation decks and extract the structure.
          </span>
        </swc-response-status>

        <swc-system-message slot="message">
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
        </swc-system-message>

        <swc-message-feedback slot="feedback"></swc-message-feedback>

        <swc-message-sources slot="sources" state="expanded">
          <li><a href="#">Hilton brand email — Q1 campaign 2026</a></li>
          <li><a href="#">Market research — hospitality trends 2025</a></li>
          <li><a href="#">User research — loyalty programme survey</a></li>
        </swc-message-sources>

        <swc-message-suggestions slot="suggestions" suggestions="3" show-title>
          <span slot="suggestion-1">
            Create a year-over-year growth chart for the next decade
          </span>
          <span slot="suggestion-2">Generate a congratulatory poster</span>
          <span slot="suggestion-3">Summarize development pipeline</span>
        </swc-message-suggestions>
      </swc-conversation-thread>

      <!-- ── Prompt field ───────────────────────────────────────── -->
      <swc-prompt-field state="send" populated uploaded-artifact="card">
        <div
          slot="artifact"
          style="display:flex;gap:10px;align-items:center;padding:10px 12px;background:var(--swc-gray-75);border-radius:6px;min-width:200px;"
        >
          <div
            style="width:28px;height:28px;border-radius:3px;background:var(--swc-gray-200);flex-shrink:0;"
          ></div>
          <div style="flex:1;min-width:0;">
            <div
              style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);font-weight:700;color:var(--swc-gray-900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
            >
              Hilton commercial assets
            </div>
            <div
              style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
            >
              2026
            </div>
          </div>
        </div>
      </swc-prompt-field>
    </div>
  `,
  tags: ['full-pattern'],
};
