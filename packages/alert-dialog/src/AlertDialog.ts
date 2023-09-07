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
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { Dialog } from '@spectrum-web-components/dialog/src/Dialog.js';
import '@spectrum-web-components/button/sp-button.js';
import alertStyles from './alert-dialog.css.js';

export type AlertDialogVariants =
    | 'confirmation'
    | 'information'
    | 'warning'
    | 'error'
    | 'destructive'
    | 'secondary'
    | '';

export const alertDialogVariants: AlertDialogVariants[] = [
    'confirmation',
    'information',
    'warning',
    'error',
    'destructive',
    'secondary',
];

export class AlertDialog extends Dialog {
    public static override get styles(): CSSResultArray {
        return [alertStyles];
    }

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

    public _variant: AlertDialogVariants = '';

    protected renderIcon(): TemplateResult {
        switch (this.variant) {
            case 'warning':
            case 'error':
                return html`
                    <sp-icon-alert class="icon"></sp-icon-alert>
                `;

            default:
                return html``;
        }
    }
    protected override render(): TemplateResult {
        return html`
            <div class="grid">
                <div class="header">
                    ${this.renderHeading()} ${this.renderIcon()}
                </div>
                <sp-divider size="m" class="divider"></sp-divider>
                ${this.renderContent()} ${this.renderButtons()}
            </div>
        `;
    }
}
