import './sp-radio-b8022cbb.js';
import './sp-radio-group-2ef63fda.js';
import { s as spreadProps } from './lit-helpers-bb820419.js';
import { x } from './lit-html-126adc72.js';
import './focus-visible-03398d98.js';
import './lit-element-9354aa77.js';
import './sizedMixin-95b38e3e.js';
import './define-element-467f3dc4.js';
import './base-511c8c11.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './FieldGroup-b24f3aa9.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './if-defined-ae83b405.js';
import './query-assigned-nodes-6218f033.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';

var radio_stories = {
  component: "sp-radio",
  title: "Radio",
  argTypes: {
    checked: {
      name: "checked",
      type: { name: "boolean", required: false },
      description: "Represents when the input is checked",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: "boolean"
    },
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
    emphasized: {
      name: "emphasized",
      type: { name: "boolean", required: false },
      description: "Set the button's state to emphasized.",
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
    }
  },
  args: {
    checked: false,
    disabled: false,
    emphasized: false,
    invalid: false
  }
};
function renderRadio(args) {
  return x`
        <sp-radio ${spreadProps(args)}>Radio</sp-radio>
    `;
}
const Default = (args) => renderRadio(args);
const readonly = (args) => renderRadio({
  ...args,
  readonly: true
});
readonly.args = {
  checked: true
};
const Emphasized = (args) => renderRadio(args);
Emphasized.args = {
  checked: true,
  emphasized: true
};
const Autofocus = (args) => {
  return x`
        <sp-radio autofocus ${spreadProps(args)}>Radio</sp-radio>
    `;
};
const Invalid = (args) => renderRadio(args);
Invalid.args = {
  invalid: true
};
const Disabled = (args) => renderRadio(args);
Disabled.args = {
  disabled: true
};
const values = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4
};
const groupExample = () => {
  return x`
        <sp-radio-group vertical selected="1" name="group-example">
            <sp-radio value=${values.first}>Option 1</sp-radio>
            <sp-radio value=${values.second}>Option 2</sp-radio>
            <sp-radio value=${values.third}>Option 3</sp-radio>
            <sp-radio value=${values.fourth}>Option 4</sp-radio>
        </sp-radio-group>
    `;
};
const horizontalGroup = () => {
  return x`
        <sp-radio-group horizontal selected="first" name="group-example">
            <sp-radio value="first">Option 1</sp-radio>
            <sp-radio value="second">Option 2</sp-radio>
            <sp-radio value="third">Option 3</sp-radio>
            <sp-radio value="fourth">Option 4</sp-radio>
        </sp-radio-group>
    `;
};
const tabIndexExample = () => {
  return x`
        <sp-radio-group vertical name="group-example">
            <sp-radio emphasized value="zero" tabindex="0">
                Tab Index 0
            </sp-radio>
            <sp-radio disabled value="three" tabindex="3">Tab Index 3</sp-radio>
            <sp-radio value="one" tabindex="1" autofocus>Tab Index 1</sp-radio>
            <sp-radio value="four" tabindex="4">Tab Index 4</sp-radio>
            <sp-radio invalid value="two" tabindex="2">Tab Index 2</sp-radio>
        </sp-radio-group>
    `;
};
const horizontalTabIndexExample = () => {
  return x`
        <sp-radio-group horizontal name="group-example">
            <sp-radio emphasized value="zero" tabindex="0">
                Tab Index 0
            </sp-radio>
            <sp-radio disabled value="three" tabindex="3">Tab Index 3</sp-radio>
            <sp-radio value="one" tabindex="1" autofocus>Tab Index 1</sp-radio>
            <sp-radio value="four" tabindex="4">Tab Index 4</sp-radio>
            <sp-radio invalid value="two" tabindex="2">Tab Index 2</sp-radio>
        </sp-radio-group>
    `;
};
tabIndexExample.storyName = "Tab index example";
const __namedExportsOrder = ['Default', 'readonly', 'Emphasized', 'Autofocus', 'Invalid', 'Disabled', 'groupExample', 'horizontalGroup', 'tabIndexExample', 'horizontalTabIndexExample'];

export { Autofocus, Default, Disabled, Emphasized, Invalid, __namedExportsOrder, radio_stories as default, groupExample, horizontalGroup, horizontalTabIndexExample, readonly, tabIndexExample };
