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
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { uniqueId } from '../../../../utils/id.js';
import {
  StepDotIcon,
  StepDotOutlineIcon,
  StepStoppedIcon,
} from '../../utils/icons/index.js';

import styles from './response-status-step.css';

export const RESPONSE_STATUS_STEP_STATUSES = [
  'active',
  'complete',
  'stopped',
] as const;

export type ResponseStatusStepStatus =
  (typeof RESPONSE_STATUS_STEP_STATUSES)[number];

/**
 * One agentic execution step inside `<swc-response-status>`. Renders its own
 * icon, title, and (when a description is present) an expandable detail
 * panel; the parent only coordinates layout-level state (step add/remove,
 * status changes) via events and never reads this element's slotted content.
 *
 * @element swc-response-status-step
 * @slot label - Step title. Also shown in the parent's header while
 * `status="active"`.
 * @slot description - Step detail shown in the expanded timeline. Falls back
 * to bare/unslotted children when no `slot="description"` element is present.
 * @fires swc-response-status-step-open-change - Internal signal consumed by
 * the parent to re-dispatch its public `swc-response-status-step-toggle`
 * event with an index; not intended for external use. Detail:
 * `{ open: boolean }`
 * @fires swc-response-status-step-active-label-change - Dispatched when this
 * step's label text changes while `status="active"`, so the parent can keep
 * its header label in sync with streamed text. Detail: `{ label: string }`
 */
export class ResponseStatusStep extends SpectrumElement {
  private readonly _toggleId = uniqueId('swc-response-status-step-toggle');

  private readonly _detailId = uniqueId('swc-response-status-step-detail');

  /** Timeline state for connector icons. */
  @property({ type: String, reflect: true })
  public status: ResponseStatusStepStatus = 'active';

  /**
   * Whether this step's description is expanded in the timeline. Steps are
   * collapsed by default regardless of `status`.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  @state()
  private _hasDescription = false;

  /** Mirrors the label text for the shimmer overlay clone (see .css). */
  @state()
  private _labelText = '';

  /**
   * Whether the open detail region overflows its capped height. Only steps
   * that overflow get a keyboard-focusable scroll region. Measured once per
   * toggle-open rather than continuously: a resize or additional streamed
   * text while already open will not update this until the next toggle.
   */
  @state()
  private _overflows = false;

  /**
   * Last label text this step notified the parent about. Only tracked while
   * `status="active"`; compared against on every mutation so the event only
   * fires on an actual change, not on every unrelated mutation callback.
   */
  private _lastActiveLabel = '';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /**
   * This step's current label text, read on demand. Exposed so the parent
   * can look up a newly-active step's starting label without reaching into
   * its light DOM itself; ongoing updates while active arrive instead via
   * `swc-response-status-step-active-label-change`.
   */
  public get labelText(): string {
    return this._readLabel();
  }

  public constructor() {
    super();

    // `slotchange` only fires when assigned nodes are added or removed, not
    // when their text mutates, so streamed text into an already-assigned
    // node would otherwise go unnoticed. This reads the host's own light DOM
    // directly (like a native element inspecting its own children) rather
    // than depending on slot assignment, so it works even before any
    // description content exists to be slotted.
    new MutationController(this, {
      config: {
        attributes: true,
        attributeFilter: ['slot'],
        characterData: true,
        childList: true,
        subtree: true,
      },
      callback: () => {
        this._syncContent();
      },
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._syncContent();
  }

  protected override firstUpdated(): void {
    this.setAttribute('role', 'listitem');
  }

  // Runs on every update (including the first), so it catches `open` turning
  // `true` from a click, initial markup, or a consumer setting the property
  // directly — not just the click path.
  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('open') && this.open) {
      void this.updateComplete.then(() => this._measureOverflow());
    }
  }

  private _isValidStatus(status: string): status is ResponseStatusStepStatus {
    return (RESPONSE_STATUS_STEP_STATUSES as readonly string[]).includes(
      status
    );
  }

  /** Validated status; invalid runtime values fall back to `active`. */
  private get _resolvedStatus(): ResponseStatusStepStatus {
    return this._isValidStatus(this.status) ? this.status : 'active';
  }

  private _readNamedSlotText(slotName: string): string {
    return Array.from(this.children)
      .filter(
        (child): child is HTMLElement =>
          child instanceof HTMLElement &&
          child.getAttribute('slot') === slotName
      )
      .map((element) => element.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
  }

  // Explicit `slot="description"` wins; otherwise falls back to bare/
  // unslotted children, mirroring the fallback the `<slot>`/`<slot
  // name="description">` pairing in the template implements natively for
  // actual rendering. This direct DOM read only exists to decide *whether*
  // to render the disclosure chrome at all, before any slot assignment can
  // be observed.
  private _readDescription(): string {
    const named = this._readNamedSlotText('description');
    if (named) {
      return named;
    }

    return Array.from(this.childNodes)
      .filter(
        (node) =>
          node.nodeType === Node.TEXT_NODE ||
          (node instanceof Element && !node.getAttribute('slot'))
      )
      .map((node) => node.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
  }

  private _readLabel(): string {
    return this._readNamedSlotText('label');
  }

  private _emit<T>(type: string, detail: T): void {
    this.dispatchEvent(
      new CustomEvent<T>(type, { bubbles: true, composed: true, detail })
    );
  }

  private _syncContent(): void {
    const hasDescription = Boolean(this._readDescription());
    if (hasDescription !== this._hasDescription) {
      this._hasDescription = hasDescription;
    }

    const label = this._readLabel();
    if (label !== this._labelText) {
      this._labelText = label;
    }

    if (this._resolvedStatus === 'active') {
      if (label !== this._lastActiveLabel) {
        this._lastActiveLabel = label;
        this._emit('swc-response-status-step-active-label-change', {
          label,
        });
      }
    }
  }

  private _measureOverflow(): void {
    const region = this.shadowRoot?.querySelector<HTMLElement>(
      '.swc-ResponseStatusStep-detailScroll'
    );
    if (!region) {
      return;
    }

    const overflows = region.scrollHeight - region.clientHeight > 1;
    if (overflows !== this._overflows) {
      this._overflows = overflows;
    }
  }

  private _handleToggle(): void {
    this.open = !this.open;
    this._emit('swc-response-status-step-open-change', { open: this.open });
  }

  private _renderIcon(): TemplateResult {
    const status = this._resolvedStatus;

    if (status === 'complete') {
      return html`
        <swc-icon class="swc-ResponseStatusStep-icon" aria-hidden="true">
          ${StepDotIcon()}
        </swc-icon>
      `;
    }

    if (status === 'stopped') {
      return html`
        <swc-icon
          class="swc-ResponseStatusStep-icon swc-ResponseStatusStep-icon--stopped"
          aria-hidden="true"
        >
          ${StepStoppedIcon()}
        </swc-icon>
      `;
    }

    return html`
      <swc-icon
        class="swc-ResponseStatusStep-icon swc-ResponseStatusStep-icon--active"
        aria-hidden="true"
      >
        ${StepDotOutlineIcon()}
      </swc-icon>
    `;
  }

  private _renderBody(): TemplateResult {
    if (!this._hasDescription) {
      return html`
        <p class="swc-ResponseStatusStep-title swc-Detail swc-Detail--sizeS">
          <slot name="label"></slot>
          <span inert class="swc-ResponseStatusStep-titleShimmer">
            ${this._labelText}
          </span>
        </p>
      `;
    }

    return html`
      <button
        id=${this._toggleId}
        class="swc-ResponseStatusStep-toggle"
        aria-expanded=${this.open}
        aria-controls=${this._detailId}
        @click=${this._handleToggle}
      >
        <span class="swc-ResponseStatusStep-title swc-Detail swc-Detail--sizeS">
          <slot name="label"></slot>
          <span inert class="swc-ResponseStatusStep-titleShimmer">
            ${this._labelText}
          </span>
        </span>
      </button>
      <div
        id=${this._detailId}
        class=${classMap({
          'swc-ResponseStatusStep-detailPanel': true,
          'swc-ResponseStatusStep-detailPanel--open': this.open,
        })}
      >
        <div class="swc-ResponseStatusStep-detailClip">
          <div
            class="swc-ResponseStatusStep-detailScroll"
            role="group"
            aria-labelledby=${this._toggleId}
            tabindex=${ifDefined(this._overflows ? '0' : undefined)}
          >
            <div
              class="swc-ResponseStatusStep-detail swc-Body swc-Body--sizeXXS"
            >
              <slot name="description"></slot>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ResponseStatusStep-rail">
        ${this._renderIcon()}
        <span class="swc-ResponseStatusStep-line" aria-hidden="true"></span>
      </div>
      <div class="swc-ResponseStatusStep-body">${this._renderBody()}</div>
    `;
  }
}
