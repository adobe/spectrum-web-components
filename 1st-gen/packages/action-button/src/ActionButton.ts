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
    DefaultElementSize,
    html,
    PropertyValues,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ButtonBase } from '@spectrum-web-components/button';
import buttonStyles from './action-button.css.js';
import cornerTriangleStyles from '@spectrum-web-components/icon/src/spectrum-icon-corner-triangle.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-corner-triangle300.js';

const holdAffordanceClass = {
    xs: 'spectrum-UIIcon-CornerTriangle75',
    s: 'spectrum-UIIcon-CornerTriangle75',
    m: 'spectrum-UIIcon-CornerTriangle100',
    l: 'spectrum-UIIcon-CornerTriangle200',
    xl: 'spectrum-UIIcon-CornerTriangle300',
};

export const LONGPRESS_DURATION = 300;
let LONGPRESS_TIMEOUT: ReturnType<typeof setTimeout>;

export type LongpressEvent = {
    source: 'pointer' | 'keyboard';
};

/**
 * @element sp-action-button
 *
 * @slot - text label of the Action Button
 * @slot icon - The icon to use for Action Button
 * @fires change - Announces a change in the `selected` property of an action button
 * @fires longpress - Synthesizes a "longpress" interaction that signifies a
 * `pointerdown` event that is >=300ms or a keyboard event where code is `Space` or code is `ArrowDown`
 * while `altKey===true`.
 */
export class ActionButton extends SizedMixin(ButtonBase, {
    validSizes: ['xs', 's', 'm', 'l', 'xl'],
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [...super.styles, buttonStyles, cornerTriangleStyles];
    }

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    @property({ type: Boolean, reflect: true, attribute: 'hold-affordance' })
    public holdAffordance = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ reflect: true })
    public override role = 'button';

    /**
     * Whether an Action Button with `role='button'`
     * should also be `aria-pressed='true'`
     */
    @property({ type: Boolean, reflect: true })
    public selected = false;

    /**
     * Whether to automatically manage the `selected`
     * attribute on interaction and whether `aria-pressed="false"`
     * should be used when `selected === false`
     */
    @property({ type: Boolean, reflect: true })
    public toggles = false;

    /**
     * The static color variant to use for the action button.
     */
    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'white' | 'black';

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
    }

    private onClick = (): void => {
        if (!this.toggles) {
            return;
        }
        this.selected = !this.selected;
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );
        if (!applyDefault) {
            this.selected = !this.selected;
        }
    };

    private handlePointerdownHoldAffordance(event: PointerEvent): void {
        if (event.button !== 0) return;
        this.addEventListener('pointerup', this.handlePointerupHoldAffordance);
        this.addEventListener(
            'pointercancel',
            this.handlePointerupHoldAffordance
        );
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

    private handlePointerupHoldAffordance(): void {
        clearTimeout(LONGPRESS_TIMEOUT);
        this.removeEventListener(
            'pointerup',
            this.handlePointerupHoldAffordance
        );
        this.removeEventListener(
            'pointercancel',
            this.handlePointerupHoldAffordance
        );
    }

    /**
     * @private
     */
    protected override handleKeydown(event: KeyboardEvent): void {
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

    protected override handleKeyup(event: KeyboardEvent): void {
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

    protected override get buttonContent(): TemplateResult[] {
        const buttonContent = super.buttonContent;
        if (this.holdAffordance) {
            buttonContent.unshift(html`
                <sp-icon-corner-triangle300
                    class="hold-affordance ${holdAffordanceClass[
                        this.size as DefaultElementSize
                    ]}"
                ></sp-icon-corner-triangle300>
            `);
        }
        return buttonContent;
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        const isButton = this.role === 'button';
        const canBePressed =
            isButton &&
            (this.selected || this.toggles) &&
            !(
                this.hasAttribute('aria-haspopup') &&
                this.hasAttribute('aria-expanded')
            );
        if (changes.has('selected') || changes.has('role')) {
            // When role !== 'button' then the Action Button is within
            // an Action Group that manages selects which means the
            // Action Button is a "checkbox" or "radio" and cannot
            // accept the `aria-pressed` attribute.
            if (canBePressed) {
                this.setAttribute(
                    'aria-pressed',
                    this.selected ? 'true' : 'false'
                );
            } else {
                // When !this.toggles the lack of "aria-pressed" is inconsequential.
                this.removeAttribute('aria-pressed');
                if (
                    isButton &&
                    this.toggles &&
                    this.hasAttribute('aria-expanded')
                ) {
                    this.setAttribute(
                        'aria-expanded',
                        this.selected ? 'true' : 'false'
                    );
                }
            }
        }
        if (changes.has('holdAffordance')) {
            if (this.holdAffordance) {
                this.addEventListener(
                    'pointerdown',
                    this.handlePointerdownHoldAffordance
                );
            } else {
                this.removeEventListener(
                    'pointerdown',
                    this.handlePointerdownHoldAffordance
                );
                this.handlePointerupHoldAffordance();
            }
        }
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        longpress: CustomEvent<LongpressEvent>;
    }
}
