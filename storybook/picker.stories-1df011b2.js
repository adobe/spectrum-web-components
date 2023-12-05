import './sp-picker-7d6085a2.js';
import './sp-menu-item-5c79edad.js';
import './sp-tooltip-49fe3509.js';
import './sp-icon-edit-fb5148df.js';
import './sp-icon-delete-fa5ccf41.js';
import './sp-field-label-286ffe1f.js';
import { s as spreadProps } from './lit-helpers-bb820419.js';
import { x } from './lit-html-126adc72.js';
import './Picker-8447befb.js';
import './lit-element-9354aa77.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './define-element-617dba69.js';
import './sp-icon-chevron100-b4103ec6.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './sp-icon-alert-4033bfea.js';
import './custom-tag-b5526d41.js';
import './sp-menu-1872a394.js';
import './sizedMixin-9a9da45c.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './if-defined-ae83b405.js';
import './state-59f591cf.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './like-anchor-86192240.js';
import './mutation-controller-81a30f7f.js';
import './observe-slot-text-94a58958.js';
import './query-assigned-nodes-db063b1b.js';
import './observe-slot-presence-ae37a9bc.js';
import './focusable-selectors-252ae36e.js';
import './Edit-e6e8ae2a.js';
import './Delete-8be4a327.js';
import './condition-attribute-with-id-62869347.js';
import './ElementResolution-b58a0825.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';

const states = [
  {
    id: "lb1-al",
    label: "Alabama"
  },
  {
    id: "lb1-ak",
    label: "Alaska"
  },
  {
    id: "lb1-as",
    label: "American Samoa"
  },
  {
    id: "lb1-az",
    label: "Arizona"
  },
  {
    id: "lb1-ar",
    label: "Arkansas"
  },
  {
    id: "lb1-ca",
    label: "California"
  },
  {
    id: "lb1-co",
    label: "Colorado"
  },
  {
    id: "lb1-ct",
    label: "Connecticut"
  },
  {
    id: "lb1-de",
    label: "Delaware"
  },
  {
    id: "lb1-dc",
    label: "District of Columbia"
  },
  {
    id: "lb1-fl",
    label: "Florida"
  },
  {
    id: "lb1-ga",
    label: "Georgia"
  },
  {
    id: "lb1-gm",
    label: "Guam"
  },
  {
    id: "lb1-hi",
    label: "Hawaii"
  },
  {
    id: "lb1-id",
    label: "Idaho"
  },
  {
    id: "lb1-il",
    label: "Illinois"
  },
  {
    id: "lb1-in",
    label: "Indiana"
  },
  {
    id: "lb1-ia",
    label: "Iowa"
  },
  {
    id: "lb1-ks",
    label: "Kansas"
  },
  {
    id: "lb1-ky",
    label: "Kentucky"
  },
  {
    id: "lb1-la",
    label: "Louisiana"
  },
  {
    id: "lb1-me",
    label: "Maine"
  },
  {
    id: "lb1-md",
    label: "Maryland"
  },
  {
    id: "lb1-ma",
    label: "Massachusetts"
  },
  {
    id: "lb1-mi",
    label: "Michigan"
  },
  {
    id: "lb1-mn",
    label: "Minnesota"
  },
  {
    id: "lb1-ms",
    label: "Mississippi"
  },
  {
    id: "lb1-mo",
    label: "Missouri"
  },
  {
    id: "lb1-mt",
    label: "Montana"
  },
  {
    id: "lb1-ne",
    label: "Nebraska"
  },
  {
    id: "lb1-nv",
    label: "Nevada"
  },
  {
    id: "lb1-nh",
    label: "New Hampshire"
  },
  {
    id: "lb1-nj",
    label: "New Jersey"
  },
  {
    id: "lb1-nm",
    label: "New Mexico"
  },
  {
    id: "lb1-ny",
    label: "New York"
  },
  {
    id: "lb1-nc",
    label: "North Carolina"
  },
  {
    id: "lb1-nd",
    label: "North Dakota"
  },
  {
    id: "lb1-mp",
    label: "Northern Marianas Islands"
  },
  {
    id: "lb1-oh",
    label: "Ohio"
  },
  {
    id: "lb1-ok",
    label: "Oklahoma"
  },
  {
    id: "lb1-or",
    label: "Oregon"
  },
  {
    id: "lb1-pa",
    label: "Pennsylvania"
  },
  {
    id: "lb1-pr",
    label: "Puerto Rico"
  },
  {
    id: "lb1-ri",
    label: "Rhode Island"
  },
  {
    id: "lb1-sc",
    label: "South Carolina"
  },
  {
    id: "lb1-sd",
    label: "South Dakota"
  },
  {
    id: "lb1-tn",
    label: "Tennessee"
  },
  {
    id: "lb1-tx",
    label: "Texas"
  },
  {
    id: "lb1-ut",
    label: "Utah"
  },
  {
    id: "lb1-ve",
    label: "Vermont"
  },
  {
    id: "lb1-va",
    label: "Virginia"
  },
  {
    id: "lb1-vi",
    label: "Virgin Islands"
  },
  {
    id: "lb1-wa",
    label: "Washington"
  },
  {
    id: "lb1-wv",
    label: "West Virginia"
  },
  {
    id: "lb1-wi",
    label: "Wisconsin"
  },
  {
    id: "lb1-wy",
    label: "Wyoming"
  }
];

var picker_stories = {
  title: "Picker",
  component: "sp-picker",
  args: {
    disabled: false,
    invalid: false,
    open: false,
    quiet: false
  },
  argTypes: {
    onChange: { action: "change" },
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
    invalid: {
      name: "invalid",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      description: "Whether the menu is open or not.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: "boolean"
    },
    quiet: {
      name: "quiet",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    }
  }
};
const handleChange = ({ onChange }) => (event) => {
  const picker = event.target;
  if (onChange)
    onChange(picker.value);
};
const Default = (args) => {
  return x`
        <sp-field-label for="picker-1">Where do you live?</sp-field-label>
        <sp-picker
            id="picker-1"
            @change=${handleChange(args)}
            label="Select a Country with a very long label, too long, in fact"
            ${spreadProps(args)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;
};
const tooltip = (args) => {
  const { open, ...rest } = args;
  return x`
        <sp-field-label for="picker-1">Where do you live?</sp-field-label>
        <sp-picker
            id="picker-1"
            @change=${handleChange(args)}
            label="Select a Country with a very long label, too long, in fact"
            ${spreadProps(rest)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
            <sp-tooltip
                slot="tooltip"
                ?open=${open}
                self-managed
                placement="right"
            >
                This Picker wants to know where you live.
            </sp-tooltip>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;
};
tooltip.args = {
  open: true
};
const noVisibleLabel = (args) => {
  return x`
        <sp-picker
            @change=${handleChange(args)}
            label="Where do you live?"
            ${spreadProps(args)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;
};
const slottedLabel = (args) => {
  return x`
        <sp-picker @change=${handleChange(args)} ${spreadProps(args)}>
            <span slot="label">Where do you live?</span>
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;
};
const quiet = (args) => {
  return x`
        <sp-field-label for="picker-quiet">Where do you live?</sp-field-label>
        <sp-picker
            ${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
            label="Pick an item"
        >
            <sp-menu-item value="1">Item 1</sp-menu-item>
            <sp-menu-item value="2">Item 2</sp-menu-item>
            <sp-menu-item value="3">Item 3</sp-menu-item>
            <sp-menu-item value="4">Item 4</sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;
};
quiet.args = {
  quiet: true
};
const icons = (args) => {
  return x`
        <sp-field-label for="picker-quiet">
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ...=${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
            label="Pick an action"
            value="1"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-picker>
    `;
};
const iconsNone = (args) => {
  return x`
        <sp-field-label for="picker-quiet">
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ...=${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
            label="Pick an action"
            value="1"
            icons="none"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-picker>
    `;
};
iconsNone.args = {
  open: true
};
const iconValue = (args) => {
  return x`
        <sp-field-label for="picker-quiet">
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ...=${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
            label="Pick an action"
            icons="only"
            style="--spectrum-picker-width: 100px"
            value="2"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-picker>
    `;
};
const iconsOnly = (args) => {
  return x`
        <sp-field-label for="picker-quiet">
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ...=${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
            label="Pick an action"
            style="--spectrum-picker-width: 100px"
            value="3"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon" label="Copy"></sp-icon-copy>
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon" label="Delete"></sp-icon-delete>
            </sp-menu-item>
        </sp-picker>
    `;
};
iconsOnly.args = {
  open: true
};
const Open = (args) => {
  return x`
        <style>
            fieldset {
                float: left;
                clear: left;
                margin-bottom: 15px;
            }
            .backdrop-filter-test {
                backdrop-filter: saturate(80%);
            }
        </style>
        <fieldset class="backdrop-filter-test">
            <sp-field-label for="picker-open">
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-open"
                label="Open picker"
                ${spreadProps(args)}
                @change=${handleChange(args)}
            >
                <span slot="label">
                    Select a Country with a very long label, too long, in fact
                </span>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-picker>
        </fieldset>
        <fieldset>
            <sp-field-label for="picker-closed">
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-closed"
                label="Picker that displays below the options"
                @change=${handleChange(args)}
            >
                <span slot="label">
                    Other menu that goes behind the open one
                </span>
                <sp-menu-item>Not so many options...</sp-menu-item>
            </sp-picker>
        </fieldset>
    `;
};
Open.args = {
  open: true
};
const initialValue = (args) => {
  return x`
        <sp-field-label for="picker-initial">Where do you live?</sp-field-label>
        <sp-picker
            id="picker-initial"
            @change=${handleChange(args)}
            value="item-2"
            ${spreadProps(args)}
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu-item value="item-1">Deselect</sp-menu-item>
            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="item-3">Feather...</sp-menu-item>
            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="item-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>
        </sp-picker>
    `;
};
const readonly = (args) => {
  return x`
        <sp-picker
            @change=${handleChange(args)}
            readonly
            value="item-2"
            ${spreadProps(args)}
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu-item value="item-1">Deselect</sp-menu-item>
            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="item-3">Feather...</sp-menu-item>
            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="item-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>
        </sp-picker>
    `;
};
function nextFrame() {
  return new Promise((res) => requestAnimationFrame(() => res()));
}
class CustomPickerReady extends HTMLElement {
  constructor() {
    super();
    this.handleTriggerOpened = async () => {
      await nextFrame();
      const picker = document.querySelector("#picker-state");
      picker.addEventListener("sp-opened", this.handlePickerOpen);
      picker.open = true;
    };
    this.handlePickerOpen = async () => {
      const picker = document.querySelector("#picker-state");
      const actions = [nextFrame, picker.updateComplete];
      await Promise.all(actions);
      this.ready(true);
    };
    this.readyPromise = Promise.resolve(false);
    this.readyPromise = new Promise((res) => {
      this.ready = res;
      this.setup();
    });
  }
  async setup() {
    await nextFrame();
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("complex-picker-ready", CustomPickerReady);
const customPickerDecorator = (story) => {
  return x`
        ${story()}
        <custom-picker-ready></custom-picker-ready>
    `;
};
const custom = (args) => {
  const initialState = "lb1-mo";
  return x`
        <sp-field-label for="picker-state">
            What state do you live in?
        </sp-field-label>
        <sp-picker
            style="width: 400px;"
            @change=${handleChange(args)}
            id="picker-state"
            label="Pick a state"
            ${spreadProps(args)}
            value=${initialState}
        >
            ${states.map(
    (state) => x`
                    <sp-menu-item
                        id=${state.id}
                        value=${state.id}
                        ?selected=${state.id === initialState}
                    >
                        ${state.label}
                    </sp-menu-item>
                `
  )}
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;
};
custom.decorators = [customPickerDecorator];
custom.args = {
  open: true
};
const __namedExportsOrder = ['Default', 'tooltip', 'noVisibleLabel', 'slottedLabel', 'quiet', 'icons', 'iconsNone', 'iconValue', 'iconsOnly', 'Open', 'initialValue', 'readonly', 'custom'];

export { Default, Open, __namedExportsOrder, custom, picker_stories as default, iconValue, icons, iconsNone, iconsOnly, initialValue, noVisibleLabel, quiet, readonly, slottedLabel, tooltip };
