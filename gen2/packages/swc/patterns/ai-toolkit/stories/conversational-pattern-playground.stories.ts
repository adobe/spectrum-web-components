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
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../conversation-thread/swc-conversation-thread.js';
import '../conversation-turn/swc-conversation-turn.js';
import '../system-message/swc-system-message.js';
import '../user-message/swc-user-message.js';
import '../response-status/swc-response-status.js';
import '../message-feedback/swc-message-feedback.js';
import '../message-sources/swc-message-sources.js';
import '../suggestion/swc-suggestion-group.js';
import '../suggestion-item/swc-suggestion-item.js';
import '../prompt-field/swc-prompt-field.js';
import '../upload-attachment/swc-upload-attachment.js';

import {
  PIXEL_LOADER_ICON_NAMES,
  PIXEL_LOADER_PRESET_NAMES,
} from '../pixel-loader/index.js';
import {
  filesToAttachments,
  revokeAttachment,
  revokeAttachments,
  type UploadAttachmentData,
} from '../upload-attachment/index.js';
import type { UserMessageType } from '../user-message/index.js';
import { renderAttachmentPreview } from './attachment-preview.js';

// ────────────────
//    METADATA
// ────────────────

type PlaygroundLayout = 'full-width' | 'side-panel';

type PlaygroundArgs = {
  layout: PlaygroundLayout;
  variant: 'subtle' | 'balanced' | 'prominent';
  size: 's' | 'm';
  loader: string;
  'animate-loader': boolean;
  placeholder: string;
  disabled: boolean;
  'attachment-type': Exclude<UserMessageType, 'copy'>;
  'step-duration': number;
  'show-feedback': boolean;
  'show-sources': boolean;
  'show-suggestions': boolean;
};

const DEFAULT_PLAYGROUND_ARGS: PlaygroundArgs = {
  layout: 'full-width',
  variant: 'balanced',
  size: 'm',
  loader: 'aiLogo',
  'animate-loader': false,
  placeholder:
    'Ready to get started? Ask a question, share an idea, or add a task.',
  disabled: false,
  'attachment-type': 'media',
  'step-duration': 2200,
  'show-feedback': true,
  'show-sources': true,
  'show-suggestions': true,
};

/**
 * End-to-end AI Toolkit conversation: prompt entry, file upload, generation
 * status, response output, sources, feedback, and follow-up suggestions.
 */
const meta: Meta<PlaygroundArgs> = {
  title: 'AI Toolkit/Conversational pattern playground',
  args: DEFAULT_PLAYGROUND_ARGS,
  argTypes: {
    layout: {
      description:
        'Where the conversation sits. `side-panel` docks it in a full-height panel beside mock page content.',
      control: { type: 'select' },
      options: ['full-width', 'side-panel'],
      table: { category: 'Layout' },
    },
    variant: {
      control: { type: 'select' },
      options: ['subtle', 'balanced', 'prominent'],
      table: { category: 'Prompt field' },
    },
    size: {
      description:
        'Prompt field size in the full-width layout. The side panel always uses `s`.',
      control: { type: 'select' },
      options: ['s', 'm'],
      table: { category: 'Prompt field' },
    },
    loader: {
      control: { type: 'select' },
      options: [...PIXEL_LOADER_PRESET_NAMES, ...PIXEL_LOADER_ICON_NAMES],
      table: { category: 'Prompt field' },
    },
    'animate-loader': { table: { category: 'Prompt field' } },
    placeholder: { table: { category: 'Prompt field' } },
    disabled: { table: { category: 'Prompt field' } },
    'attachment-type': {
      description:
        'Presentation for newly uploaded files. Existing attachments keep their type after sending.',
      control: { type: 'select' },
      options: ['media', 'card'],
      table: { category: 'Prompt field' },
    },
    'step-duration': {
      description: 'Milliseconds each response status step stays active.',
      control: { type: 'range', min: 500, max: 5000, step: 100 },
      table: { category: 'Response' },
    },
    'show-feedback': { table: { category: 'Response' } },
    'show-sources': { table: { category: 'Response' } },
    'show-suggestions': { table: { category: 'Response' } },
  },
  parameters: {
    layout: 'fullscreen',
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export { meta };
export default meta;

type DemoAttachment = UploadAttachmentData & {
  type: Exclude<UserMessageType, 'copy'>;
};

const renderDemoAttachment = (
  attachment: DemoAttachment,
  sent: boolean
) => html`
  <swc-upload-attachment
    slot=${sent ? 'thumbnail' : 'attachment'}
    type=${attachment.type}
    ?dismissible=${!sent}
    accessible-label=${`${attachment.name}, ${attachment.sizeLabel}`}
    data-attachment-id=${attachment.id}
  >
    ${renderAttachmentPreview({
      fileName: attachment.name,
      src: attachment.thumbnailUrl,
    })}
    <span slot="title">${attachment.name}</span>
    <span slot="subtitle">${attachment.sizeLabel}</span>
  </swc-upload-attachment>
`;

type DemoTurn = {
  id: string;
  role: 'user' | 'system';
  text: string;
  attachments?: DemoAttachment[];
  loading?: boolean;

  /** Index of the step currently active while `loading`. Advances on a timer
   * so the timeline fills in one step at a time instead of jumping straight
   * from "generating" to "complete". */
  stepIndex?: number;
  sourcesOpen?: boolean;
  feedbackStatus?: 'positive' | 'negative' | undefined;
};

const DEMO_SUGGESTIONS = [
  'Create year-over-year growth chart',
  'Generate congratulatory poster',
  'Summarize development pipeline',
] as const;

// Stand-in for the host product's own content beside the side panel. Long
// enough to scroll independently of the panel at the docs height.
const DEMO_PAGE_SECTIONS = [
  {
    heading: 'Campaign overview',
    body: 'The spring launch reached new audiences across web, social, and retail channels. Engagement grew steadily through the quarter, with the strongest results in the final four weeks.',
  },
  {
    heading: 'Audience growth',
    body: 'New subscribers rose 18% quarter over quarter. Most of the growth came from short-form video, while returning visitors held steady on the product pages.',
  },
  {
    heading: 'Channel performance',
    body: 'Paid social delivered the lowest cost per acquisition. Email remained the highest-converting channel, and retail displays drove a measurable lift in branded search.',
  },
  {
    heading: 'Creative highlights',
    body: 'The hero campaign assets were reused across 40 regional variants. Localized headlines outperformed the global version in every market where both ran.',
  },
  {
    heading: 'Next quarter priorities',
    body: 'Expand the video program, test a loyalty offer with returning customers, and consolidate reporting so regional teams share one source of truth.',
  },
] as const;

// The last step only appears once the response is complete; the others
// appear one at a time while generating (see `stepIndex` above).
const DEMO_RESPONSE_STEPS = [
  {
    label: 'Read source context',
    description:
      'Reviewed the prompt, uploaded assets, and prior conversation context.',
  },
  {
    label: 'Gather supporting data',
    description:
      'Pulled relevant metrics and prior campaign results to support the narrative.',
  },
  {
    label: 'Identify supporting proof points',
    description:
      'Selected the strongest data points and prior results to back up the narrative.',
  },
  {
    label: 'Draft response structure',
    description:
      'Organizing the answer into a concise narrative with supporting proof points.',
  },
  {
    label: 'Check brand style guidelines',
    description:
      'Confirmed terminology, tone, and formatting match brand guidelines.',
  },
  {
    label: 'Review for tone and clarity',
    description:
      'Read through the draft once more for a confident, concise executive tone.',
  },
  {
    label: 'Prepare next-step suggestions',
    description: 'Created follow-up prompts that match the generated response.',
  },
] as const;

const DEMO_LOADING_STEP_COUNT = DEMO_RESPONSE_STEPS.length - 1;

const renderDemoResponseStatusSteps = (
  stepIndex: number,
  complete: boolean
) => {
  const steps = complete
    ? DEMO_RESPONSE_STEPS
    : DEMO_RESPONSE_STEPS.slice(0, stepIndex + 1);

  return html`
    ${steps.map(
      (step, index) => html`
        <swc-response-status-step
          status=${!complete && index === stepIndex ? 'active' : 'complete'}
        >
          <span slot="label">${step.label}</span>
          <span slot="description">${step.description}</span>
        </swc-response-status-step>
      `
    )}
  `;
};

const buildAssistantReply = (prompt: string): string => {
  const normalized = prompt.trim() || 'your request';
  return `Great direction. Based on "${normalized}", I suggest a 12-slide structure with a clear narrative arc, three supporting proof points, and a concise close with next steps.`;
};

class ConversationFullPatternDemo extends LitElement {
  @property({ attribute: false })
  public config: PlaygroundArgs = DEFAULT_PLAYGROUND_ARGS;

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
      sourcesOpen: false,
    },
  ];

  @state()
  private attachments: DemoAttachment[] = [];

  @state()
  private promptValue = '';

  @state()
  private isGenerating = false;

  private readonly fileInputId = `conv-demo-upload-${crypto.randomUUID()}`;
  private readonly pageHeadingId = `conv-demo-page-heading-${crypto.randomUUID()}`;
  private readonly panelHeadingId = `conv-demo-panel-heading-${crypto.randomUUID()}`;
  private responseTimer: number | null = null;
  private stepTimer: number | null = null;
  private responseTargetId: string | null = null;
  private lastPrompt = '';

  public override connectedCallback(): void {
    super.connectedCallback();
    const restorePreview = (attachment: DemoAttachment): DemoAttachment => {
      if (!attachment.thumbnailUrl) {
        return attachment;
      }
      const [{ thumbnailUrl }] = filesToAttachments([attachment.file]);
      return { ...attachment, thumbnailUrl };
    };
    this.attachments = this.attachments.map(restorePreview);
    this.turns = this.turns.map((turn) => ({
      ...turn,
      attachments: turn.attachments?.map(restorePreview),
    }));
  }

  public override disconnectedCallback(): void {
    if (this.responseTimer !== null) {
      window.clearTimeout(this.responseTimer);
      this.responseTimer = null;
    }
    this.clearStepTimer();
    // Submitted attachments stay visible in the thread, so their thumbnails
    // are released here rather than on submit.
    revokeAttachments(this.attachments);
    for (const turn of this.turns) {
      revokeAttachments(turn.attachments ?? []);
    }
    super.disconnectedCallback();
  }

  private clearStepTimer(): void {
    if (this.stepTimer !== null) {
      window.clearInterval(this.stepTimer);
      this.stepTimer = null;
    }
  }

  // A side panel is space-constrained, so it always uses size `s` per the
  // prompt field size guidance; the `size` control applies at full width.
  private get effectiveSize(): PlaygroundArgs['size'] {
    return this.config.layout === 'side-panel' ? 's' : this.config.size;
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
    const hasAttachments = this.attachments.length > 0;
    if ((!value && !hasAttachments) || this.isGenerating) {
      return;
    }

    const userTurn: DemoTurn = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: value,
      attachments: hasAttachments ? [...this.attachments] : undefined,
    };
    const systemTurn: DemoTurn = {
      id: `system-${Date.now() + 1}`,
      role: 'system',
      text: '',
      loading: true,
      stepIndex: 0,
      sourcesOpen: false,
    };

    this.turns = [...this.turns, userTurn, systemTurn];
    this.isGenerating = true;
    this.lastPrompt =
      value ||
      (hasAttachments ? this.attachments.map((a) => a.name).join(', ') : '');
    this.responseTargetId = systemTurn.id;
    this.promptValue = '';
    this.attachments = [];

    // How long each step stays active before the next one takes over. The
    // total generation time scales with the step count so pacing stays even
    // as more steps are added.
    const stepInterval = this.config['step-duration'];

    // Advance the active step on its own cadence so the timeline fills in
    // one step at a time instead of sitting static until the reply resolves.
    const targetId = systemTurn.id;
    this.stepTimer = window.setInterval(() => {
      let reachedLastStep = false;
      this.turns = this.turns.map((turn) => {
        if (turn.id !== targetId) {
          return turn;
        }
        const nextIndex = Math.min(
          (turn.stepIndex ?? 0) + 1,
          DEMO_LOADING_STEP_COUNT - 1
        );
        reachedLastStep = nextIndex >= DEMO_LOADING_STEP_COUNT - 1;
        return { ...turn, stepIndex: nextIndex };
      });
      if (reachedLastStep) {
        this.clearStepTimer();
      }
    }, stepInterval);

    // Keep the generating state visible long enough to read the response
    // status steps before the reply resolves.
    this.responseTimer = window.setTimeout(
      () => {
        this.completeGeneration();
      },
      (DEMO_LOADING_STEP_COUNT + 1) * stepInterval
    );
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
    this.clearStepTimer();
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
    this.clearStepTimer();

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
    if (!files.length) {
      return;
    }
    this.attachments = [
      ...this.attachments,
      ...filesToAttachments(files).map((attachment) => ({
        ...attachment,
        type: this.config['attachment-type'],
      })),
    ];
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

  private handleDrop = (event: Event): void => {
    const { files } = (event as CustomEvent<{ files: File[] }>).detail;
    this.appendFiles(files);
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
    const attachment = event.target as HTMLElement | null;
    const attachmentId = attachment?.getAttribute('data-attachment-id');
    if (!attachmentId) {
      return;
    }
    const removed = this.attachments.find((item) => item.id === attachmentId);
    if (removed) {
      revokeAttachment(removed);
    }
    this.attachments = this.attachments.filter(
      (item) => item.id !== attachmentId
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

  /**
   * Renders a system turn's sources. Every layout uses message sources today.
   * In-line sources (citations plus a source list in a popover at full width,
   * or in a drawer that fills the side panel) branch here on `layout`, so turn
   * rendering doesn't change when they're added.
   */
  private renderSources(turn: DemoTurn, _layout: PlaygroundLayout) {
    if (turn.loading || !this.config['show-sources']) {
      return '';
    }
    return html`
      <swc-message-sources
        slot="sources"
        data-sources-id=${turn.id}
        ?open=${!!turn.sourcesOpen}
      >
        <a href="#">Brand brief Q1 2026</a>
        <a href="#">Market research summary</a>
      </swc-message-sources>
    `;
  }

  private renderTurns() {
    const lastTurnId = this.turns[this.turns.length - 1]?.id;
    return this.turns.map((turn) => {
      if (turn.role === 'user') {
        return html`
          <swc-conversation-turn type="user">
            ${(['media', 'card'] as const).map((type) => {
              const attachments = (turn.attachments ?? []).filter(
                (attachment) => attachment.type === type
              );
              return attachments.length
                ? html`
                    <swc-user-message type=${type}>
                      ${attachments.map((attachment) =>
                        renderDemoAttachment(attachment, true)
                      )}
                    </swc-user-message>
                  `
                : '';
            })}
            ${turn.text
              ? html`
                  <swc-user-message>${turn.text}</swc-user-message>
                `
              : ''}
          </swc-conversation-turn>
        `;
      }

      return html`
        <swc-conversation-turn type="system">
          <swc-system-message>
            ${turn.loading
              ? html`
                  <swc-response-status slot="status" status="active">
                    ${renderDemoResponseStatusSteps(turn.stepIndex ?? 0, false)}
                  </swc-response-status>
                `
              : html`
                  <swc-response-status slot="status" status="complete">
                    <span slot="label">Response complete</span>
                    ${renderDemoResponseStatusSteps(0, true)}
                  </swc-response-status>
                `}
            ${turn.loading
              ? ''
              : html`
                  <div class="swc-Typography--prose">
                    <p>${turn.text}</p>
                  </div>
                `}
            ${turn.loading || !this.config['show-feedback']
              ? ''
              : html`
                  <swc-message-feedback
                    slot="feedback"
                    data-feedback-id=${turn.id}
                    status=${turn.feedbackStatus ?? ''}
                  ></swc-message-feedback>
                `}
            ${this.renderSources(turn, this.config.layout)}
            ${turn.loading ||
            turn.id !== lastTurnId ||
            !this.config['show-suggestions']
              ? ''
              : html`
                  <swc-suggestion-group slot="suggestions">
                    <h3 slot="heading">What would you like to do next?</h3>
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

  private renderAttachments() {
    return this.attachments.map((attachment) =>
      renderDemoAttachment(attachment, false)
    );
  }

  private renderConversation() {
    return html`
      <div
        class=${classMap({
          'swc-ConversationFullPatternDemo-shell': true,
          'swc-ConversationFullPatternDemo-shell--sidePanel':
            this.config.layout === 'side-panel',
        })}
        @swc-message-feedback-change=${this.handleFeedback}
        @swc-suggestion=${this.handleSuggestion}
        @swc-upload-attachment-dismiss=${this.handleDismiss}
        @swc-message-sources-toggle=${this.handleSourcesToggle}
      >
        <div class="swc-ConversationFullPatternDemo-scroll">
          <swc-conversation-thread>
            ${this.renderTurns()}
          </swc-conversation-thread>
        </div>
        <div class="swc-ConversationFullPatternDemo-composer">
          <swc-prompt-field
            .value=${this.promptValue}
            ?generating=${this.isGenerating}
            variant=${this.config.variant}
            size=${this.effectiveSize}
            loader=${this.config.loader}
            ?animate-loader=${this.config['animate-loader']}
            placeholder=${this.config.placeholder}
            ?disabled=${this.config.disabled}
            @swc-prompt-field-input=${this.handlePromptInput}
            @swc-prompt-field-submit=${this.handlePromptSubmit}
            @swc-prompt-field-stop=${this.stopGeneration}
            @swc-prompt-field-upload-click=${this.handleUploadClick}
            @swc-prompt-field-drop=${this.handleDrop}
          >
            ${this.renderAttachments()}
            <p slot="legal" class="swc-Typography--links">
              Responses are generated using AI, and may be inaccurate. Check
              before using.
              <a
                href="https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html"
              >
                AI User Guidelines
              </a>
            </p>
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

  private renderSidePanelLayout() {
    return html`
      <main
        class="swc-ConversationFullPatternDemo-page swc-Typography--prose"
        tabindex="0"
        aria-labelledby=${this.pageHeadingId}
      >
        <h1 id=${this.pageHeadingId}>Q3 campaign report</h1>
        ${DEMO_PAGE_SECTIONS.map(
          (section) => html`
            <h2>${section.heading}</h2>
            <p>${section.body}</p>
          `
        )}
      </main>
      <aside
        class="swc-ConversationFullPatternDemo-panel"
        aria-labelledby=${this.panelHeadingId}
      >
        <div class="swc-ConversationFullPatternDemo-panelHeader">
          <h2 id=${this.panelHeadingId} class="swc-Heading swc-Heading--sizeXS">
            AI Assistant
          </h2>
        </div>
        ${this.renderConversation()}
      </aside>
    `;
  }

  protected override render() {
    const isSidePanel = this.config.layout === 'side-panel';

    // The side panel host clips rather than hides overflow so it can't become
    // a scroll container that `focus()` scrolls sideways (see `-panel`).
    this.style.cssText = isSidePanel
      ? 'display:flex;block-size:100vb;overflow:clip;box-sizing:border-box;'
      : 'display:flex;flex-direction:column;block-size:90vb;max-block-size:100vh;overflow:hidden;box-sizing:border-box;';

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
          padding-block-end: 24px;
          padding-block-start: 4px;
          padding-inline: 4px;
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

        .swc-ConversationFullPatternDemo-page {
          flex: 1;
          min-inline-size: 0;
          overflow-y: auto;
          padding: 32px 40px;
          box-sizing: border-box;
          background-color: var(--swc-background-layer-1-color);
        }

        .swc-ConversationFullPatternDemo-page:focus-visible {
          outline: var(--swc-focus-indicator-thickness) solid
            var(--swc-focus-indicator-color);
          outline-offset: calc(-1 * var(--swc-focus-indicator-thickness));
        }

        /*
         * Positioned shell for a future overlay (such as a source list drawer)
         * that fills the panel. overflow: clip, not hidden, so focus() can't
         * scroll the panel sideways while the overlay slides in.
         */
        .swc-ConversationFullPatternDemo-panel {
          position: relative;
          overflow: clip;
          flex: 0 0 360px;
          inline-size: 360px;
          block-size: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          border-inline-start: var(--swc-border-width-100) solid
            var(--swc-gray-200);
          background-color: var(--swc-background-layer-2-color);
        }

        .swc-ConversationFullPatternDemo-panelHeader {
          flex-shrink: 0;
          padding: 16px 16px 8px;
        }

        .swc-ConversationFullPatternDemo-panelHeader h2 {
          margin: 0;
        }

        .swc-ConversationFullPatternDemo-shell--sidePanel {
          flex: 1;
          min-block-size: 0;
          block-size: auto;
          max-inline-size: none;
          margin: 0;
          padding: 0 12px 12px;
        }
      </style>
      ${isSidePanel ? this.renderSidePanelLayout() : this.renderConversation()}
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
  <swc-conversation-thread>
    <swc-conversation-turn type="user">
      <swc-user-message>Can you help me create a 45-minute presentation?</swc-user-message>
    </swc-conversation-turn>
    <swc-conversation-turn type="system">
      <swc-system-message>
        <swc-response-status slot="status" status="complete" open>
          <span slot="label">I interpreted your request as an executive narrative task and prioritized a concise, audience-ready structure.</span>
          <swc-response-status-step status="complete">
            <span slot="label">Read source context</span>
            <span slot="description">Reviewed the prompt, uploaded assets, and prior conversation context.</span>
          </swc-response-status-step>
          <swc-response-status-step status="complete">
            <span slot="label">Draft response structure</span>
            <span slot="description">Organized the answer into a concise narrative with supporting proof points.</span>
          </swc-response-status-step>
        </swc-response-status>
        <div class="swc-Typography--prose">
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
    <swc-upload-attachment slot="attachment" type="media" dismissible>
      <div
        slot="thumbnail"
        role="img"
        aria-label="Hilton commercial assets"
        style="inline-size:100%;block-size:100%;background:#f3f3f3;"
      ></div>
    </swc-upload-attachment>
    <p slot="legal" class="swc-Typography--links">
      Responses are generated using AI, and may be inaccurate. Check before
      using.
      <a
        href="https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html"
      >
        AI User Guidelines
      </a>
    </p>
  </swc-prompt-field>
</div>`;

const renderFullPattern = (args: PlaygroundArgs) => html`
  <swc-conversation-full-pattern-demo
    .config=${args}
  ></swc-conversation-full-pattern-demo>
`;

// ──────────────────────────────
//    PLAYGROUND STORY
// ──────────────────────────────

export const Playground: Story<PlaygroundArgs> = {
  render: renderFullPattern,
  parameters: {
    docs: {
      // An iframe keeps the side panel layout's full-height panel and
      // independent scroll regions usable on the docs page.
      story: {
        inline: false,
        height: '600px',
      },
      source: {
        code: fullPatternSource,
      },
    },
  },
  tags: ['dev'],
};
Playground.storyName = 'Conversational pattern playground';
