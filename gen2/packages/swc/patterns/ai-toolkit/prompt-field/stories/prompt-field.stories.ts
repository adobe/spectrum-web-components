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

import type { PropertyValues } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '../../upload-attachment/swc-upload-attachment.js';
import '@adobe/spectrum-wc/components/asset/swc-asset.js';
import '@adobe/spectrum-wc/components/badge/swc-badge.js';
import '../swc-prompt-field.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes } = getStorybookHelpers('swc-prompt-field');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: ['s', 'm'],
};

args.size = 'm';

const defaultPlaceholder =
  'Ready to get started? Ask a question, share an idea, or add a task.';
const defaultLegalDisclaimer = html`
  Responses are generated using AI, and may be inaccurate. Check before using.
  <a
    href="https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html"
  >
    AI User Guidelines
  </a>
`;

const legalDisclaimerSlot = html`
  <p slot="legal" class="swc-Typography--links">${defaultLegalDisclaimer}</p>
`;

type PromptFieldStoryArgs = typeof args;

function renderPromptField(
  storyArgs: PromptFieldStoryArgs,
  slots: unknown = legalDisclaimerSlot
) {
  return html`
    <swc-prompt-field
      label=${storyArgs.label ?? 'Prompt'}
      placeholder=${storyArgs.placeholder ?? defaultPlaceholder}
      .value=${storyArgs.value ?? ''}
      variant=${storyArgs.variant ?? 'balanced'}
      size=${storyArgs.size ?? 'm'}
      loader=${storyArgs.loader ?? 'aiLogo'}
      ?disabled=${storyArgs.disabled ?? false}
      ?generating=${storyArgs.generating ?? false}
      ?animate-loader=${storyArgs['animate-loader'] ?? false}
      accessible-label=${storyArgs['accessible-label'] ?? ''}
      send-label=${storyArgs['send-label'] ?? 'Send'}
      stop-label=${storyArgs['stop-label'] ?? 'Stop generating'}
      upload-label=${storyArgs['upload-label'] ?? 'Add attachment'}
      attachment-scroll-prev-label=${storyArgs[
        'attachment-scroll-prev-label'
      ] ?? 'Show previous attachments'}
      attachment-scroll-next-label=${storyArgs[
        'attachment-scroll-next-label'
      ] ?? 'Show more attachments'}
      min-rows=${ifDefined(storyArgs['min-rows'] || undefined)}
      max-rows=${ifDefined(storyArgs['max-rows'] || undefined)}
      style=${ifDefined(
        storyArgs['--swc-prompt-field-brand-color']
          ? `--swc-prompt-field-brand-color: ${storyArgs['--swc-prompt-field-brand-color']}`
          : undefined
      )}
    >
      ${slots}
    </swc-prompt-field>
  `;
}

/**
 * The prompt entry surface for AI flows.
 * Uses an uncontrolled-with-mirror model: it updates internal draft state first,
 * then emits events so consumers can mirror or override that state.
 */
const meta: Meta = {
  title: 'AI Toolkit/Prompt field',
  component: 'swc-prompt-field',
  args,
  argTypes,
  render: (storyArgs) => renderPromptField(storyArgs),
  parameters: {
    docs: {
      packagePath: 'patterns/ai-toolkit/prompt-field',
      subtitle:
        'Prompt entry surface for AI flows. Populate attachments by slotting one or more swc-upload-attachment nodes into attachment',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export { meta };
export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: (storyArgs) => html`
    <swc-prompt-field-behavior-demo
      .storyArgs=${storyArgs}
    ></swc-prompt-field-behavior-demo>
  `,
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
  },
  parameters: {
    styles: {
      'inline-size': '800px',
      'max-inline-size': '90vw',
      'margin-inline': 'auto',
    },
  },
  tags: ['dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">Base structure</span>
      </div>
    </div>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Variant: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          variant="subtle"
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          subtle: understated treatment; the gradient ring is revealed on hover
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          variant="balanced"
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          balanced (default): visible gradient ring and background wash
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          variant="prominent"
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          prominent: strongest treatment, adding an outer glow
        </span>
      </div>
    </div>
  `,
  tags: ['options'],
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          size="s"
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          s: compact spacing and typography
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          size="m"
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          m (default): standard spacing and typography
        </span>
      </div>
    </div>
  `,
  tags: ['options'],
};

export const Layout: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          Expanded (default) — action bar with upload button on its own row
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          collapsed
          label="Prompt"
          placeholder=${defaultPlaceholder}
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          collapsed — single-line row with the send button inline
        </span>
      </div>
    </div>
  `,
};

export const Attachment: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <p
        class="swc-Detail swc-Detail--sizeS"
        style="margin:0;max-inline-size:720px;"
      >
        <strong>attachment</strong>
        : Slot one or more
        <code>&lt;swc-upload-attachment slot="attachment"&gt;</code>
        nodes above the textarea. Use one layout type per session (card or
        media). When uploads mix images and documents, normalize to media tiles
        with badges. See
        <strong>Multi-card</strong>
        and
        <strong>Multi-media</strong>
        on the upload-attachment page.
      </p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Use attached assets for a launch plan."
        >
          <swc-upload-attachment slot="attachment" type="card" dismissible>
            <swc-asset slot="thumbnail">
              <img src="images/landscape-asset.jpg" alt="PDF" />
            </swc-asset>
            <span slot="title">Brand guidelines</span>
            <swc-badge slot="badge" size="s" subtle>PDF</swc-badge>
          </swc-upload-attachment>
          <swc-upload-attachment slot="attachment" type="card" dismissible>
            <swc-asset slot="thumbnail">
              <img src="images/card-preview.jpg" alt="Spreadsheet" />
            </swc-asset>
            <span slot="title">Q2 metrics draft</span>
            <span slot="subtitle">XLSX</span>
          </swc-upload-attachment>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          Multi-card strip (cards only)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Review these storyboard frames."
        >
          <swc-upload-attachment slot="attachment" type="media" dismissible>
            <swc-asset slot="thumbnail">
              <img src="images/landscape-asset.jpg" alt="Campaign still" />
            </swc-asset>
          </swc-upload-attachment>
          <swc-upload-attachment slot="attachment" type="media" dismissible>
            <swc-asset slot="thumbnail">
              <img src="images/portrait-asset.jpg" alt="Storyboard frame" />
            </swc-asset>
            <swc-badge slot="badge" size="s" subtle>PDF</swc-badge>
          </swc-upload-attachment>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          Multi-media strip (media only, with and without badge)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">None</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          <swc-upload-attachment slot="attachment" type="card" dismissible>
            <swc-asset slot="thumbnail">
              <img src="images/landscape-asset.jpg" alt="PDF" />
            </swc-asset>
            <span slot="title">Hilton commercial assets</span>
            <span slot="subtitle">2026</span>
          </swc-upload-attachment>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">Single card</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          <swc-upload-attachment slot="attachment" type="media" dismissible>
            <swc-asset slot="thumbnail">
              <img src="images/landscape-asset.jpg" alt="Attachment preview" />
            </swc-asset>
          </swc-upload-attachment>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">Single media</span>
      </div>
    </div>
  `,
  tags: ['options'],
};

// Distinct color pairs stand in for real thumbnails; rendered as inline SVG
// gradients (valid `swc-asset` content) so each scroll tile stays visually
// distinguishable without a network image request.
const multiAttachmentScrollColors = [
  ['#667eea', '#764ba2'],
  ['#f093fb', '#f5576c'],
  ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'],
  ['#fa709a', '#fee140'],
  ['#30cfd0', '#330867'],
  ['#a8edea', '#fed6e3'],
  ['#ff9a9e', '#fecfef'],
  ['#ffecd2', '#fcb69f'],
  ['#ff6e7f', '#bfe9ff'],
  ['#e0c3fc', '#8ec5fc'],
  ['#f77062', '#fe5196'],
] as const;

const gradientSwatch = (
  id: number,
  [start, end]: readonly [string, string],
  label: string
) => html`
  <svg role="img" aria-label=${label} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="scroll-gradient-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color=${start}></stop>
        <stop offset="100%" stop-color=${end}></stop>
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#scroll-gradient-${id})"></rect>
  </svg>
`;

const multiAttachmentScrollBadges: Record<number, string> = {
  9: 'MP4',
  10: 'MP4',
  11: 'PDF',
};

export const MultiAttachmentScroll: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;inline-size:100%;">
      <p class="swc-Detail swc-Detail--sizeS" style="margin:0;">
        Full-width composer with twelve media tiles. Chevron controls flank the
        strip when scrolling is possible; each click advances by one viewport
        width and settles on a tile boundary. Edge fades signal overflow. An
        overflowing strip uses the platform's native scrollbar.
      </p>
      <swc-prompt-field label="Prompt" value="Review these storyboard frames.">
        ${multiAttachmentScrollColors.map(
          (colors, index) => html`
            <swc-upload-attachment slot="attachment" type="media" dismissible>
              <swc-asset slot="thumbnail">
                ${gradientSwatch(
                  index,
                  colors,
                  `Storyboard frame ${index + 1}`
                )}
              </swc-asset>
              ${multiAttachmentScrollBadges[index]
                ? html`
                    <swc-badge slot="badge" size="s" subtle>
                      ${multiAttachmentScrollBadges[index]}
                    </swc-badge>
                  `
                : nothing}
            </swc-upload-attachment>
          `
        )}
        ${legalDisclaimerSlot}
      </swc-prompt-field>
    </div>
  `,
  tags: ['options'],
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">Default, empty value</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">Default, entered value</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          generating
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          generating (input remains editable, send is replaced by stop)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          disabled
          label="Prompt"
          value="This input is disabled."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          disabled (input and controls disabled)
        </span>
      </div>
    </div>
  `,
  tags: ['states'],
};

// ──────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────

interface PromptFieldBehaviorAttachment {
  id: string;
  fileName: string;
  sizeLabel: string;
  thumbnailUrl?: string;
  badgeLabel?: string;
}

function fileBadgeLabel(fileName: string): string | undefined {
  const extension = fileName.match(/\.([a-z0-9]+)$/i)?.[1];
  return extension ? extension.toUpperCase() : undefined;
}

function filesToAttachments(files: File[]): PromptFieldBehaviorAttachment[] {
  return files.map((file, index) => {
    const isImage =
      file.type.startsWith('image/') ||
      /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i.test(file.name);
    return {
      id: `${crypto.randomUUID()}-${index}`,
      fileName: file.name || 'Attachment',
      sizeLabel: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      thumbnailUrl: isImage ? URL.createObjectURL(file) : undefined,
      badgeLabel: isImage ? undefined : fileBadgeLabel(file.name),
    } satisfies PromptFieldBehaviorAttachment;
  });
}

@customElement('swc-prompt-field-behavior-demo')
class PromptFieldBehaviorDemo extends LitElement {
  @property({ attribute: false })
  public storyArgs?: PromptFieldStoryArgs;

  @state()
  private value = 'Summarize the API changes in this branch.';

  @state()
  private attachments: PromptFieldBehaviorAttachment[] = [];

  protected override createRenderRoot(): this {
    return this;
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (!changedProperties.has('storyArgs')) {
      return;
    }

    const previousArgs = changedProperties.get('storyArgs') as
      | PromptFieldStoryArgs
      | undefined;
    if (this.storyArgs?.value !== previousArgs?.value) {
      this.value = this.storyArgs?.value ?? '';
    }
  }

  public override disconnectedCallback(): void {
    for (const attachment of this.attachments) {
      if (attachment.thumbnailUrl) {
        URL.revokeObjectURL(attachment.thumbnailUrl);
      }
    }
    super.disconnectedCallback?.();
  }

  private _handleInput(event: Event): void {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    this.value = value;
  }

  private _handleSubmit(): void {
    for (const attachment of this.attachments) {
      if (attachment.thumbnailUrl) {
        URL.revokeObjectURL(attachment.thumbnailUrl);
      }
    }
    this.value = '';
    this.attachments = [];
  }

  private _handleUploadClick(event: Event): void {
    event.preventDefault();
    const input = this.querySelector<HTMLInputElement>('[data-file-input]');
    input?.click();
  }

  private _handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) {
      return;
    }

    const nextAttachments = filesToAttachments(files);
    this.attachments = [...this.attachments, ...nextAttachments];
    input.value = '';
  }

  private _handleDrop(event: Event): void {
    const { files } = (event as CustomEvent<{ files: File[] }>).detail;
    this.attachments = [...this.attachments, ...filesToAttachments(files)];
  }

  private _handleAttachmentDismiss(event: Event): void {
    const attachment = event.target as HTMLElement | null;
    const attachmentId = attachment?.getAttribute('data-attachment-id');
    if (!attachmentId) {
      return;
    }

    const removed = this.attachments.find((item) => item.id === attachmentId);
    if (removed?.thumbnailUrl) {
      URL.revokeObjectURL(removed.thumbnailUrl);
    }

    this.attachments = this.attachments.filter(
      (item) => item.id !== attachmentId
    );
  }

  protected override render() {
    const storyArgs: PromptFieldStoryArgs = {
      ...this.storyArgs,
      value: this.value,
    };
    const attachmentSlots = html`
      ${this.attachments.map(
        (attachment) => html`
          <swc-upload-attachment
            slot="attachment"
            type="media"
            dismissible
            accessible-label=${`${attachment.fileName}, ${attachment.sizeLabel}`}
            dismiss-label=${`Remove ${attachment.fileName}`}
            data-attachment-id=${attachment.id}
          >
            ${attachment.thumbnailUrl
              ? html`
                  <swc-asset slot="thumbnail">
                    <img
                      src=${attachment.thumbnailUrl}
                      alt=${attachment.fileName}
                    />
                  </swc-asset>
                `
              : html`
                  <swc-asset slot="thumbnail">
                    <svg role="img" aria-label=${attachment.fileName} viewBox="0 0 100 100">
                      <rect width="100" height="100" fill="#f3f3f3"></rect>
                    </svg>
                  </swc-asset>
                `}
            ${attachment.badgeLabel
              ? html`
                  <swc-badge slot="badge" size="s" subtle>
                    ${attachment.badgeLabel}
                  </swc-badge>
                `
              : nothing}
          </swc-upload-attachment>
        `
      )}
      ${legalDisclaimerSlot}
    `;

    return html`
      <div
        style="max-inline-size:640px;"
        @swc-prompt-field-input=${this._handleInput}
        @swc-prompt-field-submit=${this._handleSubmit}
        @swc-prompt-field-upload-click=${this._handleUploadClick}
        @swc-prompt-field-drop=${this._handleDrop}
        @swc-upload-attachment-dismiss=${this._handleAttachmentDismiss}
      >
        ${renderPromptField(storyArgs, attachmentSlots)}
        <input
          data-file-input
          type="file"
          multiple
          hidden
          @change=${this._handleFileChange}
        />
      </div>
    `;
  }
}
void PromptFieldBehaviorDemo;

export const HandlingEvents: Story = {
  render: () => html`
    <swc-prompt-field-behavior-demo></swc-prompt-field-behavior-demo>
  `,
  tags: ['behaviors'],
};
HandlingEvents.storyName = 'Handling events';

export const AnimateLoader: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          generating
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          generating, without animate-loader: status loader stays static
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          generating
          animate-loader
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          generating, with animate-loader: status loader animates
        </span>
      </div>
    </div>
  `,
  tags: ['behaviors'],
};
AnimateLoader.storyName = 'Animate loader';

export const DragAndDrop: Story = {
  render: () => html`
    <swc-prompt-field-behavior-demo></swc-prompt-field-behavior-demo>
  `,
  tags: ['behaviors'],
};
DragAndDrop.storyName = 'Drag and drop';

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
  },
  tags: ['a11y'],
};
