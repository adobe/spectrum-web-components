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
import { CSSResultArray, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/shared/base';

const VALID_VARIANTS = ['neutral', 'info', 'negative'];
export type AlertBannerVariants = (typeof VALID_VARIANTS)[number];

/**
 * Base class for alert banner components
 */
export abstract class AlertBannerBase extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [];
    }

    /**
     * Controls the display of the alert banner
     *
     * @param {Boolean} open
     */
    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * Whether to include an icon-only close button to dismiss the alert banner
     *
     * @param {Boolean} dismissible
     */
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

        if (this.isValidVariant(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
        } else {
            this.removeAttribute('variant');
            this._variant = '';

            if (window.__swc.DEBUG) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
                    'https://opensource.adobe.com/spectrum-web-components/components/alert-banner/#variants',
                    {
                        issues: [...VALID_VARIANTS],
                    }
                );
            }
        }
        this.requestUpdate('variant', oldValue);
    }

    public get variant(): AlertBannerVariants {
        return this._variant;
    }

    private _variant: AlertBannerVariants = '';

    protected isValidVariant(variant: string): boolean {
        return VALID_VARIANTS.includes(variant);
    }

    protected abstract renderIcon(variant: string): TemplateResult;

    protected shouldClose(): void {
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

    protected handleKeydown(event: KeyboardEvent): void {
        if (event.code === 'Escape' && this.dismissible) {
            this.shouldClose();
        }
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);

        if (changes.has('open')) {
            if (this.open) {
                this.addEventListener('keydown', this.handleKeydown);
            } else {
                this.removeEventListener('keydown', this.handleKeydown);
            }
        }
    }
}
