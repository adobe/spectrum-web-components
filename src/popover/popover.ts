/*
Copyright 2018 Adobe. All rights reserved.
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
    LitElement,
    property,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import popoverStyles from './popover.css.js';

export class Popover extends LitElement {
    public static is = 'sp-popover';

    public static get styles(): CSSResultArray {
        return [popoverStyles];
    }

    @property()
    public type = '';

    @property({ type: Number, reflect: true })
    public tabindex = 0;

    @property({ type: Boolean })
    public mouseover = false;

    @property({ type: Boolean, reflect: true })
    public get open(): boolean {
        return this._open;
    }

    public set open(value: boolean) {
        const oldValue = this.open;

        if (value) {
            this.focus();
        }

        this._open = value;
        this.requestUpdate('open', oldValue);
    }

    private _open = false;

    public constructor() {
        super();

        this.addEventListener('blur', (ev: Event) => this.onBlur(ev));
        this.addEventListener('mouseover', () => this.onMouseOver());
        this.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    private onMouseOver(): void {
        this.mouseover = true;
    }

    private onMouseLeave(): void {
        this.mouseover = false;
        this.focus();
    }

    private onBlur(ev: Event): void {
        //Detect a click outside of the popover
        if (!this.mouseover) {
            const clickOutEvent = new CustomEvent('click-out', {
                bubbles: true,
                composed: true,
                detail: ev,
            });

            this.dispatchEvent(clickOutEvent);
        }
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
            <div id="tip"></div>
        `;
    }
}
