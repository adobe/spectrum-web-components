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
      <div class="swc-conversationalAi-systemProse">
        <h3>Big idea/core narrative: The warmth of welcome</h3>
        <p>Hospitality begins the moment our customers set foot off their plane.</p>
      </div>
      <swc-message-feedback slot="feedback"></swc-message-feedback>
      <swc-message-sources slot="sources">
        <li><a href="#source-1">Brand brief Q1 2026</a></li>
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
        <div class="swc-conversationalAi-systemProse">
          <h3>Big idea/core narrative: The warmth of welcome</h3>
          <p>
            Hospitality begins the moment our customers set foot off their
            plane.
          </p>
        </div>
        <swc-message-feedback slot="feedback"></swc-message-feedback>
        <swc-message-sources slot="sources">
          <li><a href="#source-1">Brand brief Q1 2026</a></li>
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
};

type DemoTurn = {
  id: string;
  role: 'user' | 'system';
  text: string;
  artifacts?: DemoArtifact[];
  loading?: boolean;
  feedbackStatus?: 'positive' | 'negative';
};

const DEMO_SUGGESTIONS = [
  'Create year-over-year growth chart',
  'Generate congratulatory poster',
  'Summarize development pipeline',
] as const;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildAssistantReply = (prompt: string): string => {
  const normalized = prompt.trim() || 'your request';
  return `Great direction. Based on "${normalized}", I suggest a 12-slide structure with a clear narrative arc, three supporting proof points, and a concise close with next steps.`;
};

class ConversationFullPatternDemo extends HTMLElement {
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
    },
  ];

  private artifacts: DemoArtifact[] = [];

  private promptValue = '';
  private isGenerating = false;
  private responseTimer: number | null = null;
  private responseTargetId: string | null = null;
  private lastPrompt = '';
  private listenersAttached = false;

  public connectedCallback(): void {
    if (!this.listenersAttached) {
      this.listenersAttached = true;
      this.addEventListener('swc-feedback', this.handleFeedback);
      this.addEventListener('swc-suggestion', this.handleSuggestion);
      this.addEventListener('swc-dismiss', this.handleDismiss);
    }
    this.render();
  }

  public disconnectedCallback(): void {
    if (this.responseTimer !== null) {
      window.clearTimeout(this.responseTimer);
      this.responseTimer = null;
    }
    this.removeEventListener('swc-feedback', this.handleFeedback);
    this.removeEventListener('swc-suggestion', this.handleSuggestion);
    this.removeEventListener('swc-dismiss', this.handleDismiss);
    this.listenersAttached = false;
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
    };

    this.turns = [...this.turns, userTurn, systemTurn];
    this.isGenerating = true;
    this.lastPrompt =
      value ||
      (hasArtifacts ? this.artifacts.map((a) => a.title).join(', ') : '');
    this.responseTargetId = systemTurn.id;
    this.promptValue = '';
    this.artifacts = [];
    this.render();

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
    this.render();
  }

  private stopGeneration(): void {
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
    this.render();
  }

  private renderTurns(): string {
    return this.turns
      .map((turn) => {
        if (turn.role === 'user') {
          const artifactMessages = (turn.artifacts ?? [])
            .map((artifact) => {
              if (artifact.thumbnailUrl) {
                return `<swc-user-message type="media">
                  <img
                    slot="thumbnail"
                    src="${artifact.thumbnailUrl}"
                    alt="${escapeHtml(artifact.title)}"
                    style="inline-size:100%;block-size:100%;object-fit:cover;"
                  />
                  <span slot="title">${escapeHtml(artifact.title)}</span>
                  <span slot="subtitle">${escapeHtml(artifact.subtitle)}</span>
                </swc-user-message>`;
              }
              return `<swc-user-message type="card">
                <div
                  slot="thumbnail"
                  role="img"
                  aria-label="File"
                  style="inline-size:32px;block-size:32px;border-radius:3px;background:var(--swc-gray-200);flex-shrink:0;"
                ></div>
                <span slot="title">${escapeHtml(artifact.title)}</span>
                <span slot="subtitle">${escapeHtml(artifact.subtitle)}</span>
              </swc-user-message>`;
            })
            .join('');
          const copyMessage = turn.text
            ? `<swc-user-message>${escapeHtml(turn.text)}</swc-user-message>`
            : '';
          return `
            <swc-conversation-turn type="user">
              ${artifactMessages}${copyMessage}
            </swc-conversation-turn>
          `;
        }

        const feedback = turn.loading
          ? ''
          : `<swc-message-feedback slot="feedback" data-feedback-id="${turn.id}" status="${turn.feedbackStatus ?? ''}"></swc-message-feedback>`;
        const sources = turn.loading
          ? ''
          : `<swc-message-sources slot="sources"><li><a href="#">Brand brief Q1 2026</a></li><li><a href="#">Market research summary</a></li></swc-message-sources>`;
        const suggestions = turn.loading
          ? ''
          : `<swc-suggestion slot="suggestions" title="What would you like to do next?">
              ${DEMO_SUGGESTIONS.map(
                (item) =>
                  `<swc-suggestion-item data-suggestion="${escapeHtml(item)}">${escapeHtml(item)}</swc-suggestion-item>`
              ).join('')}
            </swc-suggestion>`;
        const status = turn.loading
          ? '<swc-response-status slot="status" loading></swc-response-status>'
          : `<swc-response-status slot="status">Draft complete. I used your latest prompt to generate this response.</swc-response-status>`;
        const body = turn.loading
          ? ''
          : `<div class="swc-conversationalAi-systemProse"><p>${escapeHtml(turn.text)}</p></div>`;

        return `
          <swc-conversation-turn type="system">
            <swc-system-message>
              ${status}
              ${body}
              ${feedback}
              ${sources}
              ${suggestions}
            </swc-system-message>
          </swc-conversation-turn>
        `;
      })
      .join('');
  }

  private renderArtifacts(): string {
    return this.artifacts
      .map((artifact) => {
        const thumbnail = artifact.thumbnailUrl
          ? `<img
               slot="thumbnail"
               src="${artifact.thumbnailUrl}"
               alt="${escapeHtml(artifact.title)}"
               style="inline-size:40px;block-size:40px;object-fit:cover;border-radius:4px;"
             />`
          : `<div
               slot="thumbnail"
               role="img"
               aria-label="File thumbnail"
               style="inline-size:40px;block-size:40px;background:var(--swc-gray-200);border-radius:4px;"
             ></div>`;

        return `
          <swc-upload-artifact slot="artifact" type="card" dismissible data-artifact-id="${artifact.id}">
            ${thumbnail}
            <span slot="title">${escapeHtml(artifact.title)}</span>
            <span slot="subtitle">${escapeHtml(artifact.subtitle)}</span>
          </swc-upload-artifact>
        `;
      })
      .join('');
  }

  private render(): void {
    this.style.cssText =
      'display:flex;flex-direction:column;block-size:100vh;max-block-size:100vh;overflow:hidden;box-sizing:border-box;';

    this.innerHTML = `
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
          padding-block-end: 16px;
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
      <div class="swc-ConversationFullPatternDemo-shell">
        <div class="swc-ConversationFullPatternDemo-scroll">
          <swc-conversation-thread style="--swc-conversation-thread-gap:24px;">
            ${this.renderTurns()}
          </swc-conversation-thread>
        </div>
        <div class="swc-ConversationFullPatternDemo-composer">
          <swc-prompt-field mode="${this.isGenerating ? 'loading' : 'default'}">
            ${this.renderArtifacts()}
          </swc-prompt-field>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      const scrollEl = this.querySelector(
        '.swc-ConversationFullPatternDemo-scroll'
      );
      if (scrollEl) {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    });

    const promptField = this.querySelector('swc-prompt-field') as
      | (HTMLElement & { value?: string })
      | null;
    if (promptField) {
      promptField.value = this.promptValue;
      promptField.addEventListener('swc-submit', (event: Event) => {
        const submitEvent = event as CustomEvent<{ value?: string }>;
        this.submitPrompt(submitEvent.detail?.value ?? '');
      });
      promptField.addEventListener('swc-stop', () => {
        this.stopGeneration();
      });
      promptField.addEventListener('swc-files-selected', (event: Event) => {
        // Preserve any text the user has already typed before re-render destroys the field.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.promptValue = (promptField as any).value ?? this.promptValue;

        const filesEvent = event as CustomEvent<{
          artifactValues?: Array<{
            name?: string;
            mimeType?: string;
            size?: number;
          }>;
        }>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawFiles: File[] = (filesEvent.detail as any)?.files ?? [];
        const nextArtifacts =
          filesEvent.detail?.artifactValues?.map((artifact, index) => {
            const mimeType = artifact.mimeType ?? '';
            const isImage = mimeType.startsWith('image/');
            const sizeLabel =
              typeof artifact.size === 'number'
                ? `${Math.max(1, Math.round(artifact.size / 1024))} KB`
                : 'Attachment';
            const rawFile = rawFiles[index];
            const thumbnailUrl =
              isImage && rawFile ? URL.createObjectURL(rawFile) : undefined;
            return {
              id: `artifact-${Date.now()}-${index}`,
              title: artifact.name ?? 'Attachment',
              subtitle: sizeLabel,
              thumbnailUrl,
            } satisfies DemoArtifact;
          }) ?? [];

        if (!nextArtifacts.length) {
          return;
        }
        this.artifacts = [...this.artifacts, ...nextArtifacts];
        this.render();
      });
    }
  }

  private handleFeedback = (event: Event): void => {
    const feedbackEvent = event as CustomEvent<{
      status?: 'positive' | 'negative';
    }>;
    const feedbackHost = event.target as HTMLElement | null;
    const turnId = feedbackHost?.getAttribute('data-feedback-id');
    if (!turnId || !feedbackEvent.detail?.status) {
      return;
    }
    this.turns = this.turns.map((turn) =>
      turn.id === turnId
        ? { ...turn, feedbackStatus: feedbackEvent.detail.status }
        : turn
    );
    this.render();
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
    this.artifacts = this.artifacts.filter((item) => item.id !== artifactId);
    this.render();
  };
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
        <div class="swc-conversationalAi-systemProse">
          <p>Great direction. I suggest a 12-slide structure...</p>
        </div>
        <swc-message-feedback slot="feedback"></swc-message-feedback>
        <swc-message-sources slot="sources">
          <li><a href="#">Brand brief Q1 2026</a></li>
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
 * - ArrowUp and ArrowDown move between turns.
 * - Home and End jump to first and last turn.
 *
 * ### Focus behavior
 *
 * - The thread applies roving `tabindex` across slotted `<swc-conversation-turn>` children.
 * - Exactly one turn is tabbable at a time.
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
