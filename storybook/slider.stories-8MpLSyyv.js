import { v as variants } from './sp-slider-vY0dnaun.js';
import './sp-popover-ScQBhaVn.js';
import './sp-dialog-SsXcWaUa.js';
import { s as spreadProps } from './lit-helpers-w3dXohpu.js';
import { x } from './lit-html-GmIhAbMP.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './define-element-2O4ZhTAw.js';
import './lit-element-xBOPiTek.js';
import './LanguageResolution-433GhF-m.js';
import './import-mabg3nA1.js';
import './observe-slot-text-ybW1xuBS.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './base-STdhtiz1.js';
import './sizedMixin-mnNfh2gr.js';
import './sp-field-label--CBS1ijW.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-TDmbHQaH.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './query-JMOstM_r.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './style-map-ak5mT6xX.js';
import './if-defined-pV6JZKXB.js';
import './streaming-listener-99YRN1c8.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './repeat-ry-ySa1b.js';
import './sp-divider-GAw1eG-h.js';
import './divider.css-w129hLpK.js';
import './sp-close-button-xmnVNxRt.js';
import './spectrum-icon-cross.css-qXBF5GML.js';
import './ButtonBase-H8ie1_xx.js';
import './like-anchor-J4T73PxR.js';
import './sp-icon-cross500-b7wJeVSY.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-dfijI00y.js';
import './sp-icon-alert-Bolxr-zN.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-4wUJEG5g.js';
import './sp-button-RmYXnt4x.js';
import './when-kvvOyHr2.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';

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
const Filled = (args = {}) => {
  return x`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="1"
                variant="filled"
                min="0"
                value=".7"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{ style: "percent" }}
                ...=${spreadProps(args)}
            >
                Slider Label
            </sp-slider>
        </div>
    `;
};
const FillStart = (args = {}) => {
  return x`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="1"
                fill-start
                min="0"
                value=".7"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{ style: "percent" }}
                ...=${spreadProps(args)}
            >
                Slider label
            </sp-slider>
        </div>
    `;
};
const FillStartWithValue = (args = {}) => {
  return x`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="1"
                min="0"
                value=".7"
                step="0.1"
                fill-start="0.3"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{ style: "percent" }}
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
                .formatOptions=${{ style: "number" }}
                ...=${spreadProps(args)}
            >
                Value Less than Fill Start
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
const editableWithoutVisibleLabels = (args = {}) => {
  return x`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                editable
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
editableWithoutVisibleLabels.args = {
  labelVisibility: "none"
};
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
const __namedExportsOrder = ['Default', 'Filled', 'FillStart', 'FillStartWithValue', 'autofocus', 'minimalDOM', 'noVisibleTextLabel', 'noVisibleValueLabel', 'noVisibleLabels', 'px', 'max20', 'editable', 'editableDisabled', 'editableCustom', 'editableWithoutVisibleLabels', 'hideStepper', 'Gradient', 'tick', 'tickLabels', 'Disabled', 'Quiet', 'inPopover', 'Indeterminate', 'ExplicitHandle', 'TwoHandles', 'TwoHandlesPt', 'ThreeHandlesPc', 'ThreeHandlesOrdered', 'ThreeHandlesComplex', 'focusTabDemo'];

export { Default, Disabled, ExplicitHandle, FillStart, FillStartWithValue, Filled, Gradient, Indeterminate, Quiet, ThreeHandlesComplex, ThreeHandlesOrdered, ThreeHandlesPc, TwoHandles, TwoHandlesPt, __namedExportsOrder, autofocus, slider_stories as default, editable, editableCustom, editableDisabled, editableWithoutVisibleLabels, focusTabDemo, hideStepper, inPopover, max20, minimalDOM, noVisibleLabels, noVisibleTextLabel, noVisibleValueLabel, px, tick, tickLabels };
