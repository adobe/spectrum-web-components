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
import '@spectrum-web-components/underlay/sp-underlay.js';
import { firstFocusableIn } from '@spectrum-web-components/shared/src/first-focusable-in.js';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import modalStyles from '@spectrum-web-components/modal/src/modal.css.js';
import styles from './tray.css.js';

/**
 * The `Tray` component is a custom web component that provides a tray element
 * which can be opened and closed. It includes various properties and methods
 * to manage its state, focus, and transitions.
 *
 * @element sp-tray
 *
 * @fires close - Dispatched when the tray is closed.
 */
export class Tray extends SpectrumElement {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [modalStyles, styles];
    }

    /**
     * Indicates whether the tray is open.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * Controller to manage the user's motion preference.
     */
    protected prefersMotion = new MatchMediaController(
        this,
        '(prefers-reduced-motion: no-preference)'
    );

    /**
     * Promise to manage the transition state.
     */
    private transitionPromise = Promise.resolve();

    /**
     * Function to resolve the transition promise.
     */
    private resolveTransitionPromise: () => void = () => {};

    /**
     * Query to select the tray element.
     */
    @query('.tray')
    private tray!: HTMLDivElement;

    /**
     * Sets focus on the first focusable element within the tray.
     */
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

    /**
     * Tracks whether the tray is currently animating.
     */
    private animating = false;

    /**
     * Callback to handle the overlay close event.
     */
    public overlayWillCloseCallback(): boolean {
        if (!this.open) return this.animating;

        this.close();

        return true;
    }

    /**
     * Closes the tray.
     */
    public close(): void {
        this.open = false;

        if (!this.prefersMotion.matches) {
            this.dispatchClosed();
        }
    }

    /**
     * Dispatches the 'close' event.
     */
    private dispatchClosed(): void {
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
            })
        );
    }

    /**
     * Handles the transition end event for the underlay.
     *
     * This method resolves the transition promise and dispatches the 'close' event
     * if the tray is not open.
     */
    protected handleUnderlayTransitionend(): void {
        if (!this.open) {
            this.resolveTransitionPromise();
            this.dispatchClosed();
        }
    }

    /**
     * Handles the transitionend event for the tray.
     *
     * This method resolves the transition promise if the tray is open.
     */
    protected handleTrayTransitionend(): void {
        if (this.open) {
            this.resolveTransitionPromise();
        }
    }

    /**
     * Lifecycle method called when the component updates.
     *
     * This method sets up the transition promise if the 'open' property has changed
     * and the user prefers motion.
     */
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

    /**
     * Renders the content of the tray component.
     *
     * This method returns a template result containing the underlay and tray elements.
     */
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
                <slot></slot>
            </div>
        `;
    }

    /**
     * Binds the open/close transition into the update complete lifecycle.
     *
     * This method ensures that the overlay system waits for the tray to be visibly ready
     * before attempting to throw focus into the content contained within.
     */
    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;

        await this.transitionPromise;

        return complete;
    }
}
