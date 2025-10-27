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
    nothing,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import '@spectrum-web-components/underlay/sp-underlay.js';
import '@spectrum-web-components/button/sp-button.js';

// Leveraged in build systems that use aliasing to prevent multiple registrations: https://github.com/adobe/spectrum-web-components/pull/3225
// Get around lint error by importing locally for now. Not required for actual change.
import '../sp-dialog.js';
import modalWrapperStyles from '@spectrum-web-components/modal/src/modal-wrapper.css.js';
import modalStyles from '@spectrum-web-components/modal/src/modal.css.js';
import { Dialog } from './Dialog.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared';
import { firstFocusableIn } from '@spectrum-web-components/shared/src/first-focusable-in.js';

/**
 * @element sp-dialog-base
 *
 * @slot - A Dialog element to display.
 * @fires close - Announces that the dialog has been closed.
 */
export class DialogBase extends FocusVisiblePolyfillMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
        return [modalWrapperStyles, modalStyles];
    }

    @property({ type: Boolean, reflect: true })
    public dismissable = false;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: String, reflect: true })
    public mode?: 'fullscreen' | 'fullscreenTakeover';

    /**
     * When set to true, fills screens smaller than 350px high and 400px wide with the full dialog.
     */
    @property({ type: Boolean })
    public responsive = false;

    private transitionPromise = Promise.resolve();

    private resolveTransitionPromise = (): void => {
        return;
    };

    @property({ type: Boolean })
    public underlay = false;

    protected get dialog(): Dialog {
        const dialog = (
            this.shadowRoot.querySelector('slot') as HTMLSlotElement
        ).assignedElements()[0] as Dialog;
        if (window.__swc.DEBUG) {
            if (!dialog) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> expects to be provided dialog content via its default slot.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/dialog-base/#dialog'
                );
            }
        }
        return dialog || this;
    }

    public override async focus(): Promise<void> {
        if (this.shadowRoot) {
            const firstFocusable = firstFocusableIn(this.dialog);
            if (firstFocusable) {
                if ((firstFocusable as SpectrumElement).updateComplete) {
                    await firstFocusable.updateComplete;
                }
                firstFocusable.focus();
            } else {
                this.dialog.focus();
            }
            /* c8 ignore next 3 */
        } else {
            super.focus();
        }
    }

    private animating = false;

    public overlayWillCloseCallback(): boolean {
        if (!this.open) return this.animating;
        this.close();
        return true;
    }

    private dismiss(): void {
        if (!this.dismissable) {
            return;
        }
        this.close();
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

    private handleTransitionEvent(event: TransitionEvent): void {
        this.dispatchEvent(
            new TransitionEvent(event.type, {
                bubbles: true,
                composed: true,
                propertyName: event.propertyName,
            })
        );
    }

    protected handleUnderlayTransitionend(event: TransitionEvent): void {
        if (!this.open && event.propertyName === 'visibility') {
            this.resolveTransitionPromise();
        }
        this.handleTransitionEvent(event);
    }

    protected handleModalTransitionend(event: TransitionEvent): void {
        if (this.open || !this.underlay) {
            this.resolveTransitionPromise();
        }
        this.handleTransitionEvent(event);
    }

    protected override update(changes: PropertyValues<this>): void {
        if (changes.has('open') && changes.get('open') !== undefined) {
            this.animating = true;
            this.transitionPromise = new Promise((res) => {
                this.resolveTransitionPromise = () => {
                    this.animating = false;
                    res();
                };
            });
            if (!this.open) {
                this.dispatchClosed();
            }
        }
        super.update(changes);
    }

    protected renderDialog(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            ${this.underlay
                ? html`
                      <sp-underlay
                          ?open=${this.open}
                          @close=${this.dismiss}
                          @transitionrun=${this.handleTransitionEvent}
                          @transitionend=${this.handleUnderlayTransitionend}
                          @transitioncancel=${this.handleTransitionEvent}
                      ></sp-underlay>
                  `
                : nothing}
            <div
                class="modal ${this.mode}"
                @transitionrun=${this.handleTransitionEvent}
                @transitionend=${this.handleModalTransitionend}
                @transitioncancel=${this.handleTransitionEvent}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `;
    }

    protected override updated(changes: PropertyValues<this>): void {
        if (changes.has('open')) {
            if (this.open) {
                if (
                    'updateComplete' in this.dialog &&
                    'shouldManageTabOrderForScrolling' in this.dialog
                ) {
                    this.dialog.updateComplete.then(() => {
                        this.dialog.shouldManageTabOrderForScrolling();
                    });
                }
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
