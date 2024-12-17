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
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/button/sp-close-button.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import actionBarStyles from './action-bar.css.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
export const actionBarVariants = ['sticky', 'fixed'];

/**
 * A `<sp-action-bar>` delivers a floating action bar that is a convenient way to deliver stateful actions
 * in cases like selection mode. `<sp-action-bar>` can be deployed in two variants beyond the default:
 * `[varient="fixed"]` to position the element in relation to the page, and `[variant=sticky]` to position
 * the content in relation to content that may scroll.
 *
 * @element sp-action-bar
 *
 * @slot - Content to display with the Action Bar
 *
 * @fires close - Announces that the action bar is closing
 */
export class ActionBar extends FocusVisiblePolyfillMixin(SpectrumElement) {
    /**
     * Retrieves the styles for the ActionBar component.
     *
     * @returns The styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [actionBarStyles];
    }

    /**
     * Deliver the Action Bar with additional visual emphasis.
     *
     * When `true`, the action bar is styled with emphasis.
     *
     * @type {boolean}
     */
    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    /**
     * When `flexible`, the action bar sizes itself to its content
     * rather than a specific width.
     *
     * @type {boolean}
     */
    @property({ type: Boolean, reflect: true })
    public flexible = false;

    /**
     * Indicates whether the action bar is open.
     * When true, the action bar is visible; otherwise, it is hidden.
     *
     * @type {boolean}
     */
    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * Applies specific styling when set to `sticky` or `fixed`.
     *
     * The `variant` attribute is removed when not matching one of the above.
     *
     * @type {'sticky' | 'fixed' | ''}
     */
    @property({ type: String })
    public set variant(variant: string) {
        if (variant === this.variant) {
            return;
        }

        if (actionBarVariants.includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;

            return;
        }

        this.removeAttribute('variant');
        this._variant = '';
    }

    public get variant(): string {
        return this._variant;
    }

    /**
     * Internal property to store the current variant of the action bar.
     *
     * @type {string}
     *
     * @private
     */
    private _variant = '';

    /**
     * Handles the click event on the close button.
     * Toggles the open state of the action bar and dispatches a 'close' event.
     * If the event is canceled, the open state is reverted.
     *
     * @fires close - Announces that the action bar is closing.
     */
    private handleClick(): void {
        this.open = false;

        const applyDefault = this.dispatchEvent(
            new Event('close', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        if (!applyDefault) {
            this.open = true;
        }
    }

    /**
     * Renders the action bar template.
     * Includes a popover with a close button, field label, and action group.
     *
     * @returns The rendered template for the action bar.
     */
    public override render(): TemplateResult {
        return html`
            <sp-popover ?open=${this.open} id="popover">
                <slot name="override">
                    <sp-close-button
                        static-color=${ifDefined(
                            this.emphasized ? 'white' : undefined
                        )}
                        class="close-button"
                        label="Clear selection"
                        @click=${this.handleClick}
                    ></sp-close-button>
                    <sp-field-label class="field-label">
                        <slot></slot>
                    </sp-field-label>
                    <sp-action-group
                        class="action-group"
                        quiet
                        static-color=${ifDefined(
                            this.emphasized ? 'white' : undefined
                        )}
                    >
                        <slot name="buttons"></slot>
                    </sp-action-group>
                </slot>
            </sp-popover>
        `;
    }
}
