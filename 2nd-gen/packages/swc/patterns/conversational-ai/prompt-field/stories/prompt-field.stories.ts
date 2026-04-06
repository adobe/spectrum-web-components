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

import '../../conversation-artifact-card/index.js';
import '../../conversation-artifact-media/index.js';
import '../index.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-prompt-field');

argTypes.state = {
  ...argTypes.state,
  control: { type: 'select' },
  options: ['default', 'send', 'stop'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'default' },
  },
};

argTypes['uploaded-artifact'] = {
  ...argTypes['uploaded-artifact'],
  control: { type: 'select' },
  options: ['none', 'card', 'media'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'none' },
  },
};

/**
 * The prompt entry surface for conversational AI flows.
 * Fires events for all interactions — consumers manage state externally.
 *
 * Prefer **`template(args)`** (or **`docs.source`**) so the docs code panel shows HTML.
 */
const meta: Meta = {
  title: 'Conversational AI/Prompt field',
  component: 'swc-prompt-field',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Prompt entry surface for conversational AI flows.',
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
  args: {
    label: 'Prompt',
    placeholder: 'Ask anything',
    value: '',
    state: 'default',
    'uploaded-artifact': 'none',
    populated: false,
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {
    label: 'Prompt',
    placeholder: 'Ask anything',
    value: '',
    state: 'default',
    'uploaded-artifact': 'none',
    populated: false,
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A prompt field consists of:
 *
 * 1. **Box** — White card with shadow and 16px border radius
 * 2. **Input area** — Optional artifact preview + prompt label + textarea
 * 3. **Action bar** — Upload button (left) and send/stop button (right)
 * 4. **Disclaimer** — Legal attribution below the card
 */
export const Anatomy: Story = {
  args: {
    label: 'Prompt',
    placeholder: 'Ask anything',
    value: '',
    state: 'default',
    'uploaded-artifact': 'none',
    populated: false,
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `state` attribute controls which action button appears on the right side of the action bar:
 *
 * - **`default`** / **`send`** — Send button is shown; enabled when the textarea has non-whitespace text or `populated` is set
 * - **`stop`** — Stop button is shown while the AI is generating a response
 */
export const State: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          state="default"
          label="Prompt"
          placeholder="Ask anything"
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Default — send disabled
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          state="send"
          label="Prompt"
          value="Summarize the API changes in this branch."
          populated
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Send — populated, send enabled
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          state="stop"
          label="Prompt"
          value="Summarize the API changes in this branch."
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Stop — AI is generating
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

/**
 * The `uploaded-artifact` attribute controls whether an artifact preview appears above the text input:
 *
 * - **`none`** — No artifact (default)
 * - **`card`** — Full-width band for horizontal file-style attachments
 * - **`media`** — Square tile for visual previews (image, GIF, video poster, etc.)
 *
 * Slot content into the **`artifact`** slot. Recommended: `swc-conversation-artifact-card` or `swc-conversation-artifact-media` (omit **`title`** / **`subtitle`** on media for the square tile).
 * The prompt field always renders the dismiss control; it fires `swc-artifact-dismiss` (consumers clear attachment state).
 */
export const UploadedArtifact: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          uploaded-artifact="none"
          label="Prompt"
          placeholder="Ask anything"
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          None
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          uploaded-artifact="card"
          label="Prompt"
          placeholder="Ask anything"
        >
          <swc-conversation-artifact-card slot="artifact">
            <div
              slot="leading"
              style="background:var(--swc-gray-200);"
              role="img"
              aria-label="PDF"
            ></div>
            <span slot="title">Hilton commercial assets</span>
            <span slot="subtitle">2026</span>
          </swc-conversation-artifact-card>
        </swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Card
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          uploaded-artifact="media"
          label="Prompt"
          placeholder="Ask anything"
        >
          <swc-conversation-artifact-media slot="artifact">
            <div
              slot="preview"
              style="inline-size:100%;block-size:100%;min-block-size:0;background:linear-gradient(135deg,#a78bfa,#f472b6);"
              role="img"
              aria-label="Attachment preview"
            ></div>
          </swc-conversation-artifact-media>
        </swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Media
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 2 },
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-prompt-field>` element implements the following accessibility features:
 *
 * #### Label association
 *
 * - The `<textarea>` has an `aria-label` matching the `label` property
 * - All icon buttons carry descriptive `aria-label` attributes
 * - The send button uses `disabled` natively when there is no non-whitespace `value` and `populated` is false
 *
 * ### Best practices
 *
 * - Always provide a meaningful `label` value
 * - Use `placeholder` as a hint, not a replacement for the label
 * - Ensure artifact content slotted into `artifact` slot includes descriptive text
 */
export const Accessibility: Story = {
  args: {
    label: 'Prompt',
    placeholder: 'Ask anything',
    value: '',
    state: 'default',
    'uploaded-artifact': 'none',
    populated: false,
  },
  tags: ['a11y'],
};
