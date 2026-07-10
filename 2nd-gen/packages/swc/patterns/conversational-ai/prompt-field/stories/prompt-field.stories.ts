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

import { html, LitElement, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '../../upload-artifact/swc-upload-artifact.js';
import '../swc-prompt-field.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes } = getStorybookHelpers('swc-prompt-field');
const defaultPlaceholder =
  'Ready to get started? Ask a question, share an idea, or add a task.';
const defaultLegalDisclaimer =
  'AI output may be inaccurate. Verify before using.';

const legalDisclaimerSlot = html`
  <p slot="legal" class="swc-PromptField-legal-disclaimer">
    ${defaultLegalDisclaimer}
  </p>
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
      mode=${storyArgs.mode ?? 'default'}
      accessible-label=${storyArgs['accessible-label'] ?? ''}
      send-label=${storyArgs['send-label'] ?? 'Send'}
      stop-label=${storyArgs['stop-label'] ?? 'Stop generating'}
      upload-label=${storyArgs['upload-label'] ?? 'Add attachment'}
      artifact-scroll-prev-label=${storyArgs['artifact-scroll-prev-label'] ??
      'Show previous attachments'}
      artifact-scroll-next-label=${storyArgs['artifact-scroll-next-label'] ??
      'Show more attachments'}
      min-rows=${storyArgs['min-rows'] ?? 1}
      max-rows=${storyArgs['max-rows'] ?? 4}
    >
      ${slots}
    </swc-prompt-field>
  `;
}

argTypes.mode = {
  ...argTypes.mode,
  control: { type: 'select' },
  options: ['default', 'loading', 'disabled'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'default' },
  },
};

/**
 * The prompt entry surface for conversational AI flows.
 * Uses an uncontrolled-with-mirror model: it updates internal draft state first,
 * then emits events so consumers can mirror or override that state.
 */
const meta: Meta = {
  title: 'Conversational AI/Prompt field',
  component: 'swc-prompt-field',
  args,
  argTypes,
  render: (storyArgs) => renderPromptField(storyArgs),
  parameters: {
    docs: {
      packagePath: 'patterns/conversational-ai/prompt-field',
      subtitle:
        'Prompt entry surface for conversational AI flows. Populate attachments by slotting one or more swc-upload-artifact nodes into artifact',
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
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
    mode: 'default',
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
    mode: 'default',
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

export const Modes: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          mode="default" with empty value
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          mode="default" with entered value
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          mode="loading"
          label="Prompt"
          value="Summarize the API changes in this branch."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          mode="loading" (input remains editable)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          mode="disabled"
          label="Prompt"
          value="This input is disabled."
        >
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          mode="disabled" (input and controls disabled)
        </span>
      </div>
    </div>
  `,
  tags: ['options'],
};

export const Artifact: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <p
        class="swc-Detail swc-Detail--sizeS"
        style="margin:0;max-inline-size:720px;"
      >
        <strong>artifact</strong>
        — Slot one or more
        <code>&lt;swc-upload-artifact slot="artifact"&gt;</code>
        nodes above the textarea. Use one layout type per session (card or
        media). When uploads mix images and documents, normalize to media tiles
        with badges. See
        <strong>Multi-card</strong>
        and
        <strong>Multi-media</strong>
        on the upload-artifact page.
      </p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Use attached assets for a launch plan."
        >
          <swc-upload-artifact slot="artifact" type="card" dismissible>
            <div slot="thumbnail" role="img" aria-label="PDF"></div>
            <span slot="title">Brand guidelines</span>
            <span slot="subtitle">PDF</span>
          </swc-upload-artifact>
          <swc-upload-artifact slot="artifact" type="card" dismissible>
            <div slot="thumbnail" role="img" aria-label="Spreadsheet"></div>
            <span slot="title">Q2 metrics draft</span>
            <span slot="subtitle">XLSX</span>
          </swc-upload-artifact>
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
          <swc-upload-artifact slot="artifact" type="media" dismissible>
            <img
              slot="thumbnail"
              src="https://picsum.photos/id/64/68/68"
              alt="Campaign still"
              style="inline-size:100%;block-size:100%;object-fit:cover;"
            />
          </swc-upload-artifact>
          <swc-upload-artifact slot="artifact" type="media" dismissible>
            <img
              slot="thumbnail"
              src="https://picsum.photos/id/56/68/68"
              alt="Storyboard frame"
              style="inline-size:100%;block-size:100%;object-fit:cover;"
            />
            <span slot="badge">PDF</span>
          </swc-upload-artifact>
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
          <swc-upload-artifact slot="artifact" type="card" dismissible>
            <div slot="thumbnail" role="img" aria-label="PDF"></div>
            <span slot="title">Hilton commercial assets</span>
            <span slot="subtitle">2026</span>
          </swc-upload-artifact>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">Single card</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          <swc-upload-artifact slot="artifact" type="media" dismissible>
            <img
              slot="thumbnail"
              src="https://picsum.photos/id/823/68/68"
              alt="Attachment preview"
              style="inline-size:100%;block-size:100%;object-fit:cover;"
            />
          </swc-upload-artifact>
          ${legalDisclaimerSlot}
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">Single media</span>
      </div>
    </div>
  `,
  tags: ['options'],
};

const multiArtifactScrollGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #f77062 0%, #fe5196 100%)',
] as const;

const multiArtifactScrollBadges: Record<number, string> = {
  9: 'MP4',
  10: 'MP4',
  11: 'PDF',
};

export const MultiArtifactScroll: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;inline-size:100%;">
      <p class="swc-Detail swc-Detail--sizeS" style="margin:0;">
        Full-width composer with twelve media tiles. Chevron controls flank the
        strip when scrolling is possible; each click advances by one set with
        the last visible tile anchoring the next view. Edge fades signal
        overflow. An overlay scrollbar lane below the tiles appears during
        wheel, touch, or drag.
      </p>
      <swc-prompt-field label="Prompt" value="Review these storyboard frames.">
        ${multiArtifactScrollGradients.map(
          (gradient, index) => html`
            <swc-upload-artifact slot="artifact" type="media" dismissible>
              <div
                slot="thumbnail"
                role="img"
                aria-label="Storyboard frame ${index + 1}"
                style="inline-size:100%;block-size:100%;background:${gradient};"
              ></div>
              ${multiArtifactScrollBadges[index]
                ? html`
                    <span slot="badge">
                      ${multiArtifactScrollBadges[index]}
                    </span>
                  `
                : nothing}
            </swc-upload-artifact>
          `
        )}
        ${legalDisclaimerSlot}
      </swc-prompt-field>
    </div>
  `,
  tags: ['options'],
};

// ──────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────

interface PromptFieldBehaviorArtifact {
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

@customElement('swc-prompt-field-behavior-demo')
class PromptFieldBehaviorDemo extends LitElement {
  @state()
  private value = 'Summarize the API changes in this branch.';

  @state()
  private artifacts: PromptFieldBehaviorArtifact[] = [];

  @state()
  private readout =
    'Type, submit, add an attachment, or dismiss an artifact to inspect prompt-field integration.';

  protected override createRenderRoot(): this {
    return this;
  }

  public override disconnectedCallback(): void {
    for (const artifact of this.artifacts) {
      if (artifact.thumbnailUrl) {
        URL.revokeObjectURL(artifact.thumbnailUrl);
      }
    }
    super.disconnectedCallback?.();
  }

  private _handleInput(event: Event): void {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    this.value = value;
    this.readout = `Last swc-prompt-field-input: detail.value = "${value}"`;
  }

  private _handleSubmit(event: Event): void {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    for (const artifact of this.artifacts) {
      if (artifact.thumbnailUrl) {
        URL.revokeObjectURL(artifact.thumbnailUrl);
      }
    }
    this.value = '';
    this.artifacts = [];
    this.readout = `Last swc-prompt-field-submit: detail.value = "${value}" and the consumer cleared the composer.`;
  }

  private _handleUploadClick(event: Event): void {
    event.preventDefault();
    const input = this.querySelector<HTMLInputElement>('[data-file-input]');
    input?.click();
    this.readout =
      'Last swc-prompt-field-upload-click: the consumer intercepted the event and opened an external file input.';
  }

  private _handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) {
      return;
    }

    const nextArtifacts = files.map((file, index) => {
      const isImage =
        file.type.startsWith('image/') ||
        /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i.test(file.name);
      return {
        id: `${crypto.randomUUID()}-${index}`,
        fileName: file.name || 'Attachment',
        sizeLabel: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        thumbnailUrl: isImage ? URL.createObjectURL(file) : undefined,
        badgeLabel: isImage ? undefined : fileBadgeLabel(file.name),
      } satisfies PromptFieldBehaviorArtifact;
    });

    this.artifacts = [...this.artifacts, ...nextArtifacts];
    this.readout = `External picker selected ${files.length} file${files.length === 1 ? '' : 's'} and the consumer slotted media upload artifacts into the prompt.`;
    input.value = '';
  }

  private _handleArtifactDismiss(event: Event): void {
    const artifact = event.target as HTMLElement | null;
    const artifactId = artifact?.getAttribute('data-artifact-id');
    if (!artifactId) {
      return;
    }

    const removed = this.artifacts.find((item) => item.id === artifactId);
    if (removed?.thumbnailUrl) {
      URL.revokeObjectURL(removed.thumbnailUrl);
    }

    this.artifacts = this.artifacts.filter((item) => item.id !== artifactId);
    this.readout =
      'Last swc-upload-artifact-dismiss: the consumer removed the slotted artifact.';
  }

  protected override render() {
    return html`
      <div
        style="display:flex;flex-direction:column;gap:24px;max-inline-size:640px;"
      >
        <div style="display:flex;flex-direction:column;gap:8px;">
          <swc-prompt-field
            label="Prompt"
            .value=${this.value}
            @swc-prompt-field-input=${this._handleInput}
            @swc-prompt-field-submit=${this._handleSubmit}
            @swc-prompt-field-upload-click=${this._handleUploadClick}
            @swc-upload-artifact-dismiss=${this._handleArtifactDismiss}
          >
            ${this.artifacts.map(
              (artifact) => html`
                <swc-upload-artifact
                  slot="artifact"
                  type="media"
                  dismissible
                  data-artifact-id=${artifact.id}
                >
                  ${artifact.thumbnailUrl
                    ? html`
                        <img
                          slot="thumbnail"
                          src=${artifact.thumbnailUrl}
                          alt=${artifact.fileName}
                          style="inline-size:100%;block-size:100%;object-fit:cover;"
                        />
                      `
                    : html`
                        <div
                          slot="thumbnail"
                          role="img"
                          aria-label=${artifact.fileName}
                          style="inline-size:100%;block-size:100%;background:#f3f3f3;"
                        ></div>
                      `}
                  ${artifact.badgeLabel
                    ? html`
                        <span slot="badge">${artifact.badgeLabel}</span>
                      `
                    : nothing}
                </swc-upload-artifact>
              `
            )}
            ${legalDisclaimerSlot}
          </swc-prompt-field>
          <input
            data-file-input
            type="file"
            multiple
            hidden
            @change=${this._handleFileChange}
          />
          <span class="swc-Detail swc-Detail--sizeS">
            Input, submit, upload trigger, and external artifact handling
          </span>
        </div>
        <p class="swc-Detail swc-Detail--sizeS" style="margin:0;">
          ${this.readout}
        </p>
      </div>
    `;
  }
}
void PromptFieldBehaviorDemo;

export const HandlingEvents: Story = {
  render: () => html`
    <swc-prompt-field-behavior-demo></swc-prompt-field-behavior-demo>
  `,
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
  tags: ['behaviors'],
};
HandlingEvents.storyName = 'Handling events';

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  args: {
    label: 'Prompt',
    placeholder: defaultPlaceholder,
    value: '',
    mode: 'default',
  },
  tags: ['a11y'],
};
