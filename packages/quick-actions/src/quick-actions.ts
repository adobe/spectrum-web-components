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
    CSSResultArray,
    TemplateResult,
    LitElement,
    property,
    PropertyValues,
} from 'lit-element';

import quickActionsSyles from './quick-actions.css.js';

export const entrances = ['left', 'right'];

export class QuickActions extends LitElement {
    public static get styles(): CSSResultArray {
        return [quickActionsSyles];
    }

    private closeAction = -1;

    /**
     * `enterFrom` applies specific styling when set to `left` or `right`.
     * `enter-from` attribute is removed when not matching one of the above.
     *
     * @param {String} variant
     */
    @property({ type: String, reflect: true, attribute: 'enter-from' })
    public set enterFrom(enterFrom: string) {
        if (enterFrom === this.enterFrom) {
            return;
        }
        if (entrances.includes(enterFrom)) {
            this.setAttribute('enter-from', enterFrom);
            this._enterFrom = enterFrom;
            return;
        }
        this.removeAttribute('enter-from');
        this._enterFrom = '';
    }

    public get enterFrom(): string {
        return this._enterFrom;
    }

    private _enterFrom = '';

    @property({ type: Boolean, reflect: true })
    public opened = false;

    @property({ type: Boolean, reflect: true })
    public overlay = false;

    @property({ type: Boolean, attribute: false })
    private isShiftTabbing = false;

    public close(): void {
        this.closeAction = requestAnimationFrame(() => (this.opened = false));
    }

    public open(): void {
        cancelAnimationFrame(this.closeAction);
        this.opened = true;
    }

    private get renderContents(): TemplateResult[] {
        const contents = [
            html`
                <slot></slot>
            `,
            html`
                <div id="actions">
                    <slot name="action"></slot>
                </div>
            `,
        ];
        return this.isShiftTabbing ? contents.reverse() : contents;
    }

    protected render(): TemplateResult {
        return html`
            <div
                id="contents"
                @focusin=${this.open}
                @focusout=${this.close}
                @mouseenter=${this.open}
                @mouseleave=${this.close}
            >
                ${this.renderContents}
                ${this.overlay && this.opened
                    ? html`
                          <div id="overlay"></div>
                      `
                    : html``}
            </div>
        `;
    }

    protected firstUpdated(): void {
        this.addEventListener('keydown', (event) => {
            if (
                !event.defaultPrevented &&
                event.shiftKey &&
                event.code === 'Tab'
            ) {
                this.isShiftTabbing = true;
            }
        });
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('opened') && !this.opened && this.isShiftTabbing) {
            this.isShiftTabbing = this.opened;
        }
    }
}
