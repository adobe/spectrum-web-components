import './sp-swatch-U3l7dN1f.js';
import { x } from './lit-html-COgVUehj.js';
import './focusable-DcHsG7Zg.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-xyi5NDDf.js';
import './lit-element-BulMEkr1.js';
import './opacity-checkerboard.css-58rfTPmE.js';
import './sp-icon-dash300-0_Flk9dj.js';
import './custom-tag-B5IH9PTE.js';
import './Dash300-BPmLOKTF.js';
import './IconBase-5vvO1gxM.js';
import './state-DzluJiIq.js';
import './icon-dash-overrides.css-3NRKn3SY.js';
import './sizedMixin-CTLIe6if.js';
import './if-defined-DDJGFaN4.js';
import './when-DEJm_QN9.js';

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
