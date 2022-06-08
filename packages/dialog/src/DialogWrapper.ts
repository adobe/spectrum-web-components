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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/underlay/sp-underlay.js';
import '@spectrum-web-components/button/sp-button.js';

import '../sp-dialog.js';
import modalWrapperStyles from '@spectrum-web-components/modal/src/modal-wrapper.css.js';
import modalStyles from '@spectrum-web-components/modal/src/modal.css.js';
import { Dialog } from './Dialog.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared';
import { firstFocusableIn } from '@spectrum-web-components/shared/src/first-focusable-in.js';

/**
 * @element sp-dialog-wrapper
 *
 * @slot - content for the dialog
 * @fires secondary - Announces that the "secondary" button has been clicked.
 * @fires cancel - Announces that the "cancel" button has been clicked.
 * @fires confirm - Announces that the "confirm" button has been clicked.
 * @fires close - Announces that the dialog has been closed.
 */
export class DialogWrapper extends FocusVisiblePolyfillMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
        return [modalWrapperStyles, modalStyles];
    }

    @property({ type: Boolean, reflect: true })
    public error = false;

    @property({ attribute: 'cancel-label' })
    public cancelLabel = '';

    @property({ attribute: 'confirm-label' })
    public confirmLabel = '';

    @property({ type: Boolean, reflect: true })
    public dismissable = false;

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
    public size?: 's' | 'm' | 'l';

    @property({ attribute: 'secondary-label' })
    public secondaryLabel = '';

    @property()
    public headline = '';

    @property({ type: Boolean })
    public responsive = false;

    private transitionPromise = Promise.resolve();

    private resolveTransitionPromise = (): void => {
        return;
    };

    @property({ type: Boolean })
    public underlay = false;

    @query('sp-dialog')
    private dialog!: Dialog;

    public override focus(): void {
        if (this.shadowRoot) {
            const firstFocusable = firstFocusableIn(this.dialog);
            if (firstFocusable) {
                if (firstFocusable.updateComplete) {
                    firstFocusable.updateComplete.then(() =>
                        firstFocusable.focus()
                    );
                    /* c8 ignore next 3 */
                } else {
                    firstFocusable.focus();
                }
                this.removeAttribute('tabindex');
            } else {
                this.dialog.focus();
            }
            /* c8 ignore next 3 */
        } else {
            super.focus();
        }
    }

    public overlayWillCloseCallback(): boolean {
        if (!this.open) return false;
        this.close();
        return true;
    }

    private dismiss(): void {
        if (!this.dismissable) {
            return;
        }
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

    protected handleClose(event: Event): void {
        event.stopPropagation();
        this.close();
    }

    public close(): void {
        this.open = false;
    }

    private dispatchClosed(): void {
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
            })
        );
    }

    protected handleUnderlayTransitionend(event: TransitionEvent): void {
        if (!this.open && event.propertyName === 'visibility') {
            this.dispatchClosed();
            this.resolveTransitionPromise();
        }
    }

    protected handleModalTransitionend(): void {
        if (this.open || !this.underlay) {
            this.resolveTransitionPromise();
            if (!this.open) {
                this.dispatchClosed();
            }
        }
    }

    protected override update(changes: PropertyValues<this>): void {
        if (changes.has('open') && changes.get('open') !== undefined) {
            this.transitionPromise = new Promise(
                (res) => (this.resolveTransitionPromise = res)
            );
        }
        super.update(changes);
    }

    protected override render(): TemplateResult {
        return html`
            ${this.underlay
                ? html`
                      <sp-underlay
                          ?open=${this.open}
                          @click=${this.dismiss}
                          @transitionend=${this.handleUnderlayTransitionend}
                      ></sp-underlay>
                  `
                : html``}
            <div
                class="modal ${this.mode}"
                @transitionend=${this.handleModalTransitionend}
            >
                <sp-dialog
                    ?dismissable=${this.dismissable}
                    ?no-divider=${this.noDivider}
                    ?error=${this.error}
                    mode=${ifDefined(this.mode ? this.mode : undefined)}
                    size=${ifDefined(this.size ? this.size : undefined)}
                    @close=${this.handleClose}
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
                                      this.heroLabel
                                          ? this.heroLabel
                                          : undefined
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
                                  variant="accent"
                                  slot="button"
                                  @click=${this.clickConfirm}
                              >
                                  ${this.confirmLabel}
                              </sp-button>
                          `
                        : html``}
                </sp-dialog>
            </div>
        `;
    }

    protected override updated(changes: PropertyValues<this>): void {
        if (changes.has('open')) {
            if (this.open) {
                this.dialog.updateComplete.then(() => {
                    this.dialog.shouldManageTabOrderForScrolling();
                });
            } else {
                this.tabIndex = 0;
            }
        }
    }

    /**
     * Bind the open/close transition into the update complete lifecycle so
     * that the overlay system can wait for it to be "visibly ready" before
     * attempting to throw focus into the content contained herein. Not
     * waiting for this can cause small amounts of page scroll to happen
     * while opening the Tray when focusable content is included: e.g. Menu
     * elements whose selected Menu Item is not the first Menu Item.
     */
    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        await this.transitionPromise;
        return complete;
    }
}
