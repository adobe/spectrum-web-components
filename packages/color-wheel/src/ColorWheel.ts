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
    TemplateResult,
} from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { streamingListener } from '@spectrum-web-components/base/src/streaming-listener.js';
import { SWCResizeObserverEntry, WithSWCResizeObserver } from './types';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/color-handle/sp-color-handle.js';
import styles from './color-wheel.css.js';
import {
    ColorHandle,
    ColorValue,
    extractHueAndSaturationRegExp,
    replaceHueAndSaturationRegExp,
} from '@spectrum-web-components/color-handle';
import { TinyColor } from '@ctrl/tinycolor';

/**
 * @element sp-color-wheel
 * @slot gradient - a custom gradient visually outlining the available color values
 * @fires input - The value of the Color Wheel has changed.
 * @fires change - An alteration to the value of the Color Wheel has been committed by the user.
 */
export class ColorWheel extends Focusable {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public override disabled = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @query('.handle')
    private handle!: ColorHandle;

    @property({ type: String })
    public label = 'hue';

    @property({ type: Number })
    public step = 1;

    @property({ type: Number })
    public get value(): number {
        return this._value;
    }

    public set value(hue: number) {
        const value = Math.min(360, Math.max(0, hue));
        if (value === this.value) {
            return;
        }
        const oldValue = this.value;
        const { s, v } = this._color.toHsv();
        this._color = new TinyColor({ h: value, s, v });
        this._value = value;
        this.requestUpdate('value', oldValue);
    }

    private _value = 0;

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
            case 'hex':
            case 'hex3':
            case 'hex4':
            case 'hex6':
                return this._format.isString
                    ? this._color.toHexString()
                    : this._color.toHex();
            case 'hex8':
                return this._format.isString
                    ? this._color.toHex8String()
                    : this._color.toHex8();
            case 'name':
                return this._color.toName() || this._color.toRgbString();
            case 'hsl':
                if (this._format.isString) {
                    const hslString = this._color.toHslString();
                    return hslString.replace(
                        replaceHueAndSaturationRegExp,
                        `$1${this.value}$2${this._saturation}`
                    );
                } else {
                    const { s, l, a } = this._color.toHsl();
                    return { h: this.value, s, l, a };
                }
            case 'hsv':
                if (this._format.isString) {
                    const hsvString = this._color.toHsvString();
                    return hsvString.replace(
                        replaceHueAndSaturationRegExp,
                        `$1${this.value}$2${this._saturation}`
                    );
                } else {
                    const { s, v, a } = this._color.toHsv();
                    return { h: this.value, s, v, a };
                }
            default:
                return 'No color format applied.';
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

        if (isString && format.startsWith('hs')) {
            const values = extractHueAndSaturationRegExp.exec(color as string);

            if (values !== null) {
                const [, h, s] = values;
                this.value = Number(h);
                this._saturation = Number(s);
            }
        } else if (!isString && format.startsWith('hs')) {
            const colorInput = this._color.originalInput;
            const colorValues = Object.values(colorInput);
            this.value = colorValues[0];
            this._saturation = colorValues[1];
        } else {
            const { h } = this._color.toHsv();
            this.value = h;
        }
        this.requestUpdate('color', oldValue);
    }

    private _color = new TinyColor({ h: 0, s: 1, v: 1 });

    private _previousColor = new TinyColor({ h: 0, s: 1, v: 1 });

    private _saturation!: number;

    private _format: { format: string; isString: boolean } = {
        format: '',
        isString: false,
    };
    private get altered(): number {
        return this._altered;
    }

    private set altered(altered: number) {
        this._altered = altered;
        this.step = Math.max(1, this.altered * 10);
    }

    private _altered = 0;

    @query('input')
    public input!: HTMLInputElement;

    public override get focusElement(): HTMLInputElement {
        return this.input;
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { key } = event;
        this.focused = true;
        this.altered = [event.shiftKey, event.ctrlKey, event.altKey].filter(
            (key) => !!key
        ).length;
        let delta = 0;
        switch (key) {
            case 'ArrowUp':
                delta = this.step;
                break;
            case 'ArrowDown':
                delta = -this.step;
                break;
            case 'ArrowLeft':
                delta = this.step * (this.isLTR ? -1 : 1);
                break;
            case 'ArrowRight':
                delta = this.step * (this.isLTR ? 1 : -1);
                break;
            default:
                return;
        }
        event.preventDefault();
        this.value = (360 + this.value + delta) % 360;
        this._previousColor = this._color.clone();
        this._color = new TinyColor({ ...this._color.toHsl(), h: this.value });
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

    private handleInput(event: Event & { target: HTMLInputElement }): void {
        const { valueAsNumber } = event.target;

        this.value = valueAsNumber;
        this._color = new TinyColor({ ...this._color.toHsl(), h: this.value });
    }

    private handleChange(event: Event & { target: HTMLInputElement }): void {
        this.handleInput(event);
        this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    public override focus(focusOptions: FocusOptions = {}): void {
        super.focus(focusOptions);
        this.forwardFocus();
    }

    private forwardFocus(): void {
        this.focused = this.hasVisibleFocusInTree();
        this.input.focus();
    }

    private handleFocusin(): void {
        this.focused = true;
    }

    private handleFocusout(): void {
        if (this._pointerDown) {
            return;
        }
        this.altered = 0;
        this.focused = false;
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
        this.value = this.calculateHandlePosition(event);
        this._color = new TinyColor({ ...this._color.toHsl(), h: this.value });

        this.dispatchEvent(
            new Event('input', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
    }

    private handlePointerup(event: PointerEvent): void {
        this._pointerDown = false;
        (event.target as HTMLElement).releasePointerCapture(event.pointerId);

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
        // Retain focus on input element after mouse up to enable keyboard interactions
        this.focus();
        if (event.pointerType === 'mouse') {
            this.focused = false;
        }
    }

    /**
     * Returns the value under the cursor
     * @param: PointerEvent on slider
     * @return: Slider value that correlates to the position under the pointer
     */
    private calculateHandlePosition(event: PointerEvent): number {
        /* c8 ignore next 3 */
        if (!this.boundingClientRect) {
            return this.value;
        }
        const rect = this.boundingClientRect;
        const { width, height, left, top } = rect;
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const pointX = event.clientX - centerX;
        const pointY = event.clientY - centerY;
        const value = (Math.atan2(pointY, pointX) * 180) / Math.PI;

        return (360 + (360 + value)) % 360;
    }

    private handleGradientPointerdown(event: PointerEvent): void {
        if (
            event.button !== 0 ||
            (event.target as SVGElement).classList.contains('innerCircle')
        ) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        this.handle.dispatchEvent(new PointerEvent('pointerdown', event));
        this.handlePointermove(event);
    }

    protected override render(): TemplateResult {
        const { width: diameter = 160 } = this.boundingClientRect || {};

        const radius = diameter / 2;
        const trackWidth = 24;
        const innerRadius = radius - trackWidth;
        const innerDiameter = innerRadius * 2;
        const clipPath = `path(evenodd, "M ${radius} ${radius} m -${radius} 0 a ${radius} ${radius} 0 1 0 ${diameter} 0 a ${radius} ${radius} 0 1 0 -${diameter} 0 M ${radius} ${radius} m -${innerRadius} 0 a ${innerRadius} ${innerRadius} 0 1 0 ${innerDiameter} 0 a ${innerRadius} ${innerRadius} 0 1 0 -${innerDiameter} 0")`;
        const handleLocationStyles = `transform: translate(${
            (radius - 12.5) * Math.cos((this.value * Math.PI) / 180)
        }px, ${(radius - 12.5) * Math.sin((this.value * Math.PI) / 180)}px);`;
        return html`
            <slot
                name="gradient"
                @pointerdown=${this.handleGradientPointerdown}
            >
                <div class="wheel" style="clip-path: ${clipPath}"></div>
            </slot>

            <sp-color-handle
                tabindex=${ifDefined(this.focused ? undefined : '0')}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${handleLocationStyles}
                ${streamingListener({
                    start: ['pointerdown', this.handlePointerdown],
                    streamInside: ['pointermove', this.handlePointermove],
                    end: [['pointerup', 'pointercancel'], this.handlePointerup],
                })}
            ></sp-color-handle>

            <input
                type="range"
                class="slider"
                aria-label=${this.label}
                min="0"
                max="360"
                step=${this.step}
                .value=${String(this.value)}
                @input=${this.handleInput}
                @change=${this.handleChange}
                @keydown=${this.handleKeydown}
            />
        `;
    }

    protected override firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.boundingClientRect = this.getBoundingClientRect();
        this.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
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
