import './sp-number-field-wilcTPCU.js';
import './sp-field-label-LR663cei.js';
import { s as spreadProps } from './lit-helpers-w3dXohpu.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import './LanguageResolution-433GhF-m.js';
import './streaming-listener-99YRN1c8.js';
import './lit-element-xBOPiTek.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './import-mabg3nA1.js';
import './sp-icon-chevron50-igO-rqhi.js';
import './Chevron50-QkUmZTlQ.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-EFa3DHxz.js';
import './define-element-tO8-r1bu.js';
import './sp-icon-chevron75-HpwXQK2K.js';
import './Chevron75-ykt7YsHW.js';
import './sp-icon-chevron100-byRnlRuE.js';
import './Chevron100-ok1mOHjI.js';
import './sp-icon-chevron200-mXgJDmZj.js';
import './Chevron200-uafXU_JZ.js';
import './sp-infield-button-J1tc9FoG.js';
import './ButtonBase--K-lWDuL.js';
import './like-anchor-A-VxslPW.js';
import './focusable-GZ06kf6F.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-RiUvi5fT.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './base-STdhtiz1.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './query-JMOstM_r.js';
import './sizedMixin-JAQz02f5.js';
import './platform-c1C9ET3y.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './Textfield-tevcOEW2.js';
import './manage-help-text-f9KNpcsn.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './random-id-M2k-wjyE.js';
import './spectrum-icon-checkmark.css-vEh5gvyq.js';
import './sp-icon-alert-HIZE6wdL.js';
import './custom-tag-JXLWq-Sj.js';
import './state-W6so4P5i.js';
import './ElementResolution-TTOqkMM7.js';

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
            style=${l(args.quiet ? void 0 : "width: 150px")}
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
