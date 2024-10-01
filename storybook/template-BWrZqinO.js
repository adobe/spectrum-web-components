import './sp-field-label-oZHlTsnx.js';
import './sp-picker-BmWkGHq8.js';
import './sp-menu-item-DOkBCZjF.js';
import { s as spreadProps } from './lit-helpers-DFCD1oU3.js';
import { o } from './if-defined-DDJGFaN4.js';
import { x } from './lit-html-COgVUehj.js';

const argTypes = {
  size: {
    name: "size",
    type: { name: "string", required: false },
    description: "The size at which to display accordion items.",
    table: {
      defaultValue: { summary: "m" }
    },
    control: {
      labels: {
        s: "Small",
        m: "Medium",
        l: "Large",
        xl: "Extra large"
      },
      type: "select"
    },
    options: ["s", "m", "l", "xl"]
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
};

const handleChange = ({ onChange }) => (event) => {
  const picker = event.target;
  if (onChange) onChange(picker.value);
};
const Template = (args) => x`
    <sp-field-label for="picker-1" size=${o(args.size)}>
        Where do you live?
    </sp-field-label>
    <sp-picker
        id="picker-1"
        @change=${handleChange(args)}
        label="Choose your neighborhood"
        ${spreadProps(args)}
    >
        <sp-menu-item value="option-1">Carol Gardens</sp-menu-item>
        <sp-menu-item value="option-2">Cobble Hill</sp-menu-item>
        <sp-menu-item value="option-3">Ft. Greene</sp-menu-item>
        <sp-menu-item value="option-4">Park Slope</sp-menu-item>
        <sp-menu-item disabled value="option-5">Prospect Park</sp-menu-item>
        <sp-menu-item value="option-6">Red Hook</sp-menu-item>
    </sp-picker>
`;

export { Template as T, argTypes as a, handleChange as h };
