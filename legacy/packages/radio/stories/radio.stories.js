"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/radio/sp-radio.js";
import "@spectrum-web-components/radio/sp-radio-group.js";
import { spreadProps } from "../../../test/lit-helpers.js";
export default {
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
  return html`
        <sp-radio ${spreadProps(args)}>Radio</sp-radio>
    `;
}
export const Default = (args) => renderRadio(args);
export const readonly = (args) => renderRadio({
  ...args,
  readonly: true
});
readonly.args = {
  checked: true
};
export const Emphasized = (args) => renderRadio(args);
Emphasized.args = {
  checked: true,
  emphasized: true
};
export const Autofocus = (args) => {
  return html`
        <sp-radio autofocus ${spreadProps(args)}>Radio</sp-radio>
    `;
};
export const Invalid = (args) => renderRadio(args);
Invalid.args = {
  invalid: true
};
export const Disabled = (args) => renderRadio(args);
Disabled.args = {
  disabled: true
};
const values = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4
};
export const groupExample = () => {
  return html`
        <sp-radio-group vertical selected="1" name="group-example">
            <sp-radio value=${values.first}>Option 1</sp-radio>
            <sp-radio value=${values.second}>Option 2</sp-radio>
            <sp-radio value=${values.third}>Option 3</sp-radio>
            <sp-radio value=${values.fourth}>Option 4</sp-radio>
        </sp-radio-group>
    `;
};
export const horizontalGroup = () => {
  return html`
        <sp-radio-group horizontal selected="first" name="group-example">
            <sp-radio value="first">Option 1</sp-radio>
            <sp-radio value="second">Option 2</sp-radio>
            <sp-radio value="third">Option 3</sp-radio>
            <sp-radio value="fourth">Option 4</sp-radio>
        </sp-radio-group>
    `;
};
export const tabIndexExample = () => {
  return html`
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
export const horizontalTabIndexExample = () => {
  return html`
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
//# sourceMappingURL=radio.stories.js.map
