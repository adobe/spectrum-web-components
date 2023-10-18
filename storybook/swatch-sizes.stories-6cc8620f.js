import './sp-swatch-eeac2be1.js';
import { x } from './lit-html-126adc72.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './define-element-e64f5ea4.js';
import './lit-element-9354aa77.js';
import './opacity-checkerboard.css-531d5753.js';
import './sp-icon-dash300-baefb43f.js';
import './Dash300-2d8f97df.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './spectrum-icon-dash.css-7fdeaf11.js';
import './sizedMixin-43fe982f.js';
import './base-511c8c11.js';
import './when-67eca38c.js';

var swatchSizes_stories = {
  title: "Swatch/Sizes",
  component: "sp-swatch"
};
const template = ({
  size,
  color = "rgb(255 0 0 / 0.7)"
}) => x`
    <div style="display: flex; gap: 5px;">
        <sp-swatch color=${color} size=${size}></sp-swatch>
        <sp-swatch color=${color} rounding="none" size=${size}></sp-swatch>
        <sp-swatch color=${color} rounding="full" size=${size}></sp-swatch>
        <sp-swatch color=${color} border="light" size=${size}></sp-swatch>
        <sp-swatch color=${color} border="none" size=${size}></sp-swatch>
        <sp-swatch nothing size=${size}></sp-swatch>
        <sp-swatch color=${color} shape="rectangle" size=${size}></sp-swatch>
        <sp-swatch
            color=${color}
            shape="rectangle"
            size=${size}
            disabled
        ></sp-swatch>
        <sp-swatch
            rounding="full"
            shape="rectangle"
            size=${size}
            mixed-value
        ></sp-swatch>
    </div>
`;
const XS = () => template({ size: "xs" });
const s = () => template({ size: "s" });
const m = () => template({ size: "m" });
const l = () => template({ size: "l" });
const __namedExportsOrder = ['XS', 's', 'm', 'l'];

export { XS, __namedExportsOrder, swatchSizes_stories as default, l, m, s };
