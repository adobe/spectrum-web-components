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
    TemplateResult,
} from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';

import styles from './breadcrumb-item.css.js';

export interface BreadcrumbSelectDetail {
    value: string;
}

export class BreadcrumbItem extends LikeAnchor(Focusable) {
    public static override get styles(): CSSResultArray {
        return [styles, chevronStyles];
    }

    @property()
    public value: string | undefined = undefined;

    /**
     * @private
     * Marks this breadcrumb item as the current route.
     */
    @property({ type: Boolean })
    public isLastOfType = false;

    public override get focusElement(): HTMLElement {
        return this.shadowRoot.querySelector('#item-link') as HTMLElement;
    }

    override connectedCallback(): void {
        super.connectedCallback();

        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'listitem');
        }
    }

    private announceSelected(value: string): void {
        const selectDetail: BreadcrumbSelectDetail = {
            value,
        };

        const selectionEvent = new CustomEvent('breadcrumb-select', {
            bubbles: true,
            composed: true,
            detail: selectDetail,
        });

        this.dispatchEvent(selectionEvent);
    }

    protected handleClick(event?: Event): void {
        if (!this.href && event) {
            event.preventDefault();
        }

        if (!this.href || event?.defaultPrevented) {
            if (this.value && !this.isLastOfType) {
                this.announceSelected(this.value);
            }
        }
    }

    protected handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleClick(event);
        }
    }

    protected renderLink(): TemplateResult {
        return html`
            <a
                id="item-link"
                href=${ifDefined(!this.isLastOfType ? this.href : undefined)}
                tabindex=${0}
                aria-current=${ifDefined(
                    this.isLastOfType ? 'page' : undefined
                )}
                @keydown=${this.handleKeyDown}
                @click=${this.handleClick}
            >
                <slot></slot>
            </a>
        `;
    }

    private renderSeparator(): TemplateResult {
        return html`
            <sp-icon-chevron100
                id="separator"
                size="xs"
                class="spectrum-UIIcon-ChevronRight100"
            ></sp-icon-chevron100>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            ${this.renderLink()}
            <slot name="menu"></slot>
            ${this.renderSeparator()}
        `;
    }

    protected override updated(changes: PropertyValues): void {
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
            }
        }
    }
}
