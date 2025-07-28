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
declare const VALID_VARIANTS: string[];
export type AlertBannerVariants = (typeof VALID_VARIANTS)[number];
/**
 * @element sp-alert-banner
 *
 * @slot - The alert banner text context
 * @slot action - Slot for the button element that surfaces the contextual action a user can take
 *
 * @fires close - Announces the alert banner has been closed
 */
export declare class AlertBanner extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * Controls the display of the alert banner
     *
     * @param {Boolean} open
     */
    open: boolean;
    /**
     * Whether to include an icon-only close button to dismiss the alert banner
     *
     * @param {Boolean} dismissible
     */
    dismissible: boolean;
    /**
     * The variant applies specific styling when set to `negative` or `info`;
     * `variant` attribute is removed when it's passed an invalid variant.
     *
     * @param {String} variant
     */
    set variant(variant: AlertBannerVariants);
    get variant(): AlertBannerVariants;
    private _variant;
    protected isValidVariant(variant: string): boolean;
    protected renderIcon(variant: string): TemplateResult;
    private shouldClose;
    close(): void;
    private handleKeydown;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};
