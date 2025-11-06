/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
import { html, LitElement, ReactiveController, TemplateResult } from 'lit';

/**
 * Renders a pending state visual element and manages the aria-label of the host element.
 *
 * Currently this is used by Button only since the host element is the interactive element that needs pending state. This pattern does not work for components where the interactive element that needs pending state is in the shadow DOM. i.e. Combobox and Picker.
 *
 * @TODO consider deprecating this controller since it is not used by any other component.
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

    public cachedAriaLabel: string | null = null;
    /**
     * Renders the pending state UI.
     * @returns A TemplateResult representing the pending state UI.
     *
     * @TODO [SWC-1119, SWC-1255, SWC-459] Confirm the accessibility warning and a11y dom tree are accurate for the pending state in button, combobox, and picker components.
     */
    public renderPendingState(): TemplateResult {
        return this.host.pending
            ? html`
                  <sp-progress-circle
                      id="loader"
                      size="s"
                      indeterminate
                      class="progress-circle"
                      role="presentation"
                  ></sp-progress-circle>
              `
            : html``;
    }

    /**
     * Updates the ARIA label of the host element based on the pending state.
     * Manages Cached Aria Label
     */
    private updateAriaLabel(): void {
        const { pending, disabled, pendingLabel } = this.host;
        const currentAriaLabel = this.host.getAttribute('aria-label');

        function shouldCacheAriaLabel(
            cached: string | null,
            current: string | null,
            pending: string | undefined
        ): boolean {
            return (
                (!cached && current !== pending) ||
                (cached !== current && current !== pending)
            );
        }

        // If the current `aria-label` is different from the pending label, cache it
        // or if the cached `aria-label` is different from the current `aria-label`, cache it
        if (
            shouldCacheAriaLabel(
                this.cachedAriaLabel,
                currentAriaLabel,
                pendingLabel
            )
        ) {
            this.cachedAriaLabel = currentAriaLabel;
        }

        if (pending && !disabled) {
            // Since it is pending, we set the aria-label to `pendingLabel` or "Pending"
            this.host.setAttribute('aria-label', pendingLabel || 'Pending');
        } else {
            // Restore the cached `aria-label` if it exists
            if (this.cachedAriaLabel) {
                this.host.setAttribute('aria-label', this.cachedAriaLabel);
            } else {
                this.host.removeAttribute('aria-label');
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
