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
    html,
    property,
    CSSResultArray,
    TemplateResult,
    query,
    styleMap,
    ifDefined,
    repeat,
    classMap,
} from '@spectrum-web-components/base';

import sliderStyles from './slider.css.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import { StyleInfo } from 'lit-html/directives/style-map';
import '@spectrum-web-components/field-label/sp-field-label.js';
import type { NumberField } from '@spectrum-web-components/number-field';
import { HandleController, HandleValueDictionary } from './HandleController.js';
import { SliderHandle } from './SliderHandle.js';

export const variants = ['filled', 'ramp', 'range', 'tick'];

/**
 * @element sp-slider
 *
 * @slot - text label for the Slider
 */
export class Slider extends ObserveSlotText(SliderHandle, '') {
    public static get styles(): CSSResultArray {
        return [sliderStyles];
    }

    public handleController: HandleController = new HandleController(this);

    /**
     * Whether to display a Number Field along side the slider UI
     */
    @property({ type: Boolean, reflect: true })
    public get editable(): boolean {
        return this._editable;
    }

    public set editable(editable: boolean) {
        if (editable === this.editable) return;
        const oldValue = this.editable;
        this._editable = this.handleController.size < 2 ? editable : false;
        if (this.editable) {
            this._numberFieldInput = import(
                '@spectrum-web-components/number-field/sp-number-field.js'
            );
        }
        if (oldValue !== this.editable) {
            this.requestUpdate('editable', oldValue);
        }
    }

    private _editable = false;

    /**
     * Whether the stepper UI of the Number Field is hidden or not
     */
    @property({ type: Boolean, reflect: true, attribute: 'hide-stepper' })
    public hideStepper = false;

    @property()
    public type = '';

    @property({ type: String })
    public set variant(variant: string) {
        const oldVariant = this.variant;
        if (variant === this.variant) {
            return;
        }
        if (variants.includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
        } else {
            this.removeAttribute('variant');
            this._variant = '';
        }
        this.requestUpdate('variant', oldVariant);
    }

    public get variant(): string {
        return this._variant;
    }

    public get values(): HandleValueDictionary {
        return this.handleController.values;
    }

    public get handleName(): string {
        return 'value';
    }

    /* Ensure that a '' value for `variant` removes the attribute instead of a blank value */
    private _variant = '';

    @property({ attribute: false })
    public getAriaValueText: (values: Map<string, string>) => string = (
        values
    ) => {
        const valueArray = [...values.values()];
        if (valueArray.length === 2)
            return `${valueArray[0]}${this._forcedUnit} - ${valueArray[1]}${this._forcedUnit}`;
        return valueArray.join(`${this._forcedUnit}, `) + this._forcedUnit;
    };

    public get ariaValueText(): string {
        if (!this.getAriaValueText) {
            return `${this.value}${this._forcedUnit}`;
        }
        return this.getAriaValueText(this.handleController.formattedValues);
    }

    @property({ type: String, reflect: true, attribute: 'label-visibility' })
    public labelVisibility?: 'text' | 'value' | 'none';

    @property({ type: Number, reflect: true })
    public min = 0;

    @property({ type: Number, reflect: true })
    public max = 100;

    @property({ type: Number })
    public step = 1;

    @property({ type: Number, attribute: 'tick-step' })
    public tickStep = 0;

    @property({ type: Boolean, attribute: 'tick-labels' })
    public tickLabels = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @query('#label')
    public labelEl!: HTMLLabelElement;

    @query('#number-field')
    public numberField!: NumberField;

    @query('#track')
    public track!: HTMLDivElement;

    public get numberFormat(): Intl.NumberFormat {
        return this.getNumberFormat();
    }

    public get focusElement(): HTMLElement {
        return this.handleController.focusElement;
    }

    protected handleLabelClick(event: Event): void {
        if (this.editable) {
            event.preventDefault();
            this.focus();
        }
    }

    protected render(): TemplateResult {
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
                          value=${this.value}
                          ?hide-stepper=${this.hideStepper}
                          ?disabled=${this.disabled}
                          @input=${this.handleNumberInput}
                          @change=${this.handleNumberChange}
                      ></sp-number-field>
                  `
                : html``}
        `;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.handleController.hostConnected();
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.handleController.hostDisconnected();
    }

    public update(changedProperties: Map<string, boolean>): void {
        this.handleController.hostUpdate();
        super.update(changedProperties);
    }

    private renderLabel(): TemplateResult {
        const textLabelVisible =
            this.labelVisibility === 'none' || this.labelVisibility === 'value';
        const valueLabelVisible =
            this.labelVisibility === 'none' || this.labelVisibility === 'text';
        return html`
            <div id="labelContainer">
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
                >
                    ${this.slotHasContent ? html`` : this.label}
                    <slot>${this.label}</slot>
                </sp-field-label>
                <output
                    class=${classMap({
                        'visually-hidden': valueLabelVisible,
                    })}
                    id="value"
                    aria-live="off"
                    for="input"
                >
                    ${this.ariaValueText}
                </output>
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
                                          ${i * tickStep}
                                      </div>
                                  `
                                : html``}
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

    private renderTrack(): TemplateResult {
        const segments = this.handleController.trackSegments();

        const trackItems = [
            { id: 'track0', html: this.renderTrackSegment(...segments[0]) },
            { id: 'ramp', html: this.renderRamp() },
            { id: 'ticks', html: this.renderTicks() },
            { id: 'handles', html: this.handleController.render() },
            ...segments.slice(1).map(([start, end], index) => ({
                id: `track${index + 1}`,
                html: this.renderTrackSegment(start, end),
            })),
        ];

        return html`
            <div id="track" @pointerdown=${this.handleTrackPointerdown}>
                <div id="controls">
                    ${repeat(
                        trackItems,
                        (item) => item.id,
                        (item) => item.html
                    )}
                </div>
            </div>
        `;
    }

    /**
     * Move the handle under the cursor and begin start a pointer capture when the track
     * is moused down
     */
    private handleTrackPointerdown(event: PointerEvent): void {
        const target = event.target as HTMLElement;
        if (target.classList.contains('handle')) {
            return;
        }
        this.handleController.beginTrackDrag(event);
    }

    private handleNumberInput(event: Event & { target: NumberField }): void {
        const { value } = event.target;
        if (event.target?.stepperActive && !isNaN(value)) {
            this.value = value;
            return;
        }
        // Do not apply uncommited values to the parent element unless interacting with the stepper UI.
        // Stop uncommited input from being annoucned to the parent application.
        event.stopPropagation();
    }

    private handleNumberChange(event: Event & { target: NumberField }): void {
        const { value } = event.target;
        if (isNaN(value)) {
            event.target.value = this.value;
            event.stopPropagation();
        } else {
            this.value = value;
            if (!event.target?.stepperActive) {
                // When stepper is not active, sythesize an `input` event so that the
                // `change` event isn't surprising.
                this.dispatchInputEvent();
            }
        }
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

    private _numberFieldInput: Promise<unknown> = Promise.resolve();

    protected async _getUpdateComplete(): Promise<boolean> {
        const complete = (await super._getUpdateComplete()) as boolean;
        if (this.editable) {
            await this._numberFieldInput;
            await this.numberField.updateComplete;
        }
        await this.handleController.handleUpdatesComplete();
        return complete;
    }
}
