import { Default } from './radio.stories-lwWI75X3.js';
import './sp-radio-9c_SEC31.js';
import './focus-visible-68QWcOy-.js';
import './lit-element-xBOPiTek.js';
import './lit-html-GmIhAbMP.js';
import './sizedMixin-6sBuja8e.js';
import './define-element-UHExAFdK.js';
import './base-STdhtiz1.js';
import './sp-radio-group-bde7qULQ.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './FieldGroup-WzLJytXU.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './if-defined-pV6JZKXB.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './lit-helpers-w3dXohpu.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';

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
