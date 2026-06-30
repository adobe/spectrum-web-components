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

import '@adobe/spectrum-wc/patterns/conversational-ai/response-status';

import {
  AGENTIC_DEMO_FLOW_STEPS,
  agenticDemoStep,
  executionStepsLabelSlot,
} from '../../agentic-demo-flow-script.js';

// ────────────────
//    METADATA
// ────────────────

/**
 * Displays AI response progress with a compact status row and optional execution step timeline.
 */
const meta: Meta = {
  title: 'Conversational AI/Response status',
  component: 'swc-response-status',
  parameters: {
    docs: {
      subtitle: 'AI response lifecycle status with optional execution steps.',
    },
    layout: 'padded',
  },
  tags: ['migrated'],
};

export { meta };
export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const activeSteps = html`
  <swc-response-status-step status="complete">
    <span slot="label">Looked through documentation</span>
    <span slot="description">
      Prioritizing data from your documents like the ‘2023 Annual Report’ and
      press releases related to Hilton.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="complete">
    <span slot="label">
      Searching web for: Carnival cruise trip packages Europe Asia
    </span>
    <span slot="description">
      Correlating package availability across regions and travel windows.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="active">
    <span slot="label">Searching repositories for Europe trips</span>
    <span slot="description">
      Checked 3 internal repositories for previously compiled trip package data
      and pricing templates.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="pending">
    <span slot="label">Compose response</span>
    <span slot="description">
      Synthesizing findings into a structured comparison.
    </span>
  </swc-response-status-step>
`;

const completeSteps = AGENTIC_DEMO_FLOW_STEPS.map((step) =>
  agenticDemoStep(step, 'complete')
);

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <swc-response-status status="active" expanded>
      <span slot="label">Searching repositories for Europe trips</span>
      ${executionStepsLabelSlot} ${activeSteps}
    </swc-response-status>
  `,
  tags: ['dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  render: () => html`
    <swc-response-status status="active">
      <span slot="label">Searching repositories for Europe trips</span>
      ${activeSteps}
    </swc-response-status>
  `,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <swc-response-status status="active" expanded>
      <span slot="label">Searching repositories for Europe trips</span>
      <span slot="summary">Processing request</span>
      ${executionStepsLabelSlot} ${activeSteps}
    </swc-response-status>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Statuses: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <swc-response-status status="pending">
        <span slot="label">Processing request</span>
      </swc-response-status>
      <swc-response-status status="active">
        <span slot="label">Searching repositories for Europe trips</span>
        ${activeSteps}
      </swc-response-status>
      <swc-response-status status="complete">
        <span slot="label">Thought for 9 seconds</span>
        ${completeSteps}
      </swc-response-status>
      <swc-response-status status="stopped">
        <span slot="label">You stopped the response</span>
      </swc-response-status>
      <swc-response-status status="error">
        <span slot="label">Response failed</span>
      </swc-response-status>
    </div>
  `,
  tags: ['options'],
};

export const Steps: Story = {
  render: () => html`
    <swc-response-status status="active" expanded>
      <span slot="label">Searching repositories for Europe trips</span>
      ${executionStepsLabelSlot} ${activeSteps}
    </swc-response-status>
  `,
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <swc-response-status status="complete" expanded>
      <span slot="label">Thought for 12 seconds</span>
      ${executionStepsLabelSlot} ${completeSteps}
    </swc-response-status>
  `,
  tags: ['a11y'],
};

export const AgenticAccessibility: Story = {
  render: () => html`
    <swc-response-status status="complete" expanded>
      <span slot="label">Thought for 12 seconds</span>
      ${executionStepsLabelSlot} ${completeSteps}
    </swc-response-status>
  `,
  tags: ['a11y'],
};
