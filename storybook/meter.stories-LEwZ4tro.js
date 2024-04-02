import './sp-meter-9XJ4oJTe.js';
import { x } from './lit-html-GmIhAbMP.js';
import './get-label-from-slot-oGgDjBHa.js';
import './observe-slot-text-RiUvi5fT.js';
import './mutation-controller-KeE5MDSl.js';
import './define-element-tO8-r1bu.js';
import './lit-element-xBOPiTek.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './base-STdhtiz1.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './LanguageResolution-433GhF-m.js';
import './sp-field-label-LR663cei.js';
import './random-id-M2k-wjyE.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-EFa3DHxz.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './sizedMixin-JAQz02f5.js';
import './query-JMOstM_r.js';

var meter_stories = {
  title: "Meter",
  component: "sp-meter"
};
const makeOverBackground = (variant) => (story) => {
  const color = variant === "black" ? "rgb(181, 209, 211)" : "var(--spectrum-seafoam-900)";
  return x`
            <div
                style="
                    --mod-actionbutton-static-content-color: ${color};
                    --mod-button-static-content-color: ${color};
                    background-color: ${color};
                    color: ${color};
                    padding: var(--spectrum-font-size-100) var(--spectrum-font-size-400);
                    display: inline-block;
                "
            >
                ${story()}
            </div>
        `;
};
const sideLabel = () => {
  return x`
        <sp-meter side-label progress="50">Storage Space</sp-meter>
    `;
};
const negative = () => {
  return x`
        <sp-meter variant="negative" progress="95">Storage Space</sp-meter>
    `;
};
const notice = () => {
  return x`
        <sp-meter variant="notice" progress="73">Storage Space</sp-meter>
    `;
};
const positive = () => {
  return x`
        <sp-meter variant="positive" progress="50">Storage Space</sp-meter>
    `;
};
const staticWhite = () => {
  return makeOverBackground("white")(
    () => x`
                <sp-meter static="white" progress="50">Storage Space</sp-meter>
            `
  );
};
const __namedExportsOrder = ['sideLabel', 'negative', 'notice', 'positive', 'staticWhite'];

export { __namedExportsOrder, meter_stories as default, negative, notice, positive, sideLabel, staticWhite };
