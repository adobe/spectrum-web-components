import './sp-swatch-1Y5zqasr.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-C_3bgzm7.js';
import './lit-element-BulMEkr1.js';
import './opacity-checkerboard.css-Cz3bIIfY.js';
import './sp-icon-dash300--ZN9FvZF.js';
import './Dash300-DagFK8mn.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './spectrum-icon-dash.css-lElR_d7u.js';
import './sizedMixin-BzkTbMb8.js';
import './when-DEJm_QN9.js';

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
            border=${o(border === "normal" ? void 0 : border)}
            rounding=${o(rounding === "normal" ? void 0 : rounding)}
            shape=${o(shape === "normal" ? void 0 : shape)}
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
