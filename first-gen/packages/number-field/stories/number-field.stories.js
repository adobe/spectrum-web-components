"use strict";
import { html } from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/number-field/sp-number-field.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import { spreadProps } from "../../../test/lit-helpers.js";
export default {
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
export const Default = (args = {}) => {
  const onChange = args.onChange || (() => {
    return;
  });
  const onInput = args.onInput || (() => {
    return;
  });
  return html`
        <sp-field-label for="default">Enter a number</sp-field-label>
        <sp-number-field
            id="default"
            ...=${spreadProps(args)}
            @input=${(event) => onInput(event.target.value)}
            @change=${(event) => onChange(event.target.value)}
            style=${ifDefined(args.quiet ? void 0 : "")}
        ></sp-number-field>
    `;
};
Default.args = {
  value: 100
};
export const quiet = (args = {}) => Default(args);
quiet.args = {
  quiet: true,
  value: 100
};
export const indeterminate = (args = {}) => Default(args);
indeterminate.args = {
  value: 100,
  indeterminate: true
};
export const decimals = (args) => {
  return html`
        <sp-field-label for="decimals">
            Enter a number with visible decimals
        </sp-field-label>
        <sp-number-field
            id="decimals"
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
export const germanDecimals = (args) => {
  let currentDir = "ltr";
  if (window.__swc_hack_knobs__) {
    currentDir = window.__swc_hack_knobs__.defaultDirection;
  }
  return html`
        <sp-field-label for="decimals">
            Enter a number with visible decimals
        </sp-field-label>
        <sp-theme lang="de" dir="${currentDir}">
            <sp-number-field
                id="decimals"
                ...=${spreadProps(args)}
                @change=${args.onChange}
                @input=${args.onInput}
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
export const percents = (args = {}) => {
  return html`
        <sp-field-label for="percents">Enter a percentage</sp-field-label>
        <sp-number-field
            id="percents"
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
export const currency = (args = {}) => {
  return html`
        <sp-field-label for="currency">Enter a value in Euros</sp-field-label>
        <sp-number-field
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
export const units = (args) => {
  return html`
        <sp-field-label for="units">Enter a lengths in inches</sp-field-label>
        <sp-number-field
            id="units"
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
export const pixels = (args) => {
  return html`
        <sp-field-label for="units">Enter a lengths in pixels</sp-field-label>
        <sp-number-field
            id="units"
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
export const minMax = (args) => html`
    <sp-field-label for="min-max">
        Enter a value between 0 and 255
    </sp-field-label>
    <sp-number-field
        id="min-max"
        ...=${spreadProps(args)}
        @change=${args.onChange}
    ></sp-number-field>
`;
minMax.args = {
  value: 4,
  min: 0,
  max: 255
};
export const hideStepper = (args) => {
  return html`
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
export const hideStepperQuiet = (args) => {
  return html`
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
export const disabled = (args) => {
  return html`
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
export const readOnly = (args) => {
  return html`
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
export const validationIcons = (args) => {
  return html`
        <sp-field-label for="invalidHiddenStepper">
            Invalid Number Field without Stepper
        </sp-field-label>
        <sp-number-field
            invalid
            id="invalidHiddenStepper"
            ...=${spreadProps(args)}
            invalid
        ></sp-number-field>
        <sp-field-label for="validStepper">
            Valid Number Field with Stepper
        </sp-field-label>
        <sp-number-field id="validStepper" valid></sp-number-field>
        <sp-field-label for="invalidStepper">
            Invalid Number Field with Stepper
        </sp-field-label>
        <sp-number-field id="invalidStepper" invalid></sp-number-field>
    `;
};
validationIcons.args = {
  invalid: true,
  value: "15",
  hideStepper: true
};
export const ScrollingContainer = (args = {}) => {
  const onChange = args.onChange || (() => {
    return;
  });
  const onInput = args.onInput || (() => {
    return;
  });
  return html`
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
//# sourceMappingURL=number-field.stories.js.map
