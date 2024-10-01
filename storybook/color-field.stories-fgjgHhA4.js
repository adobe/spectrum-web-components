import { C as ColorFieldMarkup } from './template-T5Lm8diV.js';
import './Textfield-CNzGwBlh.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-C_3bgzm7.js';
import './lit-element-BulMEkr1.js';
import './spectrum-icon-checkmark.css-NuoPlGW7.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './sp-icon-alert-Cbypiip7.js';
import './custom-tag-Diwq7nXX.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './sizedMixin-BzkTbMb8.js';
import './state-DrummH0c.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './index-DII9xnLW.js';

const argTypes = {
  quiet: {
    name: "quiet",
    type: { name: "boolean", required: false },
    description: "Whether the color-field type is quiet",
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
    description: "Whether the color-field is disabled or not",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  viewColor: {
    name: "viewColor",
    type: { name: "boolean", required: false },
    description: "Whether the color-field has color handle or not",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  size: {
    name: "size",
    type: { name: "string", required: false },
    description: "The size at which to display color-field items.",
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
    }
  }
};

var colorField_stories = {
  component: "sp-color-field",
  title: "Color Field",
  args: {
    label: "",
    size: "m"
  },
  argTypes
};
const Default = (args) => ColorFieldMarkup(args);
const Quiet = (args) => ColorFieldMarkup(args);
Quiet.args = {
  quiet: true
};
const ReadOnly = (args) => ColorFieldMarkup(args);
ReadOnly.args = {
  readonly: true,
  value: "rgb(255,255,255)"
};
const Disabled = (args) => ColorFieldMarkup(args);
Disabled.args = {
  disabled: true
};
const viewColor = (args) => ColorFieldMarkup(args);
viewColor.args = {
  viewColor: true,
  value: "rgb(255,255,0)"
};
const WrongInput = (args) => ColorFieldMarkup(args);
WrongInput.args = {
  value: "apple"
};
const RightInput = (args) => ColorFieldMarkup(args);
RightInput.args = {
  value: "#a8323a"
};
const __namedExportsOrder = ['Default', 'Quiet', 'ReadOnly', 'Disabled', 'viewColor', 'WrongInput', 'RightInput'];

export { Default, Disabled, Quiet, ReadOnly, RightInput, WrongInput, __namedExportsOrder, colorField_stories as default, viewColor };
