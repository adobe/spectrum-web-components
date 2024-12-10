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
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import buttonStyles from './button-base.css.js';

/**
 * @slot - text content to be displayed in the Button element
 * @slot icon - icon element(s) to display at the start of the button
 */
export class ButtonBase extends ObserveSlotText(LikeAnchor(Focusable), '', [
    'sp-overlay,sp-tooltip',
]) {
    public static override get styles(): CSSResultArray {
        return [buttonStyles];
    }

    /**
     * Indicates whether the button is active.
     * This is not a 1:1 equivalent to the active state.
     */
    @property({ type: Boolean, reflect: true })
    public active = false;

    /**
     * The default behavior of the button.
     * Possible values are: `button` (default), `submit`, and `reset`.
     */
    @property({ type: String })
    public type: 'button' | 'submit' | 'reset' = 'button';

    /**
     * The name of the button.
     */
    @property({ type: String })
    public name = '';

    /**
     * The value of the button.
     */
    @property({ type: String })
    public value = '';

    /**
     * HTML anchor element that component clicks by proxy
     */
    @query('.anchor')
    private anchorElement!: HTMLAnchorElement;

    public override get focusElement(): HTMLElement {
        return this;
    }

    /**
     * Checks if the button has a label.
     */
    protected get hasLabel(): boolean {
        return this.slotHasContent;
    }

    /**
     * Retrieves the content to be rendered inside the button.
     * Includes the icon slot and the label slot.
     */
    protected get buttonContent(): TemplateResult[] {
        const content = [
            html`
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
            `,
            html`
                <span id="label">
                    <slot @slotchange=${this.manageTextObservedSlot}></slot>
                </span>
            `,
        ];
        return content;
    }

    constructor() {
        super();
        this.proxyFocus = this.proxyFocus.bind(this);

        this.addEventListener('click', this.handleClickCapture, {
            capture: true,
        });
    }

    /**
     * Handles the click event capture phase.
     * Prevents the default action and stops propagation if the button is disabled.
     * Proxies the click event if necessary.
     */
    private handleClickCapture(event: Event): void | boolean {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            return false;
        }

        if (this.shouldProxyClick()) {
            return;
        }
    }

    /**
     * Proxies the focus event to the button element.
     */
    private proxyFocus(): void {
        this.focus();
    }

    /**
     * Determines if the click event should be proxied.
     * Proxies the click event to the anchor element or creates a proxy button element if necessary.
     */
    private shouldProxyClick(): boolean {
        let handled = false;
        if (this.anchorElement) {
            // click HTML anchor element by proxy
            this.anchorElement.click();
            handled = true;
            // if the button type is `submit` or `reset`
        } else if (this.type !== 'button') {
            // create an HTML Button Element by proxy, click it, and remove it
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
     * Renders the anchor element for the button.
     * Includes the button content and the anchor element.
     */
    public override renderAnchor(): TemplateResult {
        return html`
            ${this.buttonContent}
            ${super.renderAnchor({
                id: 'button',
                ariaHidden: true,
                className: 'button anchor hidden',
            })}
        `;
    }

    /**
     * Renders the button content.
     * Includes the button content.
     */
    protected renderButton(): TemplateResult {
        return html`
            ${this.buttonContent}
        `;
    }

    /**
     * Renders the button or anchor element based on the href property.
     */
    protected override render(): TemplateResult {
        return this.href && this.href.length > 0
            ? this.renderAnchor()
            : this.renderButton();
    }

    /**
     * Handles the keydown event for the button.
     * Activates the button when the Space key is pressed.
     */
    protected handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Space':
                event.preventDefault();
                // allows button to activate when `Space` is pressed
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
     * Handles the keypress event for the button.
     * Activates the button or link when the Enter or NumpadEnter key is pressed.
     */
    private handleKeypress(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Enter':
            case 'NumpadEnter':
                // allows button or link to be activated with `Enter` and `NumpadEnter`
                this.click();
                break;
            default:
                break;
        }
    }

    /**
     * Handles the keyup event for the button.
     * Deactivates the button when the Space key is released.
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
     * Manages the role attribute for the anchor element.
     * Sets the role to 'link' if the href property is set, otherwise sets it to 'button'.
     */
    private manageAnchor(): void {
        // for a link
        if (this.href && this.href.length > 0) {
            // if the role is set to button
            if (
                !this.hasAttribute('role') ||
                this.getAttribute('role') === 'button'
            ) {
                // change role to link
                this.setAttribute('role', 'link');
            }
            // else for a button
        } else {
            // if the role is set to link
            if (
                !this.hasAttribute('role') ||
                this.getAttribute('role') === 'link'
            ) {
                // change role to button
                this.setAttribute('role', 'button');
            }
        }
    }

    protected override firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        if (!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', '0');
        }
        if (changed.has('label')) {
            if (this.label) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }
        this.manageAnchor();
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('keypress', this.handleKeypress);
    }

    protected override updated(changed: PropertyValues): void {
        super.updated(changed);
        if (changed.has('href')) {
            this.manageAnchor();
        }

        if (this.anchorElement) {
            this.anchorElement.addEventListener('focus', this.proxyFocus);
            this.anchorElement.tabIndex = -1;
        }
    }

    protected override update(changes: PropertyValues): void {
        super.update(changes);
        if (changes.has('label')) {
            if (this.label) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }
    }
}
