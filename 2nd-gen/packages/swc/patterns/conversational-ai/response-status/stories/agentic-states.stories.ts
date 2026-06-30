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

import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '@adobe/spectrum-wc/patterns/conversational-ai/response-status';
import '@adobe/spectrum-wc/patterns/conversational-ai/conversation-turn';
import '@adobe/spectrum-wc/patterns/conversational-ai/system-message';

import {
  AGENTIC_DEMO_FLOW_STEPS,
  AGENTIC_DEMO_FLOW_TIMING,
  agenticDemoStep,
  executionStepsLabelSlot,
} from '../../agentic-demo-flow-script.js';
import type { ResponseStatusStepStatus } from '../response-status-step/ResponseStatusStep.js';
import type { ResponseStatusStatus } from '../ResponseStatus.js';

const processingFlowSteps = html`
  <swc-response-status-step status="complete" type="thinking">
    <span slot="label">Looked through documentation</span>
    <span slot="description">
      Prioritizing data from your documents like the ‘2023 Annual Report’ and
      press releases related to Hilton. Basing the analysis primarily on this
      content, while only pulling in web searches if necessary.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="complete" type="action">
    <span slot="label">
      Searching web for: Carnival cruise trip packages Europe Asia
    </span>
    <span slot="description">
      Correlating package availability across regions and travel windows.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="active" type="action">
    <span slot="label">Searching repositories for Europe trips</span>
    <span slot="description">
      Checked 3 internal repositories for previously compiled trip package data
      and pricing templates.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="pending" type="thinking">
    <span slot="label">Compose response</span>
    <span slot="description">
      Synthesizing findings into a structured comparison of available packages
      with pricing and availability.
    </span>
  </swc-response-status-step>
`;

/** Stopped flow — completed steps plus one interrupted step. */
const stoppedFlowSteps = html`
  <swc-response-status-step status="complete" type="thinking">
    <span slot="label">Looked through documentation</span>
    <span slot="description">
      Prioritizing data from your documents like the ‘2023 Annual Report’ and
      press releases related to Hilton. Basing the analysis primarily on this
      content, while only pulling in web searches if necessary.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="complete" type="action">
    <span slot="label">
      Searching web for: Carnival cruise trip packages Europe Asia
    </span>
    <span slot="description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="stopped" type="action">
    <span slot="label">Gathering information from the web</span>
    <span slot="description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </span>
  </swc-response-status-step>
`;

const completeFlowSteps = html`
  <swc-response-status-step status="complete" type="thinking">
    <span slot="label">Looked through documentation</span>
    <span slot="description">
      Prioritizing data from your documents like the ‘2023 Annual Report’ and
      press releases related to Hilton.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="complete" type="action">
    <span slot="label">
      Searching web for: Carnival cruise trip packages Europe Asia
    </span>
    <span slot="description">
      Correlating package availability across regions and travel windows.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="complete" type="action">
    <span slot="label">Searching repositories for Europe trips</span>
    <span slot="description">
      Checked 3 internal repositories for previously compiled trip package data
      and pricing templates.
    </span>
  </swc-response-status-step>
  <swc-response-status-step status="complete" type="thinking">
    <span slot="label">Compose response</span>
    <span slot="description">
      Synthesizing findings into a structured comparison of available packages
      with pricing and availability.
    </span>
  </swc-response-status-step>
`;

const processingHeaderSlots = html`
  <span slot="label">Searching repositories for Europe trips</span>
  <span slot="summary">Processing request</span>
`;

const initiatingSummarySlot = html`
  <span slot="summary">Processing request</span>
`;

const variantStack = (content: unknown) => html`
  <div style="display:flex;flex-direction:column;gap:40px;max-width:580px;">
    ${content}
  </div>
`;

const variantBlock = (label: string, story: unknown) => html`
  <div style="display:flex;flex-direction:column;gap:8px;">
    ${story}
    <span class="swc-Detail swc-Detail--sizeS">${label}</span>
  </div>
`;

/**
 * Agentic lifecycle states for `swc-response-status` — uses `status`,
 * and `<swc-response-status-step>` children.
 */
const meta: Meta = {
  title: 'Conversational AI/Response status/Agentic states',
  component: 'swc-response-status',
  tags: ['dev', '!test'],
  excludeStories: ['meta'],
  parameters: {
    docs: {
      subtitle:
        'Execution lifecycle with rolling header labels and an expandable step timeline.',
    },
    layout: 'padded',
  },
};

export { meta };
export default meta;

/** Initiation — prompt received, process started. */
export const Initiating: Story = {
  render: () =>
    variantStack(
      variantBlock(
        'Initiation / planning',
        html`
          <swc-response-status status="pending">
            ${initiatingSummarySlot}
          </swc-response-status>
        `
      )
    ),
};

/** Processing collapsed — rolling title from the active step. */
export const ProcessingCollapsed: Story = {
  render: () =>
    variantStack(
      variantBlock(
        'Processing (collapsed)',
        html`
          <swc-response-status status="active">
            ${processingHeaderSlots} ${processingFlowSteps}
          </swc-response-status>
        `
      )
    ),
};

/** Processing expanded — full step timeline while still running. */
export const ProcessingExpanded: Story = {
  render: () =>
    variantStack(
      variantBlock(
        'Processing (expanded)',
        html`
          <swc-response-status status="active" expanded>
            ${executionStepsLabelSlot} ${processingHeaderSlots}
            ${processingFlowSteps}
          </swc-response-status>
        `
      )
    ),
};

/** Completed collapsed — summary in the header. */
export const CompletedCollapsed: Story = {
  render: () =>
    variantStack(
      variantBlock(
        'Completed (collapsed)',
        html`
          <swc-response-status status="complete">
            <span slot="label">Thought for 9 seconds</span>
            ${completeFlowSteps}
          </swc-response-status>
        `
      )
    ),
};

/** Stopped expanded — user interrupted generation; interrupted step shows circle X. */
export const StoppedExpanded: Story = {
  render: () =>
    variantStack(
      variantBlock(
        'Stopped (expanded)',
        html`
          <swc-response-status status="stopped" expanded>
            <span slot="label">You stopped the response</span>
            ${executionStepsLabelSlot} ${stoppedFlowSteps}
          </swc-response-status>
        `
      )
    ),
};

/** Completed expanded — post-hoc step review. */
export const CompletedExpanded: Story = {
  render: () =>
    variantStack(
      variantBlock(
        'Completed (expanded)',
        html`
          <swc-response-status status="complete" expanded>
            <span slot="label">Thought for 9 seconds</span>
            ${executionStepsLabelSlot} ${completeFlowSteps}
          </swc-response-status>
        `
      )
    ),
};

/** All lifecycle variants on one page. */
export const AllStates: Story = {
  render: () =>
    variantStack(html`
      ${variantBlock(
        '1. Initiation / planning',
        html`
          <swc-response-status status="pending">
            ${initiatingSummarySlot}
          </swc-response-status>
        `
      )}
      ${variantBlock(
        '2. Processing (collapsed)',
        html`
          <swc-response-status status="active">
            ${processingHeaderSlots} ${processingFlowSteps}
          </swc-response-status>
        `
      )}
      ${variantBlock(
        '3. Processing (expanded)',
        html`
          <swc-response-status status="active" expanded>
            ${executionStepsLabelSlot} ${processingHeaderSlots}
            ${processingFlowSteps}
          </swc-response-status>
        `
      )}
      ${variantBlock(
        '4. Completed (collapsed)',
        html`
          <swc-response-status status="complete">
            <span slot="label">Thought for 9 seconds</span>
            ${completeFlowSteps}
          </swc-response-status>
        `
      )}
      ${variantBlock(
        '5. Completed (expanded)',
        html`
          <swc-response-status status="complete" expanded>
            <span slot="label">Thought for 9 seconds</span>
            ${executionStepsLabelSlot} ${completeFlowSteps}
          </swc-response-status>
        `
      )}
      ${variantBlock(
        '6. Stopped (expanded)',
        html`
          <swc-response-status status="stopped" expanded>
            <span slot="label">You stopped the response</span>
            ${executionStepsLabelSlot} ${stoppedFlowSteps}
          </swc-response-status>
        `
      )}
    `),
  tags: ['overview'],
};

class AgenticStatusSimulationDemo extends LitElement {
  @state()
  private status: ResponseStatusStatus = 'pending';

  @state()
  private activeIndex = 0;

  @state()
  private responseExpanded = false;

  @state()
  private duration = 0;

  @state()
  private runId = 0;

  private timers: number[] = [];
  private runToken = 0;
  private startedAt = 0;

  public override disconnectedCallback(): void {
    this._clearTimers();
    this.runToken += 1;
    super.disconnectedCallback();
  }

  /** Called on story (re)load so timers and UI state always restart cleanly. */
  public reset(): void {
    this._restart();
  }

  private _clearTimers(): void {
    for (const id of this.timers) {
      window.clearTimeout(id);
    }
    this.timers = [];
  }

  private _schedule(delayMs: number, run: () => void): void {
    const token = this.runToken;
    const timerId = window.setTimeout(() => {
      if (token !== this.runToken) {
        return;
      }
      run();
    }, delayMs);
    this.timers.push(timerId);
  }

  private _restart(): void {
    this._clearTimers();
    this.runToken += 1;
    this.runId += 1;
    this.startedAt = Date.now();
    const {
      processing,
      step1,
      step2,
      step3,
      step4,
      collapse,
      complete,
      loopRestart,
    } = AGENTIC_DEMO_FLOW_TIMING;

    this.status = 'pending';
    this.activeIndex = 0;
    this.responseExpanded = false;
    this.duration = 0;

    this._schedule(processing, () => {
      this.status = 'active';
      this.activeIndex = 0;
    });
    this._schedule(step1, () => {
      this.activeIndex = 1;
    });
    this._schedule(step2, () => {
      this.activeIndex = 2;
    });
    this._schedule(step3, () => {
      this.responseExpanded = true;
    });
    this._schedule(step4, () => {
      this.activeIndex = 3;
    });
    this._schedule(collapse, () => {
      this.responseExpanded = false;
    });
    this._schedule(complete, () => {
      this.status = 'complete';
      this.duration = Math.max(
        16,
        Math.round((Date.now() - this.startedAt) / 1000)
      );
      this.activeIndex = AGENTIC_DEMO_FLOW_STEPS.length;
    });
    this._schedule(loopRestart, () => this._restart());
  }

  private _stepStatus(index: number): ResponseStatusStepStatus {
    if (this.status === 'pending') {
      return 'pending';
    }
    if (this.status === 'complete' || index < this.activeIndex) {
      return 'complete';
    }
    if (index === this.activeIndex) {
      return 'active';
    }
    return 'pending';
  }

  protected override render() {
    return keyed(
      this.runId,
      html`
        <swc-response-status
          status=${this.status}
          ?expanded=${this.responseExpanded}
        >
          ${executionStepsLabelSlot}
          <span slot="summary">Processing request</span>
          ${this.status === 'active'
            ? html`
                <span slot="label">
                  ${AGENTIC_DEMO_FLOW_STEPS[this.activeIndex]?.label ?? ''}
                </span>
              `
            : ''}
          ${this.status === 'complete'
            ? html`
                <span slot="label">Thought for ${this.duration} seconds</span>
              `
            : ''}
          ${AGENTIC_DEMO_FLOW_STEPS.map((step, index) =>
            agenticDemoStep(step, this._stepStatus(index))
          )}
        </swc-response-status>
      `
    );
  }
}

if (!customElements.get('swc-agentic-status-simulation-demo')) {
  customElements.define(
    'swc-agentic-status-simulation-demo',
    AgenticStatusSimulationDemo
  );
}

/**
 * Starts **collapsed** in processing; expand the header to reveal the step timeline.
 * Steps appear one at a time in the panel as each becomes active.
 */
export const LiveSimulation: Story = {
  tags: ['dev', '!test'],
  render: () => html`
    <div style="max-width:580px;">
      <swc-agentic-status-simulation-demo></swc-agentic-status-simulation-demo>
      <p class="swc-Detail swc-Detail--sizeS" style="margin-top:12px;">
        Matches the canonical demo flow — “Processing request” (~1.5s), rolling
        titles while collapsed, auto-expands at ~7s, completes as “Thought for N
        seconds”. Loops every ~16s.
      </p>
    </div>
  `,
  play: async ({ canvasElement }) => {
    await customElements.whenDefined('swc-agentic-status-simulation-demo');
    const demo = canvasElement.querySelector(
      'swc-agentic-status-simulation-demo'
    );
    (demo as AgenticStatusSimulationDemo | null)?.reset();
  },
};

/** Composed inside `swc-system-message` as in production. */
export const InSystemMessage: Story = {
  tags: ['dev'],
  render: () => html`
    <swc-conversation-turn type="system">
      <swc-system-message>
        <swc-response-status slot="status" status="active" expanded>
          ${executionStepsLabelSlot} ${processingHeaderSlots}
          ${processingFlowSteps}
        </swc-response-status>
        <div class="swc-Typography--prose">
          <p>
            According to the assets, there is a clear journey from beginning to
            end. Let's start with overarching themes and build from there.
          </p>
        </div>
      </swc-system-message>
    </swc-conversation-turn>
  `,
};
