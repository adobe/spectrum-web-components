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
/*
Copyright 2024 Your Company. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, ReactiveController, ReactiveElement, TemplateResult } from 'lit';
import('@spectrum-web-components/progress-circle/sp-progress-circle.js');

type PendingStateConfig = {
    pending: () => boolean;
    onPendingChange: (pending: boolean) => void;
};

/**
 * Represents a controller that manages the pending state of a reactive element.
 *
 * @template T - The type of the reactive element.
 */
/**
 * Represents a controller for managing the pending state of a reactive element.
 *
 * @template T - The type of the reactive element.
 */
/**
 * Represents a controller for managing the pending state of a reactive element.
 *
 * @template T - The type of the reactive element.
 */
export class PendingStateController<T extends ReactiveElement>
    implements ReactiveController
{
    /**
     * The host element that this controller is attached to.
     */
    private host: T;

    /**
     * A function that returns a boolean indicating whether the host is in a pending state.
     */
    private pending: () => boolean;

    /**
     * A callback function that is called when the pending state changes.
     *
     * @param pending - A boolean indicating the new pending state.
     */
    private onPendingChange: (pending: boolean) => void;

    /**
     * Creates an instance of PendingStateController.
     *
     * @param host - The host element that this controller is attached to.
     * @param config - The configuration object containing the pending function and onPendingChange callback.
     */
    constructor(host: T, { pending, onPendingChange }: PendingStateConfig) {
        this.host = host;
        this.pending = pending;
        this.onPendingChange = onPendingChange;

        this.host.addController(this);
    }

    /**
     * Checks if the host is in a pending state.
     *
     * @returns A boolean indicating whether the host is in a pending state.
     */
    public isPending(): boolean {
        return this.pending();
    }

    /**
     * Renders the pending state UI.
     *
     * @param pendingLabel - The label to display for the pending state. Defaults to 'pending label'.
     * @returns A TemplateResult representing the pending state UI.
     */
    public renderPendingState(
        pendingLabel: string = 'pending label'
    ): TemplateResult {
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
     * Called when the host element is connected to the DOM.
     */
    hostConnected(): void {
        this.checkPendingState();
    }

    /**
     * Called when the host element is updated.
     */
    hostUpdated(): void {
        this.checkPendingState();
    }

    /**
     * Checks the pending state and calls the onPendingChange callback with the new state.
     */
    private checkPendingState(): void {
        const isPending = this.pending();
        this.onPendingChange(isPending);
    }
}
