/*
Copyright 2024 Adobe. All rights reserved.
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
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';

import styles from './breadcrumb-item.css.js';

export interface BreadcrumbSelectDetail {
    value: string;
}

export class BreadcrumbItem extends LikeAnchor(Focusable) {
    public static override get styles(): CSSResultArray {
        return [styles, chevronStyles];
    }

    @query('#anchor')
    anchorElement!: HTMLAnchorElement;

    @property({ type: String })
    public get value(): string {
        return this._value || '';
    }

    public set value(value: string) {
        if (value === this._value) {
            return;
        }
        this._value = value || '';
        if (this._value) {
            this.setAttribute('value', this._value);
        } else {
            this.removeAttribute('value');
        }
    }

    private _value = '';

    @property({ attribute: 'is-menu', type: Boolean })
    public isMenu = false;

    @property({ type: Boolean })
    public isLastOfType = false;

    public override get focusElement(): HTMLElement {
        return this.anchorElement || this;
    }

    protected handleClick(event?: Event): void {
        if (!this.href && event) {
            event.preventDefault();
        }

        if (!this.href || event?.defaultPrevented) {
            const selectDetail: BreadcrumbSelectDetail = {
                value: this.value,
            };

            const selectionEvent = new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: selectDetail,
            });

            this.dispatchEvent(selectionEvent);
        }
    }

    protected renderLink(): TemplateResult {
        if (this.isLastOfType) {
            return html`
                <span aria-current="page"><slot></slot></span>
            `;
        }

        return html`
            <a
                id="anchor"
                class="item-link"
                href=${this.href || '#'}
                tabindex="0"
                @click=${this.handleClick}
            >
                <slot></slot>
            </a>
        `;
    }

    private renderSeparator(): TemplateResult {
        return html`
            <sp-icon-chevron100
                part="separator"
                size="xs"
                class="separator spectrum-UIIcon-ChevronRight100"
            ></sp-icon-chevron100>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            ${this.isMenu
                ? html`
                      <slot></slot>
                  `
                : this.renderLink()}
            ${this.isLastOfType ? '' : this.renderSeparator()}
        `;
    }
}
