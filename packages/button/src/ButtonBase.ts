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
    property,
    html,
    TemplateResult,
    query,
    PropertyValues,
} from '@spectrum-web-components/base';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import {
    ObserveSlotText,
    ObserveSlotPresence,
} from '@spectrum-web-components/shared';

export class ButtonBase extends LikeAnchor(
    ObserveSlotText(ObserveSlotPresence(Focusable, '[slot="icon"]'))
) {
    protected get hasIcon(): boolean {
        return this.slotContentIsPresent;
    }

    @property({ type: Boolean, reflect: true })
    public active = false;

    @property({ type: String })
    public type: 'button' | 'submit' | 'reset' = 'button';

    protected get hasLabel(): boolean {
        return this.slotHasContent;
    }

    @query('.anchor')
    private anchorElement!: HTMLButtonElement;

    public get focusElement(): HTMLElement {
        return this;
    }

    protected get buttonContent(): TemplateResult[] {
        const content = [
            html`
                <div id="label" ?hidden=${!this.hasLabel}>
                    <slot
                        id="slot"
                        @slotchange=${this.manageTextObservedSlot}
                    ></slot>
                </div>
            `,
        ];
        if (this.hasIcon) {
            content.unshift(html`
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
            `);
        }
        return content;
    }

    constructor() {
        super();
        this.proxyFocus = this.proxyFocus.bind(this);

        this.addEventListener('click', this.handleClickCapture, {
            capture: true,
        });
    }

    public click(): void {
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

    public renderAnchor(): TemplateResult {
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

    protected render(): TemplateResult {
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
            this.removeAttribute('role');
            this.removeEventListener('click', this.shouldProxyClick);
        } else if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'button');
            this.addEventListener('click', this.shouldProxyClick);
        }
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        if (!this.hasAttribute('tabindex')) {
            this.tabIndex = 0;
        }
        this.manageAnchor();
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('keypress', this.handleKeypress);
        this.addEventListener('pointerdown', this.handlePointerdown);
    }

    protected updated(changed: PropertyValues): void {
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
                this.addEventListener('pointerleave', this.handleRemoveActive);
            } else {
                this.removeEventListener('focusout', this.handleRemoveActive);
                this.removeEventListener('pointerup', this.handleRemoveActive);
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
