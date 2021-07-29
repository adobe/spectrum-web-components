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
    html,
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
    SizedMixin,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/button/sp-clear-button.js';

import styles from './tag.css.js';

/**
 * @element sp-tags
 */
export class Tag extends SizedMixin(SpectrumElement, {
    validSizes: ['s', 'm', 'l'],
}) {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public deletable = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public readonly = false;

    private get hasIcon(): boolean {
        return !!this.querySelector('[slot="icon"]');
    }

    private get hasAvatar(): boolean {
        return !!this.querySelector('[slot="avatar"]');
    }

    constructor() {
        super();
        this.addEventListener('focusin', this.handleFocusin);
    }

    private handleFocusin = (): void => {
        this.addEventListener('focusout', this.handleFocusout);
        this.addEventListener('keydown', this.handleKeydown);
    };

    private handleFocusout = (): void => {
        this.removeEventListener('keydown', this.handleKeydown);
        this.removeEventListener('focusout', this.handleFocusout);
    };

    private handleKeydown = (event: KeyboardEvent): void => {
        if (!this.deletable) {
            return;
        }
        const { code } = event;
        switch (code) {
            case 'Backspace':
            case 'Space':
            case 'Delete':
                this.delete();
                return;
            default:
                return;
        }
    };

    private delete(): void {
        if (this.readonly) {
            return;
        }
        this.dispatchEvent(
            new Event('delete', {
                bubbles: true,
            })
        );
    }

    protected render(): TemplateResult {
        const slots: TemplateResult[] = [];
        if (this.hasAvatar) {
            slots.push(
                html`
                    <slot name="avatar"></slot>
                `
            );
        }
        if (this.hasIcon) {
            slots.push(
                html`
                    <slot name="icon"></slot>
                `
            );
        }
        return html`
            ${slots}
            <span class="label"><slot></slot></span>
            ${this.deletable
                ? html`
                      <sp-clear-button
                          class="clear-button"
                          ?disabled=${this.disabled}
                          label="Remove"
                          small
                          tabindex="-1"
                          @click=${this.delete}
                      ></sp-clear-button>
                  `
                : html``}
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'listitem');
        }
        if (this.deletable) {
            this.setAttribute(
                'tabindex',
                !this.disabled && this.matches(':first-of-type:not([disabled])')
                    ? '0'
                    : '-1'
            );
        }
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
            }
        }
    }
}
