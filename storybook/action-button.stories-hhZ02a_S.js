import './sp-action-group-vbQM9fnp.js';
import './sp-icon-edit-mmGDUILs.js';
import { a as renderButton } from './index-oP1GBiZh.js';
import './sp-action-button-ilQrU8gC.js';
import { x } from './lit-html-GmIhAbMP.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './mutation-controller-KeE5MDSl.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-JAQz02f5.js';
import './define-element-tO8-r1bu.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './Edit-G5NAbE7j.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-EFa3DHxz.js';
import './sp-icon-ei_CiDUC.js';
import './if-defined-pV6JZKXB.js';
import './sp-icon-corner-triangle300-NzVF9xaD.js';
import './CornerTriangle300-scOUseNi.js';
import './custom-tag-z2Xx81l9.js';
import './ButtonBase--K-lWDuL.js';
import './like-anchor-A-VxslPW.js';
import './focusable-GZ06kf6F.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-RiUvi5fT.js';
import './query-assigned-nodes-jGvx5qKR.js';

var actionButton_stories = {
  component: "sp-action-button",
  title: "Action Button"
};
function renderButtonsSelected(args) {
  const disabled = Object.assign({}, args, { disabled: true });
  const selected = Object.assign({}, args, { selected: true });
  return x`
        <sp-action-group
            ?emphasized="${!!args.emphasized}"
            ?quiet="${!!args.quiet}"
        >
            ${renderButton(args)} ${renderButton(selected)}
            ${renderButton(disabled)}
        </sp-action-group>
    `;
}
const toggles = (args) => renderButtonsSelected(args);
toggles.args = {
  toggles: true,
  icon: x`
        <sp-icon-edit hidden slot="icon"></sp-icon-edit>
    `
};
const iconSizeOverridden = (args) => {
  return x`
        ${renderButton(args)}
        <h1>For testing purposes only</h1>
        <p>
            This is a test to ensure that sizing the icon will still work when
            it's in the scope of a parent element. You shouldn't normally do
            this as it deviates from the Spectrum design specification.
        </p>
    `;
};
iconSizeOverridden.args = {
  label: "",
  size: "xl",
  icon: x`
        <sp-icon-edit slot="icon" size="s"></sp-icon-edit>
    `
};
const __namedExportsOrder = ['toggles', 'iconSizeOverridden'];

export { __namedExportsOrder, actionButton_stories as default, iconSizeOverridden, toggles };
