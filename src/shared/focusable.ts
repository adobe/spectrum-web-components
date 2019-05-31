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
import { LitElement, property } from 'lit-element';

export default class Focusable extends LitElement {
    @property({ type: Boolean, reflect: true })
    public disabled: boolean = false;

    @property({ type: Boolean })
    public autofocus: boolean = false;

    @property({ type: Number, reflect: true })
    public tabIndex: number = 0;

    private isShiftTabbing: boolean = false;
    private newTabindex: number | undefined;
    private oldTabindex: number | undefined;

    public constructor() {
        super();
    }

    public get focusElement(): HTMLElement {
        return this;
    }

    public focus(): void {
        if (this.disabled) {
            return;
        }

        this.focusElement.focus();
    }

    public blur(): void {
        this.focusElement.blur();
    }

    protected firstUpdated(): void {
        if (!this.hasAttribute('tabindex')) {
            this.tabIndex = 0;
        }

        if (this.autofocus) {
            this.focus();
        }

        this.focusElement.addEventListener('change', () => this.handleChange());

        this.addEventListener('focusin', (event) => {
            if (event.composedPath()[0] === this) {
                this.handleFocus();
            }
        });

        this.addEventListener('keydown', (event) => {
            if (
                !event.defaultPrevented &&
                event.shiftKey &&
                event.keyCode === 9
            ) {
                this.isShiftTabbing = true;
                HTMLElement.prototype.focus.apply(this);
                setTimeout(() => (this.isShiftTabbing = false), 0);
            }
        });
    }

    protected update(changedProperties: Map<string, boolean>): void {
        if (changedProperties.has('disabled')) {
            this.handleDisabledChanged(this.disabled, changedProperties.get(
                'disabled'
            ) as boolean);
        }

        if (changedProperties.has('tabIndex')) {
            // save value of tabindex, as it can be overridden to
            // undefined in case if the element is disabled
            this.newTabindex = this.tabIndex;
            this.handleTabIndexChanged(this.tabIndex);
        }

        super.update(changedProperties);
    }

    protected updated(
        changedProperties: Map<string, boolean | number | string>
    ): void {
        super.updated(changedProperties);

        if (changedProperties.has('disabled')) {
            if (this.focusElement instanceof HTMLInputElement) {
                this.focusElement.disabled = this.disabled;
            }
            if (this.disabled) {
                this.blur();
            }
        }

        if (
            changedProperties.has('tabIndex') &&
            this.newTabindex !== undefined
        ) {
            this.focusElement.tabIndex = this.newTabindex;
            this.newTabindex = undefined;
        }
    }

    private handleFocus(): void {
        if (this.isShiftTabbing) {
            return;
        }

        this.focusElement.focus();
    }

    public get shadowTabIndex(): number {
        if (this.disabled) {
            return -1;
        }
        return this.tabIndex;
    }

    private handleDisabledChanged(
        disabled: boolean,
        oldDisabled: boolean
    ): void {
        if (disabled) {
            this.oldTabindex = this.tabIndex;
            this.tabIndex = -1;
            this.setAttribute('aria-disabled', 'true');
        } else if (oldDisabled) {
            if (this.oldTabindex !== undefined) {
                this.tabIndex = this.oldTabindex;
            }
            this.removeAttribute('aria-disabled');
        }
    }

    private handleTabIndexChanged(tabindex: number | undefined): void {
        if (this.disabled && tabindex) {
            if (this.tabIndex !== -1) {
                this.oldTabindex = this.tabIndex;
            }
            this.tabIndex = -1;
        }
    }

    public handleChange(): void {}
}
