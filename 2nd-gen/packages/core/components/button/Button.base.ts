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

import { PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';

import {
    SizedMixin,
    SpectrumElement,
} from '@spectrum-web-components/core/shared/base';
import { LikeAnchor } from '@spectrum-web-components/core/shared/like-anchor.js';
import { ObserveSlotPresence } from '@spectrum-web-components/core/shared/observe-slot-presence.js';
import { ObserveSlotText } from '@spectrum-web-components/core/shared/observe-slot-text.js';
import {
    HostWithPendingState,
    PendingStateController,
} from '@spectrum-web-components/core/shared/pending-state-controller.js';

import {
    BUTTON_STATIC_COLORS,
    BUTTON_TREATMENTS,
    BUTTON_VARIANTS_DEPRECATED,
    type ButtonStaticColor,
    type ButtonTreatment,
    type ButtonType,
    type ButtonVariant,
    type ButtonVariantS2,
} from './Button.types.js';

/**
 * Abstract base class for Button components.
 * Provides shared functionality for both S1 and S2 button implementations.
 *
 * @slot - Text label of the button
 * @slot icon - Icon element(s) to display at the start of the button
 */
export abstract class ButtonBase
    extends SizedMixin(
        ObserveSlotText(
            ObserveSlotPresence(LikeAnchor(SpectrumElement), '[slot="icon"]'),
            ''
        ),
        { noDefaultSize: true }
    )
    implements HostWithPendingState
{
    // ─────────────────────────
    //     API TO OVERRIDE
    // ─────────────────────────

    /**
     * @internal
     *
     * A readonly array of the valid button variants.
     *
     * This is an actual internal property, intended not for customer use
     * but for use in internal validation logic, stories, tests, etc.
     *
     * Because S1 and S2 support different variants, the value of this
     * property must be overridden in each subclass.
     */
    static readonly VARIANTS: readonly string[];

    /**
     * @internal
     *
     * A readonly array of deprecated button variants (S1 only).
     */
    static readonly VARIANTS_DEPRECATED: readonly string[] =
        BUTTON_VARIANTS_DEPRECATED;

    /**
     * @internal
     *
     * A readonly array of the valid button treatments.
     */
    static readonly TREATMENTS: readonly string[] = BUTTON_TREATMENTS;

    /**
     * @internal
     *
     * A readonly array of the valid static colors.
     */
    static readonly STATIC_COLORS: readonly string[] = BUTTON_STATIC_COLORS;

    // ──────────────────
    //     SHARED API
    // ──────────────────

    /**
     * The visual variant of the button.
     */
    @property({ type: String, reflect: true })
    public variant: ButtonVariant = 'accent';

    /**
     * The treatment style of the button (fill or outline).
     */
    @property({ type: String, reflect: true })
    public treatment: ButtonTreatment = 'fill';

    /**
     * Static color variant for use over backgrounds.
     */
    @property({ type: String, reflect: true, attribute: 'static-color' })
    public staticColor?: ButtonStaticColor;

    /**
     * Disable this control. It will not receive focus or events.
     */
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    /**
     * The button is currently being activated (e.g., Space key pressed).
     */
    @property({ type: Boolean, reflect: true })
    public active = false;

    /**
     * The button is in a pending state.
     */
    @property({ type: Boolean, reflect: true })
    public pending = false;

    /**
     * Custom accessible label for pending state.
     */
    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel = 'Pending';

    /**
     * Prevents text wrapping within the button label.
     */
    @property({ type: Boolean, attribute: 'no-wrap', reflect: true })
    public noWrap = false;

    /**
     * The form button type.
     */
    @property({ type: String })
    public type: ButtonType = 'button';

    /**
     * @internal
     * HTML anchor element that component clicks by proxy
     */
    @query('.anchor')
    protected anchorElement!: HTMLAnchorElement;

    /**
     * @internal
     * Controller for managing pending state
     */
    public pendingStateController: PendingStateController<this>;

    // ──────────────────────
    //     IMPLEMENTATION
    // ──────────────────────

    constructor() {
        super();
        this.pendingStateController = new PendingStateController(this);
        this.proxyFocus = this.proxyFocus.bind(this);

        this.addEventListener('click', this.handleClickCapture, {
            capture: true,
        });
    }

    /**
     * @internal
     * Indicates if the button has a text label.
     */
    protected get hasLabel(): boolean {
        return this.slotHasContent;
    }

    /**
     * @internal
     * Indicates if the button has an icon.
     */
    protected get hasIcon(): boolean {
        return this.slotContentIsPresent;
    }

    /**
     * Prevent clicks when disabled or pending.
     */
    public override click(): void {
        if (this.disabled || this.pending) {
            return;
        }
        super.click();
    }

    /**
     * Prevent focus when disabled.
     */
    public override focus(options?: FocusOptions): void {
        if (this.disabled) {
            return;
        }
        super.focus(options);
    }

    /**
     * @internal
     */
    private handleClickCapture(event: Event): void | boolean {
        if (this.disabled || this.pending) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            return false;
        }

        if (this.shouldProxyClick(event as MouseEvent)) {
            return;
        }
    }

    /**
     * @internal
     */
    private proxyFocus(): void {
        this.focus();
    }

    /**
     * @internal
     * Handle proxied clicks for links and form submissions.
     */
    private shouldProxyClick(event?: MouseEvent): boolean {
        let handled = false;

        // Don't proxy clicks with modifier keys (Command/Meta, Ctrl, Shift, Alt)
        if (
            event &&
            (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        ) {
            return false;
        }

        if (this.anchorElement) {
            // Click HTML anchor element by proxy, but only for non-modified clicks
            this.anchorElement.click();
            handled = true;
        } else if (this.type !== 'button') {
            // Create an HTML Button Element by proxy, click it, and remove it
            const proxy = document.createElement('button');
            proxy.type = this.type;
            this.insertAdjacentElement('afterend', proxy);
            proxy.click();
            proxy.remove();
            handled = true;
        }
        return handled;
    }

    /**
     * @internal
     * Handle keydown events for Space key activation.
     */
    protected handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Space':
                event.preventDefault();
                // Allows button to activate when `Space` is pressed
                if (typeof this.href === 'undefined') {
                    this.addEventListener('keyup', this.handleKeyup);
                    this.active = true;
                }
                break;
            default:
                break;
        }
    }

    /**
     * @internal
     * Handle keypress events for Enter key activation.
     */
    protected handleKeypress(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Enter':
            case 'NumpadEnter':
                // Allows button or link to be activated with `Enter` and `NumpadEnter`
                this.click();
                break;
            default:
                break;
        }
    }

    /**
     * @internal
     * Handle keyup events for Space key activation.
     */
    protected handleKeyup(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Space':
                this.removeEventListener('keyup', this.handleKeyup);
                this.active = false;
                this.click();
                break;
            default:
                break;
        }
    }

    /**
     * @internal
     * Manage role attribute based on href presence.
     */
    private manageAnchor(): void {
        // For a link
        if (this.href && this.href.length > 0) {
            // If the role is set to button
            if (
                !this.hasAttribute('role') ||
                this.getAttribute('role') === 'button'
            ) {
                // Change role to link
                this.setAttribute('role', 'link');
            }
        } else {
            // For a button
            if (
                !this.hasAttribute('role') ||
                this.getAttribute('role') === 'link'
            ) {
                // Change role to button
                this.setAttribute('role', 'button');
            }
        }
    }

    /**
     * @internal
     * Handle deprecated variant values.
     */
    protected handleDeprecatedVariant(
        variant: ButtonVariant
    ): ButtonVariantS2 | undefined {
        switch (variant) {
            case 'cta':
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "cta" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "variant='accent'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button/#variants',
                        { level: 'deprecation' }
                    );
                }
                return 'accent';
            case 'overBackground':
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "overBackground" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='white'" with "treatment='outline'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button/#variants',
                        { level: 'deprecation' }
                    );
                }
                this.staticColor = 'white';
                this.treatment = 'outline';
                return undefined; // Clear variant
            case 'white':
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "white" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='white'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button/#variants',
                        { level: 'deprecation' }
                    );
                }
                this.staticColor = 'white';
                return undefined; // Clear variant
            case 'black':
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "black" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='black'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button/#variants',
                        { level: 'deprecation' }
                    );
                }
                this.staticColor = 'black';
                return undefined; // Clear variant
            default:
                return variant as ButtonVariantS2;
        }
    }

    protected override firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);

        if (!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', '0');
        }

        this.manageAnchor();
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('keypress', this.handleKeypress);
    }

    protected override update(changedProperties: PropertyValues): void {
        super.update(changedProperties);

        if (changedProperties.has('disabled')) {
            if (this.disabled) {
                this.blur();
                this.setAttribute('tabindex', '-1');
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
                if (!this.hasAttribute('tabindex')) {
                    this.setAttribute('tabindex', '0');
                }
            }
        }

        if (window.__swc?.DEBUG) {
            const constructor = this.constructor as typeof ButtonBase;
            if (!constructor.VARIANTS.includes(this.variant)) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
                    'https://opensource.adobe.com/spectrum-web-components/components/button/#variants',
                    {
                        issues: [...constructor.VARIANTS],
                    }
                );
            }
        }
    }

    protected override updated(changed: PropertyValues): void {
        super.updated(changed);

        if (changed.has('href')) {
            this.manageAnchor();
        }

        if (changed.has('label')) {
            if (this.label) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }

        if (this.anchorElement) {
            // Ensure the anchor element is not focusable directly via tab
            this.anchorElement.tabIndex = -1;

            // Make sure it has proper ARIA attributes
            if (!this.anchorElement.hasAttribute('aria-hidden')) {
                this.anchorElement.setAttribute('aria-hidden', 'true');
            }

            // Set up focus delegation
            this.anchorElement.addEventListener('focus', this.proxyFocus);
        }
    }
}
