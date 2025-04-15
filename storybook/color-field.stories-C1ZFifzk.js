import { C as ColorFieldMarkup } from './template-CMkf6zyq.js';
import { x } from './lit-html-COgVUehj.js';
import './ColorController-D_pME4qj.js';
import './lit-element-BulMEkr1.js';
import './Textfield-CsciWLjd.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './if-defined-DDJGFaN4.js';
import './focusable-0UaXYqOQ.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-C4UuMSqY.js';
import './spectrum-icon-checkmark.css-CUMq8Erd.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-XNwB0O-B.js';
import './state-Cl59WR3S.js';
import './sp-icon-alert-DVg_HKM-.js';
import './custom-tag-Diwq7nXX.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './sizedMixin-DUWGHsWj.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';

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

const DEMO_COLORS = [
  "rgb(255,0,0)",
  // Red
  "#00FF00",
  // Green
  "rgb(0,0,255)",
  // Blue
  "#FFFF00",
  // Yellow
  "rgb(255,0,255)",
  // Magenta
  "#00FFFF",
  // Cyan
  "rgb(255,165,0)",
  // Orange
  "#800080",
  // Purple
  "rgb(165,42,42)",
  // Brown
  "#008080",
  // Teal
  "rgb(255,192,203)",
  // Pink
  "#32CD32",
  // Lime Green
  "rgb(70,130,180)",
  // Steel Blue
  "#FF6347",
  // Tomato
  "rgb(128,0,0)",
  // Maroon
  "#4B0082",
  // Indigo
  "rgb(0,128,128)",
  // Dark Cyan
  "#800000",
  // Dark Red
  "rgb(0,100,0)",
  // Dark Green
  "#000080",
  // Navy
  "rgb(188,143,143)",
  // Rosy Brown
  "#556B2F",
  // Dark Olive Green
  "rgb(255,215,0)",
  // Gold
  "#C0C0C0"
  // Silver
];
const DEFAULT_COLOR = "rgb(255,255,0)";

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
const Multiple = (args) => {
  return x`
        <div
            style="width: 20%; padding: 20px; margin: 10px; display: flex; flex-direction: column; gap: 16px; height: 200px; overflow-y: auto;"
        >
            ${DEMO_COLORS.map(
    (color, index) => ColorFieldMarkup({
      ...args,
      label: `Color ${index + 1}`,
      value: color,
      viewColor: true
    })
  )}
        </div>
    `;
};
Multiple.args = {
  viewColor: true,
  value: DEFAULT_COLOR
};
const WrongInput = (args) => ColorFieldMarkup(args);
WrongInput.args = {
  value: "apple"
};
const RightInput = (args) => ColorFieldMarkup(args);
RightInput.args = {
  value: "#a8323a"
};
const __namedExportsOrder = ['Default', 'Quiet', 'ReadOnly', 'Disabled', 'viewColor', 'Multiple', 'WrongInput', 'RightInput'];

export { Default, Disabled, Multiple, Quiet, ReadOnly, RightInput, WrongInput, __namedExportsOrder, colorField_stories as default, viewColor };
