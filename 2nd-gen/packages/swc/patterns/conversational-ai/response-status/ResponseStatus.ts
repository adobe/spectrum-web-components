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
 * @slot list-label - Accessible name for the step list panel.
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

  private static readonly DEFAULT_LIST_LABEL = 'Execution steps';

  private readonly panelId = uniqueId('swc-response-status-panel');

  @state()
  private _steps: ResponseStatusStepData[] = [];

  @state()
  private _labelSlotText = '';

  @state()
  private _summarySlotText = '';

  @state()
  private _listLabelSlotText = '';

  /** Whole response lifecycle status. */
  @property({ type: String, reflect: true })
  public status: 'pending' | 'active' | 'complete' | 'stopped' = 'pending';

  /** `true`: step timeline open. */
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

  public override disconnectedCallback(): void {
    this.removeEventListener(
      'swc-response-status-step-change',
      this._handleStepChildChange
    );
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
    const listLabelText = this._readNamedSlotContent('list-label');

    if (this._labelSlotText !== labelText) {
      this._labelSlotText = labelText;
    }
    if (this._summarySlotText !== summaryText) {
      this._summarySlotText = summaryText;
    }
    if (this._listLabelSlotText !== listLabelText) {
      this._listLabelSlotText = listLabelText;
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
    const label = this._getHeaderLabel();
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
        <span class=${ResponseStatus.STATUS_LABEL_CLASS}>${label}</span>
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
      this._listLabelSlotText || ResponseStatus.DEFAULT_LIST_LABEL;

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
          name="list-label"
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
