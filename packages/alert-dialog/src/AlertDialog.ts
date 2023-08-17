/*
Copyright 2023 Adobe. All rights reserved.
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
    TemplateResult,
} from '@spectrum-web-components/base';
import alertStyles from './alert-dialog.css.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { DialogBase } from '@spectrum-web-components/dialog/src/DialogBase.js';
import { AlertDialogBase } from './AlertDialogBase.js';

export const alertDialogVariants: AlertDialogVariants[] = [
    'confirmation',
    'information',
    'warning',
    'error',
    'destructive',
    'secondary',
    'scroll',
];

export type AlertDialogVariants =
    | 'confirmation'
    | 'information'
    | 'warning'
    | 'error'
    | 'destructive'
    | 'secondary'
    | 'scroll'
    | '';

/**
 * @element sp-alert-dialog
 */

export class AlertDialog extends DialogBase {
    public static override get styles(): CSSResultArray {
        return [...super.styles, alertStyles];
    }

    /**
     * The variant applies specific styling when set to `negative`, `positive`, `info`, `error`, or `warning`.
     * `variant` attribute is removed when not matching one of the above.
     *
     * @param {String} variant
     */
    @property({ type: String, reflect: true })
    public set variant(variant: AlertDialogVariants) {
        if (variant === this.variant) {
            return;
        }
        const oldValue = this.variant;
        if (alertDialogVariants.includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
        } else {
            this.removeAttribute('variant');
            this._variant = '';
        }
        this.requestUpdate('variant', oldValue);
    }

    public get variant(): AlertDialogVariants {
        return this._variant;
    }

    private _variant: AlertDialogVariants = '';

    @property({ attribute: 'cancel-label' })
    public cancelLabel = '';

    @property({ attribute: 'confirm-label' })
    public confirmLabel = '';

    @property({ attribute: 'secondary-label' })
    public secondaryLabel = '';

    @property()
    public headline = '';

    private renderIcon(variant: string): TemplateResult {
        switch (variant) {
            case 'warning':
            case 'error':
                return html`
                    <sp-icon-alert class="icon"></sp-icon-alert>
                `;

            default:
                return html``;
        }
    }

    protected get alertDialogBase(): AlertDialogBase {
        return this.shadowRoot.querySelector(
            'sp-alert-dialog-base'
        ) as AlertDialogBase;
    }

    private clickSecondary(): void {
        this.dispatchEvent(
            new Event('secondary', {
                bubbles: true,
            })
        );
    }

    private clickCancel(): void {
        this.dispatchEvent(
            new Event('cancel', {
                bubbles: true,
            })
        );
    }

    private clickConfirm(): void {
        this.dispatchEvent(
            new Event('confirm', {
                bubbles: true,
            })
        );
    }

    private getButtonVariantAndTreatment(variant: string): [string, string] {
        let buttonVariant = '';
        let buttonTreatment = '';

        switch (variant) {
            case 'confirmation':
                buttonVariant = 'accent';
                break;
            case 'destructive':
                buttonVariant = 'negative';
                break;
            default:
                buttonVariant = 'primary';
                buttonTreatment = 'outline';
                break;
        }

        return [buttonVariant, buttonTreatment];
    }

    protected override renderDialog(): TemplateResult {
        const [buttonVariant, buttonTreatment] =
            this.getButtonVariantAndTreatment(this.variant);
        return html`
            <sp-alert-dialog-base>
                ${this.headline
                    ? html`
                          <div class="header" slot="heading">
                              <h1 class="heading">${this.headline}</h1>
                              ${this.renderIcon(this.variant)}
                          </div>
                      `
                    : html``}
                <slot></slot>
                ${this.secondaryLabel
                    ? html`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      `
                    : html``}
                ${this.cancelLabel
                    ? html`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      `
                    : html``}
                ${this.confirmLabel
                    ? html`
                          <sp-button
                              variant=${buttonVariant}
                              treatment=${buttonTreatment}
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      `
                    : html``}
            </sp-alert-dialog-base>
        `;
    }
}
