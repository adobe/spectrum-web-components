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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/button/sp-close-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import styles from './alert-banner.css.js';

/**
 * @TODO
 *
 * - added here directly from toast; once implementation starts refactor component to check what's really needed
 * - Focus visible polyfill mixin
 */

export type AlertBannerVariants = 'neutral' | 'info' | 'negative' | '';
const VALID_VARIANTS = ['neutral', 'info', 'negative'];

/**
 * @element sp-alert-banner
 */
export class AlertBanner extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    protected _isValidVariant(variant: string) {
        return VALID_VARIANTS.includes(variant);
    }

    /**
     * The variant applies specific styling when set to `negative` or `info`.
     * `variant` attribute is removed when not passing valid variant check.
     *
     * @param {String} variant
     */
    @property({ type: String })
    public set variant(variant: AlertBannerVariants) {
        if (variant === this.variant) {
            return;
        }
        const oldValue = this.variant;
        if (this._isValidVariant(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
        } else {
            this.removeAttribute('variant');
            this._variant = '';
        }
        this.requestUpdate('variant', oldValue);
    }

    public get variant(): AlertBannerVariants {
        return this._variant;
    }

    private _variant: AlertBannerVariants = '';

    private renderIcon(variant: string): TemplateResult {
        switch (variant) {
            case 'info':
                return html`
                    <sp-icon-info
                        label="Information"
                        class="type"
                    ></sp-icon-info>
                `;
            case 'negative':
                return html`
                    <sp-icon-alert label="Error" class="type"></sp-icon-alert>
                `;
            default:
                return html``;
        }
    }

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

    public close(): void {
        this.open = false;
    }

    protected override render(): TemplateResult {
        return html`
            ${this.renderIcon(this.variant)}
            <div class="body" role="alert">
                <div class="content">
                    <slot></slot>
                </div>
                <slot name="action"></slot>
            </div>
            <div class="end">
                <sp-close-button
                    @click=${this.shouldClose}
                    label="Close"
                    static="white"
                ></sp-close-button>
            </div>
        `;
    }
}
