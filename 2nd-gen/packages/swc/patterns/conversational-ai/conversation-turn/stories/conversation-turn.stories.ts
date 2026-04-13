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

import { html, render } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../index.js';
import '../../system-message/index.js';
import '../../user-message/index.js';
import '../../conversation-artifact/index.js';
import '../../prompt-field/index.js';
import '../../response-status/index.js';
import '../../message-feedback/index.js';
import '../../message-sources/index.js';
import '../../suggestion/index.js';
import '../../suggestion-item/index.js';

import '../../system-prose-demo.css';

// ────────────────
//    METADATA
// ────────────────

/**
 * Column alignment for one chat turn: `type="user"` (end) vs `type="system"` (start, full width).
 * Slot **`swc-user-message`**, **`swc-system-message`**, or custom markup.
 * Stack consecutive messages in one turn to create grouped spacing.
 */
const meta: Meta = {
  title: 'Conversational AI/Conversation turn',
  component: 'swc-conversation-turn',
  parameters: {
    docs: {
      subtitle:
        'Aligns user vs system content in a thread column and supports grouped message stacking.',
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
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:16px;max-inline-size:600px;"
    >
      <swc-conversation-turn type="user">
        <swc-user-message>Short user question for the demo.</swc-user-message>
      </swc-conversation-turn>
      <swc-conversation-turn type="system">
        <swc-system-message>
          <swc-response-status slot="status"></swc-response-status>
          <div class="swc-conversationalAi-systemProse">
            <p>System reply body goes here.</p>
          </div>
          <swc-message-feedback slot="feedback"></swc-message-feedback>
        </swc-system-message>
      </swc-conversation-turn>
    </div>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:16px;max-inline-size:600px;"
    >
      <swc-conversation-turn type="user">
        <swc-user-message>
          Can you summarize the attached campaign assets?
        </swc-user-message>
      </swc-conversation-turn>
      <swc-conversation-turn type="system">
        <swc-system-message>
          <swc-response-status slot="status"></swc-response-status>
          <div class="swc-conversationalAi-systemProse">
            <p>
              Here is a concise summary based on the files you shared. I grouped
              themes by audience and channel.
            </p>
          </div>
          <swc-message-feedback slot="feedback"></swc-message-feedback>
        </swc-system-message>
      </swc-conversation-turn>
    </div>
  `,
  tags: ['overview'],
};

// ──────────────────────────────────────────
//    FULL PATTERN STORY
// ──────────────────────────────────────────

/**
 * Interactive simulated chat demo for README docs:
 * submit a prompt, show loading, then render a hardcoded system response.
 */
export const FullPattern: Story = {
  render: () => {
    type Feedback = 'positive' | 'negative' | undefined;
    type Message = {
      id: number;
      role: 'user' | 'system';
      text: string;
      reasoning?: string;
      loading?: boolean;
      feedback?: Feedback;
      suggestions?: string[];
    };
    type Artifact = {
      id: string;
      title: string;
      subtitle: string;
    };

    const container = document.createElement('div');
    let nextId = 1;

    let draft = '';
    let sending = false;
    let artifacts: Artifact[] = [
      { id: 'a1', title: 'Hilton commercial assets', subtitle: '2026' },
    ];
    let messages: Message[] = [
      {
        id: nextId++,
        role: 'user',
        text: 'Can you help me create a 45-minute presentation, with animations, for an executive update?',
      },
      {
        id: nextId++,
        role: 'system',
        text: 'I can help draft your executive update. Share a prompt and I will generate a structured outline.',
        reasoning:
          'I am prioritizing a concise executive storyline first, then mapping details into reusable sections for slides.',
      },
    ];

    const cannedResponses = [
      'Great direction. I suggest a 12-slide structure: market context, opportunity, strategy, roadmap, and risks with a clear executive summary.',
      'I can convert this into a 45-minute narrative flow with speaking notes and animation cues per section.',
      'Would you like me to tailor this for senior leadership or for cross-functional stakeholders?',
    ];
    const cannedReasoning = [
      'I used the uploaded context to prioritize business narrative, measurable outcomes, and leadership-level pacing.',
      'I translated the request into a timed talk track and grouped content into sections that can be animated progressively.',
      'I identified ambiguity in audience expectations and proposed a clarifying branch to avoid overfitting the deck.',
    ];
    const cannedSuggestions = [
      'Create a slide deck outline',
      'Summarize in 3 bullet points',
      'Turn this into speaker notes',
    ];
    const cannedSources = [
      'Hilton brand email — Q1 campaign 2026',
      'Market research — hospitality trends 2025',
      'User research — loyalty programme survey',
    ];

    const handleFeedback = (event: Event): void => {
      const target = event.currentTarget as HTMLElement | null;
      const messageId = Number(target?.dataset.messageId ?? '');
      if (!Number.isInteger(messageId)) {
        return;
      }
      const detail = (event as CustomEvent<{ status: 'positive' | 'negative' }>)
        .detail;
      messages = messages.map((entry) =>
        entry.id === messageId ? { ...entry, feedback: detail.status } : entry
      );
      rerender();
    };

    const handleSuggestion = (event: Event): void => {
      if (sending) {
        return;
      }
      const target = event.currentTarget as HTMLElement | null;
      const messageId = Number(target?.dataset.messageId ?? '');
      if (!Number.isInteger(messageId)) {
        return;
      }
      const suggestion = (event as CustomEvent<{ label: string }>).detail.label;
      if (!suggestion) {
        return;
      }
      draft = suggestion;
      rerender();
    };

    const handlePromptInput = (event: Event): void => {
      const detail = (event as CustomEvent<{ value: string }>).detail;
      draft = detail.value;
      rerender();
    };

    const handleUploadClick = (): void => {
      if (artifacts.length >= 2) {
        return;
      }
      artifacts = [
        ...artifacts,
        {
          id: `a${artifacts.length + 1}`,
          title:
            artifacts.length === 0 ? 'Brand guidelines' : 'Campaign references',
          subtitle: artifacts.length === 0 ? 'PDF' : 'ZIP',
        },
      ];
      rerender();
    };

    const handleArtifactDismiss = (event: Event): void => {
      const artifact = (event as CustomEvent<{ artifact: Element }>).detail
        .artifact as HTMLElement;
      const artifactId = artifact.dataset.artifactId;
      if (!artifactId) {
        return;
      }
      artifacts = artifacts.filter((entry) => entry.id !== artifactId);
      rerender();
    };

    const handleSubmit = (): void => {
      const nextPrompt = draft.trim();
      if (!nextPrompt || sending) {
        return;
      }

      sending = true;
      draft = '';
      messages = [
        ...messages,
        { id: nextId++, role: 'user', text: nextPrompt },
        { id: nextId, role: 'system', text: '', loading: true },
      ];
      nextId += 1;
      rerender();

      window.setTimeout(() => {
        sending = false;
        const responseText =
          cannedResponses[
            (messages.length + nextPrompt.length) % cannedResponses.length
          ];
        messages = messages.map((entry) =>
          entry.loading
            ? {
                ...entry,
                loading: false,
                text: responseText,
                reasoning:
                  cannedReasoning[
                    (messages.length + nextPrompt.length) %
                      cannedReasoning.length
                  ],
                suggestions: cannedSuggestions,
              }
            : entry
        );
        rerender();
      }, 1200);
    };

    function rerender(): void {
      render(
        html`
          <div
            style="display:flex;flex-direction:column;gap:24px;max-width:600px;padding:24px;"
          >
            ${messages.map((message) =>
              message.role === 'user'
                ? html`
                    <swc-conversation-turn type="user">
                      <swc-user-message>${message.text}</swc-user-message>
                    </swc-conversation-turn>
                  `
                : html`
                    <swc-conversation-turn type="system">
                      <swc-system-message>
                        <swc-response-status
                          slot="status"
                          ?loading=${message.loading === true}
                        >
                          ${message.reasoning
                            ? html`
                                <span>${message.reasoning}</span>
                              `
                            : ''}
                        </swc-response-status>
                        ${message.loading
                          ? ''
                          : html`
                              <div class="swc-conversationalAi-systemProse">
                                <p>${message.text}</p>
                              </div>

                              <swc-message-feedback
                                slot="feedback"
                                .status=${message.feedback}
                                data-message-id=${String(message.id)}
                                @swc-feedback=${handleFeedback}
                              ></swc-message-feedback>

                              <swc-message-sources slot="sources" open>
                                ${cannedSources.map(
                                  (source) => html`
                                    <li><a href="#">${source}</a></li>
                                  `
                                )}
                              </swc-message-sources>

                              <swc-suggestion
                                slot="suggestions"
                                title="What would you like to do next?"
                                data-message-id=${String(message.id)}
                                @swc-suggestion=${handleSuggestion}
                              >
                                ${(message.suggestions ?? []).map(
                                  (suggestion) => html`
                                    <swc-suggestion-item>
                                      ${suggestion}
                                    </swc-suggestion-item>
                                  `
                                )}
                              </swc-suggestion>
                            `}
                      </swc-system-message>
                    </swc-conversation-turn>
                  `
            )}

            <swc-prompt-field
              .value=${draft}
              .sending=${sending}
              @swc-input=${handlePromptInput}
              @swc-upload-click=${handleUploadClick}
              @swc-dismiss=${handleArtifactDismiss}
              @swc-submit=${handleSubmit}
            >
              ${artifacts.map(
                (artifact) => html`
                  <swc-conversation-artifact
                    slot="artifact"
                    variant="card"
                    dismissible
                    data-artifact-id=${artifact.id}
                  >
                    <div
                      slot="thumbnail"
                      style="inline-size:28px;block-size:28px;border-radius:3px;background:var(--swc-gray-200);flex-shrink:0;"
                      role="img"
                      aria-label="File"
                    ></div>
                    <span slot="title">${artifact.title}</span>
                    <span slot="subtitle">${artifact.subtitle}</span>
                  </swc-conversation-artifact>
                `
              )}
            </swc-prompt-field>
          </div>
        `,
        container
      );
    }

    rerender();
    return container;
  },
  tags: ['full-pattern'],
};
