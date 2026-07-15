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

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';
import {
  property,
  query,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import { Chevron75Icon } from '@adobe/spectrum-wc/icon/elements/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { uniqueId } from '../../../utils/id.js';
import { ChevronUpIcon, PlusIcon, StopIcon } from '../utils/icons/index.js';

import styles from './prompt-field.css';

export interface PromptFieldSubmitDetail {
  value: string;
}

export type PromptFieldMode = 'default' | 'loading' | 'disabled';

/**
 * Prompt entry surface for conversational AI flows.
 *
 * Uncontrolled with mirror pattern: the component updates its own draft state first,
 * then emits events so consumers can mirror or override that state.
 *
 * @element swc-prompt-field
 *
 * @slot artifact - Optional attachment preview(s). Use one `swc-upload-artifact` type per session (cards only, or media only).
 * @slot legal - Legal disclaimer content. Required in product implementations; provide Legal-approved copy.
 * @fires swc-prompt-field-input - Dispatched after the textarea value is internally updated.
 * Detail: `{ value: string }`
 * @fires swc-prompt-field-submit - Dispatched when send is triggered.
 * Detail: `{ value: string }`
 * @fires swc-prompt-field-stop - Dispatched when stop generation is requested in loading mode.
 * @fires swc-prompt-field-upload-click - Dispatched when upload affordance is activated.
 * Consumers should handle file picker flow externally.
 */
export class PromptField extends SpectrumElement {
  private readonly labelId = uniqueId('swc-prompt-field-label');

  /** Visual mode for the prompt field action/interaction state. */
  @property({ type: String, reflect: true })
  public mode: PromptFieldMode = 'default';

  /** Accessible label shown above the textarea. */
  @property({ type: String })
  public label = 'Prompt';

  /** Optional accessible label override for the textarea. */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /** Accessible label for the send action button. */
  @property({ type: String, attribute: 'send-label' })
  public sendLabel = 'Send';

  /** Accessible label for the stop action button in loading mode. */
  @property({ type: String, attribute: 'stop-label' })
  public stopLabel = 'Stop generating';

  /** Accessible label for the upload button. */
  @property({ type: String, attribute: 'upload-label' })
  public uploadLabel = 'Add attachment';

  /** Accessible label for the previous-artifact scroll button. */
  @property({ type: String, attribute: 'artifact-scroll-prev-label' })
  public artifactScrollPrevLabel = 'Show previous attachments';

  /** Accessible label for the next-artifact scroll button. */
  @property({ type: String, attribute: 'artifact-scroll-next-label' })
  public artifactScrollNextLabel = 'Show more attachments';

  /** Placeholder text shown inside the textarea. */
  @property({ type: String })
  public placeholder =
    'Ready to get started? Ask a question, share an idea, or add a task.';

  /** The current textarea value; internally updated and externally mirrorable. */
  @property({ type: String })
  public value = '';

  /** Minimum visible textarea rows before growth. */
  @property({ type: Number, attribute: 'min-rows' })
  public minRows = 1;

  /** Maximum visible textarea rows before internal scrolling. */
  @property({ type: Number, attribute: 'max-rows' })
  public maxRows = 4;

  @queryAssignedElements({ slot: 'artifact', flatten: true })
  private _assignedArtifactElements!: HTMLElement[];

  @query('.swc-PromptField-artifacts-scroll')
  private _artifactScrollEl?: HTMLDivElement;

  @queryAssignedElements({ slot: 'legal', flatten: true })
  private _assignedLegalElements!: HTMLElement[];

  /** Next textarea focus follows pointerdown on the textarea (click/touch). */
  private _textareaFocusFromPointer = false;

  /** Outer card ring: Tab / non-pointer focus only (see prompt-field.css). */
  @state()
  private _promptBoxKeyboardFocusRing = false;

  @state()
  private _artifactScrollOverflow = false;

  @state()
  private _artifactCanScrollPrev = false;

  @state()
  private _artifactCanScrollNext = false;

  private _artifactScrollObserver?: ResizeObserver;

  @state()
  private _artifactScrollFromButtons = false;

  @state()
  private _artifactScrollbarInteracting = false;

  private _artifactScrollButtonResetTimer?: number;

  private _artifactScrollbarInteractTimer?: number;

  private _artifactScrollbarThumbDragOffset = 0;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override disconnectedCallback(): void {
    this._artifactScrollObserver?.disconnect();
    this._artifactScrollObserver = undefined;
    if (this._artifactScrollButtonResetTimer !== undefined) {
      window.clearTimeout(this._artifactScrollButtonResetTimer);
    }
    if (this._artifactScrollbarInteractTimer !== undefined) {
      window.clearTimeout(this._artifactScrollbarInteractTimer);
    }
    super.disconnectedCallback();
  }

  protected override updated(): void {
    this._warnIfMissingLegalContent();

    if ((this._assignedArtifactElements?.length ?? 0) < 2) {
      this._artifactScrollObserver?.disconnect();
      return;
    }

    requestAnimationFrame(() => {
      this._observeArtifactScrollViewport();
    });
  }

  private _handleInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.dispatchEvent(
      new CustomEvent('swc-prompt-field-input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleTextareaPointerDown(event: PointerEvent): void {
    const textarea = event.currentTarget as HTMLTextAreaElement;
    if (textarea.matches(':focus')) {
      this._promptBoxKeyboardFocusRing = false;
      return;
    }

    this._textareaFocusFromPointer = true;
  }

  private _handleTextareaFocusIn(): void {
    const showRing = !this._textareaFocusFromPointer;
    this._textareaFocusFromPointer = false;
    this._promptBoxKeyboardFocusRing = showRing;
  }

  private _handleTextareaFocusOut(): void {
    this._promptBoxKeyboardFocusRing = false;
    this._textareaFocusFromPointer = false;
  }

  private _handleTextareaKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing) {
      return;
    }

    event.preventDefault();
    if (this._isLoading || this._isDisabled) {
      return;
    }
    this._handleSendClick();
  }

  private _handleSendClick(): void {
    if (!this._isPopulated || this._isDisabled) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<PromptFieldSubmitDetail>('swc-prompt-field-submit', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
        },
      })
    );
  }

  private _handleStopClick(): void {
    this.dispatchEvent(
      new CustomEvent('swc-prompt-field-stop', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleUploadClick(): void {
    this.dispatchEvent(
      new CustomEvent('swc-prompt-field-upload-click', {
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  }

  private _handleArtifactSlotChange(): void {
    this._warnIfMixedArtifactTypes();
    this.requestUpdate();
    void this.updateComplete.then(() => {
      requestAnimationFrame(() => {
        this._observeArtifactScrollViewport();
        this._updateArtifactScrollState();
      });
    });
  }

  private _handleArtifactScroll(): void {
    this._updateArtifactScrollState();
    this.requestUpdate();
  }

  private _getArtifactScrollbarThumbStyle(): Record<string, string> {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      return { width: '0px', insetInlineStart: '0px' };
    }

    const { scrollWidth, clientWidth, scrollLeft } = scrollEl;
    const tolerance = 1;
    if (scrollWidth <= clientWidth + tolerance) {
      return { width: '0px', insetInlineStart: '0px' };
    }

    const thumbWidth = Math.max((clientWidth / scrollWidth) * clientWidth, 24);
    const maxScroll = this._getArtifactMaxScroll(scrollEl);
    const maxThumbOffset = Math.max(0, clientWidth - thumbWidth);
    const thumbOffset =
      maxScroll > 0 ? (scrollLeft / maxScroll) * maxThumbOffset : 0;

    return {
      width: `${thumbWidth}px`,
      insetInlineStart: `${thumbOffset}px`,
    };
  }

  private _setArtifactScrollFromThumbOffset(
    thumbOffset: number,
    trackWidth: number
  ): void {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      return;
    }

    const thumbWidth = Math.max(
      (scrollEl.clientWidth / scrollEl.scrollWidth) * scrollEl.clientWidth,
      24
    );
    const maxThumbOffset = Math.max(0, trackWidth - thumbWidth);
    const clampedOffset = Math.max(0, Math.min(maxThumbOffset, thumbOffset));
    const maxScroll = this._getArtifactMaxScroll(scrollEl);
    const ratio = maxThumbOffset > 0 ? clampedOffset / maxThumbOffset : 0;

    scrollEl.scrollLeft = ratio * maxScroll;
    this._updateArtifactScrollState();
    this.requestUpdate();
  }

  private _showArtifactScrollbarFromInteraction(): void {
    if (this._artifactScrollFromButtons) {
      return;
    }

    this._artifactScrollbarInteracting = true;

    if (this._artifactScrollbarInteractTimer !== undefined) {
      window.clearTimeout(this._artifactScrollbarInteractTimer);
    }

    this._artifactScrollbarInteractTimer = window.setTimeout(() => {
      this._artifactScrollbarInteracting = false;
      this._artifactScrollbarInteractTimer = undefined;
      this.requestUpdate();
    }, 1000);
  }

  private _handleArtifactScrollKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }

    // Prevent the browser's native small-step scroll on this overflow-x:auto
    // container so ArrowLeft/ArrowRight always trigger the same set-based
    // paging as the chevron buttons.
    event.preventDefault();
    this._scrollArtifactsByPage(event.key === 'ArrowRight' ? 1 : -1);
  }

  private _handleArtifactWheel(event: WheelEvent): void {
    if (Math.abs(event.deltaX) > 0 || Math.abs(event.deltaY) > 0) {
      this._showArtifactScrollbarFromInteraction();
      this.requestUpdate();
    }
  }

  private _handleArtifactScrollbarLanePointerDown(event: PointerEvent): void {
    if (this._artifactScrollFromButtons) {
      return;
    }

    const lane = event.currentTarget as HTMLElement;
    const laneRect = lane.getBoundingClientRect();
    const thumbStyle = this._getArtifactScrollbarThumbStyle();
    const thumbWidth = Number.parseFloat(thumbStyle.width) || 0;
    const clickOffset = event.clientX - laneRect.left - thumbWidth / 2;

    this._setArtifactScrollFromThumbOffset(clickOffset, laneRect.width);
    this._showArtifactScrollbarFromInteraction();
  }

  private _handleArtifactScrollbarThumbPointerDown(event: PointerEvent): void {
    event.stopPropagation();

    if (this._artifactScrollFromButtons) {
      return;
    }

    const thumb = event.currentTarget as HTMLElement;
    const lane = thumb.parentElement;
    if (!lane) {
      return;
    }

    const thumbRect = thumb.getBoundingClientRect();
    this._artifactScrollbarThumbDragOffset = event.clientX - thumbRect.left;
    this._showArtifactScrollbarFromInteraction();

    const onPointerMove = (moveEvent: PointerEvent): void => {
      const laneRect = lane.getBoundingClientRect();
      const thumbOffset =
        moveEvent.clientX -
        laneRect.left -
        this._artifactScrollbarThumbDragOffset;
      this._setArtifactScrollFromThumbOffset(thumbOffset, laneRect.width);
      this._showArtifactScrollbarFromInteraction();
    };

    const onPointerUp = (): void => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  private _markArtifactScrollFromButtons(): void {
    const scrollEl = this._artifactScrollEl;
    this._artifactScrollFromButtons = true;
    this._artifactScrollbarInteracting = false;

    if (this._artifactScrollbarInteractTimer !== undefined) {
      window.clearTimeout(this._artifactScrollbarInteractTimer);
      this._artifactScrollbarInteractTimer = undefined;
    }

    if (this._artifactScrollButtonResetTimer !== undefined) {
      window.clearTimeout(this._artifactScrollButtonResetTimer);
    }

    const reset = (): void => {
      this._artifactScrollFromButtons = false;
      this._artifactScrollButtonResetTimer = undefined;
      scrollEl?.removeEventListener('scrollend', reset);
    };

    scrollEl?.addEventListener('scrollend', reset, { once: true });
    this._artifactScrollButtonResetTimer = window.setTimeout(reset, 600);
  }

  private _observeArtifactScrollViewport(): void {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      this._artifactScrollObserver?.disconnect();
      return;
    }

    if (!this._artifactScrollObserver) {
      this._artifactScrollObserver = new ResizeObserver(() => {
        this._updateArtifactScrollState();
      });
    }

    this._artifactScrollObserver.disconnect();
    this._artifactScrollObserver.observe(scrollEl);
    for (const element of this._assignedArtifactElements ?? []) {
      this._artifactScrollObserver.observe(element);
    }
    this._updateArtifactScrollState();
  }

  private _getArtifactScrollOffset(child: HTMLElement): number {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      return 0;
    }

    return (
      child.getBoundingClientRect().left -
      scrollEl.getBoundingClientRect().left +
      scrollEl.scrollLeft
    );
  }

  private _getArtifactTileWidth(child: HTMLElement): number {
    return child.getBoundingClientRect().width || child.offsetWidth;
  }

  private _getVisibleArtifactRange(): { first: number; last: number } {
    const scrollEl = this._artifactScrollEl;
    const children = this._assignedArtifactElements ?? [];
    if (!scrollEl || !children.length) {
      return { first: 0, last: 0 };
    }

    const scrollLeft = scrollEl.scrollLeft;
    const viewportRight = scrollLeft + scrollEl.clientWidth;
    const tolerance = 1;
    let first = -1;
    let last = -1;

    for (let i = 0; i < children.length; i += 1) {
      const offset = this._getArtifactScrollOffset(children[i]);
      const right = offset + this._getArtifactTileWidth(children[i]);
      if (
        right > scrollLeft + tolerance &&
        offset < viewportRight - tolerance
      ) {
        if (first === -1) {
          first = i;
        }
        last = i;
      }
    }

    return {
      first: first === -1 ? 0 : first,
      last: last === -1 ? children.length - 1 : last,
    };
  }

  private _getArtifactMaxScroll(scrollEl: HTMLDivElement): number {
    return Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth);
  }

  private _getArtifactTileVisibleFraction(
    child: HTMLElement,
    scrollEl: HTMLDivElement
  ): number {
    const tileWidth = this._getArtifactTileWidth(child);
    if (!tileWidth) {
      return 0;
    }

    const offset = this._getArtifactScrollOffset(child);
    const right = offset + tileWidth;
    const scrollLeft = scrollEl.scrollLeft;
    const viewportRight = scrollLeft + scrollEl.clientWidth;
    const visibleWidth =
      Math.min(right, viewportRight) - Math.max(offset, scrollLeft);

    return Math.max(0, visibleWidth) / tileWidth;
  }

  private _scrollArtifactsByPage(direction: -1 | 1): void {
    const scrollEl = this._artifactScrollEl;
    const children = this._assignedArtifactElements ?? [];
    if (!scrollEl || children.length < 2) {
      return;
    }

    const tolerance = 1;
    const maxScroll = this._getArtifactMaxScroll(scrollEl);
    const { first, last } = this._getVisibleArtifactRange();

    if (direction === 1) {
      if (scrollEl.scrollLeft >= maxScroll - tolerance) {
        return;
      }

      this._markArtifactScrollFromButtons();

      if (last >= children.length - 1) {
        children[children.length - 1].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'end',
        });
        return;
      }

      // last < children.length - 1 here (the "already at the end" case
      // returned above), so an ambiguous edge tile (< 50% visible) is
      // carried over as the next page's anchor; otherwise page fully.
      const lastVisibleFraction = this._getArtifactTileVisibleFraction(
        children[last],
        scrollEl
      );
      const nextStart =
        lastVisibleFraction >= 0.5 ? children[last + 1] : children[last];

      nextStart.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      return;
    }

    if (first <= 0 && scrollEl.scrollLeft <= tolerance) {
      return;
    }

    this._markArtifactScrollFromButtons();

    if (first <= 0) {
      children[0].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      return;
    }

    const firstVisibleFraction = this._getArtifactTileVisibleFraction(
      children[first],
      scrollEl
    );
    const prevEnd =
      firstVisibleFraction >= 0.5 ? children[first - 1] : children[first];

    prevEnd.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'end',
    });
  }

  private _updateArtifactScrollState(): void {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      this._artifactScrollOverflow = false;
      this._artifactCanScrollPrev = false;
      this._artifactCanScrollNext = false;
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = scrollEl;
    const tolerance = 1;
    const overflow = scrollWidth > clientWidth + tolerance;
    const maxScroll = this._getArtifactMaxScroll(scrollEl);

    this._artifactScrollOverflow = overflow;
    this._artifactCanScrollPrev = overflow && scrollLeft > tolerance;
    this._artifactCanScrollNext =
      overflow && scrollLeft < maxScroll - tolerance;
  }

  private _warnedMixedArtifactTypes = false;

  private _warnedMissingLegalContent = false;

  private _warnIfMixedArtifactTypes(): void {
    const elements = this._assignedArtifactElements ?? [];
    const types = new Set(
      elements
        .map((element) => element.getAttribute('type'))
        .filter(
          (type): type is 'card' | 'media' =>
            type === 'card' || type === 'media'
        )
    );

    if (types.size <= 1) {
      this._warnedMixedArtifactTypes = false;
      return;
    }

    if (this._warnedMixedArtifactTypes) {
      return;
    }

    this._warnedMixedArtifactTypes = true;
    console.warn(
      '[swc-prompt-field] The artifact slot contains both card and media upload artifacts. Use one layout type per composer session (all card or all media). When uploads mix images and documents, normalize to media tiles with thumbnails and optional badges. See upload-artifact documentation.'
    );
  }

  private _warnIfMissingLegalContent(): void {
    const elements = this._assignedLegalElements ?? [];

    if (elements.length > 0) {
      this._warnedMissingLegalContent = false;
      return;
    }

    if (this._warnedMissingLegalContent) {
      return;
    }

    this._warnedMissingLegalContent = true;
    console.warn(
      '[swc-prompt-field] The legal slot is empty. Product implementations must provide Legal-approved disclaimer content via the legal slot. See prompt-field documentation.'
    );
  }

  private get _isPopulated(): boolean {
    return (
      this.value.trim().length > 0 ||
      (this._assignedArtifactElements?.length ?? 0) > 0
    );
  }

  private get _normalizedMinRows(): number {
    return Math.max(1, Math.floor(this.minRows || 1));
  }

  private get _normalizedMaxRows(): number {
    return Math.max(
      this._normalizedMinRows,
      Math.floor(this.maxRows || this._normalizedMinRows)
    );
  }

  private get _isLoading(): boolean {
    return this.mode === 'loading';
  }

  private get _isDisabled(): boolean {
    return this.mode === 'disabled';
  }

  private _handleLegalSlotChange(): void {
    this._warnIfMissingLegalContent();
    this.requestUpdate();
  }

  private _renderLegalFooter(): TemplateResult | null {
    if ((this._assignedLegalElements?.length ?? 0) === 0) {
      return html`
        <slot
          name="legal"
          hidden
          @slotchange=${this._handleLegalSlotChange}
        ></slot>
      `;
    }
    return html`
      <div class="swc-PromptField-footer">
        <slot name="legal" @slotchange=${this._handleLegalSlotChange}></slot>
      </div>
    `;
  }

  private _renderArtifact(): TemplateResult {
    const artifactCount = this._assignedArtifactElements?.length ?? 0;

    if (artifactCount === 0) {
      return html`
        <div class="swc-PromptField-artifacts" hidden>
          <slot
            name="artifact"
            @slotchange=${this._handleArtifactSlotChange}
          ></slot>
        </div>
      `;
    }

    if (artifactCount === 1) {
      return html`
        <div
          class="swc-PromptField-artifacts swc-PromptField-artifacts--single"
        >
          <slot
            name="artifact"
            @slotchange=${this._handleArtifactSlotChange}
          ></slot>
        </div>
      `;
    }

    return html`
      <div
        class="swc-PromptField-artifacts swc-PromptField-artifacts--multiple"
      >
        <div
          class="swc-PromptField-artifacts-row"
          @keydown=${this._handleArtifactScrollKeydown}
        >
          ${this._artifactScrollOverflow && this._artifactCanScrollPrev
            ? html`
                <button
                  type="button"
                  class="swc-PromptField-artifacts-scroll-prev"
                  aria-label=${this.artifactScrollPrevLabel}
                  @click=${() => this._scrollArtifactsByPage(-1)}
                >
                  <swc-icon size="s" aria-hidden="true">
                    ${Chevron75Icon()}
                  </swc-icon>
                </button>
              `
            : nothing}
          <div class="swc-PromptField-artifacts-viewport">
            <div
              class=${classMap({
                'swc-PromptField-artifacts-scroll': true,
                'is-artifact-scroll-from-buttons':
                  this._artifactScrollFromButtons,
              })}
              @scroll=${this._handleArtifactScroll}
              @wheel=${this._handleArtifactWheel}
              @touchstart=${this._showArtifactScrollbarFromInteraction}
            >
              <div class="swc-PromptField-artifacts-tiles">
                <slot
                  name="artifact"
                  @slotchange=${this._handleArtifactSlotChange}
                ></slot>
              </div>
            </div>
            ${this._artifactScrollOverflow
              ? html`
                  <div
                    class=${classMap({
                      'swc-PromptField-artifacts-scrollbar-lane': true,
                      'is-artifact-scrollbar-interacting':
                        this._artifactScrollbarInteracting &&
                        !this._artifactScrollFromButtons,
                    })}
                    @pointerdown=${this._handleArtifactScrollbarLanePointerDown}
                  >
                    <div
                      class="swc-PromptField-artifacts-scrollbar-thumb"
                      style=${styleMap(this._getArtifactScrollbarThumbStyle())}
                      @pointerdown=${this
                        ._handleArtifactScrollbarThumbPointerDown}
                    ></div>
                  </div>
                `
              : nothing}
            ${this._artifactCanScrollPrev
              ? html`
                  <div
                    class="swc-PromptField-artifacts-fade swc-PromptField-artifacts-fade--start"
                    aria-hidden="true"
                  ></div>
                `
              : nothing}
            ${this._artifactCanScrollNext
              ? html`
                  <div
                    class="swc-PromptField-artifacts-fade swc-PromptField-artifacts-fade--end"
                    aria-hidden="true"
                  ></div>
                `
              : nothing}
          </div>
          ${this._artifactScrollOverflow && this._artifactCanScrollNext
            ? html`
                <button
                  type="button"
                  class="swc-PromptField-artifacts-scroll-next"
                  aria-label=${this.artifactScrollNextLabel}
                  @click=${() => this._scrollArtifactsByPage(1)}
                >
                  <swc-icon size="s" aria-hidden="true">
                    ${Chevron75Icon()}
                  </swc-icon>
                </button>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderSendButton(): TemplateResult {
    return html`
      <button
        class="swc-PromptField-send"
        ?disabled=${!this._isPopulated || this._isDisabled}
        aria-label=${this.sendLabel}
        @click=${this._handleSendClick}
      >
        <swc-icon aria-hidden="true">${ChevronUpIcon()}</swc-icon>
      </button>
    `;
  }

  private _renderStopButton(): TemplateResult {
    return html`
      <button
        class="swc-PromptField-stop"
        aria-label=${this.stopLabel}
        @click=${this._handleStopClick}
      >
        <swc-icon aria-hidden="true">${StopIcon()}</swc-icon>
      </button>
    `;
  }

  protected override render(): TemplateResult {
    const showStop = this._isLoading;
    const hasArtifacts = (this._assignedArtifactElements?.length ?? 0) > 0;

    return html`
      <div class="swc-PromptField">
        <div
          class="swc-PromptField-box${this._promptBoxKeyboardFocusRing
            ? ' swc-PromptField-box--keyboard-focus'
            : ''}"
        >
          <div
            class="swc-PromptField-input-area${hasArtifacts
              ? ' has-artifact'
              : ''}"
          >
            ${this._renderArtifact()}
            <div class="swc-PromptField-text-area">
              <span id=${this.labelId} class="swc-PromptField-label">
                ${this.label}
              </span>
              <textarea
                class="swc-PromptField-textarea"
                .value=${this.value}
                placeholder=${this.placeholder}
                aria-labelledby=${this.labelId}
                aria-label=${ifDefined(
                  this.accessibleLabel.trim().length > 0
                    ? this.accessibleLabel.trim()
                    : undefined
                )}
                aria-placeholder=${ifDefined(this.placeholder || undefined)}
                ?disabled=${this._isDisabled}
                rows=${this._normalizedMinRows}
                style=${styleMap({
                  '--swc-prompt-field-textarea-min-rows': String(
                    this._normalizedMinRows
                  ),
                  '--swc-prompt-field-textarea-max-rows': String(
                    this._normalizedMaxRows
                  ),
                })}
                @input=${this._handleInput}
                @keydown=${this._handleTextareaKeydown}
                @pointerdown=${this._handleTextareaPointerDown}
                @focusin=${this._handleTextareaFocusIn}
                @focusout=${this._handleTextareaFocusOut}
              ></textarea>
            </div>
          </div>

          <div class="swc-PromptField-action-bar">
            <div class="swc-PromptField-leading-actions">
              <button
                class="swc-PromptField-upload"
                aria-label=${this.uploadLabel}
                ?disabled=${this._isDisabled}
                @click=${this._handleUploadClick}
              >
                <swc-icon aria-hidden="true">${PlusIcon()}</swc-icon>
              </button>
            </div>

            ${showStop ? this._renderStopButton() : this._renderSendButton()}
          </div>
        </div>
        ${this._renderLegalFooter()}
      </div>
    `;
  }
}
