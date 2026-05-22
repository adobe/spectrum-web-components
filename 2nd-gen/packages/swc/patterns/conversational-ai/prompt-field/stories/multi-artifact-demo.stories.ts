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

import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';
import '../../upload-artifact/index.js';
import '../index.js';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  PlusIcon,
} from '../../utils/icons/index.js';

const defaultPlaceholder =
  'Ready to get started? Ask a question, share an idea, or add a task.';
const demoPrompt =
  'Review all attached materials and generate a product launch strategy with timeline, risks, and budget allocation.';

const gradients = [
  'linear-gradient(135deg,#818cf8,#f43f5e)',
  'linear-gradient(135deg,#6366f1,#ec4899)',
  'linear-gradient(135deg,#0ea5e9,#22c55e)',
  'linear-gradient(135deg,#a855f7,#ef4444)',
  'linear-gradient(135deg,#14b8a6,#f97316)',
  'linear-gradient(135deg,#f472b6,#8b5cf6)',
];

interface DemoArtifact {
  id: string;
  fileName: string;
  kind: 'image' | 'document';
  badge?: string;
  thumbnailUrl?: string;
  gradient: string;
}

const createSeedArtifacts = (count: number): DemoArtifact[] =>
  Array.from({ length: count }, (_, index) => {
    const isDocument = index % 5 === 4;
    return {
      id: `seed-${index}`,
      fileName: isDocument
        ? `Launch brief budget v${index + 1}.pdf`
        : `Campaign still ${index + 1}.png`,
      kind: isDocument ? 'document' : 'image',
      badge: isDocument ? (index % 10 === 4 ? 'PDF' : 'Excel') : undefined,
      gradient: gradients[index % gradients.length]!,
    };
  });

const revokeArtifactUrls = (artifacts: DemoArtifact[]): void => {
  for (const artifact of artifacts) {
    if (artifact.thumbnailUrl) {
      URL.revokeObjectURL(artifact.thumbnailUrl);
    }
  }
};

const createArtifactsFromFiles = (
  files: File[],
  startIndex: number
): DemoArtifact[] =>
  files.map((file, index) => {
    const isImage =
      file.type.startsWith('image/') ||
      /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i.test(file.name);
    const extension = file.name.split('.').pop()?.toUpperCase();
    return {
      id: `${crypto.randomUUID()}-${index}`,
      fileName: file.name || 'Attachment',
      kind: isImage ? 'image' : 'document',
      badge: isImage ? undefined : extension?.slice(0, 4) || 'File',
      thumbnailUrl: isImage ? URL.createObjectURL(file) : undefined,
      gradient: gradients[(startIndex + index) % gradients.length]!,
    } satisfies DemoArtifact;
  });

const getDismissedArtifactId = (event: Event): string | null => {
  const customEvent = event as CustomEvent<{ artifact?: HTMLElement }>;
  const artifactHost =
    customEvent.detail?.artifact ??
    (event.target as HTMLElement | null)?.closest('[data-artifact-id]');

  return artifactHost?.getAttribute('data-artifact-id') ?? null;
};

const renderArtifactTile = (artifact: DemoArtifact): TemplateResult => html`
  <swc-upload-artifact
    type="media"
    ?dismissible=${true}
    dismiss-label=${`Remove ${artifact.fileName}`}
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
            style="background:${artifact.gradient};"
            role="img"
            aria-label=${artifact.fileName}
          ></div>
        `}
    ${artifact.badge
      ? html`
          <span slot="badge">${artifact.badge}</span>
        `
      : nothing}
  </swc-upload-artifact>
`;

const demoStyles = html`
  <style>
    .MultiArtifactDemo-stage {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      box-sizing: border-box;
      inline-size: 100%;
      min-block-size: 90vb;
      max-block-size: 100vh;
      padding: 24px;
    }

    .MultiArtifactDemo {
      display: flex;
      flex-direction: column;
      gap: var(--swc-spacing-200, 12px);
      inline-size: 100%;
      max-inline-size: 800px;
    }

    .MultiArtifactDemo-box {
      display: flex;
      flex-direction: column;
      gap: var(--swc-spacing-300, 16px);
      padding: var(--swc-spacing-300, 16px);
      background: var(--swc-background-layer-2-color, #fff);
      border: 1px solid transparent;
      border-radius: var(--swc-corner-radius-800, 16px);
      box-shadow: var(--swc-drop-shadow-elevated);
    }

    .MultiArtifactDemo-input-area {
      display: flex;
      flex-direction: column;
      gap: var(--swc-spacing-300, 16px);
      padding-inline: var(--swc-spacing-100, 8px);
    }

    .MultiArtifactDemo-prompt-field {
      display: flex;
      flex-direction: column;
      gap: var(--swc-spacing-75, 4px);
    }

    .MultiArtifactDemo-label {
      font-family: var(--swc-sans-serif-font, sans-serif);
      font-size: var(--swc-font-size-100, 14px);
      font-weight: var(--swc-regular-font-weight, 400);
      line-height: var(--swc-line-height-100, 18px);
      color: var(--swc-neutral-subdued-content-color-default, #505050);
    }

    .MultiArtifactDemo-textarea {
      inline-size: 100%;
      min-block-size: 20px;
      max-block-size: 72px;
      padding: 0;
      font-family: var(--swc-sans-serif-font, sans-serif);
      font-size: var(--swc-font-size-200, 16px);
      font-weight: var(--swc-regular-font-weight, 400);
      line-height: var(--swc-line-height-font-size-200, 20px);
      color: var(--swc-gray-900, #131313);
      background: transparent;
      border: none;
      resize: none;
      outline: none;
    }

    .MultiArtifactDemo-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .MultiArtifactDemo-upload,
    .MultiArtifactDemo-send,
    .MultiArtifactDemo-scroll-nav {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: 1px solid transparent;
      cursor: pointer;
    }

    .MultiArtifactDemo-upload {
      inline-size: 32px;
      block-size: 32px;
      color: var(--swc-gray-800, #292929);
      background: transparent;
      border-radius: var(--swc-corner-radius-500, 8px);
    }

    .MultiArtifactDemo-upload:hover {
      background: var(--swc-gray-75, #f0f0f0);
    }

    .MultiArtifactDemo-upload swc-icon,
    .MultiArtifactDemo-send swc-icon,
    .MultiArtifactDemo-scroll-nav swc-icon {
      --swc-icon-inline-size: var(--swc-workflow-icon-size-100, 20px);
      --swc-icon-block-size: var(--swc-workflow-icon-size-100, 20px);
    }

    .MultiArtifactDemo-send {
      inline-size: 32px;
      block-size: 32px;
      color: var(--swc-gray-25, #fff);
      background: var(--swc-neutral-background-color-default, #292929);
      border-radius: var(--swc-corner-radius-800, 16px);
    }

    .MultiArtifactDemo-send:disabled {
      color: var(--swc-gray-400, #a8a8a8);
      background: var(--swc-gray-100, #e9e9e9);
      cursor: default;
    }

    .MultiArtifactDemo-upload-zone {
      display: flex;
      flex-direction: column;
      gap: var(--swc-spacing-75, 4px);
      inline-size: 100%;
    }

    .MultiArtifactDemo-artifacts-row {
      display: flex;
      gap: var(--swc-spacing-100, 8px);
      align-items: center;
      justify-content: flex-start;
      inline-size: 100%;
    }

    .MultiArtifactDemo-scroll-nav {
      flex: 0 0 auto;
      inline-size: 32px;
      block-size: 32px;
      color: var(--swc-gray-800, #292929);
      background: var(--swc-gray-100, #e9e9e9);
      border-radius: var(--swc-corner-radius-800, 16px);
    }

    .MultiArtifactDemo-scroll-viewport {
      position: relative;
      flex: 1 1 auto;
      min-inline-size: 0;
      overflow: hidden;
      padding-block-start: 6px;
      margin-block-start: -6px;
    }

    .MultiArtifactDemo-scroll-track {
      display: flex;
      gap: var(--swc-spacing-100, 8px);
      align-items: start;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      padding-inline-end: 2px;
    }

    .MultiArtifactDemo-scroll-track > swc-upload-artifact,
    .MultiArtifactDemo-inline-row > swc-upload-artifact,
    .MultiArtifactDemo-popover > swc-upload-artifact {
      flex: 0 0 auto;
      inline-size: 64px;
      min-inline-size: 64px;
      block-size: 64px;
      min-block-size: 64px;
    }

    .MultiArtifactDemo-scroll-track::-webkit-scrollbar {
      display: none;
    }

    .MultiArtifactDemo-scroll-fade {
      position: absolute;
      inset-block: 0;
      inline-size: var(--swc-spacing-300, 16px);
      pointer-events: none;
      opacity: 1;
      transition: opacity var(--swc-animation-duration-100, 130ms) ease;
    }

    .MultiArtifactDemo-scroll-fade--start {
      inset-inline-start: 0;
      background: linear-gradient(
        to right,
        rgb(255 255 255 / 80%) 0%,
        rgb(255 255 255 / 0%) 50%
      );
    }

    .MultiArtifactDemo-scroll-fade--end {
      inset-inline-end: 0;
      background: linear-gradient(
        to left,
        rgb(255 255 255 / 80%) 0%,
        rgb(255 255 255 / 0%) 50%
      );
    }

    .MultiArtifactDemo-scroll-fade.is-hidden {
      opacity: 0;
    }

    .MultiArtifactDemo-scrollbar {
      position: relative;
      block-size: 15px;
      overflow: hidden;
    }

    .MultiArtifactDemo-scrollbar-thumb {
      position: absolute;
      inset-block-end: 3px;
      block-size: 8px;
      background: var(--swc-gray-600, #717171);
      /* Pill cap — do not use corner-radius-full (50%) on wide thumbs. */
      border-radius: 9999px;
    }

    .MultiArtifactDemo-inline-row {
      display: flex;
      flex-wrap: nowrap;
      gap: var(--swc-spacing-100, 8px);
      align-items: center;
      justify-content: flex-start;
      inline-size: 100%;
      overflow: hidden;
    }

    .MultiArtifactDemo-view-more {
      display: inline-flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      block-size: 32px;
      min-block-size: 32px;
      padding-inline: 12px;
      padding-block: 7px;
      font-family: var(--swc-sans-serif-font, sans-serif);
      font-size: var(--swc-font-size-100, 14px);
      font-weight: var(--swc-medium-font-weight, 500);
      line-height: var(--swc-line-height-100, 18px);
      color: var(--swc-gray-25, #fff);
      background: var(--swc-neutral-background-color-default, #292929);
      border: none;
      border-radius: var(--swc-corner-radius-500, 8px);
      cursor: pointer;
      white-space: nowrap;
    }

    .MultiArtifactDemo-view-more-dialog {
      position: fixed;
      inset: auto;
      margin: 0;
      padding: 0;
      background: transparent;
      border: none;
      overflow: visible;
      max-inline-size: none;
      max-block-size: none;
    }

    .MultiArtifactDemo-view-more-dialog::backdrop {
      background: transparent;
    }

    .MultiArtifactDemo-view-more-dialog-panel {
      box-sizing: border-box;
      inline-size: 224px;
      padding: var(--swc-spacing-100, 8px);
      background: var(--swc-background-layer-2-color, #fff);
      border: 1px solid transparent;
      border-radius: 10px;
      box-shadow: var(--swc-drop-shadow-elevated);
    }

    .MultiArtifactDemo-view-more-scroll {
      /* Keep the 208px grid intact; pad content away from the scrollbar. */
      box-sizing: content-box;
      inline-size: calc(3 * 64px + 2 * var(--swc-spacing-100, 8px));
      max-block-size: calc(
        4 * 64px + 3 * var(--swc-spacing-100, 8px) + var(--swc-spacing-75, 4px)
      );
      margin-inline-end: calc(-1 * var(--swc-spacing-100, 8px));
      padding-inline-end: var(--swc-spacing-100, 8px);
      padding-block-end: var(--swc-spacing-75, 4px);
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--swc-gray-600, #717171) transparent;
    }

    .MultiArtifactDemo-view-more-scroll::-webkit-scrollbar {
      inline-size: 6px;
    }

    .MultiArtifactDemo-view-more-scroll::-webkit-scrollbar-track {
      background: transparent;
    }

    .MultiArtifactDemo-view-more-scroll::-webkit-scrollbar-thumb {
      background: var(--swc-gray-600, #717171);
      border-radius: 9999px;
    }

    .MultiArtifactDemo-view-more-grid {
      display: grid;
      grid-template-columns: repeat(3, 64px);
      gap: var(--swc-spacing-100, 8px);
      inline-size: fit-content;
    }

    .MultiArtifactDemo-view-more-grid > swc-upload-artifact {
      flex: 0 0 auto;
      inline-size: 64px;
      min-inline-size: 64px;
      block-size: 64px;
      min-block-size: 64px;
    }

    .MultiArtifactDemo-legal {
      margin: 0;
      font-size: var(--swc-font-size-75, 12px);
      line-height: var(--swc-line-height-font-size-75, 16px);
      color: var(--swc-neutral-subdued-content-color-default, #505050);
      text-align: center;
    }

    .MultiArtifactDemo-readout {
      margin: 0;
      font-size: var(--swc-font-size-75, 12px);
      line-height: var(--swc-line-height-font-size-75, 16px);
      color: var(--swc-neutral-subdued-content-color-default, #505050);
    }
  </style>
`;

@customElement('swc-multi-artifact-scroll-demo')
class MultiArtifactScrollDemo extends LitElement {
  @state()
  private artifacts: DemoArtifact[] = createSeedArtifacts(18);

  @state()
  private value = demoPrompt;

  @state()
  private readout =
    'Scroll with arrows or drag the strip. Use + to add files and dismiss tiles to remove them.';

  @state()
  private canScrollBack = false;

  @state()
  private canScrollForward = true;

  @state()
  private hasOverflow = false;

  @state()
  private thumbWidthPx = 0;

  @state()
  private thumbLeftPx = 3;

  @query('.MultiArtifactDemo-scroll-track')
  private _scrollTrack!: HTMLElement;

  @query('.MultiArtifactDemo-scrollbar')
  private _scrollbar!: HTMLElement;

  @query('[data-file-input]')
  private _fileInput!: HTMLInputElement;

  protected override createRenderRoot(): this {
    return this;
  }

  public override disconnectedCallback(): void {
    revokeArtifactUrls(this.artifacts);
    super.disconnectedCallback?.();
  }

  public override firstUpdated(): void {
    this._syncScrollState();

    const track = this._scrollTrack;
    if (!track || typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(() => this._syncScrollState());
    observer.observe(track);
  }

  private _handleArtifactDismiss(event: Event): void {
    const artifactId = getDismissedArtifactId(event);
    if (!artifactId) {
      return;
    }

    const removed = this.artifacts.find(
      (artifact) => artifact.id === artifactId
    );
    if (removed?.thumbnailUrl) {
      URL.revokeObjectURL(removed.thumbnailUrl);
    }

    this.artifacts = this.artifacts.filter(
      (artifact) => artifact.id !== artifactId
    );
    this.readout = `Removed ${removed?.fileName ?? 'artifact'}. ${this.artifacts.length} attachment${this.artifacts.length === 1 ? '' : 's'} remaining.`;
    this.updateComplete.then(() => {
      this._clampScrollPosition();
      this._syncScrollState();
    });
  }

  private _clampScrollPosition(): void {
    const track = this._scrollTrack;
    if (!track) {
      return;
    }

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    if (track.scrollLeft > maxScroll) {
      track.scrollLeft = maxScroll;
    }
  }

  private _handleUploadClick(event: Event): void {
    event.preventDefault();
    this._fileInput?.click();
  }

  private _handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) {
      return;
    }

    const nextArtifacts = createArtifactsFromFiles(
      files,
      this.artifacts.length
    );
    this.artifacts = [...this.artifacts, ...nextArtifacts];
    this.readout = `Added ${files.length} file${files.length === 1 ? '' : 's'}. ${this.artifacts.length} attachment${this.artifacts.length === 1 ? '' : 's'} total.`;
    input.value = '';
    this.updateComplete.then(() => {
      this._scrollTrack?.scrollTo({
        left: this._scrollTrack.scrollWidth,
        behavior: 'smooth',
      });
      this._syncScrollState();
    });
  }

  private _syncScrollState(): void {
    const track = this._scrollTrack;
    const scrollbar = this._scrollbar;
    if (!track || !scrollbar) {
      return;
    }

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    this.hasOverflow = maxScroll > 0;
    this.canScrollBack = track.scrollLeft > 1;
    this.canScrollForward = track.scrollLeft < maxScroll - 1;

    if (!this.hasOverflow) {
      this.thumbWidthPx = 0;
      this.thumbLeftPx = 3;
      return;
    }

    const trackWidth = scrollbar.clientWidth;
    const inset = 3;
    const minThumbWidth = 48;
    this.thumbWidthPx = Math.max(
      minThumbWidth,
      (track.clientWidth / track.scrollWidth) * trackWidth
    );

    const maxThumbLeft = Math.max(
      inset,
      trackWidth - this.thumbWidthPx - inset
    );
    this.thumbLeftPx =
      maxScroll === 0
        ? inset
        : inset + (track.scrollLeft / maxScroll) * (maxThumbLeft - inset);
  }

  private _scrollBy(direction: -1 | 1): void {
    const track = this._scrollTrack;
    if (!track) {
      return;
    }

    const tileStep = 64 + 8;
    const visibleTiles = Math.max(1, Math.floor(track.clientWidth / tileStep));
    const delta = direction * visibleTiles * tileStep;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const nextLeft = Math.min(maxScroll, Math.max(0, track.scrollLeft + delta));

    track.scrollTo({ left: nextLeft, behavior: 'smooth' });
  }

  private _handleSubmit(): void {
    this.readout = `Submitted prompt with ${this.artifacts.length} attachment${this.artifacts.length === 1 ? '' : 's'}.`;
  }

  protected override render(): TemplateResult {
    return html`
      ${demoStyles}
      <div class="MultiArtifactDemo-stage">
        <div
          class="MultiArtifactDemo"
          @swc-upload-artifact-dismiss=${this._handleArtifactDismiss}
        >
          <div class="MultiArtifactDemo-box">
            <div class="MultiArtifactDemo-input-area">
              ${this.artifacts.length > 0
                ? html`
                    <div class="MultiArtifactDemo-upload-zone">
                      <div class="MultiArtifactDemo-artifacts-row">
                        ${this.canScrollBack
                          ? html`
                              <button
                                type="button"
                                class="MultiArtifactDemo-scroll-nav MultiArtifactDemo-scroll-nav--prev"
                                aria-label="Scroll artifacts back"
                                @click=${() => this._scrollBy(-1)}
                              >
                                <swc-icon aria-hidden="true">
                                  ${ChevronLeftIcon()}
                                </swc-icon>
                              </button>
                            `
                          : nothing}
                        <div class="MultiArtifactDemo-scroll-viewport">
                          <div
                            class="MultiArtifactDemo-scroll-track"
                            @scroll=${() => this._syncScrollState()}
                          >
                            ${this.artifacts.map((artifact) =>
                              renderArtifactTile(artifact)
                            )}
                          </div>
                          ${this.hasOverflow
                            ? html`
                                <div
                                  class="MultiArtifactDemo-scroll-fade MultiArtifactDemo-scroll-fade--start ${this
                                    .canScrollBack
                                    ? ''
                                    : 'is-hidden'}"
                                  aria-hidden="true"
                                ></div>
                                <div
                                  class="MultiArtifactDemo-scroll-fade MultiArtifactDemo-scroll-fade--end ${this
                                    .canScrollForward
                                    ? ''
                                    : 'is-hidden'}"
                                  aria-hidden="true"
                                ></div>
                              `
                            : nothing}
                        </div>
                        ${this.canScrollForward
                          ? html`
                              <button
                                type="button"
                                class="MultiArtifactDemo-scroll-nav MultiArtifactDemo-scroll-nav--next"
                                aria-label="Scroll artifacts forward"
                                @click=${() => this._scrollBy(1)}
                              >
                                <swc-icon aria-hidden="true">
                                  ${ChevronRightIcon()}
                                </swc-icon>
                              </button>
                            `
                          : nothing}
                      </div>
                      <div
                        class="MultiArtifactDemo-scrollbar"
                        aria-hidden="true"
                      >
                        ${this.hasOverflow
                          ? html`
                              <div
                                class="MultiArtifactDemo-scrollbar-thumb"
                                style="inline-size:${this
                                  .thumbWidthPx}px;inset-inline-start:${this
                                  .thumbLeftPx}px;"
                              ></div>
                            `
                          : nothing}
                      </div>
                    </div>
                  `
                : nothing}

              <div class="MultiArtifactDemo-prompt-field">
                <label class="MultiArtifactDemo-label">Prompt</label>
                <textarea
                  class="MultiArtifactDemo-textarea"
                  .value=${this.value}
                  placeholder=${defaultPlaceholder}
                  @input=${(event: Event) => {
                    this.value = (event.target as HTMLTextAreaElement).value;
                  }}
                ></textarea>
              </div>
            </div>

            <div class="MultiArtifactDemo-actions">
              <button
                type="button"
                class="MultiArtifactDemo-upload"
                aria-label="Add attachment"
                @click=${this._handleUploadClick}
              >
                <swc-icon aria-hidden="true">${PlusIcon()}</swc-icon>
              </button>
              <button
                type="button"
                class="MultiArtifactDemo-send"
                aria-label="Send"
                ?disabled=${!this.value.trim() && this.artifacts.length === 0}
                @click=${this._handleSubmit}
              >
                <swc-icon aria-hidden="true">${ChevronUpIcon()}</swc-icon>
              </button>
            </div>
          </div>

          <p class="MultiArtifactDemo-legal">
            Responses are generated using AI, and may be inaccurate. Check
            before using.
            <a
              href="https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html"
            >
              AI User Guidelines
            </a>
          </p>
          <input
            data-file-input
            type="file"
            multiple
            hidden
            @change=${this._handleFileChange}
          />
          <p class="MultiArtifactDemo-readout">${this.readout}</p>
        </div>
      </div>
    `;
  }
}

@customElement('swc-multi-artifact-view-more-demo')
class MultiArtifactViewMoreDemo extends LitElement {
  private static visibleCount = 8;

  @state()
  private artifacts: DemoArtifact[] = createSeedArtifacts(18);

  @state()
  private value = demoPrompt;

  @state()
  private readout =
    'Shows eight inline tiles, then View more for the rest. Use + to add files.';

  @state()
  private dialogOpen = false;

  @query('.MultiArtifactDemo-view-more-dialog')
  private _dialog!: HTMLDialogElement;

  @query('.MultiArtifactDemo-view-more')
  private _viewMoreButton!: HTMLButtonElement;

  @query('[data-file-input]')
  private _fileInput!: HTMLInputElement;

  protected override createRenderRoot(): this {
    return this;
  }

  public override disconnectedCallback(): void {
    document.removeEventListener(
      'pointerdown',
      this._backdropPointerDown,
      true
    );
    if (this._dialog?.open) {
      this._dialog.close();
    }
    revokeArtifactUrls(this.artifacts);
    super.disconnectedCallback?.();
  }

  private _handleArtifactDismiss(event: Event): void {
    const artifactId = getDismissedArtifactId(event);
    if (!artifactId) {
      return;
    }

    const removed = this.artifacts.find(
      (artifact) => artifact.id === artifactId
    );
    if (removed?.thumbnailUrl) {
      URL.revokeObjectURL(removed.thumbnailUrl);
    }

    this.artifacts = this.artifacts.filter(
      (artifact) => artifact.id !== artifactId
    );
    this.readout = `Removed ${removed?.fileName ?? 'artifact'}. ${this.artifacts.length} attachment${this.artifacts.length === 1 ? '' : 's'} remaining.`;

    if (this.artifacts.length <= MultiArtifactViewMoreDemo.visibleCount) {
      this._closeViewMoreDialog();
    } else if (this._dialog?.open) {
      this.updateComplete.then(() => this._positionViewMoreDialog());
    }
  }

  private _handleUploadClick(event: Event): void {
    event.preventDefault();
    this._fileInput?.click();
  }

  private _handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) {
      return;
    }

    const nextArtifacts = createArtifactsFromFiles(
      files,
      this.artifacts.length
    );
    this.artifacts = [...this.artifacts, ...nextArtifacts];
    this.readout = `Added ${files.length} file${files.length === 1 ? '' : 's'}. ${this.artifacts.length} attachment${this.artifacts.length === 1 ? '' : 's'} total.`;
    input.value = '';

    if (this._dialog?.open) {
      this.updateComplete.then(() => this._positionViewMoreDialog());
    }
  }

  private _backdropPointerDown = (event: PointerEvent): void => {
    const target = event.target as Node;
    const panel = this._dialog?.querySelector(
      '.MultiArtifactDemo-view-more-dialog-panel'
    );

    if (
      panel?.contains(target) ||
      this._viewMoreButton?.contains(target) ||
      target === this._viewMoreButton
    ) {
      return;
    }

    this._closeViewMoreDialog();
  };

  private _openViewMoreDialog(): void {
    const dialog = this._dialog;
    if (!dialog || dialog.open) {
      return;
    }

    dialog.showModal();
    this.dialogOpen = true;
    document.addEventListener('pointerdown', this._backdropPointerDown, true);
    this.readout = `Opened view-more dialog with ${this._overflowArtifacts.length} additional artifact${this._overflowArtifacts.length === 1 ? '' : 's'}.`;
    this.updateComplete.then(() => this._positionViewMoreDialog());
  }

  private _closeViewMoreDialog(): void {
    if (this._dialog?.open) {
      this._dialog.close();
    }
  }

  private _handleViewMoreClick(): void {
    if (this._dialog?.open) {
      this._closeViewMoreDialog();
      return;
    }

    this._openViewMoreDialog();
  }

  private _handleDialogClose(): void {
    document.removeEventListener(
      'pointerdown',
      this._backdropPointerDown,
      true
    );
    this.dialogOpen = false;
    this.readout = 'Closed view-more dialog.';
    this._viewMoreButton?.focus();
  }

  private _positionViewMoreDialog(): void {
    const button = this._viewMoreButton;
    const dialog = this._dialog;
    if (!button || !dialog) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const gap = 8;
    const top = rect.top - dialog.offsetHeight - gap;
    const left = rect.right - dialog.offsetWidth;

    dialog.style.top = `${Math.max(8, top)}px`;
    dialog.style.left = `${Math.max(8, left)}px`;
  }

  private get _visibleArtifacts(): DemoArtifact[] {
    return this.artifacts.slice(0, MultiArtifactViewMoreDemo.visibleCount);
  }

  private get _overflowArtifacts(): DemoArtifact[] {
    return this.artifacts.slice(MultiArtifactViewMoreDemo.visibleCount);
  }

  private _handleSubmit(): void {
    this.readout = `Submitted prompt with ${this.artifacts.length} attachment${this.artifacts.length === 1 ? '' : 's'}.`;
  }

  protected override render(): TemplateResult {
    const overflowCount = this._overflowArtifacts.length;

    return html`
      ${demoStyles}
      <div class="MultiArtifactDemo-stage">
        <div
          class="MultiArtifactDemo"
          @swc-upload-artifact-dismiss=${this._handleArtifactDismiss}
        >
          <div class="MultiArtifactDemo-box">
            <div class="MultiArtifactDemo-input-area">
              ${this.artifacts.length > 0
                ? html`
                    <div class="MultiArtifactDemo-upload-zone">
                      <div class="MultiArtifactDemo-inline-row">
                        ${this._visibleArtifacts.map((artifact) =>
                          renderArtifactTile(artifact)
                        )}
                        ${overflowCount > 0
                          ? html`
                              <button
                                type="button"
                                class="MultiArtifactDemo-view-more"
                                aria-haspopup="dialog"
                                aria-expanded=${this.dialogOpen
                                  ? 'true'
                                  : 'false'}
                                aria-controls="view-more-dialog"
                                @click=${this._handleViewMoreClick}
                              >
                                View more (${overflowCount})
                              </button>
                            `
                          : nothing}
                      </div>
                    </div>
                  `
                : nothing}

              <div class="MultiArtifactDemo-prompt-field">
                <label class="MultiArtifactDemo-label">Prompt</label>
                <textarea
                  class="MultiArtifactDemo-textarea"
                  .value=${this.value}
                  placeholder=${defaultPlaceholder}
                  @input=${(event: Event) => {
                    this.value = (event.target as HTMLTextAreaElement).value;
                  }}
                ></textarea>
              </div>
            </div>

            <div class="MultiArtifactDemo-actions">
              <button
                type="button"
                class="MultiArtifactDemo-upload"
                aria-label="Add attachment"
                @click=${this._handleUploadClick}
              >
                <swc-icon aria-hidden="true">${PlusIcon()}</swc-icon>
              </button>
              <button
                type="button"
                class="MultiArtifactDemo-send"
                aria-label="Send"
                ?disabled=${!this.value.trim() && this.artifacts.length === 0}
                @click=${this._handleSubmit}
              >
                <swc-icon aria-hidden="true">${ChevronUpIcon()}</swc-icon>
              </button>
            </div>
          </div>

          <p class="MultiArtifactDemo-legal">
            Responses are generated using AI, and may be inaccurate. Check
            before using.
            <a
              href="https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html"
            >
              AI User Guidelines
            </a>
          </p>
          <input
            data-file-input
            type="file"
            multiple
            hidden
            @change=${this._handleFileChange}
          />
          <p class="MultiArtifactDemo-readout">${this.readout}</p>

          <dialog
            id="view-more-dialog"
            class="MultiArtifactDemo-view-more-dialog"
            aria-label="Additional attachments"
            @close=${this._handleDialogClose}
            @swc-upload-artifact-dismiss=${this._handleArtifactDismiss}
          >
            <div class="MultiArtifactDemo-view-more-dialog-panel">
              <div class="MultiArtifactDemo-view-more-scroll">
                <div class="MultiArtifactDemo-view-more-grid">
                  ${this._overflowArtifacts.map((artifact) =>
                    renderArtifactTile(artifact)
                  )}
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    `;
  }
}

void MultiArtifactScrollDemo;
void MultiArtifactViewMoreDemo;

const meta: Meta = {
  title: 'Conversational AI/Prompt field/Multi-artifact demos',
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
    layout: 'fullscreen',
  },
  tags: ['dev'],
};

export default meta;

/**
 * Horizontal scroll strip with previous/next controls and a synced scrollbar.
 * Starts with 18 seeded artifacts so overflow is immediate.
 */
export const ScrollGallery: Story = {
  render: () => html`
    <swc-multi-artifact-scroll-demo></swc-multi-artifact-scroll-demo>
  `,
};

/**
 * Inline cap of eight artifacts, with a view-more dialog for the remainder.
 * Starts with 18 seeded artifacts so the overflow button appears immediately.
 */
export const ViewMorePopover: Story = {
  render: () => html`
    <swc-multi-artifact-view-more-demo></swc-multi-artifact-view-more-demo>
  `,
};
