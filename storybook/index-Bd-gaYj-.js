import './sp-infield-button-DkHXBbsS.js';
import './sp-icon-add-BfaEi8cd.js';
import './sp-icon-chevron75-3C3N8MIH.js';
import { r } from './spectrum-icon-chevron.css-CeYia-Jd.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

document.adoptedStyleSheets = [
  ...document.adoptedStyleSheets,
  r.styleSheet
];
const args = {
  block: void 0,
  disabled: false,
  inline: void 0,
  label: "Add",
  size: void 0,
  quiet: false
};
const argTypes = {
  block: {
    name: "block",
    type: { name: "text", required: false },
    description: "Where to place the button along the block axis.",
    table: {
      type: { summary: '"start" | "end"' },
      defaultValue: { summary: "" }
    },
    control: "select",
    options: ["none", "start", "end"]
  },
  disabled: {
    name: "disabled",
    type: { name: "boolean", required: false },
    description: "Whether the button is disabled or not.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  inline: {
    name: "inline",
    type: { name: "text", required: false },
    description: "Where to place the button along the inline axis.",
    table: {
      type: { summary: '"start" | "end"' },
      defaultValue: { summary: "" }
    },
    control: "select",
    options: ["none", "start", "end"]
  },
  size: {
    name: "size",
    type: { name: "text", required: false },
    description: "The t-shit size of the button.",
    table: {
      type: { summary: '"s" | "m" | "l" | "xl"' },
      defaultValue: { summary: "" }
    },
    control: "select",
    options: ["s", "m", "l", "xl"]
  },
  quiet: {
    name: "quiet",
    type: { name: "boolean", required: false },
    description: "Whether the button is quiet or not.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  }
};
const Template = ({
  block,
  content,
  disabled,
  inline,
  label,
  size,
  quiet
}) => {
  return x`
        <sp-infield-button
            block=${o(block)}
            ?disabled=${disabled}
            inline=${o(inline)}
            label=${o(label)}
            size=${o(size)}
            ?quiet=${quiet}
        >
            ${content ? content() : x`
                      <sp-icon-add></sp-icon-add>
                  `}
        </sp-infield-button>
    `;
};
const chevronUp = () => x`
        <sp-icon-chevron75
            class="spectrum-UIIcon-ChevronUp75"
        ></sp-icon-chevron75>
    `;
const chevronDown = () => x`
        <sp-icon-chevron75
            class="spectrum-UIIcon-ChevronDown75"
        ></sp-icon-chevron75>
    `;

export { Template as T, argTypes as a, args as b, chevronUp as c, chevronDown as d };
