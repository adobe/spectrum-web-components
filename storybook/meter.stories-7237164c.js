import './sp-meter-3066a6dd.js';
import { x } from './lit-html-126adc72.js';
import './get-label-from-slot-948d250c.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './query-assigned-nodes-c8b87639.js';
import './base-511c8c11.js';
import './sizedMixin-29c62bc2.js';
import './LanguageResolution-630dfe34.js';
import './sp-field-label-b445efc6.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './condition-attribute-with-id-62869347.js';
import './ElementResolution-b58a0825.js';
import './query-d0113d5a.js';

var meter_stories = {
  title: "Meter",
  component: "sp-meter"
};
const makeOverBackground = (story) => x`
    <div
        style="background-color: var(--spectrum-global-color-seafoam-600); color: var(--spectrum-global-color-seafoam-600); padding: var(--spectrum-global-dimension-size-175) var(--spectrum-global-dimension-size-250); display: inline-block"
    >
        ${story}
    </div>
`;
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
  return makeOverBackground(
    x`
            <sp-meter static="white" progress="50">Storage Space</sp-meter>
        `
  );
};
const __namedExportsOrder = ['sideLabel', 'negative', 'notice', 'positive', 'staticWhite'];

export { __namedExportsOrder, meter_stories as default, negative, notice, positive, sideLabel, staticWhite };
