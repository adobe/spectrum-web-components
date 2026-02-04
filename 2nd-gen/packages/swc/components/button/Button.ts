/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { CSSResultArray, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';

import {
    BUTTON_STATIC_COLORS,
    BUTTON_TREATMENTS,
    BUTTON_VARIANTS_S2,
    ButtonBase,
    type ButtonVariantS2 as ButtonVariant,
} from '@spectrum-web-components/core/components/button';

import styles from './button.css';

/**
 * A button allows users to perform an action or to navigate to another page.
 * Buttons have multiple styles for various needs and are ideal for calling
 * attention to where a user needs to do something to move forward in a flow.
 *
 * @element swc-button
 *
 * @example
 * <swc-button variant="accent">Edit</swc-button>
 *
 * @example
 * <swc-button variant="primary" treatment="outline">Cancel</swc-button>
 *
 * @example
 * <swc-button variant="negative" href="/delete" target="_blank">
 *   Delete
 * </swc-button>
 */
export class Button extends ButtonBase {
    // ────────────────────
    //     API OVERRIDES
    // ────────────────────

    /**
     * @internal
     */
    static override readonly VARIANTS = BUTTON_VARIANTS_S2;

    /**
     * @internal
     */
    static override readonly TREATMENTS = BUTTON_TREATMENTS;

    /**
     * @internal
     */
    static override readonly STATIC_COLORS = BUTTON_STATIC_COLORS;

    /**
     * The visual variant of the button.
     */
    @property({ type: String, reflect: true })
    public override variant: ButtonVariant = 'accent';

    // ──────────────────────
    //     CONSTRUCTOR
    // ──────────────────────

    constructor() {
        super();
    }

    // ──────────────────────────────
    //     RENDERING & STYLING
    // ──────────────────────────────

    public static override get styles(): CSSResultArray {
        return [styles];
    }

    protected override render(): TemplateResult {
        const isLink = this.href && this.href.length > 0;

        return isLink ? this.renderAsLink() : this.renderAsButton();
    }

    private renderAsButton(): TemplateResult {
        return html`
            <div
                class=${classMap({
                    ['swc-Button']: true,
                    [`swc-Button--${this.variant}`]:
                        typeof this.variant !== 'undefined',
                    [`swc-Button--${this.treatment}`]:
                        typeof this.treatment !== 'undefined',
                    [`swc-Button--size${this.size?.toUpperCase()}`]:
                        this.size != null,
                    ['swc-Button--iconOnly']: this.hasIcon && !this.hasLabel,
                    ['swc-Button--noWrap']: this.noWrap,
                    [`swc-Button--static${
                        this.staticColor
                            ? this.staticColor.charAt(0).toUpperCase() +
                              this.staticColor.slice(1)
                            : ''
                    }`]: typeof this.staticColor !== 'undefined',
                })}
            >
                <button
                    ?disabled=${this.disabled}
                    type=${this.type}
                    aria-label=${this.label || this.pendingLabel}
                >
                ${this.renderButtonContent()}
                </button>
            </div>
        `;
    }

    private renderAsLink(): TemplateResult {
        return html`
            ${this.renderButtonContent()}
            ${this.renderAnchor({
                id: 'anchor',
                className: 'swc-Button-anchor',
                ariaHidden: true,
                tabindex: -1,
            })}
        `;
    }

    private renderButtonContent(): TemplateResult {
        return html`
            ${when(
                this.hasIcon,
                () => html`
                    <slot
                        name="icon"
                        class=${classMap({
                            ['swc-Button-icon']: true,
                        })}
                    ></slot>
                `
            )}
            <span class="swc-Button-label">
                <slot></slot>
            </span>
            ${this.pendingStateController.renderPendingState()}
        `;
    }
}
