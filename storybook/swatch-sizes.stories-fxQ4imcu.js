import './sp-swatch-508ycs1S.js';
import { x } from './lit-html-COgVUehj.js';
import './focusable-BHn_FpaM.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-CXRu6sWi.js';
import './lit-element-BL-po2DW.js';
import './opacity-checkerboard.css-DpymVc4v.js';
import './sp-icon-dash300-DKvUz7kI.js';
import './Dash300-DagFK8mn.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-LhykbR0q.js';
import './spectrum-icon-dash.css-ClCpXr2r.js';
import './sizedMixin-BKu_31Nm.js';
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
