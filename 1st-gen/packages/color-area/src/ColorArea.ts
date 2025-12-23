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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { streamingListener } from '@spectrum-web-components/base/src/streaming-listener.js';
import { SWCResizeObserverEntry, WithSWCResizeObserver } from './types.js';
import type { ColorHandle } from '@spectrum-web-components/color-handle';
import '@spectrum-web-components/color-handle/sp-color-handle.js';

import {
    ColorController,
    ColorTypes,
} from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import {
    isAndroid,
    isIOS,
} from '@spectrum-web-components/shared/src/platform.js';

import styles from './color-area.css.js';

/**
 * @element sp-color-area
 * @slot gradient - a custom gradient visually outlining the available color values
 * @fires input - The value of the Color Area has changed.
 * @fires change - An alteration to the value of the Color Area has been committed by the user.
 */
export class ColorArea extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: String, attribute: 'label-x' })
    public labelX = 'saturation';

    @property({ type: String, attribute: 'label-y' })
    public labelY = 'luminosity';

    @query('.handle')
    private handle!: ColorHandle;

    private languageResolver = new LanguageResolutionController(this);

    /**
     * A controller for managing color interactions within the ColorArea component.
     *
     * The `ColorController` is instantiated with the `manageAs` option set to `hsv`
     * because the ColorArea component is designed to manipulate the saturation (`s`)
     * and value (`v`) components of the HSV color model along the x and y axes,
     * respectively. In the HSV color model:
     *
     * - The `hue` (h) represents the color type and is typically controlled by a separate input.
     * - The `saturation` (s) represents the intensity of the color, ranging from 0% (gray) to 100% (full color).
     * - The `value` (v) represents the brightness of the color, ranging from 0% (black) to 100% (full brightness).
     *
     * In the ColorArea component:
     *
     * - The x-axis controls the saturation (`s`), allowing users to adjust the intensity of the color.
     * - The y-axis controls the value (`v`), allowing users to adjust the brightness of the color.
     *
     * By managing the color as `hsv`, the ColorController can efficiently handle the changes in saturation and value
     * as the user interacts with the ColorArea component.
     *
     * @private
     * @type {ColorController}
     * @memberof ColorArea
     *
     * @property {ColorArea} this - The instance of the ColorArea component.
     * @property {Object} options - Configuration options for the ColorController.
     * @property {string} options.manageAs - Specifies the color model to manage, in this case 'hsv'.
     */
    private colorController = new ColorController(this, { manageAs: 'hsv' });

    @property({ type: Number })
    public get hue(): number {
        return this.colorController.hue;
    }

    public set hue(value: number) {
        this.colorController.hue = value;
    }

    @property({ type: String })
    public get value(): ColorTypes {
        return this.colorController.colorValue;
    }

    @property({ type: String })
    public get color(): ColorTypes {
        return this.colorController.colorValue;
    }

    public set color(color: ColorTypes) {
        this.colorController.color = color;
    }

    @property({ attribute: false })
    private activeAxis = 'x';

    @property({ type: Number })
    public get x(): number {
        return this.colorController.color.hsv.s / 100;
    }

    public set x(x: number) {
        if (x === this.x) {
            return;
        }
        const oldValue = this.x;
        if (this.inputX) {
            // Use the native `input[type='range']` control to validate this value after `firstUpdate`
            this.inputX.value = x.toString();
            this.colorController.color.set(
                's',
                this.inputX.valueAsNumber * 100
            );
        } else {
            this.colorController.color.set('s', x * 100);
        }
        this.requestUpdate('x', oldValue);
    }

    @property({ type: Number })
    public get y(): number {
        return this.colorController.color.hsv.v / 100;
    }

    public set y(y: number) {
        if (y === this.y) {
            return;
        }
        const oldValue = this.y;
        if (this.inputY) {
            // Use the native `input[type='range']` control to validate this value after `firstUpdate`
            this.inputY.value = y.toString();
            this.colorController.color.set(
                'v',
                this.inputY.valueAsNumber * 100
            );
        }
        this.requestUpdate('y', oldValue);
    }

    @property({ type: Number })
    public step = 0.01;

    @query('[name="x"]')
    public inputX!: HTMLInputElement;

    @query('[name="y"]')
    public inputY!: HTMLInputElement;

    private altered = 0;

    private activeKeys = new Set();

    private _valueChanged = false;

    public override focus(focusOptions: FocusOptions = {}): void {
        super.focus(focusOptions);
        this.forwardFocus();
    }

    private forwardFocus(): void {
        this.focused = this.hasVisibleFocusInTree();
        if (this.activeAxis === 'x') {
            this.inputX.focus();
        } else {
            this.inputY.focus();
        }
    }

    private handleFocus(): void {
        this.focused = true;
        this._valueChanged = false;
    }

    public handleBlur(): void {
        if (this._pointerDown) {
            return;
        }
        this.altered = 0;
        this.focused = false;
        this._valueChanged = false;
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        this.focused = true;

        this.altered = [event.shiftKey, event.ctrlKey, event.altKey].filter(
            (key) => !!key
        ).length;
        const isArrowKey =
            code.search('Arrow') === 0 ||
            code.search('Page') === 0 ||
            code.search('Home') === 0 ||
            code.search('End') === 0;
        if (isArrowKey) {
            event.preventDefault();
            this.activeKeys.add(code);
            this.handleKeypress();
        }
    }

    private handleKeypress(): void {
        let deltaX = 0;
        let deltaY = 0;
        const step = Math.max(this.step, this.altered * 5 * this.step);
        this.activeKeys.forEach((code) => {
            switch (code) {
                case 'ArrowUp':
                    deltaY = step;
                    break;
                case 'ArrowDown':
                    deltaY = step * -1;
                    break;
                case 'ArrowLeft':
                    deltaX = this.step * (this.dir === 'ltr' ? -1 : 1);
                    break;
                case 'ArrowRight':
                    deltaX = this.step * (this.dir === 'ltr' ? 1 : -1);
                    break;
                case 'PageUp':
                    deltaY = step * 10;
                    break;
                case 'PageDown':
                    deltaY = step * -10;
                    break;
                case 'Home':
                    deltaX = step * (this.dir === 'ltr' ? -10 : 10);
                    break;
                case 'End':
                    deltaX = step * (this.dir === 'ltr' ? 10 : -10);
                    break;
                /* c8 ignore next 2 */
                default:
                    break;
            }
        });
        if (deltaX != 0) {
            this.activeAxis = 'x';
            this.inputX.focus();
        } else if (deltaY != 0) {
            this.activeAxis = 'y';
            this.inputY.focus();
        }
        this.x = Math.min(1, Math.max(this.x + deltaX, 0));
        this.y = Math.min(1, Math.max(this.y + deltaY, 0));

        this.colorController.savePreviousColor();

        if (deltaX != 0 || deltaY != 0) {
            this._valueChanged = true;
            this.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                    composed: true,
                })
            );
            const applyDefault = this.dispatchEvent(
                new Event('change', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                })
            );
            if (!applyDefault) {
                this.colorController.restorePreviousColor();
            }
        }
    }

    private handleKeyup(event: KeyboardEvent): void {
        event.preventDefault();
        const { code } = event;
        this.activeKeys.delete(code);
    }

    private handleInput(event: Event & { target: HTMLInputElement }): void {
        const { valueAsNumber, name } = event.target;

        this[name as 'x' | 'y'] = valueAsNumber;
    }

    private handleChange(event: Event & { target: HTMLInputElement }): void {
        this.handleInput(event);
        this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
    }

    private boundingClientRect!: DOMRect;
    public _pointerDown = false;

    private handlePointerdown(event: PointerEvent): void {
        if (event.button !== 0) {
            event.preventDefault();
            return;
        }
        this._pointerDown = true;
        this.colorController.savePreviousColor();
        this.boundingClientRect = this.getBoundingClientRect();
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
        if (event.pointerType === 'mouse') {
            this.focused = true;
        }
    }

    private handlePointermove(event: PointerEvent): void {
        const [x, y] = this.calculateHandlePosition(event);

        this._valueChanged = false;

        this.x = x;
        this.y = y;

        this.dispatchEvent(
            new Event('input', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
    }

    private handlePointerup(event: PointerEvent): void {
        event.preventDefault();
        this._pointerDown = false;
        (event.target as HTMLElement).releasePointerCapture(event.pointerId);
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        this.inputX.focus();
        if (event.pointerType === 'mouse') {
            this.focused = false;
        }
        if (!applyDefault) {
            this.colorController.restorePreviousColor();
        }
    }

    /**
     * Returns the value under the cursor
     * @param: PointerEvent on slider
     * @return: Slider value that correlates to the position under the pointer
     */
    private calculateHandlePosition(event: PointerEvent): [number, number] {
        /* c8 ignore next 3 */
        if (!this.boundingClientRect) {
            return [this.x, this.y];
        }
        const rect = this.boundingClientRect;
        const minOffsetX = rect.left;
        const minOffsetY = rect.top;
        const offsetX = event.clientX;
        const offsetY = event.clientY;
        const width = rect.width;
        const height = rect.height;

        const percentX = Math.max(
            0,
            Math.min(1, (offsetX - minOffsetX) / width)
        );
        const percentY = Math.max(
            0,
            Math.min(1, (offsetY - minOffsetY) / height)
        );

        return [this.dir === 'ltr' ? percentX : 1 - percentX, 1 - percentY];
    }

    private handleAreaPointerdown(event: PointerEvent): void {
        if (event.button !== 0) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        this.handle.dispatchEvent(new PointerEvent('pointerdown', event));
        this.handlePointermove(event);
    }

    protected override render(): TemplateResult {
        const { width = 0, height = 0 } = this.boundingClientRect || {};

        const isMobile = isAndroid() || isIOS();
        const defaultAriaLabel = 'Color Picker';
        const ariaLabel = defaultAriaLabel;
        const ariaRoleDescription = ifDefined(
            isMobile ? undefined : '2d slider'
        );

        const ariaLabelX = this.labelX;
        const ariaLabelY = this.labelY;
        const ariaValueX = new Intl.NumberFormat(
            this.languageResolver.language,
            {
                style: 'percent',
                unitDisplay: 'narrow',
            }
        ).format(this.x);
        const ariaValueY = new Intl.NumberFormat(
            this.languageResolver.language,
            {
                style: 'percent',
                unitDisplay: 'narrow',
            }
        ).format(this.y);

        const style = {
            background: `linear-gradient(to top, black 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%),linear-gradient(to right, white 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%), hsl(${this.hue}, 100%, 50%);`,
        };

        return html`
            <div
                @pointerdown=${this.handleAreaPointerdown}
                class="gradient"
                style="background: ${style.background};"
            >
                <slot name="gradient"></slot>
            </div>

            <sp-color-handle
                tabindex=${ifDefined(this.focused ? undefined : '0')}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color=${this.colorController.getHslString()}
                ?disabled=${this.disabled}
                style=${`transform: translate(${
                    (this.dir === 'ltr' ? this.x : 1 - this.x) * width
                }px, ${height - this.y * height}px);`}
                ${streamingListener({
                    start: ['pointerdown', this.handlePointerdown],
                    streamInside: ['pointermove', this.handlePointermove],
                    end: [
                        ['pointerup', 'pointercancel', 'pointerleave'],
                        this.handlePointerup,
                    ],
                })}
            ></sp-color-handle>

            <fieldset
                class="fieldset"
                aria-label=${ifDefined(isMobile ? ariaLabel : undefined)}
            >
                <div role="presentation">
                    <input
                        type="range"
                        class="slider"
                        name="x"
                        aria-label=${isMobile
                            ? ariaLabelX
                            : `${ariaLabelX} ${ariaLabel}`}
                        aria-roledescription=${ariaRoleDescription}
                        aria-orientation="horizontal"
                        aria-valuetext=${isMobile
                            ? ariaValueX
                            : `${ariaValueX}, ${ariaLabelX}${
                                  this._valueChanged
                                      ? ''
                                      : `, ${ariaValueY}, ${ariaLabelY}`
                              }`}
                        min="0"
                        max="1"
                        step=${this.step}
                        tabindex="-1"
                        .value=${String(this.x)}
                        @input=${this.handleInput}
                        @change=${this.handleChange}
                    />
                </div>
                <div role="presentation">
                    <input
                        type="range"
                        class="slider"
                        name="y"
                        aria-label=${isMobile
                            ? ariaLabelY
                            : `${ariaLabelY} ${ariaLabel}`}
                        aria-roledescription=${ariaRoleDescription}
                        aria-orientation="vertical"
                        aria-valuetext=${isMobile
                            ? ariaValueY
                            : `${ariaValueY}, ${ariaLabelY}${
                                  this._valueChanged
                                      ? ''
                                      : `, ${ariaValueX}, ${ariaLabelX}`
                              }`}
                        orient="vertical"
                        min="0"
                        max="1"
                        step=${this.step}
                        tabindex="-1"
                        .value=${String(this.y)}
                        @input=${this.handleInput}
                        @change=${this.handleChange}
                    />
                </div>
            </fieldset>
        `;
    }

    protected override firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.boundingClientRect = this.getBoundingClientRect();

        this.addEventListener('focus', this.handleFocus);
        this.addEventListener('blur', this.handleBlur);
        this.addEventListener('keyup', this.handleKeyup);
        this.addEventListener('keydown', this.handleKeydown);
    }

    /**
     * Overrides the `updated` method to handle changes in property values.
     *
     * @param changed - A map of changed properties with their previous values.
     *
     * This method performs the following actions:
     * - Updates the saturation (`s`) of the color if `x` has changed.
     * - Updates the value (`v`) of the color if `y` has changed.
     * - If the `focused` property has changed and is now true, it lazily binds
     *   the `input[type="range"]` elements in shadow roots to prevent multiple
     *   tab stops within the Color Area for certain browser settings (e.g., Webkit).
     */
    protected override updated(changed: PropertyValues): void {
        super.updated(changed);
        if (this.x !== this.inputX.valueAsNumber) {
            this.colorController.color.set(
                's',
                this.inputX.valueAsNumber * 100
            );
        }
        if (this.y !== this.inputY.valueAsNumber) {
            this.colorController.color.set(
                'v',
                (1 - this.inputY.valueAsNumber) * 100
            );
        }
        if (changed.has('focused') && this.focused) {
            // Lazily bind the `input[type="range"]` elements in shadow roots
            // so that browsers with certain settings (Webkit) aren't allowed
            // multiple tab stops within the Color Area.
            const parentX = this.inputX.parentElement as HTMLDivElement;
            const parentY = this.inputY.parentElement as HTMLDivElement;
            if (!parentX.shadowRoot && !parentY.shadowRoot) {
                parentX.attachShadow({ mode: 'open' });
                parentY.attachShadow({ mode: 'open' });
                const slot = '<div tabindex="-1"><slot></slot></div>';
                (parentX.shadowRoot as unknown as ShadowRoot).innerHTML = slot;
                (parentY.shadowRoot as unknown as ShadowRoot).innerHTML = slot;
            }
        }
    }

    private observer?: WithSWCResizeObserver['ResizeObserver'];

    public override connectedCallback(): void {
        super.connectedCallback();
        if (
            !this.observer &&
            (window as unknown as WithSWCResizeObserver).ResizeObserver
        ) {
            this.observer = new (
                window as unknown as WithSWCResizeObserver
            ).ResizeObserver((entries: SWCResizeObserverEntry[]) => {
                for (const entry of entries) {
                    this.boundingClientRect = entry.contentRect;
                }
                this.requestUpdate();
            });
        }
        this.observer?.observe(this);
    }

    public override disconnectedCallback(): void {
        this.observer?.unobserve(this);
        super.disconnectedCallback();
    }
}
