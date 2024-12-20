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

import "@spectrum-web-components/progress-circle/sp-progress-circle.js";
import { html, LitElement, ReactiveController, TemplateResult } from "lit";

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

	public cachedAriaLabel: string | null = null;
	/**
	 * Renders the pending state UI.
	 * @returns A TemplateResult representing the pending state UI.
	 */
	public renderPendingState(): TemplateResult {
		const pendingLabel = this.host.pendingLabel || "Pending";

		return this.host.pending
			? html`
					<sp-progress-circle
						id="loader"
						size="s"
						indeterminate
						aria-valuetext=${pendingLabel}
						class="progress-circle"
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
		const currentAriaLabel = this.host.getAttribute("aria-label");

		if (pending && !disabled && currentAriaLabel !== pendingLabel) {
			// Cache the current `aria-label` to be restored when no longer `pending`
			this.cachedAriaLabel = currentAriaLabel;
			// Since it is pending, we set the aria-label to `pendingLabel` or "Pending"
			this.host.setAttribute("aria-label", pendingLabel || "Pending");
		} else if (!pending || disabled) {
			// Restore the cached `aria-label` if it exists
			if (this.cachedAriaLabel) {
				this.host.setAttribute("aria-label", this.cachedAriaLabel);
			} else if (!pending) {
				// If no cached `aria-label` and not `pending`, remove the `aria-label`
				this.host.removeAttribute("aria-label");
			}
		}
	}

	hostConnected(): void {
		if (!this.cachedAriaLabel)
			this.cachedAriaLabel = this.host.getAttribute("aria-label");
		this.updateAriaLabel();
	}

	hostUpdated(): void {
		this.updateAriaLabel();
	}
}
