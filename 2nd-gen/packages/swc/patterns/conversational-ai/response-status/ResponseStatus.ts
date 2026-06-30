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

import { CSSResultArray, html, TemplateResult } from 'lit';
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

export type ResponseStatusStatus =
  | 'pending'
  | 'active'
  | 'complete'
  | 'stopped';

export type ResponseStatusStepData = {
  label: string;
  description: string;
  status: ResponseStatusStepStatus;
};

/**
 * Displays the current status of an AI response generation.
 *
 * @element swc-response-status
 * @slot label - Header row label. Falls back to the active step label.
 * @slot summary - Optional secondary summary text for lifecycle states.
 * @slot - `<swc-response-status-step>` elements.
 * @fires swc-response-status-toggle - Dispatched when the user opens or closes the panel.
 * Detail: `{ open: boolean }`
 */
export class ResponseStatus extends SpectrumElement {
  private static readonly STATUS_LABEL_CLASS =
    'swc-ResponseStatus-label swc-Body swc-Body--sizeS';

  private static readonly DEFAULT_LABELS: Record<ResponseStatusStatus, string> =
    {
      pending: 'Processing request',
      active: 'Generating response',
      complete: 'Response generated',
      stopped: 'You stopped the response',
    };

  private static readonly DEFAULT_ACCESSIBLE_LABEL = 'Execution steps';

  /**
   * Minimum time a header label stays visible before rolling to the next one.
   * Guards against labels flipping too fast when a consumer updates them in
   * rapid succession.
   */
  private static readonly LABEL_MIN_DWELL_MS = 1000;

  /** Header label roll animation duration; keep in sync with the CSS. */
  private static readonly LABEL_ROLL_DURATION_MS = 650;

  /** @internal */
  private readonly panelId = uniqueId('swc-response-status-panel');

  /** @internal */
  @state()
  private _steps: ResponseStatusStepData[] = [];

  /** @internal */
  @state()
  private _labelSlotText = '';

  /** @internal */
  @state()
  private _summarySlotText = '';

  /** @internal */
  @state()
  private _displayedLabel = '';

  /** @internal */
  @state()
  private _rollFromLabel = '';

  /** @internal */
  @state()
  private _rollActive = false;

  /** @internal */
  @state()
  private _rollEngaged = false;

  /** Whole response lifecycle status. */
  @property({ type: String, reflect: true })
  public status: 'pending' | 'active' | 'complete' | 'stopped' = 'pending';

  /** `true`: step timeline open. */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /** Accessible name for the step list panel. */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /** @internal */
  private _rollToLabel = '';
  /** @internal */
  private _labelQueue: string[] = [];
  /** @internal */
  private _lastQueuedLabel = '';
  /** @internal */
  private _processingLabelQueue = false;
  /** @internal */
  private _lastRollStartedAt = 0;
  /** @internal */
  private _labelDwellTimer: number | null = null;
  /** @internal */
  private _labelRollTimer: number | null = null;
  /** @internal */
  private _labelRollRaf: number | null = null;
  /** @internal */
  private _contentObserver?: MutationObserver;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /** @internal */
  private _handleStepChildChange = (): void => {
    this._syncSlotContent();
  };

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(
      'swc-response-status-step-change',
      this._handleStepChildChange
    );

    // Slotchange only fires when assigned nodes are added or removed, not when
    // their text mutates. Observe the light DOM so updating a slotted label's
    // text (a common consumer pattern) re-syncs and rolls the header label.
    this._contentObserver = new MutationObserver(() => {
      this._syncSlotContent();
    });
    this._contentObserver.observe(this, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  }

  protected override firstUpdated(): void {
    this._syncSlotContent();
    const initial = this._getHeaderLabel();
    this._displayedLabel = initial;
    this._lastQueuedLabel = initial;
  }

  protected override updated(): void {
    this._reconcileHeaderLabel();
  }

  public override disconnectedCallback(): void {
    this.removeEventListener(
      'swc-response-status-step-change',
      this._handleStepChildChange
    );
    this._contentObserver?.disconnect();
    this._contentObserver = undefined;
    this._clearLabelTimers();
    super.disconnectedCallback();
  }

  private _isValidStatus(status: string): status is ResponseStatusStatus {
    return (
      status === 'pending' ||
      status === 'active' ||
      status === 'complete' ||
      status === 'stopped'
    );
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
        step.description === right[index]?.description &&
        step.status === right[index]?.status
    );
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

  private _readStepDescription(element: Element): string {
    const description = this._readLightDomNamedSlotText(element, 'description');
    if (description) {
      return description;
    }

    return Array.from(element.childNodes)
      .filter(
        (node) =>
          node.nodeType === Node.TEXT_NODE ||
          (node instanceof Element && !node.getAttribute('slot'))
      )
      .map((node) => node.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
  }

  private _readShadowSlotText(slotName: string): string {
    const slot =
      this.shadowRoot?.querySelector<HTMLSlotElement>(
        `slot[name="${slotName}"]`
      ) ?? null;

    if (!slot) {
      return '';
    }

    return slot
      .assignedNodes({ flatten: true })
      .map((node) => node.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
  }

  private _readNamedSlotContent(slotName: string): string {
    return (
      this._readLightDomNamedSlotText(this, slotName) ||
      this._readShadowSlotText(slotName)
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
    const label = this._readLightDomNamedSlotText(element, 'label');
    const status =
      step.status ||
      (element.getAttribute('status') as ResponseStatusStepStatus | null) ||
      'pending';

    return {
      label,
      description: this._readStepDescription(element),
      status,
    };
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

  private _syncNamedSlots(): void {
    const labelText = this._readNamedSlotContent('label');
    const summaryText = this._readNamedSlotContent('summary');

    if (this._labelSlotText !== labelText) {
      this._labelSlotText = labelText;
    }
    if (this._summarySlotText !== summaryText) {
      this._summarySlotText = summaryText;
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
    if (!this._stepsEqual(steps, this._steps)) {
      this._steps = steps;
    }
  }

  private _handleSlotChange(event: Event): void {
    this._syncSlotContent(event.target as HTMLSlotElement);
  }

  private _handleNamedSlotChange(): void {
    this._syncNamedSlots();
  }

  private _getActiveStep(): ResponseStatusStepData | undefined {
    return (
      this._steps.find((step) => step.status === 'active') ??
      this._steps.find((step) => step.status === 'pending')
    );
  }

  private _getHeaderLabel(): string {
    if (this._labelSlotText) {
      return this._labelSlotText;
    }

    if (this.status === 'active') {
      const activeStepLabel = this._getActiveStep()?.label;
      if (activeStepLabel) {
        return activeStepLabel;
      }
    }

    if (this._summarySlotText) {
      return this._summarySlotText;
    }

    return this._isValidStatus(this.status)
      ? ResponseStatus.DEFAULT_LABELS[this.status]
      : ResponseStatus.DEFAULT_LABELS.pending;
  }

  private _clearLabelTimers(): void {
    if (this._labelDwellTimer !== null) {
      window.clearTimeout(this._labelDwellTimer);
      this._labelDwellTimer = null;
    }
    if (this._labelRollTimer !== null) {
      window.clearTimeout(this._labelRollTimer);
      this._labelRollTimer = null;
    }
    if (this._labelRollRaf !== null) {
      window.cancelAnimationFrame(this._labelRollRaf);
      this._labelRollRaf = null;
    }
  }

  private _prefersReducedMotion(): boolean {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /**
   * Queues header-label changes so each label stays visible for at least
   * {@link ResponseStatus.LABEL_MIN_DWELL_MS} before rolling to the next one.
   * Rapid consumer updates are queued and rolled through in order, so the
   * visible label may lag behind the latest state but never flips faster than
   * the dwell allows.
   */
  private _reconcileHeaderLabel(): void {
    const target = this._getHeaderLabel();
    if (target === this._lastQueuedLabel) {
      return;
    }
    this._lastQueuedLabel = target;
    this._labelQueue.push(target);
    this._processLabelQueue();
  }

  private _processLabelQueue(): void {
    if (this._processingLabelQueue || this._labelQueue.length === 0) {
      return;
    }

    const next = this._labelQueue.shift() as string;
    if (next === this._displayedLabel) {
      this._processLabelQueue();
      return;
    }

    this._processingLabelQueue = true;
    this._beginLabelRoll(next);
  }

  private _beginLabelRoll(target: string): void {
    this._lastRollStartedAt = Date.now();

    if (this._prefersReducedMotion()) {
      this._displayedLabel = target;
      this._scheduleNextLabel();
      return;
    }

    this._rollFromLabel = this._displayedLabel;
    this._rollToLabel = target;
    this._rollActive = true;
    this._rollEngaged = false;

    // Engage the transition on the next frame so it animates from the settled
    // position instead of jumping straight to the rolled state.
    this._labelRollRaf = window.requestAnimationFrame(() => {
      this._labelRollRaf = window.requestAnimationFrame(() => {
        this._labelRollRaf = null;
        this._rollEngaged = true;
      });
    });

    this._labelRollTimer = window.setTimeout(() => {
      this._labelRollTimer = null;
      this._displayedLabel = this._rollToLabel;
      this._rollActive = false;
      this._rollEngaged = false;
      this._scheduleNextLabel();
    }, ResponseStatus.LABEL_ROLL_DURATION_MS);
  }

  private _scheduleNextLabel(): void {
    const elapsed = Date.now() - this._lastRollStartedAt;
    const wait = Math.max(0, ResponseStatus.LABEL_MIN_DWELL_MS - elapsed);
    this._labelDwellTimer = window.setTimeout(() => {
      this._labelDwellTimer = null;
      this._processingLabelQueue = false;
      this._processLabelQueue();
    }, wait);
  }

  private _currentVisibleLabel(): string {
    if (this._rollActive) {
      return this._rollToLabel;
    }
    return this._displayedLabel || this._getHeaderLabel();
  }

  private _renderRollingLabel(): TemplateResult {
    const labelClass = ResponseStatus.STATUS_LABEL_CLASS;

    if (!this._rollActive) {
      return html`
        <span class="swc-ResponseStatus-headerTrailViewport">
          <span class="swc-ResponseStatus-headerTrailStrip">
            <span class="swc-ResponseStatus-headerTrailLine">
              <span class=${labelClass}>${this._currentVisibleLabel()}</span>
            </span>
          </span>
        </span>
      `;
    }

    const stripClass = this._rollEngaged
      ? 'swc-ResponseStatus-headerTrailStrip swc-ResponseStatus-headerTrailStrip--rolling'
      : 'swc-ResponseStatus-headerTrailStrip';

    return html`
      <span class="swc-ResponseStatus-headerTrailViewport">
        <span class=${stripClass}>
          <span class="swc-ResponseStatus-headerTrailLine">
            <span class=${labelClass}>${this._rollFromLabel}</span>
          </span>
          <span class="swc-ResponseStatus-headerTrailLine">
            <span class=${labelClass}>${this._rollToLabel}</span>
          </span>
        </span>
      </span>
    `;
  }

  /** @internal */
  private get _showPanel(): boolean {
    return this._steps.length > 0;
  }

  private _handleToggle(): void {
    if (!this._showPanel) {
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

  private _renderThreeDots(): TemplateResult {
    return html`
      <span class="swc-ResponseStatus-dots" aria-hidden="true">
        <span class="swc-ResponseStatus-dot"></span>
        <span class="swc-ResponseStatus-dot"></span>
        <span class="swc-ResponseStatus-dot"></span>
      </span>
    `;
  }

  private _renderChevron(open: boolean): TemplateResult {
    return html`
      <swc-icon
        class=${open
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

  private _renderLeadingIcon(): TemplateResult | string {
    if (this.status === 'complete') {
      return this._renderCheckmark();
    }

    if (this.status === 'stopped') {
      return '';
    }

    return this._renderThreeDots();
  }

  private _renderHeader(showDisclosure: boolean): TemplateResult {
    const label = this._currentVisibleLabel();
    const rowClass = [
      'swc-ResponseStatus-row',
      showDisclosure ? 'swc-ResponseStatus-row--button' : '',
      this.status === 'active' ? 'swc-ResponseStatus-row--processing' : '',
      this.status === 'stopped' ? 'swc-ResponseStatus-row--stopped' : '',
      this.status === 'complete' ? 'swc-ResponseStatus-row--complete' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const rowContent = html`
      ${this._renderLeadingIcon()}
      <span class="swc-ResponseStatus-headerTrail">
        ${this._renderRollingLabel()}
        ${showDisclosure ? this._renderChevron(this.open) : ''}
      </span>
    `;

    if (showDisclosure) {
      return html`
        <button
          class=${rowClass}
          aria-label=${label}
          aria-expanded=${this.open}
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

  private _renderStepDetail(description: string): TemplateResult | '' {
    if (!description) {
      return '';
    }

    return html`
      <p class="swc-ResponseStatus-step-detail swc-Body swc-Body--sizeXXS">
        ${description}
      </p>
    `;
  }

  private _getTimelineSteps(): ResponseStatusStepData[] {
    if (this.status === 'active' || this.status === 'stopped') {
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
                ${this._renderStepDetail(step.description)}
              </div>
            </li>
          `
        )}
      </ol>
    `;
  }

  private _renderPanel(showPanel: boolean): TemplateResult {
    const panelOpen = showPanel && this.open;
    const panelLabel =
      this.accessibleLabel || ResponseStatus.DEFAULT_ACCESSIBLE_LABEL;

    return html`
      <div
        id=${this.panelId}
        class="swc-ResponseStatus-panel ${panelOpen
          ? 'swc-ResponseStatus-panel--open'
          : ''}"
        role=${ifDefined(showPanel ? 'group' : undefined)}
        aria-label=${ifDefined(showPanel ? panelLabel : undefined)}
      >
        ${this._renderStepTimeline()}
      </div>
    `;
  }

  protected override render(): TemplateResult {
    const showPanel = this._showPanel;

    return html`
      <div class="swc-ResponseStatus swc-ResponseStatus--agentic">
        ${this._renderHeader(showPanel)} ${this._renderPanel(showPanel)}
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
          class="swc-ResponseStatus-content-slot"
          hidden
          @slotchange=${this._handleSlotChange}
        ></slot>
      </div>
    `;
  }
}
