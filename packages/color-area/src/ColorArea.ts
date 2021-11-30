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
import { SWCResizeObserverEntry, WithSWCResizeObserver } from './types';
import {
    ColorHandle,
    ColorValue,
    extractHueAndSaturationRegExp,
    replaceHueRegExp,
} from '@spectrum-web-components/color-handle';
import '@spectrum-web-components/color-handle/sp-color-handle.js';
import { TinyColor } from '@ctrl/tinycolor';

import styles from './color-area.css.js';

/**
 * @element sp-color-area
 * @slot gradient - a custom gradient visually outlining the available color values
 * @fires input - The value of the Color Area has changed.
 * @fires change - An alteration to the value of the Color Area has been committed by the user.
 */
export class ColorArea extends SpectrumElement {
    public static get styles(): CSSResultArray {
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

    @property({ type: Number })
    public get hue(): number {
        return this._hue;
    }

    public set hue(value: number) {
        const hue = Math.min(360, Math.max(0, value));
        if (hue === this.hue) {
            return;
        }
        const oldValue = this.hue;
        const { s, v } = this._color.toHsv();
        this._color = new TinyColor({ h: hue, s, v });
        this._hue = hue;
        this.requestUpdate('hue', oldValue);
    }

    private _hue = 0;

    @property({ type: String })
    public get value(): ColorValue {
        return this.color;
    }

    @property({ type: String })
    public get color(): ColorValue {
        switch (this._format.format) {
            case 'rgb':
                return this._format.isString
                    ? this._color.toRgbString()
                    : this._color.toRgb();
            case 'prgb':
                return this._format.isString
                    ? this._color.toPercentageRgbString()
                    : this._color.toPercentageRgb();
            case 'hex8':
                return this._format.isString
                    ? this._color.toHex8String()
                    : this._color.toHex8();
            case 'name':
                return this._color.toName() || this._color.toRgbString();
            case 'hsl':
                if (this._format.isString) {
                    const hslString = this._color.toHslString();
                    return hslString.replace(replaceHueRegExp, `$1${this.hue}`);
                } else {
                    const { s, l, a } = this._color.toHsl();
                    return { h: this.hue, s, l, a };
                }
            case 'hsv':
                if (this._format.isString) {
                    const hsvString = this._color.toHsvString();
                    return hsvString.replace(replaceHueRegExp, `$1${this.hue}`);
                } else {
                    const { s, v, a } = this._color.toHsv();
                    return { h: this.hue, s, v, a };
                }
            case 'hex':
            case 'hex3':
            case 'hex4':
            case 'hex6':
            default:
                return this._format.isString
                    ? this._color.toHexString()
                    : this._color.toHex();
        }
    }

    public set color(color: ColorValue) {
        if (color === this.color) {
            return;
        }
        const oldValue = this._color;
        this._color = new TinyColor(color);
        const format = this._color.format;
        let isString = typeof color === 'string' || color instanceof String;

        if (format.startsWith('hex')) {
            isString = (color as string).startsWith('#');
        }

        this._format = {
            format,
            isString,
        };

        const { h, s, v } = this._color.toHsv();
        let originalHue: number | undefined = undefined;

        if (isString && format.startsWith('hs')) {
            const values = extractHueAndSaturationRegExp.exec(color as string);

            if (values !== null) {
                const [, h] = values;
                originalHue = Number(h);
            }
        } else if (!isString && format.startsWith('hs')) {
            const colorInput = this._color.originalInput;
            const colorValues = Object.values(colorInput);
            originalHue = colorValues[0];
        }

        this.hue = originalHue || h;
        this.x = s;
        this.y = 1 - v;
        this.requestUpdate('color', oldValue);
    }

    private _color = new TinyColor({ h: 0, s: 1, v: 1 });

    private _previousColor = new TinyColor({ h: 0, s: 1, v: 1 });

    private _format: { format: string; isString: boolean } = {
        format: '',
        isString: false,
    };

    @property({ attribute: false })
    private activeAxis = 'x';

    @property({ type: Number })
    public get x(): number {
        return this._x;
    }

    public set x(x: number) {
        if (x === this.x) {
            return;
        }
        const oldValue = this.x;
        if (this.inputX) {
            // Use the native `input[type='range']` control to validate this value after `firstUpdate`
            this.inputX.value = x.toString();
            this._x = this.inputX.valueAsNumber;
        } else {
            this._x = x;
        }
        this.requestUpdate('x', oldValue);
    }

    private _x = 1;

    @property({ type: Number })
    public get y(): number {
        return this._y;
    }

    public set y(y: number) {
        if (y === this.y) {
            return;
        }
        const oldValue = this.y;
        if (this.inputY) {
            // Use the native `input[type='range']` control to validate this value after `firstUpdate`
            this.inputY.value = y.toString();
            this._y = this.inputY.valueAsNumber;
        } else {
            this._y = y;
        }
        this.requestUpdate('y', oldValue);
    }

    private _y = 0;

    @property({ type: Number })
    public step = 0.01;

    @query('[name="x"]')
    public inputX!: HTMLInputElement;

    @query('[name="y"]')
    public inputY!: HTMLInputElement;

    private altered = 0;

    private activeKeys = new Set();

    public focus(focusOptions: FocusOptions = {}): void {
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

    private handleFocusin(): void {
        this.focused = true;
    }

    private handleFocusout(): void {
        if (this._pointerDown) {
            return;
        }
        this.focused = false;
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        this.focused = true;
        this.altered = [event.shiftKey, event.ctrlKey, event.altKey].filter(
            (key) => !!key
        ).length;
        const isArrowKey = code.search('Arrow') === 0;
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
                    deltaY = step * -1;
                    break;
                case 'ArrowDown':
                    deltaY = step * 1;
                    break;
                case 'ArrowLeft':
                    deltaX = step * -1;
                    break;
                case 'ArrowRight':
                    deltaX = step * 1;
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

        this._previousColor = this._color.clone();
        this._color = new TinyColor({ h: this.hue, s: this.x, v: 1 - this.y });

        if (deltaX != 0 || deltaY != 0) {
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
                this._color = this._previousColor;
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
        this._color = new TinyColor({ h: this.hue, s: this.x, v: 1 - this.y });
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
    private _pointerDown = false;

    private handlePointerdown(event: PointerEvent): void {
        if (event.button !== 0) {
            event.preventDefault();
            return;
        }
        this._pointerDown = true;
        this._previousColor = this._color.clone();
        this.boundingClientRect = this.getBoundingClientRect();
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
        if (event.pointerType === 'mouse') {
            this.focused = true;
        }
    }

    private handlePointermove(event: PointerEvent): void {
        const [x, y] = this.calculateHandlePosition(event);
        this._color = new TinyColor({ h: this.hue, s: x, v: 1 - y });

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
            this._color = this._previousColor;
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

        return [percentX, percentY];
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

    protected render(): TemplateResult {
        const { width = 0, height = 0 } = this.boundingClientRect || {};

        return html`
            <div
                @pointerdown=${this.handleAreaPointerdown}
                class="gradient"
                style="background:
                    linear-gradient(to top, black 0%, hsla(${this
                    .hue}, 100%, 0.01%, 0) 100%),
                    linear-gradient(to right, white 0%, hsla(${this
                    .hue}, 100%, 0.01%, 0) 100%), hsl(${this.hue}, 100%, 50%);"
            >
                <slot name="gradient"></slot>
            </div>

            <sp-color-handle
                tabindex=${ifDefined(this.focused ? undefined : '0')}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color=${this._color.toHslString()}
                ?disabled=${this.disabled}
                style="transform: translate(${this.x * width}px, ${this.y *
                height}px);"
                ${streamingListener({
                    start: ['pointerdown', this.handlePointerdown],
                    streamInside: ['pointermove', this.handlePointermove],
                    end: [['pointerup', 'pointercancel'], this.handlePointerup],
                })}
            ></sp-color-handle>

            <div>
                <input
                    type="range"
                    class="slider"
                    name="x"
                    aria-label=${this.labelX}
                    min="0"
                    max="1"
                    step=${this.step}
                    tabindex="-1"
                    .value=${String(this.x)}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                />
            </div>
            <div>
                <input
                    type="range"
                    class="slider"
                    name="y"
                    aria-label=${this.labelY}
                    min="0"
                    max="1"
                    step=${this.step}
                    tabindex="-1"
                    .value=${String(this.y)}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                />
            </div>
        `;
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.boundingClientRect = this.getBoundingClientRect();

        this.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
        this.addEventListener('keyup', this.handleKeyup);
        this.addEventListener('keydown', this.handleKeydown);
    }

    protected updated(changed: PropertyValues): void {
        super.updated(changed);
        if (this.x !== this.inputX.valueAsNumber) {
            this.x = this.inputX.valueAsNumber;
        }
        if (this.y !== this.inputY.valueAsNumber) {
            this.y = this.inputY.valueAsNumber;
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

    public connectedCallback(): void {
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

    public disconnectedCallback(): void {
        this.observer?.unobserve(this);
        super.disconnectedCallback();
    }
}
