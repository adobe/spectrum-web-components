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
import { LitElement, ReactiveController, TemplateResult } from 'lit';
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
/**
 * Renders a pending state visual element and manages the aria-label of the host element.
 *
 * Currently this is used by Button only since the host element is the interactive element that needs pending state. This pattern does not work for components where the interactive element that needs pending state is in the shadow DOM. i.e. Combobox and Picker.
 *
 * @todo consider deprecating this controller since it is not used by any other component.
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
export declare class PendingStateController<T extends HostWithPendingState> implements ReactiveController {
    /**
     * The host element that this controller is attached to.
     */
    host: T;
    /**
     * Creates an instance of PendingStateController.
     *
     * @param host - The host element that this controller is attached to.
     */
    constructor(host: T);
    cachedAriaLabel: string | null;
    /**
     * Renders the pending state UI.
     *
     * @returns A TemplateResult representing the pending state UI.
     *
     * @todo [SWC-1119, SWC-1255, SWC-459] Confirm the accessibility warning and a11y dom tree are accurate for the pending state in button, combobox, and picker components.
     */
    renderPendingState(): TemplateResult;
    /**
     * Updates the ARIA label of the host element based on the pending state.
     * Manages Cached Aria Label
     */
    private updateAriaLabel;
    hostConnected(): void;
    hostUpdated(): void;
}
