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
import { customElement, state } from 'lit/decorators.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '../../upload-artifact/swc-upload-artifact.js';
import '../swc-prompt-field.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-prompt-field');
const defaultPlaceholder =
  'Ready to get started? Ask a question, share an idea, or add a task.';

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
  render: (args) => template(args),
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
        <swc-prompt-field
          label="Prompt"
          placeholder=${defaultPlaceholder}
        ></swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">Base structure</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          <div slot="legal">
            AI output may be inaccurate. Verify before using.
          </div>
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">legal slot only</span>
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
        <swc-prompt-field
          label="Prompt"
          placeholder=${defaultPlaceholder}
        ></swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          mode="default" with empty value
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          value="Summarize the API changes in this branch."
        ></swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          mode="default" with entered value
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          mode="loading"
          label="Prompt"
          value="Summarize the API changes in this branch."
        ></swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          mode="loading" (input remains editable)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          mode="disabled"
          label="Prompt"
          value="This input is disabled."
        ></swc-prompt-field>
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
        — Slot multiple
        <code>&lt;swc-upload-artifact slot="artifact"&gt;</code>
        nodes; the field lays them out in a wrapping row above the textarea.
        More variants:
        <strong>Multi-artifacts</strong>
        .
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
          <swc-upload-artifact slot="artifact" type="media" dismissible>
            <div
              slot="thumbnail"
              style="background:linear-gradient(135deg,#6366f1,#ec4899);"
              role="img"
              aria-label="Campaign still"
            ></div>
          </swc-upload-artifact>
          <swc-upload-artifact slot="artifact" type="media" dismissible>
            <div
              slot="thumbnail"
              style="background:linear-gradient(135deg,#0ea5e9,#22c55e);"
              role="img"
              aria-label="Storyboard frame"
            ></div>
          </swc-upload-artifact>
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">
          Mixed multi-artifact (card + media, wrapping strip)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field
          label="Prompt"
          placeholder=${defaultPlaceholder}
        ></swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">None</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          <swc-upload-artifact slot="artifact" type="card" dismissible>
            <div slot="thumbnail" role="img" aria-label="PDF"></div>
            <span slot="title">Hilton commercial assets</span>
            <span slot="subtitle">2026</span>
          </swc-upload-artifact>
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">Single card</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-prompt-field label="Prompt" placeholder=${defaultPlaceholder}>
          <swc-upload-artifact slot="artifact" type="media" dismissible>
            <img
              slot="thumbnail"
              src="https://placehold.co/160x120/png"
              alt="Attachment preview"
            />
          </swc-upload-artifact>
        </swc-prompt-field>
        <span class="swc-Detail swc-Detail--sizeS">Single media</span>
      </div>
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
      } satisfies PromptFieldBehaviorArtifact;
    });

    this.artifacts = [...this.artifacts, ...nextArtifacts];
    this.readout = `External picker selected ${files.length} file${files.length === 1 ? '' : 's'} and the consumer slotted upload artifacts into the prompt.`;
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
            ${this.artifacts.map((artifact) =>
              artifact.thumbnailUrl
                ? html`
                    <swc-upload-artifact
                      slot="artifact"
                      type="media"
                      dismissible
                      data-artifact-id=${artifact.id}
                    >
                      <img
                        slot="thumbnail"
                        src=${artifact.thumbnailUrl}
                        alt=${artifact.fileName}
                        style="inline-size:100%;block-size:100%;object-fit:cover;"
                      />
                    </swc-upload-artifact>
                  `
                : html`
                    <swc-upload-artifact
                      slot="artifact"
                      type="card"
                      dismissible
                      data-artifact-id=${artifact.id}
                    >
                      <div
                        slot="thumbnail"
                        role="img"
                        aria-label="File thumbnail"
                        style="inline-size:40px;block-size:40px;"
                      ></div>
                      <span slot="title">${artifact.fileName}</span>
                      <span slot="subtitle">${artifact.sizeLabel}</span>
                    </swc-upload-artifact>
                  `
            )}
            <div slot="legal">
              AI output may be inaccurate. Verify before using.
            </div>
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
