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
    CSSResultArray,
    query,
    PropertyValues,
} from '@spectrum-web-components/base';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import {
    ObserveSlotText,
    ObserveSlotPresence,
} from '@spectrum-web-components/shared';
import buttonStyles from './button-base.css.js';

export class ButtonBase extends LikeAnchor(
    ObserveSlotText(ObserveSlotPresence(Focusable, '[slot="icon"]'))
) {
    public static get styles(): CSSResultArray {
        return [buttonStyles];
    }

    protected get hasIcon(): boolean {
        return this.slotContentIsPresent;
    }

    @property({ type: Boolean, reflect: true })
    public active = false;

    @property({ type: String })
    public type: 'button' | 'submit' | 'reset' = 'button';

    @property({ type: Boolean, reflect: true, attribute: 'icon-right' })
    protected iconRight = false;

    protected get hasLabel(): boolean {
        return this.slotHasContent;
    }

    @query('.anchor')
    private anchorElement!: HTMLButtonElement;

    public get focusElement(): HTMLElement {
        return this;
    }

    protected get buttonContent(): TemplateResult[] {
        const icon = html`
            <slot name="icon"></slot>
        `;
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
        if (!this.hasIcon) {
            return content;
        }
        this.iconRight ? content.push(icon) : content.unshift(icon);
        return content;
    }

    constructor() {
        super();

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

    protected renderButton(): TemplateResult {
        return html`
            ${this.buttonContent}
        `;
    }

    protected render(): TemplateResult {
        return this.href && this.href.length > 0
            ? this.renderAnchor({
                  id: 'button',
                  className: 'button anchor',
                  anchorContent: this.buttonContent,
              })
            : this.renderButton();
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Space':
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

    private handleKeyup(event: KeyboardEvent): void {
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

    private handleFocusout(): void {
        this.active = false;
    }

    private manageRole(): void {
        if (this.href && this.href.length > 0) {
            this.removeAttribute('role');
        } else if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'button');
        }
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        if (!this.hasAttribute('tabindex')) {
            this.tabIndex = 0;
        }
        this.manageRole();
        this.addEventListener('click', this.shouldProxyClick);
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('keypress', this.handleKeypress);
    }

    protected updated(changed: PropertyValues): void {
        super.updated(changed);
        if (changed.has('href')) {
            this.manageRole();
        }
        if (changed.has('label')) {
            this.setAttribute('aria-label', this.label || '');
        }
        if (changed.has('active')) {
            if (this.active) {
                this.addEventListener('focusout', this.handleFocusout);
            } else {
                this.removeEventListener('focusout', this.handleFocusout);
            }
        }
        if (this.anchorElement) {
            this.anchorElement.tabIndex = -1;
        }
    }
}
