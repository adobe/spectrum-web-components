import { LitElement, ReactiveController, TemplateResult } from 'lit';
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
export declare class PendingStateController<T extends HostWithPendingState> implements ReactiveController {
    /**
     * The host element that this controller is attached to.
     */
    host: T;
    /**
     * Creates an instance of PendingStateController.
     * @param host - The host element that this controller is attached to.
     */
    constructor(host: T);
    cachedAriaLabel: string | null;
    /**
     * Renders the pending state UI.
     * @returns A TemplateResult representing the pending state UI.
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
