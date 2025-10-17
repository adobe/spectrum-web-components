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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/underlay/sp-underlay.js';
import { firstFocusableIn } from '@spectrum-web-components/shared/src/first-focusable-in.js';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';

import modalStyles from '@spectrum-web-components/modal/src/modal.css.js';
import styles from './tray.css.js';

/**
 * @element sp-tray
 *
 * @slot - content to display within the Tray
 *
 * @fires close - Announces that the Tray has been closed.
 */
export class Tray extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [modalStyles, styles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    protected prefersMotion = new MatchMediaController(
        this,
        '(prefers-reduced-motion: no-preference)'
    );

    private transitionPromise = Promise.resolve();

    private resolveTransitionPromise = () => {};

    @query('.tray')
    private tray!: HTMLDivElement;

    public override focus(): void {
        const firstFocusable = firstFocusableIn(this);
        if (firstFocusable) {
            firstFocusable.focus();
        } else if (this.children.length === 1) {
            this.tray.focus();
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

    public close(): void {
        this.open = false;
        if (!this.prefersMotion.matches) {
            this.dispatchClosed();
        }
    }

    /**
     * Returns a visually hidden dismiss button for mobile screen reader accessibility.
     * This button is placed before and after tray content to allow mobile screen reader
     * users (particularly VoiceOver on iOS) to easily dismiss the overlay.
     */
    protected get dismissHelper(): TemplateResult {
        return html`
            <div class="visually-hidden">
                <button
                    tabindex="-1"
                    aria-label="Dismiss"
                    @click=${this.close}
                ></button>
            </div>
        `;
    }

    private dispatchClosed(): void {
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
            })
        );
    }

    protected handleUnderlayTransitionend(): void {
        if (!this.open) {
            this.resolveTransitionPromise();
            this.dispatchClosed();
        }
    }

    protected handleTrayTransitionend(): void {
        if (this.open) {
            this.resolveTransitionPromise();
        }
    }

    protected override update(changes: PropertyValues<this>): void {
        if (
            changes.has('open') &&
            changes.get('open') !== undefined &&
            this.prefersMotion.matches
        ) {
            this.animating = true;
            this.transitionPromise = new Promise((res) => {
                this.resolveTransitionPromise = () => {
                    this.animating = false;
                    res();
                };
            });
        }
        super.update(changes);
    }

    protected override render(): TemplateResult {
        return html`
            <sp-underlay
                ?open=${this.open}
                @close=${this.close}
                @transitionend=${this.handleUnderlayTransitionend}
            ></sp-underlay>
            <div
                class="tray modal"
                tabindex="-1"
                @transitionend=${this.handleTrayTransitionend}
            >
                ${this.dismissHelper}
                <slot></slot>
                ${this.dismissHelper}
            </div>
        `;
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
