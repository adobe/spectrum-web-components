"use strict";
export const argTypes = {
  text: {
    name: "text",
    type: { name: "string", required: false },
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "Your trial has expired" }
    },
    control: "text"
  },
  dismissible: {
    name: "dismissible",
    type: { name: "boolean", required: false },
    description: "Whether to include an icon-only close button to dismiss it",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: true }
    },
    control: { type: "boolean" }
  },
  open: {
    name: "open",
    type: { name: "boolean", required: false },
    description: "Whether the alert banner is open",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: true }
    },
    control: { type: "boolean" }
  },
  variant: {
    name: "variant",
    type: { name: "string", required: false },
    description: "The visual variant of the alert banner",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "neutral" }
    },
    control: {
      labels: {
        neutral: "Neutral",
        info: "Info",
        negative: "Negative"
      },
      type: "select"
    },
    options: ["neutral", "info", "negative"]
  }
};
//# sourceMappingURL=args.js.map
