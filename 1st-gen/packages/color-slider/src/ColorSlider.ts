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
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    ifDefined,
    StyleInfo,
    styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { streamingListener } from '@spectrum-web-components/base/src/streaming-listener.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import type { ColorHandle } from '@spectrum-web-components/color-handle';
import '@spectrum-web-components/color-handle/sp-color-handle.js';
import {
    ColorController,
    ColorTypes,
} from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

import opacityCheckerBoardStyles from '@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js';
import styles from './color-slider.css.js';

/**
 * @element sp-color-slider
 * @slot gradient - a custom gradient visually outlining the available color values
 * @fires input - The value of the Color Slider has changed.
 * @fires change - An alteration to the value of the Color Slider has been committed by the user.
 */
export class ColorSlider extends Focusable {
    public static override get styles(): CSSResultArray {
        return [opacityCheckerBoardStyles, styles];
    }

    @property({ type: Boolean, reflect: true })
    public override disabled = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @query('.handle')
    private handle!: ColorHandle;

    @property({ type: String })
    public label = 'hue';

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    private languageResolver = new LanguageResolutionController(this);

    public colorController = new ColorController(this, { manageAs: 'hsv' });

    @property({ type: Number })
    public get value(): number {
        return this.colorController.hue;
    }

    public set value(hue: number) {
        this.colorController.hue = hue;
    }

    get sliderHandlePosition(): number {
        return (this.colorController.hue / 360) * 100;
    }

    @property({ type: String })
    public get color(): ColorTypes {
        return this.colorController.colorValue;
    }

    public set color(color: ColorTypes) {
        this.colorController.color = color;
    }

    @property({ type: Number })
    public step = 1;

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

        const range = 360;
        const mult = 100 / range;
        const nextSliderHandlePosition = Math.min(
            100,
            Math.max(0, this.sliderHandlePosition + delta * mult)
        );
        this.value = 360 * (nextSliderHandlePosition / 100);

        if (delta != 0) {
            this.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                    composed: true,
                })
            );
            this.dispatchEvent(
                new Event('change', {
                    bubbles: true,
                    composed: true,
                })
            );
        }
    }

    private handleInput(event: Event & { target: HTMLInputElement }): void {
        const { valueAsNumber } = event.target;

        this.value = valueAsNumber;
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

    private handleFocus(): void {
        this.focused = true;
    }

    private handleBlur(): void {
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
        this.colorController.savePreviousColor();
        this.boundingClientRect = this.getBoundingClientRect();
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
        if (event.pointerType === 'mouse') {
            this.focused = true;
        }
    }

    private handlePointermove(event: PointerEvent): void {
        const nextsliderHandlePosition = this.calculateHandlePosition(event);
        this.value = 360 * (nextsliderHandlePosition / 100);

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
            this.colorController.restorePreviousColor();
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
            return this.sliderHandlePosition;
        }
        const rect = this.boundingClientRect;
        const minOffset = this.vertical ? rect.top : rect.left;
        const offset = this.vertical ? event.clientY : event.clientX;
        const size = this.vertical ? rect.height : rect.width;

        const percent = Math.max(0, Math.min(1, (offset - minOffset) / size));
        const sliderHandlePosition =
            this.vertical || !this.isLTR ? 100 - 100 * percent : 100 * percent;

        return sliderHandlePosition;
    }

    private handleGradientPointerdown(event: PointerEvent): void {
        if (event.button !== 0) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        this.handle.dispatchEvent(new PointerEvent('pointerdown', event));
        this.handlePointermove(event);
    }

    private get handlePositionStyles(): string {
        return `${this.vertical ? 'inset-block-end' : 'inset-inline-start'}: ${
            this.sliderHandlePosition
        }%`;
    }

    private get getColorSliderStyle(): StyleInfo {
        const orientation = this.vertical ? 'top' : 'right';
        return {
            background: `linear-gradient(to ${orientation}, var(--sp-color-slider-gradient, var(--sp-color-slider-gradient-fallback)))`,
        };
    }

    protected override render(): TemplateResult {
        return html`
            <div
                class="opacity-checkerboard checkerboard"
                role="presentation"
                @pointerdown=${this.handleGradientPointerdown}
            >
                <div
                    class="gradient"
                    role="presentation"
                    style=${styleMap(this.getColorSliderStyle)}
                >
                    <slot name="gradient"></slot>
                </div>
            </div>
            <sp-color-handle
                tabindex=${ifDefined(this.focused ? undefined : '0')}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${this.handlePositionStyles}
                ${streamingListener({
                    start: ['pointerdown', this.handlePointerdown],
                    streamInside: ['pointermove', this.handlePointermove],
                    end: [
                        ['pointerup', 'pointercancel', 'pointerleave'],
                        this.handlePointerup,
                    ],
                })}
            ></sp-color-handle>
            <input
                type="range"
                class="slider"
                min="0"
                max="360"
                aria-orientation=${ifDefined(
                    this.vertical ? 'vertical' : undefined
                )}
                orient=${ifDefined(this.vertical ? 'vertical' : undefined)}
                step=${this.step}
                aria-label=${this.label}
                .value=${String(this.value)}
                aria-valuetext=${`${new Intl.NumberFormat(
                    this.languageResolver.language,
                    {
                        maximumFractionDigits: 0,
                        minimumIntegerDigits: 1,
                        style: 'unit',
                        unit: 'degree',
                        unitDisplay: 'narrow',
                    }
                ).format(this.value)}`}
                @input=${this.handleInput}
                @change=${this.handleChange}
                @keydown=${this.handleKeydown}
            />
        `;
    }

    protected override firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.boundingClientRect = this.getBoundingClientRect();
        this.addEventListener('focus', this.handleFocus);
        this.addEventListener('blur', this.handleBlur);
    }
}
