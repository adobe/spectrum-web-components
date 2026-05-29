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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Chevron75Icon } from '@adobe/spectrum-wc/icon/elements/index.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { uniqueId } from '../../../utils/id.js';
import { CheckCircleIcon, CircleOutlineIcon } from '../utils/icons/index.js';
import {
  ResponseStatusStep,
  type ResponseStatusStepKind,
  type ResponseStatusStepStatus,
} from './response-status-step/ResponseStatusStep.js';

import styles from './response-status.css';

export type ResponseStatusPhase = 'initiating' | 'processing' | 'complete';

export type ResponseStatusStepData = {
  title: string;
  detail: string;
  kind: ResponseStatusStepKind;
  status: ResponseStatusStepStatus;
};

/**
 * Displays the current status of an AI response generation.
 *
 * **Legacy mode** — default slot text + `loading` / `open` (progress circle + reasoning).
 *
 * **Agentic mode** — one or more `<swc-response-status-step>` children; uses `phase`, rolling
 * header title, and an expandable step timeline.
 *
 * @element swc-response-status
 * @slot - Reasoning prose (legacy) or `<swc-response-status-step>` elements (agentic)
 * @fires swc-response-status-toggle - Dispatched when the user expands or collapses the panel.
 * Detail: `{ open: boolean }`
 */
export class ResponseStatus extends SpectrumElement {
  private readonly panelId = uniqueId('swc-response-status-panel');

  @state()
  private _hasReasoningContent = false;

  @state()
  private _steps: ResponseStatusStepData[] = [];

  /** Active step title last shown in the header (after roll completes). */
  @state()
  private _headerActiveTitle = '';

  @state()
  private _rollFrom = '';

  @state()
  private _rollTo = '';

  @state()
  private _rolling = false;

  /** Holds initiating copy before the first step roll when processing starts cold. */
  @state()
  private _awaitingInitiatingRoll = false;

  private _rollTimeoutId: number | null = null;

  private _initiatingDwellTimeoutId: number | null = null;

  /** Set when the component has shown `phase="initiating"` in this run. */
  private _sawInitiatingPhase = false;

  private _prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** `true`: progress circle + status label (legacy), or processing phase (agentic). */
  @property({ type: Boolean, reflect: true })
  public loading = false;

  /**
   * Agentic lifecycle phase. When unset, derived from `loading` and step children.
   */
  @property({ type: String, reflect: true })
  public phase: ResponseStatusPhase | '' = '';

  /**
   * Elapsed seconds for the complete-phase summary (`Thought for N seconds`).
   */
  @property({ type: Number, reflect: true })
  public duration = 0;

  /** Label when `phase="initiating"` (or processing with no steps yet). */
  @property({ type: String, attribute: 'initiating-label', reflect: true })
  public initiatingLabel = 'Processing request';

  /**
   * Milliseconds to show {@link initiatingLabel} before the first step title roll
   * when entering processing without a prior initiating phase.
   */
  @property({ type: Number, attribute: 'initiating-dwell-ms' })
  public initiatingDwellMs = 1000;

  /** Status row label text shown while loading / processing without an active step. */
  @property({ type: String, reflect: true })
  public loadingLabel = 'Generating response';

  /** Status row label text when complete (overrides duration summary when set explicitly). */
  @property({ type: String, reflect: true })
  public completeLabel = 'Response generated';

  /** Accessible label for the step list / reasoning group. */
  @property({ type: String, attribute: 'reasoning-label' })
  public reasoningLabel = 'Reasoning';

  /** `true`: step timeline or reasoning expanded. */
  @property({ type: Boolean, reflect: true })
  public open = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleStepChildChange = (): void => {
    this._syncSlotContent();
  };

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(
      'swc-response-status-step-change',
      this._handleStepChildChange
    );
  }

  protected override firstUpdated(): void {
    this._syncSlotContent();
  }

  private _stepsEqual(
    left: ResponseStatusStepData[],
    right: ResponseStatusStepData[]
  ): boolean {
    if (left.length !== right.length) {
      return false;
    }

    return left.every(
      (step, index) =>
        step.title === right[index]?.title &&
        step.detail === right[index]?.detail &&
        step.kind === right[index]?.kind &&
        step.status === right[index]?.status
    );
  }

  private _getActiveStepFrom(
    steps: ResponseStatusStepData[]
  ): ResponseStatusStepData | undefined {
    const active = steps.filter((step) => step.status === 'active');
    if (active.length > 0) {
      return active[active.length - 1];
    }
    return steps.find((step) => step.status === 'pending');
  }

  private _getActiveStepTitle(steps: ResponseStatusStepData[]): string {
    return this._getActiveStepFrom(steps)?.title?.trim() ?? '';
  }

  private _isStepElement(element: Element): element is ResponseStatusStep {
    return (
      element instanceof ResponseStatusStep ||
      element.localName === 'swc-response-status-step'
    );
  }

  private _readStepElement(element: Element): ResponseStatusStepData {
    const step = element as ResponseStatusStep;
    const kind =
      step.kind ||
      (element.getAttribute('kind') as ResponseStatusStepKind | null) ||
      'thinking';
    const status =
      step.status ||
      (element.getAttribute('status') as ResponseStatusStepStatus | null) ||
      'pending';

    return {
      title: (step.title || element.getAttribute('title') || '').trim(),
      detail: (step.detail || element.getAttribute('detail') || '').trim(),
      kind,
      status,
    };
  }

  private _clearRollTimeout(): void {
    if (this._rollTimeoutId !== null) {
      window.clearTimeout(this._rollTimeoutId);
      this._rollTimeoutId = null;
    }
  }

  private _clearInitiatingDwell(): void {
    if (this._initiatingDwellTimeoutId !== null) {
      window.clearTimeout(this._initiatingDwellTimeoutId);
      this._initiatingDwellTimeoutId = null;
    }
    this._awaitingInitiatingRoll = false;
  }

  private _scheduleInitiatingDwell(toLabel: string): void {
    if (this._initiatingDwellTimeoutId !== null) {
      return;
    }

    this._awaitingInitiatingRoll = true;
    this._initiatingDwellTimeoutId = window.setTimeout(() => {
      this._initiatingDwellTimeoutId = null;
      this._awaitingInitiatingRoll = false;

      if (this._effectivePhase !== 'processing' || this._rollFrom) {
        return;
      }

      this._startHeaderRoll(this.initiatingLabel, toLabel);
    }, this.initiatingDwellMs);
  }

  private _startHeaderRoll(fromLabel: string, toLabel: string): void {
    this._clearRollTimeout();
    this._rollFrom = fromLabel;
    this._rollTo = toLabel;
    this._rolling = false;

    if (this._prefersReducedMotion) {
      this._headerActiveTitle = this._getActiveStepTitle(this._steps);
      this._rollFrom = '';
      this._rollTo = '';
      return;
    }

    this._rollTimeoutId = window.setTimeout(() => {
      this._rollTimeoutId = null;
      if (this._rollFrom) {
        this._rolling = false;
        this._finishHeaderRoll();
      }
    }, 750);
  }

  private _finishHeaderRoll(): void {
    this._clearRollTimeout();
    this._rolling = false;

    const nextActiveTitle = this._getActiveStepTitle(this._steps);
    const nextLabel = this._getAgenticHeaderLabel();

    if (
      this._effectivePhase === 'processing' &&
      nextActiveTitle &&
      nextActiveTitle !== this._headerActiveTitle &&
      !this._prefersReducedMotion
    ) {
      this._startHeaderRoll(
        this._headerActiveTitle || this.initiatingLabel,
        nextLabel
      );
      return;
    }

    this._headerActiveTitle = nextActiveTitle;
    this._rollFrom = '';
    this._rollTo = '';
  }

  private _onlyDisclosureChanged(changed: PropertyValues): boolean {
    return changed.has('open') && changed.size === 1;
  }

  protected override willUpdate(_changed: PropertyValues): void {
    this._syncSlotContent();

    if (!this._isAgentic) {
      return;
    }

    if (this._onlyDisclosureChanged(_changed)) {
      return;
    }

    const phase = this._effectivePhase;
    const nextLabel = this._getAgenticHeaderLabel();

    if (phase === 'initiating') {
      this._sawInitiatingPhase = true;
      this._clearInitiatingDwell();
      this._clearRollTimeout();
      this._headerActiveTitle = '';
      this._rollFrom = '';
      this._rollTo = '';
      this._rolling = false;
      return;
    }

    if (phase !== 'processing') {
      this._sawInitiatingPhase = false;
      this._clearInitiatingDwell();
      this._clearRollTimeout();
      this._headerActiveTitle = '';
      this._rollFrom = '';
      this._rollTo = '';
      this._rolling = false;
      return;
    }

    if (this._rollFrom || this._initiatingDwellTimeoutId !== null) {
      if (this._rollFrom && nextLabel !== this._rollTo) {
        this._rollTo = nextLabel;
      }
      return;
    }

    const nextActiveTitle = this._getActiveStepTitle(this._steps);

    if (nextActiveTitle && nextActiveTitle !== this._headerActiveTitle) {
      const isFirstStepRoll = !this._headerActiveTitle;

      if (
        isFirstStepRoll &&
        !this._sawInitiatingPhase &&
        this.initiatingDwellMs > 0 &&
        !this._prefersReducedMotion
      ) {
        this._scheduleInitiatingDwell(nextLabel);
        return;
      }

      this._startHeaderRoll(
        this._headerActiveTitle || this.initiatingLabel,
        nextLabel
      );
    }
  }

  protected override updated(): void {
    if (this._rollFrom && !this._rolling && !this._prefersReducedMotion) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (this._rollFrom && !this._rolling) {
            this._rolling = true;
          }
        });
      });
    }
  }

  public override disconnectedCallback(): void {
    this._clearRollTimeout();
    this._clearInitiatingDwell();
    this.removeEventListener(
      'swc-response-status-step-change',
      this._handleStepChildChange
    );
    super.disconnectedCallback();
  }

  private _handleHeaderLabelTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget || !this._rolling) {
      return;
    }
    if (event.propertyName !== 'transform') {
      return;
    }
    this._rolling = false;
    this._finishHeaderRoll();
  }

  private _getVisibleAgenticLabel(): string {
    if (
      this._effectivePhase === 'processing' &&
      this._awaitingInitiatingRoll &&
      !this._rollFrom
    ) {
      return this.initiatingLabel;
    }

    return this._getAgenticHeaderLabel();
  }

  private _renderAgenticLabel(): TemplateResult {
    const label = this._getVisibleAgenticLabel();

    if (
      this._effectivePhase === 'processing' &&
      this._rollFrom &&
      !this._prefersReducedMotion
    ) {
      const incoming = this._rollTo || label;
      return html`
        <span class="swc-ResponseStatus-labelViewport">
          <span
            class="swc-ResponseStatus-labelStrip ${this._rolling
              ? 'swc-ResponseStatus-labelStrip--rolling'
              : ''}"
            @transitionend=${this._handleHeaderLabelTransitionEnd}
          >
            <span class="swc-ResponseStatus-labelLine swc-ResponseStatus-label">
              ${this._rollFrom}
            </span>
            <span class="swc-ResponseStatus-labelLine swc-ResponseStatus-label">
              ${incoming}
            </span>
          </span>
        </span>
      `;
    }

    return html`
      <span class="swc-ResponseStatus-label">${label}</span>
    `;
  }

  private get _isAgentic(): boolean {
    return (
      this._steps.length > 0 ||
      this.phase === 'initiating' ||
      this.phase === 'processing' ||
      this.phase === 'complete'
    );
  }

  private get _effectivePhase(): ResponseStatusPhase {
    if (
      this.phase === 'initiating' ||
      this.phase === 'processing' ||
      this.phase === 'complete'
    ) {
      return this.phase;
    }
    if (this.loading) {
      return this._steps.length > 0 ? 'processing' : 'initiating';
    }
    return 'complete';
  }

  private get _showPanel(): boolean {
    if (this._isAgentic) {
      return this._steps.length > 0;
    }
    return !this.loading && this._hasReasoningContent;
  }

  private _handleToggle(): void {
    if (!this._showPanel) {
      return;
    }
    if (!this._isAgentic && this.loading) {
      return;
    }
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('swc-response-status-toggle', {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      })
    );
  }

  private _getLegacyStatusLabel(): string {
    return this.loading ? this.loadingLabel : this.completeLabel;
  }

  private _getActiveStep(): ResponseStatusStepData | undefined {
    return this._getActiveStepFrom(this._steps);
  }

  private _getAgenticHeaderLabel(): string {
    const phase = this._effectivePhase;

    if (phase === 'initiating') {
      return this.initiatingLabel;
    }

    if (phase === 'processing') {
      return this._getActiveStep()?.title?.trim() || this.loadingLabel;
    }

    if (this.duration > 0) {
      return `Thought for ${this.duration} seconds`;
    }

    return this.completeLabel;
  }

  private _slotHasReasoningContent(slot: HTMLSlotElement | null): boolean {
    if (!slot) {
      return false;
    }
    for (const node of slot.assignedNodes({ flatten: true })) {
      if (
        node instanceof ResponseStatusStep ||
        (node instanceof Element &&
          node.localName === 'swc-response-status-step')
      ) {
        continue;
      }
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return true;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        return true;
      }
    }

    return false;
  }

  private _readSteps(slot: HTMLSlotElement | null): ResponseStatusStepData[] {
    if (!slot) {
      return [];
    }
    return slot
      .assignedElements({ flatten: true })
      .filter((element): element is ResponseStatusStep =>
        this._isStepElement(element)
      )
      .map((element) => this._readStepElement(element));
  }

  private _syncSlotContent(slot?: HTMLSlotElement): void {
    const contentSlot =
      slot ??
      this.shadowRoot?.querySelector<HTMLSlotElement>(
        '.swc-ResponseStatus-content-slot'
      ) ??
      null;

    const steps = this._readSteps(contentSlot);
    const hasReasoningContent = this._slotHasReasoningContent(contentSlot);

    if (!steps.length && !hasReasoningContent && this.open) {
      this.open = false;
    }

    if (!this._stepsEqual(steps, this._steps)) {
      this._steps = steps;
    }

    if (this._hasReasoningContent !== hasReasoningContent) {
      this._hasReasoningContent = hasReasoningContent;
    }
  }

  private _handleSlotChange(event: Event): void {
    this._syncSlotContent(event.target as HTMLSlotElement);
  }

  private _renderThreeDots(): TemplateResult {
    return html`
      <span class="swc-ResponseStatus-dots" aria-hidden="true">
        <span class="swc-ResponseStatus-dot"></span>
        <span class="swc-ResponseStatus-dot"></span>
        <span class="swc-ResponseStatus-dot"></span>
      </span>
    `;
  }

  private _renderChevron(expanded: boolean): TemplateResult {
    return html`
      <swc-icon
        class=${expanded
          ? 'swc-ResponseStatus-chevron swc-ResponseStatus-chevron--down'
          : 'swc-ResponseStatus-chevron'}
        style="--swc-icon-inline-size:10px;--swc-icon-block-size:10px;"
        aria-hidden="true"
      >
        ${Chevron75Icon()}
      </swc-icon>
    `;
  }

  private _renderCheckmark(): TemplateResult {
    return html`
      <swc-icon
        class="swc-ResponseStatus-check"
        style="--swc-icon-inline-size:20px;--swc-icon-block-size:20px;"
        aria-hidden="true"
      >
        ${CheckCircleIcon()}
      </swc-icon>
    `;
  }

  private _renderAgenticHeader(
    label: string,
    showDisclosure: boolean
  ): TemplateResult {
    const phase = this._effectivePhase;
    const expanded = this.open;
    const isComplete = phase === 'complete';
    const rowClass = [
      'swc-ResponseStatus-row',
      showDisclosure ? 'swc-ResponseStatus-row--button' : '',
      phase === 'processing' ? 'swc-ResponseStatus-row--processing' : '',
      isComplete ? 'swc-ResponseStatus-row--complete' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const rowContent = html`
      ${isComplete ? this._renderCheckmark() : this._renderThreeDots()}
      ${this._renderAgenticLabel()}
      ${showDisclosure ? this._renderChevron(expanded) : ''}
    `;

    if (showDisclosure) {
      return html`
        <button
          class=${rowClass}
          aria-label=${label}
          aria-expanded=${expanded}
          aria-controls=${this.panelId}
          @click=${this._handleToggle}
        >
          ${rowContent}
        </button>
      `;
    }

    return html`
      <div
        class=${rowClass}
        role=${ifDefined(phase === 'complete' ? undefined : 'status')}
        aria-label=${ifDefined(phase === 'complete' ? undefined : label)}
        aria-live=${ifDefined(phase === 'processing' ? 'polite' : undefined)}
      >
        ${rowContent}
      </div>
    `;
  }

  private _renderStepIcon(status: ResponseStatusStepStatus): TemplateResult {
    if (status === 'complete') {
      return html`
        <swc-icon class="swc-ResponseStatus-step-icon" aria-hidden="true">
          ${CheckCircleIcon()}
        </swc-icon>
      `;
    }

    return html`
      <swc-icon
        class="swc-ResponseStatus-step-icon swc-ResponseStatus-step-icon--${status}"
        aria-hidden="true"
      >
        ${CircleOutlineIcon()}
      </swc-icon>
    `;
  }

  private _renderStepDetail(
    kind: ResponseStatusStepKind,
    detail: string
  ): TemplateResult | string {
    if (!detail) {
      return '';
    }
    const prefix = kind === 'acting' ? 'Acting' : 'Thinking';
    return html`
      <p class="swc-ResponseStatus-step-detail">${prefix} ${detail}</p>
    `;
  }

  /**
   * During processing, only steps that have started (active or complete) appear in
   * the panel; pending steps stay in the slot but are not shown until they activate.
   */
  private _getTimelineSteps(): ResponseStatusStepData[] {
    if (this._isAgentic && this._effectivePhase === 'processing') {
      return this._steps.filter((step) => step.status !== 'pending');
    }

    return this._steps;
  }

  private _renderStepTimeline(): TemplateResult {
    const steps = this._getTimelineSteps();
    const lastIndex = steps.length - 1;

    return html`
      <ol class="swc-ResponseStatus-steps" role="list">
        ${steps.map(
          (step, index) => html`
            <li
              class="swc-ResponseStatus-step"
              data-status=${step.status}
              role="listitem"
            >
              <div class="swc-ResponseStatus-step-rail">
                ${this._renderStepIcon(step.status)}
                ${index < lastIndex
                  ? html`
                      <span
                        class="swc-ResponseStatus-step-line"
                        aria-hidden="true"
                      ></span>
                    `
                  : ''}
              </div>
              <div class="swc-ResponseStatus-step-body">
                <p class="swc-ResponseStatus-step-title">${step.title}</p>
                ${this._renderStepDetail(step.kind, step.detail)}
              </div>
            </li>
          `
        )}
      </ol>
    `;
  }

  private _renderLoadingRow(label: string): TemplateResult {
    return html`
      <div class="swc-ResponseStatus-row" role="status" aria-label=${label}>
        ${this._renderThreeDots()}
        <span class="swc-ResponseStatus-label">${label}</span>
      </div>
    `;
  }

  private _renderCompleteRow(
    label: string,
    showDisclosure: boolean
  ): TemplateResult {
    const expanded = this.open;

    if (showDisclosure) {
      return html`
        <button
          class="swc-ResponseStatus-row swc-ResponseStatus-row--button"
          aria-label=${label}
          aria-expanded=${expanded}
          aria-controls=${this.panelId}
          @click=${this._handleToggle}
        >
          ${this._renderChevron(expanded)}
          <span class="swc-ResponseStatus-label">${label}</span>
          ${this._renderCheckmark()}
        </button>
      `;
    }

    return html`
      <div class="swc-ResponseStatus-row">
        ${this._renderCheckmark()}
        <span class="swc-ResponseStatus-label">${label}</span>
      </div>
    `;
  }

  private _renderPanel(showPanel: boolean): TemplateResult {
    const panelLabel = this.reasoningLabel;
    const panelOpen = showPanel && this.open;

    return html`
      <div
        id=${this.panelId}
        class="swc-ResponseStatus-panel ${panelOpen
          ? 'swc-ResponseStatus-panel--open'
          : ''}"
        role=${ifDefined(showPanel ? 'group' : undefined)}
        aria-label=${ifDefined(showPanel ? panelLabel : undefined)}
      >
        ${this._isAgentic
          ? this._renderStepTimeline()
          : html`
              <slot
                class="swc-ResponseStatus-reasoning-slot"
                @slotchange=${this._handleSlotChange}
              ></slot>
            `}
      </div>
    `;
  }

  protected override render(): TemplateResult {
    const showPanel = this._showPanel;
    const showDisclosure = showPanel;

    if (this._isAgentic) {
      const headerLabel = this._getVisibleAgenticLabel();
      return html`
        <div class="swc-ResponseStatus swc-ResponseStatus--agentic">
          ${this._renderAgenticHeader(headerLabel, showDisclosure)}
          ${this._renderPanel(showPanel)}
          <slot
            class="swc-ResponseStatus-content-slot"
            hidden
            @slotchange=${this._handleSlotChange}
          ></slot>
        </div>
      `;
    }

    const isLoading = this.loading;
    const statusLabel = this._getLegacyStatusLabel();
    const legacyShowDisclosure = !isLoading && this._hasReasoningContent;

    return html`
      <div class="swc-ResponseStatus">
        ${isLoading
          ? this._renderLoadingRow(statusLabel)
          : this._renderCompleteRow(statusLabel, legacyShowDisclosure)}
        <div
          id=${this.panelId}
          class="swc-ResponseStatus-reasoning-panel"
          role=${ifDefined(legacyShowDisclosure ? 'group' : undefined)}
          aria-label=${ifDefined(
            legacyShowDisclosure ? this.reasoningLabel : undefined
          )}
          ?hidden=${!legacyShowDisclosure || !this.open}
        >
          <slot
            class="swc-ResponseStatus-content-slot swc-ResponseStatus-reasoning-slot"
            @slotchange=${this._handleSlotChange}
          ></slot>
        </div>
      </div>
    `;
  }
}
