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

import '@adobe/spectrum-wc/patterns/conversational-ai/response-status';

import {
  AGENTIC_DEMO_FLOW_STEPS,
  agenticDemoStep,
  executionStepsLabelSlot,
} from '../../agentic-demo-flow-script.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-response-status');

delete (args as Record<string, unknown>).state;
delete (args as Record<string, unknown>).reasoning;
delete (argTypes as Record<string, unknown>).state;
delete (argTypes as Record<string, unknown>).reasoning;

argTypes.loading = {
  ...argTypes.loading,
  control: { type: 'boolean' },
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

argTypes.open = {
  ...argTypes.open,
  control: { type: 'boolean' },
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

delete (args as Record<string, unknown>).loadingLabel;
delete (args as Record<string, unknown>).completeLabel;
delete (args as Record<string, unknown>).reasoningLabel;
delete (args as Record<string, unknown>).stoppedLabel;
delete (args as Record<string, unknown>).processingAnnouncementLabel;
delete (args as Record<string, unknown>).completeAnnouncementLabel;
delete (argTypes as Record<string, unknown>).loadingLabel;
delete (argTypes as Record<string, unknown>).completeLabel;
delete (argTypes as Record<string, unknown>).reasoningLabel;
delete (argTypes as Record<string, unknown>).stoppedLabel;
delete (argTypes as Record<string, unknown>).processingAnnouncementLabel;
delete (argTypes as Record<string, unknown>).completeAnnouncementLabel;

/**
 * Displays AI response progress with an animated three-dot indicator and optional reasoning disclosure.
 */
const meta: Meta = {
  title: 'Conversational AI/Response status',
  component: 'swc-response-status',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'AI response generation status indicator.',
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
  args: {
    loading: true,
    open: false,
  },
  tags: ['dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {
    loading: true,
    open: false,
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A response status indicator consists of:
 *
 * 1. **Status row** — Animated three dots (loading) or checkmark (complete) with a label
 * 2. **Reasoning toggle** — Optional expandable disclosure for chain-of-thought content
 */
export const Anatomy: Story = {
  args: {
    loading: true,
    open: false,
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `loading` attribute controls which indicator is shown:
 *
 * - **`loading=true`** — Animated three dots + default loading label
 * - **`loading=false`** — Checkmark + default complete label
 * - Use `slot="label"` to customize row text
 */
export const Loading: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status loading></swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">Loading</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status>
          I grouped your request into a presentation outline and prioritized key
          business messages.
        </swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">
          Complete (default label)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status>
          <span slot="label">Ready</span>
          I grouped your request into a presentation outline and prioritized key
          business messages.
        </swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">
          Complete (custom label via slot)
        </span>
      </div>
    </div>
  `,
  tags: ['options'],
};

export const Reasoning: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status></swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">
          Complete without reasoning content (no disclosure chevron)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status>
          I grouped your request into a presentation outline and prioritized key
          business messages.
        </swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">Reasoning collapsed</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-response-status open>
          Step 1: Analyzing the request… Step 2: Searching for relevant context…
          Step 3: Composing response.
        </swc-response-status>
        <span class="swc-Detail swc-Detail--sizeS">Reasoning expanded</span>
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
    loading: false,
    open: false,
    'default-slot':
      'I grouped your request into a presentation outline and prioritized key business messages.',
  },
  tags: ['a11y'],
};

/**
 * Frozen agentic complete state for test-runner axe and Playwright.
 * Uses `phase="complete"` (no rolling header) so docs-view axe stays stable.
 * Timed demos live under Agentic states and are tagged `!test`.
 */
export const AgenticAccessibility: Story = {
  render: () => html`
    <swc-response-status phase="complete" duration="12" open>
      ${executionStepsLabelSlot}
      ${AGENTIC_DEMO_FLOW_STEPS.map((step) =>
        agenticDemoStep(step, 'complete')
      )}
    </swc-response-status>
  `,
  tags: ['a11y'],
};
