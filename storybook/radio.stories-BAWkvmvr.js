import './sp-radio-F6kLDUvN.js';
import './sp-radio-group-Lhmw-f6x.js';
import { s as spreadProps } from './lit-helpers-DFCD1oU3.js';
import { x } from './lit-html-COgVUehj.js';
import './focus-visible-D29Av9Xb.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-BzkTbMb8.js';
import './define-element-C_3bgzm7.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './FieldGroup-BVt1wOX9.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './if-defined-DDJGFaN4.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';

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
