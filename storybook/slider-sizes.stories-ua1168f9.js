import './sp-slider-W2As3TbQ.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './focusable-p9xQieT8.js';
import './focus-visible-68QWcOy-.js';
import './define-element-UHExAFdK.js';
import './lit-element-xBOPiTek.js';
import './LanguageResolution-433GhF-m.js';
import './import-mabg3nA1.js';
import './observe-slot-text-5oGzzbFn.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './base-STdhtiz1.js';
import './sizedMixin-6sBuja8e.js';
import './sp-field-label-50w0r-Gn.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './query-JMOstM_r.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './style-map-ak5mT6xX.js';
import './streaming-listener-99YRN1c8.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './repeat-ry-ySa1b.js';

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