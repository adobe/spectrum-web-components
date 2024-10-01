import './sp-number-field-RGZKr7ku.js';
import './sp-field-label-oZHlTsnx.js';
import { s as spreadProps } from './lit-helpers-DFCD1oU3.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './LanguageResolution-BeoILyI5.js';
import './streaming-listener-CmIYw2xv.js';
import './lit-element-BulMEkr1.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './NumberFormatter-D3opD4iN.js';
import './sp-icon-chevron50-1BIfcIRv.js';
import './Chevron50-B5C39iR5.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './define-element-C_3bgzm7.js';
import './sp-icon-chevron75-3C3N8MIH.js';
import './Chevron75-hetG6rdn.js';
import './sp-icon-chevron100-BExoFMYC.js';
import './Chevron100-2ZEB0c-t.js';
import './sp-icon-chevron200-CILeLHoO.js';
import './Chevron200-DFmczfFD.js';
import './sp-infield-button-DkHXBbsS.js';
import './ButtonBase-Euqk2NbC.js';
import './like-anchor-B3Uz3TFY.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-BzkTbMb8.js';
import './platform-r3Lf9REX.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './Textfield-CNzGwBlh.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-NuoPlGW7.js';
import './sp-icon-alert-Cbypiip7.js';
import './custom-tag-Diwq7nXX.js';
import './state-DrummH0c.js';
import './ElementResolution-B9KteuX8.js';

var numberField_stories = {
  title: "Number Field",
  component: "sp-number-field",
  args: {
    disabled: false,
    readonly: false,
    quiet: false,
    value: void 0,
    placeholder: "",
    min: void 0,
    max: void 0,
    step: void 0
  },
  argTypes: {
    disabled: {
      name: "disabled",
      type: { name: "boolean", required: false },
      description: "Disable this control. It will not receive focus or events.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    indeterminate: {
      name: "indeterminate",
      type: { name: "boolean", required: false },
      description: "Whether the value of the Number Field can be determined for display.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    readonly: {
      name: "readonly",
      type: { name: "boolean", required: false },
      description: "When this control is read only, you will not be able to input an updated value.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    quiet: {
      name: "quiet",
      type: { name: "boolean", required: false },
      description: "An altered delivery with no background and only a bottom border.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    hideStepper: {
      name: "hide stepper",
      type: { name: "boolean", required: false },
      description: "Whether to remove the stepper UI from the control.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    value: {
      name: "value",
      type: { name: "number", required: false },
      description: "Value to apply to the control.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: void 0 }
      },
      control: {
        type: "number"
      }
    },
    step: {
      name: "step",
      type: { name: "number", required: false },
      description: "Amount to change the value by when using the stepper or arrow key interactions.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: void 0 }
      },
      control: {
        type: "number"
      }
    },
    stepModifier: {
      name: "step modifier",
      type: { name: "number", required: false },
      description: "Amount to scale the step increment/decrement when holding the shift key",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: 10 }
      },
      control: {
        type: "number"
      }
    },
    placeholder: {
      name: "placeholder",
      type: { name: "string", required: false },
      description: "Placeholder to apply to the control.",
      table: {
        type: { summary: "string" }
      },
      control: {
        type: "text"
      }
    },
    min: {
      name: "min",
      type: { name: "number", required: false },
      description: "The minimum value the control can be set to.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: void 0 }
      },
      control: {
        type: "number"
      }
    },
    max: {
      name: "max",
      type: { name: "numer", required: false },
      description: "The maximum value the control can be set to.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: void 0 }
      },
      control: {
        type: "number"
      }
    }
  }
};
const Default = (args = {}) => {
  const onChange = args.onChange || (() => {
    return;
  });
  const onInput = args.onInput || (() => {
    return;
  });
  return x`
        <sp-field-label for="default">Enter a number</sp-field-label>
        <sp-number-field
            id="default"
            ...=${spreadProps(args)}
            @input=${(event) => onInput(event.target.value)}
            @change=${(event) => onChange(event.target.value)}
            style=${o(args.quiet ? void 0 : "width: 150px")}
        ></sp-number-field>
    `;
};
Default.args = {
  value: 100
};
const quiet = (args = {}) => Default(args);
quiet.args = {
  quiet: true,
  value: 100
};
const indeterminate = (args = {}) => Default(args);
indeterminate.args = {
  value: 100,
  indeterminate: true
};
const decimals = (args) => {
  return x`
        <sp-field-label for="decimals">
            Enter a number with visible decimals
        </sp-field-label>
        <sp-number-field
            id="decimals"
            style="width: 200px"
            ...=${spreadProps(args)}
            @change=${args.onChange}
            @input=${args.onInput}
            .formatOptions=${{
    signDisplay: "exceptZero",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }}
        ></sp-number-field>
    `;
};
decimals.args = {
  value: 19.274
};
const germanDecimals = (args) => {
  return x`
        <sp-field-label for="decimals">
            Enter a number with visible decimals
        </sp-field-label>
        <sp-theme lang="de">
            <sp-number-field
                id="decimals"
                style="width: 200px"
                ...=${spreadProps(args)}
                @change=${args.onChange}
                .formatOptions=${{
    signDisplay: "exceptZero",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }}
            ></sp-number-field>
        </sp-theme>
    `;
};
germanDecimals.args = {
  value: 19.274
};
const percents = (args = {}) => {
  return x`
        <sp-field-label for="percents">Enter a percentage</sp-field-label>
        <sp-number-field
            id="percents"
            style="width: 200px"
            ...=${spreadProps(args)}
            @change=${args.onChange}
            .formatOptions=${{
    style: "percent",
    unitDisplay: "narrow"
  }}
        ></sp-number-field>
    `;
};
percents.args = {
  value: 0.372
};
const currency = (args = {}) => {
  return x`
        <sp-field-label for="currency">Enter a value in Euros</sp-field-label>
        <sp-number-field
            style="width: 200px"
            ...=${spreadProps(args)}
            @change=${args.onChange}
            .formatOptions=${{
    style: "currency",
    currency: "EUR",
    currencyDisplay: "code",
    currencySign: "accounting"
  }}
        ></sp-number-field>
    `;
};
currency.args = {
  value: 23.19
};
const units = (args) => {
  return x`
        <sp-field-label for="units">Enter a lengths in inches</sp-field-label>
        <sp-number-field
            id="units"
            style="width: 200px"
            ...=${spreadProps(args)}
            @change=${args.onChange}
            .formatOptions=${{
    style: "unit",
    unit: "inch",
    unitDisplay: "long"
  }}
        ></sp-number-field>
    `;
};
units.args = {
  value: 24
};
const pixels = (args) => {
  return x`
        <sp-field-label for="units">Enter a lengths in pixels</sp-field-label>
        <sp-number-field
            id="units"
            style="width: 200px"
            .formatOptions=${{
    style: "unit",
    unit: "px"
  }}
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-number-field>
    `;
};
pixels.args = {
  value: 800
};
const minMax = (args) => x`
    <sp-field-label for="min-max">
        Enter a value between 0 and 255
    </sp-field-label>
    <sp-number-field
        id="min-max"
        style="width: 200px"
        ...=${spreadProps(args)}
        @change=${args.onChange}
    ></sp-number-field>
`;
minMax.args = {
  value: 4,
  min: 0,
  max: 255
};
const hideStepper = (args) => {
  return x`
        <sp-field-label for="hideStepper">
            Enter a number without the stepper UI
        </sp-field-label>
        <sp-number-field
            id="hideStepper"
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-number-field>
    `;
};
hideStepper.args = {
  hideStepper: true,
  value: 67
};
const hideStepperQuiet = (args) => {
  return x`
        <sp-field-label for="hideStepper">
            Enter a number without the stepper UI
        </sp-field-label>
        <sp-number-field
            id="hideStepper"
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-number-field>
    `;
};
hideStepperQuiet.args = {
  hideStepper: true,
  value: 67,
  quiet: true
};
const disabled = (args) => {
  return x`
        <sp-field-label for="disabled">
            This Number Field is disabled
        </sp-field-label>
        <sp-number-field
            id="disabled"
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-number-field>
    `;
};
disabled.args = {
  disabled: true,
  value: 892
};
const readOnly = (args) => {
  return x`
        <sp-field-label for="readonly">
            You can only read the following value
        </sp-field-label>
        <sp-number-field
            id="readonly"
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-number-field>
    `;
};
readOnly.args = {
  readonly: true,
  value: "15"
};
const ScrollingContainer = (args = {}) => {
  const onChange = args.onChange || (() => {
    return;
  });
  const onInput = args.onInput || (() => {
    return;
  });
  return x`
        <style>
            .scroller {
                height: 140px;
                width: 200px;
                overflow-y: scroll;
                padding: 10px;
                background: var(--spectrum-gray-50);
            }

            .scroller > div {
                height: 1000px;
            }
        </style>
        <div class="scroller">
            <div>
                <sp-field-label for="default">Enter a number</sp-field-label>
                <sp-number-field
                    id="default"
                    ...=${spreadProps(args)}
                    @input=${(event) => onInput(event.target.value)}
                    @change=${(event) => onChange(event.target.value)}
                    style="width: 150px"
                ></sp-number-field>
                <p>
                    This box should not scroll when the focus is inside the
                    number field and field value is changed by using the mouse
                    wheel.
                </p>
            </div>
        </div>
    `;
};
const __namedExportsOrder = ['Default', 'quiet', 'indeterminate', 'decimals', 'germanDecimals', 'percents', 'currency', 'units', 'pixels', 'minMax', 'hideStepper', 'hideStepperQuiet', 'disabled', 'readOnly', 'ScrollingContainer'];

export { Default, ScrollingContainer, __namedExportsOrder, currency, decimals, numberField_stories as default, disabled, germanDecimals, hideStepper, hideStepperQuiet, indeterminate, minMax, percents, pixels, quiet, readOnly, units };
