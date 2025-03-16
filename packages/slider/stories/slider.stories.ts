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
import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/slider/sp-slider-handle.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import {
    Slider,
    SliderHandle,
    variants,
} from '@spectrum-web-components/slider';
import { spreadProps } from '../../../test/lit-helpers.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';

export interface Properties {
    variant?: string;
    tickStep?: number;
    labelVisibility?: string;
    onInput?: (val: string) => void;
    onChange?: (val: string) => void;
    min?: number;
    max?: number;
    value?: number;
    step?: number;
    [prop: string]: unknown;
}

export default {
    component: 'sp-slider',
    title: 'Slider',
    argTypes: {
        onInput: { action: 'input' },
        onChange: { action: 'change' },
        variant: {
            name: 'Variant',
            description: 'Determines the style of slider.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: undefined },
            },
            control: {
                type: 'inline-radio',
                options: [undefined, ...variants],
            },
        },
        tickStep: {
            name: 'Tick Step',
            description: 'Tick spacing on slider.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 0.1 },
            },
            control: {
                type: 'number',
            },
        },
        labelVisibility: {
            name: 'Label Visibility',
            description: 'The labels visibily available in the UI',
            table: {
                type: { summary: '"text" | "value" | "none" | undefined' },
                defaultValue: { summary: undefined },
            },
            control: {
                type: 'text',
            },
        },
    },
    args: {
        variant: undefined,
        tickStep: 0.1,
        labelVisibility: undefined,
        min: undefined,
        max: undefined,
        value: undefined,
        step: undefined,
    },
};

const handleEvent =
    ({ onInput, onChange }: Properties) =>
    (event: Event): void => {
        const { value } = event.target as Slider;
        if (onInput && event.type === 'input') {
            onInput(value.toString());
        } else if (onChange && event.type === 'change') {
            onChange(value.toString());
        }
    };

const handleHandleEvent =
    ({ onInput, onChange }: Properties) =>
    (event: Event): void => {
        const target = event.target as SliderHandle;
        if (target.value != null) {
            if (typeof target.value === 'object') {
                const value = JSON.stringify(target.value, null, 2);
                if (onInput && event.type === 'input') {
                    onInput(value);
                } else if (onChange && event.type === 'change') {
                    onChange(value);
                }
            } else {
                const value = `${target.name}: ${target.value}`;
                if (onInput && event.type === 'input') {
                    onInput(value);
                } else if (onChange && event.type === 'change') {
                    onChange(value);
                }
            }
        }
    };

export const Default = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin-inline: 20px;">
                <sp-slider
                    max="1"
                    min="0"
                    value=".5"
                    step="0.01"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    Opacity
                </sp-slider>
            </div>
        `;
    },
};

export const Filled = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin-inline: 20px;">
                <sp-slider
                    max="1"
                    variant="filled"
                    min="0"
                    value=".7"
                    step="0.01"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    Slider Label
                </sp-slider>
            </div>
        `;
    },
};

export const HasADefaultValue = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin-inline: 20px;">
                <sp-slider
                    max="1"
                    min="0"
                    value=".5"
                    step="0.01"
                    default-value="0.2"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    double click or press escape key to reset
                </sp-slider>
            </div>
        `;
    },
};

export const FillStart = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin-inline: 20px;">
                <sp-slider
                    max="1"
                    fill-start
                    variant="filled"
                    min="0"
                    value=".7"
                    step="0.01"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    Slider label
                </sp-slider>
            </div>
        `;
    },
};

export const FillStartWithValue = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin-inline: 20px;">
                <sp-slider
                    max="1"
                    min="0"
                    value=".7"
                    step="0.1"
                    fill-start="0.3"
                    variant="filled"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    Value Greater than Fill Start
                </sp-slider>
            </div>
            <div style="width: 500px; margin-inline: 20px;">
                <sp-slider
                    max="20"
                    min="0"
                    value="5"
                    step="1"
                    fill-start="15"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'number' }}
                    ...=${spreadProps(args)}
                >
                    Value Less than Fill Start
                </sp-slider>
            </div>
        `;
    },
};

export const FillStartWithNegativeMinRange = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin-inline: 20px;">
                <sp-slider
                    max="150"
                    min="-50"
                    value="25"
                    step="1"
                    fill-start="0"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'number' }}
                    ...=${spreadProps(args)}
                >
                    Fill start with "0" and within range -50 to 150
                </sp-slider>
            </div>
            <div style="width: 500px; margin-inline: 20px;">
                <sp-slider
                    max="100"
                    min="-50"
                    value="-25"
                    step="1"
                    fill-start="0"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'number' }}
                    .normalization=${{
                        toNormalized: (value: number): number => {
                            if (value === 0) return 0.5;
                            return value < 0
                                ? 0.5 - (value / -50) * 0.5
                                : 0.5 + (value / 100) * 0.5;
                        },
                        fromNormalized: (value: number): number => {
                            if (value === 0.5) return 0;
                            return value < 0.5
                                ? (1 - value / 0.5) * -50
                                : ((value - 0.5) / 0.5) * 100;
                        },
                    }}
                    ...=${spreadProps(args)}
                >
                    Fill start with "0" and normalization function within range
                    -50 to 100
                </sp-slider>
            </div>
        `;
    },
};

export const autofocus = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin-inline: 20px;">
                <sp-slider
                    autofocus
                    max="1"
                    min="0"
                    value=".5"
                    step="0.01"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    Opacity
                </sp-slider>
            </div>
        `;
    },
};

export const minimalDOM = (): TemplateResult => {
    return html`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider>Opacity</sp-slider>
        </div>
    `;
};

export const noVisibleTextLabel = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    max="1"
                    min="0"
                    value=".5"
                    step="0.01"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    Opacity
                </sp-slider>
            </div>
        `;
    },

    args: {
        labelVisibility: 'value',
    },
};

export const noVisibleValueLabel = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    max="1"
                    min="0"
                    value="0"
                    step="0.01"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    Opacity
                </sp-slider>
            </div>
        `;
    },

    args: {
        labelVisibility: 'text',
    },
};

export const noVisibleLabels = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    max="1"
                    min="0"
                    value=".5"
                    step="0.01"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    Opacity
                </sp-slider>
            </div>
        `;
    },

    args: {
        labelVisibility: 'none',
    },
};

export const px = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    max="360"
                    min="0"
                    value="90"
                    step="1"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{
                        style: 'unit',
                        unit: 'px',
                    }}
                    ...=${spreadProps(args)}
                >
                    Angle
                </sp-slider>
            </div>
        `;
    },
};

class NumberFieldDefined extends HTMLElement {
    constructor() {
        super();
        this.numberFieldLoaderPromise = new Promise((res) => {
            customElements.whenDefined('sp-number-field').then(() => {
                res(true);
            });
        });
    }

    private numberFieldLoaderPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.numberFieldLoaderPromise;
    }
}

customElements.define('number-field-defined', NumberFieldDefined);

const editableDecorator = (story: () => TemplateResult): TemplateResult => {
    return html`
        ${story()}
        <number-field-defined></number-field-defined>
    `;
};

export const max20 = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 200px; margin: 12px 20px;">
                <sp-slider
                    editable
                    max="20"
                    min="0"
                    value="5"
                    step="1"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    ...=${spreadProps(args)}
                >
                    Max 20
                </sp-slider>
            </div>
        `;
    },

    swc_vrt: {
        skip: true,
    },

    parameters: {
        // Disables Chromatic's snapshotting on a global level
        chromatic: { disableSnapshot: true },
    },
};

export const Editable = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    editable
                    max="360"
                    min="0"
                    value="90"
                    step="1"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{
                        style: 'unit',
                        unit: 'degree',
                        unitDisplay: 'narrow',
                    }}
                    ...=${spreadProps(args)}
                >
                    Angle
                </sp-slider>
            </div>
        `;
    },

    decorators: [editableDecorator],
};

import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/tray/sp-tray.js';

export const Multiple = {
    render: (args: Properties): TemplateResult => {
        const updateSliderConfig = (
            min: number,
            max: number,
            value: number,
            step: number
        ): void => {
            const slider = document.querySelector('sp-slider');
            if (slider) {
                slider.value = value;
                slider.min = min;
                slider.max = max;
                slider.step = step;
            }
        };

        return html`
            <overlay-trigger type="modal">
                <sp-button slot="trigger" variant="secondary">
                    Toggle menu
                </sp-button>
                <sp-tray slot="click-content">
                    <div style="padding: 8px; width: 100%">
                        <sp-slider
                            label="Slider Label"
                            min=${args.min}
                            max=${args.max}
                            value=${args.value}
                            step=${args.step}
                            variant="filled"
                            hide-stepper
                            editable
                        ></sp-slider>
                        <div
                            style="display: grid; gap: 8px; padding: 8px; width: 50%; margin: auto;"
                        >
                            <sp-button
                                size="s"
                                @click=${() =>
                                    updateSliderConfig(0.25, 4, 0.75, 0.01)}
                            >
                                Duration
                            </sp-button>
                            <sp-button
                                size="s"
                                @click=${() => updateSliderConfig(2, 100, 2, 1)}
                            >
                                Personality
                            </sp-button>
                            <sp-button
                                size="s"
                                @click=${() => updateSliderConfig(2, 25, 3, 1)}
                            >
                                Intensity
                            </sp-button>
                        </div>
                    </div>
                </sp-tray>
            </overlay-trigger>
        `;
    },

    args: {
        min: 0.25,
        max: 4,
        value: 0.75,
        step: 0.01,
    },
};

export const EditableWithDefaultValue = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    editable
                    max="360"
                    min="0"
                    value="90"
                    step="1"
                    default-value="180"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{
                        style: 'unit',
                        unit: 'degree',
                        unitDisplay: 'narrow',
                    }}
                    ...=${spreadProps(args)}
                >
                    Angle
                </sp-slider>
            </div>
        `;
    },

    swc_vrt: {
        skip: true,
    },

    parameters: {
        // Disables Chromatic's snapshotting on a global level
        chromatic: { disableSnapshot: true },
    },
};

export const EditableWithFractionValue = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    editable
                    max="255"
                    min="0.1"
                    value="0.5"
                    step="0.01"
                    default-value="18"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    ...=${spreadProps(args)}
                >
                    Angle
                </sp-slider>
            </div>
        `;
    },

    swc_vrt: {
        skip: true,
    },

    parameters: {
        // Disables Chromatic's snapshotting on a global level
        chromatic: { disableSnapshot: true },
    },
};

export const EditableDisabled = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    editable
                    disabled
                    max="360"
                    min="0"
                    value="90"
                    step="1"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{
                        style: 'unit',
                        unit: 'degree',
                        unitDisplay: 'narrow',
                    }}
                    ...=${spreadProps(args)}
                >
                    Angle
                </sp-slider>
            </div>
        `;
    },
};

export const EditableCustom = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div
                style="width: 500px; margin: 12px 20px; --mod-stepper-width: 150px;"
            >
                <sp-slider
                    editable
                    max="24"
                    min="0"
                    value="12.75"
                    step="0.25"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'unit', unit: 'hour' }}
                    ...=${spreadProps(args)}
                >
                    Hours
                </sp-slider>
            </div>
        `;
    },

    decorators: [editableDecorator],
};

export const EditableWithoutVisibleLabels = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    editable
                    max="1"
                    min="0"
                    value=".5"
                    step="0.01"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    Opacity
                </sp-slider>
            </div>
        `;
    },

    args: {
        labelVisibility: 'none',
    },
};

export const HideStepper = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    editable
                    hide-stepper
                    max="1"
                    min="0"
                    value=".5"
                    step="0.01"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    .formatOptions=${{ style: 'percent' }}
                    ...=${spreadProps(args)}
                >
                    Opacity
                </sp-slider>
            </div>
        `;
    },

    decorators: [editableDecorator],
};

export const Gradient = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <style>
                sp-slider {
                    --mod-slider-track-color: linear-gradient(
                        to right,
                        red,
                        green 100%
                    );
                }
                sp-slider[dir='rtl'] {
                    --mod-slider-track-color: linear-gradient(
                        to left,
                        red,
                        green 100%
                    );
                }
            </style>
            <div
                style="
                    width: 500px;
                    margin: 12px 20px;
                "
            >
                <sp-slider
                    label="Opacity"
                    max="100"
                    min="0"
                    value="50"
                    id="opacity-slider"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    ...=${spreadProps(args)}
                ></sp-slider>
            </div>
        `;
    },

    args: {
        variant: undefined,
    },
};

export const Tick = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <sp-slider
                label="Slider Label"
                variant="tick"
                min="0"
                max="92"
                ...=${spreadProps(args)}
            ></sp-slider>
            <sp-slider
                label="Slider Label"
                variant="tick"
                min="0"
                max="92"
                ...=${spreadProps(args)}
            ></sp-slider>
        `;
    },

    args: {
        variant: 'tick',
        tickStep: 5,
    },
};

export const TickLabels = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <sp-slider
                label="Slider Label"
                tick-labels
                variant="tick"
                min="50"
                max="75"
                ...=${spreadProps(args)}
            ></sp-slider>
            <sp-slider
                label="Slider Label"
                tick-labels
                variant="tick"
                min="50"
                max="75"
                ...=${spreadProps(args)}
            ></sp-slider>
        `;
    },

    args: {
        variant: 'tick',
        tickStep: 5,
    },
};

export const Disabled = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    disabled
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="Intensity"
                    ...=${spreadProps(args)}
                ></sp-slider>
            </div>
        `;
    },
};

export const Quiet = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    editable
                    hide-stepper
                    quiet
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="Intensity"
                    ...=${spreadProps(args)}
                ></sp-slider>
            </div>
        `;
    },
};

export const inPopover = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <sp-popover open style="min-width: 0">
                <sp-dialog no-divider>
                    <sp-slider
                        editable
                        hide-stepper
                        quiet
                        value="5"
                        step="0.5"
                        min="0"
                        max="20"
                        label="Intensity"
                        ...=${spreadProps(args)}
                    ></sp-slider>
                </sp-dialog>
            </sp-popover>
        `;
    },
};

export const Indeterminate = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    editable
                    indeterminate
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="Intensity"
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    ...=${spreadProps(args)}
                ></sp-slider>
            </div>
        `;
    },
};

export const ExplicitHandle = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    step="0.5"
                    min="0"
                    max="20"
                    @input=${handleHandleEvent(args)}
                    @change=${handleHandleEvent(args)}
                    ...=${spreadProps(args)}
                >
                    Intensity
                    <sp-slider-handle
                        slot="handle"
                        value="5"
                    ></sp-slider-handle>
                </sp-slider>
            </div>
        `;
    },
};

export const TwoHandles = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    value="5"
                    step="1"
                    min="0"
                    max="255"
                    @input=${handleHandleEvent(args)}
                    @change=${handleHandleEvent(args)}
                    ...=${spreadProps(args)}
                >
                    Output Levels
                    <sp-slider-handle
                        slot="handle"
                        name="min"
                        label="Minimum"
                        value="5"
                    ></sp-slider-handle>
                    <sp-slider-handle
                        slot="handle"
                        name="max"
                        label="Maximum"
                        value="250"
                    ></sp-slider-handle>
                </sp-slider>
            </div>
        `;
    },

    args: {
        variant: 'range',
        tickStep: 10,
    },
};

export const TwoHandlesPt = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    value="5"
                    step="1"
                    min="0"
                    max="255"
                    @input=${handleHandleEvent(args)}
                    @change=${handleHandleEvent(args)}
                    .formatOptions=${{
                        style: 'unit',
                        unit: 'pt',
                    }}
                    ...=${spreadProps(args)}
                >
                    Output Levels
                    <sp-slider-handle
                        slot="handle"
                        name="min"
                        label="Minimum"
                        value="5"
                    ></sp-slider-handle>
                    <sp-slider-handle
                        slot="handle"
                        name="max"
                        label="Maximum"
                        value="250"
                    ></sp-slider-handle>
                </sp-slider>
            </div>
        `;
    },

    args: {
        variant: 'range',
        tickStep: 10,
    },
};

export const ThreeHandlesPc = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    value="5"
                    step="1"
                    min="0"
                    max="255"
                    @input=${handleHandleEvent(args)}
                    @change=${handleHandleEvent(args)}
                    .formatOptions=${{ style: 'unit', unit: 'pc' }}
                    ...=${spreadProps(args)}
                >
                    Output Levels
                    <sp-slider-handle
                        slot="handle"
                        value="5"
                        label="Low"
                    ></sp-slider-handle>
                    <sp-slider-handle
                        slot="handle"
                        value="133"
                        label="Mid"
                    ></sp-slider-handle>
                    <sp-slider-handle
                        slot="handle"
                        value="250"
                        label="High"
                    ></sp-slider-handle>
                </sp-slider>
            </div>
        `;
    },

    args: {
        variant: 'range',
    },
};

export const ThreeHandlesOrdered = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    step="1"
                    min="0"
                    max="255"
                    @input=${handleHandleEvent(args)}
                    @change=${handleHandleEvent(args)}
                    ...=${spreadProps(args)}
                >
                    Output Levels
                    <sp-slider-handle
                        slot="handle"
                        name="low"
                        label="Low"
                        value="5"
                        max="next"
                    ></sp-slider-handle>
                    <sp-slider-handle
                        slot="handle"
                        name="mid"
                        label="Mid"
                        value="100"
                        min="previous"
                        max="next"
                    ></sp-slider-handle>
                    <sp-slider-handle
                        slot="handle"
                        name="high"
                        label="High"
                        value="250"
                        min="previous"
                    ></sp-slider-handle>
                </sp-slider>
            </div>
        `;
    },

    args: {
        variant: 'range',
        tickStep: 10,
    },
};

export const ThreeHandlesComplex = {
    render: (args: Properties = {}): TemplateResult => {
        const values: { [key: string]: number } = {
            black: 50,
            gray: 4.98,
            white: 225,
        };
        const handleEvent =
            ({ onInput, onChange }: Properties) =>
            (event: Event): void => {
                const target = event.target as SliderHandle;
                if (target.value != null) {
                    if (typeof target.value === 'object') {
                        const value = JSON.stringify(target.value, null, 2);
                        if (onInput && event.type === 'input') {
                            onInput(value);
                        } else if (onChange && event.type === 'change') {
                            onChange(value);
                        }
                    } else {
                        const value = `${target.name}: ${target.value}`;
                        if (onInput && event.type === 'input') {
                            onInput(value);
                        } else if (onChange && event.type === 'change') {
                            onChange(value);
                        }
                    }
                    values[target.name] = target.value;
                }
            };
        const grayNormalization = {
            toNormalized(value: number) {
                const normalizedBlack = values.black / 255;
                const normalizedWhite = values.white / 255;
                const clamped = Math.max(Math.min(value, 1), 0);
                return (
                    clamped * (normalizedWhite - normalizedBlack) +
                    normalizedBlack
                );
            },
            fromNormalized(value: number) {
                const normalizedBlack = values.black / 255;
                const normalizedWhite = values.white / 255;
                const clamped = Math.max(
                    Math.min(value, normalizedWhite),
                    normalizedBlack
                );

                return (
                    (clamped - normalizedBlack) /
                    (normalizedWhite - normalizedBlack)
                );
            },
        };
        const blackNormalization = {
            toNormalized(value: number) {
                const clamped = Math.min(value, values.white);
                return clamped / 255;
            },
            fromNormalized(value: number) {
                const denormalized = value * 255;
                return Math.min(denormalized, values.white);
            },
        };
        const whiteNormalization = {
            toNormalized(value: number) {
                const clamped = Math.max(value, values.black);
                return clamped / 255;
            },
            fromNormalized(value: number) {
                const denormalized = value * 255;
                return Math.max(denormalized, values.black);
            },
        };
        const computeGray = (value: number): string => {
            let result = 1.0;
            if (value > 0.5) {
                result = Math.max(2 * (1 - value), 0.01);
            } else if (value < 0.5) {
                result = ((1 - 2 * value) * (Math.sqrt(9.99) - 1) + 1) ** 2;
            }
            const formatOptions = {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            };
            return new Intl.NumberFormat(
                navigator.language,
                formatOptions
            ).format(result);
        };
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    step="1"
                    min="0"
                    max="255"
                    @input=${handleEvent}
                    @change=${handleEvent}
                    ...=${spreadProps(args)}
                >
                    Output Levels
                    <sp-slider-handle
                        slot="handle"
                        name="black"
                        label="Black"
                        value=${values.black}
                        .normalization=${blackNormalization}
                    ></sp-slider-handle>
                    <sp-slider-handle
                        slot="handle"
                        name="gray"
                        label="Gray"
                        value="0.215"
                        min="0"
                        max="1"
                        step="0.005"
                        .normalization=${grayNormalization}
                        .getAriaHandleText=${computeGray}
                    ></sp-slider-handle>
                    <sp-slider-handle
                        slot="handle"
                        name="white"
                        label="White"
                        value=${values.white}
                        .normalization=${whiteNormalization}
                    ></sp-slider-handle>
                </sp-slider>
            </div>
        `;
    },

    args: {
        variant: 'range',
        tickStep: 10,
    },
};

export const focusTabDemo = {
    render: (args: Properties = {}): TemplateResult => {
        const value = 50;
        const min = 0;
        const max = 100;
        const step = 1;
        return html`
            <div style="width: 500px; margin: 12px 20px 20px;">
                <sp-slider
                    value="${value}"
                    step="${step}"
                    min="${min}"
                    max="${max}"
                    label="Opacity"
                    id="opacity-slider-opacity"
                    ...=${spreadProps(args)}
                ></sp-slider>
            </div>
            <div style="width: 500px; margin: 20px;">
                <sp-slider
                    value="${value}"
                    step="${step}"
                    min="${min}"
                    max="${max}"
                    label="Lightness"
                    id="opacity-slider-lightness"
                    ...=${spreadProps(args)}
                ></sp-slider>
            </div>
            <div style="width: 500px; margin: 20px 20px 12px;">
                <sp-slider
                    value="${value}"
                    step="${step}"
                    min="${min}"
                    max="${max}"
                    label="Saturation"
                    id="opacity-slider-saturation"
                    ...=${spreadProps(args)}
                ></sp-slider>
            </div>
        `;
    },
};

export const WithPopover = {
    render: (args: Properties = {}): TemplateResult => {
        return html`
            <div style="width: 500px; margin: 12px 20px;">
                <sp-slider
                    id="slider-with-popover"
                    label="Slider without Popover"
                    variant="filled"
                    max="100"
                    min="0"
                    step="5"
                    value="50"
                    editable
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    ...=${spreadProps(args)}
                ></sp-slider>
                <overlay-trigger placement="top">
                    <sp-slider
                        slot="trigger"
                        id="slider-with-popover"
                        label="Label in attribute"
                        variant="filled"
                        max="100"
                        min="0"
                        step="5"
                        value="50"
                        editable
                        @input=${handleEvent(args)}
                        @change=${handleEvent(args)}
                        ...=${spreadProps(args)}
                    ></sp-slider>
                    <sp-popover slot="hover-content" tip>
                        Hover content for the slider
                    </sp-popover>
                </overlay-trigger>

                <overlay-trigger placement="top">
                    <sp-slider
                        slot="trigger"
                        id="slider-with-popover"
                        variant="filled"
                        max="100"
                        min="0"
                        step="5"
                        value="50"
                        editable
                        @input=${handleEvent(args)}
                        @change=${handleEvent(args)}
                        ...=${spreadProps(args)}
                    >
                        Label in slot
                    </sp-slider>
                    <sp-popover slot="hover-content" tip>
                        Hover content for the slider
                    </sp-popover>
                </overlay-trigger>
            </div>
        `;
    },

    args: {
        variant: 'filled',
    },

    parameters: {
        docs: {
            description: {
                story: 'A slider with a popover that appears on hover.',
            },
        },
    },
};
