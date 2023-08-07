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
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import alertStyles from './alert-dialog.css.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { DialogBase } from '@spectrum-web-components/dialog/src/DialogBase.js';
import { Dialog } from '@spectrum-web-components/dialog/src/Dialog.js';

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
    @property({ type: String })
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

    protected override get dialog(): Dialog {
        return this.shadowRoot.querySelector('sp-dialog') as Dialog;
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

    private getBtnVariant(variant: string): string {
        switch (variant) {
            case 'confirmation':
                return 'accent';
            case 'information':
            case 'warning':
            case 'error':
            case 'secondary':
            case 'scroll':
                return 'primary';
            case 'destructive':
                return 'negative';
            default:
                return 'confirmation';
        }
    }

    protected override renderDialog(): TemplateResult {
        return html`
            <sp-dialog ?variant=${this.variant}>
                ${this.headline
                    ? html`
                          <div class="header" slot="heading">
                              <h1 class="heading">${this.headline}</h1>
                              ${this.renderIcon(this.variant)}
                          </div>
                      `
                    : html``}
                <slot></slot>
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
                ${this.secondaryLabel
                    ? html`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      `
                    : html``}
                ${this.confirmLabel
                    ? html`
                          <sp-button
                              variant=${this.getBtnVariant(this.variant)}
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      `
                    : html``}
            </sp-dialog>
        `;
    }
}
