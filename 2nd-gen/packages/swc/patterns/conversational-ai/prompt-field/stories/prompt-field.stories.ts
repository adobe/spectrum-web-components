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

import '../../upload-artifact/index.js';
import '../index.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-prompt-field');
const defaultPlaceholder =
  'Ready to get started? Ask a question, share an idea, or add a task.';

argTypes.artifactValues = {
  ...argTypes.artifactValues,
  control: false,
  table: {
    category: 'properties',
    defaultValue: { summary: '[]' },
  },
};

argTypes.accept = {
  ...argTypes.accept,
  control: { type: 'text' },
  table: {
    category: 'attributes',
    defaultValue: { summary: "''" },
  },
};

argTypes.multiple = {
  ...argTypes.multiple,
  control: { type: 'boolean' },
  table: {
    category: 'attributes',
    defaultValue: { summary: 'true' },
  },
};

argTypes.mode = {
  ...argTypes.mode,
  control: { type: 'select' },
  options: ['default', 'loading', 'disabled', 'error'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'default' },
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

export { meta };
export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
    artifactValues: [],
    accept: '',
    multiple: true,
    mode: 'default',
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
    artifactValues: [],
    accept: '',
    multiple: true,
    mode: 'default',
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
 * 3. **Action bar** — Upload button (left), and send/stop button (right)
 */
export const Anatomy: Story = {
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
    artifactValues: [],
    accept: '',
    multiple: true,
    mode: 'default',
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `mode` attribute controls interaction and action state:
 *
 * - **`default`** — Send button shown, normal interactivity
 * - **`loading`** — Stop button shown while generation is in progress
 * - **`disabled`** — Input/upload/send are disabled
 * - **`error`** — Reserved for error-state styling/behavior (currently behaves like default)
 *
 * The send button enablement is derived internally from prompt content (value or artifact).
 */
export const Modes: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          placeholder=${defaultPlaceholder}
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          mode="default" with empty value
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Summarize the API changes in this branch."
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          mode="default" with entered value
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          mode="loading"
          label="Prompt"
          value="Summarize the API changes in this branch."
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          mode="loading" (input remains editable)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          mode="disabled"
          label="Prompt"
          value="This input is disabled."
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          mode="disabled" (input and controls disabled)
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
 * - `swc-upload-artifact type="card"`: file-style card artifact
 * - `swc-upload-artifact type="media"`: media tile artifact
 *
 * Upload button behavior:
 *
 * - Emits cancelable `swc-upload-click` before opening picker
 * - Opens internal file picker and emits `swc-files-selected` with selected files
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
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          None
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          <swc-upload-artifact slot="artifact" type="card" dismissible>
            <div
              slot="thumbnail"
              style="background:var(--swc-gray-200);"
              role="img"
              aria-label="PDF"
            ></div>
            <span slot="title">Hilton commercial assets</span>
            <span slot="subtitle">2026</span>
          </swc-upload-artifact>
        </swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          Card
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          <swc-upload-artifact slot="artifact" type="media" dismissible>
            <img
              slot="thumbnail"
              src="https://placehold.co/160x120/png"
              alt="Attachment preview"
              style="inline-size:100%;block-size:100%;min-block-size:0;object-fit:cover;"
            />
          </swc-upload-artifact>
        </swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          Media
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Use attached assets for a launch plan."
        >
          <swc-upload-artifact slot="artifact" type="card" dismissible>
            <div
              slot="thumbnail"
              style="background:var(--swc-gray-200);"
              role="img"
              aria-label="PDF"
            ></div>
            <span slot="title">Brand guidelines</span>
            <span slot="subtitle">PDF</span>
          </swc-upload-artifact>
          <swc-upload-artifact slot="artifact" type="media" dismissible>
            <div
              slot="thumbnail"
              style="inline-size:100%;block-size:100%;background:linear-gradient(135deg,#6366f1,#ec4899);"
              role="img"
              aria-label="Campaign still"
            ></div>
          </swc-upload-artifact>
          <swc-upload-artifact slot="artifact" type="media" dismissible>
            <div
              slot="thumbnail"
              style="inline-size:100%;block-size:100%;background:linear-gradient(135deg,#0ea5e9,#22c55e);"
              role="img"
              aria-label="Storyboard frame"
            ></div>
          </swc-upload-artifact>
        </swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
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
 * File picker behavior can be tuned with:
 *
 * - `accept`: file MIME type/extension filter
 * - `multiple`: allow one or many files
 */
export const FilePicker: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Attach references for the summary."
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          Default picker (multiple=true, accept="")
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Attach one image for style guidance."
          accept="image/*"
          ?multiple=${false}
        ></swc-prompt-field>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
        >
          Restricted picker (accept="image/*", multiple=false)
        </span>
      </div>
    </div>
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
 */
export const Accessibility: Story = {
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
    artifactValues: [],
    accept: '',
    multiple: true,
    mode: 'default',
  },
  tags: ['a11y'],
};
