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
    html,
    SpectrumElement,
    TemplateResult,
    property,
    CSSResultArray,
    query,
} from '@spectrum-web-components/base';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import '@spectrum-web-components/underlay/sp-underlay.js';
import '@spectrum-web-components/button/sp-button.js';

import '../sp-dialog.js';
import styles from './dialog-wrapper.css.js';
import { Dialog } from './Dialog.js';

/**
 * @element sp-dialog-wrapper
 *
 * @fires secondary - Announces that the "secondary" button has been clicked.
 * @fires cancel - Announces that the "cancel" button has been clicked.
 * @fires confirm - Announces that the "confirm" button has been clicked.
 * @fires close - Announces that the dialog has been closed.
 */
export class DialogWrapper extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public error = false;

    @property({ attribute: 'cancel-label' })
    public cancelLabel = '';

    @property({ attribute: 'confirm-label' })
    public confirmLabel = '';

    @property({ type: Boolean, reflect: true })
    public dismissible = false;

    @property()
    public footer = '';

    @property()
    public hero = '';

    @property({ attribute: 'hero-label' })
    public heroLabel = '';

    @property({ type: Boolean, reflect: true, attribute: 'no-divider' })
    public noDivider = false;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: String, reflect: true })
    public mode?: 'fullscreen' | 'fullscreenTakeover';

    @property({ type: String, reflect: true })
    public size?: 'small' | 'medium' | 'large' | 'alert';

    @property({ attribute: 'secondary-label' })
    public secondaryLabel = '';

    @property()
    public headline = '';

    @property({ type: Boolean })
    public responsive = false;

    @property({ type: Boolean })
    public underlay = false;

    @query('sp-dialog')
    private dialog!: Dialog;

    public focus(): void {
        /* istanbul ignore else */
        if (this.shadowRoot) {
            const firstFocusable = this.shadowRoot.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) as SpectrumElement;
            if (firstFocusable) {
                /* istanbul ignore else */
                if (firstFocusable.updateComplete) {
                    firstFocusable.updateComplete.then(() =>
                        firstFocusable.focus()
                    );
                } else {
                    firstFocusable.focus();
                }
                this.removeAttribute('tabindex');
            } else {
                this.dialog.focus();
            }
        } else {
            super.focus();
        }
    }

    private dismiss(): void {
        this.close();
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

    public close(): void {
        this.open = false;
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
            })
        );
    }

    protected render(): TemplateResult {
        return html`
            ${this.underlay
                ? html`
                      <sp-underlay
                          ?open=${this.open}
                          @click=${this.dismiss}
                      ></sp-underlay>
                  `
                : html``}
            <sp-dialog
                ?dismissible=${this.dismissible}
                ?no-divider=${this.noDivider}
                ?open=${this.open}
                mode=${ifDefined(this.mode ? this.mode : undefined)}
                size=${ifDefined(this.size ? this.size : undefined)}
                @close=${this.close}
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
                          <h2 slot="title">${this.headline}</h2>
                      `
                    : html``}
                <slot></slot>
                <div slot="footer">${this.footer}</div>
                ${this.secondaryLabel
                    ? html`
                          <sp-button
                              variant="primary"
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
                              variant="cta"
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
