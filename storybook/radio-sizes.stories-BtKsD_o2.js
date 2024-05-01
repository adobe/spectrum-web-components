import { Default } from './radio.stories-DekW36c_.js';
import './sp-radio-B34bvy-c.js';
import './focus-visible-xZLLtEay.js';
import './lit-element-BL-po2DW.js';
import './lit-html-COgVUehj.js';
import './sizedMixin-C1lD98vT.js';
import './define-element-ByMWMcVd.js';
import './sp-radio-group-DeGn2NQV.js';
import './RovingTabindex-Dx9AbyW7.js';
import './FocusGroup-B9OwLCq7.js';
import './FieldGroup-CBVxMvv_.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './if-defined-DDJGFaN4.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './lit-helpers-ChWJDib5.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';

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
