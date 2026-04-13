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

import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '../../conversation-artifact/index.js';
import '../index.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-prompt-field');
const defaultPlaceholder =
  'Ready to get started? Ask a question, share an idea, or add a task.';

argTypes.sending = {
  ...argTypes.sending,
  control: { type: 'boolean' },
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

/**
 * The prompt entry surface for conversational AI flows.
 * Fires events for all interactions — consumers manage state externally.
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
    placeholder: defaultPlaceholder,
    value: '',
    sending: false,
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
    sending: false,
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
 * 3. **Action bar** — Upload button + optional `leading-actions` slot content (left), and send/stop button (right)
 */
export const Anatomy: Story = {
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
    sending: false,
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `sending` attribute controls the right-side action:
 *
 * - **`false`** — Send button is shown
 * - **`true`** — Stop button is shown while the AI is generating a response
 *
 * The send button enablement is derived internally from prompt content (value or artifact).
 */
export const Sending: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          placeholder=${defaultPlaceholder}
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          'sending=false' with empty value
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Summarize the API changes in this branch."
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          'sending=false' with entered value
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          sending
          label="Prompt"
          value="Summarize the API changes in this branch."
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          'sending=true' (input remains editable)
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

/**
 * Artifact layout is inferred from the **`artifact`** slot content and supports multiple mixed items:
 *
 * - No slot content: no artifact region
 * - `swc-conversation-artifact variant="card"`: file-style card artifact
 * - `swc-conversation-artifact variant="media"`: media tile artifact
 *
 * Artifacts own dismiss behavior via `dismissible` and emit `swc-dismiss`.
 */
export const Artifact: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          placeholder=${defaultPlaceholder}
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          None
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          <swc-conversation-artifact slot="artifact" variant="card" dismissible>
            <div
              slot="thumbnail"
              style="background:var(--swc-gray-200);"
              role="img"
              aria-label="PDF"
            ></div>
            <span slot="title">Hilton commercial assets</span>
            <span slot="subtitle">2026</span>
          </swc-conversation-artifact>
        </swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Card
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          <swc-conversation-artifact
            slot="artifact"
            variant="media"
            dismissible
          >
            <div
              slot="thumbnail"
              style="inline-size:100%;block-size:100%;min-block-size:0;background:linear-gradient(135deg,#a78bfa,#f472b6);"
              role="img"
              aria-label="Attachment preview"
            ></div>
          </swc-conversation-artifact>
        </swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Media
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Use attached assets for a launch plan."
        >
          <swc-conversation-artifact slot="artifact" variant="card" dismissible>
            <div
              slot="thumbnail"
              style="background:var(--swc-gray-200);"
              role="img"
              aria-label="PDF"
            ></div>
            <span slot="title">Brand guidelines</span>
            <span slot="subtitle">PDF</span>
          </swc-conversation-artifact>
          <swc-conversation-artifact
            slot="artifact"
            variant="media"
            dismissible
          >
            <div
              slot="thumbnail"
              style="inline-size:100%;block-size:100%;background:linear-gradient(135deg,#6366f1,#ec4899);"
              role="img"
              aria-label="Campaign still"
            ></div>
          </swc-conversation-artifact>
          <swc-conversation-artifact
            slot="artifact"
            variant="media"
            dismissible
          >
            <div
              slot="thumbnail"
              style="inline-size:100%;block-size:100%;background:linear-gradient(135deg,#0ea5e9,#22c55e);"
              role="img"
              aria-label="Storyboard frame"
            ></div>
          </swc-conversation-artifact>
        </swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Mixed multi-artifact set (wrapping layout)
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 2 },
  tags: ['options'],
};

/**
 * Use the `leading-actions` slot to add optional controls next to upload on the left side
 * (for example quick actions, overflow menu, or custom tooling).
 */
export const LeadingActions: Story = {
  render: () => html`
    <swc-prompt-field
      label="Prompt"
      value="Summarize the API changes in this branch."
    >
      <sp-action-menu
        slot="leading-actions"
        quiet
        label="Prompt options"
        style="inline-size:32px;block-size:32px;"
      >
        <sp-menu-item value="rewrite">Rewrite text</sp-menu-item>
        <sp-menu-item value="shorten">Shorten</sp-menu-item>
        <sp-menu-item value="expand">Expand</sp-menu-item>
      </sp-action-menu>
    </swc-prompt-field>
  `,
  parameters: { 'section-order': 3 },
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
 * - The send button uses `disabled` natively when the prompt has no content
 *
 * ### Best practices
 *
 * - Always provide a meaningful `label` value
 * - Use `placeholder` as a hint, not a replacement for the label
 * - Ensure artifact content slotted into `artifact` slot includes descriptive text
 * - Provide `aria-label` values for interactive elements added to the `leading-actions` slot
 */
export const Accessibility: Story = {
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
    sending: false,
  },
  tags: ['a11y'],
};
