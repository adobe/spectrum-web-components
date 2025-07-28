"use strict";
import { html } from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/swatch/sp-swatch.js";
export default {
  title: "Swatch",
  component: "sp-swatch",
  args: {
    color: "#ff0000"
  },
  argTypes: {
    color: { control: "color" },
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
  }
};
const template = ({
  color,
  border,
  rounding,
  shape,
  mixedValue: mixedValue2,
  nothing: nothing2
}) => {
  return html`
        <sp-swatch
            border=${ifDefined(border === "normal" ? void 0 : border)}
            rounding=${ifDefined(rounding === "normal" ? void 0 : rounding)}
            shape=${ifDefined(shape === "normal" ? void 0 : shape)}
            color=${color}
            ?mixed-value=${mixedValue2}
            ?nothing=${nothing2}
        ></sp-swatch>
    `;
};
export const Default = (args) => template(args);
export const gradient = (args) => template(args);
gradient.args = {
  color: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
};
export const opacity = (args) => template(args);
opacity.args = {
  color: "rgba(255, 0, 0, 0.3)"
};
export const mixedValue = (args) => template(args);
mixedValue.args = {
  mixedValue: true,
  color: ""
};
export const nothing = (args) => template(args);
nothing.args = {
  nothing: true,
  color: ""
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
//# sourceMappingURL=swatch.stories.js.map
