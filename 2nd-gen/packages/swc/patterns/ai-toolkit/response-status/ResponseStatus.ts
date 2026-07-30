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

import {
  CSSResultArray,
  html,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import {
  property,
  queryAssignedElements,
  queryAssignedNodes,
  state,
} from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';
import '../../../components/ui-icons/swc-ui-icon.js';
import '../pixel-loader/swc-pixel-loader.js';

import { uniqueId } from '../../../utils/id.js';
import {
  PIXEL_LOADER_ICON_NAMES,
  PIXEL_LOADER_PRESET_NAMES,
  type PixelLoaderIconName,
  type PixelLoaderPresetName,
} from '../pixel-loader/data.js';
import { CheckCircleIcon } from '../utils/icons/index.js';
import {
  RESPONSE_STATUS_STEP_STATUSES,
  ResponseStatusStep,
  type ResponseStatusStepStatus,
} from './response-status-step/ResponseStatusStep.js';

import styles from './response-status.css';

export { PIXEL_LOADER_ICON_NAMES, PIXEL_LOADER_PRESET_NAMES };

export const RESPONSE_STATUSES = ['active', 'complete', 'stopped'] as const;

export type ResponseStatusStatus = (typeof RESPONSE_STATUSES)[number];

/**
 * Displays the current status of an AI response generation.
 *
 * @element swc-response-status
 * @slot label - Header row label. Falls back to the active step label while
 * the step timeline is closed, or a generic "Processing…" label while it's
 * open with at least one incomplete step.
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

  /**
   * Header label shown in place of the active step label while the step
   * timeline is open, since the specific step is already visible below.
   */
  private static readonly ACTIVE_STEP_OPEN_LABEL = 'Processing…';

  private static readonly DEFAULT_ACCESSIBLE_LABEL = 'Execution steps';

  /**
   * Header label cross-fade duration; matches the enter transition (the
   * longer of the enter/exit pair) since JS waits for the full visual
   * transition to finish before settling. Keep in sync with the CSS.
   */
  private static readonly LABEL_ROLL_DURATION_MS = 350;

  private readonly panelId = uniqueId('swc-response-status-panel');

  /** Whether at least one `<swc-response-status-step>` is currently slotted. */
  @state()
  private _hasSteps = false;

  /** Whether any slotted step currently has `status="active"`. */
  @state()
  private _hasActiveStep = false;

  /**
   * The active step's own label text, kept in sync via the step's
   * `swc-response-status-step-active-label-change` event (for streamed text)
   * and re-read on demand whenever the active step itself changes. This
   * element never reads a step's slotted content directly.
   */
  @state()
  private _activeStepLabel = '';

  /** The step currently identified as active, if any. */
  private _activeStepEl: ResponseStatusStep | null = null;

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
   * Status loader artwork shown while `status="active"`, matching
   * `swc-prompt-field`'s `loader` attribute for the same underlying control:
   * a preset name (`cc`, `dc`, `exp`, `analyze`, `mega`) cycles a themed icon
   * sequence; an icon name shows a single static icon. Invalid values fall
   * back to the `mega` preset.
   */
  @property({ type: String, reflect: true })
  public loader: PixelLoaderIconName | PixelLoaderPresetName = 'mega';

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

    // Watches only for step add/remove and each step's own `status`
    // attribute — never step text content, which each step now tracks and
    // reports on its own via events. `subtree: true` is required for the
    // attribute filter to reach into children at all, which also means the
    // host's own `status` attribute (reflected from the `status` property)
    // matches; records targeting the host itself are filtered out below to
    // avoid a redundant re-scan of something Lit's reactivity already handles.
    new MutationController(this, {
      config: {
        attributes: true,
        attributeFilter: ['status'],
        childList: true,
        subtree: true,
      },
      callback: (records) => {
        const isStepMutation = records.some((record) => record.target !== this);
        if (isStepMutation) {
          this._syncStepsMeta();
        }
      },
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._syncStepsMeta();
  }

  protected override willUpdate(_changed: PropertyValues<this>): void {
    this._applyLabelRoll();
  }

  public override disconnectedCallback(): void {
    this._clearLabelRollTimers();
    super.disconnectedCallback();
  }

  private _isValidStatus(status: string): status is ResponseStatusStatus {
    return (RESPONSE_STATUSES as readonly string[]).includes(status);
  }

  /** Validated host status; invalid runtime values fall back to `active`. */
  private get _resolvedStatus(): ResponseStatusStatus {
    return this._isValidStatus(this.status) ? this.status : 'active';
  }

  private _isValidPreset(value: string): value is PixelLoaderPresetName {
    return (PIXEL_LOADER_PRESET_NAMES as readonly string[]).includes(value);
  }

  private _isValidIcon(value: string): value is PixelLoaderIconName {
    return (PIXEL_LOADER_ICON_NAMES as readonly string[]).includes(value);
  }

  /**
   * Routes `loader` to the pixel-loader's `preset` (a themed icon-cycle) or
   * `icon` (a single static icon); invalid runtime values fall back to the
   * `mega` preset.
   */
  private get _resolvedLoader(): {
    preset: PixelLoaderPresetName | undefined;
    icon: PixelLoaderIconName | undefined;
  } {
    if (this._isValidPreset(this.loader)) {
      return { preset: this.loader, icon: undefined };
    }
    if (this._isValidIcon(this.loader)) {
      return { preset: undefined, icon: this.loader };
    }
    return { preset: 'mega', icon: undefined };
  }

  private _isValidStepStatus(
    status: string
  ): status is ResponseStatusStepStatus {
    return (RESPONSE_STATUS_STEP_STATUSES as readonly string[]).includes(
      status
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

  private _readNodeText(nodes: Iterable<Node>): string {
    return Array.from(nodes)
      .map((node) => node.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
  }

  private _readStepElements(): ResponseStatusStep[] {
    return this._stepEls?.length > 0
      ? this._stepEls
      : Array.from(this.children).filter(
          (element): element is ResponseStatusStep =>
            this._isStepElement(element)
        );
  }

  private _syncNamedSlots(): void {
    const labelText = this._readLabelSlotContent();

    if (this._labelSlotText !== labelText) {
      this._labelSlotText = labelText;
    }
  }

  // Recomputes step-count/active-step metadata only — never step text
  // content, which each step reports on its own via
  // `swc-response-status-step-active-label-change`.
  private _syncStepsMeta(): void {
    this._syncNamedSlots();

    const stepEls = this._readStepElements();

    const hasSteps = stepEls.length > 0;
    if (hasSteps !== this._hasSteps) {
      this._hasSteps = hasSteps;
    }

    const activeStep =
      stepEls.find((el) => {
        const rawStatus = el.status || 'active';
        const status = this._isValidStepStatus(rawStatus)
          ? rawStatus
          : 'active';
        return status === 'active';
      }) ?? null;

    const hasActiveStep = activeStep !== null;
    if (hasActiveStep !== this._hasActiveStep) {
      this._hasActiveStep = hasActiveStep;
    }

    if (activeStep !== this._activeStepEl) {
      this._activeStepEl = activeStep;
      this._activeStepLabel = activeStep?.labelText ?? '';
    }
  }

  private _handleSlotChange(): void {
    this._syncStepsMeta();
  }

  private _handleNamedSlotChange(): void {
    this._syncNamedSlots();
  }

  private _handleStepActiveLabelChange(event: Event): void {
    // Only the currently-identified active step's own notification is
    // trusted; a step that just transitioned away from `status="active"`
    // could still have an in-flight event from before that change.
    if (event.target !== this._activeStepEl) {
      return;
    }
    const { label } = (event as CustomEvent<{ label: string }>).detail;
    this._activeStepLabel = label;
  }

  private _handleStepOpenChange(event: Event): void {
    const target = event.target;
    if (!(target instanceof ResponseStatusStep)) {
      return;
    }

    const index = this._readStepElements().indexOf(target);
    if (index === -1) {
      return;
    }

    const { open } = (event as CustomEvent<{ open: boolean }>).detail;
    this._emitToggle('swc-response-status-step-toggle', { open, index });
  }

  // Whether the header should read as still generating: the timeline is open
  // and at least one step is still active. `stopped` is a terminal state
  // (like `complete`), not still-processing, so it's excluded too. Drives
  // the generic "Processing…" label fallback below.
  private get _showsGenericProcessingLabel(): boolean {
    return (
      this._resolvedStatus === 'active' && this.open && this._hasActiveStep
    );
  }

  private _getHeaderLabel(): string {
    if (this._labelSlotText) {
      return this._labelSlotText;
    }

    const status = this._resolvedStatus;

    if (status === 'active') {
      if (this._showsGenericProcessingLabel) {
        return ResponseStatus.ACTIVE_STEP_OPEN_LABEL;
      }

      if (this._activeStepLabel) {
        return this._activeStepLabel;
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

  // Cross-fades between the previous and next header label with no
  // vertical movement, so the chevron (rendered by the caller as a fixed
  // sibling, not inside this markup) never shifts position independently
  // of the fade.
  private _renderLabel(): TemplateResult {
    const labelClass = ResponseStatus.STATUS_LABEL_CLASS;

    if (!this._rollActive) {
      // Settled (no transition in flight): the roll geometry below assumes a
      // fixed single-line height, so only constrain to one line while actually
      // rolling. At rest, let the label wrap across multiple lines instead of
      // truncating, since a narrow container (or a longer translation) can
      // easily exceed one line's width.
      return html`
        <span
          class="swc-ResponseStatus-headerTrailViewport swc-ResponseStatus-headerTrailViewport--settled"
        >
          <span
            class="swc-ResponseStatus-headerTrailLine swc-ResponseStatus-headerTrailLine--settled"
          >
            <span class=${labelClass}>${this._currentVisibleLabel()}</span>
          </span>
        </span>
      `;
    }

    const crossfadeClass = this._rollEngaged
      ? 'swc-ResponseStatus-headerTrailCrossfade swc-ResponseStatus-headerTrailCrossfade--engaged'
      : 'swc-ResponseStatus-headerTrailCrossfade';

    return html`
      <span class="swc-ResponseStatus-headerTrailViewport">
        <span class=${crossfadeClass}>
          <span
            class="swc-ResponseStatus-headerTrailLine swc-ResponseStatus-headerTrailLine--exit"
            aria-hidden="true"
          >
            <span class=${labelClass}>${this._rollFromLabel}</span>
          </span>
          <span
            class="swc-ResponseStatus-headerTrailLine swc-ResponseStatus-headerTrailLine--enter"
          >
            <span class=${labelClass}>${this._rollToLabel}</span>
          </span>
        </span>
      </span>
    `;
  }

  private get _showPanel(): boolean {
    return this._hasSteps;
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

  private _renderLoader(): TemplateResult {
    const { preset, icon } = this._resolvedLoader;
    return html`
      <swc-pixel-loader
        class="swc-ResponseStatus-loader"
        preset=${ifDefined(preset)}
        icon=${ifDefined(icon)}
        aria-hidden="true"
      ></swc-pixel-loader>
    `;
  }

  private _renderChevron(open: boolean): TemplateResult {
    const baseClass = 'swc-ResponseStatus-chevron';
    return html`
      <swc-ui-icon
        class=${open ? `${baseClass} ${baseClass}--down` : baseClass}
        icon="chevron"
        size="s"
      ></swc-ui-icon>
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

  private _renderLeadingIcon(): TemplateResult {
    const status = this._resolvedStatus;
    const icon =
      status === 'complete'
        ? this._renderCheckmark()
        : status === 'stopped'
          ? nothing
          : this._renderLoader();

    // Always rendered (even with nothing inside for `stopped`) so the
    // collapse below can animate: removing the icon outright would snap the
    // label/chevron into place instead of letting them slide over as it
    // fades and its space closes up.
    return html`
      <span
        class=${classMap({
          'swc-ResponseStatus-leadingIcon': true,
          'swc-ResponseStatus-leadingIcon--collapsed': status === 'stopped',
        })}
      >
        ${icon}
      </span>
    `;
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
        ${this._renderLabel()}
        ${showDisclosure ? this._renderChevron(this.open) : nothing}
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
        <ol class="swc-ResponseStatus-steps" role="list">
          <slot
            @slotchange=${this._handleSlotChange}
            @swc-response-status-step-open-change=${this._handleStepOpenChange}
            @swc-response-status-step-active-label-change=${this
              ._handleStepActiveLabelChange}
          ></slot>
        </ol>
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
      </div>
    `;
  }
}
