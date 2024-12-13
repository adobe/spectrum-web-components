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

import {
    CSSResultArray,
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/button/sp-close-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
import toastStyles from './toast.css.js';

export const toastVariants: ToastVariants[] = [
    'negative',
    'positive',
    'info',
    'error',
    'warning',
];

export type ToastVariants =
    | 'negative'
    | 'positive'
    | 'info'
    | 'error'
    | 'warning'
    | '';

/**
 * The `Toast` component is a custom web component that displays a brief message to the user.
 * It extends the `FocusVisiblePolyfillMixin` and `SpectrumElement` to provide focus management
 * and styling capabilities.
 *
 * @element sp-toast
 *
 * @slot - The toast content
 * @slot action - button element surfacing an action in the Toast
 *
 * @fires close - Announces that the Toast has been closed by the user or by its timeout.
 */

export class Toast extends FocusVisiblePolyfillMixin(SpectrumElement) {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [toastStyles];
    }

    /**
     * The `open` property indicates whether the toast is visible or hidden.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * Sets the timeout for the toast.
     *
     * When a timeout is provided, it represents the number of milliseconds from when
     * the Toast was placed on the page before it will automatically dismiss itself.
     *
     * Accessibility concerns require that a Toast is available for at least 6000ms
     * before being dismissed, so any timeout of less than 6000ms will be raised to
     * that baseline.
     *
     * It is suggested that messages longer than 120 words should receive an additional
     * 1000ms in their timeout for each additional 120 words in the message.
     *
     * For example, a message with 240 words should have a timeout of 7000ms,
     * and a message with 360 words should have a timeout of 8000ms.
     */
    //TODO(#4939): Align on the timeout minimum with design
    @property({ type: Number })
    public set timeout(timeout: number | null) {
        const hasTimeout = typeof timeout !== null && (timeout as number) > 0;

        // Ensure the timeout is at least 6000ms if a valid timeout is provided.
        const newTimeout = hasTimeout
            ? Math.max(6000, timeout as number)
            : null;

        const oldValue = this.timeout;

        // Update the countdown start time if a new timeout is set.
        if (newTimeout && this.countdownStart) {
            this.countdownStart = performance.now();
        }

        // Set the new timeout value and request an update.
        this._timeout = newTimeout;
        this.requestUpdate('timeout', oldValue);
    }

    /**
     * Gets the timeout for the toast.
     */
    public get timeout(): number | null {
        return this._timeout;
    }

    /**
     * Internal property to store the timeout value.
     */
    private _timeout: number | null = null;

    /**
     * Sets the variant of the toast.
     *
     * Validates the variant to ensure it is one of the allowed values. The variant applies specific styling when set to `negative`, `positive`, `info`, `error`, or `warning`. The variants `error` and `warning` are deprecated and should be replaced with `negative`.
     *
     * If the variant is valid, it sets the attribute and updates the internal property.
     * If the variant is invalid, it removes the attribute and sets the internal property to an empty string.
     */
    @property({ type: String })
    public set variant(variant: ToastVariants) {
        if (variant === this.variant) {
            return;
        }

        const oldValue = this.variant;

        // Validate the variant is one of the allowed values else remove the attribute.
        if (toastVariants.includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
        } else {
            this.removeAttribute('variant');
            this._variant = '';
        }

        this.requestUpdate('variant', oldValue);
    }

    /**
     * Gets the variant of the toast.
     */
    public get variant(): ToastVariants {
        return this._variant;
    }

    /**
     * Internal property to store the variant value.
     */
    private _variant: ToastVariants = '';

    /**
     * The label for the icon displayed in the toast.
     * This property is reflected as an attribute named 'icon-label'.
     *
     * This provides a text alternative for the icon to ensure accessibility.
     * If the `iconLabel` property is not set, the icon will use the `variant` to dynamically set the `label`.
     */
    @property({ type: String, attribute: 'icon-label' })
    public iconLabel?: string;

    /**
     * Renders the appropriate icon based on the variant.
     * The icon is displayed in the toast and provides a visual indication of the toast's type.
     */
    //TODO(#4931): Address the deprecated variants or remove the flags
    private renderIcon(
        variant: ToastVariants,
        iconLabel?: string
    ): TemplateResult {
        switch (variant) {
            case 'info':
                return html`
                    <sp-icon-info
                        label=${iconLabel || 'Information'}
                        class="type"
                    ></sp-icon-info>
                `;
            case 'negative':
            case 'error': // deprecated
                return html`
                    <sp-icon-alert
                        label=${iconLabel || 'Error'}
                        class="type"
                    ></sp-icon-alert>
                `;
            case 'warning': // deprecated
                return html`
                    <sp-icon-alert
                        label=${iconLabel || 'Warning'}
                        class="type"
                    ></sp-icon-alert>
                `;
            case 'positive':
                return html`
                    <sp-icon-checkmark-circle
                        label=${iconLabel || 'Success'}
                        class="type"
                    ></sp-icon-checkmark-circle>
                `;
            default:
                return html``;
        }
    }

    /**
     * Internal property to store the start time of the countdown.
     */
    private countdownStart = 0;

    /**
     * Internal property to store the ID of the next animation frame request.
     */
    private nextCount = -1;

    /**
     * Handles the countdown logic for the toast.
     * If the countdown duration has elapsed, it triggers the close action.
     * Otherwise, it continues the countdown.
     */
    private doCountdown = (time: number): void => {
        if (!this.countdownStart) {
            this.countdownStart = performance.now();
        }

        if (time - this.countdownStart > (this._timeout as number)) {
            this.shouldClose();
            this.countdownStart = 0;
        } else {
            this.countdown();
        }
    };

    /**
     * Initiates the countdown by requesting the next animation frame.
     */
    private countdown = (): void => {
        cancelAnimationFrame(this.nextCount);
        this.nextCount = requestAnimationFrame(this.doCountdown);
    };

    /**
     * Pauses the countdown when the toast loses focus.
     * Adds an event listener to resume the countdown when the toast regains focus.
     */
    private holdCountdown = (): void => {
        this.stopCountdown();
        this.addEventListener('focusout', this.resumeCountdown);
    };

    /**
     * Resumes the countdown when the toast regains focus.
     * Removes the event listener for holding the countdown.
     */
    private resumeCountdown = (): void => {
        this.removeEventListener('focusout', this.holdCountdown);
        this.countdown();
    };

    /**
     * Starts the countdown for the toast.
     * Adds an event listener to pause the countdown when the toast gains focus.
     */
    private startCountdown(): void {
        this.countdown();
        this.addEventListener('focusin', this.holdCountdown);
    }

    /**
     * Stops the countdown for the toast.
     * Cancels the next animation frame and resets the countdown start time.
     */
    private stopCountdown(): void {
        cancelAnimationFrame(this.nextCount);
        this.countdownStart = 0;
    }

    /**
     * Dispatches a 'close' event and closes the toast if the event is not canceled.
     */
    private shouldClose(): void {
        const applyDefault = this.dispatchEvent(
            new CustomEvent('close', {
                composed: true,
                bubbles: true,
                cancelable: true,
            })
        );

        if (applyDefault) {
            this.close();
        }
    }

    /**
     * Closes the toast by setting the open property to false.
     */
    public close(): void {
        this.open = false;
    }

    /**
     * Renders the content of the toast component.
     * This method returns a template result containing the icon, body, and close button of the toast.
     */
    protected override render(): TemplateResult {
        return html`
            ${this.renderIcon(this.variant, this.iconLabel)}
            <div class="body" role="alert">
                <div class="content">
                    <slot></slot>
                </div>
                <slot name="action"></slot>
            </div>
            <div class="buttons">
                <sp-close-button
                    @click=${this.shouldClose}
                    label="Close"
                    static-color="white"
                ></sp-close-button>
            </div>
        `;
    }

    /**
     * Lifecycle method called when the component updates.
     * This method handles the countdown logic based on the `open` and `timeout` properties.
     */
    protected override updated(changes: PropertyValues): void {
        super.updated(changes);

        if (changes.has('open')) {
            if (this.open) {
                // Start the countdown if the toast is open and a timeout is set.
                if (this.timeout) {
                    this.startCountdown();
                }
            } else {
                // Stop the countdown if the toast is closed and a timeout is set.
                if (this.timeout) {
                    this.stopCountdown();
                }
            }
        }

        if (changes.has('timeout')) {
            if (this.timeout !== null && this.open) {
                // Start the countdown if a valid timeout is set and the toast is open.
                this.startCountdown();
            } else {
                // Stop the countdown if no valid timeout is set or the toast is closed.
                this.stopCountdown();
            }
        }
    }
}
