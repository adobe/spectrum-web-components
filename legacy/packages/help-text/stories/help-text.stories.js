"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/help-text/sp-help-text.js";
export default {
  title: "Help Text",
  component: "sp-help-text",
  argTypes: {
    icon: {
      name: "icon",
      type: { name: "boolean", required: false },
      discription: "Whether the Help Text is delivered with an icon.",
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
      description: "Help Text for disabled form elements.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    variant: {
      name: "variant",
      type: { name: "string", required: false },
      description: "The visual variant to apply to the Help Text.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "cta" }
      },
      control: {
        type: "inline-radio",
        options: ["neutral", "negative"]
      }
    },
    size: {
      name: "size",
      type: { name: "string", required: false },
      description: "The visual variant to apply to the Help Text.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "cta" }
      },
      control: {
        type: "inline-radio",
        options: ["s", "m", "l", "xl"]
      }
    }
  },
  args: {
    size: "m"
  }
};
const Template = (args) => html`
    <sp-help-text
        ?disabled=${args.disabled}
        ?icon=${args.icon}
        variant=${args.variant}
        size=${args.size}
    >
        ${args.content}
    </sp-help-text>
`;
export const neutral = (args = {}) => Template({
  ...args,
  content: "Passwords must be at least 8 characters."
});
neutral.args = {
  variant: "neutral"
};
export const negative = (args = {}) => Template({
  ...args,
  content: "Create a password with at least 8 characters."
});
negative.args = {
  variant: "negative"
};
export const negativeIcon = (args = {}) => Template({
  ...args,
  content: "Create a password with at least 8 characters."
});
negativeIcon.args = {
  icon: true,
  variant: "negative"
};
export const disabled = (args = {}) => Template({
  ...args,
  content: "Passwords must be at least 8 characters."
});
disabled.args = {
  disabled: true,
  variant: "neutral"
};
//# sourceMappingURL=help-text.stories.js.map
