import './sp-progress-bar-AZBhFEHu.js';
import { x } from './lit-html-GmIhAbMP.js';
import './get-label-from-slot-oGgDjBHa.js';
import './observe-slot-text-5oGzzbFn.js';
import './mutation-controller-KeE5MDSl.js';
import './define-element-UHExAFdK.js';
import './lit-element-xBOPiTek.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './base-STdhtiz1.js';
import './sizedMixin-6sBuja8e.js';
import './LanguageResolution-433GhF-m.js';
import './sp-field-label-50w0r-Gn.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './query-JMOstM_r.js';

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
