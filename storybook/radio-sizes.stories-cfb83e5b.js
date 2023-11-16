import { Default } from './radio.stories-0363de29.js';
import './sp-radio-3f093041.js';
import './focus-visible-03398d98.js';
import './lit-element-9354aa77.js';
import './lit-html-126adc72.js';
import './sizedMixin-29c62bc2.js';
import './define-element-617dba69.js';
import './base-511c8c11.js';
import './sp-radio-group-5ad164da.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './FieldGroup-f386a0d6.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './if-defined-ae83b405.js';
import './query-assigned-nodes-c8b87639.js';
import './lit-helpers-bb820419.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';

var radioSizes_stories = {
  component: "sp-radio",
  title: "Radio/Sizes",
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
const s = (args) => Default(args);
s.args = {
  size: "s"
};
const m = (args) => Default(args);
m.args = {
  size: "m"
};
const l = (args) => Default(args);
l.args = {
  size: "l"
};
const XL = (args) => Default(args);
XL.args = {
  size: "xl"
};
const __namedExportsOrder = ['s', 'm', 'l', 'XL'];

export { XL, __namedExportsOrder, radioSizes_stories as default, l, m, s };
