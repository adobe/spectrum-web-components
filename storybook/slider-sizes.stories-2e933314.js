import './sp-slider-9f7749e9.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './define-element-43d4edd5.js';
import './lit-element-9354aa77.js';
import './LanguageResolution-630dfe34.js';
import './import-76526f12.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './base-511c8c11.js';
import './sizedMixin-281e4c72.js';
import './sp-field-label-05f39d18.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './condition-attribute-with-id-62869347.js';
import './ElementResolution-b58a0825.js';
import './query-d0113d5a.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './streaming-listener-70cd7ec3.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './repeat-c64faecc.js';

var sliderSizes_stories = {
  component: "sp-slider",
  title: "Slider/Sizes"
};
const template = ({
  editable,
  size
} = {}) => {
  return x`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                ?editable=${editable}
                max="1"
                min="0"
                value=".5"
                step="0.01"
                size=${l$1(size)}
            >
                Opacity
            </sp-slider>
        </div>
    `;
};
const s = () => template({ size: "s" });
const sEditable = () => template({ size: "s", editable: true });
const m = () => template();
const mEditable = () => template({ editable: true });
const l = () => template({ size: "l" });
const lEditable = () => template({ size: "l", editable: true });
const XL = () => template({ size: "xl" });
const XLEditable = () => template({ size: "xl", editable: true });
const __namedExportsOrder = ['s', 'sEditable', 'm', 'mEditable', 'l', 'lEditable', 'XL', 'XLEditable'];

export { XL, XLEditable, __namedExportsOrder, sliderSizes_stories as default, l, lEditable, m, mEditable, s, sEditable };
