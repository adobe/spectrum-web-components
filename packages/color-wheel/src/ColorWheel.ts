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
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { streamingListener } from '@spectrum-web-components/base/src/streaming-listener.js';
import type { ColorHandle } from '@spectrum-web-components/color-handle';
import '@spectrum-web-components/color-handle/sp-color-handle.js';
import {
    ColorController,
    ColorTypes,
} from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

import styles from './color-wheel.css.js';

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

    @property({ type: String, reflect: true })
    public override dir!: 'ltr' | 'rtl';

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

    private languageResolver = new LanguageResolutionController(this);

    private colorController = new ColorController(this, { manageAs: 'hsv' });

    @property({ type: Number })
    public get value(): number {
        return this.colorController.hue;
    }

    public set value(hue: number) {
        this.colorController.hue = hue;
    }

    @property({ type: String })
    public get color(): ColorTypes {
        return this.colorController.colorValue;
    }

    public set color(color: ColorTypes) {
        this.colorController.color = color;
    }

    private _baseStep: number = 1; // Preserves user's value

    private set altered(altered: number) {
        this._altered = altered;
        // Don't modify anything here!
    }

    private get effectiveStep(): number {
        // Calculate on-the-fly without modifying stored values
        return this._altered > 0 ? this._baseStep * 10 : this._baseStep;
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
                delta = this.effectiveStep;
                break;
            case 'ArrowDown':
                delta = -this.effectiveStep;
                break;
            case 'ArrowLeft':
                delta = this.effectiveStep * (this.isLTR ? -1 : 1);
                break;
            case 'ArrowRight':
                delta = this.effectiveStep * (this.isLTR ? 1 : -1);
                break;
            default:
                return;
        }
        event.preventDefault();
        this.value = (360 + this.value + delta) % 360;
        this.colorController.savePreviousColor();
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
        this.value = this.calculateHandlePosition(event);

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
            return this.value;
        }
        const rect = this.boundingClientRect;
        const { width, height, left, top } = rect;
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const pointX = event.clientX - centerX;
        const pointY = event.clientY - centerY;
        const value = (Math.atan2(pointY, pointX) * 180) / Math.PI;

        return (360 + (360 + (this.isLTR ? value : 180 - value))) % 360;
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
        const { button, pointerId, pointerType } = event;
        this.handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                button,
                pointerId,
                pointerType,
            })
        );
        this.handlePointermove(event);
    }

    calculateStyleData(): {
        clipPath: string;
        clipPathBorders: string;
        diameter: number;
        handleLocationStyles: string;
    } {
        // Extract values from element.
        const { width: diameter = 160 } = this.boundingClientRect || {};
        const styles = getComputedStyle(this);
        const borderWidth = parseFloat(
            styles.getPropertyValue('--_border-width')
        );
        const trackWidth = parseFloat(
            styles.getPropertyValue('--_track-width')
        );

        // Calculate wheel data.
        const radius = diameter / 2;
        const diameterAfterBoarder = diameter - borderWidth * 2;
        const radiusAfterBoarder = radius - borderWidth;
        const innerRadius = radius - trackWidth;
        const innerDiameter = innerRadius * 2;
        const innerRadiusAfterBorder = innerRadius + borderWidth;
        const innerDiameterAfterBorder = innerDiameter + borderWidth * 2;
        const clipPathBorders = `"M ${radius} ${radius} m -${radius} 0 a ${radius} ${radius} 0 1 0 ${diameter} 0 a ${radius} ${radius} 0 1 0 -${diameter} 0 M ${radius} ${radius} m -${innerRadius} 0 a ${innerRadius} ${innerRadius} 0 1 0 ${innerDiameter} 0 a ${innerRadius} ${innerRadius} 0 1 0 -${innerDiameter} 0"`;
        const clipPath = `"M ${radiusAfterBoarder} ${radiusAfterBoarder} m -${radiusAfterBoarder} 0 a ${radiusAfterBoarder} ${radiusAfterBoarder} 0 1 0 ${diameterAfterBoarder} 0 a ${radiusAfterBoarder} ${radiusAfterBoarder} 0 1 0 -${diameterAfterBoarder} 0 M ${radiusAfterBoarder} ${radiusAfterBoarder} m -${innerRadiusAfterBorder} 0 a ${innerRadiusAfterBorder} ${innerRadiusAfterBorder} 0 1 0 ${innerDiameterAfterBorder} 0 a ${innerRadiusAfterBorder} ${innerRadiusAfterBorder} 0 1 0 -${innerDiameterAfterBorder} 0"`;

        // Calculate handle position on the wheel.
        const translateX =
            (this.isLTR ? 1 : -1) *
            (radius - trackWidth / 2) *
            Math.cos((this.value * Math.PI) / 180);
        const translateY =
            (radius - trackWidth / 2) * Math.sin((this.value * Math.PI) / 180);
        const handleLocationStyles = `transform: translate(${translateX}px, ${translateY}px);`;

        return {
            clipPath,
            clipPathBorders,
            diameter,
            handleLocationStyles,
        };
    }

    protected override render(): TemplateResult {
        const { clipPath, clipPathBorders, diameter, handleLocationStyles } =
            this.calculateStyleData();

        return html`
            <slot
                name="gradient"
                @pointerdown=${this.handleGradientPointerdown}
                style="
                    --spectrum-colorwheel-colorarea-container-size: ${diameter}px;
                    --spectrum-colorwheel-height: ${diameter}px;
                    --spectrum-colorwheel-width: ${diameter}px;
                    --spectrum-colorwheel-path-borders: ${clipPathBorders};
                    --spectrum-colorwheel-path: ${clipPath};
                "
            >
                <div class="inner">
                    <div class="colorarea-container"></div>
                </div>
                <div class="border">
                    <div class="wheel"></div>
                </div>
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
                    end: [
                        ['pointerup', 'pointercancel', 'pointerleave'],
                        this.handlePointerup,
                    ],
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

    protected override willUpdate(changed: PropertyValues<this>): void {
        if (changed.has('step')) {
            this._baseStep = this.step;
        }
    }

    private observer?: ResizeObserver;

    public override connectedCallback(): void {
        super.connectedCallback();
        if (!this.observer && window.ResizeObserver) {
            this.observer = new ResizeObserver((entries) => {
                requestAnimationFrame(() => {
                    for (const entry of entries) {
                        this.boundingClientRect = entry.contentRect;
                    }
                    this.requestUpdate();
                });
            });
        }
        this.observer?.observe(this);
    }

    public override disconnectedCallback(): void {
        this.observer?.unobserve(this);
        super.disconnectedCallback();
    }
}
