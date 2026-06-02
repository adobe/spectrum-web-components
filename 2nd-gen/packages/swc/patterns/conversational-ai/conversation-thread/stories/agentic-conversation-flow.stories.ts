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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../index.js';
import '../../conversation-turn/index.js';
import '../../system-message/index.js';
import '../../user-message/index.js';
import '../../response-status/index.js';
import '../../prompt-field/index.js';

import {
  AGENTIC_VIDEO_FLOW_STEPS,
  AGENTIC_VIDEO_FLOW_TIMING,
  agenticVideoGreeting,
} from '../../agentic-video-flow-script.js';
import type {
  ResponseStatusStepKind,
  ResponseStatusStepStatus,
} from '../../response-status/response-status-step/ResponseStatusStep.js';
import type { ResponseStatusPhase } from '../../response-status/ResponseStatus.js';

type AgenticStep = {
  title: string;
  detail: string;
  kind: ResponseStatusStepKind;
  status: ResponseStatusStepStatus;
};

type DemoTurn = {
  id: string;
  role: 'user' | 'system';
  text: string;
  loading?: boolean;
  agenticPhase?: ResponseStatusPhase | '';
  agenticSteps?: AgenticStep[];
  agenticDuration?: number;
  statusOpen?: boolean;
};

const buildAssistantReply = (prompt: string): string => {
  const greeting = agenticVideoGreeting(prompt);
  const normalized = prompt.trim() || 'your request';
  if (/^hello\b/i.test(normalized)) {
    return greeting;
  }
  return `Great direction. Based on "${normalized}", I suggest a 12-slide structure with a clear narrative arc, three supporting proof points, and a concise close with next steps.`;
};

const AGENTIC_STEP_SCRIPT: Omit<AgenticStep, 'status'>[] =
  AGENTIC_VIDEO_FLOW_STEPS;

class AgenticConversationFlowDemo extends LitElement {
  @state()
  private turns: DemoTurn[] = [
    {
      id: 'user-1',
      role: 'user',
      text: 'Can you help me create a 45-minute presentation?',
    },
    {
      id: 'system-1',
      role: 'system',
      text: 'I interpreted your request as an executive narrative task and prioritized a concise, audience-ready structure.',
      agenticPhase: 'complete',
      agenticDuration: 16,
      agenticSteps: AGENTIC_STEP_SCRIPT.map((step) => ({
        ...step,
        status: 'complete',
      })),
    },
  ];

  @state()
  private promptValue = '';

  @state()
  private isGenerating = false;

  private generationTimers: number[] = [];
  private generationStartedAt = 0;
  private responseTargetId: string | null = null;
  private lastPrompt = '';

  public override disconnectedCallback(): void {
    this._clearGenerationTimers();
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(): void {
    requestAnimationFrame(() => {
      const scrollEl = this.querySelector(
        '.swc-AgenticConversationFlowDemo-scroll'
      );
      if (scrollEl) {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    });
  }

  private _clearGenerationTimers(): void {
    for (const timerId of this.generationTimers) {
      window.clearTimeout(timerId);
    }
    this.generationTimers = [];
  }

  private _schedule(delayMs: number, run: () => void): void {
    const timerId = window.setTimeout(run, delayMs);
    this.generationTimers.push(timerId);
  }

  private _patchTurn(targetId: string, patch: Partial<DemoTurn>): void {
    this.turns = this.turns.map((turn) =>
      turn.id === targetId ? { ...turn, ...patch } : turn
    );
  }

  private _stepsThroughActive(activeIndex: number): AgenticStep[] {
    return AGENTIC_STEP_SCRIPT.map((step, index) => {
      let status: ResponseStatusStepStatus = 'pending';
      if (index < activeIndex) {
        status = 'complete';
      } else if (index === activeIndex) {
        status = 'active';
      }
      return { ...step, status };
    });
  }

  private _startAgenticGeneration(targetId: string): void {
    this._clearGenerationTimers();
    this.generationStartedAt = Date.now();

    this._patchTurn(targetId, {
      loading: true,
      agenticPhase: 'initiating',
      agenticSteps: [],
      agenticDuration: 0,
      statusOpen: false,
    });

    const {
      processing,
      streamText,
      step1,
      step2,
      step3,
      step4,
      collapse,
      complete,
    } = AGENTIC_VIDEO_FLOW_TIMING;

    this._schedule(processing, () => {
      this._patchTurn(targetId, {
        agenticPhase: 'processing',
        agenticSteps: this._stepsThroughActive(0),
      });
    });

    this._schedule(streamText, () => {
      this._patchTurn(targetId, {
        text: agenticVideoGreeting(this.lastPrompt),
      });
    });

    this._schedule(step1, () => {
      this._patchTurn(targetId, {
        agenticSteps: this._stepsThroughActive(1),
      });
    });

    this._schedule(step2, () => {
      this._patchTurn(targetId, {
        agenticSteps: this._stepsThroughActive(2),
      });
    });

    this._schedule(step3, () => {
      this._patchTurn(targetId, {
        statusOpen: true,
      });
    });

    this._schedule(step4, () => {
      this._patchTurn(targetId, {
        agenticSteps: this._stepsThroughActive(3),
      });
    });

    this._schedule(collapse, () => {
      this._patchTurn(targetId, {
        statusOpen: false,
      });
    });

    this._schedule(complete, () => {
      const duration = Math.max(
        1,
        Math.round((Date.now() - this.generationStartedAt) / 1000)
      );
      this._patchTurn(targetId, {
        loading: false,
        agenticPhase: 'complete',
        agenticDuration: duration,
        agenticSteps: AGENTIC_STEP_SCRIPT.map((step) => ({
          ...step,
          status: 'complete',
        })),
        text: buildAssistantReply(this.lastPrompt),
        statusOpen: false,
      });
      this.isGenerating = false;
      this.responseTargetId = null;
      this._clearGenerationTimers();
    });
  }

  private submitPrompt(rawValue: string): void {
    const value = rawValue.trim();
    if (!value || this.isGenerating) {
      return;
    }

    const userTurn: DemoTurn = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: value,
    };
    const systemTurn: DemoTurn = {
      id: `system-${Date.now() + 1}`,
      role: 'system',
      text: '',
      loading: true,
    };

    this.turns = [...this.turns, userTurn, systemTurn];
    this.isGenerating = true;
    this.lastPrompt = value;
    this.responseTargetId = systemTurn.id;
    this.promptValue = '';
    this._startAgenticGeneration(systemTurn.id);
  }

  private stopGeneration = (): void => {
    if (!this.isGenerating || !this.responseTargetId) {
      return;
    }

    this._clearGenerationTimers();
    const targetId = this.responseTargetId;
    this._patchTurn(targetId, {
      loading: false,
      agenticPhase: 'stopped',
      statusOpen: true,
      text: '',
      agenticSteps: (
        this.turns.find((t) => t.id === targetId)?.agenticSteps ?? []
      ).map((step) =>
        step.status === 'active' ? { ...step, status: 'stopped' } : step
      ),
    });
    this.responseTargetId = null;
    this.isGenerating = false;
  };

  private handlePromptInput = (event: Event): void => {
    const inputEvent = event as CustomEvent<{ value?: string }>;
    this.promptValue = inputEvent.detail?.value ?? '';
  };

  private handlePromptSubmit = (event: Event): void => {
    const submitEvent = event as CustomEvent<{ value?: string }>;
    this.submitPrompt(submitEvent.detail?.value ?? '');
  };

  private handleStatusToggle = (event: Event): void => {
    const toggleEvent = event as CustomEvent<{ open?: boolean }>;
    const statusHost = event.target as HTMLElement | null;
    const turnId = statusHost?.getAttribute('data-status-id');
    const open = toggleEvent.detail?.open;
    if (!turnId || typeof open !== 'boolean') {
      return;
    }
    this.turns = this.turns.map((turn) =>
      turn.id === turnId ? { ...turn, statusOpen: open } : turn
    );
  };

  private renderAgenticStatus(turn: DemoTurn) {
    const phase =
      turn.agenticPhase ?? (turn.loading ? 'processing' : 'complete');
    return html`
      <swc-response-status
        slot="status"
        phase=${phase}
        duration=${turn.agenticDuration ?? 0}
        data-status-id=${turn.id}
        ?open=${!!turn.statusOpen}
        initiating-label="Processing request"
        reasoning-label="Execution steps"
      >
        ${(turn.agenticSteps ?? []).map(
          (step) => html`
            <swc-response-status-step
              title=${step.title}
              detail=${step.detail}
              kind=${step.kind}
              status=${step.status}
            ></swc-response-status-step>
          `
        )}
      </swc-response-status>
    `;
  }

  private renderTurns() {
    return this.turns.map((turn) => {
      if (turn.role === 'user') {
        return html`
          <swc-conversation-turn type="user">
            <swc-user-message>${turn.text}</swc-user-message>
          </swc-conversation-turn>
        `;
      }

      const showAgentic =
        turn.loading || (turn.agenticSteps && turn.agenticSteps.length > 0);

      return html`
        <swc-conversation-turn type="system">
          <swc-system-message>
            ${showAgentic
              ? this.renderAgenticStatus(turn)
              : html`
                  <swc-response-status slot="status" data-status-id=${turn.id}>
                    Draft complete. I used your latest prompt to generate this
                    response.
                  </swc-response-status>
                `}
            ${turn.text
              ? html`
                  <div class="swc-Typography--prose">
                    <p>${turn.text}</p>
                  </div>
                `
              : ''}
          </swc-system-message>
        </swc-conversation-turn>
      `;
    });
  }

  protected override render() {
    this.style.cssText =
      'display:flex;flex-direction:column;block-size:90vb;max-block-size:100vh;overflow:hidden;box-sizing:border-box;';

    return html`
      <style>
        .swc-AgenticConversationFlowDemo-shell {
          max-inline-size: 960px;
          margin: auto;
          padding: 24px;
          block-size: 100%;
          inline-size: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        .swc-AgenticConversationFlowDemo-scroll {
          flex: 1;
          min-block-size: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding-block-end: 24px;
          padding-block-start: 4px;
          padding-inline: 4px;
        }

        .swc-AgenticConversationFlowDemo-composer {
          flex-shrink: 0;
          padding-block-start: 8px;
        }

        .swc-AgenticConversationFlowDemo-hint {
          margin: 0 0 12px;
          color: var(--spectrum-gray-700);
          font-size: var(--spectrum-font-size-75);
        }
      </style>
      <div
        class="swc-AgenticConversationFlowDemo-shell"
        @swc-response-status-toggle=${this.handleStatusToggle}
      >
        <p
          class="swc-AgenticConversationFlowDemo-hint swc-Detail swc-Detail--sizeS"
        >
          Send a prompt (try “hello”) to match the reference flow — Processing
          request (~2s), rolling step titles while collapsed, panel auto-expands
          mid-run, then “Thought for N seconds”.
        </p>
        <div class="swc-AgenticConversationFlowDemo-scroll">
          <swc-conversation-thread>
            ${this.renderTurns()}
          </swc-conversation-thread>
        </div>
        <div class="swc-AgenticConversationFlowDemo-composer">
          <swc-prompt-field
            mode=${this.isGenerating ? 'loading' : 'default'}
            .value=${this.promptValue}
            @swc-prompt-field-input=${this.handlePromptInput}
            @swc-prompt-field-submit=${this.handlePromptSubmit}
            @swc-prompt-field-stop=${this.stopGeneration}
          ></swc-prompt-field>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('swc-agentic-conversation-flow-demo')) {
  customElements.define(
    'swc-agentic-conversation-flow-demo',
    AgenticConversationFlowDemo
  );
}

const meta: Meta = {
  title: 'Conversational AI/Conversation thread/Agentic flow (demo)',
  component: 'swc-agentic-conversation-flow-demo',
  tags: ['dev'],
  excludeStories: ['meta'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle:
        'Prompt submit drives agentic response status with timed step progression and rolling header titles.',
    },
  },
};

export { meta };
export default meta;

/** Frozen agentic thread for CI accessibility. {@link LiveFlow} is timed (`!test`). */
export const AgenticFlowAccessibility: Story = {
  tags: ['a11y'],
  render: () => {
    const completeSteps = AGENTIC_VIDEO_FLOW_STEPS.map(
      (step) => html`
        <swc-response-status-step
          title=${step.title}
          detail=${step.detail}
          kind=${step.kind}
          status="complete"
        ></swc-response-status-step>
      `
    );

    return html`
      <div
        style="max-width:960px;margin:auto;padding:24px;box-sizing:border-box;"
      >
        <swc-conversation-thread>
          <swc-conversation-turn type="user">
            <swc-user-message>
              Can you help me create a 45-minute presentation?
            </swc-user-message>
          </swc-conversation-turn>
          <swc-conversation-turn type="system">
            <swc-system-message>
              <swc-response-status
                slot="status"
                phase="complete"
                duration="12"
                reasoning-label="Execution steps"
              >
                ${completeSteps}
              </swc-response-status>
              <div class="swc-Typography--prose">
                <p>
                  I grouped your request into a presentation outline with three
                  supporting proof points and a concise close.
                </p>
              </div>
            </swc-system-message>
          </swc-conversation-turn>
        </swc-conversation-thread>
      </div>
    `;
  },
};

export const LiveFlow: Story = {
  tags: ['dev', '!test'],
  render: () => html`
    <swc-agentic-conversation-flow-demo></swc-agentic-conversation-flow-demo>
  `,
  parameters: {
    docs: {
      story: {
        height: '640px',
      },
    },
  },
};
