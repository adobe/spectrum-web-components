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

import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../index.js';

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
    additionalApiTables: ['swc-response-status-step'],
  },
  excludeStories: ['meta'],
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
`;

const completeSteps = html`
  <swc-response-status-step status="complete">
    <span slot="label">Looked through documentation</span>
    <span slot="description">
      Scanned 12 internal knowledge base articles matching the query context and
      extracted key sections.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="complete">
    <span slot="label">
      Searching web for: Carnival cruise trip packages Europe Asia
    </span>
    <span slot="description">
      Found 8 relevant results across travel aggregators and official cruise
      line sites.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="complete">
    <span slot="label">Searching repositories for Europe trips</span>
    <span slot="description">
      Checked 3 internal repositories for previously compiled trip package data
      and pricing templates.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="complete">
    <span slot="label">Compose response</span>
    <span slot="description">
      Synthesizing findings into a structured comparison of available packages
      with pricing and availability.
    </span>
  </swc-response-status-step>
`;

const allStateSteps = html`
  <swc-response-status-step status="complete">
    <span slot="label">Looked through documentation</span>
    <span slot="description">
      Scanned internal knowledge base articles matching the query context.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="active">
    <span slot="label">Searching repositories for Europe trips</span>
    <span slot="description">
      Checking internal repositories for previously compiled trip package data.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="complete">
    <span slot="label">Compose response</span>
    <span slot="description">
      Synthesizing findings into a structured comparison.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="stopped">
    <span slot="label">Verify pricing and availability</span>
    <span slot="description">Interrupted before this step could finish.</span>
  </swc-response-status-step>
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <swc-response-status
      status="active"
      open
      accessible-label="Execution steps"
    >
      <span slot="label">Searching repositories for Europe trips</span>
      ${activeSteps}
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
    <swc-response-status
      status="active"
      open
      accessible-label="Execution steps"
    >
      <span slot="label">Searching repositories for Europe trips</span>
      <span slot="summary">Processing request</span>
      ${activeSteps}
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
    </div>
  `,
  tags: ['options'],
};

export const Steps: Story = {
  render: () => html`
    <swc-response-status
      status="active"
      open
      accessible-label="Execution steps"
    >
      <span slot="label">Searching repositories for Europe trips</span>
      ${allStateSteps}
    </swc-response-status>
  `,
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <swc-response-status
      status="complete"
      open
      accessible-label="Execution steps"
    >
      <span slot="label">Thought for 12 seconds</span>
      ${completeSteps}
    </swc-response-status>
  `,
  tags: ['a11y'],
};

// ────────────────────────────────
//    LABEL CADENCE DEMO (consumer-managed labels)
// ────────────────────────────────

const cadenceLabels = [
  'Processing request',
  'Searching repositories for Europe trips',
  'Reviewing internal documentation',
  'Comparing cruise package pricing',
  'Composing response',
];

@customElement('demo-response-status-label-cadence')
class ResponseStatusLabelCadenceDemo extends LitElement {
  @state()
  private _label = cadenceLabels[0];

  private _index = 0;
  private _cycleTimer?: ReturnType<typeof setInterval>;
  private _consumerQueueTimer?: ReturnType<typeof setTimeout>;
  private _consumerLabelQueue: string[] = [];
  // Time each label stays visible before the next one is applied (~1s readable
  // dwell plus the component roll duration).
  private static readonly LABEL_DWELL_MS = 1000;
  private static readonly ROLL_DURATION_MS = 650;
  private static readonly CONSUMER_LABEL_DELAY_MS =
    ResponseStatusLabelCadenceDemo.LABEL_DWELL_MS +
    ResponseStatusLabelCadenceDemo.ROLL_DURATION_MS;

  public override connectedCallback(): void {
    super.connectedCallback?.();
    this._cycleTimer = setInterval(() => {
      this._index = (this._index + 1) % cadenceLabels.length;
      this._enqueueConsumerLabel(cadenceLabels[this._index]);
    }, ResponseStatusLabelCadenceDemo.CONSUMER_LABEL_DELAY_MS);
  }

  public override disconnectedCallback(): void {
    if (this._cycleTimer) {
      clearInterval(this._cycleTimer);
    }
    if (this._consumerQueueTimer) {
      clearTimeout(this._consumerQueueTimer);
      this._consumerQueueTimer = undefined;
    }
    this._consumerLabelQueue = [];
    super.disconnectedCallback?.();
  }

  private _enqueueConsumerLabel(label: string): void {
    this._consumerLabelQueue.push(label);
    this._processConsumerQueue();
  }

  private _processConsumerQueue(): void {
    if (this._consumerQueueTimer || this._consumerLabelQueue.length === 0) {
      return;
    }

    const next = this._consumerLabelQueue.shift();
    if (!next) {
      return;
    }
    this._label = next;

    this._consumerQueueTimer = setTimeout(() => {
      this._consumerQueueTimer = undefined;
      this._processConsumerQueue();
    }, ResponseStatusLabelCadenceDemo.CONSUMER_LABEL_DELAY_MS);
  }

  // Simulates rapid incoming step labels (120ms cadence) and a consumer layer
  // that queues UI updates with a dwell so the visible label stays readable.
  private _burst = (): void => {
    if (this._cycleTimer) {
      clearInterval(this._cycleTimer);
      this._cycleTimer = undefined;
    }

    cadenceLabels.forEach((label, index) => {
      setTimeout(() => {
        this._index = index;
        this._enqueueConsumerLabel(label);
      }, index * 120);
    });
  };

  protected override render(): TemplateResult {
    return html`
      <div
        style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;"
      >
        <swc-response-status
          status="active"
          open
          accessible-label="Execution steps"
        >
          <span slot="label">${this._label}</span>
          ${activeSteps}
        </swc-response-status>
        <button type="button" @click=${this._burst}>
          Queue labels with consumer delay
        </button>
      </div>
    `;
  }
}

export const LabelCadence: Story = {
  render: () => html`
    <demo-response-status-label-cadence></demo-response-status-label-cadence>
  `,
  tags: ['behaviors'],
};

LabelCadence.storyName = 'Label update cadence';

void ResponseStatusLabelCadenceDemo;
