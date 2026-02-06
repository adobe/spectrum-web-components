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
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ButtonBase } from './ButtonBase.js';
import buttonStyles from './button.css.js';
import { PendingStateController } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';

export type DeprecatedButtonVariants = 'cta' | 'overBackground';
export type ButtonStaticColors = 'white' | 'black';
export type ButtonVariants =
    | 'accent'
    | 'primary'
    | 'secondary'
    | 'negative'
    | ButtonStaticColors
    | DeprecatedButtonVariants;
export const VALID_VARIANTS = [
    'accent',
    'primary',
    'secondary',
    'negative',
    'white',
    'black',
];
export const VALID_STATIC_COLORS = ['white', 'black'];

export type ButtonTreatments = 'fill' | 'outline';

/**
 * @element sp-button
 *
 * @slot - text label of the Button
 * @slot icon - The icon to use for Button
 */
export class Button extends SizedMixin(ButtonBase, { noDefaultSize: true }) {
    public static override get styles(): CSSResultArray {
        return [...super.styles, buttonStyles];
    }

    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel = 'Pending';

    // Use this property to set the button into a pending state
    @property({ type: Boolean, reflect: true, attribute: true })
    public pending = false;

    public pendingStateController: PendingStateController<this>;

    /**
     * Initializes the `PendingStateController` for the Button component.
     * The `PendingStateController` manages the pending state of the Button.
     */
    constructor() {
        super();
        this.pendingStateController = new PendingStateController(this);
    }

    public override click(): void {
        if (this.pending) {
            return;
        }
        super.click();
    }

    /**
     * The visual variant to apply to this button.
     */
    @property()
    public get variant(): ButtonVariants {
        return this._variant;
    }
    public set variant(variant: ButtonVariants) {
        if (variant === this.variant) return;

        this.requestUpdate('variant', this.variant);
        switch (variant) {
            case 'cta':
                this._variant = 'accent';
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "cta" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "variant='accent'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button/#variants',
                        { level: 'deprecation' }
                    );
                }
                break;
            case 'overBackground':
                this.removeAttribute('variant');
                this.staticColor = 'white';
                this.treatment = 'outline';
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "overBackground" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "staticColor='white'" with "treatment='outline'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button',
                        { level: 'deprecation' }
                    );
                }
                return;
            case 'white':
                this.staticColor = 'white';
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "white" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='white'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button/api',
                        { level: 'deprecation' }
                    );
                }
                return;
            case 'black':
                this.staticColor = 'black';
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "black" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='black'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button/api',
                        { level: 'deprecation' }
                    );
                }
                return;
            case null:
                return;
            default:
                if (!VALID_VARIANTS.includes(variant)) {
                    this._variant = 'accent';
                } else {
                    this._variant = variant;
                }
                break;
        }
        this.setAttribute('variant', this.variant);
    }
    private _variant: ButtonVariants = 'accent';

    /**
     * The static color variant to use for this button.
     */
    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'black' | 'white';

    /**
     * The visual treatment to apply to this button.
     */
    @property({ reflect: true })
    public treatment: ButtonTreatments = 'fill';

    /**
     * Style this button to be less obvious
     */
    @property({ type: Boolean })
    public set quiet(quiet: boolean) {
        this.treatment = quiet ? 'outline' : 'fill';
    }

    /**
     * Disables text wrapping within the button component's label.
     * Please note that this option is not a part of the design specification
     * and should be used carefully, with consideration of this overflow behavior
     * and the readability of the button's content.
     */
    @property({ type: Boolean, attribute: 'no-wrap', reflect: true })
    public noWrap = false;

    public get quiet(): boolean {
        return this.treatment === 'outline';
    }

    protected override firstUpdated(changes: PropertyValues<this>): void {
        super.firstUpdated(changes);
        // There is no Spectrum design context for an `<sp-button>` without a variant
        // apply one manually when a consumer has not applied one themselves.

        if (!this.hasAttribute('variant')) {
            this.setAttribute('variant', this.variant);
        }
        if (this.pending) {
            this.pendingStateController.hostUpdated();
        }
    }

    protected override renderButton(): TemplateResult {
        return html`
            ${this.buttonContent}
            ${this.pendingStateController.renderPendingState()}
        `;
    }
}
