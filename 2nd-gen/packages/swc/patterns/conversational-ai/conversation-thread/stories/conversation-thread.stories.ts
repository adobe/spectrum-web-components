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
import '../../message-feedback/index.js';
import '../../message-sources/index.js';
import '../../suggestion/index.js';
import '../../suggestion-item/index.js';
import '../../prompt-field/index.js';
import '../../upload-artifact/index.js';

import { uniqueId } from '../../../../utils/id.js';

import '../../system-prose-demo.css';

// ────────────────
//    METADATA
// ────────────────

/**
 * Vertical thread wrapper for chat turns with arrow-key navigation.
 * Use `ArrowUp` / `ArrowDown` to move across turns and `Home` / `End` to jump.
 *
 *
 * Note: `swc-conversation-thread` uses a per-instance navigation controller that
 * queries slotted items on slot changes and keyboard events. Virtualization is
 * explicitly out of scope for this component; it is a presentational layer
 * only. Products should implement virtualization at the data or model layer
 * and feed only visible subsets to the thread.
 */
const meta: Meta = {
  title: 'Conversational AI/Conversation thread',
  component: 'swc-conversation-thread',
  parameters: {
    docs: {
      subtitle:
        'Stacks conversation turns and enables roving keyboard focus between them.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export { meta };
export default meta;

const threadExampleSource = `<swc-conversation-thread style="max-inline-size: 720px;">
  <swc-conversation-turn type="user">
    <swc-user-message>
      Can you help me create a 45-minute presentation, with animations, for an executive update?
    </swc-user-message>
  </swc-conversation-turn>
  <swc-conversation-turn type="system">
    <swc-system-message>
      <swc-response-status slot="status">I interpreted your request as an executive narrative task and prioritized a concise, audience-ready structure.</swc-response-status>
      <div class="swc-conversationalAi-systemProse swc-Typography--prose">
        <h3>Big idea/core narrative: The warmth of welcome</h3>
        <p>Hospitality begins the moment our customers set foot off their plane.</p>
      </div>
      <swc-message-feedback slot="feedback"></swc-message-feedback>
      <swc-message-sources slot="sources">
        <a href="#source-1">Brand brief Q1 2026</a>
      </swc-message-sources>
    </swc-system-message>
  </swc-conversation-turn>
  <swc-conversation-turn type="user">
    <swc-user-message>Great. Can you shorten that into three slides?</swc-user-message>
  </swc-conversation-turn>
</swc-conversation-thread>`;

const renderThread = () => html`
  <swc-conversation-thread style="max-inline-size: 720px;">
    <swc-conversation-turn type="user">
      <swc-user-message>
        Can you help me create a 45-minute presentation, with animations, for an
        executive update?
      </swc-user-message>
    </swc-conversation-turn>

    <swc-conversation-turn type="system">
      <swc-system-message>
        <swc-response-status slot="status">
          I interpreted your request as an executive narrative task and
          prioritized a concise, audience-ready structure.
        </swc-response-status>
        <div class="swc-conversationalAi-systemProse swc-Typography--prose">
          <h3>Big idea/core narrative: The warmth of welcome</h3>
          <p>
            Hospitality begins the moment our customers set foot off their
            plane.
          </p>
        </div>
        <swc-message-feedback slot="feedback"></swc-message-feedback>
        <swc-message-sources slot="sources">
          <a href="#source-1">Brand brief Q1 2026</a>
        </swc-message-sources>
      </swc-system-message>
    </swc-conversation-turn>

    <swc-conversation-turn type="user">
      <swc-user-message>
        Great. Can you shorten that into three slides?
      </swc-user-message>
    </swc-conversation-turn>
  </swc-conversation-thread>
`;

type DemoArtifact = {
  id: string;
  title: string;
  subtitle: string;
  /** Present only for image uploads; used to render `type="media"` in the thread. */
  thumbnailUrl?: string;
  objectUrl?: string;
};

type DemoTurn = {
  id: string;
  role: 'user' | 'system';
  text: string;
  artifacts?: DemoArtifact[];
  loading?: boolean;
  statusOpen?: boolean;
  sourcesOpen?: boolean;
  feedbackStatus?: 'positive' | 'negative' | undefined;
};

const DEMO_SUGGESTIONS = [
  'Create year-over-year growth chart',
  'Generate congratulatory poster',
  'Summarize development pipeline',
] as const;

const buildAssistantReply = (prompt: string): string => {
  const normalized = prompt.trim() || 'your request';
  return `Great direction. Based on "${normalized}", I suggest a 12-slide structure with a clear narrative arc, three supporting proof points, and a concise close with next steps.`;
};

class ConversationFullPatternDemo extends LitElement {
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
      statusOpen: false,
      sourcesOpen: false,
    },
  ];

  @state()
  private artifacts: DemoArtifact[] = [];

  @state()
  private promptValue = '';

  @state()
  private isGenerating = false;

  private readonly fileInputId = `conv-demo-upload-${crypto.randomUUID()}`;
  private responseTimer: number | null = null;
  private responseTargetId: string | null = null;
  private lastPrompt = '';

  public override disconnectedCallback(): void {
    if (this.responseTimer !== null) {
      window.clearTimeout(this.responseTimer);
      this.responseTimer = null;
    }
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(): void {
    requestAnimationFrame(() => {
      const scrollEl = this.querySelector(
        '.swc-ConversationFullPatternDemo-scroll'
      );
      if (scrollEl) {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    });
  }

  private submitPrompt(rawValue: string): void {
    const value = rawValue.trim();
    const hasArtifacts = this.artifacts.length > 0;
    if ((!value && !hasArtifacts) || this.isGenerating) {
      return;
    }

    const userTurn: DemoTurn = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: value,
      artifacts: hasArtifacts ? [...this.artifacts] : undefined,
    };
    const systemTurn: DemoTurn = {
      id: `system-${Date.now() + 1}`,
      role: 'system',
      text: '',
      loading: true,
      statusOpen: false,
      sourcesOpen: false,
    };

    this.turns = [...this.turns, userTurn, systemTurn];
    this.isGenerating = true;
    this.lastPrompt =
      value ||
      (hasArtifacts ? this.artifacts.map((a) => a.title).join(', ') : '');
    this.responseTargetId = systemTurn.id;
    this.promptValue = '';
    for (const artifact of this.artifacts) {
      if (artifact.objectUrl) {
        URL.revokeObjectURL(artifact.objectUrl);
      }
    }
    this.artifacts = [];

    this.responseTimer = window.setTimeout(() => {
      this.completeGeneration();
    }, 1200);
  }

  private completeGeneration(): void {
    if (!this.responseTargetId) {
      return;
    }

    const targetId = this.responseTargetId;
    const reply = buildAssistantReply(this.lastPrompt);
    this.turns = this.turns.map((turn) =>
      turn.id === targetId ? { ...turn, loading: false, text: reply } : turn
    );
    this.responseTargetId = null;
    this.responseTimer = null;
    this.isGenerating = false;
  }

  private stopGeneration = (): void => {
    if (!this.isGenerating) {
      return;
    }

    if (this.responseTimer !== null) {
      window.clearTimeout(this.responseTimer);
      this.responseTimer = null;
    }

    if (this.responseTargetId) {
      const targetId = this.responseTargetId;
      this.turns = this.turns.map((turn) =>
        turn.id === targetId
          ? {
              ...turn,
              loading: false,
              text: 'Generation stopped. Update the prompt to continue.',
            }
          : turn
      );
    }

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

  private appendFiles(files: File[]): void {
    const nextArtifacts = files.map((file, index) => {
      const mimeType = file.type || '';
      const lowerName = file.name.toLowerCase();
      const isImage =
        mimeType.startsWith('image/') ||
        /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/.test(lowerName);
      const objectUrl = isImage ? URL.createObjectURL(file) : undefined;
      const sizeLabel =
        typeof file.size === 'number'
          ? `${Math.max(1, Math.round(file.size / 1024))} KB`
          : 'Attachment';
      return {
        id: uniqueId(`artifact-${index}`),
        title: file.name || 'Attachment',
        subtitle: sizeLabel,
        thumbnailUrl: objectUrl,
        objectUrl,
      } satisfies DemoArtifact;
    });

    if (!nextArtifacts.length) {
      return;
    }
    this.artifacts = [...this.artifacts, ...nextArtifacts];
  }

  private handleUploadClick = (event: Event): void => {
    event.preventDefault();
    const input = this.querySelector<HTMLInputElement>(`#${this.fileInputId}`);
    input?.click();
  };

  private handleExternalInput = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) {
      return;
    }
    this.appendFiles(files);
    input.value = '';
  };

  private handleFeedback = (event: Event): void => {
    const feedbackEvent = event as CustomEvent<{
      status?: 'positive' | 'negative' | undefined;
    }>;
    const feedbackHost = event.target as HTMLElement | null;
    const turnId = feedbackHost?.getAttribute('data-feedback-id');
    if (!turnId) {
      return;
    }
    this.turns = this.turns.map((turn) =>
      turn.id === turnId
        ? { ...turn, feedbackStatus: feedbackEvent.detail.status }
        : turn
    );
  };

  private handleSuggestion = (event: Event): void => {
    const suggestionEvent = event as CustomEvent<{ label?: string }>;
    const label = suggestionEvent.detail?.label?.trim() ?? '';
    if (!label) {
      return;
    }
    this.submitPrompt(label);
  };

  private handleDismiss = (event: Event): void => {
    const artifact = event.target as HTMLElement | null;
    const artifactId = artifact?.getAttribute('data-artifact-id');
    if (!artifactId) {
      return;
    }
    const removed = this.artifacts.find((item) => item.id === artifactId);
    if (removed?.objectUrl) {
      URL.revokeObjectURL(removed.objectUrl);
    }
    this.artifacts = this.artifacts.filter((item) => item.id !== artifactId);
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

  private handleSourcesToggle = (event: Event): void => {
    const toggleEvent = event as CustomEvent<{ open?: boolean }>;
    const sourcesHost = event.target as HTMLElement | null;
    const turnId = sourcesHost?.getAttribute('data-sources-id');
    const open = toggleEvent.detail?.open;
    if (!turnId || typeof open !== 'boolean') {
      return;
    }
    this.turns = this.turns.map((turn) =>
      turn.id === turnId ? { ...turn, sourcesOpen: open } : turn
    );
  };

  private renderTurns() {
    return this.turns.map((turn) => {
      if (turn.role === 'user') {
        return html`
          ${(turn.artifacts ?? []).map((artifact) =>
            artifact.thumbnailUrl
              ? html`
                  <swc-conversation-turn type="user">
                    <swc-user-message type="media">
                      <img
                        slot="thumbnail"
                        src=${artifact.thumbnailUrl}
                        alt=${artifact.title}
                        style="inline-size:100%;block-size:100%;object-fit:cover;"
                      />
                      <span slot="title">${artifact.title}</span>
                      <span slot="subtitle">${artifact.subtitle}</span>
                    </swc-user-message>
                  </swc-conversation-turn>
                `
              : html`
                  <swc-conversation-turn type="user">
                    <swc-user-message type="card">
                      <div
                        slot="thumbnail"
                        role="img"
                        aria-label="File"
                        style="inline-size:32px;block-size:32px;border-radius:3px;background:var(--swc-gray-200);flex-shrink:0;"
                      ></div>
                      <span slot="title">${artifact.title}</span>
                      <span slot="subtitle">${artifact.subtitle}</span>
                    </swc-user-message>
                  </swc-conversation-turn>
                `
          )}
          ${turn.text
            ? html`
                <swc-conversation-turn type="user">
                  <swc-user-message>${turn.text}</swc-user-message>
                </swc-conversation-turn>
              `
            : ''}
        `;
      }

      return html`
        <swc-conversation-turn type="system">
          <swc-system-message>
            ${turn.loading
              ? html`
                  <swc-response-status
                    slot="status"
                    loading
                  ></swc-response-status>
                `
              : html`
                  <swc-response-status
                    slot="status"
                    data-status-id=${turn.id}
                    ?open=${!!turn.statusOpen}
                  >
                    Draft complete. I used your latest prompt to generate this
                    response.
                  </swc-response-status>
                `}
            ${turn.loading
              ? ''
              : html`
                  <div
                    class="swc-conversationalAi-systemProse swc-Typography--prose"
                  >
                    <p>${turn.text}</p>
                  </div>
                `}
            ${turn.loading
              ? ''
              : html`
                  <swc-message-feedback
                    slot="feedback"
                    data-feedback-id=${turn.id}
                    status=${turn.feedbackStatus ?? ''}
                  ></swc-message-feedback>
                `}
            ${turn.loading
              ? ''
              : html`
                  <swc-message-sources
                    slot="sources"
                    data-sources-id=${turn.id}
                    ?open=${!!turn.sourcesOpen}
                  >
                    <a href="#">Brand brief Q1 2026</a>
                    <a href="#">Market research summary</a>
                  </swc-message-sources>
                `}
            ${turn.loading
              ? ''
              : html`
                  <swc-suggestion-group
                    slot="suggestions"
                    heading="What would you like to do next?"
                  >
                    ${DEMO_SUGGESTIONS.map(
                      (item) => html`
                        <swc-suggestion-item data-suggestion=${item}>
                          ${item}
                        </swc-suggestion-item>
                      `
                    )}
                  </swc-suggestion-group>
                `}
          </swc-system-message>
        </swc-conversation-turn>
      `;
    });
  }

  private renderArtifacts() {
    return this.artifacts.map(
      (artifact) => html`
        <swc-upload-artifact
          slot="artifact"
          type=${artifact.thumbnailUrl ? 'media' : 'card'}
          dismissible
          data-artifact-id=${artifact.id}
        >
          ${artifact.thumbnailUrl
            ? html`
                <img
                  slot="thumbnail"
                  src=${artifact.thumbnailUrl}
                  alt=${artifact.title}
                  style="inline-size:100%;block-size:100%;object-fit:cover;"
                />
              `
            : html`
                <div
                  slot="thumbnail"
                  role="img"
                  aria-label="File thumbnail"
                  style="inline-size:40px;block-size:40px;background:var(--swc-gray-200);border-radius:4px;"
                ></div>
              `}
          ${artifact.thumbnailUrl
            ? ''
            : html`
                <span slot="title">${artifact.title}</span>
                <span slot="subtitle">${artifact.subtitle}</span>
              `}
        </swc-upload-artifact>
      `
    );
  }

  protected override render() {
    this.style.cssText =
      'display:flex;flex-direction:column;block-size:100vh;max-block-size:100vh;overflow:hidden;box-sizing:border-box;';

    return html`
      <style>
        .swc-ConversationFullPatternDemo-shell {
          max-inline-size: 960px;
          margin: auto;
          padding: 24px;
          block-size: 100%;
          inline-size: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        .swc-ConversationFullPatternDemo-scroll {
          flex: 1;
          min-block-size: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding-inline: 4px 8px;
          padding-block-end: 24px;
          scroll-padding-inline-end: 8px;
          scroll-padding-block-end: 24px;
          overscroll-behavior: contain;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .swc-ConversationFullPatternDemo-scroll::-webkit-scrollbar {
          display: none;
        }

        .swc-ConversationFullPatternDemo-composer {
          flex-shrink: 0;
          padding-block-start: 8px;
        }
      </style>
      <div
        class="swc-ConversationFullPatternDemo-shell"
        @swc-message-feedback-change=${this.handleFeedback}
        @swc-suggestion=${this.handleSuggestion}
        @swc-upload-artifact-dismiss=${this.handleDismiss}
        @swc-response-status-toggle=${this.handleStatusToggle}
        @swc-message-sources-toggle=${this.handleSourcesToggle}
      >
        <div class="swc-ConversationFullPatternDemo-scroll">
          <swc-conversation-thread
            style="--swc-conversation-thread-gap:24px;padding:4px;"
          >
            ${this.renderTurns()}
          </swc-conversation-thread>
        </div>
        <div class="swc-ConversationFullPatternDemo-composer">
          <swc-prompt-field
            mode=${this.isGenerating ? 'loading' : 'default'}
            .value=${this.promptValue}
            @swc-prompt-field-input=${this.handlePromptInput}
            @swc-prompt-field-submit=${this.handlePromptSubmit}
            @swc-prompt-field-stop=${this.stopGeneration}
            @swc-prompt-field-upload-click=${this.handleUploadClick}
          >
            ${this.renderArtifacts()}
          </swc-prompt-field>
          <input
            id=${this.fileInputId}
            type="file"
            multiple
            hidden
            @change=${this.handleExternalInput}
          />
        </div>
      </div>
    `;
  }
}

if (!customElements.get('swc-conversation-full-pattern-demo')) {
  customElements.define(
    'swc-conversation-full-pattern-demo',
    ConversationFullPatternDemo
  );
}

const fullPatternSource = `<div style="max-width:800px; margin:auto; padding:24px; display:flex; flex-direction:column; gap:16px;">
  <swc-conversation-thread style="--swc-conversation-thread-gap:24px;">
    <swc-conversation-turn type="user">
      <swc-user-message>Can you help me create a 45-minute presentation?</swc-user-message>
    </swc-conversation-turn>
    <swc-conversation-turn type="system">
      <swc-system-message>
        <swc-response-status slot="status">I interpreted your request as an executive narrative task and prioritized a concise, audience-ready structure.</swc-response-status>
        <div class="swc-conversationalAi-systemProse swc-Typography--prose">
          <p>Great direction. I suggest a 12-slide structure...</p>
        </div>
        <swc-message-feedback slot="feedback"></swc-message-feedback>
        <swc-message-sources slot="sources">
          <a href="#">Brand brief Q1 2026</a>
        </swc-message-sources>
      </swc-system-message>
    </swc-conversation-turn>
  </swc-conversation-thread>

  <swc-prompt-field>
    <swc-upload-artifact slot="artifact" type="card" dismissible>
      <div
        slot="thumbnail"
        role="img"
        aria-label="File thumbnail"
        style="background:var(--swc-gray-200);"
      ></div>
      <span slot="title">Hilton commercial assets</span>
      <span slot="subtitle">2026</span>
    </swc-upload-artifact>
  </swc-prompt-field>
</div>`;

const renderFullPattern = () => html`
  <swc-conversation-full-pattern-demo></swc-conversation-full-pattern-demo>
`;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: renderThread,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  render: renderThread,
  tags: ['overview'],
  parameters: {
    docs: {
      source: {
        code: threadExampleSource,
      },
    },
  },
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

/**
 * ### Keyboard behavior
 *
 * - Tab enters the thread on the active turn.
 * - Shift+Tab from controls after the thread returns to the active turn.
 * - ArrowUp and ArrowDown move between turns.
 * - Home and End jump to first and last turn.
 *
 * ### Focus behavior
 *
 * - The thread applies roving `tabindex` across slotted `<swc-conversation-turn>` children.
 * - Exactly one turn is tabbable at a time.
 * - A newly appended turn becomes the active roving target.
 */
export const Accessibility: Story = {
  render: renderThread,
  tags: ['a11y'],
  parameters: {
    docs: {
      source: {
        code: threadExampleSource,
      },
    },
  },
};

// ──────────────────────────────
//    FULL PATTERN STORY
// ──────────────────────────────

export const FullPattern: Story = {
  render: renderFullPattern,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        height: '600px',
      },
      source: {
        code: fullPatternSource,
      },
    },
  },
};
