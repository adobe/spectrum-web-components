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
    },
};

export interface StoryArgs {
    variant?: string;
    tickStep?: number;
    labelVisibility?: string;
    onInput?: (val: string) => void;
    onChange?: (val: string) => void;
    [prop: string]: unknown;
}

const handleEvent =
    ({ onInput, onChange }: StoryArgs) =>
    (event: Event): void => {
        const { value } = event.target as Slider;
        if (onInput && event.type === 'input') {
            onInput(value.toString());
        } else if (onChange && event.type === 'change') {
            onChange(value.toString());
        }
    };

const handleHandleEvent =
    ({ onInput, onChange }: StoryArgs) =>
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

export const Default = (args: StoryArgs = {}): TemplateResult => {
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
};

export const autofocus = (args: StoryArgs = {}): TemplateResult => {
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
};

export const minimalDOM = (): TemplateResult => {
    return html`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider>Opacity</sp-slider>
        </div>
    `;
};

export const noVisibleTextLabel = (args: StoryArgs = {}): TemplateResult => {
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
};
noVisibleTextLabel.args = {
    labelVisibility: 'value',
};

export const noVisibleValueLabel = (args: StoryArgs = {}): TemplateResult => {
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
};
noVisibleValueLabel.args = {
    labelVisibility: 'text',
};

export const noVisibleLabels = (args: StoryArgs = {}): TemplateResult => {
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
};
noVisibleLabels.args = {
    labelVisibility: 'none',
};

export const px = (args: StoryArgs = {}): TemplateResult => {
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

export const max20 = (args: StoryArgs = {}): TemplateResult => {
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
};
max20.swc_vrt = {
    skip: true,
};

export const editable = (args: StoryArgs = {}): TemplateResult => {
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
};

editable.decorators = [editableDecorator];

export const editableDisabled = (args: StoryArgs = {}): TemplateResult => {
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
};

editable.decorators = [editableDecorator];

export const editableCustom = (args: StoryArgs = {}): TemplateResult => {
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
};

editableCustom.decorators = [editableDecorator];

export const hideStepper = (args: StoryArgs = {}): TemplateResult => {
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
};

hideStepper.decorators = [editableDecorator];

export const Gradient = (args: StoryArgs = {}): TemplateResult => {
    return html`
        <div
            style="
                width: 500px;
                margin: 12px 20px;
            "
        >
            <sp-slider
                style="
                    --spectrum-slider-track-color:linear-gradient(to right, red, green 100%);
                    --spectrum-slider-track-color-rtl:linear-gradient(to left, red, green 100%);
                "
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
};
Gradient.args = {
    variant: undefined,
};

export const tick = (args: StoryArgs = {}): TemplateResult => {
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
};
tick.args = {
    variant: 'tick',
    tickStep: 5,
};

export const tickLabels = (args: StoryArgs = {}): TemplateResult => {
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
};
tickLabels.args = {
    variant: 'tick',
    tickStep: 5,
};

export const Disabled = (args: StoryArgs = {}): TemplateResult => {
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
};

export const Quiet = (args: StoryArgs = {}): TemplateResult => {
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
};

export const inPopover = (args: StoryArgs = {}): TemplateResult => {
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
};

export const Indeterminate = (args: StoryArgs = {}): TemplateResult => {
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
};

export const ExplicitHandle = (args: StoryArgs = {}): TemplateResult => {
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
                <sp-slider-handle slot="handle" value="5"></sp-slider-handle>
            </sp-slider>
        </div>
    `;
};

export const TwoHandles = (args: StoryArgs = {}): TemplateResult => {
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
};
TwoHandles.args = {
    variant: 'range',
    tickStep: 10,
};

export const TwoHandlesPt = (args: StoryArgs = {}): TemplateResult => {
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
};
TwoHandlesPt.args = {
    variant: 'range',
    tickStep: 10,
};

export const ThreeHandlesPc = (args: StoryArgs = {}): TemplateResult => {
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
};
ThreeHandlesPc.args = {
    variant: 'range',
};

export const ThreeHandlesOrdered = (args: StoryArgs = {}): TemplateResult => {
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
};
ThreeHandlesOrdered.args = {
    variant: 'range',
    tickStep: 10,
};

// This is a very complex example from an actual application.
//
// The first and last handles go from 0 to 255 in a linear fashion.
// The last and first handles are ordered so that the last handle
// must be greater than or equal to the first handle.
//
// The middle handle's range goes from 9.99 to 0.01, counting down.
// the middle handle's limits are set by the outer handles such that
// the position of the left handle is the staring value (9.99) for the
// middle handle. And the position of the right handle is the end
// value (0.01). That means that the middle handle will move
// proportionally as you move the outer handles.
//
// The two other interesting features of the middle handle are that
// it counts down, and that it does so exponentially for the first
// half of its range.
//
// Because the specification for the <input> tag in HTML says that the
// min should be less than the max, we do a double normalization to make
// this work. The middle handle is considered to go between 0 and 1,
// where 0 is the left handle's position and 1 is the right handle's
// position. We then do the appropriate calculation to convert that
// value into one between 9.99 and 0.01 for display to the user.
//
// One iteresting thing to note is that the normalization function
// can also be used to enforce clamping.
//
export const ThreeHandlesComplex = (args: StoryArgs = {}): TemplateResult => {
    const values: { [key: string]: number } = {
        black: 50,
        gray: 4.98,
        white: 225,
    };
    const handleEvent =
        ({ onInput, onChange }: StoryArgs) =>
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
                clamped * (normalizedWhite - normalizedBlack) + normalizedBlack
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
        return new Intl.NumberFormat(navigator.language, formatOptions).format(
            result
        );
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
};
ThreeHandlesComplex.args = {
    variant: 'range',
    tickStep: 10,
};

export const focusTabDemo = (args: StoryArgs = {}): TemplateResult => {
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
};
