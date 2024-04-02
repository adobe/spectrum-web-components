import './sp-swatch-IiCP1Pqp.js';
import { x } from './lit-html-GmIhAbMP.js';
import './focusable-GZ06kf6F.js';
import './focus-visible-68QWcOy-.js';
import './define-element-tO8-r1bu.js';
import './lit-element-xBOPiTek.js';
import './opacity-checkerboard.css-tb-AybJj.js';
import './sp-icon-dash300-P_Wv08Uk.js';
import './Dash300-GtH_7nnW.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-EFa3DHxz.js';
import './spectrum-icon-dash.css-itJ-5huq.js';
import './sizedMixin-JAQz02f5.js';
import './query-assigned-elements-1m6Cs7Ix.js';
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
