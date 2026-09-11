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
import { nothing, type ReactiveController, type ReactiveElement, type TemplateResult } from '@spectrum-web-components/base';
import type { Placement } from '@spectrum-web-components/overlay';
/**
 * Symbol used to request a host re-render when truncation state or tooltip deps change.
 * The host can use this in its update lifecycle to react if needed; the important part
 * is that requestUpdate(symbol, previous) triggers a re-render so controller.render() runs again.
 */
export declare const truncatedValueTooltipUpdatedSymbol: unique symbol;
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
export declare class TruncatedValueTooltipController implements ReactiveController {
    private host;
    private _isTruncated;
    private _tooltipDepsLoaded;
    private _resizeObserver;
    private _observerInitialized;
    constructor(host: HostElement);
    private get inputElementIsTruncated();
    /**
     * Updates truncation state. Returns true if we just transitioned to truncated
     * (so the host can e.g. schedule syncTooltipText after updateComplete).
     */
    private refreshTruncationState;
    /**
     * Public API for hosts (e.g. NumberField) to force a re-check of truncation state.
     * Call from handleInput() or when value/focused changes so the tooltip visibility stays in sync.
     * Returns true if we just became truncated (host may schedule syncTooltipText after updateComplete).
     */
    refresh(): boolean;
    private ensureTooltipDeps;
    /**
     * Returns the tooltip overlay template when truncated; otherwise nothing.
     * The host includes this in its render() (e.g. this.truncatedValueTooltipController.render()).
     */
    render(): TemplateResult | typeof nothing;
    /**
     * Updates the tooltip label text without requestUpdate. Used by NumberField from
     * handleInput() so the tooltip shows the current input value while typing without
     * triggering re-renders that would affect formatting or selection.
     *
     * We mutate an existing text node under `<sp-tooltip>` instead of assigning
     * `tooltip.textContent`. Clearing `textContent` on the host removes all light-DOM
     * children, which ejects Lit's marker nodes for `${host.displayValue}` in
     * `render()` and causes "ChildPart has no parentNode" on the next update.
     *
     * Trade-off: this couples to our own light-DOM shape: `render()` must keep a
     * direct text child of `<sp-tooltip>` (or update this lookup if we wrap the label
     * in an element, e.g. a dedicated `<span id="…">`). This does not depend on
     * `sp-tooltip`'s internal shadow DOM.
     */
    syncTooltipText(text: string): void;
    hostConnected(): void;
    hostUpdated(): void;
    hostDisconnected(): void;
}
export {};
