import './sp-progress-bar-70134827.js';
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

var progressBar_stories = {
  title: "Progress Bar",
  component: "sp-progress-bar"
};
const label = () => {
  return x`
        <sp-progress-bar label="Loading" progress="50"></sp-progress-bar>
    `;
};
const indeterminate = () => {
  return x`
        <sp-progress-bar label="Loading" indeterminate></sp-progress-bar>
    `;
};
const sideLabel = () => {
  return x`
        <sp-progress-bar
            side-label
            label="Loading"
            progress="50"
        ></sp-progress-bar>
    `;
};
const sideIndeterminate = () => {
  return x`
        <sp-progress-bar
            side-label
            label="Loading"
            indeterminate
        ></sp-progress-bar>
    `;
};
const makeOverBackground = (story) => x`
    <div
        style="background-color: var(--spectrum-global-color-seafoam-600); color: var(--spectrum-global-color-seafoam-600); padding: var(--spectrum-global-dimension-size-175) var(--spectrum-global-dimension-size-250); display: inline-block"
    >
        ${story}
    </div>
`;
const staticWhite = () => {
  return makeOverBackground(x`
        <sp-progress-bar progress="50" static="white"></sp-progress-bar>
    `);
};
const staticWhiteLabel = () => {
  return makeOverBackground(x`
        <sp-progress-bar
            label="Loading"
            progress="50"
            static="white"
        ></sp-progress-bar>
    `);
};
const staticWhiteIndeterminate = () => {
  return makeOverBackground(x`
        <sp-progress-bar
            label="Loading"
            indeterminate
            static="white"
        ></sp-progress-bar>
    `);
};
const staticWhiteSideLabel = () => {
  return makeOverBackground(x`
        <sp-progress-bar
            label="Loading"
            progress="50"
            static="white"
            side-label
        ></sp-progress-bar>
    `);
};
const staticWhiteSideLabelIndeterminate = () => {
  return makeOverBackground(x`
        <sp-progress-bar
            label="Loading"
            indeterminate
            static="white"
            side-label
        ></sp-progress-bar>
    `);
};
const __namedExportsOrder = ['label', 'indeterminate', 'sideLabel', 'sideIndeterminate', 'staticWhite', 'staticWhiteLabel', 'staticWhiteIndeterminate', 'staticWhiteSideLabel', 'staticWhiteSideLabelIndeterminate'];

export { __namedExportsOrder, progressBar_stories as default, indeterminate, label, sideIndeterminate, sideLabel, staticWhite, staticWhiteIndeterminate, staticWhiteLabel, staticWhiteSideLabel, staticWhiteSideLabelIndeterminate };
