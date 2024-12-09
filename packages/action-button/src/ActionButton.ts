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
import cornerTriangleOverrides from '@spectrum-web-components/icon/src/icon-corner-triangle-overrides.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-corner-triangle300.js';

/**
 * A mapping of size keys to corresponding CSS classes for the hold affordance icon.
 */
const holdAffordanceClass = {
    xs: 'spectrum-UIIcon-CornerTriangle75',
    s: 'spectrum-UIIcon-CornerTriangle75',
    m: 'spectrum-UIIcon-CornerTriangle100',
    l: 'spectrum-UIIcon-CornerTriangle200',
    xl: 'spectrum-UIIcon-CornerTriangle300',
};

/**
 * The duration (in milliseconds) required to trigger a long press event.
 */
export const LONGPRESS_DURATION = 300;

/**
 * A timeout identifier for the long press event.
 */
let LONGPRESS_TIMEOUT: ReturnType<typeof setTimeout>;

/**
 * The type definition for a long press event.
 * Indicates the source of the event, which can be either 'pointer' or 'keyboard'.
 */
export type LongpressEvent = {
    source: 'pointer' | 'keyboard';
};

/**
 * @element sp-action-button
 *
 * @slot - The text label of the Action Button.
 * @slot icon - The icon to use for the Action Button.
 * @fires change - Announces a change in the `selected` property of an action button.
 * @fires longpress - Synthesizes a "longpress" interaction that signifies a
 * `pointerdown` event that is >=300ms or a keyboard event where code is `Space` or code is `ArrowDown`
 * while `altKey===true`.
 */
export class ActionButton extends SizedMixin(ButtonBase, {
    validSizes: ['xs', 's', 'm', 'l', 'xl'],
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [
            ...super.styles,
            buttonStyles,
            cornerTriangleStyles,
            cornerTriangleOverrides,
        ];
    }

    /**
     * When true, the action button is styled with emphasis.
     */
    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    /**
     * When true, the action button displays a hold affordance icon.
     */
    @property({ type: Boolean, reflect: true, attribute: 'hold-affordance' })
    public holdAffordance = false;

    /**
     * When true, the action button is styled with a quieter appearance.
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;

    /**
     * The ARIA role of the action button.
     * Defaults to 'button'.
     */
    @property({ reflect: true })
    public override role = 'button';

    /**
     * Indicates whether the action button is in a selected state.
     * When true, the action button has `aria-pressed='true'`.
     */
    @property({ type: Boolean, reflect: true })
    public selected = false;

    /**
     * Whether to automatically manage the `selected` attribute on interaction.
     * When true, `aria-pressed="false"` is used when `selected === false`.
     */
    @property({ type: Boolean, reflect: true })
    public toggles = false;

    /**
     * The static color variant to use for the action button.
     * Can be 'white' or 'black'.
     */
    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'white' | 'black';

    /**
     * The value associated with the action button.
     * If not set, defaults to the text content of the button.
     */
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
     * Retrieves the text content of the action button.
     */
    public get itemText(): string {
        return (this.textContent || /* c8 ignore next */ '').trim();
    }

    constructor() {
        super();
        this.addEventListener('click', this.onClick);
    }

    /**
     * Handles the click event on the action button.
     * Toggles the selected state if the button is configured to toggle.
     * Dispatches a 'change' event to notify listeners of the state change.
     * If the event is canceled, the selected state is reverted.
     */
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

    /**
     * Handles the pointerdown event to display the hold affordance icon.
     * Sets up event listeners for pointerup and pointercancel events.
     * Dispatches a 'longpress' event if the pointer is held down for the duration of LONGPRESS_DURATION.
     */
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

    /**
     * Handles the pointerup event to clear the hold affordance timeout.
     * Removes the event listeners for pointerup and pointercancel events.
     */
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
     * Handles the keydown event to manage the hold affordance icon.
     * Prevents default behavior for Space or Alt+ArrowDown keys and sets up the keyup event listener.
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

    /**
     * Handles the keyup event to dispatch a 'longpress' event.
     * Stops propagation for Space or Alt+ArrowDown keys and dispatches the event.
     */
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

    /**
     * Gets the content to be rendered inside the button.
     * Adds the hold affordance icon if the holdAffordance property is true.
     */
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

    /**
     * Called when the element is updated.
     * Updates the aria-pressed attribute based on the selected and role properties.
     * Adds or removes event listeners for the hold affordance based on the holdAffordance property.
     */
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
