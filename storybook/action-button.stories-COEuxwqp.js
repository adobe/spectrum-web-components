import './sp-action-group-BVc2r8hv.js';
import './sp-icon-edit-CKaSlRIB.js';
import { a as renderButton } from './index-CuQdWr3e.js';
import './sp-action-button-D_6IfCJA.js';
import { x } from './lit-html-COgVUehj.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './mutation-controller-D2lT1xZk.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-SWvQmBKY.js';
import './define-element-B7NoFsQI.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './custom-tag-Diwq7nXX.js';
import './Edit-prqhnpZR.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './sp-icon-C6fwh19n.js';
import './if-defined-DDJGFaN4.js';
import './sp-icon-corner-triangle300-xPP9NKCs.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './ButtonBase-CVCDQq4P.js';
import './like-anchor-BQR4wmj8.js';
import './focusable-CtU8nZTr.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DVS1yx82.js';
import './query-assigned-nodes-DAYI4epk.js';

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
const href = (args) => renderButtonsSelected(args);
href.args = {
  href: "https://github.com/adobe/spectrum-web-components",
  icon: x`
        <sp-icon-edit hidden slot="icon"></sp-icon-edit>
    `
};
const __namedExportsOrder = ['toggles', 'href'];

export { __namedExportsOrder, actionButton_stories as default, href, toggles };
