import './sp-swatch-hNehynSU.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './define-element-2O4ZhTAw.js';
import './lit-element-xBOPiTek.js';
import './opacity-checkerboard.css-uDCNYB6s.js';
import './sp-icon-dash300-l9U-EZNp.js';
import './Dash300-GtH_7nnW.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-TDmbHQaH.js';
import './spectrum-icon-dash.css-WF-6HO_o.js';
import './sizedMixin-mnNfh2gr.js';
import './base-STdhtiz1.js';
import './when-kvvOyHr2.js';

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
