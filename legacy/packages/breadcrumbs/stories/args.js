"use strict";
export const argTypes = {
  compact: {
    name: "compact",
    type: { name: "boolean", required: false },
    description: "Reduces the size of the Breadcrumbs and the padding around the items.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  label: {
    name: "label",
    type: { name: "string", required: false },
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "Breadcrumbs" }
    },
    control: "text"
  },
  maxVisibleItems: {
    name: "max-visible-items",
    type: { name: "number", required: false },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: "4" }
    },
    control: "number",
    min: 0,
    max: 4
  },
  onChange: { action: "change" }
};
//# sourceMappingURL=args.js.map
