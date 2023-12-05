import './sp-swatch-1aefa47b.js';
import { x } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './opacity-checkerboard.css-531d5753.js';
import './sp-icon-dash300-0b171774.js';
import './Dash300-2d8f97df.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './spectrum-icon-dash.css-7fdeaf11.js';
import './sizedMixin-9a9da45c.js';
import './base-511c8c11.js';
import './when-67eca38c.js';

var swatch_stories = {
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
  return x`
        <sp-swatch
            border=${l(border === "normal" ? void 0 : border)}
            rounding=${l(rounding === "normal" ? void 0 : rounding)}
            shape=${l(shape === "normal" ? void 0 : shape)}
            color=${color}
            ?mixed-value=${mixedValue2}
            ?nothing=${nothing2}
        ></sp-swatch>
    `;
};
const Default = (args) => template(args);
const gradient = (args) => template(args);
gradient.args = {
  color: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
};
const opacity = (args) => template(args);
opacity.args = {
  color: "rgba(255, 0, 0, 0.3)"
};
const mixedValue = (args) => template(args);
mixedValue.args = {
  mixedValue: true,
  color: ""
};
const nothing = (args) => template(args);
nothing.args = {
  nothing: true,
  color: ""
};
const borderLight = (args) => template(args);
borderLight.args = {
  border: "light"
};
const borderNone = (args) => template(args);
borderNone.args = {
  border: "none"
};
const roundingNone = (args) => template(args);
roundingNone.args = {
  rounding: "none"
};
const roundingFull = (args) => template(args);
roundingFull.args = {
  rounding: "full"
};
const shapeRectangle = (args) => template(args);
shapeRectangle.args = {
  shape: "rectangle"
};
const __namedExportsOrder = ['Default', 'gradient', 'opacity', 'mixedValue', 'nothing', 'borderLight', 'borderNone', 'roundingNone', 'roundingFull', 'shapeRectangle'];

export { Default, __namedExportsOrder, borderLight, borderNone, swatch_stories as default, gradient, mixedValue, nothing, opacity, roundingFull, roundingNone, shapeRectangle };
