import './sp-progress-bar-XdZQT7D6.js';
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
  const color = variant === "black" ? "rgb(181, 209, 211)" : "var(--spectrum-seafoam-900)";
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
  return makeOverBackground("white")(
    () => x`
            <sp-progress-bar progress="50" static="white"></sp-progress-bar>
        `
  );
};
const staticWhiteLabel = () => {
  return makeOverBackground("white")(
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
  return makeOverBackground("white")(
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
  return makeOverBackground("white")(
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
  return makeOverBackground("white")(
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
