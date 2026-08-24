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
import {
  property,
  queryAssignedElements,
  queryAssignedNodes,
  state,
} from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

import { Chevron75Icon } from '@adobe/spectrum-wc/icon/elements/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';
import '../pixel-loader/swc-pixel-loader.js';

import { uniqueId } from '../../../utils/id.js';
import {
  PIXEL_LOADER_PRESET_NAMES,
  type PixelLoaderPresetName,
} from '../pixel-loader/data.js';
import {
  CheckCircleIcon,
  CircleOutlineIcon,
  StepStoppedCircleIcon,
} from '../utils/icons/index.js';
import {
  RESPONSE_STATUS_STEP_STATUSES,
  ResponseStatusStep,
} from './response-status-step/ResponseStatusStep.js';

import styles from './response-status.css';

export { PIXEL_LOADER_PRESET_NAMES };

export const RESPONSE_STATUSES = ['active', 'complete', 'stopped'] as const;

export type ResponseStatusStatus = (typeof RESPONSE_STATUSES)[number];

type ResponseStatusStepStatus = (typeof RESPONSE_STATUS_STEP_STATUSES)[number];

export type ResponseStatusStepData = {
  label: string;
  description: string;
  status: ResponseStatusStepStatus;
  open: boolean;
};

/**
 * Displays the current status of an AI response generation.
 *
 * @element swc-response-status
 * @slot label - Header row label. Falls back to the active step label.
 * @slot - `<swc-response-status-step>` elements.
 * @fires swc-response-status-toggle - Dispatched when the user opens or closes the panel.
 * Detail: `{ open: boolean }`
 * @fires swc-response-status-step-toggle - Dispatched when the user expands or collapses
 * a step's description. Detail: `{ open: boolean, index: number }`
 */
export class ResponseStatus extends SpectrumElement {
  private static readonly STATUS_LABEL_CLASS =
    'swc-ResponseStatus-label swc-Body swc-Body--sizeS';

  private static readonly DEFAULT_LABELS: Record<ResponseStatusStatus, string> =
    {
      active: 'Generating response',
      complete: 'Response generated',
      stopped: 'You stopped the response',
    };

  private static readonly DEFAULT_ACCESSIBLE_LABEL = 'Execution steps';

  /** Header label roll animation duration; keep in sync with the CSS. */
  private static readonly LABEL_ROLL_DURATION_MS = 650;

  private readonly panelId = uniqueId('swc-response-status-panel');

  @state()
  private _steps: ResponseStatusStepData[] = [];

  /**
   * User-driven per-step disclosure overrides, keyed by step index. Present only
   * for steps the user has toggled; absent entries fall back to the step's
   * declared `open` (steps are collapsed by default).
   */
  @state()
  private _stepOpenOverrides = new Map<number, boolean>();

  /**
   * Indices of open steps whose description overflows its capped height. Only
   * these get a keyboard-focusable scroll region, so non-overflowing details
   * never enter the tab order.
   */
  @state()
  private _overflowingSteps = new Set<number>();

  private _detailResizeObserver: ResizeObserver | null = null;

  @state()
  private _labelSlotText = '';

  @state()
  private _displayedLabel = '';

  @state()
  private _rollFromLabel = '';

  @state()
  private _rollToLabel = '';

  @state()
  private _rollActive = false;

  @state()
  private _rollEngaged = false;

  /** Whole response lifecycle status. */
  @property({ type: String, reflect: true })
  public status: ResponseStatusStatus = 'active';

  /** `true`: step timeline open. */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /** Accessible name for the step list panel. */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /**
   * Pixel-loader icon cycle while `status="active"`. Invalid values fall back
   * to `mega`.
   */
  @property({ type: String, reflect: true })
  public preset: PixelLoaderPresetName = 'mega';

  @queryAssignedNodes({ slot: 'label', flatten: true })
  private _labelNodes!: Node[];

  @queryAssignedElements({
    selector: 'swc-response-status-step',
    flatten: true,
  })
  private _stepEls!: ResponseStatusStep[];

  private _labelRollTimer: number | null = null;

  private _labelRollRaf: number | null = null;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public constructor() {
    super();

    // Slotchange only fires when assigned nodes are added or removed, not when
    // their text mutates. Observe the light DOM so slotted text updates render.
    new MutationController(this, {
      config: {
        attributes: true,
        attributeFilter: ['slot', 'status', 'open'],
        characterData: true,
        childList: true,
        subtree: true,
      },
      callback: () => {
        this._syncSlotContent();
      },
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // Width changes reflow the description text, which can start or stop
    // overflow without any reactive state changing; re-measure on resize.
    if (typeof ResizeObserver === 'function' && !this._detailResizeObserver) {
      this._detailResizeObserver = new ResizeObserver(() => {
        this._syncDetailOverflow();
      });
      this._detailResizeObserver.observe(this);
    }

    this._syncSlotContent();
  }

  protected override willUpdate(_changed: PropertyValues<this>): void {
    this._applyLabelRoll();
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    // Re-measure when what is shown (or its open state) changes. Label-roll
    // updates do not affect overflow, so they are intentionally excluded.
    if (
      changed.has('_steps') ||
      changed.has('_stepOpenOverrides') ||
      changed.has('open')
    ) {
      this._syncDetailOverflow();
    }
  }

  public override disconnectedCallback(): void {
    this._clearLabelRollTimers();
    this._detailResizeObserver?.disconnect();
    this._detailResizeObserver = null;
    super.disconnectedCallback();
  }

  private _isValidStatus(status: string): status is ResponseStatusStatus {
    return (RESPONSE_STATUSES as readonly string[]).includes(status);
  }

  /** Validated host status; invalid runtime values fall back to `active`. */
  private get _resolvedStatus(): ResponseStatusStatus {
    return this._isValidStatus(this.status) ? this.status : 'active';
  }

  private _isValidPreset(preset: string): preset is PixelLoaderPresetName {
    return (PIXEL_LOADER_PRESET_NAMES as readonly string[]).includes(preset);
  }

  /** Validated generating preset; invalid runtime values fall back to `mega`. */
  private get _resolvedPreset(): PixelLoaderPresetName {
    return this._isValidPreset(this.preset) ? this.preset : 'mega';
  }

  private _isValidStepStatus(
    status: string
  ): status is ResponseStatusStepStatus {
    return (RESPONSE_STATUS_STEP_STATUSES as readonly string[]).includes(
      status
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
        step.status === right[index]?.status &&
        step.open === right[index]?.open
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

  private _readLabelSlotContent(): string {
    return (
      this._readNodeText(this._labelNodes ?? []) ||
      this._readLightDomNamedSlotText(this, 'label')
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
    const rawStatus = step.status || 'active';
    const status = this._isValidStepStatus(rawStatus) ? rawStatus : 'active';

    return {
      label,
      description: this._readStepDescription(element),
      status,
      open: element.hasAttribute('open'),
    };
  }

  private _readNodeText(nodes: Iterable<Node>): string {
    return Array.from(nodes)
      .map((node) => node.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
  }

  private _readSteps(): ResponseStatusStepData[] {
    const stepEls =
      this._stepEls?.length > 0
        ? this._stepEls
        : Array.from(this.children).filter(
            (element): element is ResponseStatusStep =>
              this._isStepElement(element)
          );

    return stepEls.map((element) => this._readStepElement(element));
  }

  private _syncNamedSlots(): void {
    const labelText = this._readLabelSlotContent();

    if (this._labelSlotText !== labelText) {
      this._labelSlotText = labelText;
    }
  }

  private _syncSlotContent(): void {
    this._syncNamedSlots();

    const steps = this._readSteps();
    if (!this._stepsEqual(steps, this._steps)) {
      this._steps = steps;
    }
  }

  private _handleSlotChange(): void {
    this._syncSlotContent();
  }

  private _handleNamedSlotChange(): void {
    this._syncNamedSlots();
  }

  private _getActiveStep(): ResponseStatusStepData | undefined {
    return this._steps.find((step) => step.status === 'active');
  }

  private _getHeaderLabel(): string {
    if (this._labelSlotText) {
      return this._labelSlotText;
    }

    const status = this._resolvedStatus;

    if (status === 'active') {
      const activeStepLabel = this._getActiveStep()?.label;
      if (activeStepLabel) {
        return activeStepLabel;
      }
    }

    return ResponseStatus.DEFAULT_LABELS[status];
  }

  private _clearLabelRollTimers(): void {
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

  // Rolls the header label when its derived text changes. Cadence is
  // consumer-managed; this only animates each transition.
  private _applyLabelRoll(): void {
    const target = this._getHeaderLabel();

    if (!this._displayedLabel) {
      this._displayedLabel = target;
      return;
    }

    if (this._rollActive) {
      if (target === this._rollToLabel) {
        return;
      }
      this._clearLabelRollTimers();
      this._displayedLabel = this._rollToLabel;
      this._rollActive = false;
      this._rollEngaged = false;
    }

    if (target === this._displayedLabel) {
      return;
    }

    this._beginLabelRoll(target);
  }

  private _beginLabelRoll(target: string): void {
    if (this._prefersReducedMotion()) {
      this._displayedLabel = target;
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
        this._labelRollTimer = window.setTimeout(() => {
          this._labelRollTimer = null;
          this._displayedLabel = this._rollToLabel;
          this._rollActive = false;
          this._rollEngaged = false;
          this._applyLabelRoll();
        }, ResponseStatus.LABEL_ROLL_DURATION_MS);
      });
    });
  }

  private _currentVisibleLabel(): string {
    if (this._rollActive) {
      return this._rollToLabel;
    }
    return this._displayedLabel || this._getHeaderLabel();
  }

  private _renderLabel(showDisclosure: boolean, open: boolean): TemplateResult {
    const labelClass = ResponseStatus.STATUS_LABEL_CLASS;
    const chevron = showDisclosure ? this._renderChevron(open) : '';

    if (!this._rollActive) {
      return html`
        <span class="swc-ResponseStatus-headerTrailViewport">
          <span class="swc-ResponseStatus-headerTrailStrip">
            <span class="swc-ResponseStatus-headerTrailLine">
              <span class=${labelClass}>${this._currentVisibleLabel()}</span>
              ${chevron}
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
          <span class="swc-ResponseStatus-headerTrailLine" aria-hidden="true">
            <span class=${labelClass}>${this._rollFromLabel}</span>
            ${chevron}
          </span>
          <span class="swc-ResponseStatus-headerTrailLine">
            <span class=${labelClass}>${this._rollToLabel}</span>
            ${chevron}
          </span>
        </span>
      </span>
    `;
  }

  private get _showPanel(): boolean {
    return this._steps.length > 0;
  }

  private _emitToggle<T>(type: string, detail: T): void {
    this.dispatchEvent(
      new CustomEvent<T>(type, { bubbles: true, composed: true, detail })
    );
  }

  private _handleToggle(): void {
    if (!this._showPanel) {
      return;
    }

    this.open = !this.open;
    this._emitToggle('swc-response-status-toggle', { open: this.open });
  }

  // Resolved disclosure state for a step: a user override wins; otherwise the
  // step is open only when it declares `open`. Steps start collapsed.
  private _isStepOpen(step: ResponseStatusStepData, index: number): boolean {
    const override = this._stepOpenOverrides.get(index);
    if (override !== undefined) {
      return override;
    }

    return step.open;
  }

  private _setsEqual(left: Set<number>, right: Set<number>): boolean {
    if (left.size !== right.size) {
      return false;
    }
    for (const value of left) {
      if (!right.has(value)) {
        return false;
      }
    }
    return true;
  }

  // Measures which open step descriptions overflow their capped height so only
  // those expose a focusable scroll region (see `_overflowingSteps`).
  private _syncDetailOverflow(): void {
    if (!this.open) {
      if (this._overflowingSteps.size > 0) {
        this._overflowingSteps = new Set();
      }
      return;
    }

    const scrollRegions = this.shadowRoot?.querySelectorAll<HTMLElement>(
      '.swc-ResponseStatus-step-detailScroll'
    );

    const next = new Set<number>();
    scrollRegions?.forEach((region) => {
      const index = Number(region.dataset.stepIndex);
      const step = this._steps[index];
      if (Number.isNaN(index) || !step || !this._isStepOpen(step, index)) {
        return;
      }
      if (region.scrollHeight - region.clientHeight > 1) {
        next.add(index);
      }
    });

    if (!this._setsEqual(next, this._overflowingSteps)) {
      this._overflowingSteps = next;
    }
  }

  private _handleStepToggle(event: Event): void {
    const button = event.currentTarget as HTMLElement;
    const index = Number(button.dataset.index);
    const step = this._steps[index];
    if (Number.isNaN(index) || !step) {
      return;
    }

    const next = !this._isStepOpen(step, index);
    const overrides = new Map(this._stepOpenOverrides);
    overrides.set(index, next);
    this._stepOpenOverrides = overrides;

    this._emitToggle('swc-response-status-step-toggle', { open: next, index });
  }

  private _renderLoader(): TemplateResult {
    return html`
      <swc-pixel-loader
        class="swc-ResponseStatus-loader"
        preset=${this._resolvedPreset}
        aria-hidden="true"
      ></swc-pixel-loader>
    `;
  }

  private _renderChevron(
    open: boolean,
    baseClass = 'swc-ResponseStatus-chevron'
  ): TemplateResult {
    return html`
      <swc-icon
        class=${open ? `${baseClass} ${baseClass}--down` : baseClass}
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
    const status = this._resolvedStatus;

    if (status === 'complete') {
      return this._renderCheckmark();
    }

    if (status === 'stopped') {
      return '';
    }

    return this._renderLoader();
  }

  private _renderHeader(showDisclosure: boolean): TemplateResult {
    const label = this._currentVisibleLabel();
    const status = this._resolvedStatus;
    const statusRole =
      !showDisclosure && status === 'active' ? 'status' : undefined;
    const rowClass = [
      'swc-ResponseStatus-row',
      showDisclosure ? 'swc-ResponseStatus-row--button' : '',
      status === 'active' ? 'swc-ResponseStatus-row--processing' : '',
      status === 'stopped' ? 'swc-ResponseStatus-row--stopped' : '',
      status === 'complete' ? 'swc-ResponseStatus-row--complete' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const rowContent = html`
      ${this._renderLeadingIcon()}
      <span class="swc-ResponseStatus-headerTrail">
        ${this._renderLabel(showDisclosure, this.open)}
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
      <div class=${rowClass} role=${ifDefined(statusRole)}>${rowContent}</div>
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

  private _renderStepBody(
    step: ResponseStatusStepData,
    index: number
  ): TemplateResult {
    // Steps without a description have nothing to disclose; render a plain title.
    if (!step.description) {
      return html`
        <div class="swc-ResponseStatus-step-body">
          <p class="swc-ResponseStatus-step-title swc-Detail swc-Detail--sizeS">
            ${step.label}
          </p>
        </div>
      `;
    }

    const open = this._isStepOpen(step, index);
    const detailId = `swc-response-status-detail-${index}`;

    return html`
      <div class="swc-ResponseStatus-step-body">
        <button
          class="swc-ResponseStatus-step-toggle"
          data-index=${index}
          aria-expanded=${open}
          aria-controls=${detailId}
          @click=${this._handleStepToggle}
        >
          <span
            class="swc-ResponseStatus-step-title swc-Detail swc-Detail--sizeS"
          >
            ${step.label}
          </span>
          ${this._renderChevron(open, 'swc-ResponseStatus-step-chevron')}
        </button>
        <div
          id=${detailId}
          class="swc-ResponseStatus-step-detailPanel ${open
            ? 'swc-ResponseStatus-step-detailPanel--open'
            : ''}"
        >
          <div class="swc-ResponseStatus-step-detailClip">
            <div
              class="swc-ResponseStatus-step-detailScroll"
              data-step-index=${index}
              tabindex=${ifDefined(
                this._overflowingSteps.has(index) ? '0' : undefined
              )}
            >
              ${this._renderStepDetail(step.description)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderStepTimeline(): TemplateResult {
    const steps = this._steps;
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
              ${this._renderStepBody(step, index)}
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
          class="swc-ResponseStatus-content-slot"
          hidden
          @slotchange=${this._handleSlotChange}
        ></slot>
      </div>
    `;
  }
}
