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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import styles from './underlay.css.js';

/**
 * @element sp-underlay
 *
 * @fires close - Dispatched when the underlay is clicked, allowing the consuming pattern to decide whether to close based on that interaction.
 */
export class Underlay extends SpectrumElement {
    /**
     * Returns the styles to be applied to the component.
     *
     * @override
     * @returns {CSSResultArray} The styles for the component.
     */
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    // Flag to track whether a click event can be processed.
    private canClick = false;

    /**
     * Indicates whether the underlay is open.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     *
     * @type {boolean}
     */
    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * Dispatches a 'close' event when the underlay is clicked.
     *
     * @override
     */
    public override click(): void {
        this.dispatchEvent(new Event('close'));
    }

    /**
     * Handles the pointerdown event.
     *
     * This method sets the canClick flag to true, indicating that a click event can be processed.
     *
     * @protected
     */
    protected handlePointerdown(): void {
        this.canClick = true;
    }

    /**
     * Handles the pointerup event.
     *
     * This method checks if the canClick flag is true and, if so, calls the click method to dispatch
     * the close event. It then resets the canClick flag to false.
     *
     * @protected
     */
    protected handlePointerup(): void {
        if (this.canClick) {
            this.click();
        }
        this.canClick = false;
    }

    /**
     * Renders the content of the underlay component.
     *
     * This method returns an empty template result.
     *
     * @protected
     * @override
     * @returns {TemplateResult} The template result containing the underlay content.
     */
    protected override render(): TemplateResult {
        return html``;
    }

    /**
     * Lifecycle method called after the component's DOM has been rendered for the first time.
     *
     * This method sets up event listeners for pointerdown and pointerup events.
     *
     * @protected
     * @override
     */
    protected override firstUpdated(): void {
        this.addEventListener('pointerdown', this.handlePointerdown);
        this.addEventListener('pointerup', this.handlePointerup);
    }
}
