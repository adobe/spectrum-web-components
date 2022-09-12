/*
Copyright 2020 Adobe. All rights reserved.
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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/underlay/sp-underlay.js';
import '@spectrum-web-components/button/sp-button.js';

import '../sp-dialog.js';
import { DialogBase } from './DialogBase.js';
import { Dialog } from './Dialog.js';

/**
 * @element sp-dialog-wrapper
 *
 * @slot - content for the dialog
 * @fires secondary - Announces that the "secondary" button has been clicked.
 * @fires cancel - Announces that the "cancel" button has been clicked.
 * @fires confirm - Announces that the "confirm" button has been clicked.
 * @fires close - Announces that the dialog has been closed.
 */
export class DialogWrapper extends DialogBase {
    public static override get styles(): CSSResultArray {
        return [...super.styles];
    }

    @property({ type: Boolean, reflect: true })
    public error = false;

    @property({ attribute: 'cancel-label' })
    public cancelLabel = '';

    @property({ attribute: 'confirm-label' })
    public confirmLabel = '';

    @property()
    public footer = '';

    @property()
    public hero = '';

    @property({ attribute: 'hero-label' })
    public heroLabel = '';

    @property({ type: Boolean, reflect: true, attribute: 'no-divider' })
    public noDivider = false;

    @property({ type: String, reflect: true })
    public size?: 's' | 'm' | 'l';

    @property({ attribute: 'secondary-label' })
    public secondaryLabel = '';

    @property()
    public headline = '';

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

    protected override renderDialog(): TemplateResult {
        return html`
            <sp-dialog
                ?dismissable=${this.dismissable}
                ?no-divider=${this.noDivider}
                ?error=${this.error}
                mode=${ifDefined(this.mode)}
                size=${ifDefined(this.size)}
            >
                ${this.hero
                    ? html`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${ifDefined(
                                  this.heroLabel ? undefined : 'true'
                              )}
                              alt=${ifDefined(
                                  this.heroLabel ? this.heroLabel : undefined
                              )}
                          />
                      `
                    : html``}
                ${this.headline
                    ? html`
                          <h2 slot="heading">${this.headline}</h2>
                      `
                    : html``}
                <slot></slot>
                ${this.footer
                    ? html`
                          <div slot="footer">${this.footer}</div>
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
                              variant="accent"
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
