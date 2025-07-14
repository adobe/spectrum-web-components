"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/infield-button/sp-infield-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-add.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron75.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import chevronStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
document.adoptedStyleSheets = [
  ...document.adoptedStyleSheets,
  chevronStyles.styleSheet
];
export const args = {
  block: void 0,
  disabled: false,
  inline: void 0,
  label: "Add",
  size: void 0,
  quiet: false
};
export const argTypes = {
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
export const Template = ({
  block,
  content,
  disabled,
  inline,
  label,
  size,
  quiet
}) => {
  return html`
        <sp-infield-button
            block=${ifDefined(block)}
            ?disabled=${disabled}
            inline=${ifDefined(inline)}
            label=${ifDefined(label)}
            size=${ifDefined(size)}
            ?quiet=${quiet}
        >
            ${content ? content() : html`
                      <sp-icon-add></sp-icon-add>
                  `}
        </sp-infield-button>
    `;
};
export const chevronUp = () => html`
    <sp-icon-chevron75 class="spectrum-UIIcon-ChevronUp75"></sp-icon-chevron75>
`;
export const chevronDown = () => html`
    <sp-icon-chevron75
        class="spectrum-UIIcon-ChevronDown75"
    ></sp-icon-chevron75>
`;
//# sourceMappingURL=index.js.map
