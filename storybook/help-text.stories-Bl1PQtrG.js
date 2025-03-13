import './sp-help-text-DY8tY1di.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-icon-alert-2CW9YlXi.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-BC0FCRBc.js';
import './lit-element-BulMEkr1.js';
import './state-ChcedIDn.js';
import './define-element-2VgsDjbW.js';
import './sizedMixin-D4VoaNlz.js';

var helpText_stories = {
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
const Template = (args) => x`
    <sp-help-text
        ?disabled=${args.disabled}
        ?icon=${args.icon}
        variant=${args.variant}
        size=${args.size}
    >
        ${args.content}
    </sp-help-text>
`;
const neutral = (args = {}) => Template({
  ...args,
  content: "Passwords must be at least 8 characters."
});
neutral.args = {
  variant: "neutral"
};
const negative = (args = {}) => Template({
  ...args,
  content: "Create a password with at least 8 characters."
});
negative.args = {
  variant: "negative"
};
const negativeIcon = (args = {}) => Template({
  ...args,
  content: "Create a password with at least 8 characters."
});
negativeIcon.args = {
  icon: true,
  variant: "negative"
};
const disabled = (args = {}) => Template({
  ...args,
  content: "Passwords must be at least 8 characters."
});
disabled.args = {
  disabled: true,
  variant: "neutral"
};
const __namedExportsOrder = ['neutral', 'negative', 'negativeIcon', 'disabled'];

export { __namedExportsOrder, helpText_stories as default, disabled, negative, negativeIcon, neutral };
