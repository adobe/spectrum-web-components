/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, LitElement, ReactiveController, TemplateResult } from 'lit';
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';

/**
 * Represents a host element with pending state.
 */
export interface HostWithPendingState extends LitElement {
    pendingLabel?: string;
    pending: boolean;
    disabled: boolean;
    pendingStateController: PendingStateController<HostWithPendingState>;
}

/**
 * Represents a controller for managing the pending state of a reactive element.
 *
 * @template T - The type of the reactive element.
 */
export class PendingStateController<T extends HostWithPendingState>
    implements ReactiveController
{
    /**
     * The host element that this controller is attached to.
     */
    public host: T;

    /**
     * Creates an instance of PendingStateController.
     * @param host - The host element that this controller is attached to.
     */
    constructor(host: T) {
        this.host = host;
        this.host.addController(this);
    }
    /**
     * Getter for the current pending state.
     * @returns A boolean indicating whether the host is in a pending state.
     */
    get isPending(): boolean {
        return this.host.pending;
    }
    public cachedAriaLabel: string | null = null;
    /**
     * Renders the pending state UI.
     * @returns A TemplateResult representing the pending state UI.
     */
    public renderPendingState(): TemplateResult {
        const pendingLabel = this.host.pendingLabel || 'Pending';
        return html`
            <sp-progress-circle
                id="loader"
                size="s"
                indeterminate
                aria-valuetext=${pendingLabel}
                class="progress-circle"
            ></sp-progress-circle>
        `;
    }

    /**
     * Updates the ARIA label of the host element based on the pending state.
     * Manages Cached Aria Label
     */
    private updateAriaLabel(): void {
        if (
            this.isPending &&
            !this.host.disabled &&
            this.host.getAttribute('aria-label') != this.host.pendingLabel
        ) {
            this.cachedAriaLabel = this.host.getAttribute('aria-label');
            this.host.setAttribute(
                'aria-label',
                this.host.pendingLabel || 'Pending'
            );
        } else if (!this.isPending) {
            if (this.cachedAriaLabel) {
                this.host.setAttribute('aria-label', this.cachedAriaLabel);
            } else {
                this.host.removeAttribute('aria-label');
            }
        } else if (this.host.disabled) {
            if (this.cachedAriaLabel) {
                this.host.setAttribute('aria-label', this.cachedAriaLabel);
            }
        }
    }

    hostConnected(): void {
        if (!this.cachedAriaLabel)
            this.cachedAriaLabel = this.host.getAttribute('aria-label');
        this.updateAriaLabel();
    }

    hostUpdated(): void {
        this.updateAriaLabel();
    }
}
