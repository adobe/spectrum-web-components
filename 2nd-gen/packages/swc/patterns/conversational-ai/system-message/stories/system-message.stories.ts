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

import '../index.js';
import '../../conversation-turn/index.js';
import '../../message-feedback/index.js';
import '../../message-sources/index.js';
import '../../suggestion/index.js';
import '../../suggestion-item/index.js';
import '../../response-status/index.js';

import '../../system-prose-demo.css';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-system-message');

const slotStatusRich = `<swc-response-status slot="status" open>The user said make a presentation deck but didn't specify duration of deck. Assumption is a brief presentation. I should check previous Hilton executive presentation decks and extract the structure.</swc-response-status>`;

const slotMessageRich = `<div class="swc-conversationalAi-systemProse swc-Typography--prose"><p>According to the assets, there is a clear journey from beginning to end. Let's start with overarching themes and build from there.</p><p style="font-size:var(--swc-font-size-400);font-weight:800;line-height:var(--swc-line-height-font-size-400);color:var(--swc-gray-900);margin:0;">Big idea/ core narrative: The warmth of welcome</p><p>Hospitality begins the moment our customers set foot off their plane. We are more than accommodation, and we service a diverse base. We hope to be the anchor and bounce board for all who stay with us.</p><p style="font-size:var(--swc-font-size-300);font-weight:800;line-height:var(--swc-line-height-font-size-300);color:var(--swc-gray-900);margin:0;">Belonging happens at Hilton</p><p>We strive to be familiar but exceed expectations. These assets highlight how belonging is personified.</p><p style="font-size:var(--swc-font-size-300);font-weight:800;line-height:var(--swc-line-height-font-size-300);color:var(--swc-gray-900);margin:0;">We are more than accommodation</p><ul><li>Airport pick up service</li><li>Local recommendations</li><li>Everyday excursions</li><li>Customizable experience</li></ul></div>`;

const slotFeedback = `<swc-message-feedback slot="feedback"></swc-message-feedback>`;

const slotSourcesRich = `<swc-message-sources slot="sources"><li><a href="#">Adobe Experience Manager documentation</a></li><li><a href="#">Creative Cloud release notes 2026</a></li><li><a href="#">Firefly API getting started guide</a></li></swc-message-sources>`;

const slotSuggestionsRich = `<swc-suggestion-group slot="suggestions" heading="What would you like to do next?"><swc-suggestion-item>Create a year-over-year growth chart for the next decade</swc-suggestion-item><swc-suggestion-item>Generate a congratulatory poster</swc-suggestion-item><swc-suggestion-item>Summarize development pipeline</swc-suggestion-item></swc-suggestion-group>`;

const richSlots = {
  'status-slot': slotStatusRich,
  'default-slot': slotMessageRich,
  'feedback-slot': slotFeedback,
  'sources-slot': slotSourcesRich,
  'suggestions-slot': slotSuggestionsRich,
};

const withSystemTurn = (story: () => unknown) => html`
  <swc-conversation-turn type="system">${story()}</swc-conversation-turn>
`;

/**
 * Layout container for one system reply (status, body, feedback, sources, suggestions).
 * **Presentation order is fixed** by the component (shadow slot order); host children may appear in any order if
 * each uses the correct **`slot`** name. For thread alignment, wrap in `<swc-conversation-turn type="system">`.
 *
 */
const meta: Meta = {
  title: 'Conversational AI/System message',
  component: 'swc-system-message',
  args: {
    ...args,
    ...richSlots,
  },
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Layout container for a single system reply.',
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
  decorators: [withSystemTurn],
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  decorators: [withSystemTurn],
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * ### Fixed layout order
 *
 * The shell **always** paints **status -> default content -> feedback -> sources -> suggestions**, no matter how you order
 * children under `<swc-system-message>`, as long as each uses the right **`slot`** name.
 *
 * ### Slots
 *
 * - **Default slot** — System reply body as semantic HTML and optional app components
 * - **`status`** — `<swc-response-status>`
 * - **`feedback`** — `<swc-message-feedback>`
 * - **`sources`** — `<swc-message-sources>`
 * - **`suggestions`** — `<swc-suggestion-group>`
 *
 * ### Default slot guidance
 *
 * Put the AI reply in the **default slot** as semantic HTML styled with Spectrum
 * token variables.
 *
 * - **`<p>`** for body copy; reset vertical margins for predictable stacking.
 * - **`<ul>` / `<ol>`** for lists; set **margin** and **padding-inline-start**
 *   to match design specs.
 * - **Headings** (`<h2>`–`<h4>`) only when semantic outline matters; otherwise use
 *   stronger paragraph typography for in-flow section titles.
 * - **`<a href>`** for links; use accent colour and underline treatment.
 */
export const Anatomy: Story = {
  args: {
    'status-slot': `<swc-response-status slot="status">I used the prompt and source context to draft a concise, presentation-ready response structure.</swc-response-status>`,
    'default-slot': `<div class="swc-conversationalAi-systemProse swc-Typography--prose"><p>Here is the AI-generated response content.</p></div>`,
    'feedback-slot': slotFeedback,
    'sources-slot': `<swc-message-sources slot="sources"><li><a href="#">Source one</a></li></swc-message-sources>`,
    'suggestions-slot': `<swc-suggestion-group slot="suggestions" heading="What would you like to do next?"><swc-suggestion-item>Follow up suggestion one</swc-suggestion-item><swc-suggestion-item>Follow up suggestion two</swc-suggestion-item></swc-suggestion-group>`,
  },
  decorators: [withSystemTurn],
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * While the AI is generating a response, slot `<swc-response-status loading>`
 * into the `status` slot. Once generation is complete, remove `loading`.
 */
export const Loading: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:48px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn type="system">
          <swc-system-message>
            <swc-response-status slot="status" loading></swc-response-status>
          </swc-system-message>
        </swc-conversation-turn>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          Generating response
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn type="system">
          <swc-system-message>
            <swc-response-status slot="status">
              I used the prompt and source context to draft a concise,
              presentation-ready response structure.
            </swc-response-status>
            <div class="swc-conversationalAi-systemProse swc-Typography--prose">
              <p>
                According to the assets, there is a clear journey from beginning
                to end.
              </p>
            </div>
            <swc-message-feedback slot="feedback"></swc-message-feedback>
            <swc-message-sources slot="sources">
              <li><a href="#">Adobe Experience Manager documentation</a></li>
            </swc-message-sources>
          </swc-system-message>
        </swc-conversation-turn>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
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
 * The `<swc-system-message>` element provides a layout container.
 * Accessibility is delegated to the slotted sub-components:
 *
 * - `<swc-response-status>` announces generation state via `role="status"`
 * - `<swc-message-feedback>` exposes a labelled toggle button group via `role="group"` and `aria-pressed`
 * - `<swc-message-sources>` uses `aria-expanded` on its disclosure toggle
 * - `<swc-suggestion-item>` is a native focusable `<button>` element
 *
 * ### Best practices
 *
 * - Use semantic HTML in the **default slot** (paragraphs, lists, headings) for screen reader clarity
 * - Ensure source links have descriptive text
 */
export const Accessibility: Story = {
  args: {
    'status-slot': `<swc-response-status slot="status">I used the prompt and source context to draft a concise, presentation-ready response structure.</swc-response-status>`,
    'default-slot': `<div class="swc-conversationalAi-systemProse swc-Typography--prose"><p>According to the assets, there is a clear journey from beginning to end. Let's start with overarching themes and build from there.</p></div>`,
    'feedback-slot': slotFeedback,
    'sources-slot': `<swc-message-sources slot="sources" open><li><a href="#">Adobe Experience Manager documentation</a></li><li><a href="#">Creative Cloud release notes 2026</a></li></swc-message-sources>`,
    'suggestions-slot': `<swc-suggestion-group slot="suggestions" heading="What would you like to do next?"><swc-suggestion-item>Create a year-over-year growth chart for the next decade</swc-suggestion-item><swc-suggestion-item>Generate a congratulatory poster</swc-suggestion-item></swc-suggestion-group>`,
  },
  decorators: [withSystemTurn],
  tags: ['a11y'],
};

/**
 * Isolated accessibility baseline for `<swc-system-message>`.
 *
 * This story intentionally avoids dependent conversational AI subcomponents and
 * `swc-conversation-turn` so ARIA snapshots only fail when `swc-system-message`
 * itself changes.
 */
export const AccessibilityIsolated: Story = {
  render: () => html`
    <swc-system-message>
      <p slot="status">Response generated</p>
      <p>Main response content.</p>
      <button slot="feedback">Give feedback</button>
      <ul slot="sources">
        <li><a href="#source-1">Source one</a></li>
      </ul>
      <div slot="suggestions">Try a follow-up prompt.</div>
    </swc-system-message>
  `,
  tags: ['a11y'],
};
