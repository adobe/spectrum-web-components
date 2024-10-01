import './sp-progress-bar-oMmS3k5z.js';
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
const makeOverBackground = (variant) => (story) => {
  const color = "var(--spectrum-seafoam-900)";
  return x`
            <div
                style="
                    --mod-actionbutton-static-content-color: ${color};
                    --mod-button-static-content-color: ${color};
                    background-color: ${color};
                    color: ${color};
                    padding: calc(var(--swc-scale-factor) * 14px) calc(var(--swc-scale-factor) * 20px);
                    display: inline-block;
                "
            >
                ${story()}
            </div>
        `;
};
const staticWhite = () => {
  return makeOverBackground()(
    () => x`
            <sp-progress-bar progress="50" static="white"></sp-progress-bar>
        `
  );
};
const staticWhiteLabel = () => {
  return makeOverBackground()(
    () => x`
            <sp-progress-bar
                label="Loading"
                progress="50"
                static="white"
            ></sp-progress-bar>
        `
  );
};
const staticWhiteIndeterminate = () => {
  return makeOverBackground()(
    () => x`
            <sp-progress-bar
                label="Loading"
                indeterminate
                static="white"
            ></sp-progress-bar>
        `
  );
};
const staticWhiteSideLabel = () => {
  return makeOverBackground()(
    () => x`
            <sp-progress-bar
                label="Loading"
                progress="50"
                static="white"
                side-label
            ></sp-progress-bar>
        `
  );
};
const staticWhiteSideLabelIndeterminate = () => {
  return makeOverBackground()(
    () => x`
            <sp-progress-bar
                label="Loading"
                indeterminate
                static="white"
                side-label
            ></sp-progress-bar>
        `
  );
};
const __namedExportsOrder = ['label', 'indeterminate', 'sideLabel', 'sideIndeterminate', 'staticWhite', 'staticWhiteLabel', 'staticWhiteIndeterminate', 'staticWhiteSideLabel', 'staticWhiteSideLabelIndeterminate'];

export { __namedExportsOrder, progressBar_stories as default, indeterminate, label, sideIndeterminate, sideLabel, staticWhite, staticWhiteIndeterminate, staticWhiteLabel, staticWhiteSideLabel, staticWhiteSideLabelIndeterminate };
