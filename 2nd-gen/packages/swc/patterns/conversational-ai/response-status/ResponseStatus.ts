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
import {
  CheckCircleIcon,
  CircleOutlineIcon,
  StepStoppedCircleIcon,
} from '../utils/icons/index.js';
import {
  ResponseStatusStep,
  type ResponseStatusStepStatus,
} from './response-status-step/ResponseStatusStep.js';

import styles from './response-status.css';

export type ResponseStatusPhase =
  | 'initiating'
  | 'processing'
  | 'stopped'
  | 'complete';

export type ResponseStatusStepData = {
  label: string;
  detail: string;
  status: ResponseStatusStepStatus;
};

/**
 * Displays the current status of an AI response generation.
 *
 * **Legacy mode** — default slot text + `loading` / `open` (progress circle + reasoning).
 *
 * **Agentic mode** — one or more `<swc-response-status-step>` children; uses `phase`, rolling
 * header label, and an expandable step timeline.
 *
 * @element swc-response-status
 * @slot label - Header row label (optional; during processing, falls back to the active step label)
 * @slot summary - Initiating summary before the first step label roll (`Processing request` by default)
 * @slot reasoning-label - Accessible name for the step list / reasoning panel (`Reasoning` by default)
 * @slot - Reasoning prose (legacy) or `<swc-response-status-step>` elements (agentic)
 * @fires swc-response-status-toggle - Dispatched when the user expands or collapses the panel.
 * Detail: `{ open: boolean }`
 */
export class ResponseStatus extends SpectrumElement {
  private static readonly STATUS_LABEL_CLASS =
    'swc-ResponseStatus-label swc-Body swc-Body--sizeS';

  private static readonly DEFAULT_SUMMARY = 'Processing request';

  private static readonly DEFAULT_LOADING_LABEL = 'Generating response';

  private static readonly DEFAULT_COMPLETE_LABEL = 'Response generated';

  private static readonly DEFAULT_REASONING_LABEL = 'Reasoning';

  private static readonly DEFAULT_STOPPED_LABEL = 'You stopped the response';

  private static readonly PROCESSING_ANNOUNCEMENT = 'Response processing';

  private static readonly COMPLETE_ANNOUNCEMENT = 'Response complete';

  private static readonly INITIATING_DWELL_MS = 1000;

  private readonly panelId = uniqueId('swc-response-status-panel');

  @state()
  private _hasReasoningContent = false;

  @state()
  private _steps: ResponseStatusStepData[] = [];

  @state()
  private _labelSlotText = '';

  @state()
  private _summarySlotText = '';

  @state()
  private _reasoningLabelSlotText = '';

  /** Active step label last shown in the header (after roll completes). */
  @state()
  private _headerActiveLabel = '';

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

  /** `true`: step timeline or reasoning expanded. */
  @property({ type: Boolean, reflect: true })
  public open = false;

  @state()
  private _liveAnnouncement = '';

  private _lifecycleKey:
    | ResponseStatusPhase
    | 'legacy-loading'
    | 'legacy-idle'
    | '' = '';

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
        step.label === right[index]?.label &&
        step.detail === right[index]?.detail &&
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

  private _getActiveStepLabel(steps: ResponseStatusStepData[]): string {
    return this._getActiveStepFrom(steps)?.label?.trim() ?? '';
  }

  private _readLightDomNamedSlotText(host: Element, slotName: string): string {
    return Array.from(host.children)
      .filter(
        (child): child is HTMLElement =>
          child instanceof HTMLElement &&
          child.getAttribute('slot') === slotName
      )
      .map((element) => element.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
  }

  private _readLightDomDefaultSlotText(host: Element): string {
    const parts: string[] = [];
    for (const child of host.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent?.trim();
        if (text) {
          parts.push(text);
        }
        continue;
      }
      if (child instanceof Element && !child.getAttribute('slot')) {
        const text = child.textContent?.trim();
        if (text) {
          parts.push(text);
        }
      }
    }
    return parts.join(' ');
  }

  private _readShadowSlotText(slot: HTMLSlotElement | null): string {
    if (!slot) {
      return '';
    }
    return slot
      .assignedNodes({ flatten: true })
      .map((node) => node.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
  }

  private _getInitiatingSummary(): string {
    return this._summarySlotText || ResponseStatus.DEFAULT_SUMMARY;
  }

  private _getReasoningPanelLabel(): string {
    return (
      this._reasoningLabelSlotText || ResponseStatus.DEFAULT_REASONING_LABEL
    );
  }

  private _isStepElement(element: Element): element is ResponseStatusStep {
    return (
      element instanceof ResponseStatusStep ||
      element.localName === 'swc-response-status-step'
    );
  }

  private _readStepElement(element: Element): ResponseStatusStepData {
    const step = element as ResponseStatusStep;
    const status =
      step.status ||
      (element.getAttribute('status') as ResponseStatusStepStatus | null) ||
      'pending';

    const labelFromSlot = this._readLightDomNamedSlotText(element, 'label');
    const detailFromSlot = this._readLightDomDefaultSlotText(element);

    return {
      label: (
        labelFromSlot ||
        step.title ||
        element.getAttribute('title') ||
        element.getAttribute('label') ||
        ''
      ).trim(),
      detail: (
        detailFromSlot ||
        step.detail ||
        element.getAttribute('detail') ||
        ''
      ).trim(),
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

      this._startHeaderRoll(this._getInitiatingSummary(), toLabel);
    }, ResponseStatus.INITIATING_DWELL_MS);
  }

  private _startHeaderRoll(fromLabel: string, toLabel: string): void {
    this._clearRollTimeout();
    this._rollFrom = fromLabel;
    this._rollTo = toLabel;
    this._rolling = false;

    if (this._prefersReducedMotion) {
      this._headerActiveLabel = this._getActiveStepLabel(this._steps);
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

    const nextActiveLabel = this._getActiveStepLabel(this._steps);
    const nextLabel = this._getAgenticHeaderLabel();

    if (
      this._effectivePhase === 'processing' &&
      nextActiveLabel &&
      nextActiveLabel !== this._headerActiveLabel &&
      !this._prefersReducedMotion
    ) {
      this._startHeaderRoll(
        this._headerActiveLabel || this._getInitiatingSummary(),
        nextLabel
      );
      return;
    }

    this._headerActiveLabel = nextActiveLabel;
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
      this._headerActiveLabel = '';
      this._rollFrom = '';
      this._rollTo = '';
      this._rolling = false;
      return;
    }

    if (phase !== 'processing') {
      this._sawInitiatingPhase = false;
      this._clearInitiatingDwell();
      this._clearRollTimeout();
      this._headerActiveLabel = '';
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

    const nextActiveLabel = this._getActiveStepLabel(this._steps);

    if (nextActiveLabel && nextActiveLabel !== this._headerActiveLabel) {
      const isFirstStepRoll = !this._headerActiveLabel;

      if (
        isFirstStepRoll &&
        !this._sawInitiatingPhase &&
        !this._prefersReducedMotion
      ) {
        this._scheduleInitiatingDwell(nextLabel);
        return;
      }

      this._startHeaderRoll(
        this._headerActiveLabel || this._getInitiatingSummary(),
        nextLabel
      );
    }
  }

  protected override updated(_changed: PropertyValues): void {
    if (this._rollFrom && !this._rolling && !this._prefersReducedMotion) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (this._rollFrom && !this._rolling) {
            this._rolling = true;
          }
        });
      });
    }

    this._syncGenerationAnnouncements();
  }

  public override disconnectedCallback(): void {
    this._clearRollTimeout();
    this._clearInitiatingDwell();
    this._lifecycleKey = '';
    this.removeEventListener(
      'swc-response-status-step-change',
      this._handleStepChildChange
    );
    super.disconnectedCallback();
  }

  private _getLifecycleKey():
    | ResponseStatusPhase
    | 'legacy-loading'
    | 'legacy-idle' {
    if (this._isAgentic) {
      return this._effectivePhase;
    }
    return this.loading ? 'legacy-loading' : 'legacy-idle';
  }

  private _isActiveGenerationKey(
    key: ResponseStatusPhase | 'legacy-loading' | 'legacy-idle' | ''
  ): boolean {
    return (
      key === 'initiating' ||
      key === 'processing' ||
      key === 'stopped' ||
      key === 'legacy-loading'
    );
  }

  private _syncGenerationAnnouncements(): void {
    const key = this._getLifecycleKey();
    const prev = this._lifecycleKey;

    if (
      this._isActiveGenerationKey(key) &&
      !this._isActiveGenerationKey(prev)
    ) {
      this._queueLiveAnnouncement(ResponseStatus.PROCESSING_ANNOUNCEMENT);
    } else if (
      (key === 'complete' && this._isActiveGenerationKey(prev)) ||
      (key === 'legacy-idle' && prev === 'legacy-loading')
    ) {
      this._queueLiveAnnouncement(ResponseStatus.COMPLETE_ANNOUNCEMENT);
    }

    this._lifecycleKey = key;
  }

  private _queueLiveAnnouncement(message: string): void {
    this._liveAnnouncement = '';
    requestAnimationFrame(() => {
      this._liveAnnouncement = message;
    });
  }

  private _getAgenticHeaderAriaLabel(phase: ResponseStatusPhase): string {
    if (phase === 'complete') {
      return this._getVisibleAgenticLabel();
    }
    if (phase === 'stopped') {
      return this._labelSlotText || ResponseStatus.DEFAULT_STOPPED_LABEL;
    }
    return ResponseStatus.PROCESSING_ANNOUNCEMENT;
  }

  private _renderLiveAnnouncer(): TemplateResult {
    return html`
      <div
        class="swc-ResponseStatus-liveAnnouncer"
        aria-live="polite"
        aria-atomic="true"
      >
        ${this._liveAnnouncement}
      </div>
    `;
  }

  private _renderAgenticLabelText(
    text: string,
    hideFromAccessibility = false
  ): TemplateResult {
    if (hideFromAccessibility) {
      return html`
        <span class=${ResponseStatus.STATUS_LABEL_CLASS} aria-hidden="true">
          ${text}
        </span>
      `;
    }

    return html`
      <span class=${ResponseStatus.STATUS_LABEL_CLASS}>${text}</span>
    `;
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
      return this._getInitiatingSummary();
    }

    return this._getAgenticHeaderLabel();
  }

  /**
   * Label and disclosure chevron share one animated trail so title transitions
   * fade/slide them together instead of moving the label alone.
   */
  private _renderAgenticHeaderTrail(
    expanded: boolean,
    showDisclosure: boolean
  ): TemplateResult {
    const phase = this._effectivePhase;
    const label = this._getVisibleAgenticLabel();
    const chevron = showDisclosure ? this._renderChevron(expanded) : null;
    const hideVisualLabel =
      phase === 'initiating' || phase === 'processing' || phase === 'stopped';

    if (
      phase === 'processing' &&
      this._rollFrom &&
      !this._prefersReducedMotion
    ) {
      const incoming = this._rollTo || label;
      return html`
        <span class="swc-ResponseStatus-headerTrailViewport">
          <span
            class="swc-ResponseStatus-headerTrailStrip ${this._rolling
              ? 'swc-ResponseStatus-headerTrailStrip--rolling'
              : ''}"
            @transitionend=${this._handleHeaderLabelTransitionEnd}
          >
            <span class="swc-ResponseStatus-headerTrailLine">
              ${this._renderAgenticLabelText(this._rollFrom, hideVisualLabel)}
              ${chevron}
            </span>
            <span class="swc-ResponseStatus-headerTrailLine">
              ${this._renderAgenticLabelText(incoming, hideVisualLabel)}
              ${chevron}
            </span>
          </span>
        </span>
      `;
    }

    if (showDisclosure) {
      return html`
        <span class="swc-ResponseStatus-headerTrail">
          ${this._renderAgenticLabelText(label, hideVisualLabel)} ${chevron}
        </span>
      `;
    }

    return this._renderAgenticLabelText(label, hideVisualLabel);
  }

  private get _isAgentic(): boolean {
    return (
      this._steps.length > 0 ||
      this.phase === 'initiating' ||
      this.phase === 'processing' ||
      this.phase === 'stopped' ||
      this.phase === 'complete'
    );
  }

  private get _effectivePhase(): ResponseStatusPhase {
    if (
      this.phase === 'initiating' ||
      this.phase === 'processing' ||
      this.phase === 'stopped' ||
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
    if (this._labelSlotText) {
      return this._labelSlotText;
    }
    return this.loading
      ? ResponseStatus.DEFAULT_LOADING_LABEL
      : ResponseStatus.DEFAULT_COMPLETE_LABEL;
  }

  private _getActiveStep(): ResponseStatusStepData | undefined {
    return this._getActiveStepFrom(this._steps);
  }

  private _getAgenticHeaderLabel(): string {
    const phase = this._effectivePhase;

    if (phase === 'initiating') {
      return this._getInitiatingSummary();
    }

    if (phase === 'processing') {
      return (
        this._labelSlotText ||
        this._getActiveStep()?.label?.trim() ||
        ResponseStatus.DEFAULT_LOADING_LABEL
      );
    }

    if (phase === 'stopped') {
      return this._labelSlotText || ResponseStatus.DEFAULT_STOPPED_LABEL;
    }

    if (this._labelSlotText) {
      return this._labelSlotText;
    }

    if (this.duration > 0) {
      return `Thought for ${this.duration} seconds`;
    }

    return ResponseStatus.DEFAULT_COMPLETE_LABEL;
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

  private _readNamedSlotContent(slotName: string): string {
    const fromLightDom = this._readLightDomNamedSlotText(this, slotName);
    if (fromLightDom) {
      return fromLightDom;
    }
    const slot =
      this.shadowRoot?.querySelector<HTMLSlotElement>(
        `slot[name="${slotName}"]`
      ) ?? null;
    return this._readShadowSlotText(slot);
  }

  private _syncNamedSlots(): void {
    const labelText = this._readNamedSlotContent('label');
    const summaryText = this._readNamedSlotContent('summary');
    const reasoningLabelText = this._readNamedSlotContent('reasoning-label');

    if (this._labelSlotText !== labelText) {
      this._labelSlotText = labelText;
    }
    if (this._summarySlotText !== summaryText) {
      this._summarySlotText = summaryText;
    }
    if (this._reasoningLabelSlotText !== reasoningLabelText) {
      this._reasoningLabelSlotText = reasoningLabelText;
    }
  }

  private _syncSlotContent(slot?: HTMLSlotElement): void {
    this._syncNamedSlots();

    const contentSlot =
      slot ??
      this.shadowRoot?.querySelector<HTMLSlotElement>(
        '.swc-ResponseStatus-content-slot'
      ) ??
      null;

    const steps = this._readSteps(contentSlot);
    const hasReasoningContent = this._slotHasReasoningContent(contentSlot);
    const isAgenticContext =
      this.phase === 'initiating' ||
      this.phase === 'processing' ||
      this.phase === 'stopped' ||
      this.phase === 'complete' ||
      steps.length > 0;

    // Legacy mode only: collapse when there is nothing to show. Agentic stories often
    // set `open` before step children finish assigning; do not clear in that case.
    if (
      !isAgenticContext &&
      !steps.length &&
      !hasReasoningContent &&
      this.open
    ) {
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

  private _handleNamedSlotChange(): void {
    this._syncNamedSlots();
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

  private _renderAgenticHeader(showDisclosure: boolean): TemplateResult {
    const phase = this._effectivePhase;
    const expanded = this.open;
    const isComplete = phase === 'complete';
    const isStopped = phase === 'stopped';
    const headerAriaLabel = this._getAgenticHeaderAriaLabel(phase);
    const rowClass = [
      'swc-ResponseStatus-row',
      showDisclosure ? 'swc-ResponseStatus-row--button' : '',
      phase === 'processing' ? 'swc-ResponseStatus-row--processing' : '',
      isStopped ? 'swc-ResponseStatus-row--stopped' : '',
      isComplete ? 'swc-ResponseStatus-row--complete' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const leadingIcon = isComplete
      ? this._renderCheckmark()
      : this._renderThreeDots();

    const rowContent = html`
      ${leadingIcon} ${this._renderAgenticHeaderTrail(expanded, showDisclosure)}
    `;

    if (showDisclosure) {
      return html`
        <button
          class=${rowClass}
          aria-label=${headerAriaLabel}
          aria-expanded=${expanded}
          aria-controls=${this.panelId}
          @click=${this._handleToggle}
        >
          ${rowContent}
        </button>
      `;
    }

    return html`
      <div class=${rowClass}>${rowContent}</div>
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

    if (status === 'stopped') {
      return html`
        <swc-icon
          class="swc-ResponseStatus-step-icon swc-ResponseStatus-step-icon--stopped"
          aria-hidden="true"
        >
          ${StepStoppedCircleIcon()}
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

  private _renderStepDetail(detail: string): TemplateResult | string {
    if (!detail) {
      return '';
    }
    return html`
      <p class="swc-ResponseStatus-step-detail swc-Body swc-Body--sizeXXS">
        ${detail}
      </p>
    `;
  }

  /**
   * During processing or after stop, only steps that have started appear in the panel;
   * pending steps stay in the slot but are not shown until they activate.
   */
  private _getTimelineSteps(): ResponseStatusStepData[] {
    const phase = this._effectivePhase;
    if (this._isAgentic && (phase === 'processing' || phase === 'stopped')) {
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
                <p
                  class="swc-ResponseStatus-step-title swc-Detail swc-Detail--sizeS"
                >
                  ${step.label}
                </p>
                ${this._renderStepDetail(step.detail)}
              </div>
            </li>
          `
        )}
      </ol>
    `;
  }

  private _renderLoadingRow(label: string): TemplateResult {
    return html`
      <div class="swc-ResponseStatus-row">
        ${this._renderThreeDots()}
        <span class=${ResponseStatus.STATUS_LABEL_CLASS} aria-hidden="true">
          ${label}
        </span>
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
          <span class=${ResponseStatus.STATUS_LABEL_CLASS}>${label}</span>
          ${this._renderCheckmark()}
        </button>
      `;
    }

    return html`
      <div class="swc-ResponseStatus-row">
        ${this._renderCheckmark()}
        <span class=${ResponseStatus.STATUS_LABEL_CLASS}>${label}</span>
      </div>
    `;
  }

  private _renderPanel(showPanel: boolean): TemplateResult {
    const panelLabel = this._getReasoningPanelLabel();
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
      return html`
        <div class="swc-ResponseStatus swc-ResponseStatus--agentic">
          ${this._renderLiveAnnouncer()}
          ${this._renderAgenticHeader(showDisclosure)}
          ${this._renderPanel(showPanel)}
          <slot
            name="label"
            hidden
            @slotchange=${this._handleNamedSlotChange}
          ></slot>
          <slot
            name="summary"
            hidden
            @slotchange=${this._handleNamedSlotChange}
          ></slot>
          <slot
            name="reasoning-label"
            hidden
            @slotchange=${this._handleNamedSlotChange}
          ></slot>
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
        ${this._renderLiveAnnouncer()}
        ${isLoading
          ? this._renderLoadingRow(statusLabel)
          : this._renderCompleteRow(statusLabel, legacyShowDisclosure)}
        <div
          id=${this.panelId}
          class="swc-ResponseStatus-reasoning-panel"
          role=${ifDefined(legacyShowDisclosure ? 'group' : undefined)}
          aria-label=${ifDefined(
            legacyShowDisclosure ? this._getReasoningPanelLabel() : undefined
          )}
          ?hidden=${!legacyShowDisclosure || !this.open}
        >
          <slot
            class="swc-ResponseStatus-content-slot swc-ResponseStatus-reasoning-slot"
            @slotchange=${this._handleSlotChange}
          ></slot>
        </div>
        <slot
          name="label"
          hidden
          @slotchange=${this._handleNamedSlotChange}
        ></slot>
        <slot
          name="reasoning-label"
          hidden
          @slotchange=${this._handleNamedSlotChange}
        ></slot>
      </div>
    `;
  }
}
