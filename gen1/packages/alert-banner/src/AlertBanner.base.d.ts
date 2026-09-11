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
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { type AlertBannerVariant } from './AlertBanner.types.js';
/**
 * An alert banner shows pressing and high-signal messages, such as system alerts.
 * It is meant to be noticed and prompt users to take action.
 *
 * @slot - The main content of the alert banner.
 * @slot action - An optional action button for the alert banner.
 *
 * @fires close - Dispatched when the alert banner is dismissed. Cancelable.
 */
export declare abstract class AlertBannerBase extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * Controls the display of the alert banner.
     */
    open: boolean;
    /**
     * Whether to include an icon-only close button to dismiss the alert banner.
     */
    dismissible: boolean;
    /**
     * The variant applies specific styling when set to `negative` or `info`;
     * `variant` attribute is removed when it's passed an invalid variant.
     */
    set variant(variant: AlertBannerVariant);
    get variant(): AlertBannerVariant;
    private _variant;
    protected isValidVariant(variant: string): boolean;
    protected abstract renderIcon(variant: string): TemplateResult;
    protected shouldClose(): void;
    close(): void;
    protected handleKeydown(event: KeyboardEvent): void;
    protected updated(changes: PropertyValues): void;
}
