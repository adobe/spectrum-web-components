/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations in the License.
 */

import {
  html,
  nothing,
  type ReactiveController,
  type ReactiveElement,
  type TemplateResult,
} from '@spectrum-web-components/base';
import type { Placement } from '@spectrum-web-components/overlay';

/**
 * Symbol used to request a host re-render when truncation state or tooltip deps change.
 * The host can use this in its update lifecycle to react if needed; the important part
 * is that requestUpdate(symbol, previous) triggers a re-render so controller.render() runs again.
 */
export const truncatedValueTooltipUpdatedSymbol = Symbol(
  'truncated value tooltip updated'
);

/**
 * Host interface for TruncatedValueTooltipController. The host must provide these
 * properties (e.g. TextfieldBase). The controller reads them to determine truncation
 * and to render the tooltip content and placement.
 */
export interface TruncatedValueTooltipHost {
  inputElement: HTMLInputElement | HTMLTextAreaElement;
  multiline: boolean;
  type: string;
  disabled: boolean;
  focused?: boolean;
  displayValue: string;
  truncatedValueTooltipPlacement: Placement;
}

type HostElement = ReactiveElement & TruncatedValueTooltipHost;

/**
 * A reactive controller that adds truncated-value tooltip behavior: when the visible
 * value is clipped, a tooltip with the full value is shown on hover/focus. Overlay
 * and tooltip are lazy-loaded only when truncation is first detected.
 *
 * The host must implement TruncatedValueTooltipHost (e.g. TextfieldBase). The host
 * includes the controller's render output in its template and may call refresh() when
 * value or focused changes; NumberField also calls syncTooltipText() from handleInput()
 * so the tooltip stays in sync with the live input without re-renders.
 */
export class TruncatedValueTooltipController implements ReactiveController {
  private host: HostElement;

  private isTruncated = false;

  private _tooltipDepsLoaded = false;

  private _resizeObserver: ResizeObserver | null = null;

  private _observerInitialized = false;

  constructor(host: HostElement) {
    this.host = host;
    this.host.addController(this);
  }

  private get inputElementIsTruncated(): boolean {
    const host = this.host;
    if (!host.inputElement || host.multiline || host.type === 'password') {
      return false;
    }
    // Add 1 because Safari sometimes rounds by 1px, breaking the calculation otherwise.
    return host.inputElement.scrollWidth > host.inputElement.clientWidth + 1;
  }

  /**
   * Updates truncation state. Returns true if we just transitioned to truncated
   * (so the host can e.g. schedule syncTooltipText after updateComplete).
   */
  private refreshTruncationState(): boolean {
    const host = this.host;
    const currentlyTruncated = this.inputElementIsTruncated;
    if (host.focused && this.isTruncated && !currentlyTruncated) {
      // Keep tooltip mounted through the active focus session once truncation has occurred.
      return false;
    }
    if (currentlyTruncated === this.isTruncated) {
      return false;
    }
    const previous = this.isTruncated;
    this.isTruncated = currentlyTruncated;
    // Defer so we don't schedule an update during the host's update (Lit warning).
    Promise.resolve().then(() => {
      this.host.requestUpdate(truncatedValueTooltipUpdatedSymbol, previous);
    });
    return currentlyTruncated;
  }

  /**
   * Public API for hosts (e.g. NumberField) to force a re-check of truncation state.
   * Call from handleInput() or when value/focused changes so the tooltip visibility stays in sync.
   * Returns true if we just became truncated (host may schedule syncTooltipText after updateComplete).
   */
  public refresh(): boolean {
    return this.refreshTruncationState();
  }

  private async ensureTooltipDeps(): Promise<void> {
    if (this._tooltipDepsLoaded) {
      return;
    }
    await Promise.all([
      import('@spectrum-web-components/overlay/sp-overlay.js'),
      import('@spectrum-web-components/tooltip/sp-tooltip.js'),
    ]);
    this._tooltipDepsLoaded = true;
    // Defer so we don't schedule an update during the host's render (Lit warning).
    Promise.resolve().then(() => {
      this.host.requestUpdate(truncatedValueTooltipUpdatedSymbol, false);
    });
  }

  /**
   * Returns the tooltip overlay template when truncated; otherwise nothing.
   * The host includes this in its render() (e.g. this.truncatedValueTooltipController.render()).
   */
  public render(): TemplateResult | typeof nothing {
    const host = this.host;
    if (
      !this.isTruncated ||
      host.disabled ||
      !host.inputElement ||
      host.type === 'password'
    ) {
      return nothing;
    }
    if (!this._tooltipDepsLoaded) {
      this.ensureTooltipDeps();
      return nothing;
    }
    return html`
      <sp-overlay
        id="truncated-value-tooltip"
        aria-hidden="true"
        .describeTrigger=${'none'}
        .triggerElement=${host.inputElement}
        .triggerInteraction=${'hover'}
        type="hint"
        .placement=${host.truncatedValueTooltipPlacement}
      >
        <sp-tooltip
          aria-hidden="true"
          placement=${host.truncatedValueTooltipPlacement}
        >
          ${host.displayValue}
        </sp-tooltip>
      </sp-overlay>
    `;
  }

  /**
   * Updates the tooltip's text node directly (no requestUpdate). Used by NumberField
   * from handleInput() so the tooltip shows the current input value while typing
   * without triggering re-renders that would affect formatting or selection.
   */
  public syncTooltipText(text: string): void {
    const tooltip = this.host.shadowRoot?.querySelector(
      '#truncated-value-tooltip sp-tooltip'
    );
    if (!tooltip) {
      return;
    }
    const tooltipTextNode =
      Array.from(tooltip.childNodes).find(
        (node) =>
          node.nodeType === Node.TEXT_NODE &&
          Boolean((node.textContent ?? '').trim().length)
      ) ??
      Array.from(tooltip.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE
      );
    if (tooltipTextNode) {
      tooltipTextNode.textContent = text;
    }
  }

  hostConnected(): void {
    // Defer ResizeObserver setup to hostUpdated so inputElement is in the DOM.
  }

  hostUpdated(): void {
    const host = this.host;
    if (host.multiline || this._observerInitialized) {
      return;
    }
    this._observerInitialized = true;
    this._resizeObserver = new ResizeObserver(() => {
      this.refreshTruncationState();
    });
    this._resizeObserver.observe(this.host as unknown as Element);
    if (host.inputElement) {
      this._resizeObserver.observe(host.inputElement);
    }
    this.refreshTruncationState();
  }

  hostDisconnected(): void {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    this._observerInitialized = false;
  }
}
