import './sp-meter-bdeaae4b.js';
import { x } from './lit-html-126adc72.js';
import './get-label-from-slot-948d250c.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './define-element-43d4edd5.js';
import './lit-element-9354aa77.js';
import './query-assigned-nodes-c8aaaadd.js';
import './base-511c8c11.js';
import './sizedMixin-281e4c72.js';
import './LanguageResolution-630dfe34.js';
import './sp-field-label-05f39d18.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
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
