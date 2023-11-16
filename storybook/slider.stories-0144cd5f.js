import { v as variants } from './sp-slider-5459181f.js';
import './sp-popover-adc6def6.js';
import './sp-dialog-cda58311.js';
import { s as spreadProps } from './lit-helpers-bb820419.js';
import { x } from './lit-html-126adc72.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './define-element-467f3dc4.js';
import './lit-element-9354aa77.js';
import './LanguageResolution-630dfe34.js';
import './import-76526f12.js';
import './observe-slot-text-2a3e6366.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-6218f033.js';
import './base-511c8c11.js';
import './sizedMixin-95b38e3e.js';
import './sp-field-label-5c290246.js';
import './custom-tag-c228386e.js';
import './IconBase-fdbfb1c1.js';
import './condition-attribute-with-id-62869347.js';
import './ElementResolution-b58a0825.js';
import './query-d0113d5a.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './if-defined-ae83b405.js';
import './streaming-listener-70cd7ec3.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './repeat-c64faecc.js';
import './sp-divider-5c291ed1.js';
import './divider.css-d14b5633.js';
import './sp-close-button-8c1265c1.js';
import './spectrum-icon-cross.css-8adfc305.js';
import './ButtonBase-4ebd5d24.js';
import './like-anchor-79c92c76.js';
import './sp-button-group-6af1a728.js';
import './sp-icon-alert-107ad358.js';
import './custom-tag-b5526d41.js';
import './AlertDialog-09588482.js';
import './sp-button-c571335c.js';
import './resize-controller-55608b66.js';
import './observe-slot-presence-ae37a9bc.js';

var slider_stories = {
  component: "sp-slider",
  title: "Slider",
  argTypes: {
    onInput: { action: "input" },
    onChange: { action: "change" },
    variant: {
      name: "Variant",
      description: "Determines the style of slider.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: void 0 }
      },
      control: {
        type: "inline-radio",
        options: [void 0, ...variants]
      }
    },
    tickStep: {
      name: "Tick Step",
      description: "Tick spacing on slider.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: 0.1 }
      },
      control: {
        type: "number"
      }
    },
    labelVisibility: {
      name: "Label Visibility",
      description: "The labels visibily available in the UI",
      table: {
        type: { summary: '"text" | "value" | "none" | undefined' },
        defaultValue: { summary: void 0 }
      },
      control: {
        type: "text"
      }
    }
  },
  args: {
    variant: void 0,
    tickStep: 0.1,
    labelVisibility: void 0
  }
};
const handleEvent = ({ onInput, onChange }) => (event) => {
  const { value } = event.target;
  if (onInput && event.type === "input") {
    onInput(value.toString());
  } else if (onChange && event.type === "change") {
    onChange(value.toString());
  }
};
const handleHandleEvent = ({ onInput, onChange }) => (event) => {
  const target = event.target;
  if (target.value != null) {
    if (typeof target.value === "object") {
      const value = JSON.stringify(target.value, null, 2);
      if (onInput && event.type === "input") {
        onInput(value);
      } else if (onChange && event.type === "change") {
        onChange(value);
      }
    } else {
      const value = `${target.name}: ${target.value}`;
      if (onInput && event.type === "input") {
        onInput(value);
      } else if (onChange && event.type === "change") {
        onChange(value);
      }
    }
  }
};
const Default = (args = {}) => {
  return x`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{ style: "percent" }}
                ...=${spreadProps(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;
};
const autofocus = (args = {}) => {
  return x`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                autofocus
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{ style: "percent" }}
                ...=${spreadProps(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;
};
const minimalDOM = () => {
  return x`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider>Opacity</sp-slider>
        </div>
    `;
};
const noVisibleTextLabel = (args = {}) => {
  return x`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{ style: "percent" }}
                ...=${spreadProps(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;
};
noVisibleTextLabel.args = {
  labelVisibility: "value"
};
const noVisibleValueLabel = (args = {}) => {
  return x`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{ style: "percent" }}
                ...=${spreadProps(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;
};
noVisibleValueLabel.args = {
  labelVisibility: "text"
};
const noVisibleLabels = (args = {}) => {
  return x`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{ style: "percent" }}
                ...=${spreadProps(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;
};
noVisibleLabels.args = {
  labelVisibility: "none"
};
const px = (args = {}) => {
  return x`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                max="360"
                min="0"
                value="90"
                step="1"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{
    style: "unit",
    unit: "px"
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
    this.numberFieldLoaderPromise = Promise.resolve(false);
    this.numberFieldLoaderPromise = new Promise((res) => {
      customElements.whenDefined("sp-number-field").then(() => {
        res(true);
      });
    });
  }
  get updateComplete() {
    return this.numberFieldLoaderPromise;
  }
}
customElements.define("number-field-defined", NumberFieldDefined);
const editableDecorator = (story) => {
  return x`
        ${story()}
        <number-field-defined></number-field-defined>
    `;
};
const max20 = (args = {}) => {
  return x`
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
  skip: true
};
const editable = (args = {}) => {
  return x`
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
    style: "unit",
    unit: "degree",
    unitDisplay: "narrow"
  }}
                ...=${spreadProps(args)}
            >
                Angle
            </sp-slider>
        </div>
    `;
};
editable.decorators = [editableDecorator];
const editableDisabled = (args = {}) => {
  return x`
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
    style: "unit",
    unit: "degree",
    unitDisplay: "narrow"
  }}
                ...=${spreadProps(args)}
            >
                Angle
            </sp-slider>
        </div>
    `;
};
editable.decorators = [editableDecorator];
const editableCustom = (args = {}) => {
  return x`
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
                .formatOptions=${{ style: "unit", unit: "hour" }}
                ...=${spreadProps(args)}
            >
                Hours
            </sp-slider>
        </div>
    `;
};
editableCustom.decorators = [editableDecorator];
const hideStepper = (args = {}) => {
  return x`
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
                .formatOptions=${{ style: "percent" }}
                ...=${spreadProps(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;
};
hideStepper.decorators = [editableDecorator];
const Gradient = (args = {}) => {
  return x`
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
  variant: void 0
};
const tick = (args = {}) => {
  return x`
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
  variant: "tick",
  tickStep: 5
};
const tickLabels = (args = {}) => {
  return x`
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
  variant: "tick",
  tickStep: 5
};
const Disabled = (args = {}) => {
  return x`
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
const Quiet = (args = {}) => {
  return x`
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
const inPopover = (args = {}) => {
  return x`
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
const Indeterminate = (args = {}) => {
  return x`
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
const ExplicitHandle = (args = {}) => {
  return x`
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
const TwoHandles = (args = {}) => {
  return x`
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
  variant: "range",
  tickStep: 10
};
const TwoHandlesPt = (args = {}) => {
  return x`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                value="5"
                step="1"
                min="0"
                max="255"
                @input=${handleHandleEvent(args)}
                @change=${handleHandleEvent(args)}
                .formatOptions=${{
    style: "unit",
    unit: "pt"
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
  variant: "range",
  tickStep: 10
};
const ThreeHandlesPc = (args = {}) => {
  return x`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                value="5"
                step="1"
                min="0"
                max="255"
                @input=${handleHandleEvent(args)}
                @change=${handleHandleEvent(args)}
                .formatOptions=${{ style: "unit", unit: "pc" }}
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
  variant: "range"
};
const ThreeHandlesOrdered = (args = {}) => {
  return x`
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
  variant: "range",
  tickStep: 10
};
const ThreeHandlesComplex = (args = {}) => {
  const values = {
    black: 50,
    gray: 4.98,
    white: 225
  };
  const handleEvent2 = ({ onInput, onChange }) => (event) => {
    const target = event.target;
    if (target.value != null) {
      if (typeof target.value === "object") {
        const value = JSON.stringify(target.value, null, 2);
        if (onInput && event.type === "input") {
          onInput(value);
        } else if (onChange && event.type === "change") {
          onChange(value);
        }
      } else {
        const value = `${target.name}: ${target.value}`;
        if (onInput && event.type === "input") {
          onInput(value);
        } else if (onChange && event.type === "change") {
          onChange(value);
        }
      }
      values[target.name] = target.value;
    }
  };
  const grayNormalization = {
    toNormalized(value) {
      const normalizedBlack = values.black / 255;
      const normalizedWhite = values.white / 255;
      const clamped = Math.max(Math.min(value, 1), 0);
      return clamped * (normalizedWhite - normalizedBlack) + normalizedBlack;
    },
    fromNormalized(value) {
      const normalizedBlack = values.black / 255;
      const normalizedWhite = values.white / 255;
      const clamped = Math.max(
        Math.min(value, normalizedWhite),
        normalizedBlack
      );
      return (clamped - normalizedBlack) / (normalizedWhite - normalizedBlack);
    }
  };
  const blackNormalization = {
    toNormalized(value) {
      const clamped = Math.min(value, values.white);
      return clamped / 255;
    },
    fromNormalized(value) {
      const denormalized = value * 255;
      return Math.min(denormalized, values.white);
    }
  };
  const whiteNormalization = {
    toNormalized(value) {
      const clamped = Math.max(value, values.black);
      return clamped / 255;
    },
    fromNormalized(value) {
      const denormalized = value * 255;
      return Math.max(denormalized, values.black);
    }
  };
  const computeGray = (value) => {
    let result = 1;
    if (value > 0.5) {
      result = Math.max(2 * (1 - value), 0.01);
    } else if (value < 0.5) {
      result = ((1 - 2 * value) * (Math.sqrt(9.99) - 1) + 1) ** 2;
    }
    const formatOptions = {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    };
    return new Intl.NumberFormat(navigator.language, formatOptions).format(
      result
    );
  };
  return x`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                step="1"
                min="0"
                max="255"
                @input=${handleEvent2}
                @change=${handleEvent2}
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
  variant: "range",
  tickStep: 10
};
const focusTabDemo = (args = {}) => {
  const value = 50;
  const min = 0;
  const max = 100;
  const step = 1;
  return x`
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
const __namedExportsOrder = ['Default', 'autofocus', 'minimalDOM', 'noVisibleTextLabel', 'noVisibleValueLabel', 'noVisibleLabels', 'px', 'max20', 'editable', 'editableDisabled', 'editableCustom', 'hideStepper', 'Gradient', 'tick', 'tickLabels', 'Disabled', 'Quiet', 'inPopover', 'Indeterminate', 'ExplicitHandle', 'TwoHandles', 'TwoHandlesPt', 'ThreeHandlesPc', 'ThreeHandlesOrdered', 'ThreeHandlesComplex', 'focusTabDemo'];

export { Default, Disabled, ExplicitHandle, Gradient, Indeterminate, Quiet, ThreeHandlesComplex, ThreeHandlesOrdered, ThreeHandlesPc, TwoHandles, TwoHandlesPt, __namedExportsOrder, autofocus, slider_stories as default, editable, editableCustom, editableDisabled, focusTabDemo, hideStepper, inPopover, max20, minimalDOM, noVisibleLabels, noVisibleTextLabel, noVisibleValueLabel, px, tick, tickLabels };
