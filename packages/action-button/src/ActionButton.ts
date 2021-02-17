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
    property,
    PropertyValues,
    TemplateResult,
    SizedMixin,
    ElementSize,
} from '@spectrum-web-components/base';
import { ButtonBase } from '@spectrum-web-components/button';
import buttonStyles from './action-button.css.js';
import '@spectrum-web-components/icon/sp-icon.js';
import cornerTriangleStyles from '@spectrum-web-components/icon/src/spectrum-icon-corner-triangle.css.js';
import { CornerTriangle300Icon } from '@spectrum-web-components/icons-ui';

const holdAffordanceClass = {
    s: 'spectrum-UIIcon-CornerTriangle75',
    m: 'spectrum-UIIcon-CornerTriangle100',
    l: 'spectrum-UIIcon-CornerTriangle200',
    xl: 'spectrum-UIIcon-CornerTriangle300',
};

const LONGPRESS_DURATION = 300;
let LONGPRESS_TIMEOUT: ReturnType<typeof setTimeout>;

export type LongpressEvent = {
    source: 'pointer' | 'keyboard';
};

type ActionButtonSize = Exclude<ElementSize, 'xxl'>;

/**
 * @element sp-card
 *
 * @fires change - Announces a change in the `selected` property of an action button
 * @fires longpress - Synthesizes a "longpress" interaction that signifies a
 * `pointerdown` event that is >=300ms or a keyboard event wher code is `Space` or code is `ArrowDown`
 * while `altKey===true`.
 */
export class ActionButton extends SizedMixin(ButtonBase) {
    public static get styles(): CSSResultArray {
        return [buttonStyles, cornerTriangleStyles];
    }

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    @property({ type: Boolean, reflect: true, attribute: 'hold-affordance' })
    public holdAffordance = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Boolean, reflect: true })
    public toggles = false;

    @property({ type: String })
    public get value(): string {
        return this._value || this.itemText;
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

    /**
     * @private
     */
    public get itemText(): string {
        return (this.textContent || /* c8 ignore next */ '').trim();
    }

    constructor() {
        super();
        this.addEventListener('click', this.onClick);
        this.addEventListener('pointerdown', this.onPointerdown);
    }

    private onClick = (): void => {
        if (!this.toggles) {
            return;
        }
        this.selected = !this.selected;
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
            })
        );
        if (!applyDefault) {
            this.selected = !this.selected;
        }
    };

    private onPointerdown(): void {
        this.addEventListener('pointerup', this.onPointerup);
        this.addEventListener('pointercancel', this.onPointerup);
        LONGPRESS_TIMEOUT = setTimeout(() => {
            this.dispatchEvent(
                new CustomEvent<LongpressEvent>('longpress', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        source: 'pointer',
                    },
                })
            );
        }, LONGPRESS_DURATION);
    }

    private onPointerup(): void {
        clearTimeout(LONGPRESS_TIMEOUT);
        this.removeEventListener('pointerup', this.onPointerup);
        this.removeEventListener('pointercancel', this.onPointerup);
    }

    /**
     * @private
     */
    protected handleKeydown(event: KeyboardEvent): void {
        if (!this.holdAffordance) {
            return super.handleKeydown(event);
        }
        const { code, altKey } = event;
        if (code === 'Space' || (altKey && code === 'ArrowDown')) {
            event.preventDefault();
            if (code === 'ArrowDown') {
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
            this.addEventListener('keyup', this.handleKeyup);
            this.active = true;
        }
    }

    protected handleKeyup(event: KeyboardEvent): void {
        if (!this.holdAffordance) {
            return super.handleKeyup(event);
        }
        const { code, altKey } = event;
        if (code === 'Space' || (altKey && code === 'ArrowDown')) {
            event.stopPropagation();
            this.dispatchEvent(
                new CustomEvent<LongpressEvent>('longpress', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        source: 'keyboard',
                    },
                })
            );
            this.active = false;
        }
    }

    protected get buttonContent(): TemplateResult[] {
        const buttonContent = super.buttonContent;
        if (this.holdAffordance) {
            buttonContent.unshift(html`
                <sp-icon
                    id="hold-affordance"
                    class="${holdAffordanceClass[
                        this.size as ActionButtonSize
                    ]}"
                >
                    ${CornerTriangle300Icon()}
                </sp-icon>
            `);
        }
        return buttonContent;
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (this.toggles && changes.has('selected')) {
            this.focusElement.setAttribute(
                'aria-pressed',
                this.selected ? 'true' : 'false'
            );
        }
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        longpress: CustomEvent<LongpressEvent>;
    }
}
