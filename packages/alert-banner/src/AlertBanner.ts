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

    @property({ type: Boolean, reflect: true })
    public dismissible = false;

    /**
     * The variant applies specific styling when set to `negative` or `info`;
     * `variant` attribute is removed when it's passed an invalid variant.
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

    protected _isValidVariant(variant: string): boolean {
        return VALID_VARIANTS.includes(variant);
    }

    protected renderIcon(variant: string): TemplateResult {
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

    private _shouldClose(): void {
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

    private _handleKeydown(event: KeyboardEvent): void {
        if (event.code === 'Escape' && this.dismissible) {
            this._shouldClose();
        }
    }

    protected override render(): TemplateResult {
        return html`
            <div class="body" role="alert">
                <div class="content">
                    ${this.renderIcon(this.variant)}
                    <div class="text"><slot></slot></div>
                </div>
                <slot name="action"></slot>
            </div>
            <div class="end">
                ${this.dismissible
                    ? html`
                          <sp-close-button
                              @click=${this._shouldClose}
                              label="Close"
                              static="white"
                          ></sp-close-button>
                      `
                    : html``}
            </div>
        `;
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('keydown', this._handleKeydown.bind(this));
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('keydown', this._handleKeydown.bind(this));
    }
}
