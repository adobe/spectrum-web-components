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
 * @element sp-action-bar
 * @slot - Content to display with the Action Bar
 */
export class ActionBar extends FocusVisiblePolyfillMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
        return [actionBarStyles];
    }

    /**
     * Deliver the Action Bar with additional visual emphasis.
     */
    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    /**
     * When `flexible` the action bar sizes itself to its content
     * rather than a specific width.
     *
     * @param {Boolean} flexible
     */
    @property({ type: Boolean, reflect: true })
    public flexible = false;

    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * The variant applies specific styling when set to `sticky` or `fixed`.
     * `variant` attribute is removed when not matching one of the above.
     *
     * @param {String} variant
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

    private _variant = '';

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
