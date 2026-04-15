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
import '../../upload-artifact/index.js';
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
      uploads?: Artifact[];
      reasoning?: string;
      loading?: boolean;
      feedback?: Feedback;
      suggestions?: string[];
    };
    type Artifact = {
      id: string;
      title: string;
      subtitle: string;
      mimeType: string;
      size: number;
      file: File;
      previewUrl?: string;
    };

    const container = document.createElement('div');
    let nextId = 1;

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

    let draft = '';
    let sending = false;
    let artifacts: Artifact[] = [];
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
        suggestions: cannedSuggestions,
      },
    ];

    const getArtifactTypeLabel = (artifact: Artifact): string => {
      if (artifact.mimeType.startsWith('application/pdf')) {
        return 'PDF';
      }
      if (artifact.mimeType.startsWith('video/')) {
        return 'VID';
      }
      if (artifact.mimeType.startsWith('audio/')) {
        return 'AUD';
      }

      const extension = artifact.title.split('.').pop()?.trim();
      return extension ? extension.slice(0, 4).toUpperCase() : 'FILE';
    };

    const getUploadArtifactType = (artifact: Artifact): 'card' | 'media' =>
      artifact.mimeType.startsWith('image/') ? 'media' : 'card';

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

    const sendConversationTurn = (
      nextPromptValue: string,
      submittedArtifacts: Artifact[] = []
    ): void => {
      const nextPrompt = nextPromptValue.trim();
      if (sending) {
        return;
      }
      if (!nextPrompt && submittedArtifacts.length === 0) {
        return;
      }

      sending = true;
      draft = '';
      artifacts = [];
      const nextUserMessages: Message[] = [];

      if (submittedArtifacts.length > 0) {
        nextUserMessages.push({
          id: nextId++,
          role: 'user',
          text: '',
          uploads: submittedArtifacts,
        });
      }

      if (nextPrompt) {
        nextUserMessages.push({ id: nextId++, role: 'user', text: nextPrompt });
      }

      messages = [
        ...messages,
        ...nextUserMessages,
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

    const handleSuggestion = (event: Event): void => {
      const target = event.currentTarget as HTMLElement | null;
      const messageId = Number(target?.dataset.messageId ?? '');
      if (!Number.isInteger(messageId)) {
        return;
      }
      const suggestion = (event as CustomEvent<{ label: string }>).detail.label;
      if (!suggestion) {
        return;
      }
      sendConversationTurn(suggestion);
    };

    const handlePromptInput = (event: Event): void => {
      const detail = (event as CustomEvent<{ value: string }>).detail;
      draft = detail.value;
      rerender();
    };

    const handleFilesSelected = (event: Event): void => {
      const detail = (
        event as CustomEvent<{
          artifactValues: Array<{
            id: string;
            name: string;
            mimeType: string;
            size: number;
            file: File;
          }>;
        }>
      ).detail;

      if (!detail.artifactValues.length) {
        return;
      }

      artifacts = [
        ...artifacts,
        ...detail.artifactValues.map((artifact) => ({
          mimeType: artifact.mimeType || 'application/octet-stream',
          id: artifact.id,
          title: artifact.name,
          subtitle: `${Math.max(1, Math.round(artifact.size / 1024))} KB`,
          size: artifact.size,
          file: artifact.file,
          previewUrl:
            artifact.mimeType.startsWith('image/') ||
            artifact.mimeType.startsWith('video/')
              ? URL.createObjectURL(artifact.file)
              : undefined,
        })),
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
      const removed = artifacts.find((entry) => entry.id === artifactId);
      if (removed?.previewUrl) {
        URL.revokeObjectURL(removed.previewUrl);
      }
      artifacts = artifacts.filter((entry) => entry.id !== artifactId);
      rerender();
    };

    const handleSubmit = (event: Event): void => {
      const submitDetail = (
        event as CustomEvent<{
          value: string;
          artifactValues: Array<{
            id: string;
            name: string;
            mimeType: string;
            size: number;
            file: File;
          }>;
        }>
      ).detail;
      const submittedArtifacts = artifacts;
      sendConversationTurn(submitDetail.value, submittedArtifacts);
    };

    function rerender(): void {
      render(
        html`
          <div
            style="display:flex; flex-direction:column;gap:24px;max-width:800px; margin: auto; padding: 24px 24px 0;"
          >
            ${messages.map((message) =>
              message.role === 'user'
                ? html`
                    <swc-conversation-turn type="user">
                      <swc-user-message>
                        ${message.uploads?.length
                          ? html`
                              <div
                                style="display:flex;flex-direction:column;gap:8px;inline-size:100%;"
                              >
                                ${message.uploads.map((artifact) => {
                                  const type = getUploadArtifactType(artifact);
                                  return html`
                                    <swc-upload-artifact type=${type}>
                                      ${artifact.previewUrl
                                        ? artifact.mimeType.startsWith('image/')
                                          ? html`
                                              <img
                                                slot="thumbnail"
                                                src=${artifact.previewUrl}
                                                alt=${artifact.title}
                                                style="object-fit:cover;display:block;border-radius:${type ===
                                                'media'
                                                  ? '10px'
                                                  : '4px'};${type === 'card'
                                                  ? 'inline-size:32px;block-size:32px;'
                                                  : ''}"
                                              />
                                            `
                                          : html`
                                              <video
                                                slot="thumbnail"
                                                src=${artifact.previewUrl}
                                                muted
                                                playsinline
                                                preload="metadata"
                                                aria-label=${artifact.title}
                                                style="inline-size:32px;block-size:32px;border-radius:4px;object-fit:cover;display:block;background:var(--swc-gray-200);"
                                              ></video>
                                            `
                                        : html`
                                            <div
                                              slot="thumbnail"
                                              style="display:flex;align-items:center;justify-content:center;inline-size:32px;block-size:32px;border-radius:4px;background:var(--swc-gray-200);color:var(--swc-gray-700);font-size:10px;font-weight:700;letter-spacing:0.02em;flex-shrink:0;"
                                              role="img"
                                              aria-label=${`${getArtifactTypeLabel(artifact)} file`}
                                            >
                                              ${getArtifactTypeLabel(artifact)}
                                            </div>
                                          `}
                                      <span slot="title">
                                        ${artifact.title}
                                      </span>
                                      <span slot="subtitle">
                                        ${artifact.subtitle}
                                      </span>
                                    </swc-upload-artifact>
                                  `;
                                })}
                              </div>
                            `
                          : message.text}
                      </swc-user-message>
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
              mode=${sending ? 'loading' : 'default'}
              .artifactValues=${artifacts.map((artifact) => ({
                id: artifact.id,
                name: artifact.title,
                mimeType: artifact.mimeType,
                size: artifact.size,
                file: artifact.file,
              }))}
              @swc-input=${handlePromptInput}
              @swc-files-selected=${handleFilesSelected}
              @swc-dismiss=${handleArtifactDismiss}
              @swc-submit=${handleSubmit}
              style="position: sticky; bottom: 16px; z-index: 1; padding-block-end: 16px; padding-block-start: 24px;"
            >
              ${artifacts.map((artifact) => {
                const isMedia = getUploadArtifactType(artifact) === 'media';
                return html`
                  <swc-upload-artifact
                    slot="artifact"
                    type=${getUploadArtifactType(artifact)}
                    dismissible
                    data-artifact-id=${artifact.id}
                  >
                    ${isMedia && artifact.previewUrl
                      ? html`
                          <img
                            slot="thumbnail"
                            src=${artifact.previewUrl}
                            alt=${artifact.title}
                            style="object-fit:cover;display:block;"
                          />
                        `
                      : artifact.previewUrl
                        ? artifact.mimeType.startsWith('image/')
                          ? html`
                              <img
                                slot="thumbnail"
                                src=${artifact.previewUrl}
                                alt=${artifact.title}
                                style="inline-size:32px;block-size:32px;border-radius:4px;object-fit:cover;display:block;"
                              />
                            `
                          : html`
                              <video
                                slot="thumbnail"
                                src=${artifact.previewUrl}
                                muted
                                playsinline
                                preload="metadata"
                                aria-label=${artifact.title}
                                style="inline-size:32px;block-size:32px;border-radius:4px;object-fit:cover;display:block;background:var(--swc-gray-200);"
                              ></video>
                            `
                        : html`
                            <div
                              slot="thumbnail"
                              style="display:flex;align-items:center;justify-content:center;inline-size:32px;block-size:32px;border-radius:4px;background:var(--swc-gray-200);color:var(--swc-gray-700);font-size:10px;font-weight:700;letter-spacing:0.02em;flex-shrink:0;"
                              role="img"
                              aria-label=${`${getArtifactTypeLabel(artifact)} file`}
                            >
                              ${getArtifactTypeLabel(artifact)}
                            </div>
                          `}
                    ${isMedia
                      ? ''
                      : html`
                          <span slot="title">${artifact.title}</span>
                          <span slot="subtitle">${artifact.subtitle}</span>
                        `}
                  </swc-upload-artifact>
                `;
              })}
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
  parameters: {
    layout: 'fullscreen',
  },
};
