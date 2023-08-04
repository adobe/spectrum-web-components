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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import styles from './alert-dialog.css.js';

export const alertDialogVariants: AlertDialogVariants[] = [
    'confirmation',
    'positive',
    'info',
    'error',
    'warning',
];

export type AlertDialogVariants =
    | 'confirmation'
    | 'positive'
    | 'info'
    | 'error'
    | 'warning'
    | '';

/**
 * @element sp-alert-dialog
 */
export class AlertDialog extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    public get variant(): AlertDialogVariants {
        return this._variant;
    }

    private _variant: AlertDialogVariants = '';

    // private renderIcon(variant: string): TemplateResult {
    //     switch (variant) {
    //         case 'info':
    //             return html`
    //                 <sp-icon-info
    //                     label="Information"
    //                     class="type"
    //                 ></sp-icon-info>
    //             `;
    //         case 'negative':
    //         case 'error': // deprecated
    //         case 'warning': // deprecated
    //             return html`
    //                 <sp-icon-alert label="Error" class="type"></sp-icon-alert>
    //             `;
    //         case 'positive':
    //         case 'success': // deprecated
    //             return html`
    //                 <sp-icon-checkmark-circle
    //                     label="Success"
    //                     class="type"
    //                 ></sp-icon-checkmark-circle>
    //             `;
    //         default:
    //             return html``;
    //     }
    // }

    protected renderHeading(): TemplateResult {
        return html`
            <slot class="heading" name="heading"></slot>
        `;
    }

    protected renderContent(): TemplateResult {
        return html`
            <div class="content">
                <slot></slot>
            </div>
        `;
    }

    protected renderButtons(): TemplateResult {
        return html`
            <sp-button-group class="button-group">
                <slot name="button"></slot>
            </sp-button-group>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            <div class="grid">
                <div class="heading">${this.renderHeading()}</div>
                <sp-divider size="m" class="divider"></sp-divider>
                <div class="content">${this.renderContent()}</div>
            </div>
        `;
    }
}
