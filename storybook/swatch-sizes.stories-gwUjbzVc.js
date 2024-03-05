import './sp-swatch-yHI7gGox.js';
import { x } from './lit-html-GmIhAbMP.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './define-element-z6bXN_P5.js';
import './lit-element-xBOPiTek.js';
import './opacity-checkerboard.css-tb-AybJj.js';
import './sp-icon-dash300-mmtDel6j.js';
import './Dash300-GtH_7nnW.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
import './spectrum-icon-dash.css-itJ-5huq.js';
import './sizedMixin-IBQibr2z.js';
import './base-STdhtiz1.js';
import './when-kvvOyHr2.js';

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
