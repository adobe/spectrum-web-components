import './sp-meter-DgIYRnZJ.js';
import { x } from './lit-html-COgVUehj.js';
import './get-label-from-slot-Cg6mfN40.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './define-element-C_3bgzm7.js';
import './lit-element-BulMEkr1.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './LanguageResolution-BeoILyI5.js';
import './sp-field-label-oZHlTsnx.js';
import './random-id-BST1Puzz.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './sizedMixin-BzkTbMb8.js';
import './query-DQF6X5qW.js';

var meter_stories = {
  title: "Meter",
  component: "sp-meter"
};
const makeOverBackground = (variant) => (story) => {
  const color = "var(--spectrum-seafoam-900)";
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
  return makeOverBackground()(
    () => x`
                <sp-meter static="white" progress="50">Storage Space</sp-meter>
            `
  );
};
const __namedExportsOrder = ['sideLabel', 'negative', 'notice', 'positive', 'staticWhite'];

export { __namedExportsOrder, meter_stories as default, negative, notice, positive, sideLabel, staticWhite };
