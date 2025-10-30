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
    nothing,
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import '@spectrum-web-components/button/sp-clear-button.js';

import styles from './tag.css.js';

/**
 * @element sp-tag
 *
 * @slot - text content for labeling the tag
 * @slot avatar - an avatar element to display within the Tag
 * @slot icon - an icon element to display within the Tag
 */
export class Tag extends SizedMixin(SpectrumElement, {
    validSizes: ['s', 'm', 'l'],
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public deletable = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public readonly = false;

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
        if (!this.deletable || this.disabled) {
            return;
        }
        const { code } = event;

        switch (code) {
            case 'Backspace':
            case 'Space':
            case 'Delete':
                this.delete();
            default:
                return;
        }
    };

    private delete(): void {
        if (this.readonly) {
            return;
        }
        const applyDefault = this.dispatchEvent(
            new Event('delete', {
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
        if (!applyDefault) {
            return;
        }
        this.remove();
    }

    protected override render(): TemplateResult {
        return html`
            <slot name="avatar"></slot>
            <slot name="icon"></slot>
            <span class="label"><slot></slot></span>
            ${this.deletable
                ? html`
                      <sp-clear-button
                          class="clear-button"
                          ?disabled=${this.disabled}
                          label="Remove"
                          size="s"
                          tabindex="-1"
                          @click=${this.delete}
                      ></sp-clear-button>
                  `
                : nothing}
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'listitem');
        }
        if (this.deletable) {
            this.setAttribute('tabindex', '0');
        }
    }

    protected override updated(changes: PropertyValues): void {
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
