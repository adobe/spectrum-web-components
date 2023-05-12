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
    'sp-tooltip',
]) {
    public static override get styles(): CSSResultArray {
        return [buttonStyles];
    }

    @property({ type: Boolean, reflect: true })
    public active = false;

    @property({ type: String })
    public type: 'button' | 'submit' | 'reset' = 'button';

    @query('.anchor')
    private anchorElement!: HTMLButtonElement;

    public override get focusElement(): HTMLElement {
        return this;
    }

    protected get hasLabel(): boolean {
        return this.slotHasContent;
    }

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

    public override click(): void {
        if (this.disabled) {
            return;
        }

        if (this.shouldProxyClick()) {
            return;
        }

        super.click();
    }

    private handleClickCapture(event: Event): void | boolean {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            return false;
        }
    }

    private proxyFocus(): void {
        this.focus();
    }

    private shouldProxyClick(): boolean {
        let handled = false;
        if (this.anchorElement) {
            this.anchorElement.click();
            handled = true;
        } else if (this.type !== 'button') {
            const proxy = document.createElement('button');
            proxy.type = this.type;
            this.insertAdjacentElement('afterend', proxy);
            proxy.click();
            proxy.remove();
            handled = true;
        }
        return handled;
    }

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

    protected renderButton(): TemplateResult {
        return html`
            ${this.buttonContent}
        `;
    }

    protected override render(): TemplateResult {
        return this.href && this.href.length > 0
            ? this.renderAnchor()
            : this.renderButton();
    }

    protected handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Space':
                event.preventDefault();
                if (typeof this.href === 'undefined') {
                    this.addEventListener('keyup', this.handleKeyup);
                    this.active = true;
                }
                break;
            default:
                break;
        }
    }

    private handleKeypress(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Enter':
            case 'NumpadEnter':
                this.click();
                break;
            default:
                break;
        }
    }

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

    private handleRemoveActive(): void {
        this.active = false;
    }

    private handlePointerdown(): void {
        this.active = true;
    }

    private manageAnchor(): void {
        if (this.href && this.href.length > 0) {
            if (this.getAttribute('role') === 'button') {
                this.setAttribute('role', 'link');
            }
            this.removeEventListener('click', this.shouldProxyClick);
        } else {
            if (
                !this.hasAttribute('role') ||
                this.getAttribute('role') === 'link'
            ) {
                this.setAttribute('role', 'button');
            }
            this.addEventListener('click', this.shouldProxyClick);
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
        this.addEventListener('pointerdown', this.handlePointerdown);
    }

    protected override updated(changed: PropertyValues): void {
        super.updated(changed);
        if (changed.has('href')) {
            this.manageAnchor();
        }
        if (changed.has('label')) {
            this.setAttribute('aria-label', this.label || '');
        }
        if (changed.has('active')) {
            if (this.active) {
                this.addEventListener('focusout', this.handleRemoveActive);
                this.addEventListener('pointerup', this.handleRemoveActive);
                this.addEventListener('pointercancel', this.handleRemoveActive);
                this.addEventListener('pointerleave', this.handleRemoveActive);
            } else {
                this.removeEventListener('focusout', this.handleRemoveActive);
                this.removeEventListener('pointerup', this.handleRemoveActive);
                this.removeEventListener(
                    'pointercancel',
                    this.handleRemoveActive
                );
                this.removeEventListener(
                    'pointerleave',
                    this.handleRemoveActive
                );
            }
        }
        if (this.anchorElement) {
            this.anchorElement.addEventListener('focus', this.proxyFocus);
            this.anchorElement.tabIndex = -1;
        }
    }
}
