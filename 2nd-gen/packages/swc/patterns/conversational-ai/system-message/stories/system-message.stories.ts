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

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-system-message');

const slotStatusRich = `<swc-response-status slot="status" open>The user said make a presentation deck but didn't specify duration of deck. Assumption is a brief presentation. I should check previous Hilton executive presentation decks and extract the structure.</swc-response-status>`;

const slotMessageRich = `<div class="swc-Typography--prose"><p>According to the assets, there is a clear journey from beginning to end. Let's start with overarching themes and build from there.</p><h2>Big idea/ core narrative: The warmth of welcome</h2><p>Hospitality begins the moment our customers set foot off their plane. We are more than accommodation, and we service a diverse base. We hope to be the anchor and bounce board for all who stay with us.</p><h3>Belonging happens at Hilton</h3><p>We strive to be familiar but exceed expectations. These assets highlight how belonging is personified.</p><h3>We are more than accommodation</h3><ul><li>Airport pick up service</li><li>Local recommendations</li><li>Everyday excursions</li><li>Customizable experience</li></ul></div>`;

const slotFeedback = `<swc-message-feedback slot="feedback"></swc-message-feedback>`;

const slotSourcesRich = `<swc-message-sources slot="sources"><a href="#">Adobe Experience Manager documentation</a><a href="#">Creative Cloud release notes 2026</a><a href="#">Firefly API getting started guide</a></swc-message-sources>`;

const slotSuggestionsRich = `<swc-suggestion-group slot="suggestions"><h3 slot="heading">What would you like to do next?</h3><swc-suggestion-item>Create a year-over-year growth chart for the next decade</swc-suggestion-item><swc-suggestion-item>Generate a congratulatory poster</swc-suggestion-item><swc-suggestion-item>Summarize development pipeline</swc-suggestion-item></swc-suggestion-group>`;

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
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  decorators: [withSystemTurn],
  tags: ['dev'],
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

export const Anatomy: Story = {
  args: {
    'status-slot': `<swc-response-status slot="status">I used the prompt and source context to draft a concise, presentation-ready response structure.</swc-response-status>`,
    'default-slot': `<div class="swc-Typography--prose"><p>Here is the AI-generated response content.</p></div>`,
    'feedback-slot': slotFeedback,
    'sources-slot': `<swc-message-sources slot="sources"><a href="#">Source one</a></swc-message-sources>`,
    'suggestions-slot': `<swc-suggestion-group slot="suggestions" heading="What would you like to do next?"><swc-suggestion-item>Follow up suggestion one</swc-suggestion-item><swc-suggestion-item>Follow up suggestion two</swc-suggestion-item></swc-suggestion-group>`,
  },
  decorators: [withSystemTurn],
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Loading: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:48px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn type="system">
          <swc-system-message>
            <swc-response-status slot="status" loading></swc-response-status>
          </swc-system-message>
        </swc-conversation-turn>
        <span class="swc-Detail swc-Detail--sizeS">Generating response</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-conversation-turn type="system">
          <swc-system-message>
            <swc-response-status slot="status">
              I used the prompt and source context to draft a concise,
              presentation-ready response structure.
            </swc-response-status>
            <div class="swc-Typography--prose">
              <p>
                According to the assets, there is a clear journey from beginning
                to end.
              </p>
            </div>
            <swc-message-feedback slot="feedback"></swc-message-feedback>
            <swc-message-sources slot="sources">
              <a href="#">Adobe Experience Manager documentation</a>
            </swc-message-sources>
          </swc-system-message>
        </swc-conversation-turn>
        <span class="swc-Detail swc-Detail--sizeS">Response complete</span>
      </div>
    </div>
  `,
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  args: {
    'status-slot': `<swc-response-status slot="status">I used the prompt and source context to draft a concise, presentation-ready response structure.</swc-response-status>`,
    'default-slot': `<div class="swc-Typography--prose"><p>According to the assets, there is a clear journey from beginning to end. Let's start with overarching themes and build from there.</p></div>`,
    'feedback-slot': slotFeedback,
    'sources-slot': `<swc-message-sources slot="sources" open><a href="#">Adobe Experience Manager documentation</a><a href="#">Creative Cloud release notes 2026</a></swc-message-sources>`,
    'suggestions-slot': `<swc-suggestion-group slot="suggestions" heading="What would you like to do next?"><swc-suggestion-item>Create a year-over-year growth chart for the next decade</swc-suggestion-item><swc-suggestion-item>Generate a congratulatory poster</swc-suggestion-item></swc-suggestion-group>`,
  },
  decorators: [withSystemTurn],
  tags: ['a11y'],
};

export const AccessibilityIsolated: Story = {
  render: () => html`
    <swc-system-message>
      <p slot="status">Response generated</p>
      <p>Main response content.</p>
      <button slot="feedback">Give feedback</button>
      <swc-message-sources slot="sources">
        <a href="#source-1">Source one</a>
      </swc-message-sources>
      <div slot="suggestions">Try a follow-up prompt.</div>
    </swc-system-message>
  `,
  tags: ['a11y'],
};
