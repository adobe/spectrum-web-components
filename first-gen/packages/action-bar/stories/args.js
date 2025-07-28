"use strict";
export const argTypes = {
  open: {
    name: "open",
    type: { name: "boolean", required: false },
    description: "Whether the Action Bar is open and visible.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: true }
    },
    control: {
      type: "boolean"
    }
  },
  emphasized: {
    name: "emphasized",
    type: { name: "boolean", required: false },
    description: "Whether the Action Bar is emphasized for the viewer.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  tools: {
    name: "tools",
    type: { name: "boolean", required: false },
    description: "Whether to display tools in the action bar.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: true }
    },
    control: {
      type: "boolean"
    }
  }
};
//# sourceMappingURL=args.js.map
