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
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-close-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js';
export declare const toastVariants: ToastVariants[];
export type ToastVariants = 'negative' | 'positive' | 'info' | 'error' | 'warning' | '';
declare const Toast_base: typeof SpectrumElement;
/**
 * @element sp-toast
 *
 * @slot - The toast content
 * @slot action - button element surfacing an action in the Toast
 *
 * @fires close - Announces that the Toast has been closed by the user or by its timeout.
 */
export declare class Toast extends Toast_base {
    static get styles(): CSSResultArray;
    /**
     * The `open` property indicates whether the toast is visible or hidden.
     *
     * @param {Boolean} open
     */
    open: boolean;
    /**
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
     *
     * @param {Number | null} timeout
     * @default null
     */
    set timeout(timeout: number | null);
    get timeout(): number | null;
    private _timeout;
    /**
     * The variant applies specific styling when set to `negative`, `positive`, `info`, `error`, or `warning`.
     *
     * The variants `error` and `warning` are deprecated and should be replaced with `negative`.
     *
     * `variant` attribute is removed when not matching one of the above.
     *
     * @param {String} variant
     */
    set variant(variant: ToastVariants);
    get variant(): ToastVariants;
    private _variant;
    /**
     * The `iconLabel` property is used to set the `label` attribute on the icon element. This is used to provide a text alternative for the icon to ensure accessibility.
     *
     * If the `iconLabel` property is not set, the icon will use the `variant` to dynamically set the `label`.
     *
     * @param {String} iconLabel
     */
    iconLabel?: string;
    private renderIcon;
    private countdownStart;
    private nextCount;
    private doCountdown;
    private countdown;
    private holdCountdown;
    private resumeCountdown;
    private startCountdown;
    private stopCountdown;
    private shouldClose;
    close(): void;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};
