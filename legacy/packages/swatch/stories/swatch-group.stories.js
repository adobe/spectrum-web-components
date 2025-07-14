"use strict";
import { html } from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/swatch/sp-swatch-group.js";
import "@spectrum-web-components/swatch/sp-swatch.js";
export default {
  title: "Swatch group",
  component: "sp-swatch-group",
  args: {},
  argTypes: {
    border: {
      name: "border",
      type: { name: "string", required: false },
      description: "The border to apply to the Swatch children.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["normal", "light", "none"]
      }
    },
    density: {
      name: "density",
      type: { name: "string", required: false },
      description: "The density at which to display the Swatch children.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["normal", "compact", "spacious"]
      }
    },
    rounding: {
      name: "rounding",
      type: { name: "string", required: false },
      description: "The rounding to apply to the Swatch children.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["normal", "none", "full"]
      }
    },
    selects: {
      name: "selects",
      type: { name: "string", required: false },
      description: "Whether the Swatch Group manages a selection, and whether it is a sinlge or multiple selection.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["none", "single", "multiple"]
      }
    },
    shape: {
      name: "shape",
      type: { name: "string", required: false },
      description: "The shape to apply to the Swatch children.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["normal", "rectangle"]
      }
    }
  },
  decorators: [
    (story, {
      args: { selected = [] }
    }) => html`
            <div
                @change=${async (event) => {
      await 0;
      if (event.defaultPrevented) return;
      const next = event.target.nextElementSibling;
      next.textContent = `Selected: ${JSON.stringify(
        event.target.selected
      )}`;
    }}
            >
                ${story()}
                <div>Selected: ${JSON.stringify(selected)}</div>
            </div>
        `
  ]
};
const colors = [
  "--spectrum-gray-700",
  "--spectrum-red-700",
  "--spectrum-orange-700",
  "--spectrum-yellow-700",
  "--spectrum-chartreuse-700",
  "--spectrum-celery-700",
  "--spectrum-green-700",
  "--spectrum-seafoam-700",
  "--spectrum-blue-700",
  "--spectrum-indigo-700",
  "--spectrum-purple-700",
  "--spectrum-fuchsia-700",
  "--spectrum-magenta-700"
];
const template = ({
  border,
  density,
  rounding,
  selects,
  selected = [],
  shape
}) => {
  const groupLabel = !!selects ? selects === "single" ? "Select a color" : "Selects color(s)" : void 0;
  return html`
        <sp-swatch-group
            border=${ifDefined(border === "normal" ? void 0 : border)}
            density=${ifDefined(density === "normal" ? void 0 : density)}
            rounding=${ifDefined(rounding === "normal" ? void 0 : rounding)}
            selects=${ifDefined(selects === "none" ? void 0 : selects)}
            .selected=${selected}
            shape=${ifDefined(shape === "normal" ? void 0 : shape)}
            aria-label=${ifDefined(groupLabel)}
        >
            ${colors.map(
    (color) => html`
                    <sp-swatch
                        color="var(${color})"
                        label=${color}
                        value=${color}
                    ></sp-swatch>
                `
  )}
        </sp-swatch-group>
    `;
};
export const Default = (args) => template(args);
Default.args = {};
export const densityCompact = (args) => template(args);
densityCompact.args = {
  density: "compact"
};
export const densitySpacious = (args) => template(args);
densitySpacious.args = {
  density: "spacious"
};
export const selectsSingle = (args) => template(args);
selectsSingle.args = {
  selects: "single",
  selected: ["--spectrum-yellow-500"]
};
export const selectsMultiple = (args) => template(args);
selectsMultiple.args = {
  selects: "multiple",
  selected: [
    "--spectrum-celery-500",
    "--spectrum-red-500",
    "--spectrum-purple-500",
    "--spectrum-blue-500"
  ]
};
export const borderLight = (args) => template(args);
borderLight.args = {
  border: "light"
};
export const borderNone = (args) => template(args);
borderNone.args = {
  border: "none"
};
export const roundingNone = (args) => template(args);
roundingNone.args = {
  rounding: "none"
};
export const roundingFull = (args) => template(args);
roundingFull.args = {
  rounding: "full"
};
export const shapeRectangle = (args) => template(args);
shapeRectangle.args = {
  shape: "rectangle"
};
//# sourceMappingURL=swatch-group.stories.js.map
