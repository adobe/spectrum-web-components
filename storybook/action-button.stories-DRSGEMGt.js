import './sp-action-group-sE69i9qK.js';
import './sp-icon-edit-DPuFZyao.js';
import { a as renderButton } from './index-CXJggAoL.js';
import './sp-action-button-zOTvHmVo.js';
import { x } from './lit-html-COgVUehj.js';
import './RovingTabindex-BIFuw_W7.js';
import './FocusGroup-CQTGJWkN.js';
import './mutation-controller-D2lT1xZk.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-Bh0Au8rG.js';
import './define-element-B3-QvDZd.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './custom-tag-Diwq7nXX.js';
import './Edit-prqhnpZR.js';
import './IconBase-CmREmoFq.js';
import './state-DrGS5Kkk.js';
import './sp-icon-CThFoDUE.js';
import './if-defined-DDJGFaN4.js';
import './sp-icon-corner-triangle300-BndhYbNS.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './ButtonBase-DFBdS0ya.js';
import './like-anchor-YCQdykQc.js';
import './focusable-CRwO5NCP.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BVY5OzXy.js';
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
