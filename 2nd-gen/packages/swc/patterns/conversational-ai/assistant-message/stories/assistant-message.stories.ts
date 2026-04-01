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
import '../../message-suggestions/index.js';
import '../../response-status/index.js';

import '../../assistant-prose-demo.css';

// ────────────────
//    METADATA
// ────────────────

const assistantMessageSlotDocs = `
### \`message\` slot — reply body

Put the AI reply in **\`slot="message"\`** as **semantic HTML** (and optional app components) styled with Spectrum **\`var(--swc-*)\`** tokens.

#### Markup

- **\`<p>\`** for body copy; reset vertical margins so stacked paragraphs match design.
- **\`<ul>\`** / **\`<ol>\`** for lists; set **margin** and **padding-inline-start** to match design specs.
- **Headings** (\`<h2>\`–\`<h4>\`) only when the outline matters for assistive tech; otherwise a **\`<p>\`** with stronger **font-size** / **font-weight** for in-flow section titles.
- **\`<a href>\`** for links; accent colour and underline.

#### Typography (tokens)

| Role | Suggested variables |
| --- | --- |
| Body | \`--swc-font-size-200\`, \`--swc-line-height-font-size-200\`, \`--swc-regular-font-weight\`, \`--swc-gray-800\`, \`--swc-sans-serif-font\` |
| In-flow emphasis | \`--swc-font-size-300\` or \`--swc-font-size-400\`, heavier weight, \`--swc-gray-900\` |
| Links | \`--swc-accent-color-900\`, \`text-decoration: underline\`, \`text-underline-offset: 2px\` |
`.trim();

const { args, argTypes, template } = getStorybookHelpers(
  'swc-assistant-message'
);

const slotStatusRich = `<swc-response-status slot="status" state="complete" reasoning="expanded"><span slot="reasoning">The user said make a presentation deck but didn't specify duration of deck. Assumption is a brief presentation. I should check previous Hilton executive presentation decks and extract the structure.</span></swc-response-status>`;

const slotMessageRich = `<div class="swc-conversationalAi-assistantProse" slot="message"><p>According to the assets, there is a clear journey from beginning to end. Let's start with overarching themes and build from there.</p><p style="font-size:var(--swc-font-size-400);font-weight:800;line-height:var(--swc-line-height-font-size-400);color:var(--swc-gray-900);margin:0;">Big idea/ core narrative: The warmth of welcome</p><p>Hospitality begins the moment our customers set foot off their plane. We are more than accommodation, and we service a diverse base. We hope to be the anchor and bounce board for all who stay with us.</p><p style="font-size:var(--swc-font-size-300);font-weight:800;line-height:var(--swc-line-height-font-size-300);color:var(--swc-gray-900);margin:0;">Belonging happens at Hilton</p><p>We strive to be familiar but exceed expectations. These assets highlight how belonging is personified.</p><p style="font-size:var(--swc-font-size-300);font-weight:800;line-height:var(--swc-line-height-font-size-300);color:var(--swc-gray-900);margin:0;">We are more than accommodation</p><ul><li>Airport pick up service</li><li>Local recommendations</li><li>Everyday excursions</li><li>Customizable experience</li></ul></div>`;

const slotFeedback = `<swc-message-feedback slot="feedback"></swc-message-feedback>`;

const slotSourcesRich = `<swc-message-sources slot="sources"><li><a href="#">Adobe Experience Manager documentation</a></li><li><a href="#">Creative Cloud release notes 2026</a></li><li><a href="#">Firefly API getting started guide</a></li></swc-message-sources>`;

const slotSuggestionsRich = `<swc-message-suggestions slot="suggestions" show-title><span>Create a year-over-year growth chart for the next decade</span><span>Generate a congratulatory poster</span><span>Summarize development pipeline</span></swc-message-suggestions>`;

const richSlots = {
  'status-slot': slotStatusRich,
  'message-slot': slotMessageRich,
  'feedback-slot': slotFeedback,
  'sources-slot': slotSourcesRich,
  'suggestions-slot': slotSuggestionsRich,
};

const withAssistantTurn = (story: () => unknown) => html`
  <swc-conversation-turn participant="assistant" style="inline-size:100%;">
    ${story()}
  </swc-conversation-turn>
`;

/**
 * Layout container for one assistant reply (status, body, feedback, sources, suggestions).
 * **Presentation order is fixed** by the component (shadow slot order); host children may appear in any order if
 * each uses the correct **`slot`** name. For thread alignment, wrap in `<swc-conversation-turn participant="assistant">`.
 *
 * **`message` slot:** semantic HTML and typography guidance appears **after the API table** on this page.
 *
 * Stories use **`getStorybookHelpers` `template(args)`** (or **`docs.source`**) so the docs code panel shows HTML.
 */
const meta: Meta = {
  title: 'Conversational AI/Assistant message',
  component: 'swc-assistant-message',
  args: {
    ...args,
    ...richSlots,
  },
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Layout container for a single assistant (AI) reply.',
      afterApi: assistantMessageSlotDocs,
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
  decorators: [withAssistantTurn],
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  decorators: [withAssistantTurn],
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * ### Fixed layout order
 *
 * The shell **always** paints **status → message → feedback → sources → suggestions**, no matter how you order
 * children under `<swc-assistant-message>`, as long as each uses the right **`slot`** name.
 *
 * ### Slots
 *
 * - **`status`** — `<swc-response-status>`
 * - **`message`** — Assistant reply body (semantic HTML; see **after API** on this docs page)
 * - **`feedback`** — `<swc-message-feedback>`
 * - **`sources`** — `<swc-message-sources>`
 * - **`suggestions`** — `<swc-message-suggestions>`
 */
export const Anatomy: Story = {
  args: {
    'status-slot': `<swc-response-status slot="status" state="complete"></swc-response-status>`,
    'message-slot': `<div class="swc-conversationalAi-assistantProse" slot="message"><p>Here is the AI-generated response content.</p></div>`,
    'feedback-slot': slotFeedback,
    'sources-slot': `<swc-message-sources slot="sources"><li><a href="#">Source one</a></li></swc-message-sources>`,
    'suggestions-slot': `<swc-message-suggestions slot="suggestions" show-title><span>Follow up suggestion one</span><span>Follow up suggestion two</span></swc-message-suggestions>`,
  },
  decorators: [withAssistantTurn],
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * While the AI is generating a response, slot a `<swc-response-status state="loading">`
 * into the `status` slot. Once generation is complete, switch to `state="complete"`.
 */
export const Loading: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:48px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn
          participant="assistant"
          style="inline-size:100%;"
        >
          <swc-assistant-message>
            <swc-response-status
              slot="status"
              state="loading"
            ></swc-response-status>
          </swc-assistant-message>
        </swc-conversation-turn>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Generating response
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn
          participant="assistant"
          style="inline-size:100%;"
        >
          <swc-assistant-message>
            <swc-response-status
              slot="status"
              state="complete"
            ></swc-response-status>
            <div class="swc-conversationalAi-assistantProse" slot="message">
              <p>
                According to the assets, there is a clear journey from beginning
                to end.
              </p>
            </div>
            <swc-message-feedback slot="feedback"></swc-message-feedback>
            <swc-message-sources slot="sources">
              <li><a href="#">Adobe Experience Manager documentation</a></li>
            </swc-message-sources>
          </swc-assistant-message>
        </swc-conversation-turn>
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
 * The `<swc-assistant-message>` element provides a layout container.
 * Accessibility is delegated to the slotted sub-components:
 *
 * - `<swc-response-status>` announces generation state via `role="status"`
 * - `<swc-message-feedback>` exposes `role="group"` with labelled toggle buttons
 * - `<swc-message-sources>` uses `aria-expanded` on its disclosure toggle
 * - `<swc-message-suggestions>` chips are native focusable `<button>` elements
 *
 * ### Best practices
 *
 * - Use semantic HTML in **`message`** (paragraphs, lists, headings) for screen reader clarity
 * - Ensure source links have descriptive text
 */
export const Accessibility: Story = {
  args: {
    'status-slot': `<swc-response-status slot="status" state="complete"></swc-response-status>`,
    'message-slot': `<div class="swc-conversationalAi-assistantProse" slot="message"><p>According to the assets, there is a clear journey from beginning to end. Let's start with overarching themes and build from there.</p></div>`,
    'feedback-slot': slotFeedback,
    'sources-slot': `<swc-message-sources slot="sources" state="expanded"><li><a href="#">Adobe Experience Manager documentation</a></li><li><a href="#">Creative Cloud release notes 2026</a></li></swc-message-sources>`,
    'suggestions-slot': `<swc-message-suggestions slot="suggestions" show-title><span>Create a year-over-year growth chart for the next decade</span><span>Generate a congratulatory poster</span></swc-message-suggestions>`,
  },
  decorators: [withAssistantTurn],
  tags: ['a11y'],
};
