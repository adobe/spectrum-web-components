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
import {
    CSSResultArray,
    html,
    TemplateResult,
} from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-close-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import styles from './alert-banner.css.js';
import {
    AlertBannerBase,
    AlertBannerVariants,
} from '@spectrum-web-components/core/components/alert-banner';

export type { AlertBannerVariants };

/**
 * @element sp-alert-banner
 *
 * @slot - The alert banner text context
 * @slot action - Slot for the button element that surfaces the contextual action a user can take
 *
 * @fires close - Announces the alert banner has been closed
 */
export class AlertBanner extends AlertBannerBase {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    protected override renderIcon(variant: string): TemplateResult {
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
                              @click=${this.shouldClose}
                              label="Close"
                              static-color="white"
                          ></sp-close-button>
                      `
                    : html``}
            </div>
        `;
    }
}
