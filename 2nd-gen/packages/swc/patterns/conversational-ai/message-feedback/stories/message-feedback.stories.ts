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
import { ref } from 'lit/directives/ref.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '../swc-message-feedback.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers(
  'swc-message-feedback'
);

delete (args as Record<string, unknown>).selection;
delete (argTypes as Record<string, unknown>).selection;

argTypes.status = {
  ...argTypes.status,
  control: { type: 'select' },
  options: ['positive', 'negative'],
  table: {
    category: 'attributes',
    defaultValue: { summary: '(unset)' },
  },
};

/**
 * Binary positive / negative feedback control placed below an AI response.
 *
 * This component is **controlled** (not self-managed):
 * it only emits `swc-message-feedback-change` and does not persist selection internally.
 * Consumers are responsible for updating `status` in response to each event.
 */
const meta: Meta = {
  title: 'Conversational AI/Message feedback',
  component: 'swc-message-feedback',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      packagePath: 'patterns/conversational-ai/message-feedback',
      subtitle: 'Binary positive / negative feedback control.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export { meta };
export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {},
  tags: ['dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {},
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

export const Anatomy: Story = {
  args: {},
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Status: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-feedback></swc-message-feedback>
        <span class="swc-Detail swc-Detail--sizeS">Unset</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-feedback status="positive"></swc-message-feedback>
        <span class="swc-Detail swc-Detail--sizeS">Positive</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-message-feedback status="negative"></swc-message-feedback>
        <span class="swc-Detail swc-Detail--sizeS">Negative</span>
      </div>
    </div>
  `,
  tags: ['options'],
};

// ──────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────

const wiredSwcFeedbackDemos = new WeakSet<Element>();

export const HandlingEvents: Story = {
  render: () => {
    const wireDemo = ref((readout: Element | undefined) => {
      if (!(readout instanceof HTMLElement)) {
        return;
      }
      const root = readout.closest('[data-swc-message-feedback-behavior]');
      const feedback = root?.querySelector('swc-message-feedback');
      if (
        !(feedback instanceof HTMLElement) ||
        wiredSwcFeedbackDemos.has(feedback)
      ) {
        return;
      }
      wiredSwcFeedbackDemos.add(feedback);
      readout.textContent =
        'Click a thumb. The handler below listens for swc-message-feedback-change and sets .status on the host.';

      feedback.addEventListener(
        'swc-message-feedback-change',
        (event: Event) => {
          const { status } = (
            event as CustomEvent<{
              status: 'positive' | 'negative' | undefined;
            }>
          ).detail;
          (feedback as HTMLElement & { status?: string }).status = status;
          readout.textContent = `Last swc-message-feedback-change: detail.status = "${status}" (mirrored to host .status).`;
        }
      );
    });

    return html`
      <div
        data-swc-message-feedback-behavior
        style="display:flex;flex-direction:column;gap:16px;max-inline-size:480px;"
      >
        <swc-message-feedback></swc-message-feedback>
        <p
          ${wireDemo}
          class="swc-Detail swc-Detail--sizeS"
          style="margin:0;"
        ></p>
        <p class="swc-Detail swc-Detail--sizeS" style="margin:0;">
          In production you would persist the choice, call an API, or update app
          state instead of only echoing the event here.
        </p>
      </div>
    `;
  },
  tags: ['behaviors'],
  name: 'Handling events',
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  args: {},
  tags: ['a11y'],
};
