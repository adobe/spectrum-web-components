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
    nothing,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    classMap,
    ifDefined,
    repeat,
    StyleInfo,
    styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import { streamingListener } from '@spectrum-web-components/base/src/streaming-listener.js';
import { SliderBase } from './SliderBase.js';
import sliderStyles from './slider.css.js';
import { ModelValue } from './HandleController.js';

/**
 * @element sp-slider
 *
 * @slot - @deprecated Text label for the Slider. Use the `label` property instead.
 * @slot handle - optionally accepts two or more sp-slider-handle elements
 */
export class Slider extends SliderBase {
    public static override get styles(): CSSResultArray {
        return [sliderStyles];
    }
    protected override render(): TemplateResult {
        return html`
            ${this.renderLabel()} ${this.renderTrack()}
            ${this.editable
                ? html`
                      <sp-number-field
                          .formatOptions=${this.formatOptions || {}}
                          id="number-field"
                          min=${this.min}
                          max=${this.max}
                          step=${this.step}
                          size=${this.size}
                          value=${this.value}
                          ?hide-stepper=${this.hideStepper}
                          ?disabled=${this.disabled}
                          ?quiet=${this.quiet}
                          ?indeterminate=${this.indeterminate}
                          @input=${this.handleNumberInput}
                          @change=${this.handleNumberChange}
                      ></sp-number-field>
                  `
                : nothing}
        `;
    }

    private renderLabel(): TemplateResult {
        const textLabelVisible =
            this.labelVisibility === 'none' || this.labelVisibility === 'value';
        const valueLabelVisible =
            this.labelVisibility === 'none' || this.labelVisibility === 'text';
        return html`
            <div id="label-container">
                <sp-field-label
                    class=${classMap({
                        'visually-hidden': textLabelVisible,
                    })}
                    ?disabled=${this.disabled}
                    id="label"
                    for=${this.editable
                        ? 'number-field'
                        : this.handleController.activeHandleInputId}
                    @click=${this.handleLabelClick}
                    size=${this.size}
                >
                    ${this.slotHasContent
                        ? nothing
                        : html`
                              <span>${this.label}</span>
                          `}
                    <slot></slot>
                </sp-field-label>
                <sp-field-label
                    class=${classMap({
                        'visually-hidden': valueLabelVisible,
                    })}
                    ?disabled=${this.disabled}
                    for=${this.editable
                        ? 'number-field'
                        : this.handleController.activeHandleInputId}
                    size=${this.size}
                >
                    <output id="value" aria-live="off" for="input">
                        ${this.ariaValueText}
                    </output>
                </sp-field-label>
            </div>
        `;
    }

    private renderRamp(): TemplateResult {
        if (this.variant !== 'ramp') {
            return html``;
        }
        return html`
            <div id="ramp">
                <svg
                    viewBox="0 0 240 16"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d="M240,4v8c0,2.3-1.9,4.1-4.2,4L1,9C0.4,9,0,8.5,0,8c0-0.5,0.4-1,1-1l234.8-7C238.1-0.1,240,1.7,240,4z"
                    ></path>
                </svg>
            </div>
        `;
    }

    private renderTicks(): TemplateResult {
        if (this.variant !== 'tick') {
            return html``;
        }
        const tickStep = this.tickStep || this.step;
        const tickCount =
            ((this.max as number) - (this.min as number)) / tickStep;
        const partialFit = tickCount % 1 !== 0;
        const ticks = new Array(Math.floor(tickCount + 1));
        ticks.fill(0, 0, tickCount + 1);
        return html`
            <div
                class="${partialFit ? 'not-exact ' : ''}ticks"
                style=${ifDefined(
                    partialFit
                        ? `--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}`
                        : undefined
                )}
            >
                ${ticks.map(
                    (_tick, i) => html`
                        <div class="tick">
                            ${this.tickLabels
                                ? html`
                                      <div class="tickLabel">
                                          ${i * tickStep + this.min}
                                      </div>
                                  `
                                : nothing}
                        </div>
                    `
                )}
            </div>
        `;
    }

    private renderTrackSegment(start: number, end: number): TemplateResult {
        if (this.variant === 'ramp') {
            return html``;
        }
        return html`
            <div
                class="track"
                style=${styleMap(this.trackSegmentStyles(start, end))}
                role="presentation"
            ></div>
        `;
    }

    /**
     * @description calculates the fill width
     * @param fillStartValue
     * @param currentValue
     * @returns
     */
    private getOffsetWidth(
        fillStartValue: number,
        currentValue: number
    ): number {
        const distance = Math.abs(currentValue - fillStartValue);
        return distance * 100;
    }

    private fillStyles(
        centerPoint: number,
        activeModel: ModelValue
    ): StyleInfo {
        const centerPointNormalized = activeModel.normalization.toNormalized(
            centerPoint,
            this.min,
            this.max
        );
        const position = this.dir === 'rtl' ? 'right' : 'left';
        const offsetPosition =
            (this.value > centerPoint
                ? centerPointNormalized
                : activeModel.normalizedValue) * 100;
        const offsetWidth = this.getOffsetWidth(
            centerPointNormalized,
            activeModel.normalizedValue
        );
        const styles = {
            [position]: `${offsetPosition}%`,
            width: `${offsetWidth}%`,
        };
        return styles;
    }

    private renderFillOffset(): TemplateResult {
        if (
            this.centerPoint === undefined ||
            this.handleController.activeHandleModel === undefined
        ) {
            return html``;
        }
        return html`
            <div
                class=${classMap({
                    fill: true,
                    offset: this.value > this.centerPoint,
                })}
                style=${styleMap(
                    this.fillStyles(
                        this.centerPoint,
                        this.handleController.activeHandleModel
                    )
                )}
            ></div>
        `;
    }

    private renderTrack(): TemplateResult {
        const segments = this.handleController.trackSegments();
        const renderedHandles = this.renderHandles();
        const handleItems = [{ id: 'handles', html: renderedHandles }];
        const trackItems = [
            { id: 'track0', html: this.renderTrackSegment(...segments[0]) },
            { id: 'fill', html: this.renderFillOffset() },
            { id: 'ramp', html: this.renderRamp() },
            {
                id: 'handles',
                html: this.variant === 'tick' ? nothing : renderedHandles,
            },
            ...segments.slice(1).map(([start, end], index) => ({
                id: `track${index + 1}`,
                html: this.renderTrackSegment(start, end),
            })),
        ];

        return html`
            <div
                id="track"
                ${streamingListener({
                    start: ['pointerdown', this.handlePointerdown],
                    streamInside: ['pointermove', this.handlePointermove],
                    end: [
                        ['pointerup', 'pointercancel', 'pointerleave'],
                        this.handlePointerup,
                    ],
                    streamOutside: ['dblclick', this.handleDoubleClick],
                })}
            >
                <div id="controls">
                    ${this.variant === 'tick'
                        ? html`
                              ${this.renderTicks()}
                              <div class="trackContainer">
                                  ${repeat(
                                      trackItems,
                                      (item) => item.id,
                                      (item) => item.html
                                  )}
                              </div>
                              <div class="handleContainer">
                                  ${repeat(
                                      handleItems,
                                      (item) => item.id,
                                      (item) => item.html
                                  )}
                              </div>
                          `
                        : html`
                              ${repeat(
                                  trackItems,
                                  (item) => item.id,
                                  (item) => item.html
                              )}
                          `}
                </div>
            </div>
        `;
    }

    private renderHandles(): TemplateResult {
        return html`
            ${this.handleController.handleElements.map((model, index) => {
                const zIndex = this.handleController.getZIndexForHandle(
                    model.name
                );
                return this.renderHandle(
                    model,
                    index,
                    zIndex,
                    this.handleController.handleElements.length > 1
                );
            })}
        `;
    }

    private renderHandle(
        model: ModelValue,
        index: number,
        zIndex: number,
        isMultiHandle: boolean
    ): TemplateResult {
        const classes = {
            handle: true,
            dragging: this.handleController.isHandleDragging(model.name),
            'handle-highlight': model.highlight,
        };
        const style = {
            [this.isLTR ? 'left' : 'right']: `${model.normalizedValue * 100}%`,
            'z-index': zIndex.toString(),
            ...(isMultiHandle && {
                'background-color': `var(--spectrum-slider-handle-background-color-${index}, var(--spectrum-slider-handle-background-color))`,
                'border-color': `var(--spectrum-slider-handle-border-color-${index}, var(--spectrum-slider-handle-border-color))`,
            }),
        };
        const ariaLabelledBy = isMultiHandle ? `label input-${index}` : 'label';
        return html`
            <div
                class=${classMap(classes)}
                name=${model.name}
                style=${styleMap(style)}
                role="presentation"
            >
                <input
                    type="range"
                    class="input"
                    id="input-${index}"
                    min=${model.clamp.min}
                    max=${model.clamp.max}
                    step=${model.step}
                    value=${model.value}
                    aria-disabled=${ifDefined(
                        this.disabled ? 'true' : undefined
                    )}
                    tabindex=${ifDefined(this.editable ? -1 : undefined)}
                    aria-label=${ifDefined(model.ariaLabel)}
                    aria-labelledby=${ariaLabelledBy}
                    aria-valuetext=${model.formattedValue}
                    aria-describedby="slider-description"
                    @change=${(event: Event) =>
                        this.handleController.onInputChange(event)}
                    @focus=${(event: Event) =>
                        this.handleController.onInputFocus(event)}
                    @blur=${(event: Event) =>
                        this.handleController.onInputBlur(event)}
                    @keydown=${(event: KeyboardEvent) =>
                        this.handleController.onInputKeydown(event)}
                    .model=${model}
                />
                <span id="slider-description">
                    Press escape or double click to reset the slider to its
                    default value.
                </span>
            </div>
        `;
    }

    private trackSegmentStyles(start: number, end: number): StyleInfo {
        const size = end - start;
        const styles: StyleInfo = {
            width: `${size * 100}%`,
            '--spectrum-slider-track-background-size': `${(1 / size) * 100}%`,
            '--spectrum-slider-track-segment-position': `${start * 100}%`,
        };
        return styles;
    }
}
